// Lista quizów - WYGLĄD (karty, filtry, licznik, przycisk "pokaż więcej").
// Komunikacja z bazą jest w pliku quizzes-api.js.
//
// Jeden quiz z API wygląda tak (nazwy pól ustalić z backendem):
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

// czyta wartość z adresu strony (np. ?sort=new), a jak jej nie ma, zwraca domyślną
// korzysta z niej też quizzes-api.js
function paramOrDefault(name, defaultValue){
    let params = new URLSearchParams(location.search);
    let value = params.get(name);

    if(value == null || value == ""){
        return defaultValue;
    }
    return value;
}

// wpisuje do wyszukiwarki i list wyboru to, co jest w adresie strony
// (kategorię ustawia drawCategories, bo jej lista przychodzi z bazy)
function fillFilters(){
    document.getElementById("search").value = paramOrDefault("search", "");
    document.getElementById("sort").value = paramOrDefault("sort", "popular");
}

// dopisuje kategorie do listy wyboru, wywołuje ją loadCategories()
// categories to tablica, np. [{ id: 1, name: "jedzenie" }, { id: 2, name: "zwierzęta" }]
function drawCategories(categories){
    let select = document.getElementById("category");

    for(let i = 0; i < categories.length; i++){
        let option = document.createElement("option");
        option.value = categories[i].id;
        option.textContent = categories[i].name;
        select.appendChild(option);
    }

    select.value = paramOrDefault("category", "0");
}

// dopisuje karty quizów na koniec listy, wywołuje ją loadQuizzes()
function drawQuizzes(quizzes){
    let list = document.getElementById("quiz-list");
    removeLoading(list);

    for(let i = 0; i < quizzes.length; i++){
        list.appendChild(makeCard(quizzes[i]));
    }
}

// pokazuje liczbę quizów w plakietce albo napis "nic nie znaleziono"
function drawCounter(total){
    document.getElementById("counter").textContent = total + " " + plural(total, "quiz", "quizy", "quizów");

    if(total == 0){
        removeLoading(document.getElementById("quiz-list"));
        document.getElementById("empty").style.display = "block";
    }
    else{
        document.getElementById("empty").style.display = "none";
    }
}

// pokazuje albo chowa przycisk "pokaż więcej"
function showLoadMore(show){
    if(show == true){
        document.getElementById("load-more").style.display = "block";
    }
    else{
        document.getElementById("load-more").style.display = "none";
    }
}

// --- funkcje pomocnicze ---

// usuwa napis "ładuję quizy..." z listy (jeśli jeszcze tam jest)
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

    let average = "-";
    if(quiz.average != null){
        average = quiz.average.toFixed(1).replace(".", ",");
    }

    let bottom = document.createElement("span");
    bottom.className = "card-bottom";
    bottom.appendChild(makeBadge(quiz.plays + " " + plural(quiz.plays, "gra", "gry", "gier")));
    bottom.appendChild(makeBadge("★ " + average));
    bottom.appendChild(makeBadge(quiz.optionCount + " " + plural(quiz.optionCount, "opcja", "opcje", "opcji")));

    body.appendChild(category);
    body.appendChild(title);
    body.appendChild(bottom);

    link.appendChild(top);
    link.appendChild(body);
    item.appendChild(link);
    return item;
}
