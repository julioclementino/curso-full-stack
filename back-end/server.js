import express from "express";
import { Catalogo } from "./models/Catalogo.js";

const app = express();
const PORTA = 3000;

app.use(express.json()); // permite que o express entenda requisições com body em JSON

const catalogo = new Catalogo();
catalogo.adicionar("X-tudo", 39.9, "Hamburguer", 10);
catalogo.adicionar("Coxinha", 19.9, "Salgados", 0);

// métodos get
app.get("/", (req, res) => {
  res.send("Api cardápio funcionando!");
});

// listar os produtos do catálogo
app.get("/produtos", (req, res) => {
  res.json(catalogo.listar());
});

// listar os produtos disponíveis do catálogo
app.get("/produtos/disponiveis", (req, res) => {
  res.json(catalogo.disponiveis());
});

// buscar produto por id
app.get("/produtos/:id", (req, res) => {
  const produto = catalogo.buscarPorId(Number(req.params.id));

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

// Método POST para produtos com desconto
app.post("/produtos/:id/desconto", (req, res) => {
  const produto = catalogo.buscarPorId(Number(req.params.id));

  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  try {
    produto.aplicarDesconto(req.body.percentual);
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Método POST para vender produtos
app.post("/produtos/:id/vender", (req, res) => {
  const produto = catalogo.buscarPorId(Number(req.params.id));

  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  try {
    produto.vender(req.body.quantidade);
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor está rodando em http://localhost:${PORTA}`);
});
