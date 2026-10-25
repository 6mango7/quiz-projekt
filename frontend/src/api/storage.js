// Prosta "baza danych" w localStorage przeglądarki.
// Gdy backend będzie gotowy, ten plik przestanie być potrzebny.

const PREFIX = 'quizownia:'

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (error) {
    if (error?.name === 'QuotaExceededError') {
      throw new Error(
        'Brak miejsca w pamięci przeglądarki. Użyj mniejszych obrazków albo usuń jakiś quiz.',
        { cause: error },
      )
    }
    throw error
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // nic nie robimy
  }
}
