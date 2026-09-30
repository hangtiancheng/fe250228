// export const enum VideoState {
//   PENDING = 'pending',
//   CONVERT = 'convert',
//   DONE = 'done',
//   ERROR = 'error'
// }

export type VideoState = 'pending' | 'convert' | 'done' | 'error'

export interface IConvertSettings {
  size: string
  frame: number
  outputDir?: string
}

export interface IVideoItem {
  filename: string // with ext
  filepath: string
  progress: number
  state: VideoState
}

export interface ErrorReplyVal {
  code: 0x0 | 0x1
  detail?: string
}
