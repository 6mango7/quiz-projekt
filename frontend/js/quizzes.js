// Lista quizów - WYGLĄD (karty, filtry, licznik, przycisk "pokaż więcej").
// Komunikacja z bazą jest w pliku quizzes-api.js.

// czyta wartość z adresu strony (np. ?sort=new), a jak jej nie ma, zwraca domyślną
// korzysta z niej też quizzes-api.js
function paramOrDefault(name, defaultValue){
}

// wpisuje do wyszukiwarki i list wyboru to, co jest w adresie strony
function fillFilters(){
}

// dopisuje kategorie do listy wyboru, wywołuje ją loadCategories()
function drawCategories(categories){
}

// dopisuje karty quizów na koniec listy, wywołuje ją loadQuizzes()
function drawQuizzes(quizzes){
}

// pokazuje liczbę quizów w plakietce albo napis "nic nie znaleziono"
function drawCounter(total){
}

// pokazuje albo chowa przycisk "pokaż więcej"
function showLoadMore(show){
}
