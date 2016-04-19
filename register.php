<?php
include_once 'includes/register.inc.php';
include_once 'includes/functions.php';
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Bem-Vindo ao CTF Sucuri HC " />
	<meta name="author" content="" />

	<title>REGISTER - CTF-H4K</title>

	<link rel="stylesheet" href="assets/js/jquery-ui/css/no-theme/jquery-ui-1.10.3.custom.min.css">
	<link rel="stylesheet" href="assets/css/font-icons/entypo/css/entypo.css">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic">
	<link rel="stylesheet" href="assets/css/bootstrap.css">
	<link rel="stylesheet" href="assets/css/neon-core.css">
	<link rel="stylesheet" href="assets/css/neon-theme.css">
	<link rel="stylesheet" href="assets/css/neon-forms.css">
	<link rel="stylesheet" href="assets/css/skins/black.css">
	<link rel="stylesheet" href="assets/css/custom.css">

	<script src="assets/js/jquery-1.11.0.min.js"></script>
	<script type="text/JavaScript" src="assets/js/sha512.js"></script> 
	<script type="text/JavaScript" src="assets/js/forms.js"></script> 
	<script>$.noConflict();</script>

	<!--[if lt IE 9]><script src="assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->


</head>
<body class="page-body login-page login-form-fall">
	
<div class="login-form">
				
			<center><h3>C4D457R4R</h3></center>
			<?php
			if (!empty($error_msg)) {
            echo $error_msg;
			}
			?>
			<div class="login-content">
	
			<form action="<?php echo esc_url($_SERVER['PHP_SELF']); ?>" method="post"  name="registration_form">
				
				<div class="form-group">
					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-user"></i>
						</div>
						<input type="text" class="form-control" name="username" id="username" placeholder="Nome|Apelido" autocomplete="off" />
					</div>
				</div>
				
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-key"></i>
						</div>
							<input type="password" class="form-control" name="password" id="password" placeholder="Password" autocomplete="off" />
					</div>
				</div>
                
                <div class="form-group">
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-key"></i>
						</div>
							<input type="password" class="form-control"  name="confirmpwd" id="confirmpwd"  placeholder="Password" autocomplete="off" />
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-addon">
							<i class="entypo-key"></i>
						</div>
							<input type="text" class="form-control" name="email" id="email" placeholder="Email" autocomplete="off" />
					</div>
				</div>			
				
				<div class="form-group">
					<button type="button" value="Register" onclick="return regformhash(this.form,this.form.username,this.form.email,this.form.password,this.form.confirmpwd);" class="btn btn-primary btn-block btn-login">
						<i class="entypo-login"></i>
						Cadastrar
					</button>
				
				</div>
				
			
		</div>
		
	</div>
	
</div>


	<!-- Bottom scripts (common) -->
	<script src="assets/js/gsap/main-gsap.js"></script>
	<script src="assets/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js"></script>
	<script src="assets/js/bootstrap.js"></script>
	<script src="assets/js/joinable.js"></script>
	<script src="assets/js/resizeable.js"></script>
	<script src="assets/js/neon-api.js"></script>
	<script src="assets/js/jquery.validate.min.js"></script>
	<script src="assets/js/neon-login.js"></script>


	<!-- JavaScripts initializations and stuff -->
	<script src="assets/js/neon-custom.js"></script>


	<!-- Demo Settings -->
	<script src="assets/js/neon-demo.js"></script>

</body>
</html>
