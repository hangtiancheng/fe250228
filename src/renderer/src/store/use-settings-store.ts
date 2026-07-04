import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  defaultSize,
  defaultSizeOptions,
  defaultFrame,
  defaultFrameOptions
} from '@renderer/constants'

const useSettingsStore = defineStore('settings', () => {
  // size: 分辨率
  // frame: 帧数

  //! state
  const sizeOptions = ref<string[]>(defaultSizeOptions)
  const size = ref<string>(defaultSize)
  const frameOptions = ref<number[]>(defaultFrameOptions)
  const frame = ref<number>(defaultFrame)
  const outputDir = ref<string>('')

  return {
    sizeOptions,
    size,
    frameOptions,
    frame,
    outputDir
  }
})

export { useSettingsStore }
