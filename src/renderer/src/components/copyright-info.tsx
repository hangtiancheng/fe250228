import { Copyright } from 'lucide-react'

export default function CopyrightInfo(): JSX.Element {
  return (
    <footer className="flex scale-90 items-center justify-center gap-1.5 py-2 text-xs text-slate-500">
      <Copyright size={14} />
      <span>hangtiancheng</span>
    </footer>
  )
}
