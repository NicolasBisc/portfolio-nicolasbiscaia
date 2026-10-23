# Portfólio Profissional – Nicolas Biscaia

Projeto Integrador *Design da Minha Carreira* (A2.3) – Universidade Positivo.

Site estático em HTML, CSS e JavaScript puro, sem dependências nem build.

## Como abrir no computador (localhost)

**Opção 1 – mais simples:** dê dois cliques em `index.html`.

**Opção 2 – servidor local** (se o vídeo do YouTube não carregar na opção 1), dentro desta pasta:

```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000

Ou, com Node instalado: `npx serve .`

## Publicar no Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com, clique em **Add New → Project** e importe o repositório.
3. Framework Preset: **Other**. Não precisa de comando de build.
4. Clique em **Deploy**.

Ou pela linha de comando, dentro da pasta: `npx vercel --prod`

## Arquivos

- `index.html` – conteúdo do portfólio
- `style.css` – identidade visual
- `script.js` – menu, linha do tempo e animação do topo
- `portfolio-nicolas-biscaia.pdf` – versão em documento (a mesma entregue no Blackboard)
