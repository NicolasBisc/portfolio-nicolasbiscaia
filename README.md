# Nicolas Biscaia · site pessoal

HTML, CSS e JavaScript puro. Não precisa instalar nada nem rodar build.

## Rodar no computador
Dê dois cliques em `index.html`, ou rode na pasta:

    python -m http.server 8000

e acesse http://localhost:8000

## Publicar no Vercel
Suba a pasta para o GitHub, importe o repositório em vercel.com (Framework Preset: **Other**, sem build) e clique em Deploy. Se for o mesmo repositório `portfolio-nicolasbiscaia`, basta substituir os arquivos e dar push: o link continua o mesmo.

## Atualizar
- Currículo: troque `assets/curriculo-nicolas-biscaia.pdf` mantendo o nome.
- Foto: troque `assets/nicolas.jpg` (proporção 4:5).
- Prints dos projetos: `assets/sistema-*.jpg`.
- Habilidades e fases da carreira: listas `S` e `L` no `app.js`.
