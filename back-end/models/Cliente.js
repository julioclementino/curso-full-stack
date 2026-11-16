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
    this.pontos = this.pontos + valor;
  }
}
