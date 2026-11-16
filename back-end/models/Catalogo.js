import { Produto } from "./Produto.js";

export class Catalogo {
    constructor() {
        this.produtos = [];
        this.proximoId = 1;
    }

    adicionar(nome, preco, categoria, estoque) {
        const produto = new Produto(this.proximoId,nome, preco, categoria, estoque);

        this.proximoId = this.proximoId + 1;
        this.produtos.push(produto);

        return produto;
    }

    listar() {
        return this.produtos;
    }

    buscarPorId(id) {
        return this.produtos.find((produto) => produto.id === id);
    }

    disponiveis() {
        return this.produtos.filter((produto) => produto.estaDisponivel());
    }
}
