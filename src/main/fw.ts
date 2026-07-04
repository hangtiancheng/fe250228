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

  /**
   *
   * @param event IpcMainInvokeEvent
   * @param filepath The filepath of an IVideoItem instance
   * @param settings Convert settings
   */
  constructor(
    private event: IpcMainInvokeEvent,
    private videoItem: IVideoItem,
    private settings: IConvertSettings
  ) {
    this.ffmpeg = ffmpeg(this.videoItem.filepath /** input */)
    this.window = BrowserWindow.fromWebContents(this.event.sender)!
  }

  //! Methods
  private setOutputPath() {
    const { size, frame } = this.settings
    const { name /** ext: extWithDot */ } = path.parse(this.videoItem.filename)
    if (!this.settings.outputDir || !existsSync(this.settings.outputDir!)) {
      this.window.webContents.send('mainPublishChan' /** channel */, 'error' /** type */, {
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
      //! 必须 .bind(this)
      .on('progress', this.convertCallback.bind(this))
      .on('error', this.errorCallback.bind(this))
      .on('end', this.doneCallback.bind(this))
      .save(this.outputPath)
  }

  //! Event callbacks
  convertCallback(progress: {
    frames: number
    currentFps: number
    currentKbps: number
    targetSize: number
    timemark: string
    percent?: number | undefined
  }) {
    // const { frames, currentFps, currentKbps, targetSize, timemark, percent } = progress
    // console.log(
    //   `Processing: ${percent}%, details:
    // frame: ${frames}, currentFps: ${currentFps}, currentKps: ${currentKbps}, targetSize: ${targetSize}, timemark: ${timemark}`
    // )
    //! console.log(this)
    this.window.webContents.send(
      'mainPublishChan' /** channel */,
      'convert' /** type */,
      progress.percent /** replyVal */
    )
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
    this.window.webContents.send(
      'mainPublishChan' /** channel */,
      'done' /** type */,
      this.videoItem.filepath
    )
  }

  stop() {
    this.ffmpeg.kill('SIGKILL')
    this.window.webContents.send('mainPublishChan' /** channel */, 'error' /** type */, {
      code: 0x1
    } as ErrorReplyVal)
  }
}
