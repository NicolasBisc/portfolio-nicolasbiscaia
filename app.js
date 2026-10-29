(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  /* ---------- terminal do topo ---------- */
  const linhas = [
    ["p", "algoritmo "], ["s", "\"Nicolas\"\n"],
    ["", "  nome      ← "], ["s", "\"Nicolas Biscaia\"\n"],
    ["", "  estuda    ← "], ["s", "\"Engenharia de Software\"\n"],
    ["", "  trabalha  ← "], ["s", "\"Aprendiz em Tecnologia na Koube\"\n"],
    ["", "  procura   ← "], ["s", "\"Estágio\"\n\n"],
    ["p", "  se "], ["", "encontrar um problema "], ["p", "então\n"],
    ["", "    entender quem usa\n"],
    ["", "    resolver com tecnologia\n"],
    ["p", "  fimse\n"],
    ["p", "fimalgoritmo"]
  ];
  const alvo = $("#typed");
  const total = linhas.reduce((s, l) => s + l[1].length, 0);
  const montar = (n) => {
    let resto = n, html = "";
    for (const [c, t] of linhas) {
      const parte = t.slice(0, Math.max(0, resto)); resto -= t.length;
      html += c ? `<span class="${c}">${esc(parte)}</span>` : esc(parte);
      if (resto <= 0) break;
    }
    alvo.innerHTML = html;
  };
  if (alvo) {
    if (reduzir) montar(total);
    else { let i = 0; const passo = () => { montar(++i); if (i < total) setTimeout(passo, 24); }; setTimeout(passo, 500); }
  }

  /* ---------- cartas de habilidades no topo ---------- */
  const CARTAS = [
    [["h","Py","Python","Sistema de produção e relatórios automáticos.","uso diário"],["s","?!","Resolver problemas","Entender a operação antes de escrever código.","ponto forte"],["h","PG","PostgreSQL","Banco do sistema de produção.","projeto real"],["h","XL","Excel","Dashboards de metas da operação.","certificado"],["s","💬","Comunicação","Ouvir a produção e treinar a equipe.","todo dia"]],
    [["h","SQL","SQL","Consultas e modelagem de dados.","evoluindo"],["h","</>","HTML","Telas do sistema e do treinamento 5S.","projeto real"],["s","⏱","Gestão do tempo","Trabalho, faculdade e ônibus em equilíbrio.","todo dia"],["h","ERP","TOTVS","Requisições e metas da operação.","uso diário"],["h","Git","Git e GitHub","Projetos versionados e públicos.","uso diário"]],
    [["h","JS","JavaScript","Interatividade das telas e deste site.","evoluindo"],["s","🤝","Trabalho em equipe","Soluções construídas junto com quem usa.","sempre"],["h","{ }","CSS","O visual das interfaces que crio.","projeto real"],["h","BI","Power BI","Painéis e indicadores.","análises"],["s","✦","Curiosidade","Cada dúvida vira um motivo para estudar.","sempre ativa"]],
    [["h","SP","SharePoint","Acervo digital organizado por setor.","implantado"],["h","AI","Claude AI","IA levada para a gestão da empresa.","implantado"],["s","↗","Aprender sempre","Um projeto novo, um aprendizado novo.","sempre"],["h","C","C","Base de lógica e algoritmos.","faculdade"],["s","◎","Organização","Processos claros e arquivos no lugar.","todo dia"]]
  ];
  const deck = $("#deck");
  if (deck) {
    const carta = ([t, mn, n, d, r]) => `<div class="carta ${t === "h" ? "hard" : "soft"}"><span class="tp"><b>${t === "h" ? "hard" : "soft"}</b> skill</span><div class="mn">${esc(mn)}</div><h4>${n}</h4><p>${d}</p><div class="rod"><span>${r}</span><span>NB</span></div></div>`;
    deck.innerHTML = CARTAS.map((col) => { const html = col.map(carta).join(""); return `<div class="col"><div class="trk">${html}${html}</div></div>`; }).join("");
  }

  /* ---------- tema claro / escuro ---------- */
  const raiz = document.documentElement, btTema = $("#tema");
  const corTopo = () => { const m = $('meta[name="theme-color"]'); if (m) m.content = raiz.dataset.theme === "light" ? "#F6F4EF" : "#0A0A0B"; };
  if (btTema) {
    btTema.addEventListener("click", () => {
      const claro = raiz.getAttribute("data-theme") !== "light";
      if (claro) raiz.setAttribute("data-theme", "light"); else raiz.removeAttribute("data-theme");
      try { localStorage.setItem("tema", claro ? "light" : "dark"); } catch (e) {}
      corTopo();
    });
    corTopo();
  }

  /* ---------- menu e topo ---------- */
  const topo = $("#topo"), btn = $(".menu-btn"), nav = $("#menu");
  const onScroll = () => topo.classList.toggle("solid", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  btn.addEventListener("click", () => {
    const a = nav.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", String(a)); btn.textContent = a ? "Fechar" : "Menu";
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("aberto"); btn.setAttribute("aria-expanded", "false"); btn.textContent = "Menu";
  }));
  if ("IntersectionObserver" in window) {
    const links = $$('a[href^="#"]', nav);
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("ativo", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.map((a) => $(a.getAttribute("href"))).filter(Boolean).forEach((s) => obs.observe(s));

    const rv = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    $$(".rv").forEach((el) => rv.observe(el));
  } else { $$(".rv").forEach((el) => el.classList.add("in")); }

  /* ---------- fluxo do Envase ---------- */
  const fluxo = [
    ["planilha.xlsx", "O setor registra no Excel a programação e o realizado de cada dia do mês."],
    ["leitura", "O Python lê a planilha e organiza os dados por dia, semana e produto."],
    ["cálculo", "As regras calculam programado x realizado, saldo, média diária e o avanço da meta."],
    ["gráficos", "Os números viram gráficos de barras com a linha da meta, prontos para a reunião."],
    ["relatório.docx", "Os dois relatórios saem em Word, no padrão visual da Koube, sem montagem manual."]
  ];
  const det = $("#fluxoDet");
  const mostrarFluxo = (i) => {
    $$(".fluxo-passos button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
    det.innerHTML = `<b>&gt; ${fluxo[i][0]}</b>${fluxo[i][1]}`;
  };
  $$(".fluxo-passos button").forEach((b) => b.addEventListener("click", () => mostrarFluxo(+b.dataset.i)));
  if (det) mostrarFluxo(0);

  /* ---------- habilidades ---------- */
  const S = [
    { id: "py", mn: "Py", n: "Python", f: "ling", nv: "Uso no dia a dia", t: "Minha linguagem principal. Está no sistema de produção e nas ferramentas que automatizam os relatórios do Envase." },
    { id: "sql", mn: "SQL", n: "SQL", f: "ling", nv: "Base sólida, evoluindo", t: "Consultas e modelagem de dados, praticadas na faculdade e no banco do sistema de produção." },
    { id: "js", mn: "JS", n: "JavaScript", f: "ling", nv: "Básico, em evolução", t: "Interatividade das telas do sistema de produção e deste site." },
    { id: "html", mn: "</>", n: "HTML", f: "ling", nv: "Uso no dia a dia", t: "Estrutura das telas do sistema de produção, do treinamento 5S e deste site." },
    { id: "css", mn: "{ }", n: "CSS", f: "ling", nv: "Uso no dia a dia", t: "Visual das interfaces. O treinamento 5S foi feito do zero só com HTML e CSS." },
    { id: "c", mn: "C", n: "C", f: "ling", nv: "Básico, da faculdade", t: "Linguagem da disciplina de Algoritmos e Pensamento Computacional, onde aprendi a base de lógica e estruturas." },
    { id: "pg", mn: "PG", n: "PostgreSQL", f: "dados", nv: "Projeto real", t: "Banco do sistema de produção: guarda o histórico, o cadastro de máquinas e os registros de cada módulo." },
    { id: "xl", mn: "XL", n: "Excel", f: "dados", nv: "Avançado, com certificado", t: "Dashboards de metas da operação. Certificado pela Fundação Bradesco." },
    { id: "bi", mn: "BI", n: "Power BI", f: "dados", nv: "Análises e painéis", t: "Visualização de dados e painéis de indicadores." },
    { id: "git", mn: "Git", n: "Git e GitHub", f: "ferr", nv: "Uso no dia a dia", t: "Versiono os projetos e mantenho o código público em github.com/NicolasBisc." },
    { id: "erp", mn: "ERP", n: "TOTVS", f: "ferr", nv: "Uso no dia a dia", t: "ERP que uso na gestão de requisições, junto dos dashboards de metas em Excel." },
    { id: "sp", mn: "SP", n: "SharePoint", f: "ferr", nv: "Implantado na empresa", t: "Centralizei o acervo digital da Koube, migrando arquivos dispersos e organizando tudo por setor." },
    { id: "ai", mn: "AI", n: "Claude AI", f: "ferr", nv: "Implantado na gestão", t: "Propus o uso corporativo na gestão e ajudei a treinar a equipe presencialmente." },
    { id: "bp", mn: "BP", n: "BPMN e processos", f: "ferr", nv: "Projetos da faculdade", t: "Documentação de processos, casos de uso, jornada do usuário e usabilidade." },
    { id: "pr", mn: "?!", n: "Resolver problemas", f: "comp", nv: "Meu ponto forte", t: "Entender o problema da operação antes de escrever qualquer código." },
    { id: "cm", mn: "💬", n: "Comunicação", f: "comp", nv: "Todo dia", t: "Treinar a equipe, ouvir a produção e transformar pedidos em soluções." },
    { id: "tp", mn: "⏱", n: "Gestão do tempo", f: "comp", nv: "Todo dia", t: "Equilibrar trabalho, faculdade e longos trajetos de ônibus com blocos curtos de foco e constância." },
    { id: "jv", mn: "Jv", n: "Java", f: "est", nv: "Estudando", t: "Curso de Back End com Java na Alura, em andamento, para chegar ao back end corporativo." },
    { id: "ts", mn: "✓", n: "Testes automatizados", f: "est", nv: "Próximo passo", t: "Meta de curto prazo: adicionar testes ao sistema de produção." },
    { id: "en", mn: "EN", n: "Inglês", f: "est", nv: "Básico, estudando", t: "Leitura técnica e escuta no trajeto de ônibus. Meta: B1/B2 até 2028." }
  ];
  const cats = { ling: "Linguagem", dados: "Dados", ferr: "Ferramenta", comp: "Comportamental", est: "Estudando" };
  const grade = $("#grade"), painel = $("#painel");
  if (grade) {
    grade.innerHTML = S.map((s) => `<button type="button" data-id="${s.id}" data-f="${s.f}" aria-pressed="false"><span class="mn">${esc(s.mn)}</span><span class="lb">${s.n}<small>${cats[s.f]}</small></span></button>`).join("");
    const mostrar = (id) => {
      const s = S.find((x) => x.id === id);
      $$("button", grade).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === id)));
      painel.innerHTML = `<span class="cat">${cats[s.f]}</span><h3>${s.n}</h3><p class="nv">${s.nv}</p><p>${s.t}</p>`;
    };
    $$("button", grade).forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.id)));
    $$(".filtros button").forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.f;
      $$(".filtros button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      let primeiro = null;
      $$("button", grade).forEach((g) => { const ok = f === "todas" || g.dataset.f === f; g.hidden = !ok; if (ok && !primeiro) primeiro = g; });
      if (primeiro) mostrar(primeiro.dataset.id);
    }));
    mostrar("py");
  }

  /* ---------- galeria ---------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbLeg = $("#lbLeg");
  const fechar = () => { lb.hidden = true; lbImg.removeAttribute("src"); };
  $$(".galeria button").forEach((b) => b.addEventListener("click", () => {
    lbImg.src = b.dataset.full; lbImg.alt = $("img", b).alt; lbLeg.textContent = b.dataset.leg || "";
    lb.hidden = false; $("#lbFechar").focus();
  }));
  $("#lbFechar").addEventListener("click", fechar);
  lb.addEventListener("click", (e) => { if (e.target === lb) fechar(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) fechar(); });

  /* ---------- copiar e-mail ---------- */
  const toast = $("#toast");
  const aviso = (t) => { toast.textContent = t; toast.classList.add("on"); clearTimeout(aviso.t); aviso.t = setTimeout(() => toast.classList.remove("on"), 2200); };
  $$(".copiar").forEach((b) => b.addEventListener("click", async () => {
    const email = b.dataset.email;
    try { await navigator.clipboard.writeText(email); aviso("E-mail copiado"); }
    catch (e) { window.location.href = "mailto:" + email; }
  }));
})();
