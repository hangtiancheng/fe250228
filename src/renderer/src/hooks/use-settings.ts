import { feedback } from '../feedback'
import { useSettingsStore } from '../store/use-settings-store'
import { defaultFrame, defaultFrameIdx, defaultSize, defaultSizeIdx } from '../constants'

const sizePattern = /^[1-9]\d*x[1-9]\d*$/
const framePattern = /^[1-9]\d*(\.\d+)?$/

export function addSize(newItem: string): void {
  const trimmed = newItem.trim()
  if (!trimmed) {
    feedback.message.error({ content: '请输入分辨率', key: 'settings' })
    return
  }
  if (!sizePattern.test(trimmed)) {
    feedback.message.error({ content: '格式错误, 示例: 1920x1080', key: 'settings' })
    return
  }
  const { sizeOptions, setSizeOptions, setSize } = useSettingsStore.getState()
  if (sizeOptions.includes(trimmed)) {
    feedback.message.error({ content: '分辨率重复', key: 'settings' })
    return
  }
  setSizeOptions([...sizeOptions, trimmed])
  setSize(trimmed)
  feedback.message.success({ content: '添加分辨率成功', key: 'settings' })
}

export function addFrame(newItem: string): void {
  const trimmed = newItem.trim()
  if (!trimmed) {
    feedback.message.error({ content: '请输入帧数', key: 'settings' })
    return
  }
  if (!framePattern.test(trimmed)) {
    feedback.message.error({ content: '格式错误, 示例: 60', key: 'settings' })
    return
  }
  const frame = Math.round(parseFloat(trimmed) * 10) / 10
  const { frameOptions, setFrameOptions, setFrame } = useSettingsStore.getState()
  if (frameOptions.includes(frame)) {
    feedback.message.error({ content: '帧数重复', key: 'settings' })
    return
  }
  setFrameOptions([...frameOptions, frame])
  setFrame(frame)
  feedback.message.success({ content: '添加帧数成功', key: 'settings' })
}

export function removeItem(type: 'size' | 'frame', idx: number): void {
  const defaultIdx = type === 'size' ? defaultSizeIdx : defaultFrameIdx
  if (idx <= defaultIdx) {
    feedback.message.error({ content: '内置选项, 禁止删除', key: 'settings' })
    return
  }
  feedback.modal.confirm({
    title: '确定删除?',
    onOk: () => {
      const store = useSettingsStore.getState()
      if (type === 'size') {
        const removed = store.sizeOptions[idx]
        store.setSizeOptions(store.sizeOptions.filter((_, i) => i !== idx))
        if (store.size === removed) store.setSize(defaultSize)
      } else {
        const removed = store.frameOptions[idx]
        store.setFrameOptions(store.frameOptions.filter((_, i) => i !== idx))
        if (store.frame === removed) store.setFrame(defaultFrame)
      }
    }
  })
}
