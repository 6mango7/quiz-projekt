// Menu konta w nagłówku - KOMUNIKACJA Z BAZĄ (dołączone na każdej stronie przez includes/footer.php).
// Wygląd jest w pliku account.js - stamtąd wywołujemy funkcje do rysowania.
// Backend ma już do tego me.php i logout.php - nazwy pól ustalić z backendem.

// start: pyta API (me.php), czy ktoś jest zalogowany,
// jeśli tak - przekazuje dane do showAccount(user), jeśli nie - nic nie robi
// (wtedy zostaje przycisk "zaloguj się")
function loadAccount(){
}

// wysyła do API prośbę o wylogowanie (logout.php) i przechodzi na stronę główną
// wywołuje ją przycisk "wyloguj" w menu konta
function logOut(){
}

loadAccount();
