import type { MessageInstance } from 'antd/es/message/interface'
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal'

// Bridges antd App.useApp() instances into module scope for non-component logic (e.g. IPC callbacks)
export const feedback = {} as {
  message: MessageInstance
  modal: ModalHookAPI
}
