interface NavigationBarProps {
  view: 'home' | 'settings'
  onNavigate: (view: 'home' | 'settings') => void
}

const links = [
  { key: 'home', label: '转码' },
  { key: 'settings', label: '高级设置' }
] as const

export default function NavigationBar({ view, onNavigate }: NavigationBarProps): JSX.Element {
  return (
    <header className="drag border-ink-600/60 bg-ink-950/80 flex items-center justify-between border-b px-4 py-3">
      <button
        type="button"
        onClick={() => {
          onNavigate('home')
        }}
        className="no-drag flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold tracking-widest text-slate-100"
      >
        <span className="bg-amber-glow h-2 w-2 animate-pulse rounded-full" />
        视频转码
      </button>

      <nav className="no-drag flex items-center gap-1">
        {links.map((link) => (
          <button
            key={link.key}
            type="button"
            onClick={() => {
              onNavigate(link.key)
            }}
            className={`cursor-pointer rounded-md border-0 px-2.5 py-1 text-xs transition-colors ${
              view === link.key
                ? 'bg-amber-glow/15 text-amber-glow font-medium'
                : 'bg-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
