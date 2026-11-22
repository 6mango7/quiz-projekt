<?php
//rejestracja nowego konta, po rejestracji od razu logujemy
require_once __DIR__ . '/init.php';

requireMethod('POST');

$data = getRequestData();
$login = trim($data['login'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$repeatPassword = $data['repeat_password'] ?? '';

$users = new User($db);
$errors = [];

//login
//bez dozwolonych znakow specjalnych - zostac maja same litery i cyfry
$loginLettersDigits = str_replace(['_', '.', '-'], '', $login);

if ($login === '') {
    $errors[] = 'Podaj login';
} elseif (strlen($login) < 3 || strlen($login) > 30) {
    $errors[] = 'Login musi mieć od 3 do 30 znaków';
} elseif (!ctype_alnum($loginLettersDigits)) {
    $errors[] = 'Login może zawierać tylko litery, cyfry oraz znaki _ . -';
} elseif ($users->loginExists($login)) {
    $errors[] = 'Ten login jest już zajęty';
}

//email
if ($email === '') {
    $errors[] = 'Podaj e-mail';
} elseif (strlen($email) > 100 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Podaj poprawny adres e-mail';
} elseif ($users->emailExists($email)) {
    $errors[] = 'Konto z tym e-mailem już istnieje';
}

//haslo
if (mb_strlen($password) < 8) {
    $errors[] = 'Hasło musi mieć co najmniej 8 znaków';
} elseif ($password !== $repeatPassword) {
    $errors[] = 'Hasła nie są takie same';
}

if (count($errors) > 0) {
    jsonErrors($errors);
}

//zakladamy konto i od razu logujemy
$userId = $users->create($login, $email, $password);
Session::login($userId);

jsonResponse(['id' => $userId, 'login' => $login], 201);