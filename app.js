//! MODULES
const express = require('express');
const bodyParser = require('body-parser');

//! INIT
const port = 3000;
const server = express();
server.listen(port, console.log(`Server UP on port: ${port}`));

//! MIDDLEWARES
server.use(bodyParser.json());

//! ROUTES
server.get('/autores', (req, res) => {
	console.log(req.method, req.path, 'Autores');
	res.status(200).send(autores);
});

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

server.post('/autores', (req, res) => {
	let autor = req.body;
	autor.id = autores.length + 1;
	autor.libros = [];
	autores.push(autor);
	console.log(autores);
	res.status(201).send(autor);
});

server.get('/autores/:id', (req, res) => {
	let autor = autores.find(autor => autor.id === parseInt(req.params.id));
	res.status(200).send(autor);
});

server.delete('/autores/:id', (req, res) => {
	let index = autores.findIndex(autor => autor.id === parseInt(req.params.id));
	autores.splice(index, 1);
	console.log('Los autores son:', autores);
	res.sendStatus(204);
});

server.put('/autores/:id', (req, res) => {
	let { id } = req.params;
	let { nombre, apellido, fechaDeNacimiento } = req.body;

	let nuevoAutor = autores.find(autor => autor.id === parseInt(id));
	console.log('AUTOR:', nuevoAutor);
	if (!nuevoAutor) return res.status(404).send('No existe el autor');
	let index = autores.findIndex(autor => autor.id === parseInt(id));
	console.log('INDEX:', index)

	nuevoAutor.id = parseInt(id);
	nuevoAutor.nombre = nombre;
	nuevoAutor.apellido = apellido;
	nuevoAutor.fechaDeNacimiento = fechaDeNacimiento;
	console.log('NUEVO AUTOR', nuevoAutor)

	autores.splice(index, 1, nuevoAutor);
	res.sendStatus(204);
});

server.get('/autores/:id/libros', (req, res) => {
	let { libros } = autores.find(autor => autor.id === parseInt(req.params.id));
	res.send(libros);
});

server.post('/autores/:id/libros', (req, res) => {
	let index = autores.findIndex(autor => autor.id === parseInt(req.params.id));

	let libro = req.body;
	libro.id = idLibros++;

	autores[index].libros.push(libro);

	res.send(libro);
});
