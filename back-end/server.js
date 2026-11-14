import express from "express";
import { error } from "node:console";

const app = express(); // criando a aplicação
const PORT = 3000; // criando a porta do servidor
app.use(express.json());

// primeira rota da aplicação
app.get("/", (req, res) => {
  res.send("Hello, World Back-end!");
});

const produtos = [
  {
    id: 1,
    nome: "Monitor",
    preco: 1500.0,
    categoria: "Monitores",
  },
  {
    id: 2,
    nome: "Mouse",
    preco: 189.9,
    categoria: "Periféricos",
  },
  {
    id: 3,
    nome: "Teclado",
    preco: 259.9,
    categoria: "Periféricos",
  },
];

// lista produtos
app.get("/produtos", (req, res) => {
  const categoria = req.query.categoria;

  if (!categoria || categoria.toLowerCase() === "todos") {
    return res.json(produtos);
  }

  const novaLista = produtos.filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase(),
  );

  if (novaLista.length === 0) {
    return res.status(404).json({
      erro: "Nenhum produto encontrado para a categoria informada",
    });
  }

  res.json(novaLista);
});

// informações de um produto específico
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  // se encontrar o produto, mostra o json, se não, mostra o erro 404
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ erro: "Produto não encontrado" });
  }
});

// cadastrar um novo produto
app.post("/produtos", (req, res) => {
  const { nome, preco, categoria } = req.body;

  // verificar se os campos foram preenchidos
  if (!nome || preco == null || !categoria) {
    return res.status(400).json({
      erro: "Preencha nome, preço e categoria",
    });
  }

  if (typeof preco !== "number" || !Number.isFinite(preco) || preco <= 0) {
    return res.status(400).json({
      erro: "O preço deve ser um número maior que zero",
    });
  }

  // criar um produto com ID automático
  const novoProduto = {
    id: Math.max(0, ...produtos.map((p) => p.id)) + 1,
    nome,
    preco,
    categoria,
  };

  // adicionar produto à lista
  produtos.push(novoProduto);

  // retornar produto cadastrado
  res.status(201).json({
    mensagem: "Produto cadastrado com sucesso!",
    produto: novoProduto,
  });
});

// sobre, devolver um json com o nome da loja, a cidade e horarios de funcionamento
app.get("/sobre", (req, res) => {
  res.json({
    nome: "Bartolomias Store do bem",
    cidade: "Caruaru - PE   ",
    horarios: "Segunda a Sexta: 9h às 18h",
  });
});

// ouvir esse servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
