// Strona quizu - WYGLĄD (opis, statystyki, ranking, oceny).
// Komunikacja z bazą jest w pliku quiz-api.js.
// Obrazki, gwiazdki, daty i odmianę słów robią funkcje z pliku common.js.

// opcje quizu posortowane od najlepszej, wpisuje je loadQuiz(),
// a drawRanking() rysuje z nich tabelę
// jedna opcja wygląda np. tak:
// { id: 5, name: "pizza", image: "img/emoji/1f355.svg", wins: 120, duels: 150, winRate: 80, titles: 812 }
// (winRate to procent wygranych pojedynków albo null, gdy opcja jeszcze nie grała)
let options = [];

// id quizu, wpisuje je drawQuiz(), potrzebne do formularza "graj!" i linku do logowania
let quizId = 0;

// wpisuje tytuł, opis, kategorię (naklejka i link w ścieżce), autora z datą
// i link "edytuj quiz", jeśli to quiz zalogowanej osoby, wywołuje ją loadQuiz()
// quiz wygląda np. tak:
// { id: 1, title: "...", description: "...", category: { id: 1, name: "jedzenie" },
//   author: "demo", createdAt: "2026-11-03 12:00:00", mine: false }
function drawQuiz(quiz){
    quizId = quiz.id;
    document.title = quiz.title + " - quizownia";

    document.getElementById("quiz-title").textContent = quiz.title;
    document.getElementById("quiz-category").textContent = quiz.category.name;
    if(quiz.description != null){
        document.getElementById("quiz-description").textContent = quiz.description;
    }

    let categoryLink = document.getElementById("category-link");
    categoryLink.textContent = quiz.category.name;
    categoryLink.href = "quizzes.php?category=" + quiz.category.id;

    // "autor: demo - dodany 03.11.2026 - edytuj quiz"
    let author = document.getElementById("quiz-author");
    author.innerHTML = "";
    author.appendChild(document.createTextNode("autor: "));
    author.appendChild(makeLink("profile.php?user=" + encodeURIComponent(quiz.author), quiz.author));
    author.appendChild(document.createTextNode(" - dodany " + formatDate(quiz.createdAt)));
    if(quiz.mine == true){
        author.appendChild(document.createTextNode(" - "));
        author.appendChild(makeLink("editor.php?id=" + quiz.id, "edytuj quiz"));
    }
}

// wpisuje trzy liczby: gry, opcje, średnia ocen,
// i zdanie "Najczęściej wygrywa ..." pod spodem
// stats wygląda np. tak: { plays: 3240, average: 4.3 }, a liczbę opcji bierzemy z tablicy options
function drawStats(stats){
    document.getElementById("play-count").textContent = stats.plays;
    document.getElementById("option-count").textContent = options.length;
    document.getElementById("average").textContent = formatDecimal(stats.average);

    // najlepsza opcja jest pierwsza w tablicy options
    let champion = document.getElementById("quiz-champion");
    champion.innerHTML = "";
    if(options.length > 0 && options[0].titles > 0){
        let name = document.createElement("span");
        name.className = "bold";
        name.textContent = options[0].name;

        champion.appendChild(document.createTextNode("Najczęściej wygrywa "));
        champion.appendChild(name);
        champion.appendChild(document.createTextNode(" - " + options[0].titles + " " + plural(options[0].titles, "raz", "razy", "razy") + "."));
    }
}

// wstawia przyciski z rozmiarem turnieju (np. 4, 8, 16) i pokazuje formularz "graj!",
// a gdy rozmiarów nie ma, pokazuje napis "Ten quiz ma za mało opcji..."
// sizes to tablica liczb od najmniejszej, np. [4, 8, 16, 32]
function drawSizes(sizes){
    if(sizes.length == 0){
        document.getElementById("play-panel").style.display = "none";
        document.getElementById("too-few").style.display = "block";
        return;
    }

    // domyślnie zaznaczamy największy rozmiar, który nie przekracza 16
    let defaultSize = sizes[0];
    for(let i = 0; i < sizes.length; i++){
        if(sizes[i] <= 16){
            defaultSize = sizes[i];
        }
    }

    let box = document.getElementById("sizes");
    box.innerHTML = "";
    for(let i = 0; i < sizes.length; i++){
        let label = document.createElement("label");
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "size";
        radio.value = sizes[i];
        if(sizes[i] == defaultSize){
            radio.checked = true;
        }
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + sizes[i]));
        box.appendChild(label);
    }

    document.getElementById("quiz-id").value = quizId;
    document.getElementById("too-few").style.display = "none";
    document.getElementById("play-panel").style.display = "grid";
}

// rysuje wiersze rankingu z tablicy options: pierwsze 10 albo wszystkie (all = true),
// pokazuje albo chowa przycisk "pokaż wszystkie"
function drawRanking(all){
    let count = options.length;
    if(all == false && count > 10){
        count = 10;
    }

    let rows = document.getElementById("ranking-rows");
    rows.innerHTML = "";
    for(let i = 0; i < count; i++){
        rows.appendChild(makeRankingRow(i));
    }

    let button = document.getElementById("full-ranking");
    button.textContent = "pokaż wszystkie (" + options.length + ")";
    if(all == true || options.length <= 10){
        button.style.display = "none";
    }
    else{
        button.style.display = "inline-block";
    }
}

// wpisuje średnią, liczbę ocen, paski 5-1 gwiazdek i komentarze
// ratings wygląda np. tak:
// { average: 4.3, count: 12, distribution: { 1: 0, 2: 1, 3: 2, 4: 4, 5: 5 },
//   list: [{ login: "ania", rating: 5, comment: "Super!", createdAt: "2026-11-20 14:03:00" }] }
function drawRatings(ratings){
    document.getElementById("big-average").textContent = formatDecimal(ratings.average);
    document.getElementById("average").textContent = formatDecimal(ratings.average);
    document.getElementById("rating-count").textContent = ratings.count + " " + plural(ratings.count, "ocena", "oceny", "ocen");

    // najdłuższy pasek ma ocena, którą wybrano najwięcej razy
    let most = 1;
    for(let rating = 1; rating <= 5; rating++){
        if(ratings.distribution[rating] > most){
            most = ratings.distribution[rating];
        }
    }

    let distribution = document.getElementById("distribution");
    distribution.innerHTML = "";
    for(let rating = 5; rating >= 1; rating--){
        let row = document.createElement("li");

        let label = document.createElement("span");
        label.textContent = rating + " ★";

        let number = document.createElement("span");
        number.textContent = ratings.distribution[rating];

        row.appendChild(label);
        row.appendChild(makeBar(Math.round(ratings.distribution[rating] / most * 100)));
        row.appendChild(number);
        distribution.appendChild(row);
    }

    let comments = document.getElementById("comments");
    comments.innerHTML = "";
    if(ratings.list.length == 0){
        let empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "Nikt jeszcze nie ocenił tego quizu. Bądź pierwszy!";
        comments.appendChild(empty);
        return;
    }
    for(let i = 0; i < ratings.list.length; i++){
        comments.appendChild(makeComment(ratings.list[i]));
    }
}

// pokazuje odpowiednią część przy ocenach:
// 'own' - napis "To Twój quiz...", 'guest' - link do logowania, 'user' - formularz oceny
// myRating to ocena zalogowanej osoby (jeśli już oceniała, zaznacza gwiazdki i pokazuje "usuń ocenę")
// myRating wygląda np. tak: { rating: 4, comment: "Fajny!" } albo jest null
function showRatingForm(state, myRating){
    let info = document.getElementById("rating-info");
    let form = document.getElementById("rating-form");
    info.innerHTML = "";

    if(state == "own"){
        info.textContent = "To Twój quiz - oceny zostawiają inni gracze.";
        info.style.display = "block";
        form.style.display = "none";
        return;
    }

    if(state == "guest"){
        let link = makeLink("login.php?next=" + encodeURIComponent("quiz.php?id=" + quizId), "zaloguj się");
        link.className = "button";
        info.appendChild(link);
        info.appendChild(document.createTextNode(" i dodaj swoją ocenę."));
        info.style.display = "block";
        form.style.display = "none";
        return;
    }

    // state == "user" - formularz oceny
    info.style.display = "none";
    form.style.display = "grid";
    showErrors([]);

    let radios = document.getElementsByName("rating");
    if(myRating != null){
        for(let i = 0; i < radios.length; i++){
            if(radios[i].value == myRating.rating){
                radios[i].checked = true;
            }
        }
        if(myRating.comment != null){
            document.getElementById("rating-comment").value = myRating.comment;
        }
        document.getElementById("send-rating").textContent = "zmień ocenę";
        document.getElementById("delete-rating").style.display = "inline-block";
    }
    else{
        for(let i = 0; i < radios.length; i++){
            radios[i].checked = false;
        }
        document.getElementById("rating-comment").value = "";
        document.getElementById("send-rating").textContent = "dodaj ocenę";
        document.getElementById("delete-rating").style.display = "none";
    }
}

// pokazuje czerwone pole z błędami pod formularzem oceny
// errors to tablica napisów, np. ["Wybierz ocenę od 1 do 5 gwiazdek."]
function showErrors(errors){
    let box = document.getElementById("rating-errors");
    box.innerHTML = "";

    if(errors.length == 0){
        box.style.display = "none";
        return;
    }

    let list = document.createElement("ul");
    for(let i = 0; i < errors.length; i++){
        let item = document.createElement("li");
        item.textContent = errors[i];
        list.appendChild(item);
    }
    box.appendChild(list);
    box.style.display = "block";
}

// --- funkcje pomocnicze ---

// tworzy link z adresem i tekstem
function makeLink(address, text){
    let link = document.createElement("a");
    link.href = address;
    link.textContent = text;
    return link;
}

// tworzy pasek, który jest wypełniony w podanym procencie (0-100)
function makeBar(percent){
    let bar = document.createElement("span");
    bar.className = "bar";

    let fill = document.createElement("span");
    fill.className = "bar-fill";
    fill.style.width = percent + "%";

    bar.appendChild(fill);
    return bar;
}

// tworzy wiersz rankingu: miejsce, obrazek, nazwa, pasek wygranych pojedynków, wygrane turnieje
function makeRankingRow(number){
    let option = options[number];
    let row = document.createElement("tr");

    let placeCell = document.createElement("td");
    let place = document.createElement("span");
    place.className = "number";
    place.textContent = number + 1;
    placeCell.appendChild(place);

    let imageCell = document.createElement("td");
    imageCell.appendChild(makeImage(option));

    let nameCell = document.createElement("td");
    nameCell.textContent = option.name;

    let rateCell = document.createElement("td");
    rateCell.className = "win-rate";
    if(option.winRate != null){
        rateCell.appendChild(makeBar(option.winRate));
        rateCell.appendChild(document.createTextNode(option.winRate + "%"));
        rateCell.title = "wygrane pojedynki: " + option.wins + " z " + option.duels;
    }
    else{
        rateCell.appendChild(makeBar(0));
        rateCell.appendChild(document.createTextNode("-"));
    }

    let titlesCell = document.createElement("td");
    titlesCell.textContent = option.titles + "×";

    row.appendChild(placeCell);
    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(rateCell);
    row.appendChild(titlesCell);
    return row;
}

// tworzy jeden komentarz: login z linkiem do profilu, gwiazdki, data i treść
function makeComment(rating){
    let item = document.createElement("li");

    let top = document.createElement("div");
    top.className = "rating-top";

    let starsText = document.createElement("span");
    starsText.textContent = stars(rating.rating);

    let date = document.createElement("span");
    date.className = "muted";
    date.textContent = formatDate(rating.createdAt);

    top.appendChild(makeLink("profile.php?user=" + encodeURIComponent(rating.login), rating.login));
    top.appendChild(starsText);
    top.appendChild(date);
    item.appendChild(top);

    if(rating.comment != null && rating.comment != ""){
        let comment = document.createElement("p");
        comment.className = "rating-text";
        comment.textContent = rating.comment;
        item.appendChild(comment);
    }

    return item;
}
