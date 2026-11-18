import express from "express";
import { Catalogo } from "./models/Catalogo.js";

const app = express();
const PORTA = 3000;

app.use(express.json()); // permite ler o conteúdo do req.body

// criar um novo catálogo
const catalogo = new Catalogo();
catalogo.adicionar("X-Tudo", 39.9, "Hamburguer", 10);
catalogo.adicionar("Coxinha", 19.9, "Salgados", 0);

// método GET - http://localhost:3000/
app.get("/", (req, res) => {
  res.send("API do Cardápio funcionando!");
});

// rota de listar produtos disponíveis - http://localhost:3000/produtos/disponiveis
app.get("/produtos/disponiveis", (req, res) => {
  res.json(catalogo.disponiveis());
});

// rota para buscar produto pelo id - http://localhost:3000/produtos/6
app.get("/produtos/:id", (req, res) => {
  const produto = catalogo.buscarPorId(Number(req.params.id));

  if (!produto) {
    // 404 = NOT_FOUND (Não Encontrado)
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  res.json(produto);
});

// método POST - http://localhost:3000/produtos/1/desconto
// body:
// {
//  "percentual": 50
// }
app.post("/produtos/:id/desconto", (req, res) => {
  const produto = catalogo.buscarPorId(Number(req.params.id));
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  try {
    produto.aplicarDesconto(req.body.percentual);
    res.json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// rota para vender um produto http://localhost:3000/produtos/1/vender
// body:
// {
//  "quantidade": 50
// }
app.post("/produtos/:id/vender", (req, res) => {
  const produto = catalogo.buscarPorId(Number(req.params.id));
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  try {
    produto.vender(req.body.quantidade);
    res.json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// cadastrar produto http://localhost:3000/produtos/
// body:
// {
//  "nome": "nome do produto"
//  "preco": preço do produto
//  "categoria": "categoria do produto"
//  "estoque": estoque do produto
// }
app.post("/produtos", (req, res) => {
  const { nome, preco, categoria, estoque } = req.body;

  try {
    const produto = catalogo.adicionar(nome, preco, categoria, estoque);
    res.status(201).json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// ligando nosso servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na URL: http://localhost:${PORTA}`);
});
