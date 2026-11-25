import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/database.js";

export class Produto extends Model {
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

Produto.init(
  {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "O nome é obrigatório." },
        notEmpty: { msg: "O nome é obrigatório." },
      },
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "O preço é obrigatório." },
        min: { args: [0.01], msg: "O preço precisa ser maior que 0." },
      },
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "produtos",
    timestamps: false,
  },
);
