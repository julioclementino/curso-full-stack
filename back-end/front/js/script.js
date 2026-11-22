const API = "http://localhost:3000";
const msg = document.querySelector("#msg");

function mostrarMensagem(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo; // "erro" ou "ok"
}

// função de carregar os produtos
// GET /produtos ou GET /produtos?categoria=
async function carregar() {
  const categoria = document.querySelector("#filtro").value;
  const URL = categoria
    ? `${API}/produtos?categoria=${categoria}`
    : `${API}/produtos`;

  const resposta = await fetch(URL);
  const produtos = await resposta.json();

  const lista = document.querySelector("#lista");
  lista.innerHTML = "";

  produtos.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - R$ ${p.preco} (estoque: x${p.estoque})`;

    // botão VENDER: POST /produtos/:id/vender
    const botao = document.createElement("button");
    botao.textContent = "Vender 1";
    botao.addEventListener("click", () => vender(p.id));

    li.appendChild(botao);
    lista.appendChild(li);
  });
}

// função de vender produto
// POST /produtos/:id/vender
async function vender(id) {
  const resposta = await fetch(`${API}/produtos/${id}/vender`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantidade: 1 }),
  });
  const dados = await resposta.json();

  if (!resposta.ok) {
    return mostrarMensagem(dados.erro, "erro");
  }

  mostrarMensagem(`Vendido: ${dados.nome}`, "ok");
  carregar();
}

// quando trocar o filtro do select, fazer a busca novamente
document.querySelector("#filtro").addEventListener("change", carregar);

carregar(); // carregar ao abrir a página