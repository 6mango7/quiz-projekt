import { useState } from 'react'
import { Link } from 'react-router'
import * as api from '../api/api'
import { useApi } from '../hooks/useApi'
import { CandidateImage } from './CandidateImage'
import { PlayIcon, ShuffleIcon } from './Icons'
import { capitalize, formatNumber, plural } from '../utils/format'

// Numer dzisiejszego dnia – liczony raz, przy wczytaniu strony
const TODAY = Math.floor(Date.now() / (24 * 3600 * 1000))

// "Pojedynek dnia" na górze strony głównej.
// Pokazuje dwie najpopularniejsze opcje z jednego quizu – klikasz jedną
// i widzisz, jak wybierają inni gracze. Codziennie inny quiz.
export function HeroDuel({ quizzes }) {
  const pool = quizzes.filter((q) => q.preview.length === 2).slice(0, 8)
  const [offset, setOffset] = useState(0)

  if (pool.length === 0) return null
  const summary = pool[(TODAY + offset) % pool.length]

  return (
    <Duel
      key={summary.id}
      summary={summary}
      onNext={pool.length > 1 ? () => setOffset((o) => o + 1) : null}
    />
  )
}

function Duel({ summary, onNext }) {
  // szczegóły quizu (ranking) – do policzenia, jak wybierają inni
  const { data: quiz } = useApi(() => api.getQuiz(summary.id), [summary.id])
  const [picked, setPicked] = useState(null) // 'a' | 'b' | null

  const [a, b] = quiz ? quiz.ranking.slice(0, 2) : summary.preview

  // Szacunek: jak często każda z opcji wygrywa swoje pojedynki
  let shareA = null
  if (quiz && a.winRate + b.winRate > 0) {
    shareA = Math.round((a.winRate / (a.winRate + b.winRate)) * 100)
  }
  const shares = { a: shareA, b: shareA === null ? null : 100 - shareA }

  let message = 'Kogo wybierasz? Kliknij jedno ze zdjęć.'
  if (picked) {
    const chosen = picked === 'a' ? a : b
    const share = shares[picked]
    if (share === null) message = `Twój wybór: ${chosen.name}.`
    else if (share >= 50) message = `Twój wybór: ${chosen.name}. Tak samo wybiera ${share}% graczy.`
    else
      message = `Twój wybór: ${chosen.name}. Jesteś w mniejszości – tak wybiera ${share}% graczy.`
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-top">
          <div>
            <span className="hero-label">Pojedynek dnia</span>
            <h1 id="hero-title">{capitalize(summary.title)}</h1>
          </div>
          <div className="hero-meta">
            <span className="badge">
              {summary.candidatesCount}{' '}
              {plural(summary.candidatesCount, ['opcja', 'opcje', 'opcji'])}
            </span>
            <span className="badge">
              {formatNumber(summary.plays)}{' '}
              {plural(summary.plays, ['rozegranie', 'rozegrania', 'rozegrań'])}
            </span>
            {onNext && (
              <button type="button" className="btn btn-outline btn-sm" onClick={onNext}>
                <ShuffleIcon /> Inny pojedynek
              </button>
            )}
          </div>
        </div>

        <div className={`arena ${picked ? `picked picked-${picked}` : ''}`}>
          {[
            ['a', a],
            ['b', b],
          ].map(([side, candidate]) => (
            <button
              key={side}
              type="button"
              className={`arena-side side-${side}`}
              onClick={() => setPicked(side)}
              aria-pressed={picked === side}
              aria-label={`Wybieram: ${candidate.name}`}
            >
              <CandidateImage candidate={candidate} />
              <span className="arena-name">{candidate.name}</span>
              {picked && shares[side] !== null && (
                <span className="arena-percent">{shares[side]}%</span>
              )}
              {picked === side && <span className="arena-stamp">Twój wybór</span>}
            </button>
          ))}
          <span className="arena-vs" aria-hidden="true">
            VS
          </span>
        </div>

        <div className="hero-bottom">
          <p aria-live="polite">{message}</p>
          <Link to={`/quiz/${summary.id}`} className="btn btn-primary btn-lg">
            <PlayIcon /> Zagraj cały turniej
          </Link>
        </div>
      </div>
    </section>
  )
}
