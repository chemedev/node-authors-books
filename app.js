//! MODULES
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const user = 'root';
const password = 'admin';

const sequelize = new Sequelize(`mysql://${user}:${password}@localhost:3306/autores_db`);

sequelize
	.authenticate()
	.then(() => console.log('Conexión establecida.'))
	.catch(err => console.log('Error:', err));

const Autores = sequelize.define(
	'autores',
	{
		nombre: {
			type: Sequelize.STRING,
			allowNull: false
		},
		apellido: {
			type: Sequelize.STRING,
			allowNull: false
		},
		fechaDeNacimiento: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
);

// async () => {
// 	const query = 'SELECT * FROM autores';
// 	const [resultados] = await sequelize.query(query, { raw: true });
// 	console.log(resultados);
// };

//! INIT
const port = 3000;
const server = express();
server.listen(port, console.log(`Server UP on port: ${port}`));

//! DATABASE
// var idLibros = 3;
// const autores = [
// 	{
// 		id: 1,
// 		nombre: 'Jorge Luis',
// 		apellido: 'Borges',
// 		fechaDeNacimiento: '24/08/1899',
// 		libros: [
// 			{
// 				id: 1,
// 				titulo: 'Ficciones',
// 				descripcion: 'Se trata de uno de sus más...',
// 				anioPublicacion: 1944
// 			},
// 			{
// 				id: 2,
// 				titulo: 'El Aleph',
// 				descripcion: 'Otra recopilación de cuentos...',
// 				anioPublicacion: 1949
// 			}
// 		]
// 	},
// 	{
// 		id: 2,
// 		nombre: 'Alejandro Luis',
// 		apellido: 'Borjas',
// 		fechaDeNacimiento: '24/08/1899',
// 		libros: [
// 			{
// 				id: 1,
// 				titulo: 'Animaciones',
// 				descripcion: 'Se ve uno de sus más mejores',
// 				anioPublicacion: 1974
// 			},
// 			{
// 				id: 2,
// 				titulo: 'El Aletón',
// 				descripcion: 'Recopilación de escritos...',
// 				anioPublicacion: 1949
// 			}
// 		]
// 	}
// ];

//! MIDDLEWARES
server.use(bodyParser.json());

async function existeAutor(req, res, next) {
	let { nombre, apellido } = req.body;
	const query = `SELECT * FROM autores
									WHERE nombre = "${nombre}" AND apellido = "${apellido}"`;
	const [resultados] = await sequelize.query(query, { raw: true });
	if (resultados[0]) return res.sendStatus(409);
	next();
}

async function existeAutorID(req, res, next) {
	let { id } = req.params;
	const query = `SELECT * FROM autores WHERE id = ${id}`;

	const [resultados] = await sequelize.query(query, { raw: true });
	if (!resultados[0]) return res.sendStatus(404);
	next();
}

async function existeLibroID(req, res, next) {
	let { idLibro } = req.params;
	const query = `SELECT * FROM libros
									WHERE id = ${idLibro}`;
	const [resultados] = await sequelize.query(query, { raw: true });
	if (!resultados[0]) return res.sendStatus(404);
	next();
}

//! ROUTES /AUTORES
server.get('/autores', async (req, res) => {
	const query = 'SELECT * FROM autores';
	const [resultados] = await sequelize.query(query);
	res.status(200).send(resultados);
});

server.post('/autores', existeAutor, async (req, res) => {
	let autor = req.body;
	const query = `INSERT INTO autores (nombre, apellido, fechaDeNacimiento)
								VALUES("${autor.nombre}", "${autor.apellido}", "${autor.fechaDeNacimiento}");`;
	const [resultados] = await sequelize.query(query);
	res.status(201).send(resultados[0]);
});

server.get('/autores/:id', existeAutorID, async (req, res) => {
	let { id } = req.params;
	const query = `SELECT * FROM autores WHERE id = ${id}`;

	const [resultados] = await sequelize.query(query, { raw: true });
	res.status(200).send(resultados[0]);
});

server.delete('/autores/:id', existeAutorID, async (req, res) => {
	let { id } = req.params;
	const query = `DELETE FROM autores WHERE id = ${id}`;
	await sequelize.query(query, { raaw: true });
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

server.post('/autores/:id/libros', existeAutorID, async (req, res) => {
	let { titulo, descripcion, anioPublicacion } = req.body;
	let { id } = req.params;
	let query = `INSERT INTO libros (titulo, descripcion, anioPublicacion, autor_id) VALUES("${titulo}", "${descripcion}", "${anioPublicacion}", ${id})`;
	let [resultados] = await sequelize.query(query, { raw: true });
	query = `SELECT * FROM libros WHERE id = ${resultados}`;
	resultados = await sequelize.query(query, { raw: true });
	res.status(201).send(resultados[0][0]);
});

server.get('/autores/:id/libros/:idLibro', existeAutorID, existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	const query = `SELECT * FROM libros WHERE autor_id = ${id} AND id = ${idLibro}`;
	let [resultados] = await sequelize.query(query, { raw: true });
	res.send(resultados[0]);
});

server.put('/autores/:id/libros/:idLibro', existeAutorID, existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	let { titulo, descripcion, anioPublicacion } = req.body;
	let query = `UPDATE libros SET titulo = "${titulo}", descripcion = "${descripcion}", anioPublicacion = ${anioPublicacion} WHERE autor_id = "${id}" AND id = "${idLibro}"`;
	let resultados = await sequelize.query(query, { raw: true });
	query = `SELECT * FROM libros WHERE id = ${idLibro}`
	resultados = await sequelize.query(query, { raw: true });
	res.send(resultados[0][0]);
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
