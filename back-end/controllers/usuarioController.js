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
  } catch (erro) {
    const mensagem = erro.errors ? erro.errors[0].message : erro.message;
    res.status(400).json({ erro: mensagem });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;

  const usuario = await usuario.findOne({ where: email });
  const senhaCerta =
    usuario && (await bcrypt.compare(senha || "", usuario.senha));

  if (!senhaCerta) {
    return res.status(401).json({ erro: "Email ou senha inválidos!" });
  }

  req.session.usuario = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
  res.json({
    mensagem: `Bem-vindo(a), ${usuario.nome}`,
    usuario: req.session.usuario,
  });
}

export function me(req, res) {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: "Ninguém logado!" });
  }

  res.json(req.session.usuario);
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.json({ mensagem: "Você foi deslogado" });
  });
}
