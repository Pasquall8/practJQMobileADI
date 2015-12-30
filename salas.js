/*
	Práctica 4 ADI 2015-2016
	Pascual Maestre Server 45839937V
*/

var Sequelize = require('sequelize');

var sequelize = new Sequelize('bd', '', '', {
	dialect: 'sqlite',
	storage: 'bd.sqlite'
});

//DEFINIR MODELOS 
var Sala = sequelize.define('Sala', {
    direccion: Sequelize.STRING,
    localidad: Sequelize.STRING
}, {
	name: {singular: 'Sala', plural: 'Salas'}
});

var Alquiler = sequelize.define('Alquiler', {
	fechaIni: Sequelize.DATEONLY,
	fechaFin: Sequelize.DATEONLY,
	comentario: Sequelize.TEXT
}, {
	name: {singular: 'Alquiler', plural: 'Alquileres'}
});

//Relaciones
//Dada una sala "s1", s1.getAlquileres()
Sala.hasMany(Alquiler);
//Dado un Alquiler --- a.getSala()
Alquiler.belongsTo(Sala, {
	constraints:false
});

//APIREST
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-length, Content-Type, Accept, Authorization");
  next();
});*/
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

//AUTENTIFIACION con jwt-simple
var jwt = require('jwt-simple');
var moment = require('moment');

var secret='123456';

var payload = {
	usr: "pepito",
	pass: "pepito",
	iat: moment().unix(),
	//exp: moment().add(7, "days").unix()
	exp: moment().add(1, "minutes").unix(),
} 

//Funcion autenticar
function comprobarLogin(pet) {
	var auth = pet.headers['authorization'];
	//console.log(auth);
	if (!auth) {
		return false;
	}
	else{
		var token2 = auth.split(" ")[1];
		payload2 = jwt.decode(token2, secret)
		
		username = payload2.usr;
		password = payload2.pass;

		//console.log(payload2);

		if (username == payload.usr && password == payload.pass && payload2.exp > moment().unix())
			return true;
		else 
			return false;
	}
	
}

//GET//
//Autentificarse(Por defecto) (GET /)
app.post('/',function(pet,resp) {
	//console.log(pet.query);

	/*if (comprobarLogin(pet)) 
	{
		resp.status(200).send(token);
	}
	else */if(pet.query.user == payload.usr && pet.query.password == payload.pass){
		//crear el payload a partir de el usuario que entra por el body
		var payload_user = {
			usr: pet.query.user,
			pass: pet.query.password,
			iat: moment().unix(),
			exp: moment().add(7, "days").unix(),
		}

		//crear el token a partir del nuevo payload
		var token = jwt.encode(payload_user, secret);

		resp.status(200).send(token);//Devolvemos el token creado
	}	
	else
		resp.status(403).send("Los datos de usuario o contraseña no son correctos");
});

//Respuesta a consultar todas las salas (GET /api/salas)
app.get('/api/salas', function(pet, resp){
	if(comprobarLogin(pet))
	{
		//Variables de configuración de páginas
		var offset = 0;
		var numItems = 5;
		if(pet.query.page > 1)
			offset = pet.query.page * numItems - numItems;

		Sala.findAndCountAll({offset: offset, limit: numItems}).then(function(results){
			if(results.length == 0)
				resp.status(404).send("No hay salas")
			else
				resp.status(200).send(results); //Controlar paginas si existe la pagina, la pag siguiente y anterior y pagactual/totales
		});
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Respuesta a consultar una sala (GET /api/salas/:id)
app.get('/api/salas/:id', function(pet, resp){
	if(comprobarLogin(pet))
	{
		if (!isFinite(pet.params.id)) {
			resp.status(400).send("El ID solicitado no es numérico");
		}
		else {
			Sala.findById(pet.params.id).then(function(results){
				if(results == null)
					resp.status(404).send("No existe la sala con la id: "+pet.params.id)
				else
					resp.status(200).send(results);
			});
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Respuesta a consultar todos los alquileres (GET /api/alquileres)
app.get('/api/alquileres', function(pet, resp){
	if(comprobarLogin(pet))
	{
		var offset = 0;
		var numItems = 5;
		if(pet.query.page > 1)
			offset = pet.query.page * numItems - numItems;

		Alquiler.findAndCountAll({offset: offset, limit: numItems}).then(function(results){
			if(results.length == 0)
				resp.status(404).send("No se ha realizado ningun alquiler")
			else
				resp.status(200).send(results);
		});
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Respuesta a consultar un alquiler (GET /api/alquileres/:id)
app.get('/api/alquileres/:id', function(pet, resp){
	if(comprobarLogin(pet))
	{
		if (!isFinite(pet.params.id)) {
		resp.send("El ID solicitado no es numérico");
		}
		else {
			Alquiler.findById(pet.params.id).then(function(results){
				if(!results)
					resp.status(404).send("No existe el alquiler con la id: "+pet.params.id)
				else
					resp.status(200).send(results);
			});
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Respuesta  consultar los alquileres de una sala (GET /api/salas/:id/alquileres)
app.get('/api/salas/:id/alquileres', function(pet, resp){
	if(comprobarLogin(pet))
	{
		var offset = 0;
		var numItems = 5;
		if(pet.query.page > 1)
			offset = pet.query.page * numItems - numItems;

		if (!isFinite(pet.params.id)) {
			resp.status(400).send("El ID solicitado no es numérico");
		}
		else {
			Alquiler.findAndCountAll({offset: offset, limit: numItems,
				where: {
					SalaId: pet.params.id
				}
			}).then(function(results){
				if(results.length == 0)
					resp.status(404).send("No hay alquileres para la sala con id: "+pet.params.id+" o la sala no existe.")
				else
					resp.status(200).send(results);
			});
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});


//POST//
//Crear nueva sala (POST /api/salas)
app.post('/api/salas',function(pet,resp) {
	console.log(pet);
	if(comprobarLogin(pet))
	{
		if(pet.body == null || pet.body.direccion == null || pet.body.localidad == null )
			resp.status(400).send("Faltan valores de entrada, introduce: {direccion: , localidad: }");
		else{
			var s = Sala.build({ 
				direccion: pet.body.direccion,
				localidad: pet.body.localidad
			})
			s.save().then(function(){
				resp.status(201).send(s);
			});
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Crear nuevo alquiler (POST /api/alquileres)
app.post('/api/alquileres',function(pet,resp) {
	if(comprobarLogin(pet))
	{
		if(pet.body == null || pet.body.fechaIni == null || pet.body.fechaFin == null || pet.body.comentario == null || pet.body.salaId == null)
			resp.status(400).send("Faltan valores de entrada, introduce: {fechaIni: , fechaFin: , comentario: , salaId: }");
		
		Sala.findById(pet.body.salaId).then(function(results){
				if(!results)
					resp.status(404).send("La sala con id "+pet.body.salaId+" no existe");
				else
				{
					var a = Alquiler.build({ 
						fechaIni: pet.body.fechaIni,
						fechaFin: pet.body.fechaIni,
						comentario: pet.body.comentario,
						SalaId: pet.body.salaId
					})

					a.save().then(function(){
						resp.status(201).send("Alquiler insertado correctamente");
					});
				}
		})
	}
	else
		resp.status(403).send("No estas autentificado");
});


//UPDATE
//Actualizar lso datos de una sala (PUT /api/salas/:id/update)
app.put('/api/salas/:id/update',function(pet,resp) {
	if(comprobarLogin(pet))
	{
		if (!isFinite(pet.params.id)) {
			resp.status(400).send("El ID solicitado no es numérico");
		}
		else {
			Sala.findById(pet.params.id).then(function(sala){
				if(!sala){resp.status(404).send("No existe la sala con id: "+pet.params.id);}
				else{
					if(pet.body.direccion != null){sala.direccion = pet.body.direccion}
					if(pet.body.localidad != null){sala.localidad = pet.body.localidad}

					sala.save();
					resp.status(200).send("Sala "+pet.params.id+" modificada correctamente");
				}
			});
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Actualizar lso datos de un alquiler (PUT /api/alquileres/:id/update)
app.put('/api/alquileres/:id/update',function(pet,resp) {
	if(comprobarLogin(pet))
	{
		if (!isFinite(pet.params.id)) {
			resp.status(400).send("El ID solicitado no es numérico");
		}
		else {
			Alquiler.findById(pet.params.id).then(function(alquiler){
				if(!alquiler){resp.status(404).send("No existe el alquiler con id: "+pet.params.id);}
				else{
					if(pet.body.fechaIni != null){alquiler.fechaIni = pet.body.fechaIni}
					if(pet.body.fechaFin != null){alquiler.fechaFin = pet.body.fechaFin}
					if(pet.body.comentario != null){alquiler.comentario = pet.body.comentario}
					if(pet.body.SalaId != null){alquiler.SalaId = pet.body.SalaId}	

					alquiler.save();
					resp.status(200).send("Alquiler "+pet.params.id+" modificado correctamente");
				}
			});
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});


//DELETE//
//Elimiar una sala (DELETE /api/salas/:id)
app.delete('/api/salas/:id', function(pet,resp) {
	if(comprobarLogin(pet))
	{
		if (!isFinite(pet.params.id)) {
			resp.status(400).send("El ID solicitado no es numérico");
		}
		else {
			Sala.findById(pet.params.id).then(function(sala){
				if(!sala){resp.status(404).send("No existe la sala con id: "+pet.params.id);}
				else{
					resp.status(204).send("Sala "+pet.params.id+" eliminada correctamente")
					sala.destroy();
				}			
			})
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Elimiar una sala (DELETE /api/alquileres/:id)
app.delete('/api/alquileres/:id', function(pet,resp) {
	if(comprobarLogin(pet))
	{
		if (!isFinite(pet.params.id)) {
			resp.status(400).send("El ID solicitado no es numérico");
		}
		else {
			Alquiler.findById(pet.params.id).then(function(alquiler){
				if(!alquiler){resp.status(404).send("No existe el alquiler con id: "+pet.params.id);}
				else{
					alquiler.destroy();
					resp.status(204).send("Sala "+pet.params.id+" eliminada correctamente")
				}
			})
		}
	}
	else
		resp.status(403).send("No estas autentificado");
});

//Poner a express a escuchar e iniciar la BDD
sequelize.sync({force:true}).then(function(){
	return Sala.create({direccion:'C/ Falsa 123', localidad:'Springfield'})
}).then(function(sala){
	return Alquiler.bulkCreate([
		{fechaIni:'19/10/2015', fechaFin:'20/10/2015', comentario:"Sala muy tranquila", SalaId:sala.id},
	]);
}).then(function(){
	app.listen(3000, function(){
		console.log('Express en el puerto 3000');
	})
});