import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import { sequelize } from "./config/database.js";

const app = express();
const PORTA = 3000;

app.use(cors()); // libera o front para chamar a API
app.use(express.json()); // permite ler o conteúdo do req.body

app.use(usuarioRoutes);
// direcionar todas as rotas de produto para /produtos
app.use("/produtos", produtoRoutes);

try {
  await sequelize.authenticate()
console.log("MySQL Conectado com sucesso!")
} catch (error) {
  console.log("Erro ao conectar ao MySQL: ", error.message);

}

// ligando nosso servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na URL: http://localhost:${PORTA}`);
});