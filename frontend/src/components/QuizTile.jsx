import { Link } from 'react-router'
import { Avatar } from './Avatar'
import { CandidateImage } from './CandidateImage'
import { StarIcon } from './Icons'
import { categoryLabel } from '../utils/constants'
import { capitalize, formatNumber, plural } from '../utils/format'

// Kafelek quizu na stronie głównej (tytuł, liczba opcji, autor)
export function QuizTile({ quiz }) {
  const [a, b] = quiz.preview

  return (
    <Link to={`/quiz/${quiz.id}`} className="quiz-tile">
      <div className="quiz-tile-top">
        <h3 className="quiz-tile-title">{capitalize(quiz.title)}</h3>
        <div className="quiz-tile-thumbs" aria-hidden="true">
          {a && <CandidateImage candidate={a} className="tile-thumb" />}
          {b && <CandidateImage candidate={b} className="tile-thumb" />}
        </div>
      </div>

      <div className="quiz-tile-pills">
        <span className="badge">
          {quiz.candidatesCount} {plural(quiz.candidatesCount, ['opcja', 'opcje', 'opcji'])}
        </span>
        <span className="badge">
          {formatNumber(quiz.plays)} {plural(quiz.plays, ['rozegranie', 'rozegrania', 'rozegrań'])}
        </span>
        {quiz.rating.count > 0 && (
          <span className="badge badge-rating" title="Średnia ocena">
            <StarIcon aria-hidden="true" /> {quiz.rating.average.toFixed(1)}
          </span>
        )}
      </div>

      <div className="quiz-tile-footer">
        <span className="quiz-tile-author">
          <Avatar user={quiz.author} size={24} />
          {quiz.author.username}
        </span>
        <span className="quiz-tile-category">{capitalize(categoryLabel(quiz.category))}</span>
      </div>
    </Link>
  )
}

// Szare prostokąty w miejscu kafelków, dopóki dane się ładują
export function QuizTileSkeletons({ count = 3 }) {
  return (
    <div className="tile-skeletons" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="quiz-tile quiz-tile-skeleton">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line short" />
        </div>
      ))}
    </div>
  )
}
