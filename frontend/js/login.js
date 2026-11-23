// Logowanie i rejestracja - WYGLĄD (błędy, karta "już grasz").
// Komunikacja z bazą jest w pliku login-api.js.

// pokazuje błędy w czerwonym polu o podanym id ('login-errors' albo 'register-errors'),
// wywołują ją login() i register()
// errors to tablica napisów, np. ["Podaj login.", "Hasło jest za krótkie."]
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

// chowa formularze i pokazuje kartę "już grasz" z loginem, wywołuje ją checkAccount()
function showLoggedIn(login){
    document.getElementById("forms").style.display = "none";

    // login wpisany przez użytkownika wstawiamy jako zwykły tekst
    document.getElementById("my-login").textContent = login;
    document.getElementById("logged-in").style.display = "grid";
}
