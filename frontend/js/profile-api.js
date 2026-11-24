// Profil - KOMUNIKACJA Z BAZĄ (pobieranie danych z API).
// Wygląd jest w pliku profile.js - stamtąd wywołujemy funkcje do rysowania.
// Adres API i nazwy pól ustalić z backendem.

// start strony: jeśli w adresie jest ?user=login, pobiera profil tej osoby,
// a jeśli nie ma, profil zalogowanego (niezalogowanego odsyła na login.php);
// dane przekazuje do drawProfile(user), drawStats(stats), drawQuizzes(quizzes)
// i drawRatings(ratings), a na własnym profilu wywołuje też showOwnerButtons()
// gdy użytkownika nie ma: showPageError("404", "Nie ma takiego użytkownika.", "index.php", "strona główna")
function loadProfile(){
}

loadProfile();
