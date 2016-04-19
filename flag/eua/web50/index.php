<!DOCTYPE html>


<html>
<head>
	<title>UNITED STATES</title>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		
				
</head>
<body>
	 <div class="main">
		<div class="login-form">
		<h1>Restrict Acess</h1>
					<div class="head">
						<img src="images/user.png" alt=""/>
					</div>
		<form name="login" action="">
		<input type="text" name="pin" class="text" value="PIN" id="pin" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'PIN';}" >
		<div class="submit">
		<input type="submit" onclick="document.getElementById('pin').value = (Math.floor(Math.random() * 999)).toString(16);" value="LOGIN" >
		</div>	
		<p id="forgot"><a href="#">Forgot Password ?</a></p>
		</form>
		<?php
		function generateRandomString($length = 22) {
    		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}';
   		$charactersLength = strlen($characters);
   		$randomString = '';
    		for ($i = 0; $i < $length; $i++) {
        	$randomString .= $characters[rand(0, $charactersLength - 1)];
    		}
    		return $randomString;
		}
		$senha = "2f9";
		if(isset($_GET['pin'])) {
		if ($senha == $_GET['pin']) {      
		echo '<center>SHC{BrutesRandomFalse}</center>';
		} else {
		echo '<center>'.generateRandomString(22).'</center>';
      		}
		}
		?>		
		</div>
		
		</div>
</body>
</html>
