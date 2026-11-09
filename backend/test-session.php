<?php
require_once __DIR__ . '/init.php';

if (isset($_GET['login'])) {
    Session::login(1);
}
if (isset($_GET['logout'])) {
    Session::logout();
}

jsonResponse(['user_id' => Session::userId()]);