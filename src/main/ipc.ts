import { ipcMain, IpcMainInvokeEvent } from 'electron'
import FfmpegWrapper from './fw'
import { IConvertSettings, IVideoItem } from './types'
import { selectDir } from './dir'

let ffmpegWrapper: FfmpegWrapper | undefined = undefined

ipcMain.handle(
  'convertChan',
  async (
    event: IpcMainInvokeEvent,
    videoItem: IVideoItem,
    settings: IConvertSettings
  ): Promise<void> => {
    ffmpegWrapper = new FfmpegWrapper(event, videoItem, settings)
    /* return */ ffmpegWrapper.convert()
  }
)

ipcMain.handle('selectDirChan', async (/** event: IpcMainInvokeEvent */): Promise<string> => {
  return selectDir()
})

ipcMain.on('stopChan', () => {
  ffmpegWrapper?.stop()
})
