import { ClapperboardIcon } from 'lucide-react'
import type { JSX } from 'react'

import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

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
    <header className="drag flex items-center justify-between border-b border-border/70 bg-background/85 px-4 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <ClapperboardIcon className="size-3.5" />
        </span>
        <span className="text-sm font-semibold tracking-wide">视频转码</span>
      </div>

      <ToggleGroup
        className="no-drag"
        variant="outline"
        size="sm"
        spacing={0}
        value={[view]}
        onValueChange={(values) => {
          const next = values[0] as 'home' | 'settings' | undefined
          if (next) {
            onNavigate(next)
          }
        }}
      >
        {links.map((link) => (
          <ToggleGroupItem key={link.key} value={link.key}>
            {link.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </header>
  )
}
