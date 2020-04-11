// const mysql = require('mysql2');
const Sequelize = require('sequelize');
// const { database } = require('./keys')
// const pool = mysql.createPool(database)

const user = 'root';
const password = 'admin';
const sequelize = new Sequelize(`mysql://${user}:${password}@localhost:3306/autores_db`);

sequelize
	.authenticate()
	.then(() => console.log('Conexión establecida.'))
	.catch(err => console.log('Error:', err));

// pool.getConnection((err, connection) => {
// 	if (err) {
// 		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
// 			console.log('DATABASE CONNECTION WAS CLOSED');
// 		}
// 		if (err.code === 'ER_CON_COUNT_ERROR') {
// 			console.error('DATABASE HAS TO MANY CONNECTIONS');
// 		}

// 		if (err.code === 'ECONNREFUSED') {
// 			console.error('DATABASE CONNECTION WAS REFUSED');
// 		}
// 	}

// 	if (connection) connection.release();
// 	console.log('DB is Connected');
// 	return;
// });

module.exports = sequelize;