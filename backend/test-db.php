<?php
require_once 'config/config.php';
require_once 'classes/Database.php';

$db = new Database();
var_dump($db->fetchOne('SELECT COUNT(*) AS ile FROM quizy'));