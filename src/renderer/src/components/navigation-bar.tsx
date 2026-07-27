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
    <header className="drag flex items-center justify-between border-b border-ink-600/60 bg-ink-950/80 px-4 py-3">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="no-drag flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold tracking-widest text-slate-100"
      >
        <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-amber-glow" />
        视频转码
      </button>

      <nav aria-label="页面导航" className="no-drag flex items-center gap-1">
        {links.map((link) => (
          <button
            key={link.key}
            type="button"
            aria-current={view === link.key ? 'page' : undefined}
            onClick={() => onNavigate(link.key)}
            className={`cursor-pointer rounded-md border-0 px-2.5 py-1 text-xs transition-colors ${
              view === link.key
                ? 'bg-amber-glow/15 font-medium text-amber-glow'
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
