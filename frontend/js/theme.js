// Motyw jasny / ciemny. Wybór zapamiętuje przeglądarka (localStorage).
// Plik jest dołączony w <head> (includes/header.php), więc klasa "dark"
// jest ustawiona, zanim strona się narysuje.

if(localStorage.getItem('theme') == 'dark'){
    document.documentElement.classList.add('dark');
}

// wywołują go przyciski motywu w nagłówku i w stopce
function toggleTheme(){
    if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
    else{
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}
