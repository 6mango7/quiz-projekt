import { Link } from 'react-router'
import { useTheme } from '../context/contexts'
import { Carousel } from './Carousel'
import { MoonIcon, SunIcon } from './Icons'
import { Emoji } from './Emoji'

// Kolorowe karty na stronie głównej – każda pokazuje jedną funkcję strony.
// Makiety w środku to zwykły HTML + CSS (bez obrazków), animują się po najechaniu.
export function FeatureCards({ featuredQuizId, onRandom }) {
  const quizLink = featuredQuizId ? `/quiz/${featuredQuizId}` : '/?sort=popular'

  return (
    <Carousel label="Co możesz robić w Quizowni" className="carousel-features">
      <Link to={quizLink} className="feature-card fc-duel" style={{ '--i': 0 }}>
        <FeatureHead title="Pojedynki" />
        <DuelMock />
      </Link>

      <Link to="/stworz" className="feature-card fc-create" style={{ '--i': 1 }}>
        <FeatureHead title="Własne quizy" />
        <EditorMock />
      </Link>

      <Link to={quizLink} className="feature-card fc-ranking" style={{ '--i': 2 }}>
        <FeatureHead title="Ranking" />
        <RankingMock />
      </Link>

      <Link to="/?sort=top" className="feature-card fc-reviews" style={{ '--i': 3 }}>
        <FeatureHead title="Oceny" />
        <ReviewsMock />
      </Link>

      <button
        type="button"
        className="feature-card fc-podium"
        style={{ '--i': 4 }}
        onClick={onRandom}
      >
        <FeatureHead title="Twoje podium" />
        <PodiumMock />
      </button>

      <ThemeCard />
    </Carousel>
  )
}

function FeatureHead({ title }) {
  return (
    <div className="feature-head">
      <h3>{title}</h3>
    </div>
  )
}

// Wskaźnik myszy do makiety pojedynku
function Cursor() {
  return (
    <svg className="mock-cursor" viewBox="0 0 24 24" width="38" height="38" aria-hidden="true">
      <path
        d="M5 3l14 7-6 2-2 6z"
        fill="#0a092d"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DuelMock() {
  return (
    <div className="feature-body mock-duel" aria-hidden="true">
      <span className="mock-round">Ćwierćfinał 2/4</span>
      <div className="mock-duel-pair">
        <div className="mock-option mock-option-a">
          <span className="mock-emoji">
            <Emoji char="🍕" />
          </span>
          <span>Pizza</span>
        </div>
        <span className="mock-vs">vs</span>
        <div className="mock-option mock-option-b">
          <span className="mock-emoji">
            <Emoji char="🍣" />
          </span>
          <span>Sushi</span>
        </div>
      </div>
      <Cursor />
    </div>
  )
}

function EditorMock() {
  return (
    <div className="feature-body feature-body-bottom" aria-hidden="true">
      <div className="mock-panel mock-editor">
        <div className="mock-panel-title">Nowy quiz</div>
        <div className="mock-field">Najlepsza pizza</div>
        <ul className="mock-rows">
          <li>
            <span className="mock-num">1</span>
            <Emoji char="🍕" /> Margherita
          </li>
          <li>
            <span className="mock-num">2</span>
            <Emoji char="🌶️" /> Diavola
          </li>
          <li className="mock-row-new">
            <span className="mock-num">3</span>
            <span className="mock-typing">
              <Emoji char="🍍" /> Hawajska
            </span>
          </li>
        </ul>
        <div className="mock-add">+ Dodaj opcję</div>
        <div className="mock-publish">Opublikuj</div>
      </div>
    </div>
  )
}

const RANKING = [
  { emoji: '🦦', name: 'Wydra', value: 64 },
  { emoji: '🐱', name: 'Kot', value: 48 },
  { emoji: '🦊', name: 'Lis', value: 31 },
  { emoji: '🐧', name: 'Pingwin', value: 22 },
  { emoji: '🐼', name: 'Panda', value: 15 },
]

function RankingMock() {
  return (
    <div className="feature-body feature-body-bottom" aria-hidden="true">
      <div className="mock-panel mock-ranking">
        <div className="mock-panel-title">Najsłodsze zwierzę</div>
        <div className="mock-tabs">
          <span className="active">Ranking</span>
          <span>Komentarze</span>
        </div>
        <ol>
          {RANKING.map((row, i) => (
            <li key={row.name} style={{ '--i': i }}>
              <span className="mock-place">{i + 1}</span>
              <span className="mock-emoji-sm">
                <Emoji char={row.emoji} />
              </span>
              <span className="mock-name">{row.name}</span>
              <span className="mock-bar">
                {/* pasek względem lidera, jak w prawdziwym rankingu */}
                <span style={{ width: `${(row.value / RANKING[0].value) * 100}%` }} />
              </span>
              <span className="mock-value">{row.value}%</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function ReviewsMock() {
  return (
    <div className="feature-body mock-reviews" aria-hidden="true">
      <div className="mock-score">
        <strong>4,8</strong>
        <span className="mock-stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ '--i': i }}>
              ★
            </span>
          ))}
        </span>
      </div>
      <div className="mock-comment">
        <span className="mock-avatar" style={{ background: '#ff8fab' }}>
          K
        </span>
        <span>Pierogi w finale, tak być musi!</span>
      </div>
      <div className="mock-comment mock-comment-right">
        <span>Trudny wybór, zagram jeszcze raz.</span>
        <span className="mock-avatar" style={{ background: '#7fd1ff' }}>
          T
        </span>
      </div>
    </div>
  )
}

function PodiumMock() {
  return (
    <div className="feature-body feature-body-bottom mock-podium" aria-hidden="true">
      <div className="mock-podium-col second">
        <span className="mock-emoji">
          <Emoji char="🐱" />
        </span>
        <span className="mock-step">2</span>
      </div>
      <div className="mock-podium-col first">
        <span className="mock-crown">
          <Emoji char="👑" />
        </span>
        <span className="mock-emoji">
          <Emoji char="🦦" />
        </span>
        <span className="mock-step">1</span>
      </div>
      <div className="mock-podium-col third">
        <span className="mock-emoji">
          <Emoji char="🦊" />
        </span>
        <span className="mock-step">3</span>
      </div>
    </div>
  )
}

// Karta-przełącznik motywu: kliknięcie naprawdę zmienia motyw strony
function ThemeCard() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="feature-card fc-theme"
      style={{ '--i': 5 }}
      onClick={toggleTheme}
      aria-label={isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
    >
      <FeatureHead title="Jasny i ciemny" />
      <div className="feature-body mock-theme" aria-hidden="true">
        <div className={`mock-switch ${isDark ? 'on' : ''}`}>
          <SunIcon className="mock-switch-sun" />
          <MoonIcon className="mock-switch-moon" />
          <span className="mock-knob" />
        </div>
        <span className="mock-theme-hint">
          Teraz: {isDark ? 'ciemny' : 'jasny'}. Kliknij, żeby zmienić.
        </span>
      </div>
    </button>
  )
}
