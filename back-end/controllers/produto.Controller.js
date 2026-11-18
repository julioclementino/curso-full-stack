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
