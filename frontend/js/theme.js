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
