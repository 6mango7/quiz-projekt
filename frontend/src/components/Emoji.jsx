import { useState } from 'react'

// "✈️" -> "2708", "🍕" -> "1f355" (nazwa pliku w public/emoji)
function emojiFile(char) {
  return [...char]
    .map((c) => c.codePointAt(0).toString(16))
    .filter((hex) => hex !== 'fe0f')
    .join('-')
}

// Emoji jako obrazek z zestawu Noto Emoji (public/emoji), więc wygląda
// tak samo na każdym komputerze i telefonie. Rozmiar = rozmiar czcionki.
// Jeśli pliku nie ma, pokazuje zwykłe emoji z systemu.
export function Emoji({ char, className = '' }) {
  const src = char ? `${import.meta.env.BASE_URL}emoji/${emojiFile(char)}.svg` : null
  const [failedSrc, setFailedSrc] = useState(null)

  if (!char) return null

  if (failedSrc === src) {
    return <span className={`emoji-text ${className}`}>{char}</span>
  }

  return (
    <img
      className={`emoji ${className}`}
      src={src}
      alt=""
      draggable="false"
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  )
}
