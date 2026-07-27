import { create } from 'zustand'
import { feedback } from '../feedback'
import { useSettingsStore } from '../store/use-settings-store'
import { useVideoStore } from '../store/use-video-store'
import type { ErrorReplyVal } from '../types'

interface ConvertStore {
  isConverting: boolean
}

export const useConvertStore = create<ConvertStore>()(() => ({ isConverting: false }))

// 当前正在转码的视频路径 (单任务串行队列)
let convertingFilepath = ''
let subscribed = false

export function startConvert(): void {
  if (useConvertStore.getState().isConverting) return
  useConvertStore.setState({ isConverting: true })
  callConvert()
}

function callConvert(): void {
  const { videoList, patchVideo } = useVideoStore.getState()
  const video = videoList.find((v) => v.state === 'pending')
  if (!video) {
    feedback.message.warning({ content: '请添加视频', key: 'convert' })
    useConvertStore.setState({ isConverting: false })
    return
  }
  convertingFilepath = video.filepath
  patchVideo(video.filepath, { state: 'convert', progress: 0 })
  const { size, frame, outputDir } = useSettingsStore.getState()
  // 展开为普通对象, 满足 structured clone
  window.api.convert({ ...video, state: 'convert' }, { size, frame, outputDir })
}

export function stopConvert(): void {
  window.api.stop()
}

// 只注册一次主进程推送订阅 (preload 无取消订阅能力, 需防 StrictMode 重复注册)
export function subscribeMainOnce(): void {
  if (subscribed) return
  subscribed = true

  window.api.subscribeMain((type, replyVal) => {
    const { videoList, patchVideo } = useVideoStore.getState()

    switch (type) {
      case 'convert': {
        const percent = typeof replyVal === 'number' ? replyVal : 0
        patchVideo(convertingFilepath, { progress: parseFloat(percent.toFixed(1)) })
        break
      }

      case 'done': {
        const filepath = replyVal as string
        const video = videoList.find((v) => v.filepath === filepath)
        if (!video) break
        patchVideo(filepath, { state: 'done', progress: 100 })
        feedback.message.success(`${video.filename} 转码完成`)
        const next = useVideoStore.getState().videoList.find((v) => v.state === 'pending')
        if (next) callConvert()
        else useConvertStore.setState({ isConverting: false })
        break
      }

      case 'error': {
        const { code, detail } = replyVal as ErrorReplyVal
        useConvertStore.setState({ isConverting: false })
        if (code === 0x0) {
          // 输出目录缺失, 回退为 Downloads 目录并提示重新选择
          patchVideo(convertingFilepath, { state: 'pending', progress: 0 })
          useSettingsStore.getState().setOutputDir(detail ?? '')
          feedback.message.error({ content: '请选择输出目录', key: 'convert' })
        } else {
          patchVideo(convertingFilepath, { state: 'error' })
          feedback.message.warning({ content: '转码结束', key: 'convert' })
        }
        break
      }
    }
  })
}
