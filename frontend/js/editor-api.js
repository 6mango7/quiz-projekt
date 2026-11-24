// Edytor quizu - KOMUNIKACJA Z BAZĄ (pobieranie i wysyłanie danych do API).
// Wygląd jest w pliku editor.js - stamtąd wywołujemy funkcje do rysowania.
// Adresy API i nazwy pól ustalić z backendem.

// start strony: sprawdza, czy ktoś jest zalogowany, pobiera kategorie,
// a jeśli w adresie jest ?id=..., pobiera też quiz do edycji
function startEditor(){
}

// pobiera kategorie z API i przekazuje je do drawCategories(categories)
function loadCategories(){
}

// pobiera quiz o podanym id z API i przekazuje go do fillEditor(quiz)
// gdy quizu nie ma: showPageError("404", "Nie ma takiego quizu.", "index.php", "strona główna"),
// a gdy to cudzy quiz: showPageError("403", "To nie jest Twój quiz - edytować może tylko autor.", "index.php", "strona główna")
function loadQuiz(){
}

// wysyła quiz do zapisania: tytuł, opis, kategorię i tablicę options
// błędy z API przekazuje do showErrors(errors), po zapisie przechodzi na stronę quizu
function saveQuiz(){
}

// pyta "na pewno?", wysyła do API prośbę o usunięcie quizu i przechodzi na profil
function deleteQuiz(){
}

startEditor();
