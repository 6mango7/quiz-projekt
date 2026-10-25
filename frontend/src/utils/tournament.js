// Logika turnieju "1 na 1": w każdej rundzie opcje grają parami,
// zwycięzca przechodzi dalej, aż zostanie jeden mistrz.
// Na razie używa jej tylko seed.js (symulacja rankingu w danych przykładowych),
// ale przyda się też przy robieniu strony z rozgrywką.

export const MIN_CANDIDATES = 4
export const MAX_CANDIDATES = 64

export function shuffle(items, random = Math.random) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Możliwe rozmiary turnieju: 4, 8, 16, 32, 64 (ale nie więcej niż liczba opcji)
export function availableSizes(count) {
  const sizes = []
  for (let size = MIN_CANDIDATES; size <= Math.min(count, MAX_CANDIDATES); size *= 2) {
    sizes.push(size)
  }
  return sizes
}

export function createTournament(candidates, size, random = Math.random) {
  return {
    size,
    round: shuffle(candidates, random).slice(0, size), // uczestnicy bieżącej rundy
    winners: [], // zwycięzcy bieżącej rundy
    match: 0, // numer pojedynku w rundzie
    history: [], // wszystkie rozegrane pojedynki
    champion: null,
  }
}

export function currentPair(tournament) {
  const { round, match } = tournament
  return [round[match * 2], round[match * 2 + 1]]
}

// Zwraca NOWY stan turnieju po wybraniu zwycięzcy pojedynku
export function pickWinner(tournament, winnerId) {
  const [a, b] = currentPair(tournament)
  const winner = a.id === winnerId ? a : b
  const loser = winner === a ? b : a

  const history = [
    ...tournament.history,
    { winnerId: winner.id, loserId: loser.id, roundSize: tournament.round.length },
  ]
  const winners = [...tournament.winners, winner]
  const matchesInRound = tournament.round.length / 2

  // kolejny pojedynek w tej samej rundzie
  if (tournament.match + 1 < matchesInRound) {
    return { ...tournament, winners, history, match: tournament.match + 1 }
  }

  // to był finał
  if (winners.length === 1) {
    return { ...tournament, round: winners, winners: [], match: 0, history, champion: winner }
  }

  // następna runda
  return { ...tournament, round: winners, winners: [], match: 0, history }
}
