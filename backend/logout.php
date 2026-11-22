<?php
//wylogowanie - czysci sesje
require_once __DIR__ . '/init.php';

requireMethod('POST');

Session::logout();

jsonResponse(null);