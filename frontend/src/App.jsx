import { useEffect, useState } from 'react'
import './App.css'

// ---------- Dane przykładowe (później będą przychodzić z backendu / API) ----------

const categories = [
  { id: 'it', name: 'Informatyka', tag: '</>', questions: 120 },
  { id: 'history', name: 'Historia', tag: '1410', questions: 95 },
  { id: 'geo', name: 'Geografia', tag: 'N↑', questions: 80 },
  { id: 'science', name: 'Nauka', tag: 'E=mc²', questions: 110 },
  { id: 'sport', name: 'Sport', tag: '1:0', questions: 60 },
  { id: 'culture', name: 'Film i muzyka', tag: '♪', questions: 75 },
]

const questionCounts = [10, 20, 30]
const levels = ['łatwy', 'średni', 'trudny']

const steps = [
  { title: 'wybierz kategorię', text: 'zdecyduj, z czego chcesz się dziś sprawdzić.' },
  { title: 'ustaw quiz', text: 'liczba pytań i poziom trudności – jak lubisz.' },
  { title: 'odpowiadaj', text: 'myszką albo klawiszami 1–4. liczy się trafność i czas.' },
  { title: 'sprawdź wynik', text: 'zobacz punkty i powalcz o miejsce w rankingu.' },
]

const topPlayers = [
  { name: 'kasia_q', score: 980, accuracy: 98, quizzes: 42 },
  { name: 'tomek99', score: 945, accuracy: 95, quizzes: 38 },
  { name: 'zuzanna', score: 910, accuracy: 93, quizzes: 51 },
  { name: 'quizmaster', score: 870, accuracy: 91, quizzes: 29 },
  { name: 'bartek', score: 845, accuracy: 90, quizzes: 33 },
]

// ---------- Funkcje pomocnicze ----------

// Na razie tylko komunikat – później tu będzie przejście do ekranu quizu
function startQuiz({ category, count, level }) {
  alert(`Start quizu: ${category.name} · ${count} pytań · poziom ${level}`)
}

// Motyw: najpierw zapisany w przeglądarce, a jak go nie ma – ustawienie systemu
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // brak dostępu do localStorage – używamy ustawień systemu
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

// ---------- Ikony ----------

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// ---------- Komponenty ----------
// Na razie wszystko w jednym pliku. Później można je przenieść
// do osobnych plików w folderze src/components/

function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'
  const themeLabel = isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="/" className="logo">
          <span className="logo-icon">?</span>
          <span className="logo-text">
            quiz<span>ownia</span>
          </span>
        </a>

        <nav className="nav">
          <a href="#kategorie">kategorie</a>
          <a href="#jak-grac">jak grać</a>
          <a href="#ranking">ranking</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button type="button" className="link-btn">
            zaloguj
          </button>
        </div>
      </div>
    </header>
  )
}

function QuizStart() {
  const [selected, setSelected] = useState(null)
  const [count, setCount] = useState(10)
  const [level, setLevel] = useState('średni')

  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions, 0)

  // Enter uruchamia quiz (jak "press enter to start")
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== 'Enter' || !selected) return

      const target = e.target instanceof Element ? e.target : document.body
      const isInteractive = target.closest('button, a, input, textarea, select')
      const isOutsidePanel = !target.closest('.quiz-start')
      const isUnselectedOption = target.closest('[aria-pressed="false"]')

      // Enter działa normalnie poza panelem quizu i na niewybranych opcjach
      if (isInteractive && (isOutsidePanel || isUnselectedOption)) return

      e.preventDefault()
      startQuiz({ category: selected, count, level })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selected, count, level])

  return (
    <section className="quiz-start">
      <div className="container">
        <h1>
          sprawdź swoją wiedzę<span className="accent">.</span>
        </h1>
        <p className="lead">
          wybierz kategorię, ustaw quiz i zobacz, jak wypadasz na tle innych.
        </p>

        <div className="config-bar" role="group" aria-label="Ustawienia quizu">
          <div className="config-group">
            <span className="config-label">pytania</span>
            {questionCounts.map((n) => (
              <button
                key={n}
                type="button"
                className={`pill ${count === n ? 'active' : ''}`}
                aria-pressed={count === n}
                onClick={() => setCount(n)}
              >
                {n}
              </button>
            ))}
          </div>

          <span className="config-divider" aria-hidden="true" />

          <div className="config-group">
            <span className="config-label">poziom</span>
            {levels.map((l) => (
              <button
                key={l}
                type="button"
                className={`pill ${level === l ? 'active' : ''}`}
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div id="kategorie" className="category-grid">
          {categories.map((cat) => {
            const isSelected = selected?.id === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                className={`category ${isSelected ? 'selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => setSelected(cat)}
              >
                <span className="category-tag">{cat.tag}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-meta">{cat.questions} pytań</span>
              </button>
            )
          })}
        </div>

        <div className="start-area">
          <button
            type="button"
            className="btn-start"
            disabled={!selected}
            onClick={() => startQuiz({ category: selected, count, level })}
          >
            {selected ? `start: ${selected.name.toLowerCase()}` : 'wybierz kategorię'}
          </button>
          <span className="hint">
            {selected ? (
              <>
                lub naciśnij <kbd>enter</kbd>
              </>
            ) : (
              'kliknij jedną z kategorii powyżej'
            )}
          </span>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-value">{categories.length}</span>
            <span className="stat-label">kategorii</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalQuestions}</span>
            <span className="stat-label">pytań w bazie</span>
          </div>
          <div className="stat">
            <span className="stat-value">{count}</span>
            <span className="stat-label">pytań w quizie</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuestionPreview() {
  const answers = [
    'HyperText Markup Language',
    'High Tech Modern Language',
    'Home Tool Markup Language',
    'Hyperlink Text Making Language',
  ]

  return (
    <div className="preview" aria-hidden="true">
      <div className="preview-top">
        <span>informatyka</span>
        <span>3 / 10</span>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: '30%' }} />
      </div>
      <h3>co oznacza skrót HTML?</h3>
      <ul className="answers">
        {answers.map((answer, i) => (
          <li key={answer} className={i === 0 ? 'correct' : ''}>
            <kbd>{i + 1}</kbd>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  )
}

function HowToPlay() {
  return (
    <section id="jak-grac" className="section">
      <div className="container">
        <h2 className="section-title">jak grać</h2>
        <div className="how">
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-number">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <QuestionPreview />
        </div>
      </div>
    </section>
  )
}

function Leaderboard() {
  return (
    <section id="ranking" className="section">
      <div className="container">
        <h2 className="section-title">
          ranking <small>top 5 tego tygodnia</small>
        </h2>
        <div className="table-wrap">
          <table className="leaderboard">
            <thead>
              <tr>
                <th>#</th>
                <th>gracz</th>
                <th className="num">punkty</th>
                <th className="num">trafność</th>
                <th className="num">quizy</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player, i) => (
                <tr key={player.name}>
                  <td className="place">{i + 1}</td>
                  <td className="player">{player.name}</td>
                  <td className="num score">{player.score}</td>
                  <td className="num">{player.accuracy}%</td>
                  <td className="num">{player.quizzes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Footer({ theme }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <a href="#">github</a>
          <a href="#">kontakt</a>
          <a href="#">regulamin</a>
        </div>
        <span>
          quizownia · v0.1 · motyw {theme === 'dark' ? 'ciemny' : 'jasny'}
        </span>
      </div>
    </footer>
  )
}

// ---------- Główny komponent ----------

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Ustawia motyw na <html data-theme="..."> i zapamiętuje go w przeglądarce
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // brak dostępu do localStorage – motyw nie zostanie zapamiętany
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <QuizStart />
        <HowToPlay />
        <Leaderboard />
      </main>
      <Footer theme={theme} />
    </>
  )
}

export default App
