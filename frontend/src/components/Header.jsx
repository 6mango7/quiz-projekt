import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useAuth, useTheme, useToast } from '../context/contexts'
import { useDismiss } from '../hooks/useDismiss'
import { Avatar } from './Avatar'
import { Logo } from './Logo'
import {
  ChevronDownIcon,
  LogoutIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  XIcon,
} from './Icons'

export function Header() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const themeLabel = isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'

  return (
    <header className="header">
      <div className="header-inner">
        <Logo />

        <SearchBox />

        <div className="header-actions">
          <Link to="/stworz" className="btn btn-outline btn-sm header-create">
            <PlusIcon /> Stwórz quiz
          </Link>
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {/* key wymusza ponowne odtworzenie animacji przy zmianie motywu */}
            <span key={theme} className="theme-icon">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link to="/logowanie" className="btn btn-outline btn-sm">
                Zaloguj się
              </Link>
              <Link to="/rejestracja" className="btn btn-primary btn-sm header-register">
                Zarejestruj się
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// Wyszukiwarka – po wciśnięciu Enter pokazuje wyniki na stronie głównej.
// key = aktualne hasło z adresu, dzięki temu pole się czyści po wyjściu z wyników.
function SearchBox() {
  const [params] = useSearchParams()
  const current = params.get('szukaj') ?? ''
  return <SearchForm key={current} initial={current} />
}

function SearchForm({ initial }) {
  const [value, setValue] = useState(initial)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // klawisz "/" przenosi do wyszukiwarki
  useEffect(() => {
    function handleKey(e) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target instanceof Element ? e.target : null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const query = value.trim()
    navigate(query ? `/?szukaj=${encodeURIComponent(query)}` : '/')
    inputRef.current?.blur()
  }

  function clear() {
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <form className="header-search" role="search" onSubmit={handleSubmit}>
      <SearchIcon className="header-search-icon" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Szukaj quizów"
        aria-label="Szukaj quizów"
      />
      {value ? (
        <button
          type="button"
          className="header-search-clear"
          onClick={clear}
          aria-label="Wyczyść wyszukiwanie"
        >
          <XIcon />
        </button>
      ) : (
        <kbd className="header-search-kbd" title="Naciśnij /, żeby szukać">
          /
        </kbd>
      )}
    </form>
  )
}

function UserMenu({ user }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  useDismiss(ref, open, () => setOpen(false))

  async function handleLogout() {
    setOpen(false)
    // najpierw (od razu, flushSync) wychodzimy na stronę główną – inaczej strona
    // dostępna tylko po zalogowaniu (np. ustawienia) odesłałaby nas do logowania
    navigate('/', { flushSync: true })
    await logout()
    toast.info('Wylogowano. Do zobaczenia!')
  }

  const close = () => setOpen(false)

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-menu-button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar user={user} size={32} />
        <span className="user-menu-name">{user.username}</span>
        <ChevronDownIcon className={`chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="dropdown" role="menu">
          <Link to={`/profil/${user.username}`} role="menuitem" onClick={close}>
            <UserIcon /> Mój profil
          </Link>
          <Link to="/stworz" role="menuitem" onClick={close}>
            <PlusIcon /> Stwórz quiz
          </Link>
          <Link to="/ustawienia" role="menuitem" onClick={close}>
            <SettingsIcon /> Ustawienia
          </Link>
          <hr />
          <button type="button" role="menuitem" onClick={handleLogout}>
            <LogoutIcon /> Wyloguj się
          </button>
        </div>
      )}
    </div>
  )
}
