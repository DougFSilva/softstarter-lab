/* Fontes: manual SSW-05 Plus fornecido, versão 2.3X, seção em português;
   GED-13: recorte Tabela 12 da aula, revisão não identificada. */
const SOURCES={manual:'Manual SSW-05 Plus • versão 2.3X • documento 0899.5119/11',notion:'https://app.notion.com/p/M-dulo-2-Soft-Starter-9c17a8f0d29982319c2a016f3649674a',cpfl:'https://www.cpfl.com.br/normas-tecnicas'};
const FAULTS=[
 {name:'Falta de fase',led:'Phase Loss',code:'E03',condition:'Na partida: ausência de tensão de potência ou motor desconectado. Em regime: falta de fase por 1 s, desequilíbrio > 30% por 1 s, ou corrente abaixo do limiar do ajuste.',action:'Verificar alimentação, fusíveis, conexões, ligação e ajuste MOTOR CURRENT. Um motor com pouca carga também pode ficar abaixo do limiar.',ref:'§14 e §17, pp. 73 e 76'},
 {name:'Sobrecarga do motor',led:'Overload',code:'E05',condition:'A imagem térmica acumula o efeito da corrente e do tempo. A atuação depende do histórico térmico e da curva; não existe um único múltiplo instantâneo.',action:'Conferir corrente de placa, ajuste, carga e partidas sucessivas. Respeitar o resfriamento; desligar não apaga a imagem térmica.',ref:'§15.1 e §17, pp. 74–76'},
 {name:'Sequência de fases',led:'Phase Seq',code:'',condition:'Sequência incorreta, com a proteção habilitada.',action:'Confirmar a sequência da rede e o sentido exigido pela máquina. Corrigir somente com procedimento de desenergização.',ref:'§14, p. 73'},
 {name:'Rotor bloqueado',led:'Stall',code:'',condition:'Na transição para o by-pass: corrente ≥ 2 × a corrente ajustada do motor.',action:'Analisar carga, travamento, tensão inicial e aceleração. O LED não prova, sozinho, que o rotor está fisicamente travado.',ref:'§14, p. 73'},
 {name:'Sobrecorrente em regime',led:'Overcurrent',code:'',condition:'Somente em tensão plena: corrente > 3 × a corrente ajustada do motor por mais de 1 s.',action:'Verificar sobrecarga mecânica e ajuste. Não confundir com a proteção na transição para o by-pass.',ref:'§14, p. 73'},
 {name:'Sobrecorrente antes do by-pass',led:'Internal Fault',flashes:4,code:'',condition:'Na transição: corrente ≥ 37,5 A nos modelos de 3 a 30 A; ≥ 200 A nos modelos de 45 a 85 A.',action:'Investigar aceleração incompleta, carga e dimensionamento antes de tentar uma nova partida.',ref:'§14, p. 73'},
 {name:'Sobrecarga nos tiristores',led:'Internal Fault',flashes:6,code:'',condition:'Durante aceleração e desaceleração, segundo corrente nominal da SSW e curva térmica da figura 15.2.',action:'Rever duração, corrente e repetição das partidas; conferir seleção e permitir resfriamento.',ref:'§14 e §15.2, pp. 73–75'},
 {name:'By-pass interno aberto',led:'Internal Fault',flashes:3,code:'',condition:'Monitoramento do fechamento do contato interno apenas em regime.',action:'Investigar o equipamento e os contatos internos com assistência qualificada.',ref:'§14, p. 73'},
 {name:'Sobrecorrente no relé de by-pass',led:'Internal Fault',flashes:5,code:'',condition:'Em regime por mais de 1 s: > 60 A nos modelos de 3 a 30 A; > 200 A nos modelos de 45 a 85 A.',action:'Verificar a corrente da carga e a capacidade do equipamento. É diferente do limiar antes do by-pass.',ref:'§14, p. 73'}
];
const SCENARIOS=[
  {
    "id": "pump",
    "kind": "pump",
    "num": "01",
    "name": "Bomba centrífuga",
    "tag": "BOMBEAMENTO",
    "level": "Básico",
    "duration": "20–30 min",
    "short": "Partir com suavidade. Parar sem impacto.",
    "brief": "A unidade de tratamento está ampliando o bombeamento. A partida direta provoca impactos e a parada gera um transiente na tubulação. Você foi chamado para comissionar o acionamento.",
    "need": "O processo opera em velocidade fixa. É necessário suavizar a partida e avaliar uma parada controlada para reduzir impactos hidráulicos.",
    "cv": 5,
    "kw": 3.7,
    "voltage": 220,
    "net": "220/127",
    "amps": 14,
    "otherAmps": 8.1,
    "ssw": 16,
    "rpm": 1730,
    "pf": 0.82,
    "eff": 85,
    "initial": 30,
    "ramp": 1,
    "inertia": 1.3,
    "friction": 0.26,
    "simContext": "Não há um tempo de aceleração predefinido. Ajuste PEDESTAL VOLTAGE para o motor iniciar prontamente sem tranco e teste diferentes valores de ACCEL TIME até que a bomba alcance a rotação de regime. Compare o pico e a duração da corrente com a capacidade térmica e o ciclo de partida da soft-starter. Uma rampa muito curta pode elevar a corrente; uma muito longa mantém o motor em aceleração por mais tempo e pode exceder o limite térmico.",
    "conclusion": "A tabela GED-13 admite partida direta para 5 cv em 220 V. A soft-starter foi escolhida pela necessidade de suavização do processo, e a parada deve ser validada no sistema hidráulico.",
    "steps": [
      {
        "id": "ged",
        "type": "choice",
        "title": "Analisar o fornecimento",
        "context": "A ordem de serviço informa 5 cv em rede 220/127 V. Use a tabela GED-13 abaixo antes de escolher o acionamento.",
        "prompt": "O que a tabela permite concluir sobre a partida direta deste motor?",
        "options": [
          "Está dentro da faixa de partida direta; avaliar também as necessidades do processo.",
          "Está acima da faixa direta, considerando a tensão entre fase e neutro.",
          "A partida direta depende de a corrente nominal ficar abaixo de 30 A.",
          "A redução de corrente exige usar uma soft-starter, em vez dos demais métodos."
        ],
        "correct": 0,
        "why": [
          "Compare a potência com o limite da tensão entre fases: 5 cv em 220 V e 7,5 cv em 380 V. A decisão também considera o processo.",
          "A consulta deve usar a tensão entre fases aplicada ao motor, não a tensão entre fase e neutro.",
          "Neste recorte, a faixa de partida direta é comparada pela potência e tensão. O limite de 30 A não é o critério apresentado.",
          "A tabela apresenta diferentes métodos de partida; não determina exclusivamente uma soft-starter."
        ],
        "ref": "GED-13 • Tabela 12 do material de aula",
        "show": "ged"
      },
      {
        "id": "method",
        "type": "choice",
        "title": "Escolher a estratégia",
        "context": "O processo opera em velocidade fixa. É necessário suavizar a partida e avaliar uma parada controlada para reduzir impactos hidráulicos.",
        "prompt": "Qual estratégia corresponde à partida suave solicitada, sem controle contínuo de velocidade?",
        "options": [
          "Usar soft-starter e validar torque, corrente e duração da partida em velocidade fixa.",
          "Usar inversor para regular continuamente a velocidade durante a produção.",
          "Usar a rampa de tensão da soft-starter para regular a velocidade em produção.",
          "Manter partida direta e adicionar relé térmico para suavizar a aceleração."
        ],
        "correct": 0,
        "why": [
          "A soft-starter atende ao objetivo proposto; a seleção precisa ser validada com a carga e o ciclo.",
          "Um inversor pode realizar partida suave, mas esta alternativa propõe uma função de controle contínuo que a OS não solicita.",
          "A rampa de tensão da SSW-05 é um recurso de partida, não um controle contínuo de velocidade.",
          "O relé térmico protege contra sobrecarga; sua inclusão não suaviza a partida direta."
        ],
        "ref": "Material de aula • §§3 e 5"
      },
      {
        "id": "plate",
        "type": "choice",
        "title": "Ler a placa do motor",
        "context": "Esta placa é uma representação didática: os valores do motor são hipóteses coerentes para a atividade, não um modelo comercial.",
        "prompt": "Qual é a corrente nominal a usar na rede de 220 V?",
        "options": [
          "14 A, pela coluna de 220 V da placa.",
          "8.1 A, pela outra coluna de tensão da placa.",
          "A corrente de pico registrada durante a partida.",
          "A corrente medida em regime com o motor desacoplado da carga."
        ],
        "correct": 0,
        "why": [
          "Use a corrente nominal correspondente à tensão e à ligação aplicadas ao motor.",
          "A corrente da outra tensão não é a referência da ligação utilizada neste cenário.",
          "O pico de partida é transitório; não substitui a corrente nominal de placa.",
          "A corrente em vazio não substitui a corrente nominal de placa do motor."
        ],
        "ref": "Manual • §12.4, p. 72",
        "show": "plate"
      },
      {
        "id": "select",
        "type": "choice",
        "title": "Selecionar a SSW-05",
        "context": "O estoque dispõe de quatro opções. Ambiente: 30 °C, altitude < 1.000 m, uma partida a cada 20 min. A análise do ciclo será completada no ensaio.",
        "prompt": "Qual opção é compatível com a corrente e a tensão, antes de validar a partida?",
        "options": [
          "SSW-05 · 16 A · 220–460 V",
          "SSW-05 · 10 A · 220–460 V",
          "SSW-05 · 16 A · 460–575 V",
          "SSW-05 · 10 A · 460–575 V"
        ],
        "correct": 0,
        "why": [
          "A corrente de 16 A e a faixa de tensão são compatíveis com o cenário. Ainda é necessário validar carga e ciclo.",
          "A corrente nominal de 10 A é inferior à corrente nominal deste motor.",
          "A corrente é compatível, mas a faixa de tensão desta versão não admite a rede do cenário.",
          "Esta opção não atende à corrente nominal do motor nem à tensão da rede."
        ],
        "ref": "Manual • §§3, 4 e 6, pp. 65–67",
        "show": "models"
      },
      {
        "id": "terminals",
        "type": "terminals",
        "title": "Conferir as conexões",
        "context": "Selecione o grupo de bornes que recebe a alimentação da eletrônica. A fonte de controle disponível é 220 Vca.",
        "prompt": "Onde conectar a alimentação de controle?",
        "ref": "Manual • §4 e §11, pp. 66 e 69–70"
      },
      {
        "id": "current",
        "type": "current",
        "title": "Referenciar as proteções",
        "context": "Configure MOTOR CURRENT usando as correntes nominais de placa. Um ajuste abaixo do correto altera a referência das proteções.",
        "prompt": "Qual percentual deve ser ajustado?",
        "ref": "Manual • §12.4, p. 72"
      },
      {
        "id": "simulate",
        "type": "simulation",
        "title": "Comissionar a partida",
        "context": "Não há um tempo de aceleração predefinido. Ajuste PEDESTAL VOLTAGE para o motor iniciar prontamente sem tranco e teste diferentes valores de ACCEL TIME até que a bomba alcance a rotação de regime. Compare o pico e a duração da corrente com a capacidade térmica e o ciclo de partida da soft-starter. Uma rampa muito curta pode elevar a corrente; uma muito longa mantém o motor em aceleração por mais tempo e pode exceder o limite térmico.",
        "prompt": "Ajuste INITIAL VOLTAGE e ACCEL TIME, execute o ensaio e avalie o resultado. Rampa curta pode elevar a corrente; rampa longa pode prolongar a aceleração e o esforço térmico. Busque movimento inicial, entrada em regime e uma partida sem impacto excessivo.",
        "ref": "Manual • §4, §12 e §14; modelo didático documentado"
      },
      {
        "id": "analysis",
        "type": "choice",
        "title": "Interpretar o ensaio",
        "context": "Em um ensaio anterior, o motor permaneceu parado no início da rampa e só depois começou a girar.",
        "prompt": "Qual deve ser a primeira análise?",
        "options": [
          "Verificar pedestal e torque necessário para iniciar o movimento da carga.",
          "Aumentar primeiro ACCEL TIME, mantendo o pedestal do ensaio.",
          "Reduzir MOTOR CURRENT para aproximá-lo da corrente medida em vazio.",
          "Habilitar DECEL TIME para antecipar o início do movimento."
        ],
        "correct": 0,
        "why": [
          "O motor parado no início sugere analisar o torque disponível, que depende da tensão inicial e da carga.",
          "Alongar a rampa sem avaliar o torque inicial pode prolongar a permanência do motor parado.",
          "MOTOR CURRENT referencia as proteções pela placa; não é o ajuste de torque de partida.",
          "DECEL TIME atua na parada, não no torque inicial da partida."
        ],
        "ref": "Manual • §§12 e 14"
      },
      {
        "id": "fault",
        "type": "choice",
        "title": "Diagnosticar antes de resetar",
        "context": "Após uma intervenção, o motor não parte. A HMI indica E03 e o LED Phase Loss sinaliza falha.",
        "prompt": "Qual diagnóstico e ação combinam com essa indicação?",
        "options": [
          "Falta de fase: conferir alimentação, fusíveis, conexões e ajuste de corrente.",
          "Sequência de fases: conferir a ordem das fases e o sentido de rotação.",
          "Sobrecarga: conferir o histórico térmico e o intervalo entre partidas.",
          "Stall: conferir a corrente no fim da rampa e a aceleração da carga."
        ],
        "correct": 0,
        "why": [
          "E03 e Phase Loss orientam essa investigação; aplique o procedimento de segurança antes de intervir.",
          "Essa investigação corresponde à indicação Phase Seq; não é o diagnóstico indicado por E03 e Phase Loss.",
          "Essa análise corresponde a Overload; a sinalização apresentada é de falta de fase.",
          "Stall é outra indicação, associada à corrente na transição para o by-pass."
        ],
        "ref": "Manual • §§14 e 17, pp. 73 e 76",
        "show": "fault",
        "faultIndex": 0
      },
      {
        "id": "stop",
        "type": "stop",
        "title": "Avaliar a parada da bomba",
        "context": "A equipe relata impacto hidráulico na parada direta. Compare a retirada imediata da alimentação com uma rampa de desaceleração.",
        "prompt": "Simule primeiro com DECEL TIME em OFF. Depois habilite uma rampa, simule novamente, compare as curvas e escolha como comandar a parada.",
        "ref": "Manual • §12.3 e §13, pp. 71–72"
      },
      {
        "id": "commission",
        "type": "checklist",
        "title": "Liberar o comissionamento",
        "context": "Revise as evidências da intervenção virtual e conclua a análise da situação.",
        "prompt": "Confirme as verificações realizadas.",
        "ref": "Síntese didática baseada no manual e no material de aula"
      }
    ]
  },
  {
    "id": "fan",
    "kind": "fan",
    "num": "02",
    "name": "Ventilador industrial",
    "tag": "VENTILAÇÃO",
    "level": "Intermediário",
    "duration": "25–35 min",
    "short": "Mais inércia. Novas decisões.",
    "brief": "O sistema de exaustão recebe um ventilador de maior inércia. A equipe precisa limitar os efeitos da partida sem perder a capacidade de acelerar a carga.",
    "need": "Ventilação em velocidade fixa, partida suave e uma partida a cada vinte minutos. A inércia exige verificar o ensaio e os limites térmicos da SSW-05.",
    "cv": 15,
    "kw": 11,
    "voltage": 380,
    "net": "380/220",
    "amps": 23,
    "otherAmps": 39.8,
    "ssw": 30,
    "rpm": 1750,
    "pf": 0.85,
    "eff": 85.5,
    "initial": 30,
    "ramp": 1,
    "inertia": 5,
    "friction": 0.3,
    "simContext": "Não há um tempo de aceleração predefinido. A maior inércia exige tempo e torque suficientes para alcançar a rotação de regime. Compare ajustes e acompanhe a corrente ao longo da aceleração, especialmente antes do by-pass. Considere também o ciclo indicado para a aplicação: uma partida a cada vinte minutos.",
    "conclusion": "15 cv em 380 V excedem a faixa de partida direta da tabela. A seleção exige redução de corrente e validação de carga, inércia e ciclo. A SSW-05 não deve ser aprovada apenas pela corrente nominal.",
    "steps": [
      {
        "id": "ged",
        "type": "choice",
        "title": "Analisar o fornecimento",
        "context": "A ordem de serviço informa 15 cv em rede 380/220 V. Use a tabela GED-13 abaixo antes de escolher o acionamento.",
        "prompt": "O que a tabela permite concluir sobre a partida direta deste motor?",
        "options": [
          "Está acima da faixa de partida direta; avaliar um método de redução da corrente.",
          "Está dentro da faixa direta, considerando a tensão entre fase e neutro.",
          "A partida direta depende de a corrente nominal ficar abaixo de 30 A.",
          "A redução de corrente exige usar uma soft-starter, em vez dos demais métodos."
        ],
        "correct": 0,
        "why": [
          "Compare a potência com o limite da tensão entre fases: 5 cv em 220 V e 7,5 cv em 380 V. A decisão também considera o processo.",
          "A consulta deve usar a tensão entre fases aplicada ao motor, não a tensão entre fase e neutro.",
          "Neste recorte, a faixa de partida direta é comparada pela potência e tensão. O limite de 30 A não é o critério apresentado.",
          "A tabela apresenta diferentes métodos de partida; não determina exclusivamente uma soft-starter."
        ],
        "ref": "GED-13 • Tabela 12 do material de aula",
        "show": "ged"
      },
      {
        "id": "method",
        "type": "choice",
        "title": "Escolher a estratégia",
        "context": "Ventilação em velocidade fixa, partida suave e uma partida a cada vinte minutos. A inércia exige verificar o ensaio e os limites térmicos da SSW-05.",
        "prompt": "Qual estratégia corresponde à partida suave solicitada, sem controle contínuo de velocidade?",
        "options": [
          "Usar soft-starter e validar torque, corrente e duração da partida em velocidade fixa.",
          "Usar inversor para regular continuamente a velocidade durante a produção.",
          "Usar a rampa de tensão da soft-starter para regular a velocidade em produção.",
          "Manter partida direta e adicionar relé térmico para suavizar a aceleração."
        ],
        "correct": 0,
        "why": [
          "A soft-starter atende ao objetivo proposto; a seleção precisa ser validada com a carga e o ciclo.",
          "Um inversor pode realizar partida suave, mas esta alternativa propõe uma função de controle contínuo que a OS não solicita.",
          "A rampa de tensão da SSW-05 é um recurso de partida, não um controle contínuo de velocidade.",
          "O relé térmico protege contra sobrecarga; sua inclusão não suaviza a partida direta."
        ],
        "ref": "Material de aula • §§3 e 5"
      },
      {
        "id": "plate",
        "type": "choice",
        "title": "Ler a placa do motor",
        "context": "Esta placa é uma representação didática: os valores do motor são hipóteses coerentes para a atividade, não um modelo comercial.",
        "prompt": "Qual é a corrente nominal a usar na rede de 380 V?",
        "options": [
          "23 A, pela coluna de 380 V da placa.",
          "39.8 A, pela outra coluna de tensão da placa.",
          "A corrente de pico registrada durante a partida.",
          "A corrente medida em regime com o motor desacoplado da carga."
        ],
        "correct": 0,
        "why": [
          "Use a corrente nominal correspondente à tensão e à ligação aplicadas ao motor.",
          "A corrente da outra tensão não é a referência da ligação utilizada neste cenário.",
          "O pico de partida é transitório; não substitui a corrente nominal de placa.",
          "A corrente em vazio não substitui a corrente nominal de placa do motor."
        ],
        "ref": "Manual • §12.4, p. 72",
        "show": "plate"
      },
      {
        "id": "select",
        "type": "choice",
        "title": "Selecionar a SSW-05",
        "context": "O estoque dispõe de quatro opções. Ambiente: 30 °C, altitude < 1.000 m, uma partida a cada 20 min. A análise do ciclo será completada no ensaio.",
        "prompt": "Qual opção é compatível com a corrente e a tensão, antes de validar a partida?",
        "options": [
          "SSW-05 · 30 A · 220–460 V",
          "SSW-05 · 10 A · 220–460 V",
          "SSW-05 · 30 A · 460–575 V",
          "SSW-05 · 16 A · 460–575 V"
        ],
        "correct": 0,
        "why": [
          "A corrente de 30 A e a faixa de tensão são compatíveis com o cenário. Ainda é necessário validar carga e ciclo.",
          "A corrente nominal de 10 A é inferior à corrente nominal deste motor.",
          "A corrente é compatível, mas a faixa de tensão desta versão não admite a rede do cenário.",
          "Esta opção não atende à corrente nominal do motor nem à tensão da rede."
        ],
        "ref": "Manual • §§3, 4 e 6, pp. 65–67",
        "show": "models"
      },
      {
        "id": "terminals",
        "type": "terminals",
        "title": "Conferir as conexões",
        "context": "Selecione o grupo de bornes que recebe a alimentação da eletrônica. A fonte de controle disponível é 220 Vca.",
        "prompt": "Onde conectar a alimentação de controle?",
        "ref": "Manual • §4 e §11, pp. 66 e 69–70"
      },
      {
        "id": "current",
        "type": "current",
        "title": "Referenciar as proteções",
        "context": "Configure MOTOR CURRENT usando as correntes nominais de placa. Um ajuste abaixo do correto altera a referência das proteções.",
        "prompt": "Qual percentual deve ser ajustado?",
        "ref": "Manual • §12.4, p. 72"
      },
      {
        "id": "simulate",
        "type": "simulation",
        "title": "Comissionar a partida",
        "context": "Não há um tempo de aceleração predefinido. A maior inércia exige tempo e torque suficientes para alcançar a rotação de regime. Compare ajustes e acompanhe a corrente ao longo da aceleração, especialmente antes do by-pass. Considere também o ciclo indicado para a aplicação: uma partida a cada vinte minutos.",
        "prompt": "Ajuste INITIAL VOLTAGE e ACCEL TIME, execute o ensaio e avalie o resultado. Rampa curta pode elevar a corrente; rampa longa pode prolongar a aceleração e o esforço térmico. Busque movimento inicial, entrada em regime e uma partida sem impacto excessivo.",
        "ref": "Manual • §4, §12 e §14; modelo didático documentado"
      },
      {
        "id": "analysis",
        "type": "choice",
        "title": "Interpretar o ensaio",
        "context": "Em um ensaio curto, a corrente permaneceu elevada na transição para o by-pass. A inércia deste ventilador é maior.",
        "prompt": "Qual é a conduta tecnicamente adequada?",
        "options": [
          "Avaliar carga, inércia, pedestal, tempo e capacidade térmica em conjunto.",
          "Aumentar MOTOR CURRENT para elevar o limiar da proteção na transição.",
          "Alongar a rampa mantendo o pedestal, antes de verificar carga e ciclo.",
          "Reduzir o pedestal para baixar a corrente e manter o mesmo tempo de rampa."
        ],
        "correct": 0,
        "why": [
          "A corrente elevada na transição exige investigar aceleração e capacidade do conjunto antes de escolher um ajuste.",
          "O ajuste deve corresponder à corrente nominal do motor; elevá-lo para evitar atuação mascara a condição.",
          "Uma rampa maior pode ajudar em certas condições, mas não deve ser escolhida sem verificar torque e esforço térmico.",
          "Reduzir a tensão também reduz o torque; isso pode piorar a aceleração de uma carga de alta inércia."
        ],
        "ref": "Manual • §§12 e 14"
      },
      {
        "id": "fault",
        "type": "choice",
        "title": "Diagnosticar antes de resetar",
        "context": "Em uma tentativa de aceleração incompleta, o LED Internal Fault indica grupos de quatro piscadas.",
        "prompt": "Qual diagnóstico e ação combinam com essa indicação?",
        "options": [
          "Sobrecorrente antes do by-pass: investigar corrente, carga e aceleração.",
          "Sobrecarga dos tiristores: investigar repetição de partidas e resfriamento.",
          "By-pass interno aberto: investigar o fechamento dos contatos internos.",
          "Sobrecorrente no relé de by-pass: investigar a corrente em regime."
        ],
        "correct": 0,
        "why": [
          "Quatro piscadas de Internal Fault correspondem à sobrecorrente antes do by-pass.",
          "A sobrecarga dos tiristores é indicada por seis piscadas, não quatro.",
          "By-pass interno aberto corresponde a três piscadas.",
          "A sobrecorrente no relé de by-pass corresponde a cinco piscadas e é monitorada em regime."
        ],
        "ref": "Manual • §§14 e 17, pp. 73 e 76",
        "show": "fault",
        "faultIndex": 5
      },
      {
        "id": "cycle",
        "type": "choice",
        "title": "Respeitar o ciclo de serviço",
        "context": "A produção pede seis partidas por hora, espaçadas de dez minutos. A capacidade de serviço adotada é quatro partidas por hora, uma a cada quinze minutos.",
        "prompt": "Como responder à solicitação?",
        "options": [
          "Rever a seleção e o ciclo, pois seis partidas por hora excedem a capacidade adotada.",
          "Aceitar o ciclo porque a corrente nominal do motor é menor que a da SSW.",
          "Aceitar após reduzir ACCEL TIME para diminuir a duração de cada partida.",
          "Manter seis partidas, agrupando-as no início da hora e reservando uma pausa ao final."
        ],
        "correct": 0,
        "why": [
          "Compatibilidade de corrente nominal não valida um ciclo mais severo que o especificado.",
          "A margem de corrente, isoladamente, não autoriza aumentar a frequência de partidas.",
          "Uma rampa menor pode elevar a corrente; não confirma capacidade para o novo ciclo.",
          "O intervalo entre partidas também faz parte da capacidade adotada; uma pausa ao final não valida o agrupamento."
        ],
        "ref": "Manual • §4, p. 66"
      },
      {
        "id": "commission",
        "type": "checklist",
        "title": "Liberar o comissionamento",
        "context": "Revise as evidências da intervenção virtual e conclua a análise da situação.",
        "prompt": "Confirme as verificações realizadas.",
        "ref": "Síntese didática baseada no manual e no material de aula"
      }
    ]
  },
  {
    "id": "conveyor",
    "kind": "conveyor",
    "num": "03",
    "name": "Esteira transportadora",
    "tag": "MOVIMENTAÇÃO",
    "level": "Intermediário",
    "duration": "25–35 min",
    "short": "Vencer a carga sem deslocar as caixas.",
    "brief": "Uma linha de embalagem utiliza uma esteira horizontal com motor de 10 cv e redutor, sempre na mesma velocidade. Neste cenário, o motor tem corrente nominal de 16 A em 380 V e a soft-starter também é de 16 A. O motor simulado apresenta corrente de partida elevada: acompanhe quanto tempo ela permanece alta. A rede fornece 380 V entre fases e 220 V entre fase e neutro; o motor 220/380 V deve ser ligado em estrela (Y). Na partida direta, o tranco desloca as caixas. A esteira também precisa conseguir partir parcialmente carregada. A ordem de serviço solicita uma soft-starter para suavizar a entrada em movimento, mantendo uma partida a cada vinte minutos.",
    "need": "Velocidade fixa, carga leve e atrito inicial significativo. A intervenção exige partida suave para preservar a posição das caixas; é necessário confirmar torque suficiente para arrancar, sem impacto excessivo.",
    "cv": 10,
    "kw": 7.5,
    "voltage": 380,
    "net": "380/220",
    "amps": 16,
    "otherAmps": 27.6,
    "ssw": 16,
    "rpm": 1740,
    "pf": 0.82,
    "eff": 87,
    "initial": 30,
    "ramp": 1,
    "inertia": 1.6,
    "friction": 0.5,
    "staticFriction": 0.6,
    "currentRise": 9,
    "startingDutyLesson": true,
    "simContext": "A esteira está parcialmente carregada e tem atrito inicial significativo. Ajuste o pedestal para vencer a carga sem tranco e teste o tempo de aceleração até atingir a rotação de regime. Observe se as caixas permanecem estáveis e acompanhe corrente e esforço térmico durante toda a partida.",
    "conclusion": "O motor de 10 cv excede a faixa de partida direta da GED-13 para 380 V. A soft-starter foi selecionada para suavizar a partida da esteira em velocidade fixa, com motor ligado em estrela e soft-starter de 16 A, igual à corrente nominal do motor. A capacidade de partida deve ser avaliada pela corrente e por sua duração: a referência de 3 × In corresponde a 48 A durante 10 s nas condições especificadas. O pedestal deve vencer o atrito inicial sem provocar tranco; a rampa deve permitir acelerar a carga dentro dos limites. A parada normal é livre, sem utilizar a rampa de bombas. A aplicação real exige confirmar torque, carga e serviço leve compatíveis com a SSW-05.",
    "steps": [
      {
        "id": "ged",
        "type": "choice",
        "title": "Analisar o fornecimento",
        "context": "A ordem de serviço informa 10 cv em rede 380/220 V. Use a tabela GED-13 abaixo antes de escolher o acionamento.",
        "prompt": "O que a tabela permite concluir sobre a partida direta deste motor?",
        "options": [
          "Está acima da faixa de partida direta; avaliar um método de redução da corrente.",
          "Está dentro da faixa direta, considerando a tensão entre fase e neutro.",
          "A partida direta depende de a corrente nominal ficar abaixo de 30 A.",
          "A redução de corrente exige usar uma soft-starter, em vez dos demais métodos."
        ],
        "correct": 0,
        "why": [
          "Compare a potência com o limite da tensão entre fases: 5 cv em 220 V e 7,5 cv em 380 V. A decisão também considera o processo.",
          "A consulta deve usar a tensão entre fases aplicada ao motor, não a tensão entre fase e neutro.",
          "Neste recorte, a faixa de partida direta é comparada pela potência e tensão. O limite de 30 A não é o critério apresentado.",
          "A tabela apresenta diferentes métodos de partida; não determina exclusivamente uma soft-starter."
        ],
        "ref": "GED-13 • Tabela 12 do material de aula",
        "show": "ged"
      },
      {
        "id": "method",
        "type": "choice",
        "title": "Suavizar o transporte",
        "context": "Velocidade fixa, carga leve e atrito inicial significativo. A intervenção exige partida suave para preservar a posição das caixas; é necessário confirmar torque suficiente para arrancar, sem impacto excessivo.",
        "prompt": "Qual estratégia corresponde à partida suave solicitada, sem controle contínuo de velocidade?",
        "options": [
          "Usar soft-starter e validar torque, corrente e duração da partida em velocidade fixa.",
          "Usar inversor para regular continuamente a velocidade durante a produção.",
          "Usar a rampa de tensão da soft-starter para regular a velocidade em produção.",
          "Manter partida direta e adicionar relé térmico para suavizar a aceleração."
        ],
        "correct": 0,
        "why": [
          "A soft-starter atende ao objetivo proposto; a seleção precisa ser validada com a carga e o ciclo.",
          "Um inversor pode realizar partida suave, mas esta alternativa propõe uma função de controle contínuo que a OS não solicita.",
          "A rampa de tensão da SSW-05 é um recurso de partida, não um controle contínuo de velocidade.",
          "O relé térmico protege contra sobrecarga; sua inclusão não suaviza a partida direta."
        ],
        "ref": "Material de aula • §§3 e 5"
      },
      {
        "id": "plate",
        "type": "choice",
        "title": "Ler a placa do motor",
        "context": "Esta placa é uma representação didática: os valores do motor são hipóteses coerentes para a atividade, não um modelo comercial.",
        "prompt": "Qual é a corrente nominal a usar na rede de 380 V?",
        "options": [
          "16 A, pela coluna de 380 V da placa.",
          "27.6 A, pela outra coluna de tensão da placa.",
          "A corrente de pico registrada durante a partida.",
          "A corrente medida em regime com o motor desacoplado da carga."
        ],
        "correct": 0,
        "why": [
          "Use a corrente nominal correspondente à tensão e à ligação aplicadas ao motor.",
          "A corrente da outra tensão não é a referência da ligação utilizada neste cenário.",
          "O pico de partida é transitório; não substitui a corrente nominal de placa.",
          "A corrente em vazio não substitui a corrente nominal de placa do motor."
        ],
        "ref": "Manual • §12.4, p. 72",
        "show": "plate"
      },
      {
        "id": "select",
        "type": "choice",
        "title": "Selecionar a SSW-05",
        "context": "O estoque dispõe de quatro opções. Ambiente: 30 °C, altitude < 1.000 m, uma partida a cada 20 min. A análise do ciclo será completada no ensaio.",
        "prompt": "Qual opção é compatível com a corrente e a tensão, antes de validar a partida?",
        "options": [
          "SSW-05 · 16 A · 220–460 V",
          "SSW-05 · 10 A · 220–460 V",
          "SSW-05 · 16 A · 460–575 V",
          "SSW-05 · 10 A · 460–575 V"
        ],
        "correct": 0,
        "why": [
          "A corrente de 16 A e a faixa de tensão são compatíveis com o cenário. Ainda é necessário validar carga e ciclo.",
          "A corrente nominal de 10 A é inferior à corrente nominal deste motor.",
          "A corrente é compatível, mas a faixa de tensão desta versão não admite a rede do cenário.",
          "Esta opção não atende à corrente nominal do motor nem à tensão da rede."
        ],
        "ref": "Manual • §§3, 4 e 6, pp. 65–67",
        "show": "models"
      },
      {
        "id": "terminals",
        "type": "terminals",
        "title": "Conferir as conexões",
        "context": "Selecione o grupo de bornes que recebe a alimentação da eletrônica. A fonte de controle disponível é 220 Vca.",
        "prompt": "Onde conectar a alimentação de controle?",
        "ref": "Manual • §4 e §11, pp. 66 e 69–70"
      },
      {
        "id": "current",
        "type": "current",
        "title": "Referenciar as proteções",
        "context": "Configure MOTOR CURRENT usando as correntes nominais de placa. Um ajuste abaixo do correto altera a referência das proteções.",
        "prompt": "Qual percentual deve ser ajustado?",
        "ref": "Manual • §12.4, p. 72"
      },
      {
        "id": "load",
        "type": "choice",
        "title": "Inspecionar antes de ajustar",
        "context": "Na inspeção simulada, os roletes giram livremente e a tensão da correia está correta. A carga é leve, mas a esteira parte com algumas caixas apoiadas.",
        "prompt": "O que deve ser considerado no ajuste inicial?",
        "options": [
          "Considerar o torque para vencer o atrito inicial sem deslocar as caixas.",
          "Escolher o pedestal pela corrente em vazio, antes de considerar as caixas.",
          "Priorizar o maior tempo de rampa, mantendo o menor pedestal disponível.",
          "Definir o pedestal apenas pela potência do motor, sem considerar o atrito."
        ],
        "correct": 0,
        "why": [
          "O pedestal deve fornecer torque para arrancar, sem criar impacto excessivo.",
          "A corrente em vazio não representa o torque exigido pela esteira parcialmente carregada.",
          "Tempo maior não compensa necessariamente torque inicial insuficiente e pode prolongar o aquecimento.",
          "Motores de mesma potência podem acionar cargas com exigências diferentes de torque inicial."
        ],
        "ref": "Material de aula • §§5 e 7"
      },
      {
        "id": "simulate",
        "type": "simulation",
        "title": "Comissionar a partida",
        "context": "A esteira está parcialmente carregada e tem atrito inicial significativo. Ajuste o pedestal para vencer a carga sem tranco e teste o tempo de aceleração até atingir a rotação de regime. Observe se as caixas permanecem estáveis e acompanhe corrente e esforço térmico durante toda a partida.",
        "prompt": "Ajuste INITIAL VOLTAGE e ACCEL TIME, execute o ensaio e avalie o resultado. Rampa curta pode elevar a corrente; rampa longa pode prolongar a aceleração e o esforço térmico. Busque movimento inicial, entrada em regime e uma partida sem impacto excessivo.",
        "ref": "Manual • §4, §12 e §14; modelo didático documentado"
      },
      {
        "id": "analysis",
        "type": "choice",
        "title": "Manter as caixas estáveis",
        "context": "No primeiro ensaio, as caixas se deslocaram bruscamente ao iniciar o movimento. A inspeção mecânica já foi realizada.",
        "prompt": "Qual ajuste merece atenção primeiro?",
        "options": [
          "Analisar e reduzir o pedestal, preservando torque suficiente para iniciar.",
          "Alongar ACCEL TIME, mantendo o pedestal usado no início do movimento.",
          "Reduzir MOTOR CURRENT para limitar o torque aplicado às caixas.",
          "Habilitar DECEL TIME para suavizar a entrada das caixas em movimento."
        ],
        "correct": 0,
        "why": [
          "Um pedestal excessivo pode causar impacto inicial. Reduza com critério e compare movimento e corrente.",
          "Alongar a rampa não corrige necessariamente um degrau inicial de torque causado pelo pedestal.",
          "Esse ajuste referencia proteções; não funciona como um comando de limitação de torque.",
          "A desaceleração atua na parada e não corrige o tranco no início da partida."
        ],
        "ref": "Manual • §12.1 e material de aula • §7"
      },
      {
        "id": "fault",
        "type": "choice",
        "title": "Investigar uma esteira presa",
        "context": "Durante um teste, uma carga presa impede a aceleração da esteira. Na transição para o by-pass, a corrente permanece igual ou superior a 2 × a referência ajustada no MOTOR CURRENT e o LED Stall sinaliza falha.",
        "prompt": "Qual verificação deve vir antes de um novo ensaio?",
        "options": [
          "Desenergizar conforme o procedimento, inspecionar obstruções, correia e carga; depois rever os ajustes.",
          "Elevar o pedestal para vencer a resistência antes de inspecionar a esteira.",
          "Alongar a rampa para dar mais tempo ao motor, mantendo a carga presa.",
          "Elevar MOTOR CURRENT para adequar o limiar Stall à corrente observada."
        ],
        "correct": 0,
        "why": [
          "O cenário informa uma obstrução. Investigue-a antes de repetir o ensaio. Stall atua pela corrente na transição e, sozinho, não comprova bloqueio mecânico.",
          "Aumentar torque contra uma obstrução pode agravar o problema; a inspeção deve vir antes do novo ensaio.",
          "Mais tempo não remove a obstrução e pode prolongar corrente elevada e aquecimento.",
          "O ajuste deve seguir a corrente nominal do motor; não deve ser elevado para contornar uma falha."
        ],
        "ref": "Manual • §14, p. 73",
        "show": "fault",
        "faultIndex": 3
      },
      {
        "id": "stop-belt",
        "type": "choice",
        "title": "Escolher a parada normal",
        "context": "A esteira não apresenta problema hidráulico e pode parar livremente. Não há exigência de posicionamento ou frenagem nesta situação.",
        "prompt": "Como configurar DECEL TIME para esta atividade?",
        "options": [
          "OFF: parada livre, com a função de segurança tratada separadamente.",
          "Usar uma rampa curta para obter frenagem controlada das caixas.",
          "Repetir em DECEL TIME o tempo escolhido para a aceleração.",
          "Usar uma rampa longa para manter torque de sustentação até a esteira parar."
        ],
        "correct": 0,
        "why": [
          "O cenário admite parada livre; a rampa de bombas da SSW-05 não é necessária nesta esteira.",
          "A rampa de tensão não garante frenagem ou posicionamento da esteira.",
          "O tempo de partida não define automaticamente a necessidade ou o ajuste da parada.",
          "A rampa de desaceleração não é controle de torque de sustentação; neste cenário a parada normal é livre."
        ],
        "ref": "Manual • §12.3, p. 71"
      },
      {
        "id": "commission",
        "type": "checklist",
        "title": "Liberar o comissionamento",
        "context": "Revise as evidências da intervenção virtual e conclua a análise da situação.",
        "prompt": "Confirme as verificações realizadas.",
        "ref": "Síntese didática baseada no manual e no material de aula"
      }
    ]
  }
];

// Balance choices once at load, preserving each answer's explanation.
SCENARIOS.forEach((scenario,si)=>{
 scenario.steps=scenario.steps.filter(step=>step.id!=='protection');
 let n=0;
 scenario.steps.forEach(step=>{
  if(step.type==='simulation'){step.context='Ajuste o painel e acompanhe a resposta do motor no gráfico.';step.prompt='Simule, compare e valide a partida.';}
  if(step.type!=='choice')return;
  const target=(n++ + si)%step.options.length;
  const order=step.options.map((_,i)=>i);
  [order[target],order[step.correct]]=[order[step.correct],order[target]];
  step.options=order.map(i=>step.options[i]);step.why=order.map(i=>step.why[i]);step.correct=target;
 });
});
