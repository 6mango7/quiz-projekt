// Gra - WYGLĄD I PRZEBIEG TURNIEJU (plansza, wybieranie, podsumowanie).
// Komunikacja z bazą jest w pliku play-api.js.
// Obrazki opcji i liczby z przecinkiem robią funkcje z pliku common.js.
//
// Jak działa turniej (np. 8 opcji):
// ćwierćfinał: opcje grają parami 0-1, 2-3, 4-5, 6-7 -> 4 zwycięzców,
// półfinał: zwycięzcy grają parami -> 2 zwycięzców, finał -> 1 mistrz.
// Razem pojedynków jest zawsze o jeden mniej niż opcji (8 opcji -> 7 pojedynków).
//
// Jedna opcja wygląda np. tak: { id: 5, name: "pizza", image: "img/emoji/1f355.svg" }

// stan gry - wpisuje go startGame() z play-api.js, a zmieniają funkcje poniżej
let round = [];        // opcje w obecnej rundzie, grają parami: 0 z 1, 2 z 3, ...
let winners = [];      // zwycięzcy obecnej rundy, przechodzą do następnej
let pair = 0;          // numer pierwszej opcji z pary, która jest teraz na planszy
let duels = [];        // wszystkie rozegrane pojedynki: kto wygrał, kto przegrał, w której rundzie
let totalDuels = 0;    // ile pojedynków będzie w całym turnieju (liczba opcji - 1)
let startTime = 0;     // kiedy zaczęła się gra, do liczenia czasu
let waiting = false;   // true przez chwilę po kliknięciu, żeby nie dało się kliknąć dwa razy
let gameOver = false;  // true po finale
let champion = null;   // zwycięzca turnieju, wpisuje go finish()

// zwraca nazwę rundy: 2 opcje - "finał", 4 - "półfinał", 8 - "ćwierćfinał", więcej - "1/8 finału" itd.
function roundName(count){
    if(count == 2){
        return "finał";
    }
    if(count == 4){
        return "półfinał";
    }
    if(count == 8){
        return "ćwierćfinał";
    }
    return "1/" + (count / 2) + " finału";
}

// wpisuje tytuł quizu i linki "zagraj jeszcze raz" i "ranking i oceny quizu",
// wywołuje ją startGame()
// quiz wygląda np. tak: { id: 1, title: "Najlepsze jedzenie świata" }, a size to liczba opcji, np. 16
function showGame(quiz, size){
    document.title = quiz.title + " - quizownia";

    let title = document.getElementById("game-title");
    title.textContent = quiz.title;
    title.href = "quiz.php?id=" + quiz.id;

    document.getElementById("quiz-link").href = "quiz.php?id=" + quiz.id;
    document.getElementById("play-again").href = "play.php?id=" + quiz.id + "&size=" + size;
}

// pokazuje na planszy obecną parę opcji, nazwę rundy, numer pojedynku,
// licznik (np. 3 / 15) i pasek postępu
function showPair(){
    document.getElementById("round").textContent = roundName(round.length);

    if(round.length > 2){
        let duelNumber = pair / 2 + 1;
        document.getElementById("duel-number").textContent = "pojedynek " + duelNumber + " z " + (round.length / 2);
    }
    else{
        document.getElementById("duel-number").textContent = "ostatni wybór!";
    }

    document.getElementById("counter").textContent = (duels.length + 1) + " / " + totalDuels;
    document.getElementById("progress").style.width = (duels.length / totalDuels * 100) + "%";

    drawTile(round[pair], "left");
    drawTile(round[pair + 1], "right");
}

// wpisuje obrazek i nazwę opcji do lewego albo prawego kafelka ('left' / 'right')
function drawTile(option, side){
    let tile = document.getElementById("tile-" + side);
    tile.className = "tile";

    let image = document.getElementById(side + "-image");
    image.innerHTML = "";
    image.appendChild(makeImage(option));

    document.getElementById(side + "-name").textContent = option.name;
}

// gracz wybrał lepszą opcję: zapisuje pojedynek, wybrana przechodzi dalej,
// kafelki dostają klasy "chosen" i "rejected", a po chwili pokazuje się następna para
// wywołują ją kafelki i strzałki na klawiaturze
function choose(side){
    if(waiting == true || gameOver == true || round.length == 0){
        return;
    }

    let winner = round[pair];
    let loser = round[pair + 1];
    let otherSide = "right";
    if(side == "right"){
        winner = round[pair + 1];
        loser = round[pair];
        otherSide = "left";
    }

    duels.push({ winner: winner, loser: loser, round: round.length });
    winners.push(winner);
    pair = pair + 2;

    // wybrany kafelek robi się żółty, drugi blednie
    waiting = true;
    document.getElementById("tile-" + side).className = "tile chosen";
    document.getElementById("tile-" + otherSide).className = "tile rejected";

    // po 0,35 sekundy następna para
    setTimeout(nextPair, 350);
}

// przechodzi do następnej pary, a po ostatniej parze rundy - do następnej rundy;
// gdy został jeden zwycięzca, wywołuje finish(champion)
function nextPair(){
    waiting = false;

    // koniec rundy?
    if(pair >= round.length){
        if(winners.length == 1){
            finish(winners[0]);
            return;
        }
        round = winners;
        winners = [];
        pair = 0;
    }

    showPair();
}

// chowa planszę i pokazuje podsumowanie: mistrza, czas gry, liczbę pojedynków,
// średni czas na wybór i drogę do zwycięstwa, potem wywołuje saveResult(champion)
function finish(winner){
    gameOver = true;
    champion = winner;

    document.getElementById("game").style.display = "none";
    document.getElementById("game-summary").style.display = "block";
    window.scrollTo(0, 0);

    // czas gry w sekundach, pokazany jako minuty:sekundy, np. 1:05
    let seconds = Math.round((Date.now() - startTime) / 1000);
    let minutes = Math.floor(seconds / 60);
    let rest = seconds % 60;
    let time = minutes + ":" + rest;
    if(rest < 10){
        time = minutes + ":0" + rest;
    }

    let image = document.getElementById("champion-image");
    image.innerHTML = "";
    image.appendChild(makeImage(champion));
    document.getElementById("champion-name").textContent = champion.name;

    document.getElementById("time").textContent = time;
    document.getElementById("duel-count").textContent = duels.length;
    document.getElementById("per-choice").textContent = formatDecimal(seconds / duels.length) + " s";

    // droga do zwycięstwa: kogo mistrz pokonał w kolejnych rundach
    let path = document.getElementById("path");
    path.innerHTML = "";
    for(let i = 0; i < duels.length; i++){
        if(duels[i].winner.id == champion.id){
            path.appendChild(makePathItem(duels[i]));
        }
    }

    saveResult(champion);
}

// wpisuje zdanie z wynikiem zapisanym w bazie, np.
// "pizza - wygrane turnieje: 813 (25% wszystkich gier w tym quizie), 1. miejsce w rankingu."
// wywołuje ją saveResult()
// result wygląda np. tak: { titles: 813, percent: 25, place: 1 }
// albo { errors: ["..."] }, gdy zapis się nie udał
function showResult(result){
    let summary = document.getElementById("summary");
    summary.className = "";
    summary.innerHTML = "";

    if(result.errors != null){
        summary.textContent = "Nie udało się zapisać wyniku: " + result.errors[0];
        return;
    }

    let name = document.createElement("span");
    name.className = "bold";
    name.textContent = champion.name;

    let place = document.createElement("span");
    place.className = "bold";
    place.textContent = result.place + ".";

    summary.appendChild(name);
    summary.appendChild(document.createTextNode(" - wygrane turnieje: " + result.titles + " (" + result.percent + "% wszystkich gier w tym quizie), "));
    summary.appendChild(place);
    summary.appendChild(document.createTextNode(" miejsce w rankingu."));
}

// strzałka w lewo wybiera lewą opcję, strzałka w prawo - prawą
function pressKey(event){
    // przytrzymany klawisz nie wybiera kilka razy pod rząd
    if(event.repeat == true){
        return;
    }

    if(event.key == "ArrowLeft"){
        choose("left");
    }
    else if(event.key == "ArrowRight"){
        choose("right");
    }
}

document.onkeydown = pressKey;

// --- funkcje pomocnicze ---

// tworzy jeden punkt "drogi do zwycięstwa": obrazek i nazwa pokonanej opcji, nazwa rundy
function makePathItem(duel){
    let item = document.createElement("li");

    let name = document.createElement("span");
    name.textContent = duel.loser.name;

    let badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = roundName(duel.round);

    item.appendChild(makeImage(duel.loser));
    item.appendChild(name);
    item.appendChild(badge);
    return item;
}
