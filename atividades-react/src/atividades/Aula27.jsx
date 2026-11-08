import { useState } from "react";

function Aula27() {
  const [quantidade, setQuantidade] = useState(0);
  const preco = 10;
  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  return (
    <main className="product-card">
      <h1>Meu primeiro contador React</h1>

      <section aria-labelledby="product-name">
        <h2 id="product-name">Bartolomias</h2>
        <p>Preço unitário: {formatarMoeda(preco)}</p>

        <div className="quantity-controls" aria-label="Controle de quantidade">
          <button
            type="button"
            aria-label="Diminuir quantidade"
            disabled={quantidade === 0}
            onClick={() => setQuantidade((atual) => atual - 1)}
          >
            −
          </button>
          <output aria-live="polite">{quantidade}</output>
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() => setQuantidade((atual) => atual + 1)}
          >
            +
          </button>
        </div>

        <p className="subtotal" aria-live="polite">
          Subtotal: {formatarMoeda(quantidade * preco)}
        </p>
      </section>
    </main>
  );
}

export default Aula27;