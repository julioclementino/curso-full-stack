const API = "http://localhost:3000";
const msg = document.querySelector("#msg");
const form = document.querySelector("#form")

let editandoId = null;

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

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", () => comecarEdicao(p));

    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", () => excluir(p.id, p.nome));

    li.append(botao, botaoEditar, botaoExcluir);
    lista.append(li);
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

function comecarEdicao(produto) {
  editandoId = produto.id;
  document.querySelector("#nome").value = produto.nome;
  document.querySelector("#preco").value = produto.preco;
  document.querySelector("#categoria").value = produto.categoria;
  document.querySelector("#estoque").value = produto.estoque;

  document.querySelector("#tituloForm").textContent = `Editando: ${produto.nome}`;
  document.querySelector("#botaoSalvar").textContent = "Salvar alteração";
  document.querySelector("#botaoCancelar").hidden =  false;
}

function cancelarEdicao() {
  editandoId = null;
  form.reset();
  document.querySelector("#tituloForm").textContent = "Novo Produto";
  document.querySelector("#botaoSalvar").textContent = "Cadastrar";
  document.querySelector("#botaoCancelar").hidden = true;
}

document.querySelector("#botaoCancelar").addEventListener("click", cancelarEdicao);

// quando trocar o filtro do select, fazer a busca novamente
document.querySelector("#filtro").addEventListener("change", carregar);

carregar(); // carregar ao abrir a página