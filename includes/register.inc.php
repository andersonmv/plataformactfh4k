<?php
include_once 'db_connect.php';
include_once 'psl-config.php';
 
$error_msg = "";
 
if (isset($_POST['username'], $_POST['email'], $_POST['p'])) {
    // Limpa e valida os dados passados em 
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Email inválido
        $error_msg .= '<p class="error">O endereço de email digitado não é válido</p>';
    }
 
    $password = filter_input(INPUT_POST, 'p', FILTER_SANITIZE_STRING);
    if (strlen($password) != 128) {
        // A senha com hash deve ter 128 caracteres.
        // Caso contrário, algo muito estranho está acontecendo
        $error_msg .= '<p class="error">Invalid password configuration.</p>';
    }
 
    // O nome de usuário e a validade da senha foram conferidas no lado cliente.
    // Não deve haver problemas nesse passo já que ninguém ganha 
    // violando essas regras.
    //
 
    $prep_stmt = "SELECT id FROM sr_usuarios_secret WHERE email = ? LIMIT 1";
    $stmt = $mysqli->prepare($prep_stmt);
 
    if ($stmt) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
 
        if ($stmt->num_rows == 1) {
            // Um usuário com esse email já esixte
            $error_msg .= '<p class="error">Um usuário com esse email já existe.</p>';
        }
    } else {
        $error_msg .= '<p class="error">Database error</p>';
    }
 
 
    if (empty($error_msg)) {
        // Crie um salt aleatório
        $random_salt = hash('sha512', uniqid(openssl_random_pseudo_bytes(16), TRUE));
 
        // Crie uma senha com salt 
        $password = hash('sha512', $password . $random_salt);
 
        // Inserir o novo usuário no banco de dados 
        if ($insert_stmt = $mysqli->prepare("INSERT INTO sr_usuarios_secret (username, email, password, salt, ativo) VALUES (?, ?, ?, ?, '0')")) {
            $insert_stmt->bind_param('ssss', $username, $email, $password, $random_salt);
			 // Executar a tarefa pré-estabelecida.
            if (! $insert_stmt->execute()) {
                header('Location: ../error.php?err=Registration failure: INSERT');
            }
        }
		
        header('Location: ./index.php');
    }
}