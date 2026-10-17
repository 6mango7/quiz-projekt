import { useState } from 'react'
import './App.css'

// Tymczasowe dane – później będą przychodzić z backendu (API)
const categories = [
  { id: 1, name: 'Informatyka', icon: '💻', questions: 120 },
  { id: 2, name: 'Historia', icon: '🏛️', questions: 95 },
  { id: 3, name: 'Geografia', icon: '🌍', questions: 80 },
  { id: 4, name: 'Nauka', icon: '🔬', questions: 110 },
  { id: 5, name: 'Sport', icon: '⚽', questions: 60 },
  { id: 6, name: 'Film i muzyka', icon: '🎬', questions: 75 },
]

const steps = [
  { title: 'Wybierz kategorię', text: 'Zdecyduj, z czego chcesz się dziś sprawdzić.' },
  { title: 'Odpowiadaj na pytania', text: '10 pytań, cztery odpowiedzi, tylko jedna poprawna.' },
  { title: 'Sprawdź wynik', text: 'Zobacz swoje punkty i powalcz o miejsce w rankingu.' },
]

const topPlayers = [
  { name: 'kasia_q', score: 980 },
  { name: 'tomek99', score: 945 },
  { name: 'Zuzanna', score: 910 },
  { name: 'quizmaster', score: 870 },
  { name: 'Bartek', score: 845 },
]

// ---------- Komponenty ----------
// Na razie wszystko w jednym pliku. Później można je przenieść
// do osobnych plików w folderze src/components/

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="/" className="logo">
          <span className="logo-mark">Q</span>
          Quizownia
        </a>
        <nav className="nav">
          <a href="#kategorie">Kategorie</a>
          <a href="#jak-to-dziala">Jak to działa</a>
          <a href="#ranking">Ranking</a>
        </nav>
        <button type="button" className="btn btn-outline">
          Zaloguj się
        </button>
      </div>
    </header>
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
        <span className="badge">Informatyka</span>
        <span className="preview-count">Pytanie 3 / 10</span>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: '30%' }} />
      </div>
      <h3>Co oznacza skrót HTML?</h3>
      <ul className="preview-answers">
        {answers.map((answer, i) => (
          <li key={answer} className={i === 0 ? 'correct' : ''}>
            <span className="answer-letter">{'ABCD'[i]}</span>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Hero() {
  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions, 0)

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Sprawdź swoją wiedzę w kilka minut</h1>
          <p>
            Wybierz kategorię, odpowiedz na 10 pytań i porównaj swój wynik
            z innymi graczami.
          </p>
          <div className="hero-actions">
            <a href="#kategorie" className="btn btn-primary">
              Rozpocznij quiz
            </a>
            <a href="#ranking" className="btn btn-outline">
              Zobacz ranking
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{categories.length}</strong>
              <span>kategorii</span>
            </div>
            <div>
              <strong>{totalQuestions}</strong>
              <span>pytań</span>
            </div>
            <div>
              <strong>10</strong>
              <span>pytań w quizie</span>
            </div>
          </div>
        </div>
        <QuestionPreview />
      </div>
    </section>
  )
}

function Categories({ selected, onSelect }) {
  return (
    <section id="kategorie" className="section">
      <div className="container">
        <h2>Wybierz kategorię</h2>
        <p className="section-sub">Kliknij kategorię, a potem rozpocznij quiz.</p>

        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-card ${selected?.id === cat.id ? 'selected' : ''}`}
              onClick={() => onSelect(cat)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-meta">{cat.questions} pytań</span>
            </button>
          ))}
        </div>

        <div className="start-bar">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!selected}
            // TODO: tu później przejście do ekranu quizu
            onClick={() => alert(`Tu wystartuje quiz: ${selected.name}`)}
          >
            {selected ? `Start: ${selected.name}` : 'Najpierw wybierz kategorię'}
          </button>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="section section-alt">
      <div className="container">
        <h2>Jak to działa?</h2>
        <div className="steps">
          {steps.map((step, i) => (
            <div key={step.title} className="step">
              <span className="step-number">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Leaderboard() {
  return (
    <section id="ranking" className="section">
      <div className="container">
        <h2>Ranking graczy</h2>
        <p className="section-sub">Top 5 w tym tygodniu</p>
        <ol className="leaderboard">
          {topPlayers.map((player, i) => (
            <li key={player.name}>
              <span className="place">{i + 1}</span>
              <span className="player">{player.name}</span>
              <span className="score">{player.score} pkt</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">© 2026 Quizownia</div>
    </footer>
  )
}

// ---------- Główny komponent ----------

function App() {
  // Zapamiętuje, którą kategorię kliknął użytkownik
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories selected={selectedCategory} onSelect={setSelectedCategory} />
        <HowItWorks />
        <Leaderboard />
      </main>
      <Footer />
    </>
  )
}

export default App
