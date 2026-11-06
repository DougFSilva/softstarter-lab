# Soft-Starter Lab — GitHub Pages

Simulador didático de acionamentos industriais, atualizado em 06/11/2026 a partir da versão publicada no Sites.

## Novidades

- Gráfico e resultado dos ensaios em modal, com opção de reabrir o último ensaio.
- Orientações, referências e tabela GED-13 acessíveis por botões de consulta.
- Mensagem do resultado em vermelho quando não passa e em verde quando passa; detalhes em cor neutra.
- Botão para refazer etapas concluídas, preservando as demais etapas e a primeira tentativa.
- Validação da parada da bomba: primeiro OFF, depois rampa habilitada e escolha correta do comando.
- Comparação da rotação com OFF no gráfico e dos tempos de redução da rotação em tabela.
- Alertas didáticos para queda de rotação concentrada e rampa prolongada com pouco benefício.

## Publicação e execução

HTML, CSS e JavaScript estáticos, sem servidor ou compilação. Os arquivos do site ficam na raiz. Mantenha o GitHub Pages configurado para a branch `main`, pasta `/ (root)`. O arquivo `.nojekyll` evita processamento por Jekyll.

Para executar localmente, abra `index.html` no navegador ou rode `python -m http.server 8000` nesta pasta e acesse `http://localhost:8000`.

Para baixar o projeto atualizado, use Code → Download ZIP. O botão de download no Guia do laboratório aponta para esse mesmo código da branch `main`.

## Testes

Requer Node.js, sem dependências adicionais:

```sh
node --test tests/model.test.cjs tests/retry.test.cjs tests/stop.test.cjs
```

Os testes verificam os cenários e limites da partida, a reabertura de etapas e a sequência de validação da parada.

## Arquivos

- `index.html`, `app.js`, `data.js`, `model.js` e `style.css`: aplicação.
- `ged13.png`: referência didática.
- `tests/`: verificações automatizadas.
- `DOCUMENTACAO_ORIGINAL.md` e `VALIDACAO.md`: documentação histórica. Caminhos `dist/` nesses documentos correspondem à organização original; nesta exportação os arquivos ficam na raiz.

## Acesso e limites do modelo

A publicação no GitHub Pages é pública e não inclui a autenticação da hospedagem ChatGPT. Não há banco de dados ou backend; o progresso vale apenas durante a situação atual, na sessão do navegador.

As curvas representam um modelo de ensino. Na desaceleração, 80%, 20% e 2% da rotação nominal são marcadores comparativos, não requisitos do fabricante. Os alertas da curva não reprovam automaticamente o tempo escolhido. O modelo não calcula pressão, vazão, tubulação, golpe de aríete ou disparo térmico real dos tiristores. Consulte as referências disponíveis no próprio simulador.
