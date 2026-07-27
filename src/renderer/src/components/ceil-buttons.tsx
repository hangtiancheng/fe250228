import { useEffect, useRef, useState } from 'react'
import { Plus, RotateCw } from 'lucide-react'
import { startConvert, subscribeMainOnce, useConvertStore } from '../hooks/use-convert'
import { addVideo } from '../hooks/use-video'

function addFiles(files: FileList | File[]): void {
  for (const file of Array.from(files)) {
    if (!file.type.startsWith('video/')) continue
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
    <section aria-label="添加与转码" className="flex items-center justify-center gap-6 py-1">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <button
        type="button"
        aria-label="添加视频"
        title="点击或拖入视频文件"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          addFiles(e.dataTransfer.files)
        }}
        className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border border-dashed bg-ink-800 text-slate-300 transition-all hover:border-amber-glow hover:text-amber-glow ${
          dragOver
            ? 'scale-105 border-amber-glow text-amber-glow shadow-[0_0_24px_rgba(245,166,35,0.25)]'
            : 'border-ink-600'
        }`}
      >
        <Plus size={42} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="开始转码"
        title="开始转码"
        disabled={isConverting}
        onClick={startConvert}
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border border-solid bg-ink-800 transition-all ${
          isConverting
            ? 'cursor-wait border-amber-glow/50 text-amber-glow shadow-[0_0_24px_rgba(245,166,35,0.25)]'
            : 'cursor-pointer border-ink-600 text-slate-300 hover:border-amber-glow hover:text-amber-glow'
        }`}
      >
        <RotateCw size={42} aria-hidden="true" className={isConverting ? 'animate-spin' : ''} />
      </button>
    </section>
  )
}
