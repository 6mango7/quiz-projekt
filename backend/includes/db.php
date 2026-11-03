<?php
// Połączenie z bazą MySQL.
// Dane logowania są takie same jak w docker-compose.yml (usługa "db").
$polaczenie = mysqli_connect('db', 'quiz', 'quiz123', 'quizownia');

// polskie znaki (i emoji) zapisują się i czytają poprawnie
mysqli_set_charset($polaczenie, 'utf8mb4');
