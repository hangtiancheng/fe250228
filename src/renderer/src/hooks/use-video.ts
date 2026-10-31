import { feedback } from '../feedback'
import { useVideoStore } from '../store/use-video-store'
import type { IVideoItem } from '../types'

import { useConvertStore } from './use-convert'

export function addVideo(video: IVideoItem): void {
  const { videoList, setVideoList } = useVideoStore.getState()
  if (videoList.some((v) => v.filepath === video.filepath)) {
    feedback.message.error('视频重复', 'add-video')
    return
  }
  setVideoList([...videoList, video])
  feedback.message.success('添加视频成功', 'add-video')
}

export function removeVideo(idx: number): void {
  const { videoList, setVideoList } = useVideoStore.getState()
  if (videoList[idx]?.state === 'convert') {
    feedback.message.error('转码中, 禁止删除', 'remove-video')
    return
  }
  setVideoList(videoList.filter((_, i) => i !== idx))
}

export function removeAll(): void {
  if (useConvertStore.getState().isConverting) {
    return
  }
  feedback.modal.confirm({
    title: '确定清空?',
    content: '将移除列表中的全部视频',
    confirmText: '清空',
    destructive: true,
    onOk: () => {
      useVideoStore.getState().setVideoList([])
    }
  })
}

export function resetAll(): void {
  if (useConvertStore.getState().isConverting) {
    return
  }
  feedback.modal.confirm({
    title: '确定重置?',
    content: '全部视频将回到等待状态',
    confirmText: '重置',
    onOk: () => {
      const { videoList, setVideoList } = useVideoStore.getState()
      setVideoList(videoList.map((v) => ({ ...v, progress: 0, state: 'pending' })))
    }
  })
}
