import { create } from 'zustand'
import type { IVideoItem, VideoState } from '../types'

interface VideoStore {
  videoList: IVideoItem[]
  setVideoList: (videoList: IVideoItem[]) => void
  patchVideo: (filepath: string, patch: Partial<Pick<IVideoItem, 'progress' | 'state'>>) => void
}

export const useVideoStore = create<VideoStore>()((set) => ({
  videoList: [],
  setVideoList: (videoList) => set({ videoList }),
  patchVideo: (filepath, patch) =>
    set((s) => ({
      videoList: s.videoList.map((v) => (v.filepath === filepath ? { ...v, ...patch } : v))
    }))
}))

export type { IVideoItem, VideoState }
