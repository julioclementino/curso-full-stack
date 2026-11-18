import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.json()); // permite ler o conteúdo do req.body

// ligando nosso servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na URL: http://localhost:${PORTA}`);
});
