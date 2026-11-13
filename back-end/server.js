import express from "express";

const app = express(); // criando a aplicação
const PORT = 3000; // criando a porta do servidor

// primeira rota da aplicação
app.get("/", (req, res) => {
  res.send("Hello, World Back-end!");
});

// ouvir esse servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
