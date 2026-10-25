import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './contexts'

const STORAGE_KEY = 'quizownia:theme'

// Motyw zapisany w przeglądarce, a jak go nie ma – jasny
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // brak dostępu do localStorage
  }
  return 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Motyw trafia na <html data-theme="..."> – stamtąd biorą go style CSS
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // motyw nie zostanie zapamiętany
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
