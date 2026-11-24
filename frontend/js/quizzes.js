// Lista quizów - WYGLĄD (karty, filtry, licznik, przycisk "pokaż więcej").
// Komunikacja z bazą jest w pliku quizzes-api.js.
// Karty quizów rysuje makeCard() z pliku common.js.

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
