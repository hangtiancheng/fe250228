import { FilmIcon } from 'lucide-react'

import { useVideoStore } from '../store/use-video-store'

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty'
import VideoItem from './video-item'

export default function VideoList(): JSX.Element {
  const videoList = useVideoStore((s) => s.videoList)

  if (videoList.length === 0) {
    return (
      <Empty className="h-80 border border-border/70 bg-card/60">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FilmIcon />
          </EmptyMedia>
          <EmptyTitle>暂无视频</EmptyTitle>
          <EmptyDescription>点击上方按钮添加, 或直接拖入视频文件</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <ul className="m-0 flex h-80 list-none flex-col gap-2 overflow-y-auto overscroll-contain p-0 pr-0.5">
      {videoList.map((video, idx) => (
        <VideoItem key={video.filepath} video={video} idx={idx} />
      ))}
    </ul>
  )
}
