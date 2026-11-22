// Logowanie i rejestracja - KOMUNIKACJA Z BAZĄ (wysyłanie danych do API).
// Wygląd jest w pliku login.js - stamtąd wywołujemy funkcje do rysowania.
// Adresy API i nazwy pól ustalić z backendem.

// start strony: pyta API, czy ktoś jest już zalogowany,
// jeśli tak, przekazuje jego login do showLoggedIn(login)
function checkAccount(){
}

// wysyła login i hasło do API, błędy przekazuje do showErrors('login-errors', errors),
// po udanym logowaniu przechodzi na stronę główną
// wywołuje ją przycisk "zaloguj"
function login(){
}

// wysyła login, e-mail i dwa razy hasło do API, błędy przekazuje do showErrors('register-errors', errors),
// po założeniu konta przechodzi na stronę główną
// wywołuje ją przycisk "załóż konto"
function register(){
}

checkAccount();
