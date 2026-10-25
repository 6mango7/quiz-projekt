// Odmiana: plural(5, ['quiz', 'quizy', 'quizów']) -> 'quizów'
export function plural(n, [one, few, many]) {
  if (n === 1) return one
  const last = n % 10
  const lastTwo = n % 100
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return few
  return many
}

// "najlepszy owoc" -> "Najlepszy owoc"
export function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text
}

const numberFormat = new Intl.NumberFormat('pl-PL')

export function formatNumber(n) {
  return numberFormat.format(n)
}
