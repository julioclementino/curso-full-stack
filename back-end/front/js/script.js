import { json } from "express";

const API = "http://localhost:3000";
const msg = document.querySelector("#msg");

function mostrarMensagem(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo; // "erro" ou "ok"
}

// funcao de carregar os produtos
// GET /produtos ou GET produtos/categoria
async function carregar() {
  const categoria = document.querySelector("#filtro").value;
  const URL = categoria
    ? `${URL}/produtos/categoria=${categoria}`
    : `${URL}/produtos`;

  const resposta = await fetch(URL);
  const produtos = await resposta.json();

  const lista = document.querySelector("#lista");
  lista.innerHTML = "";

  produtos.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - R$ ${p.preco} (estoque: x${p.estoque})`;

    //botao de vender POST /produtos:id/vender
    const botao = document.createElement("button");
    botao.textContent = "Vender 1";
    botao.addEventListener("click", () => vender(p.id));

    li.appendChild(botao);
    lista.appendChild(li);
  });
}

async function vender(id) {
    const resposta = await fetch(`${API}/produtos/${id}/vender`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade: 1 })
    })
    const dados = await resposta.json();

    if (!resposta.ok) {
        return mostrarMensagem(dados.erro, "erro");
    }

    mostrarMensagem(`Vendido: ${dados.nome}`, "ok");
    carregar()
}