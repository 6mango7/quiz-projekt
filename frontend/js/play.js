// Gra - WYGLĄD I PRZEBIEG TURNIEJU (plansza, wybieranie, podsumowanie).
// Komunikacja z bazą jest w pliku play-api.js.

// stan gry - wpisuje go startGame() z play-api.js, a zmieniają funkcje poniżej
let round = [];        // opcje w obecnej rundzie, grają parami: 0 z 1, 2 z 3, ...
let winners = [];      // zwycięzcy obecnej rundy, przechodzą do następnej
let pair = 0;          // numer pierwszej opcji z pary, która jest teraz na planszy
let duels = [];        // wszystkie rozegrane pojedynki: kto wygrał, kto przegrał, w której rundzie
let totalDuels = 0;    // ile pojedynków będzie w całym turnieju (liczba opcji - 1)
let startTime = 0;     // kiedy zaczęła się gra, do liczenia czasu
let waiting = false;   // true przez chwilę po kliknięciu, żeby nie dało się kliknąć dwa razy
let gameOver = false;  // true po finale

// zwraca nazwę rundy: 2 opcje - "finał", 4 - "półfinał", 8 - "ćwierćfinał", więcej - "1/8 finału" itd.
function roundName(count){
}

// wpisuje tytuł quizu i linki "zagraj jeszcze raz" i "ranking i oceny quizu",
// wywołuje ją startGame()
function showGame(quiz, size){
}

// pokazuje na planszy obecną parę opcji, nazwę rundy, numer pojedynku,
// licznik (np. 3 / 15) i pasek postępu
function showPair(){
}

// wpisuje obrazek i nazwę opcji do lewego albo prawego kafelka ('left' / 'right')
function drawTile(option, side){
}

// gracz wybrał lepszą opcję: zapisuje pojedynek, wybrana przechodzi dalej,
// kafelki dostają klasy "chosen" i "rejected", a po chwili pokazuje się następna para
// wywołują ją kafelki i strzałki na klawiaturze
function choose(side){
}

// przechodzi do następnej pary, a po ostatniej parze rundy - do następnej rundy;
// gdy został jeden zwycięzca, wywołuje finish(champion)
function nextPair(){
}

// chowa planszę i pokazuje podsumowanie: mistrza, czas gry, liczbę pojedynków,
// średni czas na wybór i drogę do zwycięstwa, potem wywołuje saveResult(champion)
function finish(champion){
}

// wpisuje zdanie z wynikiem zapisanym w bazie, np.
// "pizza - wygrane turnieje: 813 (25% wszystkich gier), 1. miejsce w rankingu"
// wywołuje ją saveResult()
function showResult(result){
}

// strzałka w lewo wybiera lewą opcję, strzałka w prawo - prawą
function pressKey(event){
}

document.onkeydown = pressKey;
