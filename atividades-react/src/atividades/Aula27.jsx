import { useEffect, useState } from "react";

const storageKey = "barto-counter-v1";
const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (
      data &&
      Number.isInteger(data.quantity) &&
      data.quantity >= 0 &&
      data.quantity <= 9999 &&
      Number.isInteger(data.goal) &&
      data.goal > 0 &&
      data.goal <= 9999
    )
      return { ...data, history: [] };
  } catch {
    /* Funciona também sem armazenamento local. */
  }
  return { quantity: 0, goal: 20, history: [] };
}

export default function Aula27() {
  const [state, setState] = useState(loadState);
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(true);
  const { quantity, goal, history } = state;
  const progress = Math.min(100, Math.round((quantity / goal) * 100));
  const complete = quantity >= goal;

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ quantity, goal }));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [quantity, goal]);

  function change(delta, reset = false) {
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setState((current) => {
      const next = reset
        ? 0
        : Math.max(0, Math.min(9999, current.quantity + delta));
      if (next === current.quantity) return current;
      return {
        ...current,
        quantity: next,
        history: [
          {
            delta: next - current.quantity,
            previous: current.quantity,
            time,
            reset,
          },
          ...current.history,
        ].slice(0, 5),
      };
    });
  }
  function undo() {
    setState((current) =>
      current.history.length
        ? {
            ...current,
            quantity: current.history[0].previous,
            history: current.history.slice(1),
          }
        : current,
    );
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Bartô — início">
          <span className="brand-icon">b.</span> bartô<sup>®</sup>
        </a>
        <span className="header-tag">PEQUENAS AÇÕES. GRANDES NÚMEROS.</span>
        <span className="project-badge">
          <i /> laboratório React
        </span>
      </header>
      <main id="inicio">
        <section className="intro">
          <div>
            <p className="eyebrow">SEU CONTADOR, COM PERSONALIDADE</p>
            <h1>
              Cada unidade
              <br />
              conta<span>.</span>
            </h1>
          </div>
          <p>
            Organize sua quantidade, acompanhe o total
            <br className="desktop-break" /> e chegue à sua meta. Um clique de
            cada vez.
          </p>
        </section>
        <div className="dashboard">
          <section className="counter-card" aria-labelledby="product-name">
            <div className="card-top">
              <span className="eyebrow">01 / CONTADOR</span>
              <span className="live-badge">
                <i /> AO VIVO
              </span>
            </div>
            <div className="product-row">
              <div className="product-art" aria-hidden="true">
                <span className="box-tape" />
                <span className="box-face">◡</span>
                <b>b.</b>
              </div>
              <div>
                <span className="small-label">O SEU PRODUTO</span>
                <h2 id="product-name">Bartolomias</h2>
                <p>
                  {money.format(10)} <span>/ unidade</span>
                </p>
              </div>
            </div>
            <div className="counter-display">
              <span className="small-label">QUANTIDADE SELECIONADA</span>
              <output
                aria-live="polite"
                aria-atomic="true"
                className="big-number"
              >
                {String(quantity).padStart(2, "0")}
              </output>
              <span className="unit-label">
                {quantity === 1 ? "unidade" : "unidades"}
              </span>
            </div>
            <div className="quantity-controls">
              <button
                className="minus-button"
                type="button"
                aria-label={`Diminuir ${step} unidades`}
                disabled={quantity === 0}
                onClick={() => change(-step)}
              >
                −
              </button>
              <button
                className="add-button"
                type="button"
                disabled={quantity === 9999}
                onClick={() => change(step)}
              >
                <span>+</span> Adicionar{" "}
                {step === 1 ? "unidade" : `${step} unidades`}
              </button>
            </div>
            <div className="counter-options">
              <div className="step-control">
                <span>Quantidade</span>
                <div role="group" aria-label="Unidades por clique">
                  {[1, 5, 10].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={step === value}
                      onClick={() => setStep(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="text-button"
                type="button"
                disabled={quantity === 0}
                onClick={() => change(0, true)}
              >
                ↺ Zerar contador
              </button>
            </div>
            <div className="counter-note">
              <span aria-hidden="true">↗</span> Pequenos passos também são
              progresso.
            </div>
          </section>
          <aside className="side-column" aria-label="Resumo e meta">
            <section className="total-card">
              <div className="card-top">
                <span className="eyebrow">02 / SEU RESUMO</span>
                <span aria-hidden="true">↗</span>
              </div>
              <p className="total-label">Tudo somado.</p>
              <p className="total-value" aria-live="polite">
                {money.format(quantity * 10)}
              </p>
              <div className="total-details">
                <span>
                  {quantity} {quantity === 1 ? "unidade" : "unidades"} ×{" "}
                  {money.format(10)}
                </span>
                <span>Subtotal</span>
              </div>
            </section>
            <section className="goal-card" aria-labelledby="goal-title">
              <div className="card-top">
                <h2 id="goal-title">Uma meta por vez</h2>
                <span className="goal-icon" aria-hidden="true">
                  ◎
                </span>
              </div>
              <p>
                {complete
                  ? "Você chegou lá. Que tal um novo desafio?"
                  : `Faltam ${goal - quantity} unidades. Continue assim!`}
              </p>
              <div className="progress-heading">
                <span>{complete ? "Meta alcançada!" : "Seu progresso"}</span>
                <strong>{progress}%</strong>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Progresso da meta"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <label className="goal-input">
                Minha meta
                <input
                  type="number"
                  min="1"
                  max="9999"
                  step="1"
                  value={goal}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (Number.isInteger(value) && value > 0 && value <= 9999)
                      setState((current) => ({ ...current, goal: value }));
                  }}
                />
                <span>unidades</span>
              </label>
            </section>
          </aside>
        </div>
        <section className="history-card" aria-labelledby="history-title">
          <div className="history-heading">
            <div>
              <span className="eyebrow">03 / PASSO A PASSO</span>
              <h2 id="history-title">
                Últimos movimentos<span> / nesta sessão</span>
              </h2>
            </div>
            <button
              className="text-button"
              type="button"
              disabled={!history.length}
              onClick={undo}
            >
              ↶ Desfazer última ação
            </button>
          </div>
          {history.length ? (
            <ol className="history-list">
              {history.map((item, index) => (
                <li key={index}>
                  <span
                    className={`movement-icon ${item.delta > 0 ? "positive" : ""}`}
                    aria-hidden="true"
                  >
                    {item.reset ? "↺" : item.delta > 0 ? "+" : "−"}
                  </span>
                  <div>
                    <strong>
                      {item.reset
                        ? "Contador zerado"
                        : item.delta > 0
                          ? "Unidades adicionadas"
                          : "Unidades removidas"}
                    </strong>
                    <span>{item.time}</span>
                  </div>
                  <b>
                    {item.delta > 0 ? "+" : ""}
                    {item.delta}
                  </b>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty-history">
              <span aria-hidden="true">↗</span>
              <p>
                O primeiro passo é seu.
                <small>Adicione uma unidade para começar seu histórico.</small>
              </p>
              <span className="empty-dots" aria-hidden="true">
                · · ·
              </span>
            </div>
          )}
        </section>
      </main>
      <footer>
        <span>Feito de cliques e possibilidades.</span>
        <span>
          <i className={saved ? "save-dot" : "save-dot unsaved"} />
          {saved
            ? "Quantidade e meta salvas neste navegador"
            : "Armazenamento indisponível · dados nesta sessão"}
        </span>
      </footer>
    </div>
  );
}
