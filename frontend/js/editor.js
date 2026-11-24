// Edytor quizu - WYGLĄD (rysowanie, okno emoji, lista opcji).
// Komunikacja z bazą jest w pliku editor-api.js.
// Odmianę słów (plural) i komunikat błędu strony (showPageError) robią funkcje z pliku common.js.

// lista opcji quizu, korzysta z niej też saveQuiz() w editor-api.js
// jedna opcja wygląda tak:
// {
//     id: 0,            // 0 - nowa opcja, liczba - opcja zapisana już w bazie
//     name: "pizza",
//     image: "none",    // "none" - bez obrazka, "keep" - zostaw obrazek z bazy,
//                       // "emoji:1f355" - wybrane emoji, "file" - nowe zdjęcie z dysku
//     file: null,       // wybrany plik ze zdjęciem (tylko gdy image == "file")
//     preview: null     // adres obrazka do podglądu albo null
// }
let options = [];

let emojiFor = -1;        // numer opcji, dla której wybieramy emoji
let emojiLoaded = false;  // czy lista emoji jest już wczytana do okna

// wypełnia listę kategorii, wywołuje ją loadCategories()
// categories to tablica, np. [{ id: 1, name: "jedzenie" }, { id: 2, name: "zwierzęta" }]
function drawCategories(categories){
    let select = document.getElementById("category");

    for(let i = 0; i < categories.length; i++){
        let option = document.createElement("option");
        option.value = categories[i].id;
        option.textContent = categories[i].name;
        select.appendChild(option);
    }
}

// wpisuje dane quizu do formularza (tryb edycji), wywołuje ją loadQuiz()
// quiz wygląda np. tak:
// { id: 1, title: "...", description: "...", category: { id: 1 },
//   options: [{ id: 5, name: "pizza", image: "img/emoji/1f355.svg" }, ...] }
function fillEditor(quiz){
    document.getElementById("title").value = quiz.title;
    if(quiz.description != null){
        document.getElementById("description").value = quiz.description;
    }
    document.getElementById("category").value = quiz.category.id;

    options = [];
    for(let i = 0; i < quiz.options.length; i++){
        let option = {
            id: quiz.options[i].id,
            name: quiz.options[i].name,
            image: "none",
            file: null,
            preview: null
        };
        if(quiz.options[i].image != null){
            option.image = "keep";
            option.preview = quiz.options[i].image;
        }
        options.push(option);
    }

    // napisy zmieniamy z "nowy quiz" na "edycja quizu"
    document.title = "edycja: " + quiz.title + " - quizownia";
    document.getElementById("heading").textContent = "edycja quizu";
    document.getElementById("save").textContent = "zapisz zmiany";
    document.getElementById("cancel").href = "quiz.php?id=" + quiz.id;

    // ścieżka u góry: tytuł quizu / edycja
    let breadcrumbs = document.getElementById("breadcrumbs");
    breadcrumbs.innerHTML = "";
    let link = document.createElement("a");
    link.href = "quiz.php?id=" + quiz.id;
    link.textContent = quiz.title;
    breadcrumbs.appendChild(link);
    breadcrumbs.appendChild(document.createTextNode(" / edycja"));

    document.getElementById("delete-zone").style.display = "block";
    drawOptions();
}

// rysuje całą listę opcji od nowa na podstawie tablicy options
function drawOptions(){
    let list = document.getElementById("option-list");
    list.innerHTML = "";

    for(let i = 0; i < options.length; i++){
        list.appendChild(makeOptionRow(i));
    }

    // plakietka obok napisu "opcje", np. "3 opcje - dodaj jeszcze 1"
    let info = options.length + " " + plural(options.length, "opcja", "opcje", "opcji");
    if(options.length < 4){
        info = info + " - dodaj jeszcze " + (4 - options.length);
    }
    document.getElementById("options-info").textContent = info;
}

// dodaje nową opcję z pola "nazwa nowej opcji", wywołuje ją przycisk "+ dodaj"
function addOption(){
    let field = document.getElementById("new-option");
    let name = field.value.trim();

    if(name == ""){
        return;
    }
    if(options.length >= 64){
        showErrors(["Quiz może mieć najwyżej 64 opcje."]);
        return;
    }

    options.push({ id: 0, name: name, image: "none", file: null, preview: null });
    field.value = "";
    field.focus();
    drawOptions();
}

// usuwa opcję o podanym numerze, wywołuje ją przycisk "×"
function removeOption(number){
    options.splice(number, 1);
    drawOptions();
}

// usuwa obrazek z opcji, wywołuje ją przycisk "bez obrazka"
function removeImage(number){
    options[number].image = "none";
    options[number].file = null;
    options[number].preview = null;
    drawOptions();
}

// zapamiętuje zdjęcie wybrane z dysku i pokazuje jego podgląd,
// wywołuje ją pole "zdjęcie" (input type="file")
function choosePhoto(number, input){
    let file = input.files[0];
    if(file == null){
        return;
    }
    if(file.size > 5 * 1024 * 1024){
        showErrors(["Zdjęcie jest za duże - najwyżej 5 MB."]);
        return;
    }

    options[number].image = "file";
    options[number].file = file;
    options[number].preview = URL.createObjectURL(file);
    drawOptions();
}

// otwiera okno z emoji dla opcji o podanym numerze,
// za pierwszym razem wczytuje listę emoji z pliku img/emoji/lista.json
async function openEmoji(number){
    emojiFor = number;
    document.getElementById("emoji-window").style.display = "block";

    if(emojiLoaded == true){
        return;
    }

    let emojiList = document.getElementById("emoji-list");
    try{
        let response = await fetch("img/emoji/lista.json");
        let codes = await response.json();

        emojiList.innerHTML = "";
        for(let i = 0; i < codes.length; i++){
            let button = document.createElement("button");
            button.type = "button";
            button.setAttribute("onclick", "chooseEmoji('" + codes[i] + "')");

            let img = document.createElement("img");
            img.src = "img/emoji/" + codes[i] + ".svg";
            img.alt = "emoji " + codes[i];
            img.loading = "lazy";

            button.appendChild(img);
            emojiList.appendChild(button);
        }
        emojiLoaded = true;
    }
    catch(error){
        emojiList.textContent = "Nie udało się wczytać emoji. Zamknij okno i spróbuj jeszcze raz.";
    }
}

// ustawia wybrane emoji jako obrazek opcji, wywołują ją przyciski w oknie emoji
function chooseEmoji(code){
    options[emojiFor].image = "emoji:" + code;
    options[emojiFor].file = null;
    options[emojiFor].preview = "img/emoji/" + code + ".svg";
    closeEmoji();
    drawOptions();
}

// zamyka okno z emoji, wywołuje ją przycisk "zamknij" i klawisz Escape
function closeEmoji(){
    document.getElementById("emoji-window").style.display = "none";
}

// Enter w polu "nazwa nowej opcji" działa tak samo jak przycisk "+ dodaj"
// wywołuje ją pole new-option (onkeydown w editor.php)
function newOptionKey(event){
    if(event.key == "Enter"){
        // bez tego Enter mógłby wysłać cały formularz
        event.preventDefault();
        addOption();
    }
}

// Escape zamyka okno z emoji (jeśli jest otwarte)
function pressEscape(event){
    if(event.key == "Escape"){
        closeEmoji();
    }
}

document.onkeydown = pressEscape;

// pokazuje czerwone pole z błędami, wywołuje ją saveQuiz()
// errors to tablica napisów, np. ["Podaj tytuł.", "Wybierz kategorię."]
function showErrors(errors){
    let box = document.getElementById("errors");
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

// zapisuje nową nazwę opcji, gdy ktoś ją poprawi w polu na liście
function changeName(number, value){
    options[number].name = value;
}

// tworzy przycisk z tekstem i funkcją do wywołania po kliknięciu
function makeButton(className, text, onclick){
    let button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.textContent = text;
    button.setAttribute("onclick", onclick);
    return button;
}

// tworzy jeden wiersz listy opcji: numer, obrazek, nazwa, przyciski, "×"
function makeOptionRow(number){
    let option = options[number];

    let row = document.createElement("li");
    row.className = "option-row";

    // numer opcji
    let place = document.createElement("span");
    place.className = "bold";
    place.textContent = number + 1;
    row.appendChild(place);

    // podgląd obrazka albo znak zapytania
    if(option.preview != null){
        let img = document.createElement("img");
        img.className = "image";
        img.src = option.preview;
        img.alt = "";
        row.appendChild(img);
    }
    else{
        let missing = document.createElement("span");
        missing.className = "image missing";
        missing.textContent = "?";
        row.appendChild(missing);
    }

    // nazwa opcji, można ją poprawić
    let field = document.createElement("input");
    field.className = "field";
    field.type = "text";
    field.maxLength = 60;
    field.value = option.name;
    field.setAttribute("aria-label", "nazwa opcji " + (number + 1));
    field.setAttribute("oninput", "changeName(" + number + ", this.value)");
    row.appendChild(field);

    // przyciski: emoji, zdjęcie, bez obrazka
    let buttons = document.createElement("span");
    buttons.className = "option-buttons";
    buttons.appendChild(makeButton("button", "emoji", "openEmoji(" + number + ")"));

    let photo = document.createElement("label");
    photo.className = "button";
    photo.textContent = "zdjęcie";
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png,image/gif,image/webp";
    fileInput.hidden = true;
    fileInput.setAttribute("onchange", "choosePhoto(" + number + ", this)");
    photo.appendChild(fileInput);
    buttons.appendChild(photo);

    if(option.preview != null){
        buttons.appendChild(makeButton("button", "bez obrazka", "removeImage(" + number + ")"));
    }
    row.appendChild(buttons);

    // przycisk usuwania opcji
    let remove = makeButton("option-remove", "×", "removeOption(" + number + ")");
    remove.setAttribute("aria-label", "usuń opcję " + (number + 1));
    row.appendChild(remove);

    return row;
}
