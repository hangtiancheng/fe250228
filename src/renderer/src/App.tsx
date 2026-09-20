import { useState } from 'react'
import NavigationBar from './components/navigation-bar'
import CopyrightInfo from './components/copyright-info'
import ConvertHome from './views/convert-home'
import ConvertSettings from './views/convert-settings'

export default function App(): JSX.Element {
  const [view, setView] = useState<'home' | 'settings'>('home')

  return (
    <div className="flex h-screen flex-col">
      <NavigationBar view={view} onNavigate={setView} />
      <main className="flex-1 overflow-y-auto">
        {view === 'home' ? <ConvertHome /> : <ConvertSettings />}
      </main>
      <CopyrightInfo />
    </div>
  )
}
