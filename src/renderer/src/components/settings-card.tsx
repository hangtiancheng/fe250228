import type { ReactNode } from 'react'

interface SettingsCardProps {
  title: string
  children: ReactNode
}

export default function SettingsCard({ title, children }: SettingsCardProps): JSX.Element {
  return (
    <section className="rounded-xl border border-ink-600/50 bg-ink-800 p-3 shadow-md shadow-black/20">
      <h2 className="m-0 mb-2 text-xs font-medium tracking-wider text-slate-400">{title}</h2>
      {children}
    </section>
  )
}
