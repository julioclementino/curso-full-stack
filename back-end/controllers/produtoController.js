import { Catalogo } from "../models/Catalogo.js";
import { Produto } from "../models/Produto.js";

// criar um novo catálogo
const catalogo = new Catalogo();
catalogo.adicionar("X-Tudo", 39.9, "Hamburguer", 10);
catalogo.adicionar("Coxinha", 19.9, "Salgados", 0);

// função de listar todos os produtos ou por categoria
export async function listar(req, res) {
  const { categoria } = req.query; // const categoria = req.query.categoria

  // se tiver a query ?categoria
  if (categoria) {
    const produtos = await Produto.findAll({ where: { categoria } });

    if (!produtos.length) {
      return res
        .status(404)
        .json({ erro: `Nenhum produto da categoria ${categoria} encontrado!` });
    }

    return res.json(produtos); //  return aqui
  }

  const produtos = await Produto.findAll();
  res.json(produtos);
}

// função para listar produtos disponíveis
export async function disponiveis(req, res) {
  const produtos = await Produto.findAll();
  res.json(produtos.filter((p) => p.estaDisponivel()));
}

// função para buscar produto por ID
export async function buscarPorId(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    // 404 = NOT_FOUND (Não Encontrado)
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  res.json(produto);
}

// função de cadastrar produto
export async function cadastrar(req, res) {
  const { nome, preco, categoria, estoque } = req.body;

  try {
    const produto = await Produto.create({ nome, preco, categoria, estoque });
    res.status(201).json(produto);
  } catch (erro) {
    const mensagem = erro.erros ? erro.erros[0].message : erro.message;
    res.status(400).json({ erro: mensagem });
  }
}

// função de aplicar desconto
export async function aplicarDesconto(req, res) {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  try {
    produto.aplicarDesconto(req.body.percentual);
    await produto.save();
    res.json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

// função de vender
export async function vender(req, res) {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  try {
    produto.vender(req.body.quantidade);
    await produto.save();
    res.json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

// função de repor estoque
export async function repor(req, res) {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  try {
    produto.repor(req.body.quantidade);
    await produto.save();
    res.json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

// função para listar categorias
export function categorias(req, res) {
  res.json(catalogo.categorias());
}


export async function atualizar(req, res) {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) {
    return res.status(404).json({erro: "Produto não encontrado."});
  }

  const { nome, preco, categoria, estoque } = req.body;

  try {
    await Produto.update({ nome, preco, categoria, estoque });
    res.json(produto);
  } catch {erro} {
    const mensagem = erro.erros ? erro.erros[0].message : erro.message;
    res.status(400).json({ erro: mensagem});
  }
}

export async function excluir(req, res) {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) {
    return res.status(404).json({erro: "Produto não encontrado."});
  }

  await produto.destroy();
  res.status(204).send();
}