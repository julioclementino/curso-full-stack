import { Catalogo } from "../models/Catalogo.js";

// criar um novo catálogo
const catalogo = new Catalogo();
catalogo.adicionar("X-Tudo", 39.9, "Hamburguer", 10);
catalogo.adicionar("Coxinha", 19.9, "Salgados", 0);

// função de listar todos os produtos ou por categoria
export function listar(req, res) {
  const { categoria } = req.query; // const categoria = req.query.categoria

  // se tiver a query ?categoria
  if (categoria) {
    const produtos = catalogo.buscarPorCategoria(categoria);

    if (!produtos.length) {
      return res
        .status(404)
        .json({ erro: `Nenhum produto da categoria ${categoria} encontrado!` });
    }

    return res.json(produtos); // ✅ return aqui
  }

  res.json(catalogo.listar());
}

// função para listar produtos disponíveis
export function disponiveis(req, res) {
  res.json(catalogo.disponiveis());
}

// função para buscar produto por ID
export function buscarPorId(req, res) {
  const produto = catalogo.buscarPorId(Number(req.params.id));

  if (!produto) {
    // 404 = NOT_FOUND (Não Encontrado)
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  res.json(produto);
}

// função de cadastrar produto
export function cadastrar(req, res) {
  const { nome, preco, categoria, estoque } = req.body;

  try {
    const produto = catalogo.adicionar(nome, preco, categoria, estoque);
    res.status(201).json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

// função de aplicar desconto
export function aplicarDesconto(req, res) {
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
}

// função de vender
export function vender(req, res) {
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
}

// função de repor estoque
export function repor(req, res) {
  const produto = catalogo.buscarPorId(Number(req.params.id));
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  try {
    produto.repor(req.body.quantidade);
    res.json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

// função para listar categorias
export function categorias(req, res) {
  res.json(catalogo.categorias());
}
