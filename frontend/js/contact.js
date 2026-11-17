// Kontakt - WYGLĄD (błędy, komunikat po wysłaniu).
// Komunikacja z bazą jest w pliku contact-api.js.

// pokazuje czerwone pole z błędami, wywołuje ją sendMessage()
// errors to tablica napisów, np. ["Podaj imię.", "Wpisz wiadomość."]
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

// zamienia formularz na komunikat "wysłano, odpowiemy na podany e-mail"
function showSent(email){
    let form = document.getElementById("contact");
    form.innerHTML = "<span class='sticker color-4'>wysłano</span>"
        + "<p>Dziękujemy za wiadomość. Odpowiemy na adres <span class='bold' id='sent-email'></span>.</p>"
        + "<a class='button' href='index.php'>wróć na start</a>";

    // e-mail wpisany przez użytkownika wstawiamy jako zwykły tekst
    document.getElementById("sent-email").textContent = email;
}
