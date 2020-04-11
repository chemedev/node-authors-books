CREATE DATABASE autores_db;
USE autores_db;

CREATE TABLE autores(
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  fechaDeNacimiento VARCHAR(12) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE libros(
	id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  anioPublicacion VARCHAR(4) NOT NULL,
  autor_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(autor_id) REFERENCES autores(id)
);