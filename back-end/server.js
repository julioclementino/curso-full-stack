import express from "express";
import { error } from "node:console";

const app = express(); // criando a aplicação
const PORT = 3000; // criando a porta do servidor

// primeira rota da aplicação
app.get("/", (req, res) => {
  res.send("Hello, World Back-end!");
});

const produtos = [
  {
    id: 1, 
    nome: "Monitor",
    preco: 1500.00
  },
  {
    id: 2,
    nome: "Mouse",
    preco: 189.90
  },
  {
    id: 3,
    nome: "Teclado",
    preco: 259.90
  }
];

// lista produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// informações de um produto específico
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find(p => p.id === id);
  
  // se encontrar o produto, mostra o json, se não, mostra o erro 404   
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ erro: "Produto não encontrado" });
  }
});

// sobre, devolver um json com o nome da loja, a cidade e horarios de funcionamento
app.get("/sobre", (req, res) => {
  res.json({ 
    nome: "Bartolomias Store do bem",
    cidade: "Caruaru - PE   ",
    horarios: "Segunda a Sexta: 9h às 18h"
  });
});

// ouvir esse servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
