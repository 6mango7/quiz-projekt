// Menu konta w nagłówku - WYGLĄD (dołączone na każdej stronie przez includes/footer.php).
// Komunikacja z bazą jest w pliku account-api.js.

// chowa przycisk "zaloguj się" i pokazuje menu z loginem zalogowanej osoby,
// wywołuje ją loadAccount()
// user wygląda np. tak: { login: "demo" }
function showAccount(user){
    document.getElementById("login-button").style.display = "none";
    document.getElementById("account-avatar").textContent = user.login.substring(0, 1).toUpperCase();
    document.getElementById("account-login").textContent = user.login;
    document.getElementById("account-menu").style.display = "block";
}

// zamyka menu konta, gdy ktoś kliknie gdziekolwiek poza nim
function closeAccountMenu(event){
    let menu = document.getElementById("account-menu");
    if(menu.contains(event.target) == false){
        menu.open = false;
    }
}

document.onclick = closeAccountMenu;
