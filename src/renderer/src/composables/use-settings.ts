import { useSettingsStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

import { defaultSizeIdx, defaultFrameIdx, defaultSize, defaultFrame } from '@renderer/constants'

const settingStore = useSettingsStore()
const { size, sizeOptions, frame, frameOptions } = storeToRefs(settingStore)

export default function useSettings() {
  const addSize = (newSize: string) => {
    if (!/^[1-9]\d*x[1-9]\d*$/.test(newSize)) {
      ElMessage.error({ message: '分辨率格式错误', grouping: true })
      return
    }

    if (sizeOptions.value.includes(newSize)) {
      ElMessage.info({ message: '分辨率重复', grouping: true })
      return
    }
    sizeOptions.value.push(newSize)
    ElMessage.success({ message: '添加分辨率成功', grouping: true })
  }

  const addFrame = (newFrame: string) => {
    if (!/^[1-9]\d*(\.\d+)?$/.test(newFrame)) {
      ElMessage.error({ message: '帧数格式错误', grouping: false })
      return
    }

    let frameVal: number
    if (newFrame.includes('.')) {
      frameVal = Number.parseFloat(Number.parseFloat(newFrame).toFixed(1))
    } else {
      frameVal = Number.parseInt(newFrame)
    }
    if (frameOptions.value.includes(frameVal)) {
      ElMessage.info({ message: '帧数重复', grouping: true })
      return
    }
    frameOptions.value.push(frameVal)
    ElMessage.success({ message: '添加帧数成功', grouping: true })
  }

  const removeItem = async (type: string, idx: number): Promise<void> => {
    try {
      let options: typeof sizeOptions | typeof frameOptions
      let curItem: typeof size | typeof frame
      if (type === 'size') {
        options = sizeOptions
        curItem = size
        if (idx <= defaultSizeIdx) {
          throw 'Permission denied'
        }
      } else {
        // type === 'frame'
        options = frameOptions
        curItem = frame
        if (idx <= defaultFrameIdx) {
          throw 'Permission denied'
        }
      }
      await ElMessageBox.confirm('确定删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if (curItem.value === options.value[idx]) {
        curItem.value = type === 'size' ? defaultSize : defaultFrame
      }
      options.value.splice(idx, 1)
      ElMessage.success({ message: '删除成功', grouping: true })
    } catch (reason) {
      if (reason === 'cancel') {
        ElMessage.warning({ message: '取消删除', grouping: true })
      } else if (reason === 'Permission denied') {
        ElMessage.warning({ message: '禁止删除', grouping: true })
      } else {
        ElMessage.warning({ message: '删除失败', grouping: true })
      }
    }
  }

  return {
    addSize,
    addFrame,
    removeItem
  }
}
