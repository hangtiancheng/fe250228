import { create } from 'zustand'
import { defaultFrame, defaultFrameOptions, defaultSize, defaultSizeOptions } from '../constants'

interface SettingsStore {
  sizeOptions: string[]
  size: string
  frameOptions: number[]
  frame: number
  outputDir: string
  setSize: (size: string) => void
  setFrame: (frame: number) => void
  setOutputDir: (outputDir: string) => void
  setSizeOptions: (sizeOptions: string[]) => void
  setFrameOptions: (frameOptions: number[]) => void
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
  sizeOptions: [...defaultSizeOptions],
  size: defaultSize,
  frameOptions: [...defaultFrameOptions],
  frame: defaultFrame,
  outputDir: '',
  setSize: (size) => set({ size }),
  setFrame: (frame) => set({ frame }),
  setOutputDir: (outputDir) => set({ outputDir }),
  setSizeOptions: (sizeOptions) => set({ sizeOptions }),
  setFrameOptions: (frameOptions) => set({ frameOptions })
}))
