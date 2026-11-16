export class Cliente {
  constructor(nome, email, cidade) {
    this.nome = nome;
    this.email = email;
    this.cidade = cidade;
    this.pontos = 0;
  }

  apresentar() {
    return `Olá, meu nome é ${this.nome}, e eu moro em ${this.cidade}.`;
  }

  ganharPontos(valor) {
    if (valor <= 0 || valor > 100) {
      throw new Error(
        "O valor de pontos deve ser maior que 0 e menor ou igual a 100.",
      );
    }
    this.pontos = this.pontos + valor;
  }
}
