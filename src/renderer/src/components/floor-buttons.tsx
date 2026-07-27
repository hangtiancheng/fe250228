import { Button } from 'antd'
import { stopConvert, useConvertStore } from '../hooks/use-convert'
import { removeAll, resetAll } from '../hooks/use-video'

export default function FloorButtons(): JSX.Element {
  const isConverting = useConvertStore((s) => s.isConverting)

  return (
    <section className="flex justify-center gap-2">
      <Button size="small" type="primary" onClick={stopConvert}>
        结束转码
      </Button>
      <Button size="small" danger disabled={isConverting} onClick={removeAll}>
        全部清空
      </Button>
      <Button size="small" disabled={isConverting} onClick={resetAll}>
        全部重置
      </Button>
    </section>
  )
}
