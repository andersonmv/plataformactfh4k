<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';
 sec_session_start();


?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Bem-Vindo ao CTF Sucuri HC " />
	<meta name="author" content="" />

	<title>CTF-H4K Profile</title>
  
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="assets/css/flipclock.css">


	<link rel="stylesheet" href="assets/css/font-icons/entypo/css/entypo.css">
	<link rel="stylesheet" href="assets/css/bootstrap.css">
	<link rel="stylesheet" href="assets/css/neon-core.css">
	<link rel="stylesheet" href="assets/css/neon-theme.css">
	<link rel="stylesheet" href="assets/css/neon-forms.css">
	<link rel="stylesheet" href="assets/css/custom.css">

	<script src="assets/js/jquery-1.11.0.min.js"></script>
	<script>$.noConflict();</script>
    
	<!--[if lt IE 9]><script src="assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->


</head>
<?php
if (isset($_POST['username'])) {
    $username = $_POST['username']; 
    
	if (atualizanome($mysqli, $username) == true) {
	  echo '<script>alert("Username Alterado com sucesso!")</script>';
    } else {
      echo '<script>alert("Não foi possivel alterar para esse username!")</script>';
    }
	
}
?>

<body class="page-body">
<?php if (login_check($mysqli) == true) : ?>
<div class="page-container horizontal-menu">

	
	<header class="navbar navbar-fixed-top">
		
		<div class="navbar-inner">
			
			<!-- main menu -->
						
			<ul class="navbar-nav">
				<li class="opened active">
					<a href="eventos.php">
						<i class="entypo-gauge"></i>
						<span class="title">Eventos</span>
					</a>
				</li>
				<li class="opened active">
					<a href="#">
						<i class="entypo-user"></i>
						<span class="title">Profile</span>
					</a>
				</li>
			</ul>
						
			
			<!-- notifications and other links -->
			<ul class="nav navbar-right pull-right">
				<li class="dropdown">
					<a href="/includes/logout.php">
						Log Out <i class="entypo-logout right"></i>
					</a>
				</li>	
			</ul>
		</div>
	</header>
    
	<div class="main-content">

		<div class="container">
			<div class="row">
                
				<form role="form" method="post" class="form-horizontal form-groups-bordered validate" action="">
		
			<div class="row">
				<div class="col-md-12">
					
					<div class="panel panel-primary" data-collapsed="0">
					
						<div class="panel-heading">
							<div class="panel-title">
								Configurações Gerais
							</div>
							
						</div>
						
						<div class="panel-body">
				
							<div class="form-group">
								<label for="field-1" class="col-sm-3 control-label">Username:</label>
								
								<div class="col-sm-5">
									<input type="text" class="form-control" name="username" value="<?php carreganome($mysqli); ?>" autofocus>
								</div>
							</div>
			
							<div class="form-group">
								<label for="field-2" class="col-sm-3 control-label">Time:</label>
								
								<div class="col-sm-5">
									<input type="text" class="form-control" id="time" value="NameTime">
									<span class="description">Em Breve será liberado cadastro de time!</span>
								</div>
							</div>
			
						</div>
					
					</div>
				
				</div>
			</div>
												
			<div class="form-group default-padding">
				<button type="submit" class="btn btn-success">Salvar Alterações</button>
			</div>
						
		</form>
				
				
				
				
              </div>
				
       <br><br>
	   <br><br>
	   <br><br>
	   <br><br>
	   
<!-- Footer -->
<footer class="main">
	
	&copy; 2016 <strong>CTF-H4k</strong>

</footer>

</div>
</div>
</div>
</div>

<script src="assets/js/toastr.js"></script>
	<?php else : ?>
            <p>
                <span class="error">Você não tem autorização para acessar esta página.</span> Login <a href="../index.php">login</a>.
            </p>
        <?php endif; ?>
	
</body>
</html>
