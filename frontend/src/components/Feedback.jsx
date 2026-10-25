import { Link } from 'react-router'

// Komunikaty: błąd i pusta lista

export function ErrorState({ error, onRetry }) {
  return (
    <div className="state">
      <span className="state-code">Ups</span>
      <p>{error?.message ?? 'Coś poszło nie tak.'}</p>
      <div className="state-actions">
        {onRetry && (
          <button type="button" className="btn btn-outline" onClick={onRetry}>
            Spróbuj ponownie
          </button>
        )}
        <Link to="/" className="btn btn-primary">
          Strona główna
        </Link>
      </div>
    </div>
  )
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="state state-empty">
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action && <div className="state-actions">{action}</div>}
    </div>
  )
}
