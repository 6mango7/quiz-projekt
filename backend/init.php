<?php
//dolaczanie wszystkich plikow ktore sa potrzebne do dzialania aplikacji
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/autoloader.php';
require_once __DIR__ . '/helpers.php';

//kazdy nieprzechwycony blad zamieniamy na json zamiast strony html
set_exception_handler(function (Throwable $e) {
    error_log($e); //pelna tresc bledu do logow dockera
    jsonError('Błąd serwera', 500);
});

//jedno polaczenie z baza na cale zapytanie
$db = new Database();