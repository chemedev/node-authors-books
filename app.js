//! MODULES
const express = require('express');
const bodyParser = require('body-parser');

//! INIT
const port = 3000;
const server = express();
server.listen(port, console.log(`Server UP on port: ${port}`));

//! DATABASE
var idLibros = 3;
const autores = [
	{
		id: 1,
		nombre: 'Jorge Luis',
		apellido: 'Borges',
		fechaDeNacimiento: '24/08/1899',
		libros: [
			{
				id: 1,
				titulo: 'Ficciones',
				descripcion: 'Se trata de uno de sus más...',
				anioPublicacion: 1944
			},
			{
				id: 2,
				titulo: 'El Aleph',
				descripcion: 'Otra recopilación de cuentos...',
				anioPublicacion: 1949
			}
		]
	},
	{
		id: 2,
		nombre: 'Alejandro Luis',
		apellido: 'Borjas',
		fechaDeNacimiento: '24/08/1899',
		libros: [
			{
				id: 1,
				titulo: 'Animaciones',
				descripcion: 'Se ve uno de sus más mejores',
				anioPublicacion: 1974
			},
			{
				id: 2,
				titulo: 'El Aletón',
				descripcion: 'Recopilación de escritos...',
				anioPublicacion: 1949
			}
		]
	}
];

//! MIDDLEWARES
server.use(bodyParser.json());

function existeAutor(req, res, next) {
	let { nombre, apellido } = req.body;
	let existe = autores.find(autor => autor.nombre === nombre && autor.apellido === apellido);
	if (existe) return res.sendStatus(409);
	next();
}

function existeAutorID(req, res, next) {
	let { id } = req.params;
	let existe = autores.find(autor => autor.id === parseInt(id));
	if (!existe) return res.sendStatus(404);
	next();
}

function existeLibroID(req, res, next) {
	let { id, idLibro } = req.params;
	let { libros } = autores.find(autor => autor.id === parseInt(id));
	let libro = libros.find(libro => libro.id === parseInt(idLibro));
	if (!libro) return res.sendStatus(404);
	next();
}

//! ROUTES /AUTORES
server.get('/autores', (req, res) => {
	res.status(200).send(autores);
});

server.post('/autores', existeAutor, (req, res) => {
	let autor = req.body;
	autor.id = autores.length + 1;
	autor.libros = [];
	autores.push(autor);
	res.status(201).send(autor);
});

server.get('/autores/:id', existeAutorID, (req, res) => {
	let { id } = req.params;
	let autor = autores.find(autor => autor.id === parseInt(id));
	res.status(200).send(autor);
});

server.delete('/autores/:id', existeAutorID, (req, res) => {
	let { id } = req.params;
	let index = autores.findIndex(autor => autor.id === parseInt(id));

	autores.splice(index, 1);
	res.sendStatus(204);
});

server.put('/autores/:id', existeAutorID, (req, res) => {
	let { id } = req.params;
	let { nombre, apellido, fechaDeNacimiento } = req.body;

	let nuevoAutor = autores.find(autor => autor.id === parseInt(id));
	let index = autores.findIndex(autor => autor.id === parseInt(id));

	nuevoAutor.id = parseInt(id);
	nuevoAutor.nombre = nombre;
	nuevoAutor.apellido = apellido;
	nuevoAutor.fechaDeNacimiento = fechaDeNacimiento;

	autores.splice(index, 1, nuevoAutor);
	res.status(200).send(autores[index]);
});

//! ROUTES /LIBROS
server.get('/autores/:id/libros', existeAutorID, (req, res) => {
	let { libros } = autores.find(autor => autor.id === parseInt(req.params.id));
	res.send(libros);
});

server.post('/autores/:id/libros', existeAutorID, (req, res) => {
	let index = autores.findIndex(autor => autor.id === parseInt(req.params.id));

	let libro = req.body;
	libro.id = idLibros++;

	autores[index].libros.push(libro);

	res.status(201).send(libro);
});

server.get('/autores/:id/libros/:idLibro', existeAutorID, existeLibroID, (req, res) => {
	let { id, idLibro } = req.params;
	let { libros } = autores.find(autor => autor.id === parseInt(id));
	let libro = libros.find(libro => libro.id === parseInt(idLibro));
	res.send(libro);
});

server.put('/autores/:id/libros/:idLibro', existeAutorID, existeLibroID, (req, res) => {
	let { id, idLibro } = req.params;

	const autor = autores.find(autor => autor.id === parseInt(id));
	let indexAutor = autores.findIndex(autor => autor.id === parseInt(id));
	let indexLibro = autor.libros.findIndex(libro => libro.id === parseInt(idLibro));

	const nuevoLibro = req.body;
	nuevoLibro.id = autor.libros[indexLibro].id;

	autor.libros.splice(indexLibro, 1, nuevoLibro);
	autores.splice(indexAutor, 1, autor);

	res.send(nuevoLibro);
});

server.delete('/autores/:id/libros/:idLibro', existeAutorID, existeLibroID, (req, res) => {
	let { id, idLibro } = req.params;
	const autor = autores.find(autor => autor.id === parseInt(id));
	let indexAutor = autores.findIndex(autor => autor.id === parseInt(id));
	let indexLibro = autor.libros.findIndex(libro => libro.id === parseInt(idLibro));
	autor.libros.splice(indexLibro, 1);
	autores.splice(indexAutor, 1, autor);
	res.sendStatus(204);
});
