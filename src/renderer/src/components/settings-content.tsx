import { useState } from 'react'
import { Button, Input, Select } from 'antd'
import { XCircle } from 'lucide-react'
import { addFrame, addSize, removeItem } from '../hooks/use-settings'
import { useSettingsStore } from '../store/use-settings-store'

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
  const options = (isSize ? sizeOptions : frameOptions).map((v) => ({ value: v, label: `${v}` }))

  const handleAdd = (): void => {
    if (isSize) addSize(newItem)
    else addFrame(newItem)
    setNewItem('')
  }

  return (
    <div className="flex flex-col gap-2">
      <Select
        value={isSize ? size : frame}
        onChange={(v) => (isSize ? setSize(v as string) : setFrame(v as number))}
        placeholder={isSize ? '选择分辨率' : '选择帧数'}
        options={options}
        optionRender={(option, { index }) => (
          <span className="flex items-center justify-between">
            <span>{option.label}</span>
            <button
              type="button"
              aria-label={`删除 ${option.label}`}
              onClick={(e) => {
                e.stopPropagation()
                removeItem(type, index)
              }}
              className="flex cursor-pointer items-center border-0 bg-transparent p-0.5 text-slate-500 hover:text-rose-400"
            >
              <XCircle size={14} aria-hidden="true" />
            </button>
          </span>
        )}
      />
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onPressEnter={handleAdd}
          allowClear
          placeholder={placeholder}
        />
        <Button type="primary" ghost onClick={handleAdd}>
          添加
        </Button>
      </div>
    </div>
  )
}
