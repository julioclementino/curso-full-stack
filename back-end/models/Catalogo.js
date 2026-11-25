import { Produto } from "./Produto.js";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class Catalogo extends Model {
  constructor() {
    this.produtos = [];
    this.proximoId = 1;
  }

  adicionar(nome, preco, categoria, estoque) {
    const produto = new Produto(
      this.proximoId,
      nome,
      preco,
      categoria,
      estoque,
    );

    this.proximoId = this.proximoId + 1;
    this.produtos.push(produto);

    return produto;
  }

  listar() {
    return this.produtos;
  }

  buscarPorId(id) {
    return this.produtos.find((p) => p.id === id);
  }

  disponiveis() {
    return this.produtos.filter((p) => p.estaDisponivel());
  }

  buscarPorCategoria(categoria) {
    return this.produtos.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
  }

  categorias() {
    const nomes = this.produtos.map((p) => p.categoria);
    return [...new Set(nomes)]; // Set remove as categorias duplicadas
  }
}