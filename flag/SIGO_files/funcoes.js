/*$Id: funcoes.js 24920 2014-02-04 13:37:05Z marceloc $*/
// JavaScript Document

//Valida CPF
function addslashes(str) {
	str=str.replace(/\\/g,'\\\\');
	str=str.replace(/\'/g,'\\\'');
	str=str.replace(/\"/g,'\\"');
	str=str.replace(/\0/g,'\\0');
	return str;
}

function stripslashes(str) {
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\0/g,'\0');
	str=str.replace(/\\\\/g,'\\');
	return str;
}

function validaDataNew(data) {
    val = data;
    var dia, mes, ano, data; //,rt;
    var dt, dd, dm, da; // ,rt=true;
    var vdt = new Date();
    var vano = vdt.getFullYear();


    if ($.trim(val) != '') {
        if (val.length != 10) {
            alert('Formato Inv\u00e1lido!\n(use: dd/mm/aaaa)');
            $('#dt_const').val('');
            return false;
        }
        else {
            data = val.split("/");
            dia = data[0];
            mes = data[1];
            ano = data[2];

            if (ano > vano) {
                alert('Ano Inv\u00e1lido!');
                $('#dt_const').val('');
                return false;
            }

            if (dia > 31 || dia <= 0) {
                alert('Dia Inv\u00e1lido!');
                $('#dt_const').val('');
                return false;
            }
            else if (mes > 12 || mes < 01) {
                alert('M\u00eas Inv\u00e1lido!');
                $('#dt_const').val('');
                return false;
            }

            if ((mes == 01) || (mes == 03) || (mes == 05) || (mes == 07) || (mes == 08) || (mes == 10) || (mes == 12)) {//mes com 31 dias
                if ((dia < 01) || (dia > 31)) {
                    alert('Dia Inv\u00e1lido!');
                    $('#dt_const').val('');
                    return false;
                }
            } else

                if ((mes == 04) || (mes == 06) || (mes == 09) || (mes == 11)) {//mes com 30 dias
                    if ((dia < 01) || (dia > 30)) {
                        alert('Dia Inv\u00e1lido!');
                        $('#dt_const').val('');
                        return false;
                    }
                } else

                    if ((mes == 02)) {//Fevereiro bisexto
                        if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))) {
                            if ((dia < 01) || (dia > 29)) {
                                alert('Dia Inv\u00e1lido!');
                                $('#dt_const').val('');
                                return false;
                            }
                        } else {
                            if ((dia < 01) || (dia > 28)) {
                                alert('Dia Inv\u00e1lido!');
                                $('#dt_const').val('');
                                return false;
                            }
                        }
                    }

            return true;
        }
    }

    return false;
}

function valida_cpf(cpf) {
	cpf = alltrim(cpf);
	while (cpf.indexOf('.')>=0) { cpf = cpf.replace(".",""); }
	while (cpf.indexOf('-')>=0) { cpf = cpf.replace("-",""); }
	while (cpf.indexOf('/')>=0) { cpf = cpf.replace("/",""); }
	while (cpf.indexOf(' ')>=0) { cpf = cpf.replace(" ",""); }
	if ( (cpf == '11111111111') || (cpf == '22222222222') ||
		(cpf == '33333333333') || (cpf == '44444444444') ||
		(cpf == '55555555555') || (cpf == '66666666666') ||
		(cpf == '77777777777') || (cpf == '88888888888') ||
		(cpf == '99999999999') || (cpf == '00000000000') ||
		cpf.length != 11) {
		return false;
	}
	var dg = cpf.substr(9,2);
	var dg_ver = "";

	for (var j=1; j<=2; j++) {
		var soma = 0;
		var mt = 2;
		var dg_temp = 0;
		for (var i=(8+j); i>=1; i--) {
			k = i-1;
			soma += parseInt(cpf.substr(k,1)) * mt;
			mt++;
		}
		dg_temp = ( 11 - (soma % 11));
		dg_temp = (dg_temp > 9)?(0):(dg_temp);
		cpf = cpf + String(dg_temp);
		dg_ver = dg_ver + String(dg_temp);
	}
	if (dg != dg_ver) {
		return false;
	} else {
		return true;
	}
}

function limpar_campo(ob,lst_id) {
	if (lst_id.indexOf(',') == -1) {
		 objid(lst_id).value='';
	} else {
		var m = lst_id.split(','),x,q = m.length;
		for (x=0; x<q; x++) {
			if (objid(m[x]).value)objid(m[x]).value = '';
			if (objid(m[x]).checked)objid(m[x]).checked = false;

		}
	}
}


//uso onkeyup="formata_inteiro(this)"
function formata_inteiro(ob) {
	var s,p,r='';
	s=ob.value;
	while (s.indexOf('.')>=0) {
		s=s.replace('.','');
	}
	q=s.length-1;
	while (q>=3) {
		p=s.substr(q-2,3);
		r='.'+p+r;
		s=s.substr(0,q-2);
		q=s.length-1;
	}

	ob.value=s+r;
}

// valida campos com somente números
function onlyNumber(e) {
	if (e.keyCode < 48 || e.keyCode > 57) {
		e.returnValue = false;
	}
}

//uso onkeypress="filtro_sointeiro(this,event)"
function filtro_sointeiro(evento) {
	/*var k=ev.keyCode;
	if ((k<48 || k>57) && (k<96 || k>105)) {
		ev.keyCode=00;
		return false;
	}*/
	var tecla = evento.keyCode;
	tecla = String.fromCharCode(tecla);
	if (!((tecla >= "0") && (tecla <= "9"))) {
		evento.keyCode = 0;
	}
}

//uso onkeypress="filtro_sonumero(this,event)"
function filtro_sonumero(ob,ev) {
	var k=ev.keyCode;
	if ((k<48 || k>57) && (Tecla < 96 || Tecla > 105)  && k!=45 && k!=46 && k!=44 ) {
		ev.keyCode=0;
		return false;
	}
}


//uso onkeypress="filtro_alfanumerico(this,event)"
function filtro_alfanumerico(ob,ev) {
	var k=ev.keyCode;
	if ( (!(k>=48 && k<=57) && !(k>=97 && k<=122) && !(k>=65 && k<=90))) {
		ev.keyCode=0;
		return false;
	}
}

//uso onkeypress="filtro_soletra(this,event)"
function filtro_soletra(ob,ev) {
	var k=ev.keyCode;
	if (!(k>=97 && k<=122) && !(k>=65 && k<=90)) {
		ev.keyCode=0;
		return false;
	}
}


function verImagem(nm) {
//  window.open(objid(nm).value,'imagem','menubar=false'); //'location=false,menubar=false,scrollbars=true,toolbar=true'
  window.showModalDialog('file://'+objid(nm).value,'',"dialogWidth:600px; dialogHeight:600px; center:yes; resizable:yes;");
}

function datetosql(dt) {
	var m=dt.split('/');
	return m[2]+'-'+m[1]+'-'+m[0];
}


function objid(nm) {
	if (document.getElementById(nm)) {
		return document.getElementById(nm);
	} else {
		var objsNm = document.getElementsByName(nm);
		if (objsNm.length==1) {
			return objsNm[nm];
		}
		alert('objeto '+nm+' não encontrado!');
		return null;
	}
}

function alltrim(str) {
	if (!str) {
		return '';
	}
	return str.replace(/^\s*|\s*$/g,"");
}

function abre_fato(txt,id_forca) {
   abrir=NewWindow('popup/fato.php?fato='+txt+'&busca=1&id_forca='+id_forca,'',700,500,true);
   abrir.focus();
}


function abre(txt,n,idMunic,idBairro) {

	txt = alltrim(txt);
	if (txt.length < 3 && n != 4) {
		return alert('Preencha ao menos 3 caracteres.');
	}

	if (n==1) {
		abrir=NewWindow('popup/locais.php?local='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==2) {
		abrir=NewWindow('popup/municipios.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==3) {
		if (idMunic=="") {
			alert("É necessário consultar seu Município antes!");
			document.form1.municipio.focus();
		} else {
			abrir=NewWindow('popup/bairro.php?bairro='+txt+'&idMunic='+idMunic+'&busca=1','',500,250,true);
			abrir.focus();
		}
	}
	if (n==4) {
		if (idMunic=="") {
			alert("É necessário consultar seu Município antes!");
			document.form1.municipio.focus();
		} else {
			abrir=NewWindow('popup/logradouro.php?logradouro='+txt+'&idMunic='+idMunic+'&idBairro='+idBairro+'&busca=1','',500,250,true);
			abrir.focus();
		}
	}
	if (n==5) {
        cat='';
		var o=objid('id_cat_infra') ;
        if (o && o.value!='')cat=objid('id_cat_infra').value;
		abrir=NewWindow('popup/fato.php?fato='+txt+'&busca=1&cat='+cat,'',700,500,true);
		abrir.focus();
	}
	if (n==6) {
		abrir=NewWindow('popup/referencias.php?refeEspec='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==7) {
		abrir=NewWindow('popup/unidades.php?txt='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==8) {
		abrir=NewWindow('popup/municipios2.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==9) {
		abrir=NewWindow('popup/cep.php?cep='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==10) {
		abrir=NewWindow('unidades.php?txt='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==11) {
		abrir=NewWindow('popup/municipioNasc.php?txt='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==12) {
		abrir=NewWindow('popup/municipios3.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==13) {
		abrir=NewWindow('popup/municipiosMandado.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==15) {
		abrir=NewWindow('popup/unidadesPrisao.php?txt='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==16) {
		abrir=NewWindow('popup/profissao.php?txt='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==17) {
		abrir=NewWindow('popup/municipiosMov.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==18) {
		abrir=NewWindow('popup/municipiosMovRev.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==19) {
		abrir=NewWindow('popup/municipiosMovDev.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==20) {
		abrir=NewWindow('unidadesPrisao.php?txt='+txt+'&busca=1','lk','',500,250,true);
		abrir.focus();
	}
	if (n==21) {
       var id=document.getElementById('idMunicNasc').value;
	   r="uf=>uf_emissor,nm_emissor,id_emissor";
	   t="EMISSOR";
       /*abrir=NewWindow("popup/generico.php?tipo="+t+"&retorno="+r+"&txt="+txt+'&id='+id,'lk',500,250,true);
	   abrir.focus();*/
	   window.open("popup/generico.php?tipo="+t+"&retorno="+r+"&txt="+txt+'&id='+id,"generico","top=0,left=0,width=500,Height=250,scrollbars=1");
	}
	if (n==22) {
		abrir=NewWindow('popup/municipiosMovDevSoli.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n==23) {
		r='nm_municipio=>municipio,id_municipio=>idMunic,uf';
		t = "MUNICIPIO";
		abrir=window.open("popup/generico.php?tipo="+t+"&retorno="+r+"&txt="+txt,"generico","top=0,left=0,width=600,Height=500,scrollbars=1");
		abrir.focus();
	}
	if (n==24) {
		abrir=NewWindow('popup/municipiosExpiracao.php?municipio='+txt+'&busca=1','',500,250,true);
		abrir.focus();
	}
	if (n == 25) { // DELEGADO e Delegado Adjunto
		t = "FUNCIONARIO2";
		r = "nm_cidadao,id_cidadao,matr_func";
		url = "popup/generico.php?tipo=" + t + "&retorno=" + r + "&txt=" + txt + "&func=1,2&callreturn=populaDelegadoDoAbrir";
		abrir = window.open(url, "generico", "top=0,left=0,width=500,Height=300,scrollbars=1");
		abrir.focus();
	}

	if (n == 26) {
	    if (idMunic == "") {
	        alert("É necessário consultar seu Município antes!");
	        document.form1.municipio.focus();
	    } else {
	        abrir = NewWindow('popup/logradouro.php?logradouro=' + txt + '&idMunic=' + idMunic + '&idBairro=' + idBairro + '&busca=1&endereco=comercial', '', 500, 250, true);
	        abrir.focus();
	    }
	}
	
}

function populaDelegadoDoAbrir(func_publico) {
	func_publico.nm_cidadao = $.trim(func_publico.nm_cidadao);
	$('.delegadoResponsavel').val(func_publico.nm_cidadao);
	$('#id_delegado').val(func_publico.matr_func);
	abrir.close();
}

function verifySpecialReference() {
	document.form1.idRefeEspec.value = "";
	document.form1.refeEspec.value   = "";
}
function eraseBairro() {
	document.form1.bairro.value   = "";
	document.form1.idBairro.value = "";
}
function eraseCep() {
	document.form1.cep.value        = '';
	document.form1.cepLido.value    = '';
}
function eraseLogradouro() {
	document.form1.logradouro.value = "";
	document.form1.idLogra.value = "";
	document.form1.nr.value = "";
}

function eraseLogradouroDadosPessoais() {
    document.form1.logradouro.value = "";
    document.form1.idLogra.value = "";
    document.form1.Numero.value = "";
}

function eraseBairro2() {
	document.form1.bairro2.value   = "";
	document.form1.idBairro2.value = "";
}
function eraseLogradouro2() {
	document.form1.logradouro2.value = "";
	document.form1.idLogra2.value = "";
}
function eraseUf () {
	$("#uf").val('');
}

function isAlphaNum(obj,ev) {
	Tecla = ev.keyCode;
	//se nao for número, nem enter nem backspace, nem tab nem hífen, nem ponto nem espaço, nem está em [a-z], nem em [A-Z]
	if ( (Tecla<48 || Tecla>57)  &&
		Tecla!=13 && Tecla!=8   &&
		Tecla!=9  && Tecla!=45  &&
		Tecla!=46 && Tecla!=32  &&
		(Tecla<97 || Tecla>122) &&
		(Tecla<65 || Tecla>90)
	) {
		event.returnValue = false;
		return false;
	}
	event.returnValue = true;
	return true;
}

function isNum(obj,ev) {
	Tecla = ev.keyCode;
	if (
		// números
		(Tecla >= 48 && Tecla <= 57)
		// números do keypad
		|| (Tecla <= 96 && Tecla >= 105)
		// enter, backspace e tab
		||  Tecla == 13 || Tecla == 8 || Tecla == 9
	) {
		event.returnValue = true;
		return true;
	}
	event.returnValue = false;
	return false;
}

function isNum3(obj,ev) {
	Tecla = ev.keyCode;
	if (
		// números
		(Tecla >= 48 && Tecla <= 57)
		// números do keypad
		|| (Tecla >= 96 && Tecla <= 105)
		// enter, backspace e tab
		||  Tecla == 13 || Tecla == 8 || Tecla == 9
	) {
		event.returnValue = true;
		return true;
	}
	event.returnValue = false;
	return false;
}

function IsNum(obj,ev) {
   var str = obj.value;
	Tecla = ev.keyCode;

    //se nao for número nem parentesis ou espaço
    //A tecla 8 é a backspace (tecla de apagar)
    //O código 13 é a tecla Enter
   //if ( (Tecla < 48 || Tecla > 57) && (Tecla < 37 || Tecla > 40) && (Tecla < 96 || Tecla > 105)  &&  Tecla!=13 && Tecla!=8 && Tecla!=9 && Tecla!=32 && Tecla!=46 && Tecla!=16)
   //if ((Tecla >= 37 && Tecla <= 40)||(Tecla >= 48 && Tecla <= 57)||(Tecla >= 96 && Tecla <= 105)||(Tecla == 8)||(Tecla == 9) ||(Tecla == 46) ||(Tecla == 13)) {
	if (((Tecla >= 1 && Tecla <= 47) && Tecla != 8 && Tecla != 13) || ((Tecla < 48 && Tecla > 57) && Tecla != 8 && Tecla != 13) || (Tecla >= 58 && Tecla <= 255)) {
	   event.returnValue = false;
	   alert("Só devem ser digitados números!")
       return false;
   }
   event.returnValue = true;
   return true;
}

function IsInt(obj,event) {
	var str = obj.value;
	var Tecla = event.which;
	if (Tecla == null) {
		Tecla = event.keyCode;
	}
	//se for virgula, retorna ponto
	if (Tecla == 44) {
		event.returnValue=true;
		event.keyCode = 46;
		return true;
	}
	//se nao for número nem enter nem backspace nem tab nem ponto
	if ( (Tecla < 48 || Tecla > 57) && Tecla!=13 && Tecla!=8 && Tecla!=9 && Tecla!=46) {
	   event.returnValue = false;
	   return false;
	}
	event.returnValue = true;
	return true;
}

function isNum2(obj) {
	var regex = /[^0-9]/g;
	obj.value = obj.value.replace(regex, '');
}


function apagaCampos() {
	for ($i=0;$i<document.forms[0].elements.length;$i++) {
		if (!document.forms[0].elements[$i].disabled &&
		document.forms[0].elements[$i].type !='button' &&
		document.forms[0].elements[$i].type !='hidden')
			document.forms[0].elements[$i].value = '';
	}
}

function validaHora(par,par2,d,m,an,ho,mi) {

	//d     = new Date();
	//diaA  = d.getDate();
	//mesA  = d.getMonth()+1;
	//anoC  = d.getYear();
	//hora  = d.getHours();
	//minu  = d.getMinutes();

	diaA = d;
	mesA = m;
	anoC = an;
	hora = ho;
	minu = mi;

	diasAtuais = String(anoC)+String(mesA)+String(diaA);
	//minutoAtual = Number(minu) + Number(Number(hora)*60) + Number(Number(diaA)*24*60) + (Number(mesA)*30*24*60) + (Number(anoC)*365*12*30*24*60);
	minutoAtual = String(hora)+String(minu);

	dia2   = par.charAt(0)+""+par.charAt(1);
	barra  = par.charAt(2);
	mes2   = par.charAt(3)+""+par.charAt(4);
	barra1 = par.charAt(5);
	ano2   = par.charAt(6)+""+par.charAt(7)+""+par.charAt(8)+""+par.charAt(9);
	hora   = par2.charAt(0)+""+par2.charAt(1);
	pontos = par2.charAt(2);
	minu   = par2.charAt(3)+""+par2.charAt(4);

	//minutoInformado = (Number(minu)-40) + Number(Number(hora)*60) + Number(Number(dia2)*24*60) + (Number(mes2)*30*24*60) + (Number(ano2)*365*12*30*24*60);
	minutoInformado = String(hora)+String(minu);
	diasInformado = String(ano2)+String(mes2)+String(dia2);

 	if (Number(minutoInformado)=="" && minutoInformado!='0000') {
		alert('É necessário preencher a hora!');
		return false;
 	}

 	if (Number(hora) > 23) {
		alert('Hora incorreta!');
		return false;
 	}

 	if (Number(minu) > 59) {
		alert('Hora incorreta!');
		return false;
 	}

 	if (pontos != ":" || par2.charAt(0) == ":" || par2.charAt(1) == ":" || par2.charAt(3) == ":" || par2.charAt(4) == ":") {
		alert('Formato incorreto!\n Use 00:00');
		return false;
 	}

	if (Number(ano) > anoC || Number(ano) < 1900) {
		alert('Ano incorreto!');
		return false;
	}

	if (Number(diasAtuais) == Number(diasInformado)) {
		if (Number(minutoInformado) > Number(minutoAtual)) {
			alert('A hora informada não pode ser maior que a hora atual.');
			return false;
		 }
	}
}

function validaHoraRelFinal(par,par2,d,m,an,ho,mi) {

	//d     = new Date();
	//diaA  = d.getDate();
	//mesA  = d.getMonth()+1;
	//anoC  = d.getYear();
	//hora  = d.getHours();
	//minu  = d.getMinutes();

	diaA = d;
	mesA = m;
	anoC = an;
	hora = ho;
	minu = mi;

	diasAtuais = String(anoC)+String(mesA)+String(diaA);
	//minutoAtual = Number(minu) + Number(Number(hora)*60) + Number(Number(diaA)*24*60) + (Number(mesA)*30*24*60) + (Number(anoC)*365*12*30*24*60);
	minutoAtual = String(hora)+String(minu);

	dia2   = par.charAt(0)+""+par.charAt(1);
	barra  = par.charAt(2);
	mes2   = par.charAt(3)+""+par.charAt(4);
	barra1 = par.charAt(5);
	ano2   = par.charAt(6)+""+par.charAt(7)+""+par.charAt(8)+""+par.charAt(9);
	hora   = par2.charAt(0)+""+par2.charAt(1);
	pontos = par2.charAt(2);
	minu   = par2.charAt(3)+""+par2.charAt(4);

	//minutoInformado = (Number(minu)-40) + Number(Number(hora)*60) + Number(Number(dia2)*24*60) + (Number(mes2)*30*24*60) + (Number(ano2)*365*12*30*24*60);
	minutoInformado = String(hora)+String(minu);
	diasInformado = String(ano2)+String(mes2)+String(dia2);

	if (Number(hora) > 23) {
		alert('Hora incorreta!');
		return false;
 	}

	if (Number(minu) > 59) {
		alert('Hora incorreta!');
		return false;
	}

	if (pontos != ":" || par2.charAt(0) == ":" || par2.charAt(1) == ":" || par2.charAt(3) == ":" || par2.charAt(4) == ":") {
		alert('Formato incorreto!\n Use 00:00');
		return false;
	}

	if (Number(ano) < 1900) {
	 	alert('Ano incorreto!');
		return false;
	}

	if (Number(diasAtuais) == Number(diasInformado)) {
		if (Number(minutoInformado) < Number(minutoAtual)) {
			alert('A hora informada não pode ser menor que a hora atual.');
			return false;
		 }
	}
}

function validaPlaca(pl) {
	erro='';

 	// validação da placa
	var caracplaca = "'1234567890@/:,®;&#$!?%^*+{}[])(><|=|ºÜÖÄ'´";
	for (y = 0; y <caracplaca.length; y ++) {
		ascplaca = caracplaca.charAt(y);
		if (pl.substring(0, 3).indexOf(ascplaca, 0) > -1) {
			erro = 'Placa inválida!';
		}
	}

	/*var vplaca = pl.indexOf('-')
	if (vplaca != '3') {
		window.alert('PLACA INVÁLIDA DIGITE A PLACA NO FORMATO N EXEMPLO: VEN-0123 !')
		document.form.placa.focus()
		document.form.placa.select()
		return false;
	}*/

	var caracplaca1 = "'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm@/:,®;&#$!?%^*+{}[])(><|=|ºÜÖÄ'´";
	for (y = 0; y <caracplaca1.length; y ++) {
		ascplaca1 = caracplaca1.charAt(y);
		if (pl.substring(3,7).indexOf(ascplaca1, 0) > -1) {
			erro = 'Placa inválida!';
		}
	}

	var placa2 = pl;
	var placa3 = placa2;
	var tplaca = pl.length;
	for (x = 0; x < tplaca; x ++) {
		placa2 = placa3.replace(' ', '');
		placa3 = placa2;
	}

	var tplaca2 = placa3.length;
	if (tplaca2 < '7') {
		erro = 'Placa incompleta!';
	}
	return erro;
}

function retornaData(par,par1) {
	dia  = par.charAt(0)+par.charAt(1);
	mes  = par.charAt(3)+par.charAt(4);
	ano  = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);
	hora = par1.charAt(0)+""+par1.charAt(1);
	minu = par1.charAt(3)+""+par1.charAt(4);

	total   = Number(hora)+12;
	NewDate = new Date(ano, mes, dia,total,minu,00);

	newday = NewDate.getDay();
	if (newDay<10)newDay='0'+String(newDay);

	newMonth = NewDate.getMonth();
	if (newMonth<10)newMonth='0'+String(newMonth);

	newYear = NewDate.getYear();

	newHour = NewDate.getHours();
	if (newHour<10)newHour='0'+String(newHour);

	newMinute = NewDate.getMinutes();
	if (newMinute<10)newMinute='0'+String(newMinute);

	data=String(newDay)+'/'+String(newMonth)+'/'+String(newYear);
	hora=String(newHour)+'/'+String(newMinute);

	//document.form1.dataFinal.value=data;
	//document.form1.horaFinal.value=hora;
}


function validaDataRelFinal(par,d,m,an) {
	//d = new Date();
	//diaA  = d.getDate();
	//mesA = d.getMonth()+1;
	//anoC = d.getYear();
	diaA = d;
	mesA = m;
	anoC = an;
	diasAtuais = String(anoC)+String(mesA)+String(diaA);
	//diasAtuais = Number(diaA) + (Number(mesA)*30) + (Number(anoC)*365);
	dia = par.charAt(0)+par.charAt(1);
	barra = par.charAt(2);
	mes = par.charAt(3)+par.charAt(4);
	barra1 = par.charAt(5);
	ano = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);

	diasInformado = String(ano)+String(mes)+String(dia);
	//diasInformado = Number(dia) + (Number(mes)*30) + (Number(ano)*365);
	if (Number(dia) > 31) {
		alert('Dia incorreto!');
		return false;
	} else if (barra != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(mes) > 12) {
		alert('Mês incorreto!');
		return false;
	} else if (barra1 != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(ano) < 1890) {
	 	alert('Ano incorreto!');
		return false;
	}
	if (Number(diasInformado) < Number(diasAtuais)) {
	 	alert('A data informada não pode ser menor que a data atual.');
		return false;
	}
}

function validaDataHoraRelInicial(par,par1,par2,par3) {
	d    = new Date();
	diaA = d.getDate();
	mesA = d.getMonth()+1;
	anoC = d.getFullYear();
	 //hora  = d.getHours();
	 //minu  = d.getMinutes();

	dia     = par.charAt(0)+par.charAt(1);
	barra   = par.charAt(2);
	mes     = par.charAt(3)+par.charAt(4);
	barra1  = par.charAt(5);
	ano     = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);
	hora1   = par1.charAt(0)+""+par1.charAt(1);
	pontos1 = par1.charAt(2);
	minu1   = par1.charAt(3)+""+par1.charAt(4);

	minutoInformado = String(hora1)+String(minu1);
	diasInformado   = String(ano)+String(mes)+String(dia);
	//diasInformado = Number(dia) + (Number(mes)*30) + (Number(ano)*365);

	dia2    = par2.charAt(0)+par2.charAt(1);
	barra2  = par2.charAt(2);
	mes2    = par2.charAt(3)+par2.charAt(4);
	barra12 = par2.charAt(5);
	ano2    = par2.charAt(6)+par2.charAt(7)+par2.charAt(8)+par2.charAt(9);
	hora    = par3.charAt(0)+""+par3.charAt(1);
	pontos  = par3.charAt(2);
	minu    = par3.charAt(3)+""+par3.charAt(4);

	minutoAnterior = String(hora)+String(minu);
	diasAnterior   = String(ano2)+String(mes2)+String(dia2);

	if (Number(dia) > 31) {
		alert('Dia incorreto!');
		return false;
	} else if (barra != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(mes) > 12) {
		alert('Mês incorreto!');
		return false;
	} else if (barra1 != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(ano) > anoC || Number(ano) < 1890) {
		alert('Ano incorreto!');
		return false;
	}
  	if (Number(hora1) > 23) {
		alert('Hora incorreta!');
		return false;
 	}

 	if (Number(minu1) > 59) {
		alert('Hora incorreta!');
		return false;
 	}

 	if (pontos1 != ":" || par1.charAt(0) == ":" || par1.charAt(1) == ":" || par1.charAt(3) == ":" || par1.charAt(4) == ":") {
		alert('Formato incorreto!\n Use 00:00');
		return false;
 	}
	totalAnterior = String(diasAnterior)+String(minutoAnterior);
	//alert(totalAnterior);
	totalInformado = String(diasInformado)+String(minutoInformado);
	//alert(totalInformado);
	if (Number(totalAnterior) >= Number(totalInformado)) {
		alert('A data inicial e hora inicial não deve ser inferior a data e hora de encerramento do último relatório.');
		return false;
 	}
}

function validaData(par,d,m,an) {
	//d = new Date();
	//diaA  = d.getDate();
	//mesA = d.getMonth()+1;
	//anoC = d.getYear();
	diaA = d;
	mesA = m;
	anoC = an;
	diasAtuais = String(anoC)+String(mesA)+String(diaA);
	//diasAtuais = Number(diaA) + (Number(mesA)*30) + (Number(anoC)*365);
	dia    = par.charAt(0)+par.charAt(1);
	barra  = par.charAt(2);
	mes    = par.charAt(3)+par.charAt(4);
	barra1 = par.charAt(5);
	ano    = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);

	diasInformado = String(ano)+String(mes)+String(dia);
	//diasInformado = Number(dia) + (Number(mes)*30) + (Number(ano)*365);
	if (diasInformado == "") {
		alert('É necessário preencher a data!');
		return false;
	}
	if (Number(dia) > 31) {
		alert('Dia incorreto!');
		return false;
	} else if (barra != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(mes) > 12) {
		alert('Mês incorreto!');
		return false;
	} else if (barra1 != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(ano) > anoC || Number(ano) < 1890) {
	 	alert('Ano incorreto!');
		return false;
	}
}

function validaDataAtual(par,d,m,an) {
	diaA = d;
	mesA = m;
	anoC = an;

	diasAtuais = String(anoC)+String(mesA)+String(diaA);
	//diasAtuais = Number(diaA) + (Number(mesA)*30) + (Number(anoC)*365);
	dia    = par.charAt(0)+par.charAt(1);
	barra  = par.charAt(2);
	mes    = par.charAt(3)+par.charAt(4);
	barra1 = par.charAt(5);
	ano    = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);
	mes_string = [];
	mes_string[0]  = "January";
	mes_string[1]  = "February";
	mes_string[2]  = "March";
	mes_string[3]  = "April";
	mes_string[4]  = "May";
	mes_string[5]  = "June";
	mes_string[6]  = "July";
	mes_string[7]  = "August";
	mes_string[8]  = "September";
	mes_string[9]  = "October";
	mes_string[10] = "November";
	mes_string[11] = "December";
	diasInformado  = Date.parse(mes_string[Number(mes)-1]+" "+Number(dia)+","+Number(ano));
	diasAtuais     = Date.parse(mes_string[Number(mesA)-1]+" "+Number(diaA)+","+Number(anoC));

	if (diasInformado == "") {
		alert('É necessário preencher a data!');
		return false;
	 }
	 if (Number(dia) > 31) {
		alert('Dia incorreto!');
		return false;
	 } else if (barra != '/') {
		alert('Formato incorreto!\n Use dd/mm/aaaa');
		return false;
	 } else if (Number(mes) > 12) {
		alert('Mês incorreto!');
		return false;
	 } else if (barra1 != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	 } else if (Number(ano) > anoC) {
		alert('Ano incorreto!');
		return false;
	 } else if (Number(diasInformado) > Number(diasAtuais)) {
		alert('Data não Permitida!');
		return false;
	 }
	 return true;
}

function validaDataNasc(par,d,m,an) {
	//d = new Date();
	//diaA  = d.getDate();
	//mesA = d.getMonth()+1;
	//anoC = d.getYear();
	diaA = d;
	mesA = m;
	anoC = an;
	diasAtuais = String(anoC)+String(mesA)+String(diaA);

	//diasAtuais = Number(diaA) + (Number(mesA)*30) + (Number(anoC)*365);
	dia = par.charAt(0)+par.charAt(1);
	barra = par.charAt(2);
	mes = par.charAt(3)+par.charAt(4);
	barra1 = par.charAt(5);
	ano = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);

	diasInformado = String(ano)+String(mes)+String(dia);
	//diasInformado = Number(dia) + (Number(mes)*30) + (Number(ano)*365);
	if (diasInformado == "") {
		alert('É necessário preencher a data!');
		return false;
	}
	if (Number(dia) > 31) {
		alert('Dia incorreto!');
		return false;
	} else if (barra != '/') {
		alert('Formato incorreto!\n Use dd/mm/aaaa');
		return false;
	} else if (Number(mes) > 12) {
		alert('Mês incorreto!');
		return false;
	} else if (barra1 != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(ano) > anoC || Number(ano) < 1890) {
	 	alert('Ano incorreto!');
		return false;
	}
	return true;
}


function validaDataMandado(par,par1,d,m,an) {
	diaA = d;
	mesA = m;
	anoC = an;

	diasAtuais = String(anoC)+String(mesA)+String(diaA);

	dia    = par.charAt(0)+par.charAt(1);
	barra  = par.charAt(2);
	mes    = par.charAt(3)+par.charAt(4);
	barra1 = par.charAt(5);
	ano    = par.charAt(6)+par.charAt(7)+par.charAt(8)+par.charAt(9);

	diasInformado = String(ano)+String(mes)+String(dia);

	if (par1 != "") {
		diaM   = par1.charAt(0)+par1.charAt(1);
		barra  = par1.charAt(2);
		mesM   = par1.charAt(3)+par1.charAt(4);
		barra1 = par1.charAt(5);
		anoM   = par1.charAt(6)+par1.charAt(7)+par1.charAt(8)+par1.charAt(9);

		diasMandado = String(anoM)+String(mesM)+String(diaM);

	}

	if (diasInformado == 0) {
		alert('É necessário preencher a data da movimentação.');
		return false;
	}
	if (Number(dia) > 31) {
		alert('Dia incorreto!');
		return false;
	} else if (barra != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(mes) > 12) {
		alert('Mês incorreto!');
		return false;
	} else if (barra1 != '/') {
		alert('Formato incorreto!\n Use 00/00/0000.');
		return false;
	} else if (Number(ano) > anoC || Number(ano) < 1890) {
		alert('Ano incorreto!');
		return false;
	}
	if (Number(diasInformado) > Number(diasAtuais)) {
		alert('A data informada não pode ser maior que a data atual.');
		return false;
	}
	if (par1 != "") {
		if (Number(diasInformado) < Number(diasMandado)) {
			alert('A data da movimentação não pode ser menor que a data do mandado.');
			return false;
		}
	}
}

function validaEmail(email) {
	if (email != '') {
		var regex = /(.+)@(.+)\.(.+)/;
		if (!email.match(regex)) {
			window.alert('Digite um e-mail válido.');
			email = '';
			return false;
		}
	}
}

function validaEmail2(email) {
	if (email.value != '') {
		var regex = /(.+)@(.+)\.(.+)/;
		if (!email.value.match(regex)) {
			window.alert('Digite um e-mail válido.');
			email.value = '';
			return false;
		}
	}
}

// Funções para colorir os textbox ao entrar e sair dos campos nos cadastros
function CampoEnter(campo) {
	campo.style.backgroundColor = '#ffffcc';
	campo.style.color = '#000000';
	campo.style.fontWeight = 'normal';
}
function CampoSai(campo) {
	campo.style.backgroundColor = '#FFFFFF';
	campo.style.color = '#000000';
	campo.style.fontWeight = 'normal';
}
// Fim das funções de colorir os textboxes





//DESING//////////////////////////////////////////////////////////////////////////////


//-------------------------------------------------------[ link piscando / inicio ]-->
//function doBlink() {
//var blink = document.all.tags("BLINK")
//for (var i=0; i<blink.length; i++)
//blink[i].style.visibility = blink[i].style.visibility == "" ? "hidden" : ""
//}
//function startBlink() {
//if (document.all)
//setInterval("doBlink()",500)
//}
//window.onload = startBlink;
//----------------------------------------------------------[ link piscando / fim ]-->




//-------------------------------------------------------------[ onFocus / inicio ]-->
function suckerfish(type, tag, parentId) {
	if (window.attachEvent) {
		window.attachEvent("onload", function() {var sfEls = (parentId==null)?document.getElementsByTagName(tag):document.getElementById(parentId).getElementsByTagName(tag);type(sfEls);});
	}
}



sfFocus = function(sfEls) {
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onfocus=function() {this.className+=" sffocus";}
		sfEls[i].onblur=function() {this.className=this.className.replace(new RegExp(" sffocus\\b"), "");}
   }
}

sfTarget = function(sfEls) {
	var aEls = document.getElementsByTagName("A");
	document.lastTarget = null;
	for (var i=0; i<sfEls.length; i++) {
		if (sfEls[i].id) {
			if (location.hash==("#" + sfEls[i].id)) {
				sfEls[i].className+=" sftarget";
				document.lastTarget=sfEls[i];
			}
			for (var j=0; j<aEls.length; j++) {
				if (aEls[j].hash==("#" + sfEls[i].id)) {
					aEls[j].targetEl = sfEls[i];
					aEls[j].onclick = function() {
						if (document.lastTarget) document.lastTarget.className = document.lastTarget.className.replace(new RegExp(" sftarget\\b"), "");
						this.targetEl.className+=" sftarget";
						document.lastTarget=this.targetEl;
						return true;
					}
				}
			}
		}
	}
}
//suckerfish(sfFocus, "INPUT");
//suckerfish(sfFocus, "TEXTAREA");
//suckerfish(sfFocus, "SELECT");
//suckerfish(sfFocus, "MAP");
//suckerfish(sfTarget, "DIV", "content");

//------------------------------------------------------------[ onFocus / fim ]-->





//--------------------------------------------[ janela centralizada / inicio ]-->
function NewWindow(mypage, myname, w, h, scroll) {
var winl = (screen.width - w) / 2;
var wint = (screen.height - h) / 2;
winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable=no'
//alert(winprops);
win = window.open(mypage, myname, winprops)
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
return win;
}
//----------------------------------------------[ janela centralizada / fim ]-->

//-----------------------------------------------[ Bloquear teclas / inicio ]-->
function block() {
	var tecla=window.event.keyCode;
	if (event) {
		if (tecla==17) {event.keyCode=0; event.returnValue=false;}
		if (tecla==113) {event.keyCode=0; event.returnValue=false;}
		if (tecla==114) {event.keyCode=0; event.returnValue=false;}
		if (tecla==115) {event.keyCode=0; event.returnValue=false;}
		if (tecla==117) {event.keyCode=0; event.returnValue=false;}
		if (tecla==118) {event.keyCode=0; event.returnValue=false;}
		if (tecla==119) {event.keyCode=0; event.returnValue=false;}
		if (tecla==120) {event.keyCode=0; event.returnValue=false;}
		if (tecla==121) {event.keyCode=0; event.returnValue=false;}
		if (tecla==122) {event.keyCode=0; event.returnValue=false;}
		if (tecla==123) {event.keyCode=0; event.returnValue=false;}
	}
}
//-----------------------------------------------[ Bloquear teclas / fim ]-->




//----------------------------------------[ Bloquear seleção de texto / inicio ]-->
function disableselect(e) {
	return false
}
function reEnable() {
	return true
}
//if IE4+
//document.onselectstart=new Function ("return false")

//if NS6
if (window.sidebar) {
	document.onmousedown=disableselect
	document.onclick=reEnable
}
//-----------------------------------------[ Bloquear seleção de texto / fim ]-->


//-----------------------------------------[ Imprimir / inicio ]-->
function DoPrinting(obj) {
	if (!window.print) {
		return
	}
	eval("window."+obj+".focus()");
	window.print();
}
//-----------------------------------------[ Imprimir / fim ]-->

/**
 * Daniel Pires Martins
 * @since 19/06/2007
 */
function ApenasNumeros(e) {
	var isNS4 = ((navigator.appName=="Netscape") ? 1 : 0 );
	if (!isNS4) {
		if (e.keyCode < 48 || e.keyCode > 57) {
			e.returnValue = false;
		}
	} else {
		if ( (e.which < 48 || e.which > 57) && (e.which != '8' && e.which != '0') ) {
			e.preventDefault();
		}
	}
}

/**
 * Daniel Pires Martins
 * @since 19/06/2007
 */
// Somente numeros
String.prototype.onlynumber = function() {
	return this.replace(/[^0-9]/g, "");
}

/**
 * Daniel Pires Martins
 * @since 19/06/2007
 */
function FormataTelefone(objeto,tammax,teclapres) {
	if (teclapres.keyCode != 0) {
		var tecla;
		var isNS4 = ((navigator.appName=="Netscape") ? 1 : 0 );

		if (!isNS4) {
			tecla = teclapres.keyCode;
		} else {
			tecla = teclapres.which;
		}

		vr = objeto.value.onlynumber();

		vr = vr.replace( "(", "" );
		vr = vr.replace( ")", "" );
		vr = vr.replace( " ", "" );
		vr = vr.replace( "-", "" );
		tam = vr.length;

		if (tam < tammax && tecla != 8) {
			tam = vr.length + 1 ;
		}

		if (tecla == 8 ) {
			tam = tam - 1 ;
		}

		if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ) {
			if ( tam <= 4 ) {
				objeto.value = vr ;
			}
			if ( (tam > 4) && (tam <= 8) ) {
				objeto.value = vr.substr(0,tam-4) + '-' + vr.substr( tam - 4, tam ) ;
			}
			if ( (tam >= 9) && (tam <= 10) ) {
				objeto.value = '(' + vr.substr(0,2) + ') ' + vr.substr(2,tam-6) + '-' + vr.substr(tam-4,tam) ;
			}
		}
	} else {
		vr = objeto.value.onlynumber();
		tam = vr.length;
		if (tam < tammax && tecla != 8) {
			tam = vr.length + 1 ;
		}

		if (tecla == 8 ) {
			tam = tam - 1 ;
		}

		if ( tam <= 4 ) {
			objeto.value = vr ;
		}
		if ( (tam > 4) && (tam <= 8) ) {
			objeto.value = vr.substr(0,tam-4) + '-' + vr.substr( tam - 4, tam ) ;
		}
		if ( (tam >= 9) && (tam <= 10) ) {
			objeto.value = '(' + vr.substr(0,2) + ') ' + vr.substr(2,tam-6) + '-' + vr.substr(tam-4,tam) ;
		}
	}

}
//FormataTelefone(this,10,event);
function BrowserInfo() {
  this.name 		= navigator.appName;
  this.codename 	= navigator.appCodeName;
  this.version 		= navigator.appVersion.substring(0, 4);
  this.platform 	= navigator.platform;
  this.javaEnabled 	= navigator.javaEnabled();
  this.screenWidth 	= screen.width;
  this.screenHeight = screen.height;
}

function LimitaCampo(fld, e, tam) {
	var iBrw = new BrowserInfo();

	var IExp = ((iBrw.name == 'Netscape') ? 0 : 1)

	if (fld.value.length >= tam) {
		if (IExp) {
			e.returnValue = false;
		} else {
			if (e.which != 8) {
				e.preventDefault()
			}
		}
	}
}

function AtualizaTam(id, field_name, Tmax, form) {
	if (form != '') {
		var tam = document.forms[form].elements[field_name].value.length;
		if (tam == 0) {
			document.getElementById(id).innerHTML = "&nbsp;";
		} else {
			document.getElementById(id).innerHTML = tam + "/" + Tmax;
		}
	}
}

//Bloqueia o Backspace a não ser em inputs e textareas. Utilizar no onKeyDown
function bs_block() {
	var ev=window.event;
	if (ev.keyCode == 8 ) {

		var source = ev.srcElement
		var enable = !source.disabled
		var editable = !source.readOnly
		var textable = source.tagName == 'INPUT' && source.type.toUpperCase() == 'TEXT' || source.tagName == "TEXTAREA"
		if (textable && editable && enable) {
			return;
		}
		ev.keyCode = ev.returnValue = 0;
		return false
	}
	if (ev.altKey) {
		if (ev.keyCode==37) {
			ev.keyCode=ev.returnValue=0;
			return false;
		}
	}
}

//Retorna a posição horizontal da tela
function getScrollX() {
	if (typeof(window.pageYOffset)=='number') {//Netscape
		return window.pageXOffset;
	} else if (document.body && document.body.scrollLeft) {//DOM
		return document.body.scrollLeft;
	} else if (document.documentElement && document.documentElement.scrollLeft) {//IE
		return document.documentElement.scrollLeft;
	} else {
		return 0;
	}
}

//Retorna a posição vertical da tela
function getScrollY() {
	if (typeof(window.pageYOffset)=='number') {//Netscape
		return window.pageYOffset;
	} else if (document.body && document.body.scrollTop) {//DOM
		return document.body.scrollTop;
	} else if (document.documentElement && document.documentElement.scrollTop) {//IE
		return document.documentElement.scrollTop;
	} else {
		return 0;
	}
}
function retiraCaracter(field_name, form) {
	return str_replace('&','',document.forms[form].elements[field_name].value);
}
function str_replace(search, replace, subject) {
	var s  = subject;
	var ra = r instanceof Array, sa = s instanceof Array;
	var f  = [].concat(search);
	var r  = [].concat(replace);
	var i  = (s = [].concat(s)).length;
	var j  = 0;
    while (j = 0, i--) {
        if (s[i]) {
            while (s[i] = (s[i]+'').split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f) {};
        }
    }

    return sa ? s : s[0];
}
function retira_zero(ob,opcao) {
	var tamanho = document.getElementById(opcao).value.length;
	for (var i=0;i<=tamanho;i++) {
		var rg = document.getElementById(opcao).value.charAt(0);
		if (rg == '0') {
			ob.value = document.getElementById(opcao).value.substr(1,tamanho);
		}
	}
}

function insereMascaraEmCampoDeBuscaDeCidadao(idTipoBusca, idInputBusca) {
    var tipoBusca = $("#" + idTipoBusca);
    var inputBusca = $("#" + idInputBusca);

    tipoBusca.change(function () {
        var selecionado = tipoBusca.find(":selected").val().toLowerCase();

        inputBusca.val('');
        inputBusca.removeClass('soNumero');

        if (selecionado == 'cpf' || selecionado == 'rgi' || selecionado == 'cnh') {
            inputBusca.addClass('soNumero');
        }
    });

    inputBusca.keyup(function (e) {
        var ehNumerico = $(this).hasClass('soNumero');

        if (ehNumerico) {
            var txt = $(this).val();
            inputBusca.val(txt.replace(/[^0-9]/g, ""));
        }
    });
}