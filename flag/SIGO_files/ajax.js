/*$Id: ajax.js 23999 2013-11-22 17:04:58Z larissap $*/
/*
	Autor: Daniel Pires Martins
	E-mail: daniel@dpmart.eng.br
	Data de Criação: Julho/2006
	Data de Alteração: Julho/2007
	Descrição: Biblioteca AJAX
	Versão: 5.0
*/
/*	function CreateObject() {
		var obj = new Object();
		//var msxmlhttp = new Array('Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP','Microsoft.XMLHTTP');
		var msxmlhttp = new Array('Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP');

		for (var i = 0; i < msxmlhttp.length; i++) {
			try {
				obj = new ActiveXObject(msxmlhttp[i]);
				break;
			} 
			catch (e) {
				obj = null;
			}
		}
		
		if(!obj && typeof XMLHttpRequest != "undefined") {
			obj = new XMLHttpRequest();
		}
		
		return obj;
	} */
	
/*
	Autor: Daniel Cristaldo Martinez
	Anterior Substituido em funcao de reconhecimento de acentos
*/
function CreateObject() {
 var Ajax;
 try {Ajax = new XMLHttpRequest(); // XMLHttpRequest para browsers mais populares, como: Firefox, Safari, dentre outros.
 }catch(ee) {
    try {Ajax = new ActiveXObject("Msxml2.XMLHTTP"); // Para o IE da MS
    }catch(e) {
       try {Ajax = new ActiveXObject("Microsoft.XMLHTTP"); // Para o IE da MS

       }catch(e) {Ajax = false;
       }
    }
 }
 return Ajax;
}
	
	
	
	function Init_Ajax() {
		var glb_obj;
		glb_obj = CreateObject();
		this.SetOption 		= ""; 		/* Ex.: op=nome */
		this.SetUri 		= "";		/* functions.inc.php */
		this.SetMethod 		= "";		/* GET ou POST */
		this.isXML			= false;	/* bool se o retorno ser em XML */
		this.msg			= "";
		this.msgobj			= null;
		this.objFieldName   = Array();
		this.objValue		= Array();
		var MSGWait 		= "";		/* Mensagem para aguardar carregamento */
		var MSGObj			= null;		/* Objeto que exibir a mensagem enquanto aguarda retorno */
		var func			= "";		/* Funo que ser executada quando o processo retornar */
		var Par				= "";
      	var seturi          = "";
      	var objRetorno		= "";		/* Obejto de retorno do conteúdo */
      	var errorCount		= 0;		// Contador de erros
      	var url				= '';
		var SetMethodRet	= "";		/* GET ou POST */
		var ParametrosRet 	= "";
      
        this.antiCacheRand = function(aurl){
            var dt = new Date();
            if (aurl.indexOf("?") >= 0) {
                return aurl + "&" + encodeURI(Math.random() + "_" + dt.getTime());
            }
            else {
                return aurl + "?" + encodeURI(Math.random() + "_" + dt.getTime());
            }
        }
	  
		if( (this.SetMethod != "GET") && (this.SetMethod != "POST") ) {
			this.SetMethod 	= "GET";
			SetMethodRet 	= "GET";
		}

		this.Wait = function() {
			if(glb_obj.readyState == 4 || glb_obj.readyState == "complete") {
	            if(glb_obj.status == 200) {
	                
	            	if(MSGObj) {
						    MSGObj.innerHTML = "&nbsp;";
	                }
					if(func != '') {
						eval(func + "(glb_obj)");
					}
					
					if(objRetorno != '') {
						try {
							document.getElementById(objRetorno).innerHTML = glb_obj.responseText;
						}
						catch(e) {
							alert(e.description);
						}
					}
	            }
	            else {
					if(errorCount < 20) {
						glb_obj.open(SetMethodRet, url, true);
						if (SetMethodRet == "POST") {
							glb_obj.setRequestHeader("SetMethod", "POST " + seturi + " HTTP/1.1");
						}
						glb_obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=iso-8859-1");
						glb_obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						glb_obj.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
						glb_obj.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
						glb_obj.setRequestHeader("Pragma", "no-cache");
						glb_obj.send(ParametrosRet);
						errorCount++;
					}
					else {
						MSGObj.innerHTML = "Error Code: [" + glb_obj.status + "] - Erro ao carregar arquivo: " + seturi + "<br><a href='#' onClick='location.reload();' style='font-family:tahoma; font-size: 11px; color:#FF0000'>[ Atualizar ]</a>";
					}
	            }
			}
			else {
				if(MSGObj) {
					MSGObj.innerHTML = MSGWait;
					MSGObj.style.visibility = "visible";
					MSGObj.style.display = "block";
				}
			}	
		}

		this.Parametros = function()
		{
			var txt = "";
			var tot = this.objFieldName.length;
			if(tot > 0)
			{
				for(var i = 0; i < tot; i++)
				{
					txt += this.objFieldName[i] + "=" + this.objValue[i] + (i < (tot - 1) ? "&" : "" );
				}
			}
			ParametrosRet = txt;
			return txt;
		}
		
		this.setHeader = function() {
			if (this.SetMethod == "POST") {
				glb_obj.setRequestHeader("SetMethod", "POST " + this.SetUri + " HTTP/1.1");
			}
	
			glb_obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=iso-8859-1");
			glb_obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			glb_obj.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
			glb_obj.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
			glb_obj.setRequestHeader("Pragma", "no-cache");
	
			if(this.isXML) {
				if(glb_obj.overrideMimeType)
					glb_obj.overrideMimeType('text/xml');
			}
		}
		
		this.ExecuteObj = function(obj) {
			var txt;
			
			objRetorno = obj;
			
			MSGWait = this.msg;
			MSGObj  = this.msgobj;

			SetMethodRet = this.SetMethod;
			
			if (glb_obj != null) {
				if( (this.SetMethod != '') && (this.SetUri != '') ) {
					glb_obj.onreadystatechange = this.Wait;
					
					if(this.SetOption != '') {
						url = this.SetUri + "?" + this.SetOption;
					}
					else {
						url = this.SetUri;
					}
					seturi = this.SetUri;
					url = this.antiCacheRand(url);

					glb_obj.open(this.SetMethod, url, true);
					
					this.setHeader();
					
					glb_obj.send(this.Parametros());
				}
				else {
					alert("Parâmetros insuficientes para execução!");
				}
			}
			else {
				alert("Erro ao inicializar Objeto!");
			}
		}
		
		this.Execute = function(f)
		{
			var txt;
			func = f;
			
			MSGWait = this.msg;
			MSGObj  = this.msgobj;

			SetMethodRet = this.SetMethod;
			
			if (glb_obj != null) {
				if( (this.SetMethod != '') && (this.SetUri != '') ) {
					glb_obj.onreadystatechange = this.Wait;
					
					if(this.SetOption != '') {
						url = this.SetUri + "?" + this.SetOption;
					}
					else {
						url = this.SetUri;
					}
					
					seturi = this.SetUri;
					
					url = this.antiCacheRand(url);

					glb_obj.open(this.SetMethod, url, true);
					
					this.setHeader();
					
					glb_obj.send(this.Parametros());
				}
				else {
					alert("Parâmetros insuficientes para execução!");
				}
			}
			else {
				alert("Erro ao inicializar Objeto!");
			}
		}
	}
	
/**
 * classe TXMLParser
 * 
 * @since 14/06/2007
 * @author Fábio A. Santos
 */
function TXMLParser() {
	var XSLTransformedOutput = "";
}

/**
 * Cria um objeto do tipo DOM contendo os dados passados pela String
 */
TXMLParser.prototype.getDOMObject = function(XMLString, XSLPath) {
	if (window.ActiveXObject) { // IE
		var XMLObject = new ActiveXObject("MSXML2.DOMDocument");
		XMLObject.async = false;
		
		if(XSLPath) {
			var XSLDocument = new ActiveXObject("MSXML2.FreeThreadedDOMDocument");
			XSLDocument.async = false;
			XSLDocument.load(XSLPath);

			if(XSLDocument.parseError.errorCode != 0) {
				alert("Erro: " + XSLDocument.parseError.reason + "\nLinha: " + XSLDocument.parseError.line);
		
			} else {	
				var XSLTemplate = new ActiveXObject("MSXML2.XSLTemplate");
				XSLTemplate.stylesheet = XSLDocument;
				
				XMLObject.loadXML(XMLString);
				
				if(XMLObject.parseError.errorCode != 0) {
					alert("Erro: " + XMLObject.parseError.reason + "\nLinha: " + XMLObject.parseError.line);
					
				} else {
					var XSLProcessor = XSLTemplate.createProcessor();
					XSLProcessor.input = XMLObject;
					XSLProcessor.transform();
					this.XSLTransformedOutput = XSLProcessor.output;
				}
		
			} 
			
		} else {	
			XMLObject.loadXML(XMLString);
		}
		
	} else { // Mozilla, Firefox, Opera, etc.
		var parser = new DOMParser();
		var XMLObject = parser.parseFromString(XMLString, "text/xml");
		
	}
	
	return XMLObject.documentElement;
}

/**
 * Método parse default (Se quiser mudar as ações, sobrecarregue este méodo)
 */
TXMLParser.prototype.parse = function(XMLString) {
	this.parse(XMLString, null);
}

TXMLParser.prototype.parse = function(XMLString, XSLPath) {
	var xmlDocument = this.getDOMObject(XMLString, XSLPath);
	
	if(xmlDocument) {
		if(xmlDocument.nodeName == "erro") {
			alert("Erro: " + xmlDocument.childNodes[0].firstChild.nodeValue);
			return false;
	
		} else if(xmlDocument.nodeName == "alerta") {
			if(xmlDocument.childNodes[0].firstChild.nodeValue != "undefined") {
				alert(xmlDocument.childNodes[0].firstChild.nodeValue);
		
			}
			
			this.fillDocument(xmlDocument.childNodes[1].childNodes);
	
		} else if(xmlDocument.nodeName == "results") {	
			return this.XSLTransformedOutput;
			
		} else {
			this.fillDocument(xmlDocument.childNodes);
			return true;
		
		}
	
	}
	
	return false;
}

TXMLParser.prototype.fillDocument = function(childNodes) {
	for(var i = 0; i < childNodes.length; i++) {
		if(childNodes[i].firstChild && (childNodes[i].firstChild.nodeName == "#text")) {
			var object = document.getElementById(childNodes[i].nodeName);
			if(object != null) {
				if((object.type == "text") || (object.type == "textarea") || (object.type == "hidden")) {
					object.value = childNodes[i].firstChild.nodeValue;
				} else if(object.type == "select-one") {
					for(j = 0; j < object.options.length; j++) {
						if(object.options[j].value == childNodes[i].firstChild.nodeValue) {
							object.options[j].selected = true;
						}
					}
				} else {
					object.innerHTML = childNodes[i].firstChild.nodeValue;
				}
			}
		} else if(childNodes[i].firstChild && (childNodes[i].firstChild.nodeName != "#text")) {
			this.fillDocument(childNodes.childNodes);
		}
	}
}