const txtAuthor = document.getElementById('txtAuthor');
const txtAuthors = document.getElementById('txtAuthors');
const btnSearch = document.getElementById('btnSearch');
const btnSearchBooks = document.getElementById('btnSearchBooks');

function showRes(results, res, type) {
	results.innerHTML = '';
	if (type == 'author') {
		res.forEach(element => {
			results.innerHTML += `
	<span>Nombre: ${element.nombre}<span></br>
	<span>Apellido: ${element.apellido}<span></br>
	<span>Fecha de Nacimiento: ${element.fechaDeNacimiento}<span></br>
	</br>
	`;
			console.log('ID del Autor:', element.id);
		});
	} else {
		res.forEach(element => {
			results.innerHTML += `
	<span>Título: ${element.titulo}<span></br>
	<span>Descripción: ${element.descripcion}<span></br>
	<span>Año de publicación: ${element.anioPublicacion}<span></br>
	</br>
	`;
			console.log('ID del Autor:', element.autor_id);
			console.log('ID del Libro:', element.id);
		});
	}
}

btnSearchAuthors.addEventListener('click', () => {
	const results = document.getElementById('authorsList');
	fetch(`http://localhost:3000/autores/`)
		.then(res => res.json())
		.then(res => showRes(results, res, 'author'));
});

btnSearchAuthor.addEventListener('click', () => {
	const results = document.getElementById('authorList');
	const value = txtAuthor.value;
	fetch(`http://localhost:3000/autores/${value}`)
		.then(res => res.json())
		.then(res => showRes(results, res, 'author'));
});

btnSearchBooks.addEventListener('click', () => {
	const results = document.getElementById('booksList');
	const value = txtAuthorBook.value;
	fetch(`http://localhost:3000/autores/${value}/libros`)
		.then(res => res.json())
		.then(res => showRes(results, res, 'book'));
});
