// Strona quizu - WYGLĄD (opis, statystyki, ranking, oceny).
// Komunikacja z bazą jest w pliku quiz-api.js.

// opcje quizu posortowane od najlepszej, wpisuje je loadQuiz(),
// a drawRanking() rysuje z nich tabelę
let options = [];

// wpisuje tytuł, opis, kategorię (naklejka i link w ścieżce), autora z datą
// i link "edytuj quiz", jeśli to quiz zalogowanej osoby, wywołuje ją loadQuiz()
function drawQuiz(quiz){
}

// wpisuje trzy liczby: gry, opcje, średnia ocen,
// i zdanie "Najczęściej wygrywa ..." pod spodem
function drawStats(stats){
}

// wstawia przyciski z rozmiarem turnieju (np. 4, 8, 16) i pokazuje formularz "graj!",
// a gdy rozmiarów nie ma, pokazuje napis "Ten quiz ma za mało opcji..."
function drawSizes(sizes){
}

// rysuje wiersze rankingu z tablicy options: pierwsze 10 albo wszystkie (all = true),
// pokazuje albo chowa przycisk "pokaż wszystkie"
function drawRanking(all){
}

// wpisuje średnią, liczbę ocen, paski 5-1 gwiazdek i komentarze
function drawRatings(ratings){
}

// pokazuje odpowiednią część przy ocenach:
// 'own' - napis "To Twój quiz...", 'guest' - link do logowania, 'user' - formularz oceny
// myRating to ocena zalogowanej osoby (jeśli już oceniała, zaznacza gwiazdki i pokazuje "usuń ocenę")
function showRatingForm(state, myRating){
}

// pokazuje czerwone pole z błędami pod formularzem oceny
function showErrors(errors){
}
