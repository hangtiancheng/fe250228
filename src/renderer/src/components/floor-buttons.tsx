import { EraserIcon, RotateCcwIcon, StopCircleIcon } from 'lucide-react'
import type { JSX } from 'react'

import { stopConvert, useConvertStore } from '../hooks/use-convert'
import { removeAll, resetAll } from '../hooks/use-video'

import { Button } from './ui/button'

export default function FloorButtons(): JSX.Element {
  const isConverting = useConvertStore((s) => s.isConverting)

  return (
    <section className="flex justify-center gap-2">
      <Button size="sm" onClick={stopConvert}>
        <StopCircleIcon data-icon="inline-start" />
        结束转码
      </Button>
      <Button size="sm" variant="destructive" disabled={isConverting} onClick={removeAll}>
        <EraserIcon data-icon="inline-start" />
        全部清空
      </Button>
      <Button size="sm" variant="outline" disabled={isConverting} onClick={resetAll}>
        <RotateCcwIcon data-icon="inline-start" />
        全部重置
      </Button>
    </section>
  )
}
