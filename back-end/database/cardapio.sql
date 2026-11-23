CREATE DATABASE cardapio;

USE cardapio;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DOUBLE(10,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    estoque INT DEFAULT 0
);