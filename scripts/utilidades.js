String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

Date.prototype.defaultView = function () {
    var dd = this.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = this.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = this.getFullYear();
    return String(mm + "\/" + dd + "\/" + yyyy)
}

Date.prototype.esMXFormat = function () {
    try{
        var dd = this.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = this.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yyyy = this.getFullYear();
        return String(dd + "\/" + mm + "\/" + yyyy)
    }
    catch (e) { return ""; }
}

Date.prototype.esUSFormat = function () {
    try {
        var dd = this.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = this.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yyyy = this.getFullYear();
        return String(yyyy + "-" + mm + "-" + dd)
    }
    catch (e) { return ""; }
}

Date.prototype.esMXFormatLarge = function () {
    try {
        var dd = this.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = this.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yyyy = this.getFullYear();
        var hours = this.getHours();
        var mins = this.getMinutes();
        var seconds = this.getSeconds();

        return String(dd + "\/" + mm + "\/" + yyyy + "   " + ((hours > 9) ? hours : "0" + hours) + ":" + ((mins > 9) ? mins : "0" + mins))
    }
    catch (e) { return ""; }
}

function ValidaSession(){
	
	if(getCookie("escuderia-rememberme") == "" && sessionStorage.claveapi == undefined){
		window.location = siteurl;
	}
}

function cargaHTML(contendor, url, name, callback) {

	var rand = Math.floor((Math.random() * 10000000) + 1);
	$(contendor).attr("name", name);
	$(contendor).load(url + "?rand=" + rand, callback);
}


function esAdmin() {
	if (sessionStorage.getItem("es_admin") == 1) {
		return true;
	} else {
		return false;

	}

}

function CargaAnioAutos(anio) {
	var options = "";

	options += '<option value="0" disabled selected>Año</option>';

	for ( i = (new Date().getFullYear() + 1); i > 1950; i--) {

		options += '<option value="' + i + '" ' + ((i == anio) ? 'selected="selected"' : '' ) + ' >' + i + '</option>';

	}

	return options;

}

function CargaSelectEstados(control) {

	postrequest("estados/listar?rand=" + Math.random(), {
		"estatus" : "1"
	}, function(data) {

		$(control).append('<option value="0" disabled selected>Estado</option>');
		for (i in data) {

			$(control).append('<option value="' + data[i].id + '">' + data[i].nombre + '</option>');
		}
		$(control).material_select();
		
	});

}

function CargaSelectMunicipios(control, id_estado) {

	$("#cbCiudadAuto").material_select("destroy");
	postrequest("municipios/listar?rand=" + Math.random(), {
		"estatus" : "1",
		"id_estado" : id_estado
	}, function(data) {
		if (data.mensaje == "OK") {
			return;
		}

		$(control).html("");
		for (i in data) {

			$(control).append('<option value="' + data[i].id + '">' + data[i].nombre + '</option>');
		}
		$("#cbCiudadAuto").material_select();
		
	});

}

function CargaSelectMarcas(control, id_marca, estatus) {

	postrequest("marcas/listar?rand=" + Math.random(), {
		"estatus" : estatus
	}, function(data) {
		$(control).html("");
		$(control).append('<option value="0" disabled selected>Marca</option>');
		for (i in data) {

			$(control).append('<option value="' + data[i].id + '" ' + ((data[i].id == id_marca) ? 'selected="selected"' : '' ) + ' >' + data[i].descripcion + '</option>');
			
		}
		$(control).material_select();
	});
	

}

function CargaSelectModelos(control, control_marca, id_modelo, estatus) {

	$('#cmbModelos').material_select("destroy");
	$('#cbModeloAuto').material_select("destroy");
	postrequest("modelos/listar?rand=" + Math.random(), {
		"estatus" : estatus,
		"id_marca" : $(control_marca).val()
	}, function(data) {

		$(control).html("");
		$(control).append('<option value="0" disabled selected>Modelo</option>');
		if (data.mensaje != "OK") {
			for (i in data) {

				$(control).append('<option value="' + data[i].id + '" ' + ((data[i].id == id_modelo) ? 'selected="selected"' : '' ) + ' >' + data[i].descripcion + '</option>');
			}
			$('#cmbModelos').material_select();
			$('#cbModeloAuto').material_select();
		}

		
	
	});


}

function CargaSelectTipoTransmision(control, id_transmision, estatus) {
	postrequest("transmisiones/listar?rand=" + Math.random(), {
		"estatus" : estatus
	}, function(data) {

		for (i in data) {

			$(control).append('<option value="' + data[i].id + '" ' + ((data[i].id == id_transmision) ? 'selected="selected"' : '' ) + ' >' + data[i].descripcion + '</option>');
		}
		$(control).material_select();

	});

}

function CargaSelectFeatures(control, features, estatus) {

	postrequest("features/listar?rand=" + Math.random(), {
		"estatus" : estatus
	}, function(data) {

		$(control).append('<option value="0" disabled selected>SELECCIONA</option>');

		for (i in data) {

			$(control).append('<option value="' + data[i].id + '" >' + data[i].descripcion + '</option>');

		}
		$(control).material_select();
	});

}

function CargaSelectColores(control, id_color, estatus) {

	$(control).append('<option value="0" disabled selected>SELECCIONA</option>');
	postrequest("colores/listar?rand=" + Math.random(), {
		"estatus" : estatus
	}, function(data) {

		for (i in data) {

			$(control).append('<option value="' + data[i].id + '" ' + ((data[i].id == id_color) ? 'selected="selected"' : '' ) + ' >' + data[i].descripcion + '</option>');
		}
		$(control).material_select();

	});

}

function getUrlVars() {
	var vars = [],
	    hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {

	var rememberme = getCookie("escuderia-rememberme");
	if (rememberme != "") {
		postrequest("usuarios/rememberme", {
			"claveapi" : rememberme
		}, function(data) {

			if (data.valido) {

				sessionStorage.setItem('nombre', data["nombre"] + " " + data["appaterno"] + " " + data["apmaterno"]);
				sessionStorage.setItem('correo', data["correo"]);
				sessionStorage.setItem('publico', data["publico"]);
				sessionStorage.setItem('es_admin', data["esadmin"]);
				sessionStorage.setItem('claveApi', data["claveApi"]);
				setCookie("escuderia-rememberme", data["claveApi"], true);

				window.location.href = "main.php";

			}

		});

	}
}

function cargaAutosPorSubasta(subastaID, controlid, tiposubasta) {
	// debugger;
	$(controlid).html("");
	postrequest("autos/subasta", {
		"idsubasta" : subastaID
	}, function(data) {
		debugger;
		$("#divDetalleAuto").hide();
		for (var val in data) {
			$(controlid).append(regresaRenglonVenta(data[val], subastaID));
			if(tiposubasta == 2){
				$(".divUltimaOferta").remove();
			}

		}
		if(tiposubasta){
			$(".divBtnPujar").show();
			if(tiposubasta == 1){
				$(".divVerOfertas").show()
			}
		}


		

	});

}

function regresaRenglonVenta(item, subastaID) {


	
	 
	var	renglon = '    <div class="searchItem">';
		renglon += '      <div class="card">';
		renglon += '        <div class="card-image">';
		renglon += '          <img attr-id="' + item.idAuto + '" width="100px" onclick="VerDetalleAuto(this);" src="' + siteurl + 'uploads/' + item.foto + '" onerror="imgError(this)"; />';
		renglon += '          <span class="card-title">' + item.marca + ' - ' + item.modelo + '</span>';
		      // if(sessionStorage["es_admin"] == 1 && getUrlVars()["accion"] != "subasta"){
		      // renglon += '    <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>';
		      // }
		renglon += '        </div>';
		renglon += '      <div class="card-content">';
		// renglon += '        <label>' + item.marca + ' - ' + item.modelo + '</label>';
		renglon += '    <div>';
		renglon += '      <label>Modelo: </label>';
		renglon += '      <label>' + item.anio + '</label>';
		renglon += '    </div>';
		renglon += '    <div>';
		renglon += '      <label>Color: </label>';
		renglon += '      <label>' + item.color + '</label>';
		renglon += '    </div>';
		renglon += '    <div>';
		renglon += '      <label>Kilometraje: </label>';
		renglon += '      <label>' + Number(item.km).formatMoney(0, '.', ',') + '</label>';
		renglon += '    </div>';
		renglon += '    <div>';
		renglon += '      <label>Precio: </label>';
		renglon += '      <label>' +"$" +Number(item.precio).formatMoney(2, '.', ',') + '</label>';
		renglon += '    </div>';
		renglon += '    <div>';
		renglon += '      <label>Descripción: </label>';
		renglon += '      <label>' + item.descripcion + '</label>';
		renglon += '    </div>';
		renglon += '    <div>';
		renglon += '      <label>Total de ofertas: </label>';
		renglon += '      <label>' + item.total_ofertas + '</label>';
		renglon += '    </div>';

		if(item.idTipoSubasta == 1){
			renglon += '    <div class="divUltimaOferta">';
			renglon += '      <label>Última oferta: </label>';
			renglon += '      <label>$' + Number(item.oferta).formatMoney(2, '.', ',') + '</label>';
			renglon += '    </div>';
			renglon += '    </div>';
		}
		debugger;
	  	if(subastaID > 0){
		  	if(item.estatus_subasta == "ACTIVA"){
				renglon += '<div class="card-action">';
				renglon += '    <div class="divBtnPujar" style="display:none">';
				renglon += '      <div id="btnPujar" class="btnPujar waves-effect waves-light btn" attr-incremento="'+item.incremento+'" attr-tiposubasta="'+item.idTipoSubasta+'" attr-ultimaoferta="'+ ((item.idTipoSubasta == "1")? item.oferta : 0 )+'" onclick=PujarAuto('+item.idAuto+','+subastaID+','+Number(item.precio)+',this);>Ofertar</div>';
				renglon += '    </div>';
			}
      	}
		renglon += '  </div>';
	return renglon;

}

function PujarAuto(idAuto, idSubasta, precio, o){
	
	
	postrequest("autos/subasta", {
		"idsubasta" : idSubasta, "autoid": idAuto
	}, function(data) {
		debugger;
	
	
		$("#btnGuardarOferta").attr("attr-subastaid", idSubasta);
		$("#btnGuardarOferta").attr("attr-idauto", idAuto);
		$("#btnGuardarOferta").attr("attr-precio", precio);
		$("#btnGuardarOferta").attr("attr-tiposubasta", data[0].idTipoSubasta);
		$("#btnGuardarOferta").attr("attr-incremento", data[0].incremento);
		if( data[0].idTipoSubasta == 1){
			$("#btnGuardarOferta").attr("attr-ultimaoferta", data[0].oferta);
		}else{
			$("#btnGuardarOferta").attr("attr-ultimaoferta", "0");
		}
		$(".modal-puja-precio").html("Precio inicial: $" +Number(precio).formatMoney(2, '.', ','));
		$(".modal-puja-incremento").html("Incremento: $" +Number(data[0].incremento).formatMoney(2, '.', ','));
		
		if(data[0].idTipoSubasta == "1")
		{
			$(".modal-puja-ultimaoferta").html("Última oferta: $" +Number(data[0].oferta).formatMoney(2, '.', ','));
		}else{
			$(".modal-puja-ultimaoferta").hide();
		}
			$('#modalPuja').modal("open");

	}, function(data){
		Materialize.toast("Ocurrió un error al cargar la información del auto", 4000);
	});

	
	$("#txtOferta").keydown(function(e){
			
			if(e.keyCode == 8 || e.keyCode == 46){
				return true;
			}else if(e.keyCode < 48){
			 	e.preventDefault();
			 	return false;

			 }
			 else if(e.keyCode > 58 && e.keyCode < 96){
			 	e.preventDefault();
			 	return false;
			 }
			 else if (e.keyCode > 105){
            	e.preventDefault();
            	return false;
            }
	});
	
}

function GuardarOferta(o){

	if(ValidaOferta(o)){
		postrequest("pujas/ofertar", 
			{"id_subasta" : $(o).attr("attr-subastaid") , "id_auto": $(o).attr("attr-idauto"), "claveapi":sessionStorage["claveapi"], "oferta":$("#txtOferta").val() }, 
			function(data) {
				debugger;
				Materialize.toast(data, 5000);
				ConsultaOfertasXUsuarioSubasta($(o).attr("attr-subastaid"));
				debugger;
				cargaAutosPorSubasta($(o).attr("attr-subastaid"), "#divContenidoSubasta", $(o).attr("attr-tiposubasta")); 
				$('#modalPuja').modal("close");
			},function(){
				Materialize.toast("Ocurrió un error al registrar su oferta", 5000);
			});
	}else{

		Materialize.toast("Oferta inválida", 5000);
	}
	

}

function ValidaOferta(o){

	debugger;
	var precio = Number($(o).attr("attr-precio"));
	var incremento = Number($(o).attr("attr-incremento"));
	var ultimaoferta = Number($(o).attr("attr-ultimaoferta"));



	try{
		Number($("#txtOferta").val())
	}catch(err){
		return false;
	}
	var oferta = Number($("#txtOferta").val());
	
	if($(o).attr("attr-ultimaoferta") == undefined){
		ultimaoferta = oferta -1;
	}

	if(oferta > precio && oferta%incremento == 0 && oferta > ultimaoferta) {
		return true;
	}else{
		return false;
	}
}


	
function EditarAuto(o){

	 var subastaid = $(o).attr("attr-subastaid");
	 var autoid = $(o).attr("attr-id");

	 $("#divListaAutos").load("views/main/admin/altaautos.html?rand=" + Math.random(), function() {

	 	$("#btnGuardaAuto").hide();
	 	$("#bntActualizaAuto").show();
	 	//debugger;
		$("#divRegistroAutos").show();
		$("#divSubastaNombre").html("");
		$("#divSubastaNombre").show();
		$("#divSubastaNombre").css("display", "");
		$("#btnGuardaAuto").attr("attr-nombresubasta", "");
		$("#btnGuardaAuto").attr("attr-subastaid", subastaid);
		$("#btnGuardaAuto").attr("attr-autoid", autoid);
		CargaFuncionesRegistroAuto();

		postrequest("autos/info",{ "autoid":autoid}, function(data){
			$("#cbMarcaAuto").material_select("destroy");
			$("#cbMarcaAuto").val(data.marcaid);
			$("#cbMarcaAuto").material_select();
			$("#cbMarcaAuto").change();
			

			$("#cbColorAuto").material_select("destroy");
			$("#cbColorAuto").val(data.colorid);
			$("#cbColorAuto").material_select();

			$("#cbAnioAuto").material_select("destroy");
			$("#cbAnioAuto").val(data.anio);
			$("#cbAnioAuto").material_select();

			
			$("#cbKMAuto").val(data.km);
			$("#precioAuto").val(data.precio);

			$("#cbTipoTransmisionAuto").material_select("destroy");
			$("#cbTipoTransmisionAuto").val(data.transmisionid);
			$("#cbTipoTransmisionAuto").material_select();

			$("#cbEstadoAuto").material_select("destroy");
			$("#cbEstadoAuto").val(data.estadoid);
			$("#cbEstadoAuto").material_select();
			$("#cbEstadoAuto").change();

		

			var features = data.caracteristicasids.split(",");
			for(var f in features){

				$("#cbFeaturesAutos").material_select("destroy");
				$("#cbFeaturesAutos").val(features[f]);
				$("#cbFeaturesAutos").material_select();
				$("#btnAddFeature").click();
					
			}

			$("#txtaDescripcionAuto").val(data.descripcion);

			$("#btnGuardaAuto").attr("attr-id", autoid);
			$("#btnGuardaAuto").attr("attr-subastaid",subastaid);

			$("#btnGuardaAuto").click = null;

			$("#bntActualizaAuto").click(function (){
		
				GuardaDetalleAuto("actualiza");
			});


			$("#cbModeloAuto").material_select("destroy");
			$("#cbModeloAuto").val(data.modeloid);
			$("#cbModeloAuto").material_select();

			$("#cbCiudadAuto").material_select("destroy");
			$("#cbCiudadAuto").val(data.ciudadid);
			$("#cbCiudadAuto").material_select();


		});


	});
}

function LimpiaNuevoAuto(){

		$("#precioAuto").val("");
		$("#cbMarcaAuto").material_select("destroy");
		$("#cbMarcaAuto").material_select();
		$("#cbModeloAuto").material_select("destroy");
		$("#cbModeloAuto").material_select();
		$("#cbColorAuto").material_select("destroy");
		$("#cbColorAuto").material_select();
		$("#cbAnioAuto").val("");
		$("#cbKMAuto").val("");
		$("#cbTipoTransmisionAuto").material_select("destroy");
		$("#cbTipoTransmisionAuto").material_select();
		$("#cbEstadoAuto").material_select("destroy");
		$("#cbEstadoAuto").material_select();
		$("#cbCiudadAuto").material_select("destroy");
		$("#cbCiudadAuto").material_select();
		$("#txtaDescripcionAuto").val("");
}


function GuardaDetalleAuto(opc){

	//debugger;
		oAuto = new Autos();
		oAuto.idAuto = $("#btnGuardaAuto").attr("attr-idsubasta");
		if(parseInt($("#btnGuardaAuto").attr("attr-subastaid")) > 0){
			oAuto.enVenta  = 0;
			oAuto.idSubasta = $("#btnGuardaAuto").attr("attr-subastaid");
		}else{
			oAuto.enVenta = 1;
			oAuto.idSubasta = 0;

		}
		oAuto.precio = $("#precioAuto").val().trim();
		oAuto.marca = $("#cbMarcaAuto").val();
		oAuto.modelo = $("#cbModeloAuto").val();
		oAuto.color = $("#cbColorAuto").val();
		oAuto.anio = $("#cbAnioAuto").val().trim();
		oAuto.km = $("#cbKMAuto").val().trim();
		oAuto.transmision = $("#cbTipoTransmisionAuto").val();
		oAuto.estado = $("#cbEstadoAuto").val();
		oAuto.ciudad = $("#cbCiudadAuto").val();
		oAuto.descripcion = JSON.stringify($("#txtaDescripcionAuto").val());
		oAuto.estatus = 1;
		oAuto.publicado = 1;
		oAuto.features = [];
		oAuto.fotos = [];

		if(opc =="actualiza"){

			oAuto.idAuto = Number($("#btnGuardaAuto").attr("attr-autoid"));
		}
		

		$.each( $(".feature"), function( key, value ) {
			  oAuto.features.push( $(value).attr("attr-featureid"));
		});

		$.each( $(".fotosAuto"), function( key, value ) {
			  oAuto.fotos.push( $(value).attr("attr-id"));
		});
		
		
		if (validaCamposAltaAutos(oAuto)){
			
			postrequest("autos/"+opc, oAuto, function(data){

				
				if(data > 0){
					
					Materialize.toast('Los datos se guardaron correctamente' , 4000);
					//$("#divRegistroAutos").dialog("close"); 
					
				}else{
					
						Materialize.toast('Ocurrió un error al guardar' , 4000);

				}
			}, function(data){

				Materialize.toast('Ocurrió un error al guardar' , 4000);
			});

		}

}

function VerDetalleAuto(o) {
	debugger;
	var subastaid = $(o).attr("attr-subastaid");
	var autoid = $(o).attr("attr-id");

	if(getUrlVars()["accion"] == "subasta"){
		$('#divDetalleAuto').modal({
			dismissible : true, // Modal can be dismissed by clicking outside of the modal
			opacity : .5, // Opacity of modal background
			inDuration : 300, // Transition in duration
			outDuration : 200, // Transition out duration
			ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
		    	$('.carousel').carousel();
	      	}
		});


	
		$('#divDetalleAuto').modal("open");
		
	}


	

	postrequest("autos/info",{ "autoid":autoid}, function(data){

			var infoAuto = data;
			cargaHTML("#divDetalleAuto", "views/interna2.html", "Detalle Auto",function(){
			

			debugger;
			$("#divDetalleAuto").show();
			$("#divListaAutos").hide();

			//$("#imgPrincipal").attr("src", siteurl+"uploads/"+infoAuto.foto);
			var fotos = infoAuto.fotos.split(",");
			for(i in fotos){

				//$("#imgSnapshots").append('<div><img alt="Imagen no disponible" attr-idx="1" src="'+ siteurl+"uploads/"+fotos[i]+ '"  onclick="CambiaFotoPrincipal(this);" /></div>');
				$("#imgSnapshots").append('<a class="carousel-item"><img class="materialboxed" alt="Imagen no disponible" attr-idx="1" src="'+ siteurl+"uploads/"+fotos[i]+ '" width="200" height="160" /></div>');
			}
			$("#detalleTitulo").html(infoAuto.modelo +" " + infoAuto.anio);
			$("#detalleIdAuto").html(infoAuto.idAuto);
			$("#detalleMarca").html(infoAuto.marca);
			$("#detalleModelo").html(infoAuto.modelo);
			$("#detalleKM").html(Number(infoAuto.km).formatMoney());
			$("#detalleAnio").html(infoAuto.anio);

			$("#detalleColor").html(infoAuto.color);
			$("#detallePrecio").html("$"+Number(infoAuto.precio).formatMoney());
			$("#detalleTransmision").html(infoAuto.transmision);
			$("#detalleDescripcion").html(infoAuto.descripcion);
			$("#detalleCaracteristicas").html(infoAuto.caracteristicas);
			$("#detalleUbicacion").html(infoAuto.estado + " - " + infoAuto.ciudad);
			
			$('.materialboxed').materialbox();
			if(getUrlVars()["accion"] == "subastasadmin"){
				

				$("#closeDetalleAuto").click(function(){
						$('#divDetalleAuto').hide();
						$("#modalListaAutos").show()
						$("#divListaAutos").show();
						$('.carousel').carousel({
							indicators: true,
							noWrap: true
						});
				});

			}else if(getUrlVars()["accion"] == "subasta"){
				$("#closeDetalleAuto").click(function(){
						$('#divDetalleAuto').modal("close");
				});
			}
			else{
				$('#divDetalleAuto').modal("open");
				
			}
			
			// $("#divDetalleAuto > div").click(function(){
				// vars = getUrlVars();
				// if(vars["accion"] == "subasta"){
					// $('#divDetalleAuto').modal("close");
				// }else{
					// $("#divListaAutos").show();
					// $("#modalListaAutos").show();
					// $("#divDetalleAuto > div").hide();	
				// }
// 				
// 				
// 
			// });
		});
	});
	$("#modalListaAutos").hide();



	
	
	

}

function CambiaFotoPrincipal(img){
	
	$("#imgPrincipal").attr("src", $(img).attr("src"));
	$("#imgPrincipal").click();

}
// function CierraDetalle(){
// 
// 
				// $("#divDetalleAuto").hide();				
				// $("#divListaAutos").show();
// }

function ObtieneSubastasPorUsuario() {
	postrequest("subastas/xusuario", {
		"idsubasta" : subastaID
	}, function(data) {

		for (var val in data) {

			$(controlid).append(regresaRenglonVenta(data[val],0));
		}

	});

}

function eventoFinalizaEscritura(textdiv, FuncionFinaliza, timer, intervalo) {
	//definir variables timer intervalo

	$(textdiv).on('keyup', function() {

		clearTimeout(timer);
		timer = setTimeout(FuncionFinaliza, intervalo);
	});

	$(textdiv).on('keydown', function() {
		clearTimeout(timer);
	});

}

jQuery.expr[':'].icontains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

function SoloNumericos(inputItem) {

	$(inputItem).on("keypress keyup", function(event) {
		// Allow: backspace, delete, tab, escape, enter and .
		if (//$.inArray(event.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		// Allow: Ctrl+A, Command+A
		(event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
		// Allow: home, end, left, right, down, up
		(event.keyCode >= 35 && event.keyCode <= 40) || event.keyCode == 8 || event.keyCode == 9) {
			// let it happen, don't do anything
			return;
		}
		//this.value = this.value.replace(/[^0-9\.]/g,'');
		//$(this).val($(this).val().replace(/[^0-9\.]/,''));

		if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
	});
}

function CargaJsonHome(){
		postrequest("data/home.json?rand"+Math.random(), {}, 
			function(data) {
				for(obj in data){
					var secc = data[parseInt(obj)];

					if(secc.estatus == 0){
						$("#"+secc.tag).hide();

					}else{
						$("#"+secc.tag).show();						
					}

					if(secc.esimg == 1){
						$("#"+secc.tag).attr("src",secc.url);
					}else{

					}
					if(secc.eslink == 1){
						console.log("es 1");
						$("#"+secc.tag).attr("attr-link",secc.link);
						$("#"+secc.tag).click(function(){
							var o = this;
							window.open($(o).attr("attr-link"));
							
						});	

					}
					
				}
				// debugger;
				// for (secc = 0; data.length < 5; secc++) {
				// 	alert(secc);
				 // 	if(data[secc].esimg == 1){
					// 	$("#".data[i]).attr("src",data[secc].url);
					// }else{

					// }
				// }
		});

}

function CargaInfoSubasta(){
	debugger;
	cargaHTML(".mainBody", siteurl+"views/main/subastas.html","subasta", function(){
		vars = getUrlVars();
		$('#modalPuja').modal({
			opacity : .5, // Opacity of modal background
			inDuration : 300, // Transition in duration
			outDuration : 200, // Transition out duration
			startingTop : '4%', // Starting top style attribute
		});

		$('#modalOfertas').modal({
			opacity : .5, // Opacity of modal background
			inDuration : 300, // Transition in duration
			outDuration : 200, // Transition out duration
			startingTop : '4%', // Starting top style attribute
		});


		
		postrequest("subastas/info", {
			"id" : vars["id"]
		}, function(data) {
				console.log(JSON.stringify(data));
				$("#divTtlSubasta").html(data[0].nombreSubasta);
				$("#divTipoSubasta").append(data[0].tipoSubasta);
				$("#divIncremento").attr("attr-incremento", data[0].incremento); 
				$("#divIncremento").html($("#divIncremento").html().replace("#INCREMENTO#", Number(data[0].incremento).formatMoney()));
				$("#divOfertasXUsuario").html($("#divOfertasXUsuario").html().replace("#TOTALOFERTAS#", Number(data[0].ofertas_x_usuarios)));
				$("#divGanadores").html($("#divGanadores").html().replace("#AUTOSXUSUARIO#", Number(data[0].autos_x_usuario)));
				
				ConsultaOfertasXUsuarioSubasta(data[0].idSubasta);
				
				cargaAutosPorSubasta(vars["id"], "#divContenidoSubasta", data[0].idTipoSubasta);
				debugger;
				var fechaFin = new Date(data[0].fechaFin);
				fechaFin.setHours(42);
				fechaFin.setMinutes(59);
				fechaFin.setSeconds(59);

				if(new Date() > fechaFin){
					$("#btnPujar").hide();
				}else{
					$("#btnPujar").show();
				}
				

			});

	});

}

function ConsultaOfertasXUsuarioSubasta(idSubasta){
	var total = -1;
	postrequest("pujas/ofertasxusuario", { "id_subasta" : idSubasta, "claveapi": sessionStorage.claveapi }, function(data) {
		debugger;
			total = data;
			$("#numOfertasXusuario").html(total);
			
		});

}


function VerOfertas(idAuto, idSubasta){
	$("#modalOfertas").modal("open");
	$("#divOfertas").html(""); 
	postrequest("pujas/listar", 
		{ "id_auto" : idAuto, "id_subasta": idSubasta }, 
		function (data){
			console.log(JSON.stringify(data));
			$("#divOfertas").append("<thead><tr><th>USUARIO</th><th>PUJA</th><th>FECHA</th></tr></thead>");
			for( var val in data){
				$("#divOfertas").append("<tr><td>"+ data[val].nombre_usuario+"</td><td>" + Number(data[val].oferta).formatMoney()+"</td><td>" + data[val].hora_puja +"</td></tr>");
			}
			

		});


}


function ValidaEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}



function StrongPassWord(password){
	var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
	return re.test(password);
}

function validamail(o){
	mail = $(o).val();
	if(ValidaEmail(mail)){
		postrequest("usuarios/correoexiste",{"correo":mail}, function(data){
			if(data == -1){
				console.log("Ocurrió un error al validar si el correo existe");
			}else if(data > 0){
				$("#divValidaCorreo").html("El correo ya esta registrado, por favor intente <a href='home.php?s=login'>iniciar sesión </a>");
				$("#divValidaCorreo").show();
				$("#btnGuardar").attr("disabled",true);
			}else{
				$("#divValidaCorreo").hide();
				$("#btnGuardar").attr("disabled",false);
			}
		});

	}else{
		$("#divValidaCorreo").html("Ingrese un correo valido");
		$("#divValidaCorreo").show();
		$("#btnGuardar").attr("disabled",true);
	}


}

function validaStrongPassword(o){

	var pass = $(o).val();
	if(StrongPassWord(pass)){
		$("#divValidaPassword").hide();
		$("#btnGuardar").attr("disabled",false);
	}else{
		$("#divValidaPassword").show();
		$("#btnGuardar").attr("disabled",true);
	}
}

function validaRepetirPassword(o){
	var passv = $(o).val();
	var pass = $("#registroPassword").val();
	if(pass != passv){
		$("#divValidaRepetirPassword").show();
		$("#btnGuardar").attr("disabled",true);
	}else{
		$("#divValidaRepetirPassword").hide();
		$("#btnGuardar").attr("disabled",false);
	}
}

function validaCodigoVericacion(o){
	postrequest("usuarios/validacodigoverificacion",{"mail":$("#registroMail").val() , "claveapi": $(o).val()}, function(data){
		if(data > 0){
			$("#rowContrasena").show();
			$("#rowRepetirContrasena").show();
		}else{
			$("#divError").html("Los datos son incorrectos");
		}
	}, function(data){
		// alert("Ocurrió un error al validar el codigo de verificación");	}
		Materialize.toast('Ocurri&oacute; un error al validar el codigo de verificaci&oacute;n', 4000);
	});
}

function ValidaRegistro(oUsuario) {

	var i = 0;
	var msj = "";
	if (oUsuario.nombre.trim() == "") {
		i++;
		msj += "Nombre, ";
	}
	if (oUsuario.appaterno.trim() == "") {
		i++;
		msj += "Apellido paterno, ";
	}
	if (oUsuario.apmaterno.trim() == "") {
		i++;
		msj += "Apellido materno, ";
	}
	if (oUsuario.email.trim() == "") {
		i++;
		msj += "Correo electrónico, ";
	}else{
		if(!ValidaEmail(oUsuario.email.trim())){
			msj += "Proporcione un correo elecrónico válido, ";
		}
	}
	if (oUsuario.password.trim() == "") {
		i++;
		msj += "Password,";
	}
	if (oUsuario.password.trim() == "") {
		i++;
		msj += "Repetir password, ";
	}
	if(!StrongPassWord(oUsuario.password)){
		msj+="El password debe contener al menos una letra mayúscula, al menos una letra minúscula, al menos un número, al menos un caracter especial ([! @ # $ % ^ & *), y una longitud mínima de 8 caracteres ";

	}
	if (oUsuario.dd.trim() == "") {
		i++;
		msj += "Día de nacimiento, ";
	}
	if (oUsuario.mm.trim() == "") {
		i++;
		msj += "Mes de nacimiento, ";
	}
	if (oUsuario.yyyy.trim() == "") {
		i++;
		msj += "Año de nacimiento, ";
	}
	if (oUsuario.telefono.trim() == "") {
		i++;
		msj += "Teléfono, ";
	}
	var j = 0;
	$(".chkPref:checked").each(function() {
		j++;
	});
	if (j == 0) {
		i++;
		msj += "Temas de interés, ";
	}
	if (!$('#registroEULA')[0].checked) {
		i++;
		msj += "Aceptar términos y condiciones";
	}

	if (i > 0) {
		//$(".divError").show();
		//$(".divError").text("Algunos de los campos están vacíos: " + msj);
		Materialize.toast('Algunos de los campos están vacíos:'+ msj , 4000);
		return false;

	} else {
		$(".divError").hide();
		return true;
	}

}

