/*$Id: camadas.js 24904 2014-01-30 20:23:44Z larissap $*/
//----------------------------------------------[ Abrir ou Criar Camada (layer) informativo "Carregando - Aguarde" ]-->

visualizar_camada = 1;
carregando_ps = new Array(-6,-5,-4,-3,-2,-1,0,1);
carregando_mv = new Array(1,1,1,1,1,1,1,1);
camada_debug = false;

function carregando_abrir() {
	var j = document.getElementById('frmcarrega');
	if (j == null) {
		document.body.insertAdjacentHTML('beforeEnd','<div id="wwait" style="position:absolute; left:185px; top:128px; width:310px; height:120px; visibility: visible; z-index:999999"><iframe id="frmcarrega" frameborder="0" src="about:blank" style="height:100%;width:100%"></iframe></div>');
		j = document.getElementById('frmcarrega');
		j.contentWindow.document.write('<html><head><title>SIGO</title>'+
			'<link href="../layout/css/sigo.css" rel="stylesheet" type="text/css">'+
			'<style type="text/css">.style2 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}'+
			'body {margin-left: 0px;margin-top: 0px;margin-right: 0px;margin-bottom: 0px}</style></head>'+
			'<body><table height="100%" width="100%" bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0">'+
			'<tr><td><div id="subframe" style="border: 1px outset #FFFFFF ; width:299px; height:79px">'+
			'<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="f9f9f9">'+
			'<tr height="30"><td height="40" colspan="30" align="center" class="style2">Processando requisição - Aguarde!</td></tr>'+
			'<tr height="5"><td width="10" height="10" id="wwcl_1"></td><td width="10" id="wwcl_2"></td><td width="10" id="wwcl_3"></td>'+
				'<td width="10" id="wwcl_4"></td><td width="10" id="wwcl_5"></td><td width="10" id="wwcl_6"></td><td width="10" id="wwcl_7"></td><td width="10" id="wwcl_8"></td><td width="10" id="wwcl_9"></td><td width="10" id="wwcl_10"></td><td width="10" id="wwcl_11"></td><td width="10" id="wwcl_12"></td><td width="10" id="wwcl_13"></td><td width="10" id="wwcl_14"></td><td width="10" id="wwcl_15"></td><td width="10" id="wwcl_16"></td><td width="10" id="wwcl_17"></td><td width="10" id="wwcl_18"></td><td width="10" id="wwcl_19"></td><td width="10" id="wwcl_20"></td><td width="10" id="wwcl_21"></td><td width="10" id="wwcl_22"></td><td width="10" id="wwcl_23"></td><td width="10" id="wwcl_24"></td><td width="10" id="wwcl_25"></td><td width="10" id="wwcl_26"></td><td width="10" id="wwcl_27"></td><td width="10" id="wwcl_28"></td><td width="10" id="wwcl_29"></td><td width="10" id="wwcl_30"></td></tr><tr height="5"><td height="50" colspan="30" align="center" valign="middle" id="wwcl_1"><span style="padding:4 4 4 4"><input name="Button4" type="button" class="BT" value=" Ocultar" onClick="parent.carregando_fechar()"></span></td></tr></table></div></td></td></table></body></html>');
		animar_carregando();
	} else {
		var ww = document.getElementById('wwait');
		ww.style.visibility = "visible";
		setTimeout('animar_carregando()',50);
	}
}

//----------------------------------------------[ Esconder Camada (layer) informativo "Carregando - Aguarde" ]-->


function carregando_fechar() {
	var ww = document.getElementById('wwait');
	ww.style.visibility = "hidden";
}


//----------------------------------------------[ Executa a Animação da  Camada (layer) informativo "Carregando - Aguarde" ]-->

function animar_carregando() {
	var j=document.getElementById('frmcarrega');
	var ww=document.getElementById('wwait');
	var cr=new Array("#FFFFFF","#F6F6F6","#F0F0F0","#D1D1D1","#AAAAAA","#808080","#535353","#1D1D1D","#010101");
	if (ww.style.visibility=='hidden') {
		return;
	}
	for (x=7;x>=0;x--) {
	  p=carregando_ps[x];
		if (p>0) {
			if (j.contentWindow.document.getElementById('wwcl_'+p)) {
				j.contentWindow.document.getElementById('wwcl_'+p).style.backgroundColor=cr[x];
			}
		}
	  	if (p==30) {
  			carregando_mv[x]=-1;
	  	} else if (p==1) {
	  		carregando_mv[x]=1;
	  	}
	  carregando_ps[x]=carregando_ps[x]+carregando_mv[x];
	}
	setTimeout('animar_carregando()',50);
 }

function abrir_camadaPopUp() {

	var endereco	= arguments[0];
	var altura		= arguments[1];
	var largura		= arguments[2];
	var nm_camada	= 'camadaPopUp';
	var div_camada	= 'generico';
	var c			= '';

	if (arguments.length >= 4) {
		nm_camada = arguments[3];
		div_camada = arguments[3] + '_div';
		if (endereco.indexOf('?') == -1) {
			endereco = endereco + '?camada=' + div_camada;
		} else {
			endereco = endereco + '&camada=' + div_camada;
		}
	}

	var cam = document.getElementById(nm_camada);
	var div = document.getElementById(div_camada);
	var d = new Date;
	var hd = String(d.getMonth())+String(d.getDate())+String(d.getHours())+String(d.getMinutes())+String(d.getSeconds())+String(d.getMilliseconds());
	if (cam == null) {
		mt = altura/2;
		ml = largura/2;
		if (nm_camada == 'camada_generico_leis') {
			mt = 75;
		}else if(nm_camada == 'camadaPopUp' || nm_camada == 'div_bloco99' || nm_camada == 'div_formulario99' || nm_camada == 'div_excecao99' || 
			nm_camada == 'div_acumulador99' || nm_camada == 'div_busca_coluna'){
			mt = 65;
		}
		//document.body.insertAdjacentHTML('beforeEnd','<div id="'+div_camada+'" style="position:absolute;top:0px;left:0px;width=100%;height=100%;z-index:99;"> <iframe frameborder="0" style="height:100%;width:100%;filter:Alpha(Opacity=70);Opacity:.7" src="about:blank"></iframe> <iframe id="'+nm_camada+'" style="border:#CCCCCC 4px solid;position:absolute;margin-top:-'+mt+'px;margin-left:-'+ml+'px;top:50%;left:400px;height:'+altura+'px;width:'+largura+'px" src="'+endereco+'&__dthr='+hd+'"></iframe></div>');
		document.body.innerHTML = '<div id="' + div_camada + '" style="position:absolute;top:0px;left:0px;width=100%;z-index:99;"> <iframe frameborder="0" style="height:100%;width:100%;filter:Alpha(Opacity=70);Opacity:.7" src="about:blank"></iframe> <iframe id="' + nm_camada + '" style="background-color: #FFFFFF;border:#CCCCCC 4px solid;position:absolute;margin-top:-' + mt + 'px;margin-left:-' + ml + 'px;top:50%;left:400px;height:' + altura + 'px;width:' + largura + 'px" src=""></iframe></div>' + document.body.innerHTML;
		if (document.getElementById(nm_camada).offsetWidth > document.body.offsetWidth) {
			document.getElementById(nm_camada).style.width = document.body.offsetWidth + 'px';
			document.getElementById(nm_camada).style.left = '50%';
			document.getElementById(nm_camada).style.marginLeft = "-" + (document.body.offsetWidth/2) + 'px';
		}
		if (document.getElementById(nm_camada).offsetHeight > document.body.offsetHeight) {
			document.getElementById(nm_camada).style.height = document.body.offsetHeight + 'px';
			document.getElementById(nm_camada).style.marginTop = "-" + (document.body.offsetHeight/2) + 'px';
		}
		document.getElementById(nm_camada).focus();
		if (arguments.length < 4) {
			abrir_camadaPopUp(endereco,altura,largura)

		} else {
			abrir_camadaPopUp(endereco,altura,largura, nm_camada)
		}

	} else {
		cam.contentWindow.document.write('<div style="position:absolute;top:50%;left:45%;margin-left:-30px;margin-top:-20px;"><img src="img/carregando/carrega1.gif" style="vertical-align:middle;"></div>');
		cam.src = endereco + '&w_largura=' + largura + '&h_altura=' + altura + '&__dthr=' + hd;
		if (div==null)alert("camada não encontrada! "+div_camada);
		else div.style.visibility = "visible";
	}
}




function fechar_camadaPopUp() {
	var div=document.getElementById('div_camadaPopUp');
	//if (div!=null)div.style.visibility="hidden";
	div.removeNode(true);
}


function abrirCamadaTreeView(execute,url,camada) {
	var j=document.getElementById(camada),l;
	if (j==null) {
		altura  = 500;
		largura = 550;
		mt = altura/2
		ml = largura/2;
 		document.body.insertAdjacentHTML('afterBegin','<div id="'+camada+'" style="border:#CCCCCC 4px solid;position:absolute;margin-top:-'+mt+'px;margin-left:-'+ml+'px;top:50%;left:400px;height:'+altura+'px;width:'+largura+'px"></div>');
		if (document.getElementById(camada).offsetWidth > document.body.offsetWidth) {
			document.getElementById(camada).style.width = document.body.offsetWidth + 'px';
			document.getElementById(camada).style.left = '50%';
			document.getElementById(camada).style.marginLeft = "-" + (document.body.offsetWidth/2) + 'px';
		}
		if (document.getElementById(camada).offsetHeight > document.body.offsetHeight) {
			document.getElementById(camada).style.height = document.body.offsetHeight + 'px';
			document.getElementById(camada).style.marginTop = "-" + (document.body.offsetHeight/2) + 'px';
		}

	 	j = document.getElementById(camada);
 		j.focus();
		l = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="550" height="500" id="treeview" align="middle"><param name="flashVars" value="xmlGen='+url+'&execute='+execute+'" /><param name="allowScriptAccess" value="sameDomain" /><param name="movie"  value="../treeview.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed src="../treeview.swf" quality="high" bgcolor="#ffffff" width="550" height="500" name="treeview" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	 	j.innerHTML = l;
	} else {
	 	j.style.visibility = "visible";
	 		j.focus();
	}
}


function openAjax() {
	/*
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		var activeXObjects = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
		for (var i=0; i<activeXObjects.length; i++) {
			try{
				return new ActiveXObject(activeXObjects[i]);
			}catch(err) {}
		}
	}
	var req;
	try {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	catch(e) {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(ex) {
			try {
				req = new XMLHttpRequest();
			}
			catch(exc) {
				alert("Esse browser não tem recursos para uso do Ajax");
				req = null;
			}
		}
	}
	return req;
	*/

	var Ajax;
	try {
		Ajax = new XMLHttpRequest(); // XMLHttpRequest para browsers mais populares, como: Firefox, Safari, dentre outros.
	}
	catch(ee) {
		try {
			Ajax = new ActiveXObject("Msxml2.XMLHTTP"); // Para o IE da MS
		}
		catch(e) {
			try {
				Ajax = new ActiveXObject("Microsoft.XMLHTTP"); // Para o IE da MS
			}
			catch(e) {
				Ajax = false;
			}
		}
	}
	return Ajax;
}

var req,req1,req2,dest,dest1,dest2;

function atualiza_camada(url,destino) {
	var imagem = '<div style="position:absolute;top:50%;left:45%;margin-left:-30px;margin-top:-20px;"><img src="';
	if (typeof url_home != "undefined" && url_home != '') {
		imagem = imagem + url_home;
	}
	imagem = imagem +'img/carregando/carrega1.gif" style="vertical-align:middle;"></div>';
	req = null;
	dest = destino
	document.getElementById(destino).innerHTML = imagem;
	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send(null);
	// Procura por uma versão ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = processReqChange;
			req.open("GET", url, true);
			req.send();
		}
	}
}



function processReqChange() {
var comeco,fim,temp,resultado;

	// apenas quando o estado for "completado"
	if (req.readyState == 4) {
		// apenas se o servidor retornar "OK"
		if (req.status == 200) {
			resultado=req.responseText;
			/*resultado=resultado.replace(/\+/g," ");
            resultado=unescape(resultado);	*/

			//resultado = unescape(resultado); // Resolve o problema dos acentos
			if (dest != '') {
				document.getElementById(dest).innerHTML = resultado;
				if (!visualizar_camada) {
					document.getElementById(dest).style.visibility = 'visible';
				}
			}

			comeco = resultado.indexOf("<!--Alerta");
			fim = resultado.lastIndexOf("Alerta-->");
			if (comeco != fim) {
				alert(resultado.substring(comeco+10,fim));
			}

            comeco = resultado.indexOf("<!--Funcao");
 			fim = resultado.lastIndexOf("Funcao-->");
			if (comeco != fim) {
				eval(resultado.substring(comeco+10,fim));
			}
		} else {
			alert("Não foi possivel efetuar uma conexão!\n Tente Novamente!");
		}
	}

}


/**
 * redirecionada para "atualiza_camada_post" em 07/05/2007
 * @deprecated  usar "atualiza_camada_post"
 * @since 07/05/2007
 */
function atualiza_camada_post_b(url,lt,destino) {
	atualiza_camada_post(url,lt,destino);
}


/*
argumento 1 (obrigatorio) --- parametros
argumento 2 (opcional) ------ path para pecas
*/
function rpt_preview() {

	var parametros	= arguments[0];
	var path = 'pecas';
	if (arguments.length >= 2) {
		path=arguments[1]
	}
	var j=document.getElementById('frmPreview');
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divPreview" style="position:absolute; left:0px; top:0px; width:100%;height:100%; visibility: visible; z-index:999999"><iframe id="frmPreview"  src="about:blank" style="height:100%;width:100%" frameBorder="0"></iframe></div>');
		j=document.getElementById('frmPreview');
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src=path+'/visualizar.camada.asp?'+parametros;
		document.body.scroll='no';
		//$(document).scrollTop(0);
		document.body.style.overflow='hidden';
	} else {
		var ww=document.getElementById('frmPreview');
		ww.style.visibility = "visible";
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src=path+'/visualizar.asp?'+parametros;
		//document.body.scroll='no';
		$(document).scrollTop(0);
		document.body.style.overflow='hidden';
	}
}

function rpt_previewCBM() {

	var parametros	= arguments[0];
	var path = '../pecas';
	if (arguments.length >= 2) {
		path=arguments[1]
	}
	var j=document.getElementById('frmPreview');
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divPreview" style="position:absolute; left:0px; top:0px; width:100%;height:100%; visibility: visible; z-index:999999"><iframe id="frmPreview"  src="about:blank" style="height:100%;width:100%" frameBorder="0"></iframe></div>');
		j=document.getElementById('frmPreview');
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src=path+'/visualizar.camada.asp?'+parametros;
		document.body.scroll='no';
		//$(document).scrollTop(0);
		document.body.style.overflow='hidden';
	} else {
		var ww=document.getElementById('frmPreview');
		ww.style.visibility = "visible";
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src=path+'/visualizar.asp?'+parametros;
		//document.body.scroll='no';
		$(document).scrollTop(0);
		document.body.style.overflow='hidden';
	}
}

function rpt_preview_exportar() {
	var parametros	= arguments[0];
	var path = 'pecas';
	if (arguments.length >= 2) {
		path = arguments[1]
	}
	var j = document.getElementById('frmPreview');
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divPreview" style="position:absolute; left:0px; top:0px; width:100%; height:100%; visibility: visible; z-index:999999"><iframe id="frmPreview"  src="about:blank" style="height:100%;width:100%" frameBorder="0"></iframe></div>');
		j = document.getElementById('frmPreview');
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = path+'/visualizar.camada.exportar.asp?'+parametros;
		document.body.scroll = 'no';
	} else {
		var ww = document.getElementById('frmPreview');
		ww.style.visibility = "visible";
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = path+'/visualizar.php?'+parametros;
		document.body.scroll = 'no';
	}
}

function rpt_previewCiptran(parametros) {
	var j = document.getElementById('frmPreview');
	if (j == null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divPreview" style="position:absolute; left:0px; top:0px; width:100%; height:100%; visibility: visible; z-index:999999"><iframe id="frmPreview"  src="about:blank" style="height:100%;width:100%" frameBorder="0"></iframe></div>');
		j = document.getElementById('frmPreview');
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = 'pecas/visualizarciptran.camada.asp?'+parametros;
		document.body.scroll = 'no';
	} else {
		var ww = document.getElementById('frmPreview');
		ww.style.visibility = "visible";
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = 'pecas/visualizarciptran.camada.asp?'+parametros;
		document.body.scroll = 'no';
	}
}

function rpt_previewJt(parametros) {
	var j = document.getElementById('frmPreview');
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divPreview" style="position:absolute; left:0px; top:0px; width:100%; height:100%; visibility: visible; z-index:999999"><iframe id="frmPreview"  src="about:blank" style="height:100%;width:100%" frameBorder="0"></iframe></div>');
		j = document.getElementById('frmPreview');
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = 'pecas/visualizarjt.camada.asp?'+parametros;
		document.body.scroll = 'no';
	} else {
		var ww = document.getElementById('frmPreview');
		ww.style.visibility = "visible";
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = 'pecas/visualizarjt.camada.asp?'+parametros;
		document.body.scroll = 'no';
	}
}



function rpt_preview_imprensa(parametros) {
	var j = document.getElementById('frmPreview');
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divPreview" style="position:absolute; left:0px; top:0px; width:100%; height:100%; visibility: visible; z-index:999999"><iframe id="frmPreview"  src="about:blank" style="height:100%;width:100%" frameBorder="0"></iframe></div>');
		j = document.getElementById('frmPreview');
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = 'pecas/visualizar.php?'+parametros;
		document.body.scroll = 'no';
	} else {
		var ww = document.getElementById('frmPreview');
		ww.style.visibility = "visible";
		j.focus();
		j.contentWindow.document.write('Carregando Relat\u00F3rio...');
		j.src = 'pecas/visualizar.php?'+parametros;
		document.body.scroll = 'no';
	}
}

function atualiza_dados(url) {
	var j = document.getElementById('frmAtualizaDados');
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="divAtualizaDados" style="position:absolute; left:100px; top:100px; width:400px; height:60px; visibility: visible; z-index:999999"><iframe id="frmAtualizaDados" frameborder="0" src="about:blank" style="height:100%;width:100%"></iframe></div>');
		j = document.getElementById('frmAtualizaDados');
		j.contentWindow.document.write('<html><head></head><body>Aguarde - Atualizando Dados  ...</body></html>');
	} else {
		var ww = document.getElementById('divAtualizaDados');
		ww.style.visibility = "visible";
	}

	req = openAjax();
	req.onreadystatechange = processReqChange_fechar;
	req.open("GET", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}

function processReqChange_fechar() {
	// apenas quando o estado for "completado"
	if (req.readyState == 4) {
		// apenas se o servidor retornar "OK"
		if (req.status == 200) {
			// procura pela div id="news" e insere o conteudo
			// retornado nela, como texto HTML

			comeco = req.responseText.indexOf("<!--Alerta");
			fim    = req.responseText.lastIndexOf("Alerta-->");
			if (comeco != fim) {
				alert(req.responseText.substring(comeco+10,fim));
			}

			comeco = req.responseText.indexOf("<!--Funcao");
			fim    = req.responseText.lastIndexOf("Funcao-->");
			if (comeco != fim) {
				eval(req.responseText.substring(comeco+10,fim));
			}

           document.getElementById('divAtualizaDados').style.visibility='hidden';
		} else {
	      alert("Não foi possivel efetuar uma conexão!\n Tente Novamente!");
	    }
	}
}



divFechar='';

function processar_ajax() {
	var url	= arguments[0];
	var lt	= arguments[1];
	var div;
	var mt,ml;
	if (arguments.length >= 3) {
		div = arguments[2];
	}
	mt        = 95;
	sml       = 32;
	divFechar = div;
	var j = document.getElementById(div);
	if (j==null) {
		document.body.insertAdjacentHTML('afterBegin','<div id="'+div+'" style="position:absolute;margin-top:-'+mt+'px;margin-left:-'+ml+'px;top:1px;left:1px;height:200px;width:400px;z-index:9999999"><iframe id="frmAtualizaDados" frameborder="0" style="height:100%;width:100%" src="carregando.html"></iframe></div>');
	} else {
		var ww = document.getElementById(div);
		ww.style.visibility = "visible";
	}

	req = null;
	req = openAjax();
	req.onreadystatechange = processReqChange_p;
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-Length",lt.length);
	req.send(lt);
}


function processReqChange_p() {
	// apenas quando o estado for "completado"
	if (req.readyState == 4) {
		// apenas se o servidor retornar "OK"
      document.getElementById(divFechar).style.visibility='hidden';
		if (req.status == 200) {
			// procura pela div id="news" e insere o conteudo
			// retornado nela, como texto HTML
			//alert(req.responseText);
			comeco = req.responseText.indexOf("<!--Alerta");
			fim = req.responseText.lastIndexOf("Alerta-->");
			if (comeco != fim) {
				alert(req.responseText.substring(comeco+10,fim));
			}
         	comeco = req.responseText.indexOf("<!--Funcao");
 			fim = req.responseText.lastIndexOf("Funcao-->");
			if (comeco != fim) {
				eval(req.responseText.substring(comeco+10,fim));
			}
		} else {
      		alert("Não foi possivel efetuar uma conexão!\n Tente Novamente!");
		}
	}

}

function busca_ajax() {
	var url	= arguments[0];
	var lt	= arguments[1];
	this.div = '';

	if (arguments.length >= 3) {
		this.div = arguments[2];
		objid(this.div).style.visibility='visible';
	} else {
    	carregando_abrir();
	}
	req1 = null;

	if (camada_debug==true) {
		if (confirm('mostrar chamada?') ) {
			alert(url+'?'+lt);
			return false;
		}
	}


	req1 = openAjax();
	req1.onreadystatechange = function() {
		var comeco,fim,temp,resultado;
		if (req1.readyState == 4) {
			if (req1.status == 200) {
				//alert(req1.responseText);
				if (camada_debug==true) {
					if (confirm('mostrar resultado?')) {
						prompt("resultado",req1.responseText);
					}
				}

				processar_resultado_busca(req1.responseText,this.div);
			} else if (req1.status == 408 || req1.status == 504) {
				alert("AJAX Time out");
				alert(req1.responseText);
				if (alltrim(this.div)=='')carregando_fechar();
				else {
					objid(this.div).style.visibility='hidden';
				}
			} else {
				alert("Não foi possivel efetuar uma conexão!\n Tente Novamente!");
				alert(req1.responseText);
				alert(req1.status);
				if (alltrim(this.div)=='')carregando_fechar();
				else {
					objid(this.div).style.visibility='hidden';
				}
			}
		}
	}


	req1.open("POST", url, true);
	req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req1.send(lt);
}



function processar_resultado_busca(txt,div) {
  	linhas = txt.split('\n\r');
	// linha 1      = qtde de resultados
	// linha 2      = se linha 1 == 0 entao contem a mensagem
	//                caso contrario pode ter uma funcao a chamar
	// linha3       = contêm o form para submit
	// linha4       = contêm a funcao para validar o submit
	// linha 5,6... = campo => conteudo  // atualiza o campo do formulário
	//                focus => campo     //foca o campo específico
	q   = linhas[0];
	f   = linhas[1];   //execute ou nenhum
	frm = linhas[2]; //form
	fun = linhas[3]; //funcao
	if (q=='0' && alltrim(f)=='') {
		alert('Registro não encontrado!');
	}
	initxt=0;
	cptxt='';
	cttxt='';
	for (x=4;x<linhas.length-1;x++) {
		l = linhas[x];
		m = l.split('=>');
		if (m[0]=='</TXT>') {
			if (document.getElementById(cptxt)) {
				if (String(document.getElementById(cptxt).type)!="undefined") {
				   document.getElementById(cptxt).value=cttxt;
				} else {
				   document.getElementById(cptxt).innerHTML=cttxt;
				}
			}
		} else if (m[1]=='<TXT>') {
			initxt = 1;
			cptxt  = m[0];
			cttxt  = '';
		} else if (initxt==1) {
			cttxt = cttxt+l+'\n\r';
		} else {
			   if (m[0]=='focus') {
					document.getElementById(m[1]).focus();
				} else {
					var nm=m[0],vl=m[1],qq,xx,v;
					if (nm.indexOf('[]')>-1) { // suporte a array de checkbox
						var objs=document.getElementsByName(m[0]);
						if (objs[0].type=='checkbox' || objs[0].type=='radio') {
							 qq=objs.length;
							 v=','+vl+',';
							 for (xx=0;xx<qq;xx++) {
								 objs[xx].checked=(v.indexOf(','+objs[xx].value+',')>-1);
							 }
						}
					} else {
						if (document.getElementById(m[0])) {
							if (String(document.getElementById(m[0]).type)!="undefined") {
								if (document.getElementById(m[0]).type=='checkbox' || document.getElementById(m[0]).type=='radio') {
									if (document.getElementById(m[0]).value==m[1]) {
										document.getElementById(m[0]).checked=true;
									} else {
										document.getElementById(m[0]).checked=false;
									}
								} else {
									document.getElementById(m[0]).value=m[1];
								}
							} else {
								document.getElementById(m[0]).innerHTML=m[1];
							}
						}
					}
			  }
		}
	}

	if (alltrim(f)!=='') {
		if (f.indexOf('(')==-1) {
			eval(f+'()')
		} else {
			eval(f);
		}
	}
  	if (q>=1) {
		if (alltrim(frm)=='') {
			if (div=='' || document.getElementById(div)==null) {
				carregando_fechar();
			} else {
				objid(div).style.visibility='hidden';
			}
		}
		if (alltrim(frm)!=='' && alltrim(fun)!=='') {
			var s="if ("+fun+"()==true)document.getElementById('"+frm+"').submit();";
			eval(s);
		}

	 	if (alltrim(frm)!=='' && alltrim(fun)=='') {
			document.getElementById(frm).submit();
		}
	} else {
		if (div=='' || document.getElementById(div)==null) {
			carregando_fechar();
		} else {
			objid(div).style.visibility='hidden';
		}
	}
}


dropIndex_ajax_obj='';

function drop_ajax() {
	var url = arguments[0];
	var lt  = arguments[1];
	var drp = arguments[2];
	var ind,objs,obj,op,vt;
	if (arguments.length>3) {
		ind = arguments[3];
		vt  = document.getElementsByName(drp);
		obj =vt[ind];
	} else {
		obj = objid(drp);
	}
	op = document.createElement("option");
	while (obj.length>0) {obj.remove(0);}
	op.text   = 'Carregando...';
	op.value  = '';
	obj.options.add(op);
	obj.value ='';
	dropIndex_ajax_obj=obj;

	req = null;
	req = openAjax();
	req.onreadystatechange = processReqDropIndex;
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(lt);
}


function processReqDropIndex() {
var comeco,fim,temp,resultado,op,txt,objs;

	// apenas quando o estado for "completado"
	if (req.readyState == 4) {
		// apenas se o servidor retornar "OK"
		if (req.status == 200) {
			txt    = req.responseText;
			linhas = txt.split('\n\r');
			var execute='';
			for (x=0;x<linhas.length-1;x++) {
				l = linhas[x];
				m = l.split('=>');
				if (m[0]=='_execute') {
					execute=m[1];
				} else {
					op       = document.createElement("option");
					op.text  = m[1];
					op.value = m[0];
					dropIndex_ajax_obj.options.add(op);
				}
			}
			dropIndex_ajax_obj.options[0].text  = 'SELECIONE';
			dropIndex_ajax_obj.options[0].value = '';
			if (execute!='') {
				eval(execute+'()');
			}
		} else {
      		alert("Não foi possivel efetuar uma conexão!\n Tente Novamente!");
		}

	}

}

/*
 uso:  camada ou td envolto em camada
       na td ou camada de título da "janela" use:
<div id="layer1">
   <div>onmousedown="drag_iniciar(this,event);">titulo da janela</div>
</div>


*/


drag_x = 0;
drag_y = 0;
drag_status = 0
drag_objeto = '';
drag_camada = '';
drag_f_finalizar = new Function('drag_finalizar();');
drag_f_mover     = new Function('drag_mover(event);');
drag_f_drag      = new Function('return false;');
drag_f_true      = new Function('return true;');
function drag_iniciar(o,ev) {
	if (typeof(o.onmouseup) == 'function') {
		return false;
	}
	if (ev.button==1 || ev.button==0) {
		drag_objeto = o;
		while (o.offsetParent.tagName!='DIV') {
			o = o.offsetParent
		}
		drag_camada = o.offsetParent;
		document.onmousemove = drag_f_mover;
		document.onmouseup   = drag_f_finalizar;

		drag_x = ev.clientX;
		drag_y = ev.clientY;
		drag_status = 1;
		drag_objeto.style.cursor = 'move';
	}
}

function drag_finalizar() {
	drag_status = 0;
	drag_objeto.style.cursor = 'pointer';
	document.onmousemove = document.onmouseup = null;
}

function drag_mover(event) {
	var dx;
	var dy;
	if (event) {
		dx = event.clientX-drag_x;
		dy = event.clientY-drag_y;
		drag_x = event.clientX;
		drag_y = event.clientY;
	} else {
		dx = 0;
		dy = 0;
	}
	drag_camada.style.left = getAbsoluteLeft(drag_camada.id)+(dx);
	drag_camada.style.top  = getAbsoluteTop(drag_camada.id)+(dy);
	if (drag_status==1) {
		window.setTimeout('drag_mover()', 0x33);
	}
}


/**
 * @since 07/05/2007
 * @param String url
 * @param String par
 * @param String cam
 */

function atualiza_camada_post(url, par, cam) {
    
    var objCP_hdl;
    var objCP_url = url;
    var objCP_parametros = par;
    var objCP_camada = cam;
    this.objCP_ajax = function () {
        objCP_hdl = openAjax();
        objCP_hdl.onreadystatechange = this.objCP_processReqChange;
        objCP_hdl.open("POST", objCP_url, true);
        objCP_hdl.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objCP_hdl.setRequestHeader("Content-Length", objCP_parametros.length);
        objCP_hdl.send(objCP_parametros);
    }

    this.objCP_processReqChange = function () {
        var comeco, fim, temp, resultado;
        // apenas quando o estado for "completado"
        if (objCP_hdl.readyState == 4) {
            // apenas se o servidor retornar "OK"
            if (objCP_hdl.status == 200) {

                resultado = objCP_hdl.responseText;

                if (camada_debug == true && confirm('mostrar resultado?')) {
                    prompt("resultado", resultado);
                }

                if (objCP_camada != '') {
                    if (typeof ($) != 'undefined') {


                        if ($('#' + objCP_camada).length == 0) {
                            alert("Camada " + objCP_camada + " não encontrada! ");
                        }
                        else {
                            $('#' + objCP_camada).html(resultado);
                            if ($('#' + objCP_camada).html() == '') {
                                document.getElementById(objCP_camada).innerHTML = resultado;
                            }
                            if (visualizar_camada) {
                                $('#' + objCP_camada).css({ visibility: 'visible' });
                            }
                        }
                    } else {

                        if (!document.getElementById(objCP_camada)) {
                            alert("Camada " + objCP_camada + " não encontrada! ");
                        }
                        else {
                            document.getElementById(objCP_camada).innerHTML = resultado;
                            if (visualizar_camada) {
                                document.getElementById(objCP_camada).style.visibility = 'visible';
                            }
                        }
                    }
                }

                comeco = resultado.indexOf("<!--Alerta");
                fim = resultado.lastIndexOf("Alerta-->");
                if (comeco != fim) {
                    alert(resultado.substring(comeco + 10, fim));
                    //eval(resultado.substring(comeco+10,fim));
                }

                comeco = resultado.indexOf("<!--Funcao");
                fim = resultado.lastIndexOf("Funcao-->");
                if (comeco != fim) {
                    eval(resultado.substring(comeco + 10, fim));
                }

                /* Início da configuração do tamanho das divs das peças */
                var largura = screen.width;
                var altura = screen.height;

                var meioAltura = altura * (55 / 100);
                var janelaLeft, janelaRight, janelaTop, janelaBottom;
                var janelaWidth, janelaHeight;

                janelaLeft = janelaRight = janelaBottom = '5%';
                janelaTop = document.body.scrollTop + 50 + 'px';
                janelaWidth = '90%';
                janelaHeight = '1%';

                /* Se a resolução for menor ou igual a 800x600 a posição e tamanho das divs são diferentes... */
                if (largura <= 800 && altura <= 600) {
                    meioAltura = altura * (45 / 100);
                    janelaLeft = janelaRight = janelaBottom = '5% !important';
                    janelaTop = document.body.scrollTop + 50 + 'px !important';
                    //janelaWidth = '30%';
                    document.getElementById('meio').style.height = '250px';
                }
                else if (document.getElementById('meio')) {
                    document.getElementById('meio').style.height = '400px';
                }
                //} else {
                //    $(document).scrollTop(0);
                //}

                if (document.getElementById('meio') && document.getElementById('meio').style.height > meioAltura) {
                    document.getElementById('meio').style.height = parseInt(meioAltura) + 'px';
                }

                var divJanela = document.getElementById('div_janela');
                if (divJanela) {
                    divJanela.style.position = 'absolute';
                    divJanela.style.left = janelaLeft;
                    divJanela.style.right = janelaRight;
                    divJanela.style.top = janelaTop;
                    divJanela.style.bottom = janelaBottom;
                    divJanela.style.width = janelaWidth;
                    divJanela.style.height = janelaHeight;
                }

                //Todos os textareas das peças...
                var _textAreas = document.getElementsByTagName('iframe');
                var textAreas = new Array();
                for (var i = 0; i < _textAreas.length; i++) {
                    var textArea = _textAreas[i];
                    if (textArea.className.indexOf('textAreaFck') != -1) {
                        textAreas.push(textArea)
                    }
                }
                var qtdTextArea = textAreas.length;
                if (qtdTextArea) {
                    for (var i = 0; i < textAreas.length; i++) {
                        var textArea = textAreas[i];
                        var j = 2;
                        while (j && textArea) {
                            if (textArea.className && textArea.className.indexOf('valores') != -1) {
                                j--;
                                textArea.style.height = parseInt((meioAltura - (meioAltura * (20 / 100))) / qtdTextArea) + 'px';
                            }
                            if (textArea.className && textArea.className.indexOf('titulos') != -1) {
                                j--;
                                textArea.style.height = parseInt((meioAltura - (meioAltura * (20 / 100))) / qtdTextArea) + 'px';
                            }
                            textArea = textArea.parentNode;
                        }

                    }
                    //$('.textAreaFck').closest('.titulos, .valores').height(parseInt((meioAltura-(meioAltura*(20/100)))/qtdTextArea)+'px');
                }

                //Se tiver calendário, aumenta o tamanho deles...
                var divCalendario = document.getElementById('div_calendario');
                var divHoras = document.getElementById('div_horas');
                if (divCalendario && divCalendario.length && divHoras && divHoras.length) {
                    divCalendario.style.width = '49%';
                    divHoras.style.width = '49%';
                    divHoras.style.float = 'left';
                }
                /* Fim da configuração do tamanho das divs das peças */
            }
            else {
                alert("Não foi possivel efetuar uma conexão!\n Tente Novamente!");
            }
        }
    }

    if ((cam != '') && (document.getElementById(cam))) {
        document.getElementById(cam).innerHTML = '<div style="position:absolute;top:45%;left:45%;margin-left:-30px;margin-top:-20px;"><img src="img/carregando/carrega3.gif" style="vertical-align:middle;"></div>';
    }
    if (camada_debug == true) {
        if (confirm('mostrar chamada da camada?')) {
            document.getElementById(cam).innerHTML = '<div style="position:absolute;top:50%;left:45%;margin-left:-30px;margin-top:-20px;">' + url + '?' + objCP_parametros + '</div>';
            return false;
        }
    }
    this.objCP_ajax();
}




function procedimento_ajax(url,par) {
	var objCP_hdl;
	var objCP_url = url;
	var objCP_parametros = par;

  this.objCP_ajax = function() {
			objCP_hdl = openAjax();
			objCP_hdl.onreadystatechange = this.objCP_processReqChange;
			objCP_hdl.open("POST",objCP_url, true);
			objCP_hdl.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			objCP_hdl.setRequestHeader("Content-Length",objCP_parametros.length);
			objCP_hdl.send(objCP_parametros);
	}

	this.objCP_processReqChange=function() {
			var comeco,fim,temp,resultado;
			// apenas quando o estado for "completado"
			if (objCP_hdl.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (objCP_hdl.status == 200) {
					resultado=objCP_hdl.responseText;

					comeco = resultado.indexOf("<!--Alerta");
					fim    = resultado.lastIndexOf("Alerta-->");
					if (comeco != fim) {
						alert(resultado.substring(comeco+10,fim));
					}

					comeco = resultado.indexOf("<!--Funcao");
					fim    = resultado.lastIndexOf("Funcao-->");
					if (comeco != fim) {
						eval(resultado.substring(comeco+10,fim));
					}
				} else {

	          				console.log(objCP_hdl.responseText);
				}
			}
	}
	this.objCP_ajax();
}