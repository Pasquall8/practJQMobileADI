var URL = "http://localhost:3000"

$(document).ready(function(){
	$("#botonListarSalas").click(function(evento){
		listarSalas()
	});

	$("#botonListarAlquileres").click(function(evento){
		listarAlquileres()
	});

	$("#botonAnnadirSala").click(function(evento) {
		$("#incorrectoSala").hide();
		añadirSala();
	});

	$("#botonAnnadirAlquiler").click(function(evento) {
		$("#incorrectoAlquiler").hide();
		añadirAlquiler();
	});
});

function añadirSala(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL+"/api/salas", true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 201)
		{
			var salas = JSON.parse(xhr.responseText);
			document.getElementById("listaSalas").insertAdjacentHTML('beforeend', '<li id="id_'+salas.id+'">Sala '+salas.id+': '+salas.direccion+' ('+salas.localidad+')  ' +
				'<a href="javascript:deleteSala('+salas.id+')">Eliminar</a> ' +
				'<a href="javascript:verDetallesSala('+salas.id+')">Detalles</a> ' +  
				'</li>');
			alert('sala creada');
		}
		else if(xhr.readyState == 4 && xhr.status == 400)
		{
			$("#incorrectoSala").show();
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "login.html";
		}
	}
	var nuevaSala = {direccion: document.getElementById('direccion').value, localidad: document.getElementById('localidad').value}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(nuevaSala));
}

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
                     '<a href="javascript:deleteSala('+salas.rows[i].id+')">Eliminar</a> ' +
                     '<a href="javascript:verDetallesSala('+salas.rows[i].id+')">Detalles</a> ' +  
                     '</li>';
                else
					document.getElementById("listaSalas").insertAdjacentHTML('beforeend', '<li id="id_'+salas.rows[i].id+'">Sala '+salas.rows[i].id+': '+salas.rows[i].direccion+' ('+salas.rows[i].localidad+')  ' +
                     '<a href="javascript:deleteSala('+salas.rows[i].id+')">Eliminar</a> ' +
                     '<a href="javascript:verDetallesSala('+salas.rows[i].id+')">Detalles</a> ' +  
                     '</li>');
			};
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "login.html";
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
			document.location.href = "login.html";
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
		if (xhr.readyState==4 && xhr.status==200) {
			alert(xhr.responseText);
		}
		else if (xhr.readyState == 4 && xhr.status == 404) 
		{
			alert(xhr.responseText);
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "login.html";
		}
	}
    xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

////////////////////ALQUILER////////////

function añadirAlquiler(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL+"/api/alquileres", true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 201)
		{
			alert('alquiler creado');
			var alquileres = JSON.parse(xhr.responseText);
			document.getElementById("listaAlquiler").insertAdjacentHTML('beforeend', '<li id="id_'+alquileres.rows.id+'">Alquiler '+alquileres.id+': '+alquileres.fechaIni+'-'+alquileres.fechaFin+' '+alquileres.comentario+' '+
				'<a href="javascript:deleteAlquileres('+alquileres.id+')">Eliminar</a> ' +
				'<a href="javascript:verDetallesAlquileres('+alquileres.id+')">Detalles</a> ' +  
				'</li>');
		}
		else if(xhr.readyState == 4 && xhr.status == 400)
		{
			$("#incorrectoAlquiler").show();
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "login.html";
		}
	}
	var nuevaAlquiler = {fechaIni: document.getElementById('fechaIni').value, fechaFin: document.getElementById('fechaFin').value, comentario: document.getElementById('comentario').value}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(nuevaAlquiler));
}

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
                     '<a href="javascript:deleteAlquileres('+alquileres.rows[i].id+')">Eliminar</a> ' +
                     '<a href="javascript:verDetallesAlquileres('+alquileres.rows[i].id+')">Detalles</a> ' +  
                     '</li>';
                else
					document.getElementById("listaSalas").insertAdjacentHTML('beforeend', '<li id="id_'+alquileres.rows[i].id+'">Alquiler '+alquileres.rows[iS].id+': '+alquileres.rows[i].fechaIni+'-'+alquileres.rows[i].fechaFin+' '+alquileres.rows[i].comentario+' '+
                     '<a href="javascript:deleteAlquileres('+alquileres.rows[i].id+')">Eliminar</a> ' +
                     '<a href="javascript:verDetallesAlquileres('+alquileres.rows[i].id+')">Detalles</a> ' +  
                     '</li>');
			};
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "login.html";
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
			document.location.href = "login.html";
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
		if (xhr.readyState==4 && xhr.status==200) {
			alert(xhr.responseText);
		}
		else if (xhr.readyState == 4 && xhr.status == 404) 
		{
			alert(xhr.responseText);
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			document.location.href = "login.html";
		}
	}
    xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-Type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}