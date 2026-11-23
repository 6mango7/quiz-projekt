# quiz-projekt

Uruchomienie: `docker compose up -d --build`

| Co                        | Adres                                                        |
| ------------------------- | ------------------------------------------------------------ |
| Frontend (strona)         | http://localhost:8080                                        |
| Backend (PHP)             | http://localhost:8000 (albo przez http://localhost:8080/api/) |
| phpMyAdmin (podgląd bazy) | http://localhost:8081                                        |
| Baza MySQL                | tylko w Dockerze: host `db`, port `3306`                     |

## Testy

- Test integracyjny sprawdza, czy API ma połączenie z bazą i zwraca liczbę quizów większą niż 1.
- Trzy testy E2E sprawdzają przejście do katalogu i wysłanie filtrów, zachowanie motywu po nawigacji i odświeżeniu oraz powrót ze strony 404.

GitHub Actions wybiera testy na podstawie plików zmienionych w pull requeście.

Do uruchomienia lokalnie potrzebujesz Node.js 20 lub nowszego i aplikacji uruchomionej przez Docker Compose. Zacznij w katalogu repozytorium.

```powershell
docker compose up -d --build --wait
Set-Location tests
npm ci
npx playwright install chromium
npm test
```

Domyślny adres to `http://localhost:8080`. Zmienna `PLAYWRIGHT_BASE_URL` pozwala wskazać inną instancję. Raport HTML jest w `tests/playwright-report/`.
