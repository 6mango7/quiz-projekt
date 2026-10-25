import { Link } from 'react-router'
import { useAuth, useTheme } from '../context/contexts'
import { Logo } from './Logo'

export function Footer() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Quizy w formie turnieju. W każdej rundzie dwie opcje, na końcu jeden zwycięzca.</p>
        </div>

        <nav className="footer-col" aria-label="Graj">
          <h2>Graj</h2>
          <ul>
            <li>
              <Link to="/?sort=popular">Popularne quizy</Link>
            </li>
            <li>
              <Link to="/?sort=new">Nowe quizy</Link>
            </li>
            <li>
              <Link to="/?sort=top">Najlepiej oceniane</Link>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Twórz">
          <h2>Twórz</h2>
          <ul>
            <li>
              <Link to="/stworz">Stwórz quiz</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to={`/profil/${user.username}`}>Mój profil</Link>
                </li>
                <li>
                  <Link to="/ustawienia">Ustawienia</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/rejestracja">Zarejestruj się</Link>
                </li>
                <li>
                  <Link to="/logowanie">Zaloguj się</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Pomoc">
          <h2>Pomoc</h2>
          <ul>
            <li>
              <Link to="/kontakt">Kontakt</Link>
            </li>
            <li>
              <a href="https://github.com/6mango7/quiz-projekt" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span>© 2026 Quizownia</span>
          <button type="button" className="text-link" onClick={toggleTheme}>
            {theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
          </button>
        </div>
      </div>
    </footer>
  )
}
