# Quizownia – frontend

Quizy w formie turnieju: w każdej rundzie wybierasz jedną z dwóch opcji, aż zostanie zwycięzca.
React 19 + Vite + React Router. Na razie bez backendu – dane zapisują się w przeglądarce (localStorage).

**Gotowa jest strona główna.** Pozostałe adresy pokazują stronę „W budowie”.

## Instalacja

W folderze `frontend`:

1. Zatrzymaj serwer (`Ctrl+C`) i usuń cały stary folder `src`.
2. Wypakuj paczkę **bezpośrednio do folderu `frontend`** (zastąp istniejące pliki).
   Paczka zawiera też folder `public/emoji` – zostanie dodany obok tego, co już jest w `public`.
   Po wypakowaniu musi istnieć `frontend\src\api` – a nie np. `frontend\quizownia\src\api`.
3. Doinstaluj router i uruchom:
   ```bash
   npm install react-router
   npm run dev
   ```

## Wygląd

Strona wygląda jak ekran „VS” z gry: dwie strony pojedynku przedzielone ukośną linią.

- **czerwony** (`--red`) to opcja A, **niebieski** (`--blue`) to opcja B, **złoty** (`--gold`) to zwycięzca
  i główne przyciski, a **granat** (`--ink`) to tło „areny”
- czcionki to **Barlow Condensed** (nagłówki, przyciski, pochyła i gruba) oraz **Barlow** (zwykły tekst),
  ładowane z Google Fonts w `index.html`
- domyślnie jest jasny motyw; przełącznik zapisuje wybór w przeglądarce

## Co jest na stronie głównej (`src/pages/HomePage.jsx`)

- nagłówek z logo (`components/Logo.jsx`), wyszukiwarką (klawisz `/`), przyciskiem „Stwórz quiz” i zmianą motywu
- **pojedynek dnia** (`components/HeroDuel.jsx`): dwa zdjęcia z jednego quizu. Klikasz jedno i widzisz,
  ile procent graczy wybiera tak samo. „Inny pojedynek” losuje kolejny quiz.
- „Twoje quizy” (tylko po zalogowaniu)
- siatka wszystkich quizów z sortowaniem (Popularne / Nowe / Najlepiej oceniane), kategoriami
  i przyciskiem „Pokaż więcej” (`components/QuizCard.jsx`: okładka „A vs B” z dwóch zdjęć quizu)
- „Jak działa turniej?” z przykładową drabinką (`components/HowItWorks.jsx`), zachęta do stworzenia quizu, stopka
- wyszukiwanie, kategoria i sortowanie są w adresie: `/?szukaj=…`, `/?kategoria=…`, `/?sort=…`

## Do zrobienia

Każda z tych stron ma już adres w `src/App.jsx` i pokazuje „W budowie”.
Gdy zrobisz stronę, utwórz plik w `src/pages/` i podmień `element` w `App.jsx`, np.
`{ path: 'logowanie', element: <LoginPage /> }`.

| Strona                            | Adres               | Przydatne funkcje z `api.js`                       |
| --------------------------------- | ------------------- | -------------------------------------------------- |
| Logowanie                         | `/logowanie`        | `login` (lepiej przez `useAuth().login`)           |
| Rejestracja                       | `/rejestracja`      | `register` (przez `useAuth().register`)            |
| Profil                            | `/profil/:username` | `getProfile`                                       |
| Ustawienia konta                  | `/ustawienia`       | `updateProfile`, `changePassword`, `deleteAccount` |
| Strona quizu (opis, ranking)      | `/quiz/:id`         | `getQuiz`                                          |
| Rozgrywka                         | `/quiz/:id/graj`    | `getQuiz`, `recordGame` + `utils/tournament.js`    |
| Podsumowanie + oceny i komentarze | `/quiz/:id/wynik`   | `getReviews`, `saveReview`, `deleteReview`         |
| Tworzenie quizu                   | `/stworz`           | `createQuiz`                                       |
| Edycja i usuwanie quizu           | `/quiz/:id/edytuj`  | `getQuiz`, `updateQuiz`, `deleteQuiz`              |
| Kontakt                           | `/kontakt`          | `sendContactMessage`                               |

## Struktura `src`

```
api/          api.js – WSZYSTKIE zapytania do "serwera" (tu podłączycie backend)
              seed.js – dane przykładowe, storage.js – zapis w przeglądarce
components/   nagłówek, stopka, logo, pojedynek dnia, karta quizu, zdjęcie opcji
              (CandidateImage.jsx), ikony (Icons.jsx), emoji (Emoji.jsx), ...
context/      logowanie (useAuth), motyw (useTheme), powiadomienia (useToast)
hooks/        useApi – pobieranie danych ze stanem ładowania i błędu
pages/        HomePage, strona "W budowie", 404
styles/       base.css – kolory motywów, przyciski, pola formularzy, chipy, zakładki
              components.css – nagłówek, stopka, powiadomienia
              home.css – strona główna, pages.css – miejsce na style nowych stron
utils/        logika turnieju, formatowanie, kategorie
```

Poza `src`: `public/emoji` – ikonki emoji (patrz niżej).

Gotowe klasy, które przydadzą się na nowych stronach:

- przyciski: `btn btn-primary` (złoty, najważniejsza akcja), `btn btn-dark` (granatowy),
  `btn btn-outline`, `btn btn-danger` (np. usuwanie quizu), rozmiary `btn-sm` / `btn-lg`, `btn-block`
- formularze: `field` + `field-label`, `field-hint`, `field-error`, `form-error`
- chipy `chips` + `chip` (zaznaczony: `chip active`), zakładki `tabs` + `tab` (zaznaczona: `tab active`)
- etykieta `tag`, link `text-link`, karta quizu `<QuizCard quiz={…} />`

Kolory zawsze przez zmienne (`var(--surface)`, `var(--text)`, `var(--red)`, `var(--blue)`, `var(--gold)`…),
wtedy działają w obu motywach. Nagłówki dostają czcionkę `var(--font-display)` automatycznie.

Pomysł na rozgrywkę (`/quiz/:id/graj`): ten sam układ co pojedynek dnia – klasy `arena`,
`arena-side side-a` / `side-b` i `arena-vs` z `home.css` możesz przenieść do `pages.css` i użyć ponownie.

## Ikony (emoji)

Wszystkie emoji na stronie są obrazkami SVG z zestawu **Noto Emoji** od Google
(folder `public/emoji`, licencja Apache 2.0 – plik `public/emoji/LICENSE.txt` musi zostać w projekcie).
Dzięki temu wyglądają tak samo na Windowsie, Macu i telefonie.

W kodzie używasz komponentu `<Emoji char="🍕" />` (`src/components/Emoji.jsx`) – ma rozmiar jak tekst obok.
Plik nazywa się kodem znaku, np. 🍕 → `1f355.svg`. Jeśli jakiegoś emoji nie ma w folderze,
strona pokaże zwykłe emoji z systemu. Brakujące pliki znajdziesz w repozytorium
[googlefonts/noto-emoji](https://github.com/googlefonts/noto-emoji) w folderze `svg`
(tam nazywają się np. `emoji_u1f355.svg` – wystarczy zmienić nazwę).

## Dane przykładowe

Plik `src/api/seed.js`: 10 kont, 25 quizów, 78 ocen. Konto testowe: **demo / demo1234**.
Po zmianie danych podbij `SEED_VERSION` – przeglądarka wgra je od nowa
(skasuje wtedy to, co zostało dodane ręcznie).

## Podłączenie backendu (FastAPI)

Cała aplikacja korzysta wyłącznie z funkcji w `src/api/api.js`. Wystarczy podmienić ich
środek na `fetch`, zachowując nazwy i zwracane dane. Przykład:

```js
const API_URL = import.meta.env.VITE_API_URL // w pliku .env: VITE_API_URL=http://localhost:8000

export async function getQuiz(id) {
  const res = await fetch(`${API_URL}/quizzes/${id}`, { credentials: 'include' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(body.detail ?? 'Nie udało się pobrać quizu.', { status: res.status })
  }
  return res.json()
}
```

Uwaga: w wersji demo hasła leżą w przeglądarce jako zwykły tekst – to tylko na czas, aż
logowanie przejmie backend.

## Przydatne

- Przy publikacji strony (np. Vercel, Netlify) trzeba ustawić, żeby każdy adres zwracał
  `index.html` – inaczej odświeżenie np. `/kontakt` da błąd 404.
- `.prettierrc` ustawia styl jak w szablonie Vite (bez średników, pojedyncze cudzysłowy),
  żeby rozszerzenie Prettier nie przerabiało całego kodu przy zapisie.
