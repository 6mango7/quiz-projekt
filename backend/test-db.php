<?php
require_once 'init.php';

$db = new Database();
var_dump($db->fetchOne('SELECT COUNT(*) AS ile FROM quizy'));