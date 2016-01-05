var URL = "http://localhost:3000"

function login()
{
	localStorage.setItem("token", "");
	var xhr = new XMLHttpRequest();

	var params = "user="+$("#usuario").val()+"&password="+$("#password").val();
	xhr.open('POST', URL+"?"+params, true);
	xhr.onreadystatechange = function() {
		//alert($("#usuario").val());
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var token = xhr.responseText;
			//guardamos en el localStorage la respuesta del login, que lleva el token jwt
			localStorage.setItem("token", token);
			
			//redirigimos a la pagina principal
			document.location.href = "index.html";
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			$("#incorrectoUsuario").show();
		}
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}

function loginMobile()
{
	localStorage.setItem("token", "");
	var xhr = new XMLHttpRequest();

	var params = "user="+$("#usuario").val()+"&password="+$("#password").val();
	xhr.open('POST', URL+"?"+params, true);
	xhr.onreadystatechange = function() {

		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var token = xhr.responseText;
			//guardamos en el localStorage la respuesta del login, que lleva el token jwt
			localStorage.setItem("token", token);
			
			//redirigimos a la pagina menu (principal es login)
			document.location.href = "movil.html#menu";
		}
		else if(xhr.readyState == 4 && xhr.status == 403)
		{
			$( "#popupErrorLogin" ).popup( "open");
			$("#incorrectoUsuario").show();
		}
	}
	xhr.setRequestHeader('Authorization', 'Barer '+localStorage.getItem("token"));
	xhr.setRequestHeader('Content-type', 'aplication/x-www-form-urlencoded');
	xhr.send();
}
