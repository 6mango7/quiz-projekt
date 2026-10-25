import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from './contexts'
import { CheckIcon, XIcon } from '../components/Icons'

const VISIBLE_MS = 3500
const LEAVE_MS = 250

// Małe powiadomienia w rogu ekranu, np. "Zapisano zmiany"
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(1)

  const dismiss = useCallback((id) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), LEAVE_MS)
  }, [])

  const notify = useCallback(
    (message, type) => {
      const id = nextId.current++
      setToasts((list) => [...list, { id, message, type, leaving: false }])
      setTimeout(() => dismiss(id), VISIBLE_MS)
    },
    [dismiss],
  )

  const value = useMemo(
    () => ({
      success: (message) => notify(message, 'success'),
      error: (message) => notify(message, 'error'),
      info: (message) => notify(message, 'info'),
    }),
    [notify],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type} ${t.leaving ? 'leaving' : ''}`}>
            <span className="toast-icon">{t.type === 'error' ? <XIcon /> : <CheckIcon />}</span>
            <span>{t.message}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => dismiss(t.id)}
              aria-label="Zamknij powiadomienie"
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
