<?php

$menu = [
    'index.php' => 'start',
    'quizzes.php' => 'quizy',
    'editor.php' => '+ stwórz quiz',
    'authors.php' => 'o autorach',
    'contact.php' => 'kontakt',
];

$currentPage = basename($_SERVER['PHP_SELF']);

if(isset($title)){
    $pageTitle = $title . ' · quizownia';
}
else{
    $pageTitle = 'quizownia';
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $pageTitle; ?></title>
    
    <base href="/">
    <link rel="icon" href="img/icon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=swap">
    <link rel="stylesheet" href="css/style.css">

    <script src="js/theme.js"></script>
</head>
<body>

<header class="site-header">
    <a class="logo" href="index.php">
        <span class="logo-mark">?</span>
        <span class="logo-text">quizownia</span>
    </a>

    <nav class="menu">
        <?php
            $text = "";
            foreach($menu as $file => $label){
                if($file == $currentPage){
                    $text .= "<a href='$file' class='active'>$label</a>";
                }
                else{
                    $text .= "<a href='$file'>$label</a>";
                }
            }
            echo $text;
        ?>
    </nav>

    <button class="theme-button" type="button" onclick="toggleTheme()" title="jasny / ciemny motyw">
        <span class="icon-light">☀</span>
        <span class="icon-dark">☾</span>
    </button>

    <div class="account">
        <a class="button primary small" href="login.php">zaloguj się</a>
    </div>
</header>

<main>
