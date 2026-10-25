import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import * as api from '../api/api'
import { useAuth } from '../context/contexts'
import { useApi } from '../hooks/useApi'
import { Emoji } from '../components/Emoji'
import { HeroDuel } from '../components/HeroDuel'
import { HowItWorks } from '../components/HowItWorks'
import { QuizCard, QuizCardSkeletons } from '../components/QuizCard'
import { EmptyState, ErrorState } from '../components/Feedback'
import { PlusIcon } from '../components/Icons'
import { CATEGORIES, categoryLabel } from '../utils/constants'
import { capitalize, plural } from '../utils/format'

const SORTS = [
  { id: 'popular', label: 'Popularne' },
  { id: 'new', label: 'Nowe' },
  { id: 'top', label: 'Najlepiej oceniane' },
]

const PAGE_SIZE = 8

// Strona główna:
//  - pojedynek dnia (tylko gdy nikt nic nie wyszukuje)
//  - Twoje quizy (dla zalogowanych)
//  - wszystkie quizy z kategoriami i sortowaniem (?kategoria=, ?sort=, ?szukaj= w adresie)
//  - jak działa turniej + zachęta do stworzenia quizu
export function HomePage() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const search = params.get('szukaj')?.trim() ?? ''
  const category = params.get('kategoria') ?? 'all'
  const sort = params.get('sort') ?? 'popular'

  const popular = useApi(() => api.getQuizzes({ sort: 'popular' }), [])
  const mine = useApi(
    () => (user ? api.getProfile(user.username) : Promise.resolve(null)),
    [user?.username],
  )

  // po nowym wyszukiwaniu wracamy na górę strony, żeby było widać wyniki
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [search])

  return (
    <>
      {!search && popular.data && <HeroDuel quizzes={popular.data} />}

      {!search && mine.data?.quizzes.length > 0 && (
        <section className="home-section">
          <div className="container">
            <div className="section-head">
              <h2>Twoje quizy</h2>
              <Link to={`/profil/${user.username}`} className="text-link">
                Przejdź do profilu
              </Link>
            </div>
            <div className="qgrid">
              {mine.data.quizzes.slice(0, 4).map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuizBrowser search={search} category={category} sort={sort} />

      {!search && (
        <>
          <HowItWorks />
          <section className="home-section">
            <div className="container">
              <div className="cta-band">
                <div>
                  <h2>Masz pomysł na własny pojedynek?</h2>
                  <p>
                    Wrzuć co najmniej cztery zdjęcia i opublikuj quiz. Gracze zdecydują, które
                    wygra.
                  </p>
                </div>
                <Link to="/stworz" className="btn btn-primary btn-lg">
                  <PlusIcon /> Stwórz quiz
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

function QuizBrowser({ search, category, sort }) {
  const [params, setParams] = useSearchParams()
  // ile kart pokazać – po zmianie filtrów znowu od pierwszych 8
  const filterKey = `${search}|${category}|${sort}`
  const [shown, setShown] = useState({ key: filterKey, count: PAGE_SIZE })
  const visible = shown.key === filterKey ? shown.count : PAGE_SIZE
  const { data, error, loading, reload } = useApi(
    () => api.getQuizzes({ sort, category, search }),
    [sort, category, search],
  )

  function setFilter(key, value, defaultValue) {
    const next = new URLSearchParams(params)
    if (value === defaultValue) next.delete(key)
    else next.set(key, value)
    // replace + preventScrollReset: zmiana filtra nie przewija strony
    setParams(next, { replace: true, preventScrollReset: true })
  }

  function clearSearch() {
    const next = new URLSearchParams(params)
    next.delete('szukaj')
    setParams(next, { replace: true })
  }

  let title = 'Wszystkie quizy'
  if (category !== 'all') title = capitalize(categoryLabel(category))
  if (search) title = `Wyniki dla „${search}”`
  const Heading = search ? 'h1' : 'h2'

  return (
    <section className="home-section browse" id="quizy" aria-labelledby="browse-title">
      <div className="container">
        <div className="section-head">
          <div>
            <Heading id="browse-title">{title}</Heading>
            <p className="browse-count">
              {data ? `${data.length} ${plural(data.length, ['quiz', 'quizy', 'quizów'])}` : ' '}
              {search && (
                <button type="button" className="text-link" onClick={clearSearch}>
                  Wyczyść wyszukiwanie
                </button>
              )}
            </p>
          </div>
          <div className="tabs" role="tablist" aria-label="Sortowanie">
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={sort === s.id}
                className={`tab ${sort === s.id ? 'active' : ''}`}
                onClick={() => setFilter('sort', s.id, 'popular')}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="chips browse-chips" role="group" aria-label="Kategorie">
          <button
            type="button"
            className={`chip ${category === 'all' ? 'active' : ''}`}
            aria-pressed={category === 'all'}
            onClick={() => setFilter('kategoria', 'all', 'all')}
          >
            Wszystkie
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${category === c.id ? 'active' : ''}`}
              aria-pressed={category === c.id}
              onClick={() => setFilter('kategoria', c.id, 'all')}
            >
              <Emoji char={c.icon} /> {capitalize(c.label)}
            </button>
          ))}
        </div>

        {error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : !data ? (
          <QuizCardSkeletons />
        ) : data.length === 0 ? (
          <EmptyState
            title="Nie ma takich quizów"
            action={
              <Link to="/stworz" className="btn btn-primary">
                Stwórz taki quiz
              </Link>
            }
          >
            Spróbuj innego hasła albo innej kategorii – albo stwórz pierwszy taki quiz.
          </EmptyState>
        ) : (
          <>
            <div className={`qgrid ${loading ? 'is-loading' : ''}`}>
              {data.slice(0, visible).map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
            {visible < data.length && (
              <div className="show-more">
                <button
                  type="button"
                  className="btn btn-outline btn-lg"
                  onClick={() => setShown({ key: filterKey, count: visible + PAGE_SIZE })}
                >
                  Pokaż więcej
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
