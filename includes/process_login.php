<?php
include_once 'db_connect.php';
include_once 'functions.php';
 
sec_session_start(); // Nossa segurança personalizada para iniciar uma sessão php.
 
if (isset($_POST['email'], $_POST['p'])) {
    $email = $_POST['email'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($email, $password, $mysqli) == true) {
        // Login com sucesso 
        header('Location: ../eventos.php');
    } else {
        // Falha de login 
        header('Location: ../index.php?error=1');
    }
} else {
    // As variáveis POST corretas não foram enviadas para esta página. 
    echo 'Invalid Request';
}
