SET SQL_SAFE_UPDATES = 0;

UPDATE produtos SET estoque = 30 WHERE nome = "Coxinha";

SELECT * FROM produtos WHERE nome = "Coxinha";