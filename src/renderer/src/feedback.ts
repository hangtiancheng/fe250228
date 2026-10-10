import type { MessageInstance } from 'antd/es/message/interface'
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal'

export const feedback = {} as {
  message: MessageInstance
  modal: ModalHookAPI
}
