import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";

const app = express();
const PORTA = 3000;

app.use(cors()); // libera o front para chamar a API
app.use(express.json()); // permite ler o conteúdo do req.body

// direcionar todas as rotas de produto para /produtos
app.use("/produtos", produtoRoutes);

// ligando nosso servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na URL: http://localhost:${PORTA}`);
});
