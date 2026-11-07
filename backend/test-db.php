<?php
require_once 'init.php';

jsonResponse([
    'contentType' => $_SERVER['CONTENT_TYPE'] ?? '',
    'body'        => file_get_contents('php://input'),
    'post'        => $_POST,
    'wynik'       => getRequestData(),
]);