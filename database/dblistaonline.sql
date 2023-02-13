DROP DATABASE IF EXISTS dblistaonline;
CREATE DATABASE dblistaonline;
USE dblistaonline;
CREATE TABLE tb_usuario(
  id_usuario INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  usuario VARCHAR(25) NOT NULL,
  genero VARCHAR(1) NOT NULL,
  senha VARCHAR(8) NOT NULL
);

INSERT INTO tb_usuario (id_usuario,usuario,genero,senha) VALUES
(DEFAULT,"Pedro","M","1"),
(DEFAULT,"Estela","F","12"),
(DEFAULT,"João","M","123");

CREATE TABLE tb_conta(
  id_conta INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  conta VARCHAR(40) NOT NULL,
  vencimento VARCHAR(10) NOT NULL,
  valor DECIMAL NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO tb_conta (id_conta,id_usuario,conta,vencimento,valor) VALUES
(DEFAULT,2,"Energia","12-03-2023","114"),
(DEFAULT,2,"Internet","27-02-2023","99"),
(DEFAULT,1,"Financiamento carro","05-03-2023","678"),
(DEFAULT,1,"Energia","19-02-2023","93"),
(DEFAULT,3,"Internet","27-02-2023","79"),
(DEFAULT,3,"Aluguel","05-03-2023","900");

CREATE TABLE tb_lista(
  id_lista INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_usuario INT(6) NOT NULL,
  lista VARCHAR(30) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO tb_lista (id_lista,id_usuario,lista) VALUES
(DEFAULT,2,"Supermecado"),
(DEFAULT,2,"Estudo"),
(DEFAULT,1,"Supermecado"),
(DEFAULT,1,"Tarefas diarias"),
(DEFAULT,3,"Construção"),
(DEFAULT,3,"Supermecado");

CREATE TABLE tb_item(
  id_item INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_lista INT(6) NOT NULL,
  id_usuario INT(6) NOT NULL,
  item VARCHAR(30) NOT NULL,
  qtd DECIMAL NULL,
  FOREIGN KEY (id_lista) REFERENCES tb_lista(id_lista) ON DELETE CASCADE
);

INSERT INTO tb_item(id_item,id_lista,id_usuario,item,qtd) VALUES
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


SELECT * FROM tb_usuario;
SELECT * FROM tb_usuario WHERE id_usuario = 1

SELECT * FROM tb_conta;
SELECT * FROM tb_conta WHERE id_conta = 1

SELECT * FROM tb_lista;
SELECT * FROM tb_lista WHERE id_lista = 1

SELECT * FROM tb_item;
SELECT * FROM tb_item WHERE id_item = 1

UPDATE tb_usuario SET `usuario`="Fulano", `genero`="W", `senha`="123" WHERE id_usuario = 1

UPDATE tb_conta SET `id_usuario`="1", `conta`="Água", `vencimento`="01-01-2022", `valor`="22" WHERE id_conta = 1

UPDATE tb_lista SET `id_usuario`="1",`lista`="Academia", WHERE id_lista = 1

UPDATE tb_item SET `id_lista`="1", `id_usuario`="1", `item`="Miojo", `qtd`="2" WHERE id_item = 1

DELETE FROM tb_usuario WHERE id_usuario = 1

DELETE FROM tb_conta WHERE id_conta = 1

DELETE FROM tb_lista WHERE id_lista = 1

DELETE FROM tb_item WHERE id_item = 1

formata valor para moeda js => let resultFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money);
