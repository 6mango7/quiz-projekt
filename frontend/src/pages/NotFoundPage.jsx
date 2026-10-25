import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="container under-construction">
      <div className="uc-card">
        <span className="uc-number" aria-hidden="true">
          404
        </span>
        <h1>Nie ma takiej strony</h1>
        <p>Sprawdź, czy adres jest poprawny, albo wróć na stronę główną.</p>
        <Link to="/" className="btn btn-primary">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  )
}
