import { toast } from './components/ui/toast'
import { useConfirmStore, type ConfirmOptions } from './store/use-confirm-store'

type ToastKind = 'success' | 'error' | 'warning' | 'info'

function notify(kind: ToastKind, content: string, key?: string): void {
  toast.add({ id: key, title: content, type: kind, timeout: 2600 })
}

export const feedback = {
  message: {
    success: (content: string, key?: string): void => {
      notify('success', content, key)
    },
    error: (content: string, key?: string): void => {
      notify('error', content, key)
    },
    warning: (content: string, key?: string): void => {
      notify('warning', content, key)
    }
  },
  modal: {
    confirm: (options: ConfirmOptions): void => {
      useConfirmStore.getState().confirm(options)
    }
  }
}
