# Soft-Starter Lab — Simulador Industrial

Aplicação didática em português para Prof. Douglas Ferreira da Silva. HTML/CSS/JavaScript sem backend, cadastro ou compilação.

## Abrir no computador

Extraia o ZIP e abra `dist/index.html` no navegador. Todos os scripts são locais e não usam fetch para o conteúdo. A fonte tipográfica online tem alternativas locais; sem internet, o simulador continua funcionando. O armazenamento local pode depender das permissões do navegador e do protocolo usado.

Para um endereço local estável, execute na pasta do projeto:

```sh
python -m http.server 8000 --directory dist
```

Acesse http://localhost:8000. Não é necessário instalar pacotes Python ou Node para usar a aplicação.

## Publicar gratuitamente no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie o **conteúdo de dist**, de modo que `index.html` fique na raiz.
3. Em Settings → Pages, escolha Deploy from a branch, branch main, pasta `/ (root)`.
4. Aguarde a publicação e use o endereço informado pelo GitHub.
5. No Notion, cole esse endereço como link, marcador ou `/embed` (se a política de incorporação permitir).

Não envie dados pessoais de alunos. O resultado é exibido somente na tela. O estado fica apenas em memória durante a situação; voltar à tela inicial zera todas as situações. Um site publicado no GitHub Pages normalmente é público; o endereço privado de revisão entregue pelo ChatGPT exige acesso do proprietário. O código da aplicação não possui autenticação.

## Estrutura

- `dist/index.html`: entrada.
- `dist/style.css`: interface responsiva, projeção e impressão.
- `dist/data.js`: cenários, perguntas, referências, catálogos de falhas.
- `dist/model.js`: integração determinística de tensão, torque, corrente e velocidade aproximados.
- `dist/app.js`: interface, navegação, validação, relatórios e armazenamento.
- `dist/ged13.png`: recorte da Tabela 12 presente no material do Notion.
- `tests/model.test.cjs`: verificações de cenários, determinismo e possibilidades de conclusão.

Para verificar o modelo: `node tests/model.test.cjs` a partir da raiz (Node moderno).

## Percursos

1. Bomba: 5 cv, 220 V, motor didático 14 A, SSW 16 A. A escolha da partida suave é uma necessidade do processo mesmo dentro da faixa direta do recorte.
2. Ventilador: 15 cv, 380 V, motor didático 23 A, SSW 30 A. Inércia maior, falha na transição com rampa inadequada e análise do ciclo.
3. Esteira: 5 cv, 220 V, motor didático 14 A e SSW 16 A. Opera em velocidade fixa e parte parcialmente carregada. Trabalha atrito inicial, pedestal para iniciar sem deslocar as caixas, diagnóstico Stall e parada livre. Aplicação leve fictícia; a capacidade real precisa ser verificada.

As placas são hipóteses didáticas e não representam motores comerciais específicos. As correntes e faixas comerciais da SSW vêm do manual fornecido.

## Referências e precisão técnica

- Manual WEG SSW-05 Plus, versão 2.3X, documento 0899.5119/11. Foi usada a seção em português, especialmente §§3–17, páginas impressas 65–76.
- Material de aula: https://app.notion.com/p/M-dulo-2-Soft-Starter-9c17a8f0d29982319c2a016f3649674a
- GED-13: recorte Tabela 12 do Notion. Revisão não identificada. NÃO se afirma que esta é a edição vigente. Consultar https://www.cpfl.com.br/normas-tecnicas para projetos reais.

As ilustrações SVG foram produzidas para este projeto. A imagem GED é referência fornecida no material do usuário, não um ativo de autoria do projeto.

A biblioteca da aplicação documenta todas as equações, coeficientes, faixas e critérios didáticos. O índice ∫(I/In SSW)²dt e sua referência 90 s NÃO reproduzem a curva térmica WEG, não autorizam equivalência de ciclos e não representam temperatura real. Os limiares de corrente da transição são provenientes do manual, aplicados às correntes do modelo. A prioridade de falhas simultâneas na interface é uma escolha didática.

A simulação de parada NÃO calcula golpe de aríete nem garante eliminação de transientes. Não existe curva real de pressão hidráulica. A aprovação virtual não equivale a laudo ou projeto executivo.

## Avaliação e progresso

- Cada decisão enviada conta como tentativa; ensaios exploratórios não contam como erros.
- Acertos na primeira tentativa ÷ total de decisões técnicas × 100. Checklist final não entra no denominador.
- Etapas obrigatórias bloqueiam avanço até validação.
- Etapas concluídas ficam em consulta; para refazer os ajustes, reinicie a missão.
- Estado somente em memória; nenhum resultado é salvo.
- Voltar à tela inicial zera todos os cenários.
- O resultado aparece na tela, sem botão de impressão ou PDF.

## Ampliar o conteúdo

Adicione cenário e etapas em `data.js`; mantenha IDs únicos e justificativas específicas para cada alternativa. Tipos de etapa: choice, terminals, current, simulation, stop e checklist. `correct`, `why`, `ref` e a posição no percurso definem validação, feedback, fonte e próximo estado. Novos comportamentos físicos requerem extensão explícita de `model.js`.

## Verificação

Verificações de sintaxe JS e teste do modelo incluído. O teste percorre combinações de pedestal/rampa, verifica limites numéricos, existência de soluções nos dois cenários, repetibilidade, efeitos do pedestal excessivo e parada até repouso. A verificação de navegador cobre fluxos de decisão, retomada e relatório; detalhes da execução constam em VALIDACAO.md.

## Ajuste da rampa por resposta elétrica e mecânica

A atividade mede o percentual da rotação nominal atingido exatamente no final da rampa, mas não impõe um prazo fixo de aceleração. O aluno compara diferentes tempos de rampa e tensão inicial, observando corrente de pico, duração da corrente, movimento, falhas e duração da corrente elevada. O critério é alcançar a rotação de regime dentro dos limites elétricos e térmicos simulados para o conjunto, sem tranco nem falhas. Um tempo maior só é inadequado se exceder a capacidade/ciclo do equipamento ou algum requisito real do processo; não há um número universal de segundos que seja ideal para toda aplicação.

## Situação 3 revisada
A esteira agora percorre seleção, proteção, conexões, corrente do motor e comissionamento com SSW-05. Modelo específico: inércia 1,6; torque resistente inicial 0,6; após movimento, 0,5 + 0,3w; fator de corrente 9. O estudante observa o percentual de velocidade no fim da rampa e compara ajustes sem um prazo de processo fixo. A bomba e o ventilador seguem a mesma lógica.


## Revisão da parametrização e avaliação
Todos os cenários iniciam com pedestal 30%, ACCEL TIME 1 s, MOTOR CURRENT 30% e DECEL TIME OFF. Esses valores são o ponto inicial do exercício, não uma recomendação de operação. O resultado mostra a velocidade percentual e a corrente no instante final da rampa. A aproximação ao regime é avaliada por equilíbrio de torque do modelo, com tolerância numérica interna explícita, sem percentual universal de velocidade. Pico superior a 3 × In motor não reprova automaticamente: as faixas de corrente são orientações didáticas, avaliadas junto da duração, transição e limites do conjunto. A indicação numérica de esforço térmico continua oculta.


## Situação 3: correntes nominais iguais
Motor hipotético de 10 cv, 380 V em estrela, 16 A; soft-starter 16 A. Corrente de partida ilustrativa calibrada para comparar pedestal insuficiente e partida eficaz. O alerta `startingDuty` interrompe o exercício após corrente igual ou superior a 48 A durante mais de 10 s contínuos, antes do término da rampa se necessário. É uma demonstração de capacidade, não uma reprodução da curva térmica ou do firmware WEG. Pico breve e rampa maior que 10 s, isoladamente, não acionam esse alerta. Resultados distinguem fim de rampa e interrupção antecipada.
