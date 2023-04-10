DROP DATABASE IF EXISTS dblistaonline;
CREATE DATABASE dblistaonline;
USE dblistaonline;
CREATE TABLE usuario(
  id_usuario INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  nome_usuario VARCHAR(25) NOT NULL,
  email_usuario VARCHAR(50) NOT NULL,
  genero VARCHAR(1) NOT NULL,
  img VARCHAR(42) NULL,
  senha VARCHAR(6) NOT NULL
);

INSERT INTO usuario (id_usuario,nome_usuario,email_usuario,genero,img,senha) VALUES
(DEFAULT,"Pedro","pedro@gmail.com","M","","1"),
(DEFAULT,"Estela","estela@gmail.com","F","","12"),
(DEFAULT,"João","joão@gmail.com","M","","123");

CREATE TABLE conta(
  id_conta INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  nome_conta VARCHAR(100) NOT NULL,
  vencimento VARCHAR(10) NOT NULL,
  valor VARCHAR(10) NOT NULL,
  status_conta VARCHAR(8) NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO conta (id_conta,id_usuario,nome_conta,vencimento,valor,status_conta) VALUES
(DEFAULT,2,"Energia","12-03-2023","114.39","pago"),
(DEFAULT,2,"Internet","27-02-2023","99.12","pendente"),
(DEFAULT,1,"Financiamento carro","05-03-2023","678.99","pago"),
(DEFAULT,1,"Energia","19-02-2023","93.56","pendente"),
(DEFAULT,3,"Internet","27-02-2023","79.34","pago"),
(DEFAULT,3,"Aluguel","05-03-2023","900.23","pendente");

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
  qtd  VARCHAR(10) NULL,
  concluido BIT(1) NULL,
  FOREIGN KEY (id_lista) REFERENCES tipo_lista(id_lista) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO item(id_item,id_lista,id_usuario,nome_item,qtd,concluido) VALUES
(DEFAULT,1,2,"arroz","5kg",0),
(DEFAULT,1,2,"feijão","2kg",0),
(DEFAULT,2,2,"java","",0),
(DEFAULT,2,2,"phyton","",0),

(DEFAULT,3,1,"Amaciante","1L",0),
(DEFAULT,3,1,"Leite","3L",0),
(DEFAULT,4,1,"Ir para academia","",0),
(DEFAULT,4,1,"Estudar","",0),

(DEFAULT,5,3,"Prego","1kg",0),
(DEFAULT,5,3,"Cimento","3",0),
(DEFAULT,6,3,"Carne","3kg",0),
(DEFAULT,6,3,"Maçã","1kg",0);