//! NAV
const btnsNav = document.querySelectorAll('.btn.nav');
const mainContainers = document.querySelectorAll('.container.main');
btnsNav.forEach(btn =>
	btn.addEventListener('click', () => {
		btnsNav.forEach(btn => btn.classList.remove('active'));
		btn.classList.add('active');
		switch (btn.textContent) {
			case 'GET':
				mainContainers.forEach(cont => cont.classList.add('hidden'));
				mainContainers[0].classList.remove('hidden');
				break;
			case 'UPDATE':
				mainContainers.forEach(cont => cont.classList.add('hidden'));
				mainContainers[1].classList.remove('hidden');
				break;
			case 'DELETE':
				mainContainers.forEach(cont => cont.classList.add('hidden'));
				mainContainers[2].classList.remove('hidden');
				break;
			case 'NEW':
				mainContainers.forEach(cont => cont.classList.add('hidden'));
				mainContainers[3].classList.remove('hidden');
				break;
		}
	})
);

function showRes(results, res, type) {
	console.log(res);
	results.innerHTML = '';
	console.clear();
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

//! GET
const txtAuthor = document.getElementById('txtAuthor');
const txtAuthors = document.getElementById('txtAuthors');
const txtBookAuthorID = document.getElementById('txtBookAuthorID');
const txtBookID = document.getElementById('txtBookID');
const btnSearch = document.getElementById('btnSearch');
const btnSearchBooks = document.getElementById('btnSearchBooks');
const btnSearchBook = document.getElementById('btnSearchBook');

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

btnSearchBook.addEventListener('click', () => {
	const results = document.getElementById('bookList');
	const AuthorID = txtBookAuthorID.value;
	const ID = txtBookID.value;
	fetch(`http://localhost:3000/autores/${AuthorID}/libros/${ID}`)
		.then(res => res.json())
		.then(res => showRes(results, res, 'book'));
});

//! UPDATE
const txtUpdateAuthorID = document.getElementById('txtUpdateAuthorID');
const txtAuthorName = document.getElementById('txtAuthorName');
const txtAuthorSurname = document.getElementById('txtAuthorSurname');
const txtAuthorDate = document.getElementById('txtAuthorDate');
const btnUpdateAuthor = document.getElementById('btnUpdateAuthor');

const txtUpdateBookAuthorID = document.getElementById('txtUpdateBookAuthorID');
const txtUpdateBookID = document.getElementById('txtUpdateBookID');
const txtBookTitle = document.getElementById('txtBookTitle');
const txtBookDescription = document.getElementById('txtBookDescription');
const txtBookYear = document.getElementById('txtBookYear');
const btnUpdateBook = document.getElementById('btnUpdateBook');

btnUpdateAuthor.addEventListener('click', async () => {
	const results = document.getElementById('authorUpdatedList');
	const ID = txtUpdateAuthorID.value;
	const newAuthor = {};
	newAuthor.nombre = txtAuthorName.value;
	newAuthor.apellido = txtAuthorSurname.value;
	newAuthor.fechaDeNacimiento = txtAuthorDate.value;
	await fetch(`http://localhost:3000/autores/${ID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newAuthor)
	})
		.then(res => res.json())
		.then(res => showRes(results, res, 'author'));
});

btnUpdateBook.addEventListener('click', async () => {
	const results = document.getElementById('bookUpdatedList');
	const AuthorID = txtUpdateBookAuthorID.value;
	const ID = txtUpdateBookID.value;
	const newBook = {};
	newBook.titulo = txtBookTitle.value;
	newBook.descripcion = txtBookDescription.value;
	newBook.anioPublicacion = txtBookYear.value;
	await fetch(`http://localhost:3000/autores/${AuthorID}/libros/${ID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newBook)
	})
		.then(res => res.json())
		.then(res => showRes(results, res, 'book'));
});

//! DELETE
const txtDeleteAuthor = document.getElementById('txtDeleteAuthor');
const txtDeleteBookAuthorID = document.getElementById('txtDeleteBookAuthorID');
const txtDeleteBookID = document.getElementById('txtDeleteBookID');
const btnDeleteAuthor = document.getElementById('btnDeleteAuthor');
const btnDeleteBook = document.getElementById('btnDeleteBook');

btnDeleteAuthor.addEventListener('click', async () => {
	const results = document.getElementById('authorDeleted');
	const ID = txtDeleteAuthor.value;
	await fetch(`http://localhost:3000/autores/${ID}`, {
		method: 'DELETE'
	}).then(res => {
		if (res.ok) results.innerHTML = 'Author deleted.';
	});
});

btnDeleteBook.addEventListener('click', async () => {
	const results = document.getElementById('bookDeleted');
	const ID = txtDeleteBookAuthorID.value;
	const BookID = txtDeleteBookID.value;
	await fetch(`http://localhost:3000/autores/${ID}/libros/${BookID}`, {
		method: 'DELETE'
	}).then(res => {
		if (res.ok) results.innerHTML = 'Book deleted.';
	});
});

//! NEW
const newAuthorName = document.getElementById('newAuthorName');
const newAuthorSurname = document.getElementById('newAuthorSurname');
const newAuthorDate = document.getElementById('newAuthorDate');
const btnNewAuthor = document.getElementById('btnNewAuthor');

const newBookAuthorID = document.getElementById('newBookAuthorID');
const newBookTitle = document.getElementById('newBookTitle');
const newBookDescription = document.getElementById('newBookDescription');
const newBookYear = document.getElementById('newBookYear');
const btnNewBook = document.getElementById('btnNewBook');

btnNewAuthor.addEventListener('click', async () => {
	const results = document.getElementById('newAuthor');
	const newAuthor = {};
	newAuthor.nombre = newAuthorName.value;
	newAuthor.apellido = newAuthorSurname.value;
	newAuthor.fechaDeNacimiento = newAuthorDate.value;
	await fetch(`http://localhost:3000/autores`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newAuthor)
	})
		.then(res => res.json())
		.then(res => showRes(results, res, 'author'));
});

btnNewBook.addEventListener('click', async () => {
	const results = document.getElementById('newBook');
	const AuthorID = newBookAuthorID.value;
	const newBook = {};
	newBook.titulo = newBookTitle.value;
	newBook.descripcion = newBookDescription.value;
	newBook.anioPublicacion = newBookYear.value;
	await fetch(`http://localhost:3000/autores/${AuthorID}/libros`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newBook)
	})
		.then(res => res.json())
		.then(res => showRes(results, res, 'book'));
});
