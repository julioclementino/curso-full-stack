export class Produto {
  constructor(id, nome, preco, categoria, estoque = 0) {
    if (!nome) {
      throw new Error("O nome é obrigatório!");
    }

    if (typeof preco !== "number" || preco <= 0) {
      throw new Error("O preço precisa ser um número e maior que 0!");
    }

    if (!categoria) {
      throw new Error("A categoria é obrigatória!");
    }

    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.estoque = estoque;
  }

  vender(quantidade) {
    if (quantidade > this.estoque) {
      throw new Error(
        "A quantidade precisa ser menor do que o estoque disponível.",
      );
    }

    this.estoque = this.estoque - quantidade;
  }

  estaDisponivel() {
    return this.estoque > 0; // se for maior, está disponível, se não for maior, não está disponível
  }

  aplicarDesconto(percentual) {
    if (percentual <= 0 || percentual > 50) {
      throw new Error("A porcentagem precisa ser entre 1% e 50%.");
    }

    this.preco = Number((this.preco * (1 - percentual / 100)).toFixed(2));
  }

  repor(quantidade) {
    if (typeof quantidade !== "number" || quantidade <= 0) {
      throw new Error("A quantidade precisa ser um número maior que 0.");
    }

    this.estoque = this.estoque + quantidade;
  }
}