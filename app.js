//! MODULES
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

//! INIT
const port = 3000;
const app = express();
app.listen(port, console.log(`Server UP on port: ${port}`));

//! HANDLER
let handleRequest = (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	fs.readFile('index.html', null, function(err, data) {
		if (err) {
			res.writeHead(404);
			res.write('File not found.');
		} else {
			res.write(data);
		}
		res.end();
	});
};

//! MIDDLEWARES
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//! ROUTES
app.use(require('./src/routes/autores'));
app.use(require('./src/routes/libros'));

app.get('/', handleRequest);