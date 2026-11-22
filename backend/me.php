<?php
//kto jest zalogowany - front pyta o to przy starcie strony
require_once __DIR__ . '/init.php';

requireMethod('GET');

$userId = Session::userId();

//nikt nie jest zalogowany
if ($userId === null) {
    jsonResponse(null);
}

$users = new User($db);
$user = $users->findById($userId);

//konto zostalo usuniete a sesja jeszcze istnieje
if ($user === null) {
    Session::logout();
    jsonResponse(null);
}

jsonResponse($user);