<?php
//lista kategorii - do filtrow i edytora quizu
require_once __DIR__ . '/init.php';

requireMethod('GET');

$categories = new Category($db);

jsonResponse($categories->findAll());