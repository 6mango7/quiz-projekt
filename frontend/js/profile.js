// Profil - WYGLĄD (dane użytkownika, statystyki, quizy, oceny).
// Komunikacja z bazą jest w pliku profile-api.js.
// Karty quizów, gwiazdki i daty rysują funkcje z pliku common.js.

// wpisuje login, pierwszą literę loginu w kwadracie, datę założenia konta i opis,
// wywołuje ją loadProfile()
// user wygląda np. tak: { login: "demo", registeredAt: "2026-11-03 12:00:00", description: "..." }
function drawProfile(user){
    document.title = user.login + " - quizownia";
    document.getElementById("avatar").textContent = user.login.substring(0, 1).toUpperCase();
    document.getElementById("profile-login").textContent = user.login;
    document.getElementById("member-since").textContent = "konto od " + formatDate(user.registeredAt);

    if(user.description != null){
        document.getElementById("profile-description").textContent = user.description;
    }
}

// wpisuje cztery liczby: quizy, gry, średnia ocen, wystawione oceny
// stats wygląda np. tak: { quizzes: 3, plays: 120, averageReceived: 4.25, ratingsGiven: 7 }
function drawStats(stats){
    document.getElementById("quiz-count").textContent = stats.quizzes;
    document.getElementById("play-count").textContent = stats.plays;
    document.getElementById("average").textContent = formatDecimal(stats.averageReceived);
    document.getElementById("ratings-given").textContent = stats.ratingsGiven;
}

// pokazuje przyciski "ustawienia konta" i "+ nowy quiz" (tylko na własnym profilu)
function showOwnerButtons(){
    document.getElementById("settings-link").style.display = "inline-block";
    document.getElementById("new-quiz").style.display = "inline-block";
}

// wstawia karty quizów użytkownika albo napis "Brak quizów."
// quizzes to tablica quizów - jeden quiz jest opisany w common.js
function drawQuizzes(quizzes){
    let list = document.getElementById("profile-quizzes");
    list.innerHTML = "";

    if(quizzes.length == 0){
        let empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "Brak quizów.";
        list.appendChild(empty);
        return;
    }

    for(let i = 0; i < quizzes.length; i++){
        list.appendChild(makeCard(quizzes[i]));
    }
}

// wstawia ostatnie oceny (quiz, liczba gwiazdek, data, komentarz) albo napis "Brak ocen."
// jedna ocena wygląda np. tak:
// { quiz: { id: 1, title: "Najlepsza pizza" }, rating: 4, comment: "Fajny!", createdAt: "2026-11-20 14:03:00" }
function drawRatings(ratings){
    let list = document.getElementById("last-ratings");
    list.innerHTML = "";

    if(ratings.length == 0){
        let empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "Brak ocen.";
        list.appendChild(empty);
        return;
    }

    for(let i = 0; i < ratings.length; i++){
        list.appendChild(makeRating(ratings[i]));
    }
}

// --- funkcje pomocnicze ---

// tworzy jedną ocenę na liście: link do quizu, gwiazdki, data i komentarz
function makeRating(rating){
    let item = document.createElement("li");

    let top = document.createElement("div");
    top.className = "rating-top";

    let link = document.createElement("a");
    link.href = "quiz.php?id=" + rating.quiz.id;
    link.textContent = rating.quiz.title;

    let starsText = document.createElement("span");
    starsText.textContent = stars(rating.rating);

    let date = document.createElement("span");
    date.className = "muted";
    date.textContent = formatDate(rating.createdAt);

    top.appendChild(link);
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
