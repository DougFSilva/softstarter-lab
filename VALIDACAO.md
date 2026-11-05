# Verificação da entrega — 04/11/2026

## Executado

- Análise de sintaxe de app.js, data.js e model.js com Node.
- Teste do modelo em 440 combinações de parâmetros (11 pedestais × 20 rampas × 2 cargas).
- Repetibilidade, valores finitos, velocidade no intervalo [0,1], parada até repouso, pedestal excessivo e soluções válidas em ambos os cenários.
- Integridade das alternativas, justificativas e identificadores de etapas.
- Navegador: percurso completo da bomba, incluindo resposta errada, bloqueio de avanço, nova tentativa, corrente 88%, ensaio inicial rejeitado, correção para 40%/7 s, parada com 5 s e relatório de 82% (9/11 primeiras tentativas corretas).
- Navegador: recarga e retomada do progresso na etapa pendente.
- Navegador: percurso completo do ventilador, corrente 77%, falha antes do by-pass com 40%/4 s, correção para 50%/8 s, revisão do ciclo e relatório de 91% (10/11).
- Navegador: percurso completo da esteira com recomendação de inversor e relatório de 100% (6/6), sem parametrizar uma SSW.
- Inspeção visual da página inicial e do percurso em navegador desktop.
- Correção de rolagem automática animada que interferia nos cliques rápidos de transição de etapa.
- Travamento dos controles após validação para manter parâmetros consistentes com as etapas e o relatório.

## Limites da verificação

- Layout responsivo implementado por CSS, sem ensaio dedicado em aparelho físico/tablet.
- Botão de impressão invocado no navegador de teste, mas a caixa nativa de impressão/PDF não foi exposta pelo ambiente. A saída PDF final não foi inspecionada.
- Não foi executado um projeto elétrico, ensaio físico ou validação hidráulica/térmica real.
- A revisão vigente da GED-13 não foi validada; a atividade usa explicitamente o recorte de aula fornecido.
- A proteção térmica WEG não é reproduzida numericamente; o índice mostrado é didático e documentado.

## Revisão visual: página contínua

- Removidos menu lateral, cabeçalho de aplicativo e navegação de etapas.
- Abertura com três cartões ilustrados, tons lavanda, menta e pêssego.
- Contexto ilustrado e etapas reveladas verticalmente após validação, com rolagem automática.
- Etapas respondidas permanecem na página; tentativas erradas mantêm a etapa atual aberta.
- Verificado em navegador: abertura, reinício da esteira, resposta correta com revelação automática do passo 2, preservação do passo 1 e feedback da resposta errada no passo 2.

## Reinício, rolagem e validação de corrente

- Removido salvamento de progresso e de resultados; estado da atividade somente em memória.
- Retorno aos cartões limpa todos os cenários e o histórico visual. Verificado no navegador após concluir a esteira e iniciar novamente: passo 1, zero etapas anteriores e nenhum botão de impressão.
- Corrigida a reposição da rolagem: preserva o conteúdo anterior e a posição antes da entrada do novo passo; removido o comando de voltar ao topo entre etapas.
- Validação adicional pelo pico calculado durante toda a partida: meta didática do cenário ≤ 3 × In motor, explicitamente diferente dos limiares reais de proteção do manual.
- Casos de regressão: bomba a 50%/1 s e ventilador a 50%/8 s reprovam pelo pico mesmo sem falha na transição; bomba 40%/7 s e ventilador 50%/12 s aprovam.
- Mantidas as análises de movimento inicial, impacto do pedestal, corrente na transição, aproximação de regime e índice térmico didático.
- Validados limites de entrada da aceleração, pedestal, MOTOR CURRENT e desaceleração.

## Diagnósticos dos dois extremos da rampa

- Tempo para atingir 90% da rotação passa a ser medido a partir da curva calculada.
- Metas operacionais fictícias explícitas: bomba até 8 s; ventilador até 14 s. Não são tempos máximos de rampa da WEG.
- Rampa longa que descumpra a meta bloqueia aprovação e gera explicação de partida prolongada, índice térmico acumulado e orientação de reduzir rampa e conferir novamente a corrente.
- O alerta didático é distinto de um disparo real de sobrecarga; limites de ajuste de 1–20 s permanecem.
- Testes verificaram rampa curta, adequada e longa, preservando combinações válidas nos dois cenários. Aos 20 s: bomba 40% levou 16,2 s até 90%, índice 29,8; aos 7 s, 6,15 s e índice 17,5. Ventilador 50%: aos 20 s, 17,9 s e índice 38,8; aos 12 s, 12,25 s e índice 32,6.
- Navegador: percorreu a bomba, aplicou pedestal 40% e rampa 20 s e confirmou rejeição com mensagem e valores de 16,2 s até 90%, meta 8 s, índice 29,8 e recomendação de correção.

## Situação 3 — esteira em velocidade fixa com soft-starter

- Substituído o parecer de inversor por 13 etapas de seleção e comissionamento da SSW-05 em esteira horizontal de serviço leve, parcialmente carregada.
- Características próprias: atrito inicial, inspeção de roletes/correia, estabilidade das caixas, ajuste de pedestal, diagnóstico Stall e parada livre.
- Placa fictícia: 5 cv, 220 V, 14 A; SSW 16 A. Combinação de proteção e cálculo MOTOR CURRENT reutilizam os dados já documentados do manual.
- Modelo com torque resistente de 0,6 antes do movimento e 0,5 + 0,3w após iniciar; inércia 1,6 e fator de corrente 4. Meta fictícia de 90% da rotação em até 9 s.
- Testes de regressão da bomba e do ventilador passaram. Esteira: 40%/5 s reprova por demora para iniciar; 55%/5 s aprova; 60%/1 s reprova; 60%/20 s reprova por partida prolongada.
- Navegador: percurso completo da esteira até o resultado; verificada reprovação com 40%/5 s, correção para 55%/5 s, questões específicas de impacto, Stall e parada, checklist e exibição dos parâmetros finais da SSW.

## Painel físico sem marca

- Frente redesenhada com referência na figura 5.1 do manual fornecido: carcaça cinza, bornes superiores/inferiores, faixa clara, quatro trimpots em duas colunas, sinais de proteção e estado, representação de porta serial e bornes auxiliares.
- Identificação genérica “SOFT STARTER”; nenhum logotipo ou nome de fabricante no painel.
- PEDESTAL VOLTAGE e ACCEL TIME interativos na partida; MOTOR CURRENT exibe o valor definido anteriormente; DECEL TIME interativo na etapa de parada.
- Escalas circulares e indicadores acompanham o valor; entrada por arraste horizontal ou teclado, com foco visível.
- DIP switches, reset, porta serial e bornes são representações visuais sem comando operacional.
- Navegador: conferida aparência e ajuste de pedestal de 35% a 40%, aceleração de 7 a 8 s; ensaio executou e exibiu REGIME, Ready e Run acesos com partida validada.

## Orientações dos ajustes e tabela na página

- Adicionadas orientações antes de MOTOR CURRENT, pedestal/aceleração e desaceleração da bomba: objetivo, efeito dos extremos e evidências para observar.
- Metas de cada carga exibidas no guia de partida; orientação de alterar um ajuste por vez.
- GED-13 incorporada como imagem na própria etapa, sem botão para abrir janela.
- Retiradas citações de origem/páginas das etapas; textos agora são autossuficientes. Referências técnicas mantidas apenas no código e documentação de manutenção.
- Navegador: verificada imagem visível e ausência de rodapé de referência; conferidas as orientações de corrente nominal e de pedestal/aceleração antes dos controles.


## Revisão do critério de tempo de aceleração

- Removidos os prazos didáticos fixos de 8 s, 14 s e 9 s. Não há requisito operacional descrito que fundamente esses números.
- O tempo até 90% permanece como medida do ensaio, mas não como prazo universal de aprovação. A orientação agora pede comparar ao menos três valores de ACCEL TIME, analisar corrente de pico e duração, pedestal, falhas e índice térmico estimado.
- A análise distingue o ajuste de rampa (1–20 s na SSW-05) da resposta mecânica da carga. O manual orienta ajustar o tempo para o motor alcançar a rotação nominal e limita a capacidade de partida conforme corrente e ciclo térmico; não define um tempo único ideal.
- A hipótese de aceitação em 3 × In do motor e o índice I²t didático permanecem identificados como critérios simplificados do simulador, não como curvas/proteções reais da WEG.
- Revisados modelo, textos e testes para não reprovar uma rampa apenas por exceder um prazo fictício. Uma rampa longa continua mostrando maior tempo de aceleração e maior índice térmico; reprova se ultrapassar os limites simulados ou não alcançar regime.


## Revisão conforme metas de parametrização — 05/11/2026

- Ajustes iniciais: pedestal 30%, rampa 1 s, MOTOR CURRENT 30%, DECEL TIME OFF. Retorno à tela inicial mantém o reset integral.
- Removida a medição de tempo até 90%; exibidas velocidade e corrente exatamente no fim da rampa, com marcador no gráfico. O gráfico continua após a rampa para mostrar aceleração residual.
- Aproximação ao regime avaliada por equilíbrio de torque do modelo, com tolerância numérica própria. Sem regra de velocidade universal.
- Pico classificado nas faixas didáticas de até 2, 2–3, 3–4 e acima de 4 × In motor; sem reprovação automática acima de 3 × In. Duração de corrente acima de 2 × In aparece como medida de comparação, não como proteção.
- Distintos limites da corrente ajustada do motor e da soft-starter. Verificação de Stall e sobrecorrente na transição, e sobrecorrente temporizada em regime. Esforço térmico permanece interno e não aparece como medição do equipamento.
- Critério de início depende de torque inicial suficiente; tranco depende da aceleração calculada, sem limite universal fixo de pedestal.
- Alterar parâmetro limpa os resultados anteriores e a sinalização da tentativa anterior.
- Testes passaram: 660 combinações nos três cenários, consistência da amostra final de rampa, parâmetros mínimos, limites de entrada, soluções válidas, corrente e resposta mecânica.
- Navegador: corrente inicial 30%, pedestal 30%, rampa 1 s e parada OFF; após cálculo de MOTOR CURRENT, ensaio mínimo apresentou Stall com 46,9% no fim de 1 s; correção para 40% e 7 s apresentou 96,5% no fim da rampa, 14,1 A e partida coerente.


## Referências numéricas e capacidade de partida — situação 3

- Motor e soft-starter com 16 A nominais em 380 V, MOTOR CURRENT calculado em 100%. Placa, seleção, contexto e conclusão atualizados.
- Referências abertas na etapa de comissionamento: faixas de pico em amperes, distinção entre In motor e In soft-starter, capacidade 3 × In por 10 s, limiares da transição e explicação de pico versus duração.
- Calibração didática do motor para corrente de partida elevada, mantendo a relação com tensão e velocidade.
- Alerta de capacidade interrompe o exercício após mais de 10 s contínuos com corrente ≥ 48 A; identificado como simulação, sem atribuir código ou piscadas reais do fabricante.
- Interrupção antes da rampa: não inventa velocidade ou corrente ao fim de uma rampa não concluída. Exibe instante, corrente e velocidade da interrupção.
- Testes passaram: 660 combinações, soluções válidas em todos os cenários, interrupção antecipada sem acesso a amostra inexistente, corrente sustentada versus pico breve.
- Navegador: percurso da situação 3 até MOTOR CURRENT 100%, tabela de referências visível, pedestal 30% / rampa 20 s interrompidos aos 10,05 s com explicação e dados; verificada mensagem de limite de capacidade simulado.

## Referências genéricas para o ensaio

- Seção comum a todos os cenários: múltiplos de In do motor e da soft-starter, sem conversão para amperes ou valores de placa da atividade.
- Texto orienta identificar a corrente nominal, avaliar duração e transição e consultar as condições do equipamento.
- Alteração apenas no conteúdo de apoio; cálculos e resultados do ensaio preservados.

## Alternativas e distratores

- Perguntas de escolha nas três missões revisadas para quatro alternativas distintas, com uma resposta correta e explicações por alternativa.
- Distratores exploram confusões entre placa e medição, tensão de rede, ajustes de partida/parada, indicações de falha e ciclo de serviço.
- Identificação de bornes padronizada em quatro grupos e decisão de parada da bomba em quatro comandos possíveis. Etapas práticas de trimpot, simulação e checklist mantêm seus controles.
- Cenário Stall esclarece a relação entre obstrução, aceleração insuficiente e corrente na transição para o by-pass.
