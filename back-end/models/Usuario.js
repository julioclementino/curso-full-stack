import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class Usuario extends Model {}

Usuario.init(
  {
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "O nome é obrigatório!" },
        notEmpty: { msg: "O nome é obrigatório!" },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: "Este e-mail já está em uso!" },
      validate: {
        notNull: { msg: "O e-mail é obrigatório" },
        isEmail: { msg: "Informe um e-mail válido!" },
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: false,
  },
);
