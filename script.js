// Animação única: digitação do trecho de código no topo
(function () {
  const alvo = document.getElementById("typed");
  if (!alvo) return;
  const linhas = [
    ["kw", "def "], ["", "resolver(problema):\n"],
    ["cm", "    # primeiro, ouvir a operação\n"],
    ["", "    entender(problema.operacao)\n"],
    ["", "    organizar(problema.dados)\n"],
    ["kw", "    return "], ["", "ferramenta_simples()"]
  ];
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const montar = (qtd) => {
    let resto = qtd, html = "";
    for (const [cls, txt] of linhas) {
      const parte = txt.slice(0, Math.max(0, resto));
      resto -= txt.length;
      const seguro = parte.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      html += cls ? `<span class="${cls}">${seguro}</span>` : seguro;
      if (resto <= 0) break;
    }
    alvo.innerHTML = html;
  };
  const total = linhas.reduce((s, [, t]) => s + t.length, 0);
  if (reduzir) { montar(total); return; }
  let i = 0;
  const passo = () => { montar(++i); if (i < total) setTimeout(passo, 32); };
  setTimeout(passo, 400);
})();

// Menu no celular
(function () {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("menu");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", String(aberto));
    btn.textContent = aberto ? "Fechar" : "Menu";
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("aberto");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Menu";
    })
  );
})();

// Destaca no menu a seção visível
(function () {
  const links = [...document.querySelectorAll('.topo nav a[href^="#"]')];
  const secoes = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle("ativo", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  secoes.forEach((s) => obs.observe(s));
})();

// Linha do tempo: abre e fecha cada meta
document.querySelectorAll(".etapa").forEach((btn) => {
  btn.addEventListener("click", () => {
    const det = btn.nextElementSibling;
    const aberto = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!aberto));
    det.hidden = aberto;
  });
});
