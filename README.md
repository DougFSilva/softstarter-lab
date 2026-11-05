# Soft-Starter Lab — GitHub Pages

Código atual exportado em 05/11/2026. HTML, CSS e JavaScript; sem servidor ou compilação.

## Publicar pelo navegador

1. Crie um repositório no GitHub, por exemplo `softstarter-lab`.
2. Extraia este ZIP no computador.
3. No repositório, clique em Add file → Upload files e envie os arquivos extraídos. O arquivo `index.html` deve ficar na raiz do repositório, junto de `app.js`, `data.js`, `model.js`, `style.css` e `ged13.png`.
4. Confirme em Commit changes.
5. Abra Settings → Pages. Em Build and deployment, escolha Deploy from a branch, branch `main`, pasta `/ (root)` e clique em Save.
6. Aguarde a publicação. O endereço será mostrado nessa página, geralmente `https://SEU-USUARIO.github.io/softstarter-lab/`.

Não envie apenas o ZIP: o Pages precisa dos arquivos extraídos. Não é necessário instalar Node ou executar build.

## Executar no computador

Abra `index.html` no navegador ou execute `python -m http.server 8000` na pasta extraída e acesse `http://localhost:8000`.

## Arquivos

- `index.html`: página inicial.
- `app.js`: interface e navegação.
- `data.js`: missões e conteúdo.
- `model.js`: simulação.
- `style.css`: estilos.
- `ged13.png`: tabela didática.
- `tests/model.test.cjs`: execute `node tests/model.test.cjs` na raiz para verificar o modelo.
- `DOCUMENTACAO_ORIGINAL.md` e `VALIDACAO.md`: documentação e histórico técnico; os caminhos `dist/` citados nesses documentos referem-se à organização original. Neste pacote os arquivos do site estão na raiz.
- `softstarter-lab.zip`: cópia para o botão de download do Guia do laboratório.

## Acesso

Esta exportação não inclui a autenticação da hospedagem ChatGPT. O site no GitHub Pages ficará público. Os resultados permanecem na sessão do navegador; não há banco de dados nem backend.

A fonte online é opcional: há fontes alternativas locais. A simulação é didática; consulte as limitações e referências na documentação original.
