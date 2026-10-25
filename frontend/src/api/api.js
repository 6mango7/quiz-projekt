// ============================================================
//  WARSTWA API
//  Cała komunikacja z "serwerem" przechodzi przez ten plik.
//  Na razie dane są w localStorage przeglądarki. Gdy backend
//  (FastAPI) będzie gotowy, wystarczy podmienić ciała tych
//  funkcji na wywołania fetch() – reszta aplikacji się nie zmieni.
// ============================================================

import { load, save, remove } from './storage'
import { createSeedData, SEED_VERSION } from './seed'
import { CATEGORIES } from '../utils/constants'
import { MIN_CANDIDATES, MAX_CANDIDATES } from '../utils/tournament'

export class ApiError extends Error {
  constructor(message, { status = 400, field } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.field = field // nazwa pola formularza, którego dotyczy błąd
  }
}

// Udajemy opóźnienie sieci, żeby było widać stany ładowania
function wait(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function newId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

// ---------- "Tabele" ----------

function ensureSeed() {
  if (load('version', null) === SEED_VERSION) return
  const data = createSeedData()
  save('users', data.users)
  save('quizzes', data.quizzes)
  save('reviews', data.reviews)
  save('messages', [])
  remove('session')
  save('version', SEED_VERSION)
}

function table(name) {
  ensureSeed()
  return load(name, [])
}

// ---------- Pomocnicze ----------

function publicUser(user) {
  if (!user)
    return { id: null, username: 'konto usunięte', bio: '', color: '#7d8086', createdAt: null }
  const { id, username, bio, color, createdAt } = user
  return { id, username, bio, color, createdAt }
}

function privateUser(user) {
  return { ...publicUser(user), email: user.email }
}

function ratingSummary(reviews) {
  const count = reviews.length
  const sum = reviews.reduce((total, r) => total + r.rating, 0)
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }))
  return { average: count ? sum / count : 0, count, distribution }
}

function buildRanking(quiz) {
  return quiz.candidates
    .map((candidate) => {
      const s = quiz.stats[candidate.id] ?? { matches: 0, wins: 0, championships: 0 }
      return {
        ...candidate,
        ...s,
        winRate: s.matches ? s.wins / s.matches : 0,
        championRate: quiz.plays ? s.championships / quiz.plays : 0,
      }
    })
    .sort((a, b) => b.championRate - a.championRate || b.winRate - a.winRate)
}

function quizSummary(quiz, users, reviews) {
  const author = users.find((u) => u.id === quiz.authorId)
  const quizReviews = reviews.filter((r) => r.quizId === quiz.id)
  const ranking = buildRanking(quiz)
  const { average, count } = ratingSummary(quizReviews)

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    category: quiz.category,
    author: publicUser(author),
    plays: quiz.plays,
    rating: { average, count },
    candidatesCount: quiz.candidates.length,
    // dwie najpopularniejsze opcje – do okładki "A vs B"
    preview: ranking.slice(0, 2).map(({ id, name, emoji, image }) => ({ id, name, emoji, image })),
    createdAt: quiz.createdAt,
    updatedAt: quiz.updatedAt,
  }
}

function authorRating(authorId, quizzes, reviews) {
  const ids = new Set(quizzes.filter((q) => q.authorId === authorId).map((q) => q.id))
  const { average, count } = ratingSummary(reviews.filter((r) => ids.has(r.quizId)))
  return { average, count }
}

function currentUserRecord() {
  const session = load('session', null)
  if (!session) return null
  return table('users').find((u) => u.id === session.userId) ?? null
}

function requireUser() {
  const user = currentUserRecord()
  if (!user) throw new ApiError('Musisz być zalogowany.', { status: 401 })
  return user
}

const USERNAME_RE = /^[a-z0-9_.-]{3,20}$/i
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sameText(a, b) {
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

// ============================================================
//  KONTA
// ============================================================

export async function getSession() {
  await wait(0)
  const user = currentUserRecord()
  return user ? privateUser(user) : null
}

export async function register({ username, email, password }) {
  await wait()
  const users = table('users')
  username = username.trim()
  email = email.trim()

  if (!USERNAME_RE.test(username))
    throw new ApiError('Nazwa: 3–20 znaków, litery, cyfry, _ . -', { field: 'username' })
  if (!EMAIL_RE.test(email)) throw new ApiError('Podaj poprawny e-mail.', { field: 'email' })
  if (password.length < 6)
    throw new ApiError('Hasło musi mieć co najmniej 6 znaków.', { field: 'password' })
  if (users.some((u) => sameText(u.username, username)))
    throw new ApiError('Ta nazwa jest już zajęta.', { field: 'username' })
  if (users.some((u) => sameText(u.email, email)))
    throw new ApiError('Konto z tym e-mailem już istnieje.', { field: 'email' })

  const user = {
    id: newId('u'),
    username,
    email,
    // UWAGA: tylko na potrzeby wersji demo! Prawdziwe hasła hashuje backend.
    password,
    bio: '',
    color: '#e2b714',
    createdAt: new Date().toISOString(),
  }
  save('users', [...users, user])
  save('session', { userId: user.id })
  return privateUser(user)
}

export async function login({ login, password }) {
  await wait()
  const user = table('users').find((u) => sameText(u.username, login) || sameText(u.email, login))
  if (!user || user.password !== password) {
    throw new ApiError('Nieprawidłowy login lub hasło.')
  }
  save('session', { userId: user.id })
  return privateUser(user)
}

export async function logout() {
  await wait(0)
  remove('session')
}

export async function updateProfile({ username, email, bio, color }) {
  await wait()
  const me = requireUser()
  const users = table('users')
  username = username.trim()
  email = email.trim()

  if (!USERNAME_RE.test(username))
    throw new ApiError('Nazwa: 3–20 znaków, litery, cyfry, _ . -', { field: 'username' })
  if (!EMAIL_RE.test(email)) throw new ApiError('Podaj poprawny e-mail.', { field: 'email' })
  if (bio.length > 200) throw new ApiError('Opis może mieć maks. 200 znaków.', { field: 'bio' })
  if (users.some((u) => u.id !== me.id && sameText(u.username, username)))
    throw new ApiError('Ta nazwa jest już zajęta.', { field: 'username' })
  if (users.some((u) => u.id !== me.id && sameText(u.email, email)))
    throw new ApiError('Ten e-mail jest już używany.', { field: 'email' })

  const updated = { ...me, username, email, bio: bio.trim(), color }
  save(
    'users',
    users.map((u) => (u.id === me.id ? updated : u)),
  )
  return privateUser(updated)
}

export async function changePassword({ currentPassword, newPassword }) {
  await wait()
  const me = requireUser()
  if (me.password !== currentPassword)
    throw new ApiError('Obecne hasło jest nieprawidłowe.', { field: 'currentPassword' })
  if (newPassword.length < 6)
    throw new ApiError('Nowe hasło musi mieć co najmniej 6 znaków.', { field: 'newPassword' })
  save(
    'users',
    table('users').map((u) => (u.id === me.id ? { ...u, password: newPassword } : u)),
  )
}

export async function deleteAccount({ password }) {
  await wait()
  const me = requireUser()
  if (me.password !== password) throw new ApiError('Nieprawidłowe hasło.', { field: 'password' })

  const myQuizIds = new Set(
    table('quizzes')
      .filter((q) => q.authorId === me.id)
      .map((q) => q.id),
  )
  save(
    'users',
    table('users').filter((u) => u.id !== me.id),
  )
  save(
    'quizzes',
    table('quizzes').filter((q) => q.authorId !== me.id),
  )
  save(
    'reviews',
    table('reviews').filter((r) => r.userId !== me.id && !myQuizIds.has(r.quizId)),
  )
  remove('session')
}

export async function getProfile(username) {
  await wait()
  const users = table('users')
  const quizzes = table('quizzes')
  const reviews = table('reviews')
  const user = users.find((u) => sameText(u.username, username))
  if (!user) throw new ApiError('Nie ma takiego użytkownika.', { status: 404 })

  const own = quizzes
    .filter((q) => q.authorId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return {
    user: publicUser(user),
    stats: {
      quizzes: own.length,
      plays: own.reduce((sum, q) => sum + q.plays, 0),
      rating: authorRating(user.id, quizzes, reviews),
      reviewsWritten: reviews.filter((r) => r.userId === user.id).length,
    },
    quizzes: own.map((q) => quizSummary(q, users, reviews)),
  }
}

// ============================================================
//  QUIZY
// ============================================================

export async function getQuizzes({ sort = 'popular', category = 'all', search = '' } = {}) {
  await wait()
  const users = table('users')
  const reviews = table('reviews')
  const query = search.trim().toLowerCase()

  const list = table('quizzes')
    .filter((q) => category === 'all' || q.category === category)
    .filter(
      (q) =>
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.description.toLowerCase().includes(query) ||
        q.candidates.some((c) => c.name.toLowerCase().includes(query)),
    )
    .map((q) => quizSummary(q, users, reviews))

  const sorters = {
    popular: (a, b) => b.plays - a.plays,
    new: (a, b) => b.createdAt.localeCompare(a.createdAt),
    top: (a, b) => b.rating.average - a.rating.average || b.rating.count - a.rating.count,
  }
  return list.sort(sorters[sort] ?? sorters.popular)
}

export async function getSiteStats() {
  await wait(0)
  const quizzes = table('quizzes')
  return {
    quizzes: quizzes.length,
    plays: quizzes.reduce((sum, q) => sum + q.plays, 0),
    users: table('users').length,
  }
}

export async function getQuiz(id) {
  await wait()
  const quizzes = table('quizzes')
  const users = table('users')
  const reviews = table('reviews')
  const quiz = quizzes.find((q) => q.id === id)
  if (!quiz) throw new ApiError('Ten quiz nie istnieje albo został usunięty.', { status: 404 })

  return {
    ...quizSummary(quiz, users, reviews),
    candidates: quiz.candidates,
    ranking: buildRanking(quiz),
    authorRating: authorRating(quiz.authorId, quizzes, reviews),
  }
}

function validateQuiz({ title, description, category, candidates }) {
  title = title.trim()
  description = description.trim()

  if (title.length < 3)
    throw new ApiError('Tytuł musi mieć co najmniej 3 znaki.', { field: 'title' })
  if (title.length > 80) throw new ApiError('Tytuł może mieć maks. 80 znaków.', { field: 'title' })
  if (description.length > 300)
    throw new ApiError('Opis może mieć maks. 300 znaków.', { field: 'description' })
  if (!CATEGORIES.some((c) => c.id === category))
    throw new ApiError('Wybierz kategorię.', { field: 'category' })

  const cleaned = candidates
    .map((c) => ({ ...c, name: c.name.trim() }))
    .filter((c) => c.name || c.image)

  if (cleaned.some((c) => !c.name))
    throw new ApiError('Każda opcja musi mieć nazwę.', { field: 'candidates' })
  if (cleaned.some((c) => c.name.length > 60))
    throw new ApiError('Nazwa opcji może mieć maks. 60 znaków.', { field: 'candidates' })
  if (cleaned.length < MIN_CANDIDATES)
    throw new ApiError(`Quiz potrzebuje co najmniej ${MIN_CANDIDATES} opcji.`, {
      field: 'candidates',
    })
  if (cleaned.length > MAX_CANDIDATES)
    throw new ApiError(`Quiz może mieć maks. ${MAX_CANDIDATES} opcji.`, { field: 'candidates' })

  return { title, description, category, candidates: cleaned }
}

export async function createQuiz(data) {
  await wait()
  const me = requireUser()
  const clean = validateQuiz(data)
  const now = new Date().toISOString()
  const id = newId('q')

  const candidates = clean.candidates.map((c) => ({
    id: newId('c'),
    name: c.name,
    image: c.image || null,
    emoji: c.emoji || null,
  }))

  const quiz = {
    id,
    title: clean.title,
    description: clean.description,
    category: clean.category,
    authorId: me.id,
    candidates,
    stats: {},
    plays: 0,
    createdAt: now,
    updatedAt: now,
  }
  save('quizzes', [...table('quizzes'), quiz])
  return { id }
}

export async function updateQuiz(id, data) {
  await wait()
  const me = requireUser()
  const quizzes = table('quizzes')
  const quiz = quizzes.find((q) => q.id === id)
  if (!quiz) throw new ApiError('Ten quiz nie istnieje.', { status: 404 })
  if (quiz.authorId !== me.id)
    throw new ApiError('Możesz edytować tylko swoje quizy.', { status: 403 })

  const clean = validateQuiz(data)
  const existingIds = new Set(quiz.candidates.map((c) => c.id))

  const candidates = clean.candidates.map((c) => ({
    id: existingIds.has(c.id) ? c.id : newId('c'),
    name: c.name,
    image: c.image || null,
    emoji: c.emoji || null,
  }))
  // statystyki zostają tylko dla opcji, które nadal istnieją
  const keptIds = new Set(candidates.map((c) => c.id))
  const stats = Object.fromEntries(Object.entries(quiz.stats).filter(([cid]) => keptIds.has(cid)))

  const updated = {
    ...quiz,
    title: clean.title,
    description: clean.description,
    category: clean.category,
    candidates,
    stats,
    updatedAt: new Date().toISOString(),
  }
  save(
    'quizzes',
    quizzes.map((q) => (q.id === id ? updated : q)),
  )
  return { id }
}

export async function deleteQuiz(id) {
  await wait()
  const me = requireUser()
  const quiz = table('quizzes').find((q) => q.id === id)
  if (!quiz) throw new ApiError('Ten quiz nie istnieje.', { status: 404 })
  if (quiz.authorId !== me.id)
    throw new ApiError('Możesz usuwać tylko swoje quizy.', { status: 403 })

  save(
    'quizzes',
    table('quizzes').filter((q) => q.id !== id),
  )
  save(
    'reviews',
    table('reviews').filter((r) => r.quizId !== id),
  )
}

// Zapisuje wynik rozegranego turnieju (dla rankingu opcji)
export async function recordGame(quizId, { history, championId }) {
  await wait(0)
  const quizzes = table('quizzes')
  const quiz = quizzes.find((q) => q.id === quizId)
  if (!quiz) return

  const stats = structuredClone(quiz.stats)
  const bump = (cid, field) => {
    stats[cid] ??= { matches: 0, wins: 0, championships: 0 }
    stats[cid][field]++
  }
  for (const match of history) {
    bump(match.winnerId, 'matches')
    bump(match.winnerId, 'wins')
    bump(match.loserId, 'matches')
  }
  bump(championId, 'championships')

  save(
    'quizzes',
    quizzes.map((q) => (q.id === quizId ? { ...q, stats, plays: q.plays + 1 } : q)),
  )
}

// ============================================================
//  OCENY I KOMENTARZE
// ============================================================

export async function getReviews(quizId) {
  await wait()
  const users = table('users')
  const reviews = table('reviews').filter((r) => r.quizId === quizId)
  return {
    summary: ratingSummary(reviews),
    items: reviews
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((r) => ({ ...r, user: publicUser(users.find((u) => u.id === r.userId)) })),
  }
}

// Jedna ocena na osobę – kolejna nadpisuje poprzednią
export async function saveReview(quizId, { rating, comment }) {
  await wait()
  const me = requireUser()
  const quiz = table('quizzes').find((q) => q.id === quizId)
  if (!quiz) throw new ApiError('Ten quiz nie istnieje.', { status: 404 })
  if (quiz.authorId === me.id) throw new ApiError('Nie możesz ocenić własnego quizu.')
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    throw new ApiError('Wybierz ocenę od 1 do 5 gwiazdek.', { field: 'rating' })
  comment = comment.trim()
  if (comment.length > 500)
    throw new ApiError('Komentarz może mieć maks. 500 znaków.', { field: 'comment' })

  const reviews = table('reviews')
  const existing = reviews.find((r) => r.quizId === quizId && r.userId === me.id)
  const review = {
    id: existing?.id ?? newId('r'),
    quizId,
    userId: me.id,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  }
  save(
    'reviews',
    existing ? reviews.map((r) => (r.id === existing.id ? review : r)) : [...reviews, review],
  )
  return review
}

export async function deleteReview(reviewId) {
  await wait()
  const me = requireUser()
  const reviews = table('reviews')
  const review = reviews.find((r) => r.id === reviewId)
  if (!review) throw new ApiError('Ten komentarz już nie istnieje.', { status: 404 })
  if (review.userId !== me.id)
    throw new ApiError('Możesz usuwać tylko swoje komentarze.', { status: 403 })
  save(
    'reviews',
    reviews.filter((r) => r.id !== reviewId),
  )
}

// ============================================================
//  KONTAKT I INNE
// ============================================================

export async function sendContactMessage({ name, email, subject, message }) {
  await wait(400)
  if (name.trim().length < 2) throw new ApiError('Podaj imię.', { field: 'name' })
  if (!EMAIL_RE.test(email.trim())) throw new ApiError('Podaj poprawny e-mail.', { field: 'email' })
  if (message.trim().length < 10)
    throw new ApiError('Wiadomość musi mieć co najmniej 10 znaków.', { field: 'message' })

  save('messages', [
    ...table('messages'),
    {
      id: newId('m'),
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    },
  ])
}

// Przywraca dane przykładowe (przydatne przy testowaniu)
export async function resetDemoData() {
  await wait()
  remove('version')
  ensureSeed()
}
