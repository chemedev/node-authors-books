const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const sequelize = require('../../database');

//! ROUTES /LIBROS
router.get('/autores/:id/libros', helpers.existeAutorID, async (req, res) => {
	let { id } = req.params;
	const query = `SELECT * FROM libros WHERE autor_id = ${id} AND borrado = 0;`
	let resultados = await sequelize.query(query);
	res.send(resultados[0]);
});

router.post('/autores/:id/libros', helpers.existeAutorID, async (req, res) => {
	let { titulo, descripcion, anioPublicacion } = req.body;
	let { id } = req.params;
	let query = `INSERT INTO libros (titulo, descripcion, anioPublicacion, autor_id) VALUES("${titulo}", "${descripcion}", "${anioPublicacion}", ${id})`;
	let [resultados] = await sequelize.query(query);
	query = `SELECT * FROM libros WHERE id = ${resultados} AND borrado = 0`;
	resultados = await sequelize.query(query);
	res.status(201).send(resultados[0]);
});

router.get('/autores/:id/libros/:idLibro', helpers.existeAutorID, helpers.existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	const query = `SELECT * FROM libros WHERE autor_id = ${id} AND id = ${idLibro} AND borrado = 0`;
	let resultados = await sequelize.query(query);
	res.send(resultados[0]);
});

router.put('/autores/:id/libros/:idLibro', helpers.existeAutorID, helpers.existeLibroID, async (req, res) => {
	let resultados;
	let { id, idLibro } = req.params;
	let { titulo, descripcion, anioPublicacion } = req.body;
	let query = `UPDATE libros SET titulo = "${titulo}", descripcion = "${descripcion}", anioPublicacion = ${anioPublicacion} WHERE autor_id = "${id}" AND id = "${idLibro}"`;
	resultados = await sequelize.query(query);
	query = `SELECT * FROM libros WHERE id = ${idLibro} AND borrado = 0`;
	resultados = await sequelize.query(query);
	res.send(resultados[0]);
});

router.delete('/autores/:id/libros/:idLibro', helpers.existeAutorID, helpers.existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	const query = `UPDATE libros SET borrado = 1 WHERE autor_id = ${id} AND id = ${idLibro}`;
	await sequelize.query(query);
	res.sendStatus(204);
});

module.exports = router;