import { Link, useLocation } from 'react-router'
import { Emoji } from '../components/Emoji'

// Tymczasowa strona dla podstron, które jeszcze nie powstały.
// Gdy zrobisz daną stronę, podmień ją w App.jsx (np. element: <LoginPage />).
export function UnderConstructionPage({ title }) {
  const { pathname } = useLocation()

  return (
    <div className="container under-construction">
      <div className="uc-card">
        <span className="uc-icon" aria-hidden="true">
          <Emoji char="🚧" />
        </span>
        <h1>{title}</h1>
        <p>Ta strona jest jeszcze w budowie. Zajrzyj tu wkrótce.</p>
        <Link to="/" className="btn btn-primary">
          Wróć na stronę główną
        </Link>
        <code className="uc-path">{pathname}</code>
      </div>
    </div>
  )
}
