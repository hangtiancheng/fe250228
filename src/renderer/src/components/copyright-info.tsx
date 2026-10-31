import { CopyrightIcon } from 'lucide-react'

export default function CopyrightInfo(): JSX.Element {
  return (
    <footer className="flex items-center justify-center gap-1.5 py-2.5 text-xs text-muted-foreground">
      <CopyrightIcon className="size-3.5" />
      <span>hangtiancheng</span>
    </footer>
  )
}
