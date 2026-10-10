import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import path from 'node:path'
import { app, BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { ErrorReplyVal, IConvertSettings, IVideoItem } from './types'
import { existsSync, unlink } from 'node:fs'

ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(ffprobePath.replace('app.asar', 'app.asar.unpacked'))

export default class FfmpegWrapper {
  private ffmpeg: ffmpeg.FfmpegCommand
  private window: BrowserWindow
  private outputPath: string | undefined = undefined

  constructor(
    private event: IpcMainInvokeEvent,
    private videoItem: IVideoItem,
    private settings: IConvertSettings
  ) {
    this.ffmpeg = ffmpeg(this.videoItem.filepath)
    this.window = BrowserWindow.fromWebContents(this.event.sender)!
  }

  private setOutputPath() {
    const { size, frame } = this.settings
    const { name } = path.parse(this.videoItem.filename)
    if (!this.settings.outputDir || !existsSync(this.settings.outputDir!)) {
      this.window.webContents.send('mainPublishChan', 'error', {
        code: 0x0,
        detail: app.getPath('downloads')
      } as ErrorReplyVal)
      throw new Error('Output dir does not exist')
    }
    return path.join(this.settings.outputDir!, `${name}-${size}-${frame}-${Date.now()}.mp4`)
  }

  convert() {
    try {
      this.outputPath = this.setOutputPath()
    } catch (_err) {
      return
    }
    this.ffmpeg
      .videoCodec('libx264')
      .size(this.settings.size)
      .fps(this.settings.frame)
      .on('progress', this.convertCallback.bind(this))
      .on('error', this.errorCallback.bind(this))
      .on('end', this.doneCallback.bind(this))
      .save(this.outputPath)
  }

  convertCallback(progress: {
    frames: number
    currentFps: number
    currentKbps: number
    targetSize: number
    timemark: string
    percent?: number | undefined
  }) {
    this.window.webContents.send('mainPublishChan', 'convert', progress.percent)
  }

  errorCallback(err: Error) {
    console.error('errorCallback:' + err.message)
    unlink(this.outputPath!, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }

  doneCallback() {
    this.window.webContents.send('mainPublishChan', 'done', this.videoItem.filepath)
  }

  stop() {
    this.ffmpeg.kill('SIGKILL')
    this.window.webContents.send('mainPublishChan', 'error', {
      code: 0x1
    } as ErrorReplyVal)
  }
}
