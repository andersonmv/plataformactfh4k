<h1>Alterar Senha</h1>
<?php
  if( empty($_GET['utilizador']) || empty($_GET['confirmacao']) )
    die('<p>Não é possível alterar a password: dados em falta</p>');
 
  mysql_connect('localhost', 'root', '');  // ligar à base de dados
  mysql_select_db('test');  // escolher a base de dados pretendida
 
  $user = mysql_real_escape_string($_GET['utilizador']);
  $hash = mysql_real_escape_string($_GET['confirmacao']);
 
  $q = mysql_query("SELECT COUNT(*) FROM recuperacao WHERE utilizador = '$user' AND confirmacao = '$hash'");
 
  if( mysql_result($q, 0, 0) == "1" ){
    // os dados estão corretos: eliminar o pedido e permitir alterar a password
    mysql_query("DELETE FROM recuperacao WHERE utilizador = '$user' AND confirmacao = '$hash'");
 
    echo 'Sucesso! (Mostrar formulário de alteração de password aqui)';   
 
  } else {
    echo '<p>Não é possível alterar a password: dados incorretos</p>';
 
  }
 
?>
