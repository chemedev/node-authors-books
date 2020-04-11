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
server.use(require('./src/routes/autores'));
server.use(require('./src/routes/libros'));