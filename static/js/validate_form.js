function validate_project() {
	if($('input[name="project_name"]').val()=="") {
		alert("Por favor diga, el nombre del proyecto.");
		return false;
	}

	if($('input[name="project_ing"]').val()=="") {
		alert("Olvido, el nombre del ingeniero del proyecto.");
		return false;
	}

	if($('input[name="project_unids"]').val()=="") {
		alert("Por favor diga las unidades.");
		return false;
	}

	if($('input[name="project_const"]').val()=="") {
		alert("Olvido decir el nombre de la constructora del proyecto.");
		return false;
	}

	if($('input[name="project_area"]').val()=="") {
		alert("Olvido introducir el area del proyecto.");
		return false;
	}

	return true;
}

function validate_villa_apto() {
	if($('input[name="apto_const_area"]').val()=="") {
		alert("Olvido mencionar el area total de construccion");
		return false;
	}
	if($('input[name="apto_land_area"]').val()=="") {
		alert("Por favor diga el area total de todo el terreno.");
		return false;
	}

	if($('input[name="apto_rooms"]').val()=="") {
		alert("Por favor diga, cuantas habitaciones hay.");
		return false;
	}

	if($('input[name="apto_levels"]').val()=="") {
		alert("Olvido decir cuantos niveles tiene la villa/apto.");
		return false;
	}

	if($('input[name="apto_level"]').val()=="") {
		alert("Por favor diga, el nivel (planta) donde comienza la villa/apto.");
		return false;
	}

	if($('input[name="apto_bath_rooms"]').val()=="") {
		alert("Olvido decir la cantidad de baños.");
		return false;
	}

	if($('input[name="pool"]:checked').length==1 && $('input[name="pool_owner"]:checked').length==0) {
		alert("Por favor, diga si la piscina del lugar es privada o comun.");
		return false;
	}

   return true;
}

function validate_comercial() {
	if($('input[name="comercial_area"]').val()=="") {
		alert("Olvido mencionar el area total del lugar.");
		return false;
	}

	if($('input[name="comercial_level"]').val()=="") {
		alert("Olvido decir cuantos niveles posee.");
		return false;
	}

	if($('input[name="comercial_levels"]').val()=="") {
		alert("Por favor diga, el nivel (planta) donde comienza.");
		return false;
	}
	return true;
}

function validate_solar() {
	if($('input[name="land_area"]').val()=="") {
		alert("Olvido mencionar el area total del solar.");
		return false;
	}

	if($('input[name="land_front_area"]').val()=="") {
		alert("Olvido mencionar el area total delantera del solar.");
		return false;
	}

	if($('input[name="land_bottom_area"]').val()=="") {
		alert("Olvido mencionar el area total trasera del solar.");
		return false;
	}

	if($('input[name="land_energy"]').val()=="") {
		alert("Olvido hablar sobre la energia del lugar.");
		return false;
	}

	if($('input[name="land_aqueduct"]').val()=="") {
		alert("Olvido hablar acerca de el acueducto que alimenta el area.");
		return false;
	}

	return true;
}

function validate_form() {
	if($('input:radio[name=tipo]:checked').length!=1) {
		alert("Por favor diga, si es villa, proyecto, apto, etc..");
		return false;
	}

	if($('select[name="place"]').val()=="Elegir Destino") {
		alert("Por favor elija un destino");
		return false;
	}

	if($('select[name="currency"]').val()=="Moneda") {
		alert("Olvido seleccionar el tipo de moneda");
		return false;
	}

	if($('input[name="price"]').val()=="") {
		alert("Por favor introdusca el precio del inmueble");
		return false;
	}

	if($('input[name="address"]').val()=="") {
		alert("Por favor introduzca la direccion");
		return false;
	}

	if($('input[name="parcel"]').val()=="") {
		alert("Olvido introducir el numero de parcela");
		return false;
	}

	if($('input[name="title"]').val()=="") {
		alert("Olvido introducir el numero de titulo");
		return false;
	}

	if($('input[name="district"]').val()=="") {
		alert("Introduzca el distrito catastral por favor.");
		return false;
	}

	if($('input[name="date"]').val()=="") {
		alert("Olvido introducir la fecha.");
		return false;
	}

	if($('input:radio[name=zone]:checked').length!=1) {
		alert("Por favor especifique el tipo de zona");
		return false;
	}

	switch($('input:radio[name=tipo]:checked').val()) {
	case "project":
		return validate_project();
	case "apartment":
		return validate_villa_apto();
	case "comercial":
		return validate_comercial();
	case "land":
		return validate_solar();
	case "duplx":
			break;
	default:
		/* This line really should not execute, but one never knows */
		alert("Por favor diga, si es villa, proyecto, apto, etc..");
		return false;
	}

	if($('input[name="owner1"]').val()=="") {
		alert("Olvido introducir el nombre del propietario");
		return false;
	}

	if($('input[name="owner1_id"]').val()=="") {
		alert("Olvido introducir la cedula del propietario");
		return false;
	}

	if($('input[name="owner1_phone"]').val()=="") {
		alert("Por favor diga el numero de telefono del propietario.");
		return false;
	}

	if($('input[name="owner1_address"]').val()=="") {
		alert("Olvido diga el domicilio del propietario");
		return false;
	}

	if($('input[name="executive"]').val()=="") {
		alert("Olvido el nombre del ejecutivo de ventas.");
		return false;
	}
	
	if($('input[name="executive_id"]').val()=="") {
		alert("Por favor introduzca el numero de cedula del ejecutivo de ventas.");
		return false;
	}

	if($('input[name="percentage"]').val()=="") {
		alert("Por favor, no olvide introducir el porcentaje.");
		return false;
	}

	if($('input[name="comision"]:checked').length!=1) {
		alert("Por favor, elija un modo de comision.");
		return false;
	}
   return true;  /* just in case :) */
}