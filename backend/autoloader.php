<?php
//automatycznie dolacza do kodu klasy ktorych chcemy uzyc
spl_autoload_register(function (string $className) {
    $file = __DIR__ . '/classes/' . $className . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});