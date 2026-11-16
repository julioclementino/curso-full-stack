import { Cliente } from './models/Cliente.js';

const julio = new Cliente("Julio", "juliodev7@gmail.com", "Caruaru");

console.log(julio.nome);
console.log(julio.email);
console.log(julio.cidade);
console.log(julio.apresentar());