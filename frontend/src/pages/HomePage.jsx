import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import * as api from '../api/api'
import { useAuth } from '../context/contexts'
import { useApi } from '../hooks/useApi'
import { Carousel } from '../components/Carousel'
import { FeatureCards } from '../components/FeatureCards'
import { HowItWorks } from '../components/HowItWorks'
import { QuizSpotlight } from '../components/QuizSpotlight'
import { QuizTile, QuizTileSkeletons } from '../components/QuizTile'
import { EmptyState, ErrorState } from '../components/Feedback'
import { ArrowLeftIcon } from '../components/Icons'
import { CATEGORIES, categoryLabel } from '../utils/constants'
import { capitalize, plural } from '../utils/format'

// Strona główna ma dwa widoki:
//  - zwykły (powitanie, karty funkcji, popularne i nowe quizy, kategorie)
//  - lista quizów, gdy w adresie jest ?szukaj=, ?kategoria= albo ?sort=
export function HomePage() {
  const [params] = useSearchParams()
  const search = params.get('szukaj')?.trim() ?? ''
  const category = params.get('kategoria') ?? 'all'
  const sort = params.get('sort') ?? 'popular'
  const browsing = params.has('szukaj') || params.has('kategoria') || params.has('sort')
  const view = params.toString()

  // po zmianie widoku przewijamy na górę
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [view])

  if (browsing) return <QuizBrowser search={search} category={category} sort={sort} />
  return <Landing />
}

// ---------- Widok zwykły ----------

function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const popular = useApi(() => api.getQuizzes({ sort: 'popular' }), [])
  const fresh = useApi(() => api.getQuizzes({ sort: 'new' }), [])
  const mine = useApi(
    () => (user ? api.getProfile(user.username) : Promise.resolve(null)),
    [user?.username],
  )

  function playRandom() {
    const list = popular.data
    if (!list?.length) return
    const quiz = list[Math.floor(Math.random() * list.length)]
    navigate(`/quiz/${quiz.id}`)
  }

  return (
    <>
      <section className="home-hero">
        <div className="container">
          <h1>W co dziś zagrasz?</h1>
          <p>
            Odkrywaj, twórz i rozgrywaj quizy w formie turnieju. W każdej rundzie wybierasz jedną z
            dwóch opcji, aż zostanie Twój zwycięzca.
          </p>
          <div className="home-hero-actions">
            {user ? (
              <Link to="/stworz" className="btn btn-primary btn-lg">
                Stwórz quiz
              </Link>
            ) : (
              <Link to="/rejestracja" className="btn btn-primary btn-lg">
                Zarejestruj się za darmo
              </Link>
            )}
            <button type="button" className="text-link" onClick={playRandom}>
              Zagraj w losowy quiz
            </button>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="container">
          <FeatureCards featuredQuizId={popular.data?.[0]?.id} onRandom={playRandom} />
        </div>
      </section>

      {mine.data?.quizzes.length > 0 && (
        <QuizRow
          title="Twoje quizy"
          link={`/profil/${user.username}`}
          linkLabel="Przejdź do profilu"
          result={{ ...mine, data: mine.data.quizzes }}
        />
      )}
      {popular.data && <QuizSpotlight quizzes={popular.data} />}
      <QuizRow title="Popularne quizy" link="/?sort=popular" result={popular} />
      <QuizRow title="Nowe quizy" link="/?sort=new" result={fresh} />
      <Categories quizzes={popular.data} />
      <HowItWorks />

      <section className="home-cta">
        <div className="container">
          <div className="cta-box">
            <div>
              <h2>Masz pomysł na własny turniej?</h2>
              <p>Dodaj co najmniej cztery opcje i opublikuj. Gracze zdecydują, która wygra.</p>
            </div>
            <Link to="/stworz" className="btn btn-highlight btn-lg">
              Stwórz quiz
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// Rząd quizów z tytułem, linkiem "Zobacz wszystkie" i strzałkami
function QuizRow({ title, link, linkLabel = 'Zobacz wszystkie', result }) {
  const { data, error, reload } = result

  return (
    <section className="home-section">
      <div className="container">
        <div className="home-section-head">
          <h2>{title}</h2>
          {link && (
            <Link to={link} className="text-link">
              {linkLabel}
            </Link>
          )}
        </div>

        {error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : !data ? (
          <QuizTileSkeletons />
        ) : data.length === 0 ? (
          <p className="muted">Na razie nic tu nie ma.</p>
        ) : (
          <Carousel label={title}>
            {data.slice(0, 9).map((quiz) => (
              <QuizTile key={quiz.id} quiz={quiz} />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  )
}

function Categories({ quizzes }) {
  const counts = {}
  for (const quiz of quizzes ?? []) {
    counts[quiz.category] = (counts[quiz.category] ?? 0) + 1
  }

  return (
    <section className="home-section">
      <div className="container">
        <div className="home-section-head">
          <h2>Kategorie</h2>
        </div>
        <ul className="category-tiles">
          {CATEGORIES.map((c) => {
            const count = counts[c.id] ?? 0
            return (
              <li key={c.id}>
                <Link to={`/?kategoria=${c.id}`} className="category-tile">
                  <span
                    className="category-tile-icon"
                    style={{ background: c.color }}
                    aria-hidden="true"
                  >
                    {c.icon}
                  </span>
                  <span className="category-tile-text">
                    <strong>{capitalize(c.label)}</strong>
                    <span>
                      {quizzes ? `${count} ${plural(count, ['quiz', 'quizy', 'quizów'])}` : ' '}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

// ---------- Lista quizów (wyszukiwanie, kategoria, sortowanie) ----------

const SORTS = [
  { id: 'popular', label: 'Popularne', title: 'Popularne quizy' },
  { id: 'new', label: 'Nowe', title: 'Nowe quizy' },
  { id: 'top', label: 'Najlepiej oceniane', title: 'Najlepiej oceniane quizy' },
]

function QuizBrowser({ search, category, sort }) {
  const [params, setParams] = useSearchParams()
  const { data, error, loading, reload } = useApi(
    () => api.getQuizzes({ sort, category, search }),
    [sort, category, search],
  )

  function setFilter(key, value) {
    const next = new URLSearchParams(params)
    if (key === 'kategoria' && value === 'all') next.delete('kategoria')
    else next.set(key, value)
    // bez żadnego filtra wrócilibyśmy do zwykłej strony głównej
    if (!next.has('szukaj') && !next.has('kategoria')) next.set('sort', next.get('sort') ?? sort)
    setParams(next, { replace: true })
  }

  function clearSearch() {
    const next = new URLSearchParams(params)
    next.delete('szukaj')
    next.set('sort', sort)
    setParams(next, { replace: true })
  }

  let title = SORTS.find((s) => s.id === sort)?.title ?? 'Quizy'
  if (category !== 'all') title = capitalize(categoryLabel(category))
  if (search) title = `Wyniki dla „${search}”`

  return (
    <div className="container browse">
      <Link to="/" className="back-link">
        <ArrowLeftIcon /> Strona główna
      </Link>
      <h1 className="browse-title">{title}</h1>
      <p className="browse-count muted">
        {data ? `${data.length} ${plural(data.length, ['quiz', 'quizy', 'quizów'])}` : ' '}
        {search && (
          <>
            {' '}
            <button type="button" className="text-link" onClick={clearSearch}>
              Wyczyść wyszukiwanie
            </button>
          </>
        )}
      </p>

      <div className="tabs tabs-underline" role="tablist" aria-label="Sortowanie">
        {SORTS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={sort === s.id}
            className={`tab ${sort === s.id ? 'active' : ''}`}
            onClick={() => setFilter('sort', s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="chips browse-chips" role="group" aria-label="Kategorie">
        <button
          type="button"
          className={`chip ${category === 'all' ? 'active' : ''}`}
          aria-pressed={category === 'all'}
          onClick={() => setFilter('kategoria', 'all')}
        >
          Wszystkie
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip ${category === c.id ? 'active' : ''}`}
            aria-pressed={category === c.id}
            onClick={() => setFilter('kategoria', c.id)}
          >
            {c.icon} {capitalize(c.label)}
          </button>
        ))}
      </div>

      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <QuizTileSkeletons count={6} />
      ) : data.length === 0 ? (
        <EmptyState
          title="Nie znaleźliśmy takich quizów"
          action={
            <Link to="/stworz" className="btn btn-primary">
              Stwórz taki quiz
            </Link>
          }
        >
          Spróbuj innego hasła albo innej kategorii.
        </EmptyState>
      ) : (
        <div className={`tile-grid ${loading ? 'is-loading' : ''}`}>
          {data.map((quiz) => (
            <QuizTile key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  )
}
