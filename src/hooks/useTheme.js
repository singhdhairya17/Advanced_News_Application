import { useCallback, useEffect, useState } from 'react'
import { THEME_STORAGE_KEY } from '../constants/storageKeys'

function readStoredTheme() {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem(THEME_STORAGE_KEY) || 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(() => readStoredTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
