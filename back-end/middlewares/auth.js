export function estaLogado(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: "Faça login para continuar!" });
  }

  next(); // se tiver logado chama o next
}
