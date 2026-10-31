import type { JSX } from 'react'

import { useSettingsStore } from '../store/use-settings-store'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

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
        value={size}
        onValueChange={(v) => {
          if (v != null) {
            setSize(v)
          }
        }}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="选择分辨率" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sizeOptions.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={frame}
        onValueChange={(v) => {
          if (v != null) {
            setFrame(v)
          }
        }}
      >
        <SelectTrigger className="w-28">
          <SelectValue>{(value) => (value == null ? '选择帧数' : `${value} fps`)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {frameOptions.map((v) => (
              <SelectItem key={v} value={v}>
                {`${v} fps`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}
