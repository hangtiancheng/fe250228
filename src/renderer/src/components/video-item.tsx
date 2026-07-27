import { XCircle } from 'lucide-react'
import { removeVideo } from '../hooks/use-video'
import type { IVideoItem, VideoState } from '../types'

const stateMeta: Record<VideoState, { label: string; fill: string; text: string }> = {
  pending: { label: '等待', fill: 'bg-transparent', text: 'text-slate-500' },
  convert: { label: '转码中', fill: 'bg-amber-glow/20', text: 'text-amber-glow' },
  done: { label: '完成', fill: 'bg-emerald-400/15', text: 'text-emerald-400' },
  error: { label: '错误', fill: 'bg-rose-400/15', text: 'text-rose-400' }
}

interface VideoItemProps {
  video: IVideoItem
  idx: number
}

export default function VideoItem({ video, idx }: VideoItemProps): JSX.Element {
  const meta = stateMeta[video.state]

  return (
    <li className="relative overflow-hidden rounded-lg border border-ink-600/50 bg-ink-800">
      <div
        className={`absolute inset-y-0 left-0 transition-[width] duration-300 ${meta.fill}`}
        style={{ width: `${video.progress}%` }}
      />
      <div className="relative flex items-center gap-2 px-2.5 py-2">
        <div className="min-w-0 flex-1">
          <p className="m-0 truncate text-xs text-slate-200" title={video.filename}>
            {video.filename}
          </p>
          <p className={`tnum m-0 mt-0.5 font-mono text-[10px] ${meta.text}`}>
            {video.progress}% · {meta.label}
          </p>
        </div>
        <button
          type="button"
          onClick={() => removeVideo(idx)}
          className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-slate-500 transition-transform hover:scale-125 hover:text-rose-400"
        >
          <XCircle size={18} />
        </button>
      </div>
    </li>
  )
}
