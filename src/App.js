import React from 'react'
import './styles/global.css'
import { Navbar } from './components/navbar/Navbar'
import { NewsPage } from './components/news/NewsPage'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app-root">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <NewsPage />
    </div>
  )
}

export default App
