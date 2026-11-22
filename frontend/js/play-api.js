// Gra - KOMUNIKACJA Z BAZĄ (pobranie opcji, zapis wyniku).
// Wygląd i przebieg turnieju są w pliku play.js - stamtąd wywołujemy funkcje do rysowania.
// Adresy API i nazwy pól ustalić z backendem.

// start strony: z adresu play.php?id=...&size=... bierze id quizu i liczbę opcji (domyślnie 16),
// pobiera z API wylosowane opcje w losowej kolejności,
// wpisuje je do tablicy round, ustawia totalDuels i startTime,
// a potem wywołuje showGame(quiz, size) i showPair()
function startGame(){
}

// po finale wysyła do API listę pojedynków (kto z kim wygrał),
// a odpowiedź przekazuje do showResult(result)
// wywołuje ją finish() z play.js
function saveResult(champion){
}

startGame();
