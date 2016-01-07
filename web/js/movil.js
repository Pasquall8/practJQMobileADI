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
                     '<a href="javascript:deleteSala('+salas.rows[i].id+')class="ui-btn ui-btn-inline ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a> ' +
                     '<a href="javascript:verDetallesSala('+salas.rows[i].id+')class="ui-btn ui-mini ui-btn-inline ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a> ' +  
                     '</li>';
                else
					document.getElementById("listaSalas").insertAdjacentHTML('beforeend', '<li id="id_'+salas.rows[i].id+'">Sala '+salas.rows[i].id+': '+salas.rows[i].direccion+' ('+salas.rows[i].localidad+')  ' +
                     '<a href="javascript:deleteSala('+salas.rows[i].id+')class="ui-btn ui-btn-inline ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a> ' +
                     '<a href="javascript:verDetallesSala('+salas.rows[i].id+')class="ui-btn ui-mini ui-btn-inline ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a> ' +  
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

//<a href="#" class="ui-btn ui-btn-inline ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-plus zmd-2x"></i></a>
//<a href="#" class="ui-btn ui-btn-inline ui-btn-raised waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-delete zmd-2x"></i></a>
//<a href="#" class="ui-btn ui-mini ui-btn-inline ui-btn-icon-block waves-effect waves-button waves-effect waves-button"><i class="zmdi zmdi-edit zmd-2x"></i></a>