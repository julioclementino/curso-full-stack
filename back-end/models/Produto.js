export class Produto {
  constructor(id, nome, preco, categoria, estoque) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.estoque = estoque;
  }

  vender(quantidade) {
    if (quantidade > this.estoque) {
      throw new Error("Quantidade solicitada maior que o estoque disponível.");
    }
    this.estoque = this.estoque - quantidade;
  }

  estaDisponivel() {
    return this.estoque > 0; // se for maior, ta disponível, se for 0, não ta disponível
  }

  aplicarDesconto(percentual) {
    if (percentual < 1 || percentual > 50) {
      throw new Error("A porcentagem de desconto deve estar entre 1% e 50%.");
    }

    this.preco = Number((this.preco * (1 - percentual / 100)).toFixed(2));
  }
}
    