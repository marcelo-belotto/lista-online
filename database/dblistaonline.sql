DROP DATABASE IF EXISTS dblistaonline;
CREATE DATABASE dblistaonline;
USE dblistaonline;
CREATE TABLE usuario(
  id_usuario INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  nome_usuario VARCHAR(25) NOT NULL,
  genero VARCHAR(1) NOT NULL,
  senha VARCHAR(6) NOT NULL
);

INSERT INTO usuario (id_usuario,nome_usuario,genero,senha) VALUES
(DEFAULT,"Pedro","M","1"),
(DEFAULT,"Estela","F","12"),
(DEFAULT,"João","M","123");

CREATE TABLE conta(
  id_conta INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  nome_conta VARCHAR(100) NOT NULL,
  vencimento VARCHAR(10) NOT NULL,
  valor DECIMAL NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO conta (id_conta,id_usuario,nome_conta,vencimento,valor) VALUES
(DEFAULT,2,"Energia","12-03-2023","114"),
(DEFAULT,2,"Internet","27-02-2023","99"),
(DEFAULT,1,"Financiamento carro","05-03-2023","678"),
(DEFAULT,1,"Energia","19-02-2023","93"),
(DEFAULT,3,"Internet","27-02-2023","79"),
(DEFAULT,3,"Aluguel","05-03-2023","900");

CREATE TABLE tipo_lista(
  id_lista INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  nome_lista VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO tipo_lista (id_lista,id_usuario,nome_lista) VALUES
(DEFAULT,2,"Supermecado"),
(DEFAULT,2,"Estudo"),
(DEFAULT,1,"Supermecado"),
(DEFAULT,1,"Tarefas diarias"),
(DEFAULT,3,"Construção"),
(DEFAULT,3,"Supermecado");

CREATE TABLE item(
  id_item INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_lista INT(6) NOT NULL,
  id_usuario INT(6) NOT NULL,
  nome_item VARCHAR(100) NOT NULL,
  qtd DECIMAL NULL,
  FOREIGN KEY (id_lista) REFERENCES tipo_lista(id_lista) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO item(id_item,id_lista,id_usuario,nome_item,qtd) VALUES
(DEFAULT,1,2,"arroz","5kg"),
(DEFAULT,1,2,"feijão","2kg"),
(DEFAULT,2,2,"java",""),
(DEFAULT,2,2,"phyton",""),

(DEFAULT,3,1,"Amaciante","1L"),
(DEFAULT,3,1,"Leite","3L"),
(DEFAULT,4,1,"Ir para academia",""),
(DEFAULT,4,1,"Estudar",""),

(DEFAULT,5,3,"Prego","1kg"),
(DEFAULT,5,3,"Cimento","3"),
(DEFAULT,6,3,"Carne","3kg"),
(DEFAULT,6,3,"Maçã","1kg");


SELECT * FROM usuario;
SELECT * FROM usuario WHERE id_usuario = 1;

SELECT * FROM conta;
SELECT * FROM conta WHERE id_conta = 1;

SELECT * FROM tipo_lista;
SELECT * FROM tipo_lista WHERE id_lista = 1;

SELECT * FROM item;
SELECT * FROM item WHERE id_item = 1;

UPDATE usuario SET `nome_usuario`="Fulano", `genero`="W", `senha`="123" WHERE id_usuario = 1;

UPDATE conta SET `id_usuario`="1", `nome_conta`="água", `vencimento`="01-01-2022", `valor`="22" WHERE id_conta = 1;

UPDATE tipo_lista SET `id_usuario`="2",`nome_lista`="Academia" WHERE id_lista = 1;

UPDATE item SET `id_lista`="1", `id_usuario`="1", `nome_item`="Miojo", `qtd`="2" WHERE id_item = 1;

DELETE FROM usuario WHERE id_usuario = 1;

DELETE FROM conta WHERE id_conta = 1;

DELETE FROM tipo_lista WHERE id_lista = 1;

DELETE FROM item WHERE id_item = 1;