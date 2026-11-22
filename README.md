# quiz-projekt

Uruchomienie: `docker compose up -d --build`

| Co                        | Adres                                                        |
| ------------------------- | ------------------------------------------------------------ |
| Frontend (strona)         | http://localhost:8080                                        |
| Backend (PHP)             | http://localhost:8000 (albo przez http://localhost:8080/api/) |
| phpMyAdmin (podgląd bazy) | http://localhost:8081                                        |
| Baza MySQL                | tylko w Dockerze: host `db`, port `3306`                     |

## Testy

- Dwa testy integracyjne sprawdzają połączenie API z bazą zawierającą przykładowe quizy oraz odpowiedź JSON po błędzie zapytania SQL.
- Test E2E przechodzi ze strony głównej do katalogu quizów i wysyła formularz filtrów. Sprawdza parametry w adresie strony.
- Dwa testy dostępności uruchamiają axe-core dla strony głównej, logowania i kontaktu. Sprawdzają też fokus klawiatury w jasnym motywie na desktopie i ciemnym na telefonie.

GitHub Actions uruchamia zestaw przy pull requestach na świeżej bazie. Testy lokalne nie zapisują danych w bazie.

Do uruchomienia lokalnie potrzebujesz Node.js 22.12 lub nowszego i aplikacji uruchomionej przez Docker Compose. Zacznij w katalogu repozytorium.

```powershell
docker compose up -d --build --wait
Set-Location tests
npm ci
npx playwright install chromium
npm test
```

Domyślny adres to `http://localhost:8080`. Zmienna `PLAYWRIGHT_BASE_URL` pozwala wskazać inną instancję. Raport HTML jest w `tests/playwright-report/`.
