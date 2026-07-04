import { useSettingsStore, useVideoStore } from '@renderer/store'
import { ErrorReplyVal, IVideoItem, VideoState } from '@renderer/types'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const videoStore = useVideoStore()
const { videoList } = storeToRefs(videoStore)
const settingStore = useSettingsStore()
const { size, frame, outputDir } = storeToRefs(settingStore)

const convertVideo = ref<IVideoItem>()

function findConvertVideo() {
  return videoList.value.find((item) => item.state === 'pending')
}

function setConvertVideo() {
  convertVideo.value = findConvertVideo()
  if (!convertVideo.value) {
    return
  }
  convertVideo.value.state = 'convert'
}

let subscribed = false
const isConverting = ref(false)

export default function useConvert() {
  const startConvert = () => {
    if (isConverting.value) {
      return
    }
    isConverting.value = true
    callConvert()
  }

  const callSubscribeMain = () => {
    if (subscribed) {
      // console.log('Subscribed, return')
      return
    }
    subscribed = true
    // console.log('Call subscribe main')
    window.api.subscribeMain((type: VideoState, replyVal: unknown) => {
      switch (type) {
        case 'convert':
          convertVideo.value!.progress = Number.parseFloat((replyVal as number).toFixed(1))
          break

        case 'done':
          if (replyVal !== convertVideo.value?.filepath || convertVideo.value?.state === 'done') {
            break
          }
          convertVideo.value!.state = 'done'
          ElMessage.success(`${convertVideo.value?.filename} 转码完成`)
          if (findConvertVideo()) {
            callConvert()
          } else {
            isConverting.value = false
          }
          break

        case 'error':
          if ((replyVal as ErrorReplyVal).code === 0x0) {
            isConverting.value = false
            convertVideo.value!.state = 'pending'
            outputDir.value = (replyVal as ErrorReplyVal).detail!
            ElMessage.error({ message: '请选择输出目录', grouping: true })
            break
          }
          if ((replyVal as ErrorReplyVal).code === 0x1) {
            isConverting.value = false
            convertVideo.value!.state = 'error'
            ElMessage.warning({ message: '转码结束', grouping: true })
            break
          }
      }
    })
  }

  // callSubscribeMain()

  const callConvert = () => {
    if (!findConvertVideo()) {
      isConverting.value = false
      ElMessage.warning({
        message: '请添加视频',
        grouping: true
      })
      return
    }
    setConvertVideo()
    window.api.convert(
      //! Error: An object could not be cloned.
      // videoList.value[0],
      {
        ...convertVideo.value!
      }, // videoItem
      {
        size: size.value,
        frame: frame.value,
        outputDir: outputDir.value
      } // convertSettings
    )
  }

  return {
    isConverting,
    startConvert,
    callSubscribeMain
  }
}
