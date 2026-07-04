import { defineStore } from 'pinia'
import { ref } from 'vue'

import { IVideoItem } from '@renderer/types'

const useVideoStore = defineStore('video', () => {
  //! state
  const videoList = ref<IVideoItem[]>([])
  return {
    videoList
  }
})

export { useVideoStore }
