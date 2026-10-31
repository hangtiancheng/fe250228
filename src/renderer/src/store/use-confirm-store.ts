import { create } from 'zustand'

export interface ConfirmOptions {
  title: string
  content?: string
  confirmText?: string
  destructive?: boolean
  onOk: () => void
}

interface ConfirmStore {
  options: ConfirmOptions | null
  confirm: (options: ConfirmOptions) => void
  close: () => void
}

export const useConfirmStore = create<ConfirmStore>()((set) => ({
  options: null,
  confirm: (options) => {
    set({ options })
  },
  close: () => {
    set({ options: null })
  }
}))
