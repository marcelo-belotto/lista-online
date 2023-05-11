DROP DATABASE IF EXISTS dblistaonline;
CREATE DATABASE dblistaonline;
USE dblistaonline;
DROP TABLE conta;
DROP TABLE item;
DROP TABLE tipo_lista;
DROP TABLE usuario;
CREATE TABLE usuario(
  id_usuario INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  nome_usuario VARCHAR(25) NOT NULL,
  email_usuario VARCHAR(50) NOT NULL UNIQUE,
  genero VARCHAR(1) NOT NULL,
  img VARCHAR(42) NULL,
  senha VARCHAR(6) NOT NULL
);

CREATE TABLE conta(
  id_conta INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  nome_conta VARCHAR(100) NOT NULL,
  vencimento VARCHAR(10) NOT NULL,
  valor VARCHAR(10) NOT NULL,
  status_conta VARCHAR(8) NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE tipo_lista(
  id_lista INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  nome_lista VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE item(
  id_item INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_lista INT(6) NOT NULL,
  id_usuario INT(6) NOT NULL,
  nome_item VARCHAR(100) NOT NULL,
  qtd  VARCHAR(10) NULL,
  concluido BIT(1) NULL,
  FOREIGN KEY (id_lista) REFERENCES tipo_lista(id_lista) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);