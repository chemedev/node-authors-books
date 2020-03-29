const helpers = {};
const sequelize = require('../../database');

helpers.existeAutor = async (req, res, next) => {
	let { nombre, apellido } = req.body;
	const query = `SELECT * FROM autores
									WHERE nombre = "${nombre}" AND apellido = "${apellido}" AND borrado = 0`;
	const [resultados] = await sequelize.query(query, { raw: true });
	if (resultados[0]) return res.sendStatus(409);
	next();
};

helpers.existeAutorID = async (req, res, next) => {
	let { id } = req.params;
	const query = `SELECT * FROM autores WHERE id = ${id} AND borrado = 0`;

	const [resultados] = await sequelize.query(query, { raw: true });
	if (!resultados[0]) return res.sendStatus(404);
	next();
};

helpers.existeLibroID = async (req, res, next) => {
	let { idLibro } = req.params;
	const query = `SELECT * FROM libros
									WHERE id = ${idLibro} AND borrado = 0`;
	const [resultados] = await sequelize.query(query, { raw: true });
	if (!resultados[0]) return res.sendStatus(404);
	next();
};

module.exports = helpers;
