import { useState, useEffect } from 'react'
import { WorkerProvider } from './context/WorkerContext'
import Transverter from './components/Transverter'
import LandingPage from './components/landing/LandingPage'
import TopNav from './components/TopNav'

function App() {
  const [showApp, setShowApp] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <WorkerProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {!showApp ? (
          <div className="overflow-y-auto w-full">
            <TopNav theme={theme} setTheme={setTheme} onLaunchApp={() => setShowApp(true)} isApp={false} />
            <LandingPage />
          </div>
        ) : (
          <Transverter theme={theme} setTheme={setTheme} />
        )}
      </div>
    </WorkerProvider>
  )
}

export default App
