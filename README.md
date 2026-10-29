# Portfólio

Site de portfólio pessoal, feito com HTML, CSS e JavaScript puros, sem
framework e sem etapa de build. Publicado no Vercel:
[portfolio-nicolasbiscaia-shgh.vercel.app](https://portfolio-nicolasbiscaia-shgh.vercel.app).

## O que o site mostra

- **Início:** apresentação em forma de algoritmo e números de impacto dos
  projetos.
- **Sobre:** trajetória, forma de trabalhar e princípios.
- **Projetos:** cada projeto com problema, solução e resultado, galeria de
  telas com zoom e links para a interface e o código.
- **Entregas:** resumo do que foi desenvolvido e implantado na experiência
  profissional.
- **Habilidades:** cartas interativas com filtro por categoria (linguagens,
  dados, ferramentas, comportamentais e estudando). Ao clicar em uma carta,
  aparece onde aquela habilidade é usada.
- **Ambições:** objetivos de carreira e áreas de interesse.
- **Formação:** graduação e certificados.
- **Contato:** links e currículo em PDF para download.

O site tem tema claro e escuro, funciona no celular e desliga as animações
quando o sistema pede movimento reduzido.

## Estrutura

```
index.html      conteúdo das seções
styles.css      visual, temas e responsividade
app.js          interações: cartas, filtros, galeria e tema
assets/         currículo em PDF e prints dos projetos
```

## Rodar no computador

Abra `index.html` no navegador, ou sirva a pasta:

    python -m http.server 8000

e acesse http://localhost:8000.

## Publicar

O Vercel publica a branch `main` a cada push (Framework Preset: **Other**,
sem build).

## Atualizar

- **Currículo:** substitua `assets/curriculo-nicolas-biscaia.pdf` mantendo o
  nome, para os botões de download continuarem funcionando.
- **Prints dos projetos:** `assets/sistema-*.jpg`. Use apenas telas com dados
  anonimizados.
- **Habilidades:** lista `S` no `app.js`.
