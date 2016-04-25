<h1>Perdi a Senha</h1>
<?php
  if( !empty($_POST) ){
    // processar o pedido
    mysql_connect('localhost', 'root', '');  // ligar à base de dados
    mysql_select_db('test');  // escolher a base de dados pretendida
 
    $user = mysql_real_escape_string($_POST['email']);
    $q = mysql_query("SELECT * FROM utilizadores WHERE email = '$user'");
 
    if( mysql_num_rows($q) == 1 ){
      // o utilizador existe, vamos gerar um link único e enviá-lo para o e-mail
 
      // gerar a chave
      // exemplo adaptado de http://snipplr.com/view/20236/
      $chave = sha1(uniqid( mt_rand(), true));
 
      // guardar este par de valores na tabela para confirmar mais tarde
      $conf = mysql_query("INSERT INTO recuperacao VALUES ('$user', '$chave')");
	  echo "INSERT INTO recuperacao VALUES ('$user', '$chave')";
 
      if( mysql_affected_rows() == 1 ){
 
        $link = "http://ctf.sucurihc.org/recuperar.php?utilizador=$user&confirmacao=$chave";
 
        if( mail($user, 'Recuperação de password', 'Olá '.$user.', visite este link '.$link) ){
          echo '<p>Foi enviado um e-mail para o seu endereço, onde poderá encontrar um link único para alterar a sua password</p>';
 
        } else {
          echo '<p>Houve um erro ao enviar o email (o servidor suporta a função mail?)</p>';
 
        }
 
		// Apenas para testar o link, no caso do e-mail falhar
		echo '<p>Link: '.$link.' (apresentado apenas para testes; nunca expor a público!)</p>';
 
      } else {
        echo '<p>Não foi possível gerar o endereço único</p>';
 
      }
    } else {
	  echo '<p>Esse utilizador não existe</p>';
	}
  } else {
    // mostrar formulário de recuperação
?>
<form method="post">
  <label for="email">E-mail:</label>
  <input type="text" name="email" id="email" />
  <input type="submit" value="Recuperar" />
</form>
<?php
  }
?>
