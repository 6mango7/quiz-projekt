// Ustawienia - WYGLĄD (wypełnianie pól, błędy, komunikaty).
// Komunikacja z bazą jest w pliku settings-api.js.
// Przyciski "jasny" i "ciemny" korzystają z setTheme() z pliku theme.js.

// wpisuje obecny e-mail i opis do formularza "profil", wywołuje ją loadSettings()
function fillSettings(email, description){
    document.getElementById("settings-email").value = email;

    if(description != null){
        document.getElementById("settings-description").value = description;
    }
}

// pokazuje błędy w czerwonym polu o podanym id
// ('profile-errors', 'password-errors' albo 'delete-errors')
// errors to tablica napisów, np. ["Podaj poprawny e-mail."]
function showErrors(boxId, errors){
    let box = document.getElementById(boxId);
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

// pokazuje komunikat po udanym zapisie, np. "Zapisano."
// przy okazji chowa stare błędy, bo zapis się udał
function showSaved(text){
    showErrors("profile-errors", []);
    showErrors("password-errors", []);
    alert(text);
}

// czyści trzy pola z hasłami po udanej zmianie hasła
function clearPasswordForm(){
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("repeat-password").value = "";
}
