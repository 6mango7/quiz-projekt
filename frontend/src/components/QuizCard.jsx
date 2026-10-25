import { Link } from 'react-router'
import { Avatar } from './Avatar'
import { CandidateImage } from './CandidateImage'
import { PlayIcon, StarIcon } from './Icons'
import { capitalize, formatNumber, plural } from '../utils/format'

// Karta quizu: okładka "A vs B" z dwóch najpopularniejszych zdjęć, pod spodem tytuł i autor
export function QuizCard({ quiz }) {
  const [a, b] = quiz.preview

  return (
    <Link to={`/quiz/${quiz.id}`} className="qcard">
      <div className="qcard-cover">
        {a && (
          <div className="qcard-side qcard-a">
            <CandidateImage candidate={a} />
          </div>
        )}
        {b && (
          <div className="qcard-side qcard-b">
            <CandidateImage candidate={b} />
          </div>
        )}
        <span className="qcard-vs" aria-hidden="true">
          VS
        </span>
        <span className="qcard-count">
          {quiz.candidatesCount} {plural(quiz.candidatesCount, ['opcja', 'opcje', 'opcji'])}
        </span>
      </div>

      <div className="qcard-body">
        <h3>{capitalize(quiz.title)}</h3>
        <div className="qcard-meta">
          <span className="qcard-author">
            <Avatar user={quiz.author} size={22} />
            {quiz.author.username}
          </span>
          <span className="qcard-stats">
            <span title="Rozegrania">
              <PlayIcon aria-hidden="true" /> {formatNumber(quiz.plays)}
              <span className="sr-only"> rozegrań</span>
            </span>
            {quiz.rating.count > 0 && (
              <span title="Średnia ocena">
                <StarIcon aria-hidden="true" className="qcard-star" />{' '}
                {quiz.rating.average.toFixed(1)}
                <span className="sr-only"> na 5</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  )
}

// Szare prostokąty w miejscu kart, dopóki dane się ładują
export function QuizCardSkeletons({ count = 8 }) {
  return (
    <div className="qgrid" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="qcard-skeleton">
          <div className="skeleton qcard-skeleton-cover" />
          <div className="skeleton qcard-skeleton-line" />
          <div className="skeleton qcard-skeleton-line short" />
        </div>
      ))}
    </div>
  )
}
