import { produto } from './Produto.js';

export class Combo extends produto {
  constructor(id, nome, preco, estoque, itens) {
    // super() faz referencia a classe Produto (class pai)
    super(id, nome, preco, 'combo', estoque);
    this.itens = itens;
  }

  descricao() {
    return `O combo ${this.nome} contém os seguintes itens: ${this.itens.join(' + ')}.`;
  }
}