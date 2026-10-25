import { useState } from 'react'
import { hueFromString } from '../utils/constants'
import { Emoji } from './Emoji'

// "JavaScript" -> "JS", "hot dog" -> "Hd", "wiosna" -> "Wi", "C++" -> "C++"
function initials(name) {
  const text = name.trim()
  if (!text) return '?'
  if (text.length <= 3) return text
  const capitals = text.match(/[A-ZĄĆĘŁŃÓŚŹŻ]/g)
  if (capitals && capitals.length >= 2) return capitals.slice(0, 2).join('')
  const words = text.split(/\s+/)
  const letters = words.length > 1 ? words[0][0] + words[1][0] : text.slice(0, 2)
  return letters.charAt(0).toUpperCase() + letters.slice(1)
}

// Obrazek opcji: zdjęcie, emoji albo kolorowy kafelek z inicjałami
export function CandidateImage({ candidate, className = '' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const hue = hueFromString(candidate.name || '?')
  const style = { '--hue': hue }

  if (candidate.image && failedSrc !== candidate.image) {
    return (
      <img
        className={`candidate-img ${className}`}
        src={candidate.image}
        alt=""
        loading="lazy"
        draggable="false"
        onError={() => setFailedSrc(candidate.image)}
      />
    )
  }

  if (candidate.emoji) {
    return (
      <div
        className={`candidate-img candidate-emoji ${className}`}
        style={style}
        aria-hidden="true"
      >
        <span>
          <Emoji char={candidate.emoji} />
        </span>
      </div>
    )
  }

  return (
    <div
      className={`candidate-img candidate-initials ${className}`}
      style={style}
      aria-hidden="true"
    >
      <span>{initials(candidate.name || '?')}</span>
    </div>
  )
}
