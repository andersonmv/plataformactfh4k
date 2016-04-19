<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';
sec_session_start();
inserescore($mysqli,'sucuri');

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Bem-Vindo ao CTF Sucuri HC " />
	<meta name="author" content="" />

	<title>CTF-H4K</title>
  
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="assets/css/flipclock.css">

		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>-->

		<script src="assets/js/flipclock.js"></script>	

	<link rel="stylesheet" href="assets/css/font-icons/entypo/css/entypo.css">
	<!--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic">-->
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
if (isset($_POST['flag'], $_POST['order'])) {
    $id = $_POST['order'];
    $flag = $_POST['flag'];
 
    
	if (validaflag($mysqli, $id, $flag,'sucuri') == true) {
		
    } else {
      echo '<script>alert("Flag inválida!")</script>';
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
					<a href="#">
						<i class="entypo-gauge"></i>
						<span class="title">Flags</span>
					</a>
					</li>
					<li>
					<a href="eventos.php">
						<i class="entypo-layout"></i>
						<span class="title">Eventos</span>
					</a>
					</li>
					<li>
					<a href="profile.php">
						<i class="entypo-user"></i>
						<span class="title">Profile</span>
					</a>
					</li>
					<li>
					<a href="score_sucuri.php">
						<i class="entypo-layout"></i>
						<span class="title">Scoreboard</span>
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
                <br><br>
				<div class="col-md-12">
	            <center><img src="assets/images/1logo.png"></center>			
				<h4>Fl4g5</h4>
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th><center>Total</center></th>
                            <th><center>WEB</center></th>
							<th><center>REV</center></th>
                            <th><center>NET</center></th>
                            <th><center>CRIPTO</center></th>
                            <th><center>XPL</center></th>
                            <th><center>CUSTOM</center></th>
						</tr>
					</thead>
					
					<tbody>
						<tr>
							<td><strong><?php carreganome($mysqli); ?></strong></td>
							<td><center><button type="button" class="btn btn-blue"><?php carregascore($mysqli, "sucuri"); ?></button></center></td>
							<!--botoes web -->
							<td><center>
							<?php
							carregabotoes($mysqli,"web","sucuri"); 	
							?>
							</center></td>
							<!--botoes web -->
                            <td><center>
                            <?php
							carregabotoes($mysqli,"rev","sucuri");
							?>
							</center></td>
                            <td><center>
                            <?php
							carregabotoes($mysqli,"net","sucuri");
							?>
                            </center></td>
                            <td><center>
                             <?php
							carregabotoes($mysqli,"cripto","sucuri");
							?>
                            </center></td>
                             <td><center>
                                <?php
							carregabotoes($mysqli,"xpl","sucuri");
							?>
                            </center></td>
                            <td><center>
                                <?php
							carregabotoes($mysqli,"custom","sucuri");
							?>
                            </center></td>
						</tr>
					</tbody>
				</table>

                </div>
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


<!--web10-->
<?php carregaflags($mysqli,'web','sucuri'); ?>
<?php carregaflags($mysqli,'rev','sucuri'); ?>
<?php carregaflags($mysqli,'net','sucuri'); ?>
<?php carregaflags($mysqli,'cripto','sucuri'); ?>
<?php carregaflags($mysqli,'xpl','sucuri'); ?>
<?php carregaflags($mysqli,'custom','sucuri'); ?>

<!--web10-->



<!--teste-->


	<!-- Imported styles on this page -->
	<link rel="stylesheet" href="assets/js/jvectormap/jquery-jvectormap-1.2.2.css">
	<link rel="stylesheet" href="assets/js/rickshaw/rickshaw.min.css">

	<!-- Bottom scripts (common) -->
	<script src="assets/js/gsap/main-gsap.js"></script>
	<script src="assets/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js"></script>
	<script src="assets/js/bootstrap.js"></script>
	<script src="assets/js/joinable.js"></script>
	<script src="assets/js/resizeable.js"></script>
	<script src="assets/js/neon-api.js"></script>
	<script src="assets/js/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>


	<!-- Imported scripts on this page -->
	<script src="assets/js/jvectormap/jquery-jvectormap-europe-merc-en.js"></script>
	<script src="assets/js/jquery.sparkline.min.js"></script>
	<script src="assets/js/rickshaw/vendor/d3.v3.js"></script>
	<script src="assets/js/rickshaw/rickshaw.min.js"></script>
	<script src="assets/js/raphael-min.js"></script>
	<script src="assets/js/morris.min.js"></script>
	<script src="assets/js/toastr.js"></script>
	<script src="assets/js/neon-chat.js"></script>


	<!-- JavaScripts initializations and stuff -->
	<script src="assets/js/neon-custom.js"></script>


	<!-- Demo Settings -->
	<script src="assets/js/neon-demo.js"></script>
	<?php else : ?>
            <p>
                <span class="error">Você não tem autorização para acessar esta página.</span> Login <a href="../index.php">login</a>.
            </p>
        <?php endif; ?>
	
</body>
</html>
