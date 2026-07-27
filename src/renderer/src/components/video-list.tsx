import { useVideoStore } from '../store/use-video-store'
import VideoItem from './video-item'

export default function VideoList(): JSX.Element {
  const videoList = useVideoStore((s) => s.videoList)

  if (videoList.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-ink-600 text-xs text-slate-500">
        请添加视频
      </div>
    )
  }

  return (
    <ul className="m-0 flex h-80 list-none flex-col gap-1.5 overflow-y-auto p-0 pr-0.5">
      {videoList.map((video, idx) => (
        <VideoItem key={video.filepath} video={video} idx={idx} />
      ))}
    </ul>
  )
}
