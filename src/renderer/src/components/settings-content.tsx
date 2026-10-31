import { XIcon } from 'lucide-react'
import { useState } from 'react'

import { defaultFrameIdx, defaultSizeIdx } from '../constants'
import { addFrame, addSize, removeItem } from '../hooks/use-settings'
import { useSettingsStore } from '../store/use-settings-store'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

interface SettingsContentProps {
  type: 'size' | 'frame'
  placeholder: string
}

export default function SettingsContent({ type, placeholder }: SettingsContentProps): JSX.Element {
  const [newItem, setNewItem] = useState('')
  const size = useSettingsStore((s) => s.size)
  const frame = useSettingsStore((s) => s.frame)
  const sizeOptions = useSettingsStore((s) => s.sizeOptions)
  const frameOptions = useSettingsStore((s) => s.frameOptions)
  const setSize = useSettingsStore((s) => s.setSize)
  const setFrame = useSettingsStore((s) => s.setFrame)

  const isSize = type === 'size'
  const options: (string | number)[] = isSize ? sizeOptions : frameOptions
  const current = isSize ? size : frame
  const defaultIdx = isSize ? defaultSizeIdx : defaultFrameIdx
  const label = (v: string | number): string => (isSize ? `${v}` : `${v} fps`)

  const handleAdd = (): void => {
    if (isSize) {
      addSize(newItem)
    } else {
      addFrame(newItem)
    }
    setNewItem('')
  }

  return (
    <div className="flex flex-col gap-3">
      <Select
        value={current}
        onValueChange={(v) => {
          if (isSize) {
            setSize(String(v))
          } else {
            setFrame(Number(v))
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {(value: string | number | null) =>
              value == null ? (isSize ? '选择分辨率' : '选择帧数') : label(value)
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((v) => (
              <SelectItem key={v} value={v}>
                {label(v)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-1.5">
        {options.map((v, idx) => (
          <Badge key={v} variant={current === v ? 'default' : 'secondary'}>
            {label(v)}
            {idx > defaultIdx && (
              <button
                type="button"
                title="删除"
                onClick={() => {
                  removeItem(type, idx)
                }}
                className="-mr-1 ml-0.5 flex cursor-pointer items-center rounded-full opacity-60 transition-opacity hover:opacity-100"
              >
                <XIcon className="size-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <InputGroup className="flex-1">
          <InputGroupInput
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd()
              }
            }}
            placeholder={placeholder}
          />
          {newItem && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                title="清空"
                onClick={() => {
                  setNewItem('')
                }}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
        <Button onClick={handleAdd}>添加</Button>
      </div>
    </div>
  )
}
