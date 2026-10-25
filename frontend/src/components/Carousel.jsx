import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './Icons'

// Poziomy pasek elementów ze strzałkami po bokach.
// Na telefonie przewija się palcem, strzałki są ukryte.
export function Carousel({ label, className = '', children }) {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  // Sprawdza, czy jesteśmy na początku / końcu (wtedy chowamy strzałkę)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function update() {
      const start = track.scrollLeft <= 4
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
    }

    // ResizeObserver wywołuje się też od razu po podłączeniu
    const observer = new ResizeObserver(update)
    observer.observe(track)
    track.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', update)
    }
  }, [])

  function scroll(direction) {
    const track = trackRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({
      left: direction * track.clientWidth * 0.9,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <div className={`carousel ${className}`} role="region" aria-label={label}>
      <button
        type="button"
        className="carousel-arrow prev"
        onClick={() => scroll(-1)}
        disabled={edges.start}
        aria-label="Poprzednie"
      >
        <ChevronLeftIcon />
      </button>
      <div className="carousel-track" ref={trackRef}>
        {children}
      </div>
      <button
        type="button"
        className="carousel-arrow next"
        onClick={() => scroll(1)}
        disabled={edges.end}
        aria-label="Następne"
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}
