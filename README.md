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
- Trzy testy E2E sprawdzają przejście do katalogu i wysłanie filtrów, zachowanie motywu po nawigacji i odświeżeniu oraz powrót ze strony 404.
- Osiem testów dostępności uruchamia axe-core na stronie głównej, w formularzach konta i kontaktu, w katalogu i edytorze quizów oraz na stronach o autorach i 404. W jasnym motywie na komputerze i ciemnym na telefonie sprawdzają też tabulację, widoczny fokus oraz minimalny rozmiar 24 × 24 px dla sprawdzanych kontrolek.

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
