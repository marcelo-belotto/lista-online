CREATE DATABASE LISTA_ONLINE;

USE LISTA_ONLINE;

CREATE TABLE TB_USUARIO(
  ID_USUARIO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  NOME VARCHAR(30) NOT NULL,
  SENHA VARCHAR(30) NOT NULL,
  GENERO VARCHAR(10) NOT NULL
);

CREATE TABLE TB_LISTA(
  ID_LISTA INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  ID_USUARIO INT NOT NULL,
  LISTA VARCHAR(30) NOT NULL,
  FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO)
);

CREATE TABLE TB_CONTA(
  ID_CONTA INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  ID_USUARIO INT NOT NULL,
  NOME VARCHAR(30) NOT NULL,
  VENCIMENTO VARCHAR(12) NOT NULL,
  VALOR DECIMAL NOT NULL,
  FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO)
);

CREATE TABLE TB_ITEM_LISTA(
  ID_ITEM INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  ID_LISTA INT NOT NULL,
  ITEM VARCHAR(30) NOT NULL,
  QTD DECIMAL NOT NULL,
  FOREIGN KEY (ID_LISTA) REFERENCES TB_LISTA(ID_LISTA)
)