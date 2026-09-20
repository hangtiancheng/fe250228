import BasicSettings from '../components/basic-settings'
import CeilButtons from '../components/ceil-buttons'
import FloorButtons from '../components/floor-buttons'
import VideoList from '../components/video-list'

export default function ConvertHome(): JSX.Element {
  return (
    <div className="flex flex-col gap-3 p-3">
      <BasicSettings />
      <CeilButtons />
      <FloorButtons />
      <VideoList />
    </div>
  )
}
