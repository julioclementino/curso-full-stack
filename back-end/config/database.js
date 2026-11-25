import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("cardapio", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: { decimalNumbers: true },
});
