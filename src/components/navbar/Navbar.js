import React from 'react'
import { CitizenLogo } from '../common/CitizenLogo'
import { APP_NAME, APP_TAGLINE } from '../../constants/branding'
import './Navbar.css'

export function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#top">
          <CitizenLogo className="citizen-logo-mark--header" />
          <span className="brand-text">
            <span className="brand-name">{APP_NAME}</span>
            <span className="brand-tagline">{APP_TAGLINE}</span>
          </span>
        </a>
        <div className="site-header-actions">
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
      </div>
    </header>
  )
}

export default Navbar
