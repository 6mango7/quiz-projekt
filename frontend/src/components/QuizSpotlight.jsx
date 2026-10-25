import { useState } from 'react'
import { Link } from 'react-router'
import { Avatar } from './Avatar'
import { CandidateImage } from './CandidateImage'
import { ShuffleIcon, StarIcon } from './Icons'
import { capitalize, formatNumber, plural } from '../utils/format'

// Numer dzisiejszego dnia – liczony raz, przy wczytaniu strony
const TODAY = Math.floor(Date.now() / (24 * 3600 * 1000))

// Duża karta z jednym polecanym quizem.
// Na start wybiera quiz na podstawie dzisiejszej daty (codziennie inny),
// a przycisk "Pokaż inny" przechodzi do kolejnego.
export function QuizSpotlight({ quizzes }) {
  const candidates = quizzes.filter((q) => q.preview.length === 2).slice(0, 10)
  const [offset, setOffset] = useState(0)

  if (candidates.length === 0) return null
  const quiz = candidates[(TODAY + offset) % candidates.length]
  const [a, b] = quiz.preview

  return (
    <section className="home-section" aria-labelledby="spotlight-title">
      <div className="container">
        {/* key: animacja wejścia przy zmianie quizu */}
        <article className="spotlight" key={quiz.id}>
          <Link
            to={`/quiz/${quiz.id}`}
            className="spotlight-cover"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="spotlight-half left">
              <CandidateImage candidate={a} />
              <span className="spotlight-name">{a.name}</span>
            </div>
            <div className="spotlight-half right">
              <CandidateImage candidate={b} />
              <span className="spotlight-name">{b.name}</span>
            </div>
            <span className="spotlight-vs">vs</span>
          </Link>

          <div className="spotlight-body">
            <span className="tag">Polecany quiz</span>
            <h2 id="spotlight-title">{capitalize(quiz.title)}</h2>
            {quiz.description && <p>{quiz.description}</p>}

            <div className="quiz-tile-pills">
              <span className="badge">
                {quiz.candidatesCount} {plural(quiz.candidatesCount, ['opcja', 'opcje', 'opcji'])}
              </span>
              <span className="badge">
                {formatNumber(quiz.plays)}{' '}
                {plural(quiz.plays, ['rozegranie', 'rozegrania', 'rozegrań'])}
              </span>
              {quiz.rating.count > 0 && (
                <span className="badge badge-rating" title="Średnia ocena">
                  <StarIcon aria-hidden="true" /> {quiz.rating.average.toFixed(1)}
                </span>
              )}
            </div>

            <span className="spotlight-author">
              <Avatar user={quiz.author} size={28} />
              {quiz.author.username}
            </span>

            <div className="spotlight-actions">
              <Link to={`/quiz/${quiz.id}`} className="btn btn-primary btn-lg">
                Zagraj
              </Link>
              {candidates.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline btn-lg"
                  onClick={() => setOffset((o) => o + 1)}
                >
                  <ShuffleIcon /> Pokaż inny
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
