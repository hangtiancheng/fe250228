import { Select } from 'antd'
import { useSettingsStore } from '../store/use-settings-store'

export default function BasicSettings(): JSX.Element {
  const size = useSettingsStore((s) => s.size)
  const frame = useSettingsStore((s) => s.frame)
  const sizeOptions = useSettingsStore((s) => s.sizeOptions)
  const frameOptions = useSettingsStore((s) => s.frameOptions)
  const setSize = useSettingsStore((s) => s.setSize)
  const setFrame = useSettingsStore((s) => s.setFrame)

  return (
    <section className="flex gap-2">
      <Select
        className="flex-1"
        value={size}
        onChange={setSize}
        placeholder="选择分辨率"
        options={sizeOptions.map((v) => ({ value: v, label: v }))}
      />
      <Select
        className="w-28"
        value={frame}
        onChange={setFrame}
        placeholder="选择帧数"
        options={frameOptions.map((v) => ({ value: v, label: `${v} fps` }))}
      />
    </section>
  )
}
