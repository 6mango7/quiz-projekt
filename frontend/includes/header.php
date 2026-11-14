<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900">
    <link rel="stylesheet" href="css/style.css">
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
