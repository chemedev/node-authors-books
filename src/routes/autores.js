const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const sequelize = require('../../database');

//! ROUTES /AUTORES
router.get('/autores', async (req, res) => {
	const query = 'SELECT * FROM autores WHERE borrado = 0';
	const resultados = await sequelize.query(query);
	res.status(200).send(resultados[0]);
});

router.post('/autores', helpers.existeAutor, async (req, res) => {
	let resultados;
	let autor = req.body;
	let query = `INSERT INTO autores (nombre, apellido, fechaDeNacimiento) VALUES("${autor.nombre}", "${autor.apellido}", "${autor.fechaDeNacimiento}");`;
	[resultados] = await sequelize.query(query);
	query = `SELECT * FROM autores WHERE id = ${resultados}`
	resultados = await sequelize.query(query);
	res.status(201).json(resultados[0]);
});

router.get('/autores/:id', helpers.existeAutorID, async (req, res) => {
	let { id } = req.params;
	const query = `SELECT * FROM autores WHERE id = ${id} AND borrado = 0`;

	const resultados = await sequelize.query(query);
	res.status(200).send(resultados[0]);
});

router.delete('/autores/:id', helpers.existeAutorID, async (req, res) => {
	let { id } = req.params;
	const query = `UPDATE autores SET borrado = 1 WHERE id = ${id}`;
	await sequelize.query(query);
	res.sendStatus(204);
});

router.put('/autores/:id', helpers.existeAutorID, async (req, res) => {
	let { id } = req.params;
	let { nombre, apellido, fechaDeNacimiento } = req.body;
	let query = `UPDATE autores SET nombre = "${nombre}",	apellido = "${apellido}",	fechaDeNacimiento = "${fechaDeNacimiento}" WHERE id = "${id}"`;
	await sequelize.query(query);

	query = `SELECT * FROM autores WHERE id = ${id} AND borrado = 0`;
	const resultado = await sequelize.query(query);

	res.status(200).send(resultado[0]);
});

module.exports = router;
