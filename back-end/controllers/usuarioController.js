import bcrypt from "bcryptjs";
import { Usuario } from "../models/Usuario.js";

export async function cadastrar(req, res) {
  const { nome, email, senha } = req.body;

  if (!senha || senha.length < 6) {
    return res
      .status(400)
      .json({ erro: "A senha precisa ter pelo menos 6 caracteres." });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash });
    res
      .status(201)
      .json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch {
    erro;
  }
  {
    const mensagem = erro.erros ? erro.erros[0].message : erro.message;
    res.status(400).json({ erro: mensagem });
  }
}