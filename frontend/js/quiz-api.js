// Strona quizu - KOMUNIKACJA Z BAZĄ (pobieranie quizu, wysyłanie ocen).
// Wygląd jest w pliku quiz.js - stamtąd wywołujemy funkcje do rysowania.
// Adresy API i nazwy pól ustalić z backendem.

// start strony: pobiera quiz o id z adresu (quiz.php?id=...),
// wpisuje jego opcje do tablicy options i wywołuje:
// drawQuiz(quiz), drawStats(stats), drawSizes(sizes), drawRanking(false),
// drawRatings(ratings) i showRatingForm(state, myRating)
// gdy quizu nie ma w bazie: showPageError("404", "Nie ma takiego quizu.", "quizzes.php", "wróć do quizów")
function loadQuiz(){
}

// wysyła ocenę (zaznaczone gwiazdki) i komentarz do API,
// błędy przekazuje do showErrors(errors), a po zapisie pobiera oceny jeszcze raz
// wywołuje ją przycisk "dodaj ocenę"
function sendRating(){
}

// wysyła do API prośbę o usunięcie oceny zalogowanej osoby i pobiera oceny jeszcze raz
// wywołuje ją przycisk "usuń ocenę"
function deleteRating(){
}

loadQuiz();
