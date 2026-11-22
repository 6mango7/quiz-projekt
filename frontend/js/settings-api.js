// Ustawienia - KOMUNIKACJA Z BAZĄ (pobieranie i wysyłanie danych do API).
// Wygląd jest w pliku settings.js - stamtąd wywołujemy funkcje do rysowania.
// Adres API i nazwy pól ustalić z backendem.

// start strony: niezalogowanego odsyła na login.php,
// zalogowanemu pobiera e-mail i opis i przekazuje je do fillSettings(email, description)
function loadSettings(){
}

// wysyła nowy e-mail i opis do API,
// błędy przekazuje do showErrors('profile-errors', errors), a po zapisie wywołuje showSaved(text)
// wywołuje ją przycisk "zapisz"
function saveProfile(){
}

// wysyła obecne hasło, nowe hasło i powtórzenie do API,
// błędy przekazuje do showErrors('password-errors', errors),
// po zmianie wywołuje clearPasswordForm() i showSaved(text)
// wywołuje ją przycisk "zmień hasło"
function changePassword(){
}

// pyta "na pewno usunąć konto?", wysyła hasło do API,
// błędy przekazuje do showErrors('delete-errors', errors), a po usunięciu przechodzi na index.php
// wywołuje ją przycisk "usuń konto na zawsze"
function deleteAccount(){
}

loadSettings();
