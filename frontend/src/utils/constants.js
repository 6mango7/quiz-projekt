// icon + color = kafelki kategorii na stronie głównej
export const CATEGORIES = [
  { id: 'food', label: 'jedzenie', icon: '🍔', color: '#ffe1d2' },
  { id: 'animals', label: 'zwierzęta', icon: '🐾', color: '#d9f5df' },
  { id: 'tech', label: 'technologia', icon: '💻', color: '#dfe4ff' },
  { id: 'sport', label: 'sport', icon: '⚽', color: '#fff1c2' },
  { id: 'travel', label: 'podróże', icon: '✈️', color: '#d3f1f5' },
  { id: 'music', label: 'muzyka', icon: '🎵', color: '#f3ddff' },
  { id: 'movies', label: 'filmy i seriale', icon: '🎬', color: '#ffdce4' },
  { id: 'games', label: 'gry', icon: '🎮', color: '#e4defd' },
  { id: 'other', label: 'inne', icon: '✨', color: '#e9ecf3' },
]

export function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? 'inne'
}

// Stały kolor (odcień) na podstawie tekstu – dla kafelków bez obrazka
export function hueFromString(text) {
  let hash = 0
  for (const char of text) {
    hash = (hash * 31 + char.codePointAt(0)) % 360
  }
  return hash
}
