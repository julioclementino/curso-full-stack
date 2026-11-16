import { Cliente } from "./models/Cliente.js";

const julio = new Cliente("Julio", "juliodev7@gmail.com", "Caruaru");

console.log(julio.nome);
console.log(julio.email);
console.log(julio.cidade);

console.log(julio.apresentar());

console.log(`Quantidade de pontos atuais de ${julio.nome}: ${julio.pontos}`);

try {
  julio.ganharPontos(200);
} catch (error) {
  console.log(error.message);
}

console.log(`Quantidade de pontos após a atualização: ${julio.pontos}`);
