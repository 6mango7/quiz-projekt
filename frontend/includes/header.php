<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- adresy plików liczone od głównego folderu (ważne dla strony 404) -->
    <base href="/">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900">
    <!-- style podzielone na części, kolejność jest ważna: dark i responsive muszą być na końcu -->
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="css/quiz-list.css">
    <link rel="stylesheet" href="css/editor.css">
    <link rel="stylesheet" href="css/pages.css">
    <link rel="stylesheet" href="css/quiz.css">
    <link rel="stylesheet" href="css/game.css">
    <link rel="stylesheet" href="css/colors.css">
    <link rel="stylesheet" href="css/dark.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="icon" href="img/icon.svg">
    <script src="js/theme.js"></script>
    <title><?php echo $title; ?> - quizownia</title>
</head>
<body>
    <header class="card">
        <a id="logo" href="index.php"><img src="img/icon.svg" alt="logo"> quizownia</a>
        <nav id="menu">
            <!-- menu, link do otwartej strony jest podświetlony -->
            <?php
                $menu = [
                    'index.php' => 'start',
                    'quizzes.php' => 'quizy',
                    'editor.php' => '+ stwórz quiz',
                    'authors.php' => 'o autorach',
                    'contact.php' => 'kontakt'
                ];
                $text = "";
                foreach($menu as $file => $label){
                    if($file == $page){
                        $text .= "<a href='$file' class='active'>$label</a>";
                    }
                    else{
                        $text .= "<a href='$file'>$label</a>";
                    }
                }
                echo $text;
            ?>
        </nav>
        <button class="button" type="button" id="theme-button" onclick="toggleTheme()">motyw</button>
        <a class="button yellow" id="login-button" href="login.php">zaloguj się</a>
    </header>
    <main>
