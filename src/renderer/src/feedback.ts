import type { MessageInstance } from 'antd/es/message/interface'
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal'

// antd App.useApp() 的实例桥接到模块作用域, 供非组件逻辑 (IPC 回调等) 使用
export const feedback = {} as {
  message: MessageInstance
  modal: ModalHookAPI
}
