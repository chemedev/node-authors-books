const { db } = require('./keys');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`mysql://${db.user}:${db.password}@${db.host}:3306/${db.database}`, { logging: false });

sequelize
	.authenticate()
	.then(() => console.log('Conexión establecida.'))
	.catch(err => console.log('Error:', err));

(async () => {
	let count = 0;
	[count] = await sequelize.query(`SELECT COUNT(*) FROM autores`);
	console.log('Autores:', count);
	[count] = await sequelize.query(`SELECT COUNT(*) FROM libros`);
	console.log('Libros', count);
})();

module.exports = sequelize;
