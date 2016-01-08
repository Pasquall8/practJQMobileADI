var URL = "http://localhost:3000"

function listarSalas(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', URL+"/api/salas", true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var salas = JSON.parse(xhr.responseText);
			for (var i = 0; i < salas.rows.length; i++) {
				if(i == 0)
					document.getElementById("listaSalas").innerHTML = '<li id="id_'+salas.rows[i].id+'">Sala '+salas.rows[i].id+': '+salas.rows[i].direccion+' ('+salas.rows[i].localidad+')  ' +
                     '<a href="javascript:deleteSala('+salas.rows[i].id+')" class="ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a> ' +
                     '<a href="javascript:verDetallesSala('+salas.rows[i].id+')" class="ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a> ' +  
                     '</li>';
                else
					document.getElementById("listaSalas").insertAdjacentHTML('beforeend', '<li id="id_'+salas.rows[i].id+'">Sala '+salas.rows[i].id+': '+salas.rows[i].direccion+' ('+salas.rows[i].localidad+')  ' +
                     '<a href="javascript:deleteSala('+salas.rows[i].id+')" class=" ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a> ' +
                     '<a href="javascript:verDetallesSala('+salas.rows[i].id+')" class="ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a> ' +  
                     '</li>');
			};
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "movil.html#principal";
		}
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function deleteSala(id){
	var xhr = new XMLHttpRequest();
    xhr.open('DELETE', URL+"/api/salas/"+id, true);
    xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==204) {
			alert("Eliminado correctamente");
			document.getElementById('id_'+id).remove();
		}
		else if (xhr.readyState == 4 && xhr.status == 404) 
		{
			alert(xhr.responseText);
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "movil.html#principal";
		}
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function verDetallesSala(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL+"/api/salas/"+id, true);
    xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==200) 
		{
			document.location.href = "movil.html#detalleSala";
			var salas = JSON.parse(xhr.responseText);
			document.getElementById("id_sala_detalle").innerHTML = salas.id;
			document.getElementById("detalle_ sala_direccion").value = salas.direccion;
			document.getElementById("detalle_ sala_localidad").value = salas.localidad;
		}
		else if (xhr.readyState == 4 && xhr.status == 404) 
		{
			alert(xhr.responseText);
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "movil.html#principal";
		}
	}
    xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function editarSala(id){
	var xhr = new XMLHttpRequest();
    xhr.open('PUT', URL+"/api/salas/"+id+"/update", true);
	if (xhr.readyState==4 && xhr.status==200) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==400) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==404) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==403) 
	{
		document.location.href = "movil.html#principal";
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader("Content-type", "application/json");
	var editarSala = {
    	direccion: document.getElementById('detalle_ sala_direccion').value,
    	localidad: document.getElementById('detalle_ sala_localidad').value,
    	tipo: 0
    }
    xhr.send(JSON.stringify(editarSala));
}

function addSala(id){
	var xhr = new XMLHttpRequest();
    xhr.open('POST', URL+"/api/salas/", true);
	if (xhr.readyState==4 && xhr.status==201) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==400) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==403) 
	{
		document.location.href = "movil.html#principal";
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader("Content-type", "application/json");
	var addSala = {
    	direccion: document.getElementById('nueva_sala_direccion').value,
    	localidad: document.getElementById('nueva_sala_localidad').value,
    	tipo: 0
    }
    xhr.send(JSON.stringify(addSala));
}

/////////////////////////////// ALQUILERES ///////////////////////////////

function listarAlquileres(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', URL+"/api/alquileres", true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var alquileres = JSON.parse(xhr.responseText);
			for (var i = 0; i < alquileres.rows.length; i++) {
				if(i == 0)
					document.getElementById("listaAlquileres").innerHTML = '<li id="id_'+alquileres.rows[i].id+'">Alquiler '+alquileres.rows[i].id+': '+alquileres.rows[i].fechaIni+'-'+alquileres.rows[i].fechaFin+' '+alquileres.rows[i].comentario+' '+
                     '<a href="javascript:deleteAlquileres('+alquileres.rows[i].id+')" class="ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a> ' +
                     '<a href="javascript:verDetallesAlquileres('+alquileres.rows[i].id+')" class="ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a> ' +  
                     '</li>';
                else
					document.getElementById("listaSalas").insertAdjacentHTML('beforeend', '<li id="id_'+alquileres.rows[i].id+'">Alquiler '+alquileres.rows[iS].id+': '+alquileres.rows[i].fechaIni+'-'+alquileres.rows[i].fechaFin+' '+alquileres.rows[i].comentario+' '+
                     '<a href="javascript:deleteAlquileres('+alquileres.rows[i].id+')" class="ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a> ' +
                     '<a href="javascript:verDetallesAlquileres('+alquileres.rows[i].id+')" class="ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a> ' +  
                     '</li>');
			};
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "movil.html#principal";
		}
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function deleteAlquileres(id){
	var xhr = new XMLHttpRequest();
    xhr.open('DELETE', URL+"/api/alquileres/"+id, true);
    xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==204) {
			alert("Eliminado correctamente");
			document.getElementById('id_'+id).remove();
		}
		else if (xhr.readyState == 4 && xhr.status == 404) 
		{
			alert(xhr.responseText);
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "movil.html#principal";
		}
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function verDetallesAlquileres(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL+"/api/alquileres/"+id, true);
    xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==200) 
		{
			document.location.href = "movil.html#detalleAlquiler";

			var alquiler= JSON.parse(xhr.responseText);
			document.getElementById("id_alquiler_detalle").innerHTML = alquiler.id;
			document.getElementById("detalle_alquiler_fechaIni").value = alquiler.fechaIni;
			document.getElementById("detalle_alquiler_fechaFin").value = alquiler.fechaFin;
			document.getElementById("detalle_alquiler_comentario").value = alquiler.comentario;
			document.getElementById("detalle_alquiler_sala").value = alquiler.SalaId;
		}
		else if (xhr.readyState == 4 && xhr.status == 404) 
		{
			alert(xhr.responseText);
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "movil.html#principal";
		}
	}
    xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function editarAlquiler(id){
	var xhr = new XMLHttpRequest();
    xhr.open('PUT', URL+"/api/alquileres/"+id+"/update", true);
	if (xhr.readyState==4 && xhr.status==200) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==400) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==404) 
	{
		alert(xhr.responseText);
	}
	else if (xhr.readyState==4 && xhr.status==403) 
	{
		document.location.href = "movil.html#principal";
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader("Content-type", "application/json");
	var editarAlquiler = {
    	fechaIni: document.getElementById('detalle_alquiler_fechaIni').value,
    	fechaFin: document.getElementById('detalle_alquiler_fechaFin').value,
    	comentario: document.getElementById('detalle_alquiler_comentario').value,
    	SalaId: document.getElementById('detalle_alquiler_sala').value,
    	tipo: 0
    }
    xhr.send(JSON.stringify(editarAlquiler));
}

//<a href="#" class="ui-btn ui-btn-inline ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-plus zmd-2x"></i></a>
//<a href="#" class="ui-btn ui-btn-inline ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a>
//<a href="#" class="ui-btn ui-mini ui-btn-inline ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a>