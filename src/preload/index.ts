import { contextBridge, ipcRenderer, IpcRendererEvent, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IConvertSettings, IVideoItem, VideoState } from '../main/types'

//! Selectively expose main-process APIs to the renderer
const api = {
  convert: async (videoItem: IVideoItem, settings: IConvertSettings): Promise<void> => {
    return ipcRenderer.invoke('convertChan', videoItem, settings)
  },

  selectDir: async (): Promise<string> => {
    return ipcRenderer.invoke('selectDirChan')
  },

  getFilePath: (file: File): string => {
    return webUtils.getPathForFile(file)
  },

  subscribeMain: (callback: (type_: VideoState, replyVal_?: unknown) => void): void => {
    ipcRenderer.on(
      'mainPublishChan',
      (
        _event: IpcRendererEvent,
        type: (typeof callback.arguments)[1],
        replyVal?: (typeof callback.arguments)[2]
      ) => {
        callback(type, replyVal)
      }
    )
  },
  stop() {
    ipcRenderer.send('stopChan')
  }
}

// With context isolation enabled, electron APIs must be exposed to the renderer via contextBridge
// Otherwise they can be attached to the global window directly
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
