import { useVideoStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

import { IVideoItem } from '@renderer/types'

const videoStore = useVideoStore()
const { videoList } = storeToRefs(videoStore)

export default function useVideo() {
  const addVideo = (newVideo: IVideoItem) => {
    if (videoList.value.find((item) => item.filepath === newVideo.filepath)) {
      ElMessage.error({
        message: '视频重复',
        grouping: true
      })
      return
    }
    videoList.value.push(newVideo)
    ElMessage.success({
      message: '添加视频成功',
      grouping: true
    })
  }

  const removeVideo = (idx: number) => {
    const video = videoList.value[idx]
    if (video.state === 'convert') {
      ElMessage.warning({ message: '转码中, 禁止删除', grouping: true })
      return
    }
    videoList.value.splice(idx, 1)
    ElMessage.success({ message: '删除成功', grouping: true })
  }

  const removeAll = async (): Promise<void> => {
    try {
      await ElMessageBox.confirm('确定清空?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      videoList.value = []
      ElMessage.success({ message: '清空成功', grouping: true })
    } catch (_reason) {
      ElMessage.warning({
        message: '取消清空',
        grouping: true
      })
    }
  }

  const resetAll = async (): Promise<void> => {
    try {
      await ElMessageBox.confirm('确定重置?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      videoList.value.forEach((item) => {
        item.progress = 0
        item.state = 'pending'
      })
      ElMessage.success({ message: '重置成功', grouping: true })
    } catch (_reason) {
      ElMessage.warning({
        message: '取消重置',
        grouping: true
      })
    }
  }

  return {
    addVideo,
    removeVideo,
    removeAll,
    resetAll
  }
}
