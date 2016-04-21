<?php
include_once 'psl-config.php';
 
function sec_session_start() {
    $session_name = 'sec_session_id';   // Estabeleça um nome personalizado para a sessão
    $secure = SECURE;
    // Isso impede que o JavaScript possa acessar a identificação da sessão.
    $httponly = true;
    // Assim você força a sessão a usar apenas cookies. 
   if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    // Obtém params de cookies atualizados.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"], 
        $cookieParams["domain"], 
        $secure,
        $httponly);
    // Estabelece o nome fornecido acima como o nome da sessão.
    session_name($session_name);
    session_start();            // Inicia a sessão PHP 
    session_regenerate_id();    // Recupera a sessão e deleta a anterior. 
}

///funcção de logar///
function login($email, $password, $mysqli) {
    // Usando definições pré-estabelecidas significa que a injeção de SQL (um tipo de ataque) não é possível. 
    if ($stmt = $mysqli->prepare("SELECT id, username, password, salt 
        FROM sr_usuarios_secret
		WHERE email = ?
        LIMIT 1")) {
        $stmt->bind_param('s', $email);  // Relaciona  "$email" ao parâmetro.
        $stmt->execute();    // Executa a tarefa estabelecida.
        $stmt->store_result();
 
        // obtém variáveis a partir dos resultados. 
        $stmt->bind_result($user_id, $username, $db_password, $salt);
        $stmt->fetch();
 
        // faz o hash da senha com um salt excusivo.
        $password = hash('sha512', $password . $salt);
        if ($stmt->num_rows == 1) {
            // Caso o usuário exista, conferimos se a conta está bloqueada
            // devido ao limite de tentativas de login ter sido ultrapassado 
 
            if (checkbrute($user_id, $mysqli) == true) {
                // A conta está bloqueada 
                // Envia um email ao usuário informando que a conta está bloqueada 
                return false (falso);
            } else {
                // Verifica se a senha confere com o que consta no banco de dados
                // a senha do usuário é enviada.
                if ($db_password == $password) {
                    // A senha está correta!
                    // Obtém o string usuário-agente do usuário. 
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                    // proteção XSS conforme imprimimos este valor
                    $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                    $_SESSION['user_id'] = $user_id;
                    // proteção XSS conforme imprimimos este valor 
                    $username = preg_replace("/[^a-zA-Z0-9_\-]+/", 
                                                                "", 
                                                                $username);
                    $_SESSION['username'] = $username;
                    $_SESSION['login_string'] = hash('sha512',$password . $user_browser);
                    // Login concluído com sucesso.
                    return true;
                } else {
                    // A senha não está correta
                    // Registramos essa tentativa no banco de dados
                    $now = time();
                    $mysqli->query("INSERT INTO login_attempts_secret(user_id, time)
                                    VALUES ('$user_id', '$now')");
                    return false;
                }
            }
        } else {
            // Tal usuário não existe.
            return false;
        }
    }
}

function checkbrute($user_id, $mysqli) {
    // Registra a hora atual 
    $now = time();
 
    // Todas as tentativas de login são contadas dentro do intervalo das últimas 2 horas. 
    $valid_attempts = $now - (2 * 60 * 60);
 
    if ($stmt = $mysqli->prepare("SELECT time 
                             FROM login_attempts_secret <code><pre>
                             WHERE user_id = ? 
                            AND time > '$valid_attempts'")) {
        $stmt->bind_param('i', $user_id);
 
        // Executa a tarefa pré-estabelecida. 
        $stmt->execute();
        $stmt->store_result();
 
        // Se houve mais do que 5 tentativas fracassadas de login 
        if ($stmt->num_rows > 5) {
            return true;
        } else {
            return false;
        }
    }
}

function login_check($mysqli) {
    // Verifica se todas as variáveis das sessões foram definidas 
    if (isset($_SESSION['user_id'], 
                        $_SESSION['username'], 
                        $_SESSION['login_string'])) {
 
        $user_id = $_SESSION['user_id'];
        $login_string = $_SESSION['login_string'];
        $username = $_SESSION['username'];
 
        // Pega a string do usuário.
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
 
        if ($stmt = $mysqli->prepare("SELECT password
                                      FROM sr_usuarios_secret 
                                      WHERE id = ? LIMIT 1")) {
            // Atribui "$user_id" ao parâmetro. 
            $stmt->bind_param('i', $user_id);
            $stmt->execute();   // Execute the prepared query.
            $stmt->store_result();
 
            if ($stmt->num_rows == 1) {
                // Caso o usuário exista, pega variáveis a partir do resultado.                 
				$stmt->bind_result($password);
                $stmt->fetch();
                $login_check = hash('sha512', $password . $user_browser);
 
                if ($login_check == $login_string) {
                    // Logado!!!
                    return true;
                } else {
                    // Não foi logado 
                    return false;
                }
            } else {
                // Não foi logado 
                return false;
            }
        } else {
            // Não foi logado 
            return false;
        }
    } else {
        // Não foi logado 
        return false;
    }
}

function esc_url($url) {
 
    if ('' == $url) {
        return $url;
    }
 
    $url = preg_replace('|[^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]|i', '', $url);
 
    $strip = array('%0d', '%0a', '%0D', '%0A');
    $url = (string) $url;
 
    $count = 1;
    while ($count) {
        $url = str_replace($strip, '', $url, $count);
    }
 
    $url = str_replace(';//', '://', $url);
 
    $url = htmlentities($url);
 
    $url = str_replace('&amp;', '&#038;', $url);
    $url = str_replace("'", '&#039;', $url);
 
    if ($url[0] !== '/') {
        // Estamos interessados somente em links relacionados provenientes de $_SERVER['PHP_SELF']
        return '';
    } else {
        return $url;
    }
}

function carreganome($mysqli) {
	$user_id = htmlentities($_SESSION['user_id']);
    if ($stmt = $mysqli->prepare("SELECT username 
        FROM sr_usuarios_secret
		WHERE id = ?
        LIMIT 1")) {
        $stmt->bind_param('i', $user_id); 
        $stmt->execute();
        $stmt->bind_result($username);
        $stmt->fetch();
		echo $username;
		}
}
//score do botão principal ao lado do USERNAME
function carregascore($mysqli, $evento) {
	$user_id = htmlentities($_SESSION['user_id']);
    if ($stmt = $mysqli->prepare("SELECT score 
        FROM score
		WHERE iduser = ? and evento = ?
        LIMIT 1")) {
        $stmt->bind_param('is', $user_id, $evento);  
        $stmt->execute();
        $stmt->bind_result($score);
        $stmt->fetch();
		echo $score;
		}
}
//chama os botões de cada flag
function carregabotoes($mysqli, $tipo, $evento) {
	$user_id = htmlentities($_SESSION['user_id']);
    if ($stmt = $mysqli->prepare("SELECT idflag, valor 
        FROM flag
		WHERE tipo = ? and evento = ?
        ")) {
        $stmt->bind_param('ss', $tipo, $evento);  
        $stmt->execute();
        $result = $stmt->get_result();
		if ($result->num_rows > 0) {
		while ($row = $result->fetch_array(MYSQLI_NUM))
			{
				if (flagresolvida($row[0]) == true){
				echo '<button type="button" class="btn btn-success" data-toggle="modal" data-target="">'.$row[1].'</button> ';  	
				}else {
				echo '<button type="button" class="btn btn-default" data-toggle="modal" data-target="#'.$tipo.$row[1].'">'.$row[1].'</button> ';  	
				}
			}
		}
	}
}
function carregaflags( $mysqli, $tipo, $evento) {
	$user_id = htmlentities($_SESSION['user_id']);
    if ($stmt = $mysqli->prepare("SELECT idflag, titulo, descricao, titulo, valor 
        FROM flag
		WHERE tipo = ? and evento = ?
        ")) {
        $mysqli->set_charset("utf8");
		$stmt->bind_param('ss', $tipo, $evento);  
		$stmt->execute();
        $result = $stmt->get_result();
		if ($result->num_rows > 0) {
		while ($row = $result->fetch_array(MYSQLI_NUM))
			{
			echo '<div id="'.$tipo.$row[4].'" class="modal fade" tabindex="-1">';
			echo '<div class="modal-dialog">';
			echo '<div class="vertical-alignment-helper">';
            echo '<div class="modal-content">';
			echo '<div class="modal-header">';
			echo '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			echo '<h4 class="modal-title">'.$row[1].'</h4>';
			echo '</div>';
			echo '<div class="modal-body">';
			echo '<div class="row">';
            echo '<form action="" method="POST">';
            echo '<div class="col-md-12">';
			echo '<div class="form-group">';
			echo '<label>'.$row[2].'</label>';
			echo '</div>';
			echo '</div>';
			echo '<div class="col-md-5">';
			echo '<div class="form-group">';								
			echo '<input type="input" class="form-control"  id="flag" name="flag">';
			echo '<input type="hidden" class="form-control"  id="order" name="order" value="'.$row[0].'">';
			echo '</div>';
			echo '</div>';
			echo '</div>';
			echo '</div>';
			echo '<div class="modal-footer">';
			echo '<button type="submit" class="btn btn-info">Enviar</button>';
			echo '</div>';
            echo '</form>';
			echo '</div>';
			echo '</div>';
			echo '</div>';
			echo '</div>';

			}
		}
	}
}

//validação de flag
function validaflag($mysqli,$flagid, $flag,$evento) {
	$flaglimpa = htmlentities($flagid);
	$userid = htmlentities($_SESSION['user_id']);
    if ($stmt = $mysqli->prepare("SELECT resposta, valor 
        FROM flag
		WHERE idflag = ?
        LIMIT 1")) {
        $stmt->bind_param('i', $flaglimpa); 
        $stmt->execute();
        $stmt->bind_result($resposta, $valor);
        $stmt->fetch();
		$stmt->close();
		//insere resolvidas
		if ($resposta == $flag){
		$mysqli->query("INSERT INTO resolvidas (flagid,userid,valor,evento) VALUES ('$flagid','$userid','$valor','$evento')");	
		$total = 0;
		// calcula score
		if ($stmt = $mysqli->prepare("SELECT sum(valor) as valor
        FROM resolvidas
		WHERE userid= ? and evento= ?
        LIMIT 1")) {
        $stmt->bind_param('is', $userid,$evento); 
        $stmt->execute();
        $stmt->bind_result($valor);
        $stmt->fetch();
		$total = $valor;
		$stmt->close();
		//atualiza score
		}
		$dados = "UPDATE score SET score='$total', time=NOW() WHERE iduser='$userid' and evento='$evento'";
		$mysqli->query($dados);
		
				
		return true;
		}
		}
		return false;
		}
		


function inserescore($mysqli,$evento) {
$userid = $_SESSION['user_id'];
$dados = "INSERT INTO score (score,iduser,time,evento) VALUES ('0','$userid',NOW(),'$evento')";
$mysqli->query($dados);	
}

function atualizanome($mysqli,$username) {
$username = htmlentities($username);
$user_id = htmlentities($_SESSION['user_id']);
$dados = "UPDATE sr_usuarios_secret SET username='$username' WHERE id='$user_id'";
if ($mysqli->query($dados)) {
	return true;
}else {
	return false;
}
}

function ranking($mysqli,$evento) {
	$user_id = htmlentities($_SESSION['user_id']);
    if ($stmt = $mysqli->prepare("SELECT score.iduser, score.score, sr_usuarios_secret.username
        FROM `score`, `sr_usuarios_secret`
		WHERE sr_usuarios_secret.Id = score.iduser and score.evento=? ORDER BY score.score DESC, time ASC
        ")) {
        $stmt->bind_param('s', $evento);  // Relaciona  "$email" ao parâmetro.
        $stmt->execute();
        $result = $stmt->get_result();
		if ($result->num_rows > 0) {
		$i = 1;
		while ($row = $result->fetch_array(MYSQLI_NUM))
			{
				echo'<tr>';
				echo'<td><strong><center><h4>'.$i++.'º</h4></strong></center></td>';
				echo'<td><strong><center><h4>'.$row[2].'</h4></strong></center></td>';
				echo'<td><center><button type="button" class="btn btn-blue">'.$row[1].'</button></center></td>';
				echo'</tr>';
			}
		}
	}
}


//unica função zuada ainda!
function flagresolvida($flagid) {
$HOST = "localhost";
$USER = "root";
$PASSWORD = "";
$DATABASE = "sucurihc_ctf";
$conn1 = new mysqli($HOST, $USER, $PASSWORD, $DATABASE);
if ($conn1->connect_error) {
    die("Connection failed: " . $conn1->connect_error);
} 
$userid = $_SESSION['user_id'];
$conn1->set_charset('utf8');
//$sql = "SELECT resolvidas.flagid,resolvidas.userid, flag.idflag, flag.titulo, flag.descricao, flag.valor FROM `resolvidas`, `flag` WHERE flag.tipo = 'web' and resolvidas.userid = ".$userresolve." ";
$sql1 = "SELECT * from resolvidas where flagid=".$flagid." and userid=".$userid."";
$result1 = $conn1->query($sql1);
if ($result1->num_rows > 0) {
	while($row = $result1->fetch_assoc()) {
	 return true;
	}
}
$conn1->close();
}





?>
