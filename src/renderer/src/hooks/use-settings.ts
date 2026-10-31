import { defaultFrame, defaultFrameIdx, defaultSize, defaultSizeIdx } from '../constants'
import { feedback } from '../feedback'
import { useSettingsStore } from '../store/use-settings-store'

const sizePattern = /^[1-9]\d*x[1-9]\d*$/
const framePattern = /^[1-9]\d*(\.\d+)?$/

export function addSize(newItem: string): void {
  const trimmed = newItem.trim()
  if (!trimmed) {
    feedback.message.error('请输入分辨率', 'settings')
    return
  }
  if (!sizePattern.test(trimmed)) {
    feedback.message.error('格式错误, 示例: 1920x1080', 'settings')
    return
  }
  const { sizeOptions, setSizeOptions, setSize } = useSettingsStore.getState()
  if (sizeOptions.includes(trimmed)) {
    feedback.message.error('分辨率重复', 'settings')
    return
  }
  setSizeOptions([...sizeOptions, trimmed])
  setSize(trimmed)
  feedback.message.success('添加分辨率成功', 'settings')
}

export function addFrame(newItem: string): void {
  const trimmed = newItem.trim()
  if (!trimmed) {
    feedback.message.error('请输入帧数', 'settings')
    return
  }
  if (!framePattern.test(trimmed)) {
    feedback.message.error('格式错误, 示例: 60', 'settings')
    return
  }
  const frame = Math.round(parseFloat(trimmed) * 10) / 10
  const { frameOptions, setFrameOptions, setFrame } = useSettingsStore.getState()
  if (frameOptions.includes(frame)) {
    feedback.message.error('帧数重复', 'settings')
    return
  }
  setFrameOptions([...frameOptions, frame])
  setFrame(frame)
  feedback.message.success('添加帧数成功', 'settings')
}

export function removeItem(type: 'size' | 'frame', idx: number): void {
  const defaultIdx = type === 'size' ? defaultSizeIdx : defaultFrameIdx
  if (idx <= defaultIdx) {
    feedback.message.error('内置选项, 禁止删除', 'settings')
    return
  }
  feedback.modal.confirm({
    title: '确定删除?',
    confirmText: '删除',
    destructive: true,
    onOk: () => {
      const store = useSettingsStore.getState()
      if (type === 'size') {
        const removed = store.sizeOptions[idx]
        store.setSizeOptions(store.sizeOptions.filter((_, i) => i !== idx))
        if (store.size === removed) {
          store.setSize(defaultSize)
        }
      } else {
        const removed = store.frameOptions[idx]
        store.setFrameOptions(store.frameOptions.filter((_, i) => i !== idx))
        if (store.frame === removed) {
          store.setFrame(defaultFrame)
        }
      }
    }
  })
}
