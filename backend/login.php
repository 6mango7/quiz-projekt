<?php
//logowanie loginem albo emailem i haslem
require_once __DIR__ . '/init.php';

requireMethod('POST');

$data = getRequestData();
$login = trim($data['login'] ?? '');
$password = $data['password'] ?? '';

//walidacja - zbieramy wszystkie bledy naraz
$errors = [];

if ($login === '') {
    $errors[] = 'Podaj login albo e-mail';
}

if ($password === '') {
    $errors[] = 'Podaj hasło';
}

if (count($errors) > 0) {
    jsonErrors($errors);
}

//sprawdzenie loginu i hasla w bazie
$users = new User($db);
$user = $users->checkCredentials($login, $password);

if ($user === null) {
    jsonError('Zły login lub hasło', 401);
}

Session::login($user['id']);

jsonResponse($user);