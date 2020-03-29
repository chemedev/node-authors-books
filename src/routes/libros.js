const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const sequelize = require('../../database');

//! ROUTES /LIBROS
router.get('/autores/:id/libros', helpers.existeAutorID, async (req, res) => {
	let { id } = req.params;
	const query = `SELECT * FROM libros WHERE autor_id = ${id};`
	let [resultados] = await sequelize.query(query);
	res.send(resultados);
});

router.post('/autores/:id/libros', helpers.existeAutorID, async (req, res) => {
	let { titulo, descripcion, anioPublicacion } = req.body;
	let { id } = req.params;
	let query = `INSERT INTO libros (titulo, descripcion, anioPublicacion, autor_id) VALUES("${titulo}", "${descripcion}", "${anioPublicacion}", ${id})`;
	let [resultados] = await sequelize.query(query);
	query = `SELECT * FROM libros WHERE id = ${resultados}`;
	resultados = await sequelize.query(query);
	res.status(201).send(resultados[0][0]);
});

router.get('/autores/:id/libros/:idLibro', helpers.existeAutorID, helpers.existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	const query = `SELECT * FROM libros WHERE autor_id = ${id} AND id = ${idLibro}`;
	let [resultados] = await sequelize.query(query);
	res.send(resultados);
});

router.put('/autores/:id/libros/:idLibro', helpers.existeAutorID, helpers.existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	let { titulo, descripcion, anioPublicacion } = req.body;
	let query = `UPDATE libros SET titulo = "${titulo}", descripcion = "${descripcion}", anioPublicacion = ${anioPublicacion} WHERE autor_id = "${id}" AND id = "${idLibro}"`;
	let resultados = await sequelize.query(query);
	query = `SELECT * FROM libros WHERE id = ${idLibro}`;
	[resultados] = await sequelize.query(query);
	res.send(resultados);
});

router.delete('/autores/:id/libros/:idLibro', helpers.existeAutorID, helpers.existeLibroID, async (req, res) => {
	let { id, idLibro } = req.params;
	const query = `DELETE FROM libros WHERE autor_id = ${id} AND id = ${idLibro}`;
	await sequelize.query(query);
	res.sendStatus(204);
});

module.exports = router;