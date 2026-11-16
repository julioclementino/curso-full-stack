export class Cliente {
    constructor(nome, email, cidade) {
        this.nome = nome;
        this.email = email;
        this.cidade = cidade;
    }

    apresentar() {
        return `Olá, meu nome é ${this.nome}, e eu moro em ${this.cidade}.`;
    }
}