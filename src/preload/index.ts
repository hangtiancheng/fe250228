import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IConvertSettings, IVideoItem, VideoState } from '../main/types'

//! 在渲染器进程中, 选择性暴露主进程 API
const api = {
  convert: async (videoItem: IVideoItem, settings: IConvertSettings): Promise<void> => {
    return ipcRenderer.invoke('convertChan', videoItem, settings)
  },

  selectDir: async (): Promise<string> => {
    return ipcRenderer.invoke('selectDirChan')
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

// 开启上下文隔离 context isolation 时，才需要使用 contextBridge 将 electron API 暴露给渲染器进程
// 否则只需要直接添加到 DOM 元素中
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
