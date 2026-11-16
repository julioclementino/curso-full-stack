import { Cliente } from "./models/Cliente.js";

const julio = new Cliente("Julio", "juliodev7@gmail.com", "Caruaru");

console.log(julio.nome);
console.log(julio.email);
console.log(julio.cidade);

console.log(julio.apresentar());

console.log(`Quantidade de pontos atuais de ${julio.nome}: ${julio.pontos}`);
julio.ganharPontos(10);
console.log(`Quantidade de pontos após a atualização: ${julio.pontos}`);