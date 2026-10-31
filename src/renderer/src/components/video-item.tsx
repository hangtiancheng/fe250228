import { cn } from 'cn'
import { XIcon } from 'lucide-react'

import { removeVideo } from '../hooks/use-video'
import type { IVideoItem, VideoState } from '../types'

import { Badge } from './ui/badge'
import { Button } from './ui/button'

const stateMeta: Record<
  VideoState,
  { label: string; fill: string; badge: 'outline' | 'default' | 'success' | 'destructive' }
> = {
  pending: { label: '等待', fill: 'bg-transparent', badge: 'outline' },
  convert: { label: '转码中', fill: 'bg-primary/10', badge: 'default' },
  done: { label: '完成', fill: 'bg-success/10', badge: 'success' },
  error: { label: '错误', fill: 'bg-destructive/10', badge: 'destructive' }
}

interface VideoItemProps {
  video: IVideoItem
  idx: number
}

export default function VideoItem({ video, idx }: VideoItemProps): JSX.Element {
  const meta = stateMeta[video.state]

  return (
    <li className="relative overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      <div
        className={cn('absolute inset-0 origin-left transition-transform duration-300', meta.fill)}
        style={{ transform: `scaleX(${video.progress / 100})` }}
      />
      <div className="relative flex items-center gap-2.5 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-foreground" title={video.filename}>
            {video.filename}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge variant={meta.badge}>{meta.label}</Badge>
            <span className="tnum font-mono text-[10px] text-muted-foreground">
              {video.progress}%
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          title="移除"
          onClick={() => {
            removeVideo(idx)
          }}
          className="text-muted-foreground"
        >
          <XIcon />
        </Button>
      </div>
    </li>
  )
}
