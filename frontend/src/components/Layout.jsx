import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'

// Wspólny układ każdej strony: nagłówek, treść, stopka
export function Layout() {
  const location = useLocation()

  // Po przejściu na inną stronę przewijamy na górę
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        przejdź do treści
      </a>
      <Header />
      {/* key sprawia, że animacja wejścia odpala się przy każdej zmianie strony */}
      <main id="main" className="page" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
