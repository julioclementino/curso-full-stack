import { Catalogo } from "./models/Catalogo.js";

// Criar um novo catalogo
const catalogo = new Catalogo();
catalogo.adicionar("X-tudo", 39.9, "Hamburguer", 10);
catalogo.adicionar("Coxinha", 19.9, "Salgados", 0);

// Função para listar todos os produtos ou por categoria
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

// rota de listar produtos disponíveis - http://localhost:3000/produtos/disponiveis
export function disponiveis(req, res) {
  res.json(catalogo.disponiveis());
}

// buscar produto pelo id
export function buscarPorId(req, res) {
  const produto = catalogo.buscarPorId(Number(req.params.id));

  if (!produto) {
    // 404 = NOT_FOUND (Não Encontrado)
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  res.json(produto);
}

// cadastrar produto
export function cadastrar(req, res) {
  const { nome, preco, categoria, estoque } = req.body;

  try {
    const produto = catalogo.adicionar(nome, preco, categoria, estoque);
    res.status(201).json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

// funcao aplicar desconto em um produto
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

// funcao de vender um produto
export function venderProduto(req, res) {
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
