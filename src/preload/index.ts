import { electronAPI } from '@electron-toolkit/preload'
import type { IpcRendererEvent } from 'electron'
import { contextBridge, ipcRenderer, webUtils } from 'electron'

import type { IConvertSettings, IVideoItem, VideoState } from '../main/types'

const api = {
  convert: async (videoItem: IVideoItem, settings: IConvertSettings): Promise<void> => {
    await ipcRenderer.invoke('convertChan', videoItem, settings)
  },

  selectDir: async (): Promise<string> => {
    const dir: unknown = await ipcRenderer.invoke('selectDirChan')
    return typeof dir === 'string' ? dir : ''
  },

  getFilePath: (file: File): string => {
    return webUtils.getPathForFile(file)
  },

  subscribeMain: (callback: (type_: VideoState, replyVal_?: unknown) => void): void => {
    ipcRenderer.on(
      'mainPublishChan',
      (_event: IpcRendererEvent, type: VideoState, replyVal?: unknown) => {
        callback(type, replyVal)
      }
    )
  },
  stop() {
    ipcRenderer.send('stopChan')
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI
  // @ts-expect-error (define in dts)
  window.api = api
}
