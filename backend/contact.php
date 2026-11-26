<?php
//formularz kontaktowy - zapis wiadomosci w bazie
require_once __DIR__ . '/init.php';

requireMethod('POST');

$data = getRequestData();
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$topic = trim($data['topic'] ?? '');
$message = trim($data['message'] ?? '');

$errors = [];

//imie
if ($name === '') {
    $errors[] = 'Podaj imię';
} elseif (mb_strlen($name) > 50) {
    $errors[] = 'Imię może mieć najwyżej 50 znaków';
}

//email
if ($email === '') {
    $errors[] = 'Podaj e-mail';
} elseif (strlen($email) > 100 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Podaj poprawny adres e-mail';
}

//temat - tylko z listy
if (!in_array($topic, ContactMessage::TOPICS, true)) {
    $errors[] = 'Wybierz temat';
}

//wiadomosc
if ($message === '') {
    $errors[] = 'Wpisz wiadomość';
} elseif (mb_strlen($message) > 3000) {
    $errors[] = 'Wiadomość może mieć najwyżej 3000 znaków';
}

if (count($errors) > 0) {
    jsonErrors($errors);
}

$messages = new ContactMessage($db);
$messages->create($name, $email, $topic, $message);

jsonResponse(['email' => $email], 201);