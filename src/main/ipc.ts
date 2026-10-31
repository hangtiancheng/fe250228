import type { IpcMainInvokeEvent } from 'electron'
import { ipcMain } from 'electron'

import { selectDir } from './dir'
import FfmpegWrapper from './fw'
import type { IConvertSettings, IVideoItem } from './types'

let ffmpegWrapper: FfmpegWrapper | undefined = undefined

ipcMain.handle(
  'convertChan',
  async (
    event: IpcMainInvokeEvent,
    videoItem: IVideoItem,
    settings: IConvertSettings
  ): Promise<void> => {
    ffmpegWrapper = new FfmpegWrapper(event, videoItem, settings)
    ffmpegWrapper.convert()
  }
)

ipcMain.handle('selectDirChan', async (): Promise<string> => {
  return selectDir()
})

ipcMain.on('stopChan', () => {
  ffmpegWrapper?.stop()
})
