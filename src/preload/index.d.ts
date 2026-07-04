import { ElectronAPI } from '@electron-toolkit/preload'
import { IConvertSettings, IVideoItem, VideoState } from '../main/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      convert: (videoItem: IVideoItem, settings: IConvertSettings) => Promise<void>
      selectDir: () => Promise<string>
      subscribeMain: (callback: (type: VideoState, replyVal?: unknown) => void) => void
      stop: () => void
    }
  }
}
