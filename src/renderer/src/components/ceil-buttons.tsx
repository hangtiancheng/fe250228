import { cn } from 'cn'
import { PlusIcon, RotateCwIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { JSX } from 'react'

import { startConvert, subscribeMainOnce, useConvertStore } from '../hooks/use-convert'
import { addVideo } from '../hooks/use-video'

import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

function addFiles(files: FileList | File[]): void {
  for (const file of Array.from(files)) {
    if (!file.type.startsWith('video/')) {
      continue
    }
    addVideo({
      filename: file.name,
      filepath: window.api.getFilePath(file),
      progress: 0,
      state: 'pending'
    })
  }
}

export default function CeilButtons(): JSX.Element {
  const isConverting = useConvertStore((s) => s.isConverting)
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    subscribeMainOnce()
  }, [])

  return (
    <section className="flex items-center justify-center gap-5 py-2">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            addFiles(e.target.files)
          }
          e.target.value = ''
        }}
      />

      <button
        type="button"
        title="点击或拖入视频文件"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => {
          setDragOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          'flex size-20 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-md',
          dragOver && 'scale-105 border-primary bg-primary/5 text-primary shadow-md'
        )}
      >
        <PlusIcon className="size-9" strokeWidth={1.75} />
      </button>

      <Button
        type="button"
        title="开始转码"
        disabled={isConverting}
        onClick={startConvert}
        className="size-20 rounded-2xl"
      >
        {isConverting ? (
          <Spinner className="size-8" />
        ) : (
          <RotateCwIcon className="size-8" strokeWidth={1.75} />
        )}
      </Button>
    </section>
  )
}
