// Wspólne funkcje wyglądu, z których korzysta kilka stron
// (strona główna, lista quizów, strona quizu, gra, profil, edytor).
// Plik trzeba dołączyć PRZED plikiem JS danej strony.
//
// Jeden quiz z API (do kart) wygląda tak - nazwy pól ustalić z backendem:
// {
//     id: 1,
//     title: "Najlepsze jedzenie świata",
//     category: { id: 1, name: "jedzenie" },
//     author: "demo",
//     plays: 3240,
//     average: 4.3,           // średnia ocen albo null, gdy nikt nie ocenił
//     optionCount: 16,
//     cover: [                // dwie pierwsze opcje na okładkę karty
//         { name: "pizza", image: "img/emoji/1f355.svg" },
//         { name: "pierogi", image: null }
//     ]
// }

// zamienia całą treść strony na duży komunikat w stylu strony 404,
// np. gdy w adresie jest quiz albo użytkownik, którego nie ma w bazie
// number - duży napis, np. "404"; text - wyjaśnienie;
// address i linkText - przycisk powrotu, np. "quizzes.php" i "wróć do quizów"
// przykład: showPageError("404", "Nie ma takiego quizu.", "quizzes.php", "wróć do quizów");
function showPageError(number, text, address, linkText){
    document.title = "nie ma takiej strony - quizownia";

    let card = document.createElement("section");
    card.className = "card";
    card.id = "not-found";

    let sticker = document.createElement("span");
    sticker.className = "sticker red";
    sticker.textContent = "ups";

    let big = document.createElement("h1");
    big.id = "big-number";
    big.textContent = number;

    let message = document.createElement("p");
    message.textContent = text;

    let button = document.createElement("a");
    button.className = "button yellow";
    button.href = address;
    button.textContent = linkText;

    card.appendChild(sticker);
    card.appendChild(big);
    card.appendChild(message);
    card.appendChild(button);

    // usuwamy wszystko, co było w <main>, i wstawiamy sam komunikat
    let main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(card);
}

// usuwa napis "ładuję..." z listy (jeśli jeszcze tam jest)
function removeLoading(list){
    let loading = list.querySelector(".loading");
    if(loading != null){
        loading.remove();
    }
}

// zwraca słowo w dobrej formie, np. 1 quiz, 3 quizy, 5 quizów, 22 quizy, 12 quizów
function plural(number, one, few, many){
    if(number == 1){
        return one;
    }

    let lastDigit = number % 10;
    let lastTwoDigits = number % 100;
    if(lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)){
        return few;
    }
    return many;
}

// zamienia liczbę na tekst z jednym miejscem po przecinku, np. 4.25 -> "4,3"
// a gdy liczby nie ma (null), zwraca "-"
function formatDecimal(number){
    if(number == null){
        return "-";
    }
    return number.toFixed(1).replace(".", ",");
}

// zamienia datę z bazy na polski zapis, np. "2026-11-20 14:03:00" -> "20.11.2026"
function formatDate(text){
    let day = text.substring(8, 10);
    let month = text.substring(5, 7);
    let year = text.substring(0, 4);
    return day + "." + month + "." + year;
}

// zwraca ocenę jako gwiazdki, np. 4 -> "★★★★☆"
function stars(rating){
    let text = "";
    for(let i = 1; i <= 5; i++){
        if(i <= rating){
            text = text + "★";
        }
        else{
            text = text + "☆";
        }
    }
    return text;
}

// tworzy obrazek opcji: zdjęcie/emoji albo kwadrat z dwiema pierwszymi literami nazwy
function makeImage(option){
    if(option.image != null && option.image != ""){
        let img = document.createElement("img");
        img.className = "image";
        img.src = option.image;
        img.alt = "";
        return img;
    }

    let letters = document.createElement("span");
    letters.className = "image letters";
    letters.textContent = option.name.substring(0, 2);
    return letters;
}

// tworzy plakietkę (szare pudełko z tekstem) na dole karty
function makeBadge(text){
    let badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = text;
    return badge;
}

// tworzy całą kartę quizu: <li> z linkiem do strony quizu
function makeCard(quiz){
    let item = document.createElement("li");

    let link = document.createElement("a");
    link.className = "card quiz-card";
    link.href = "quiz.php?id=" + quiz.id;

    // góra karty: kolor kategorii i dwie opcje "to czy to"
    let top = document.createElement("span");
    let colorNumber = (quiz.category.id - 1) % 8 + 1;
    top.className = "card-top color-" + colorNumber;
    if(quiz.cover.length > 0){
        top.appendChild(makeImage(quiz.cover[0]));
    }
    if(quiz.cover.length > 1){
        let or = document.createElement("span");
        or.className = "mini-or";
        or.textContent = "czy";
        top.appendChild(or);
        top.appendChild(makeImage(quiz.cover[1]));
    }

    // dół karty: kategoria i autor, tytuł, plakietki
    let body = document.createElement("span");
    body.className = "card-body";

    let category = document.createElement("span");
    category.className = "card-category";
    category.textContent = quiz.category.name + " - " + quiz.author;

    let title = document.createElement("span");
    title.className = "card-title";
    title.textContent = quiz.title;

    let bottom = document.createElement("span");
    bottom.className = "card-bottom";
    bottom.appendChild(makeBadge(quiz.plays + " " + plural(quiz.plays, "gra", "gry", "gier")));
    bottom.appendChild(makeBadge("★ " + formatDecimal(quiz.average)));
    bottom.appendChild(makeBadge(quiz.optionCount + " " + plural(quiz.optionCount, "opcja", "opcje", "opcji")));

    body.appendChild(category);
    body.appendChild(title);
    body.appendChild(bottom);

    link.appendChild(top);
    link.appendChild(body);
    item.appendChild(link);
    return item;
}
