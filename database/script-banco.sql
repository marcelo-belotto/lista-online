CREATE DATABASE LISTA_ONLINE;

USE LISTA_ONLINE;

CREATE TABLE tbusuario(
	id_usuario INT(5) NOT NULL auto_increment PRIMARY KEY,
	nome_usuario VARCHAR(20) NOT NULL,
    senha_usuario VARCHAR(20) NOT NULL,
    sexo_usuario VARCHAR(20) NOT NULL
);

CREATE TABLE tbconta(
	id_conta INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_conta VARCHAR(20) NOT NULL,
    data_conta VARCHAR(20) NOT NULL,
    valor_conta VARCHAR(20) NOT NULL
);