// Strona główna - WYGLĄD (karty popularnych i nowych quizów).
// Komunikacja z bazą jest w pliku home-api.js.
// Karty quizów rysuje makeCard() z pliku common.js.

// wstawia karty najpopularniejszych quizów, wywołuje ją loadHome()
// quizzes to tablica quizów - jeden quiz jest opisany w common.js
function drawPopular(quizzes){
    drawList("popular-list", quizzes);
}

// wstawia karty najnowszych quizów, wywołuje ją loadHome()
function drawNew(quizzes){
    drawList("new-list", quizzes);
}

// --- funkcje pomocnicze ---

// wstawia karty do listy o podanym id,
// a gdy quizów nie ma, pokazuje zaproszenie do stworzenia pierwszego
function drawList(listId, quizzes){
    let list = document.getElementById(listId);
    list.innerHTML = "";

    if(quizzes.length == 0){
        let empty = document.createElement("li");
        empty.className = "empty";
        empty.appendChild(document.createTextNode("Nie ma jeszcze żadnych quizów. "));

        let link = document.createElement("a");
        link.href = "editor.php";
        link.textContent = "Stwórz pierwszy!";
        empty.appendChild(link);

        list.appendChild(empty);
        return;
    }

    for(let i = 0; i < quizzes.length; i++){
        list.appendChild(makeCard(quizzes[i]));
    }
}
