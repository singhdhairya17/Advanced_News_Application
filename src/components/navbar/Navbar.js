import React from 'react'
import { APP_NAME } from '../../constants/branding'
import './Navbar.css'

export function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          {APP_NAME}
        </a>
        <nav className="site-nav" aria-label="Main">
          <a href="#top">Home</a>
          <a href="#feed">Feed</a>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
