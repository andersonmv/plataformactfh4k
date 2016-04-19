/*$Id: objfuncoes.js 23965 2013-11-20 15:44:43Z leandroe $*/

//conta inputs e selects com o mesmo nome ex: nome[]
function total_objetos(form_nome,obj_nome) {
  var f=document.getElementById(form_nome);
  var o,i=0,x=0;
  while(x<f.length) {
	  o=f.elements[x];
	  if(o.id==obj_nome)i++;
	  x++;
  }
  return i;
}

function total_objetos_tag(form_nome,tag,obj_nome) {
  var f=document.getElementById(form_nome);
  var o,i=0,x=0,q=0,m;
  m=f.getElementsByTagName(tag);
  q=m.length;
  while(x<q) {
	  o=m[x];
	  if(o.id==obj_nome)i++;
	  x++;
  }
  return i;
}


//retorna o elemento obj_indice dos inputs e selects com mesmo nome
function objeto(form_nome,obj_nome,obj_indice) {
  var f=document.getElementById(form_nome);var o,i=0,q=f.length;
  var x=0;while(x<q) {
	  o=f.elements[x];
	  if(o.id==obj_nome) {
		 if(i==obj_indice)return o;
		 i++;
	  }
	  x++;
  }
  return null;
}



//retorna o elemento obj_indice com a tag indicada com mesmo nome
function objeto_tag(form_nome,obj_nome,tag,obj_indice) {
  var f=document.getElementById(form_nome);var o,i=0,q=0,m;
  m=f.getElementsByTagName(tag);
  q=m.length;
  var x=0;
  while(x<q) {
	  o=m[x];
	  if(o.id==obj_nome) {
		 if(i==obj_indice) {
			return o;
		 }
		 i++;
	  }
	  x++;
  }
  return null;
}


function objeto_nome(nm,id) {
	var l=document.getElementsByName(nm);
	return l[id];
}

//limpar todos os itens do drop menos o primeiro
function limpa_drop(obj) {
  while(obj.length>1) {obj.remove(1);}
}

//limpar todos os itens do drop menos o primeiro
function total_limpa_drop(obj) {
  while(obj.length>0) {obj.remove(0);}
}

//inclui os itens de uma matriz no drop
function preencher_drop(wd,obj,valores,rotulos) {
  var op,x=0,y=valores.length;
  if(rotulos[x]!='SELECIONE') {
	  op = wd.document.createElement("option");
	  op.text = 'SELECIONE';
	  op.value = '';
	  obj.options.add(op);
  }
  while(x<y) {
	  op = wd.document.createElement("option");
	  op.text = rotulos[x];
		if(valores[x]=='disabled') {
  	  op.value = '';
  	  op.disabled=true;
      obj.options.add(op);

		}else{
  	  op.value = valores[x];
      obj.options.add(op);
		}
	  x++;
  }
}

//inclui os itens de uma matriz no drop
function preencher_opcional_drop(wd,obj,valores,rotulos) {
  var op,opi,x=0,y=valores.length;
  opi = wd.document.createElement("option");
  opi.text = 'Carregando...';
  opi.value = '';
  obj.options.add(opi);
  while(x<y) {
	  op = wd.document.createElement("option");
	  op.text = rotulos[x];
  	  op.value = valores[x];
      obj.options.add(op);
	  x++;
  }
  obj.options[0].text='';
}


//informe o valor do option a ser selecionado
function seleciona_option(obj,valor) {
  var x=0,op;
  while(x<obj.length) {
	op=obj.options[x];
	if(op.value==valor) {
	  obj.selectedIndex=x;
	  return true;
	}
    x++;
  }
  return false;
}

//desaviva os objetos cujos noves estao na matriz mt
function desativar_campos(mt) {
  var x=0,o;
  while(x<mt.length) {
	o=document.getElementById(mt[x]);
	if(o!=null) {o.disabled=true;}
    x++ ;
  }
}

function ativar_campos(mt) {
  var x=0,o;
  while(x<mt.length) {
	o=document.getElementById(mt[x]);
	if(o!=null) {o.disabled=false;}
    x++ ;
  }
}

function form_get(nm, callback) {
  var l='',ll='',s='',f=document.getElementById(nm),o,x,v='',n,mm;
  if(typeof f  === 'undefined' || f == null) {
  	e = new Array();
  } else {
  	e = f.elements;
  }
  for(x=0;x<e.length;x++) {
	  o=e[x];
    if(o.tagName=='INPUT' && (o.type=='checkbox' || o.type=='radio') ) {
		if(o.checked==true) {
		  if(l!='') {v='&';}
		  if(o.id=='')n=o.name;
		  else  n=o.id;
		  mm=o.value;
		  ll=ll+v+mm;
		  l=l+v+n+'='+URLencode(mm);
		}
	 }else{
		  if(l!='')v='&';
		  if(o.id=='')n=o.name;
		  else  n=o.id;

			if(o.tagName=='LABEL')s=o.innerHTML;
			else s=o.value;
			ll=ll+v+s;
			l=l+v+n+'='+URLencode(s);
	 }
  }
	e=document.getElementsByTagName('LABEL');
  for(x=0;x<e.length;x++) {
	    o=e[x];
		  if(l!='')v='&';
		  if(o.id=='')n=o.name;
		  else  n=o.id;
			s=o.innerHTML;
			ll=ll+v+s;
			l=l+v+n+'='+URLencode(s);
  }
  return l;
}



function form_array(nm,mt) {
  var l='',f=document.getElementById(nm),o,x,v='',n,lt=','+mt.toString()+',',nm;
  lt=lt.toUpperCase();
  if(typeof f  === 'undefined' || f == null) {
    e = new Array();
    alert("nao encontrado:"+nm);
  } else {
    e = f.elements;
  }
  for(x=0;x<e.length;x++) {
	 o=e[x];
	 nm=o.id;
	 if(nm.indexOf('[]')!=-1)nm=','+nm.substr(0,nm.length-2).toUpperCase()+',';
	 else nm=','+nm.toUpperCase()+',';
	 if(lt.indexOf(nm)!=-1 || lt.indexOf(nm)!=-1) {
		 if(o.tagName=='INPUT' && o.type=='checkbox') {
			if(o.checked==true) {
			  if(l!='') {v='&';}
			  if(o.id=='')n=o.name;
			  else  n=o.id;
			  l=l+v+n+'='+o.value;
			}
		 }else{
			  if(l!='')v='&';
			  if(o.id=='')n=o.name;
			  else  n=o.id;
			  l=l+v+n+'='+o.value;
		 }
	 }
  }
  return l;
}


function URLencode(st) {
	var x,ch,rt,lt;
	lt='';
	if(st) {
	for(x=0;x<st.length;x++) {
		ch=st.charAt(x);
		if(st.charCodeAt(x)==13)rt="%0D";
		else if(st.charCodeAt(x)==10)rt="%0A";
		else{
			switch(ch) {
				case "&": rt="%26";break;
				case "+": rt="%2b";break;
				case "\\": rt="%5c";break;
				case "^":rt="%5e";break;
				case "_":rt="%5f";break;
				case "`":rt="%60";break;


				case "~":rt="%7e";break;
				case "¡":rt="%a1";break;
				case "¢":rt="%a2";break;
				case "£":rt="%a3";break;
				case "¤":rt="%a4";break;
				case "¥":rt="%a5";break;
				case "¦":rt="%a6";break;
				case "§":rt="%a7";break;
				case "¨":rt="%a8";break;
				case "©":rt="%a9";break;
				case "ª":rt="%aa";break;
				case "«":rt="%ab";break;
				case "¬":rt="%ac";break;
				case "­":rt="%ad";break;
				case "®":rt="%ae";break;
				case "¯":rt="%af";break;
				case "°":rt="%b0";break;
				case "±":rt="%b1";break;
				case "²":rt="%b2";break;
				case "³":rt="%b3";break;
				case "´":rt="%b4";break;
				case "µ":rt="%b5";break;
				case "¶":rt="%b6";break;
				case "·":rt="%b7";break;
				case "¸":rt="%b8";break;
				case "¹":rt="%b9";break;
				case "º":rt="%ba";break;
				case "»":rt="%bb";break;
				case "¼":rt="%bc";break;
				case "½":rt="%bd";break;
				case "¾":rt="%be";break;
				case "¿":rt="%bf";break;
				case "À":rt="%c0";break;
				case "Á":rt="%c1";break;
				case "Â":rt="%c2";break;
				case "Ã":rt="%c3";break;
				case "Ä":rt="%c4";break;
				case "Å":rt="%c5";break;
				case "Æ":rt="%c6";break;
				case "Ç":rt="%c7";break;
				case "È":rt="%c8";break;
				case "É":rt="%c9";break;
				case "Ê":rt="%ca";break;
				case "Ë":rt="%cb";break;
				case "Ì":rt="%cc";break;
				case "Í":rt="%cd";break;
				case "Î":rt="%ce";break;
				case "Ï":rt="%cf";break;
				case "Ð":rt="%d0";break;
				case "Ñ":rt="%d1";break;
				case "Ò":rt="%d2";break;
				case "Ó":rt="%d3";break;
				case "Ô":rt="%d4";break;
				case "Õ":rt="%d5";break;
				case "Ö":rt="%d6";break;
				case "×":rt="%d7";break;
				case "Ø":rt="%d8";break;
				case "Ù":rt="%d9";break;
				case "Ú":rt="%da";break;
				case "Û":rt="%db";break;
				case "Ü":rt="%dc";break;
				case "Ý":rt="%dd";break;
				case "Þ":rt="%de";break;
				case "ß":rt="%df";break;
				case "à":rt="%e0";break;
				case "á":rt="%e1";break;
				case "â":rt="%e2";break;
				case "ã":rt="%e3";break;
				case "ä":rt="%e4";break;
				case "å":rt="%e5";break;
				case "æ":rt="%e6";break;
				case "ç":rt="%e7";break;
				case "è":rt="%e8";break;
				case "é":rt="%e9";break;
				case "ê":rt="%ea";break;
				case "ë":rt="%eb";break;
				case "ì":rt="%ec";break;
				case "í":rt="%ed";break;
				case "î":rt="%ee";break;
				case "ï":rt="%ef";break;
				case "ð":rt="%f0";break;
				case "ñ":rt="%f1";break;
				case "ò":rt="%f2";break;
				case "ó":rt="%f3";break;
				case "ô":rt="%f4";break;
				case "õ":rt="%f5";break;
				case "ö":rt="%f6";break;
				case "÷":rt="%f7";break;
				case "ø":rt="%f8";break;
				case "ù":rt="%f9";break;
				case "ú":rt="%fa";break;
				case "û":rt="%fb";break;
				case "ü":rt="%fc";break;
				case "ý":rt="%fd";break;
				case "þ":rt="%fe";break;
				case "ÿ":rt="%ff";break;
				default: rt=ch;
			}
		}
		lt=lt+rt;
	}
	}
	return lt;
}


function URLdecode(st) {
	var x,ch,rt,lt;
	lt='';
	if(st) {
	for(x=0;x<st.length;x++) {
		ch=st.substring(x,x+3);
		if(ch =="%0D")rt="\r";
		else if(ch == "%0A")rt="\n";
		else if(st.charAt(x) == "+")rt=" ";
		else{
			switch(ch) {
				case "%26": rt="&";break;
				case "%2B": rt="+";break;
				case "%5C": rt="\\";break;
				case "%5E":rt="^";break;
				case "%5F":rt="_";break;
				case "%60":rt="`";break;


				case "%7E":rt="~";break;
				case "%A1":rt="¡";break;
				case "%A2":rt="¢";break;
				case "%A3":rt="£";break;
				case "%A4":rt="¤";break;
				case "%A5":rt="¥";break;
				case "%A6":rt="¦";break;
				case "%A7":rt="§";break;
				case "%A8":rt="¨";break;
				case "%A9":rt="©";break;
				case "%AA":rt="ª";break;
				case "%AB":rt="«";break;
				case "%AC":rt="¬";break;
				case "%AD":rt="­";break;
				case "%AE":rt="®";break;
				case "%AF":rt="¯";break;
				case "%B0":rt="°";break;
				case "%B1":rt="±";break;
				case "%B2":rt="²";break;
				case "%B3":rt="³";break;
				case "%B4":rt="´";break;
				case "%B5":rt="µ";break;
				case "%B6":rt="¶";break;
				case "%B7":rt="·";break;
				case "%B8":rt="¸";break;
				case "%B9":rt="¹";break;
				case "%BA":rt="º";break;
				case "%BB":rt="»";break;
				case "%BC":rt="¼";break;
				case "%BD":rt="½";break;
				case "%BE":rt="¾";break;
				case "%BF":rt="¿";break;
				case "%C0":rt="À";break;
				case "%C1":rt="Á";break;
				case "%C2":rt="Â";break;
				case "%C3":rt="Ã";break;
				case "%C4":rt="Ä";break;
				case "%C5":rt="Å";break;
				case "%C6":rt="Æ";break;
				case "%C7":rt="Ç";break;
				case "%C8":rt="È";break;
				case "%C9":rt="É";break;
				case "%CA":rt="Ê";break;
				case "%CB":rt="Ë";break;
				case "%CC":rt="Ì";break;
				case "%CD":rt="Í";break;
				case "%CE":rt="Î";break;
				case "%CF":rt="Ï";break;
				case "%D0":rt="Ð";break;
				case "%D1":rt="Ñ";break;
				case "%D2":rt="Ò";break;
				case "%D3":rt="Ó";break;
				case "%D4":rt="Ô";break;
				case "%D5":rt="Õ";break;
				case "%D6":rt="Ö";break;
				case "%D7":rt="×";break;
				case "%D8":rt="Ø";break;
				case "%D9":rt="Ù";break;
				case "%DA":rt="Ú";break;
				case "%DB":rt="Û";break;
				case "%DC":rt="Ü";break;
				case "%DD":rt="Ý";break;
				case "%DE":rt="Þ";break;
				case "%DF":rt="ß";break;
				case "%E0":rt="à";break;
				case "%E1":rt="á";break;
				case "%E2":rt="â";break;
				case "%E3":rt="ã";break;
				case "%E4":rt="ä";break;
				case "%E5":rt="å";break;
				case "%E6":rt="æ";break;
				case "%E7":rt="ç";break;
				case "%E8":rt="è";break;
				case "%E9":rt="é";break;
				case "%EA":rt="ê";break;
				case "%EB":rt="ë";break;
				case "%EC":rt="ì";break;
				case "%ED":rt="í";break;
				case "%EE":rt="î";break;
				case "%EF":rt="ï";break;
				case "%F0":rt="ð";break;
				case "%F1":rt="ñ";break;
				case "%F2":rt="ò";break;
				case "%F3":rt="ó";break;
				case "%F4":rt="ô";break;
				case "%F5":rt="õ";break;
				case "%F6":rt="ö";break;
				case "%F7":rt="÷";break;
				case "%F8":rt="ø";break;
				case "%F9":rt="ù";break;
				case "%FA":rt="ú";break;
				case "%FB":rt="û";break;
				case "%FC":rt="ü";break;
				case "%FD":rt="ý";break;
				case "%FE":rt="þ";break;
				case "%FF":rt="ÿ";break;
				default: rt=st.charAt(x);
			}
		}
		if(rt != st.charAt(x) && st.charAt(x) != "+")
			x+=2;
		lt=lt+rt;
	}
	}

	return lt;
}

function existe_valor(valor,matriz_objeto) {
	var mt=document.getElementsByName(matriz_objeto);
	var q=mt.length;
	for(x=0;x<q;x++) {
		if (alltrim(mt[x].value)==alltrim(valor)) {
			 return true;
		}
	}
	return false;
}


function preencheu_algo(lstObj) {
	var mtobj=lstObj.split(","),x;
	var retorno=false;
	for(x=0;x<mtobj.length;x++) {
		if(alltrim(objid(mtobj[x]).value)!=='') {
			retorno=true;
		}
	}
	return retorno;
}
