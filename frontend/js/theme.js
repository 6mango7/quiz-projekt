if(localStorage.getItem('theme') == 'dark'){
    document.documentElement.className = "dark";
}

function toggleTheme(){
    if(document.documentElement.className == "dark"){
        document.documentElement.className = "";
        localStorage.setItem('theme', 'light');
    }
    else{
        document.documentElement.className = "dark";
        localStorage.setItem('theme', 'dark');
    }
}

// ustawia wybrany motyw: 'light' albo 'dark' (przyciski w ustawieniach)
function setTheme(theme){
    if(theme == 'dark'){
        document.documentElement.className = "dark";
    }
    else{
        document.documentElement.className = "";
    }
    localStorage.setItem('theme', theme);
}
