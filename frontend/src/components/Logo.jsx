import { Link } from 'react-router'

// Logo: znak "pojedynku" (kwadrat przecięty na czerwony i niebieski narożnik) + nazwa
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Quizownia – strona główna">
      <span className="logo-mark" aria-hidden="true" />
      Quizownia
    </Link>
  )
}
