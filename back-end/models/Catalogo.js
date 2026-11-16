export class Catalogo {
    constructor() {
        this.produtos = [];
        this.proximoId = 1;
    }

    adicionar(nome, preco, categoria, estoque) {
        const produto = new Produto(
            this.proximoId++,
            nome,
            preco,
            categoria,
            estoque
        );
        this.produtos.push(produto);
        return produto;
    }
}