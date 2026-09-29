const state = {
  playerName: '',
  currentScene: 'start',
  hp: 100,
  energy: 60,
  gold: 20,
  sanity: 75,
  inventory: ['Caneta de escriba', 'Pão de cevada'],
  quests: [
    { title: 'Desvendar o segredo do templo', status: 'Ativa' },
    { title: 'Provar valor diante do faraó', status: 'Disponível' }
  ],
  completed: []
};

const scenes = {
  start: {
    title: 'Foz do Nilo',
    text: 'Você acorda às margens do Nilo, sob um céu dourado. A água reflite o sol como um espelho de ouro. Um mensageiro do faraó te chama para uma missão: descobrir o que aconteceu no antigo templo de Amon-Rá e trazer provas antes do pôr do sol.',
    choices: [
      {
        label: 'Seguir para a pirâmide de Gizé',
        next: 'piramide',
        effect: { gold: 0, hp: 0, energy: -5, sanity: 0 },
        description: 'Partir imediatamente em direção ao monumento mais antigo da região.'
      },
      {
        label: 'Visitar o mercado de Tebas',
        next: 'mercado',
        effect: { gold: 5, hp: 0, energy: -2, sanity: 2 },
        description: 'Buscar pistas e suprimentos com mercadores e escribas.'
      },
      {
        label: 'Entrar no templo de Karnak',
        next: 'karnak',
        effect: { hp: -5, energy: -3, sanity: 4 },
        description: 'Aprofundar-se no santuário para ouvir histórias sagradas.'
      }
    ]
  },

  piramide: {
    title: 'Pirâmide de Gizé',
    text: 'Você atravessa corredores escavados em pedra, onde o ar parece vibrar com a memória dos mortos. Há uma estátua quebrada e um selo de ouro no chão.',
    choices: [
      {
        label: 'Examinar o selo',
        next: 'selo',
        effect: { energy: -4, sanity: 3, gold: 0 },
        description: 'Analisar a marca antiga e tentar decifrar sua origem.'
      },
      {
        label: 'Coletar um fragmento de pedra sagrada',
        next: 'fragmento',
        effect: { gold: 10, energy: -3, sanity: -2 },
        description: 'Pegar um pedaço raro para vender ou usar como prova.'
      },
      {
        label: 'Retornar ao rio',
        next: 'rio',
        effect: { energy: 2, hp: 2, sanity: 0 },
        description: 'Refazer o caminho para descansar e refletir.'
      }
    ]
  },

  mercado: {
    title: 'Mercado de Tebas',
    text: 'Bazares abarrotados de tecidos, perfumes, joias e grãos enchem o ar com cheiro de especiarias. Um negociante murmura que um escriba desapareceu perto do Vale dos Reis.',
    choices: [
      {
        label: 'Comprar uma lâmina de cobre',
        next: 'lancamento',
        effect: { gold: -8, hp: 0, energy: 0, sanity: 0 },
        description: 'Uma arma simples e útil em qualquer confronto.'
      },
      {
        label: 'Pedir informação ao mercador',
        next: 'info',
        effect: { gold: -3, energy: 0, sanity: 2 },
        description: 'Investigar a rota do escriba desaparecido.'
      },
      {
        label: 'Ir à biblioteca do templo',
        next: 'biblioteca',
        effect: { gold: 0, hp: 0, energy: -2, sanity: 4 },
        description: 'Buscar escritos sobre os mistérios do rio e dos faraós.'
      }
    ]
  },

  karnak: {
    title: 'Templo de Karnak',
    text: 'Colunas gigantes e hieróglifos em pedra revelam a grandiosidade dos deuses. Há um silêncio estranho, como se o templo estivesse esperando sua decisão.',
    choices: [
      {
        label: 'Ouvir o sacerdote',
        next: 'sacerdote',
        effect: { gold: 0, energy: -3, sanity: 6 },
        description: 'Receber uma profecia sobre a conspiração escondida.'
      },
      {
        label: 'Procurar por cavernas secretas',
        next: 'cavernas',
        effect: { hp: -10, energy: -8, sanity: -5 },
        description: 'Explorar um caminho proibido sob o templo.'
      },
      {
        label: 'Voltar para o Nilo',
        next: 'rio',
        effect: { energy: 3, hp: 4 },
        description: 'Refletir antes de agir de forma imprudente.'
      }
    ]
  },

  selo: {
    title: 'Selo de Ouro',
    text: 'O selo mostra um símbolo que parece representar Osíris e a lua. Você reconhece um emblema que pôde ter sido usado por um grupo secreto de escribas.',
    choices: [
      {
        label: 'Levar a prova ao faraó',
        next: 'finalFarao',
        effect: { gold: 15, energy: -4, sanity: 3 },
        description: 'Entregar a evidência ao governante e buscar recompensa.'
      },
      {
        label: 'Seguir rumo ao Vale dos Reis',
        next: 'vale',
        effect: { energy: -5, sanity: 2 },
        description: 'Continuar a investigação sem perder tempo.'
      }
    ]
  },

  fragmento: {
    title: 'Fragmento Sagrado',
    text: 'Ao tocar a pedra antiga, você sente uma energia intensa. A peça emana calor e parece conter uma mensagem escondida em baixo relevo.',
    choices: [
      {
        label: 'Vender a pedra',
        next: 'finalMercado',
        effect: { gold: 25, sanity: -4 },
        description: 'Transformar o achado em riquezas imediatas.'
      },
      {
        label: 'Trabalhar a inscrição',
        next: 'vale',
        effect: { energy: -6, sanity: 6 },
        description: 'Decifrar o símbolo antes de seguir em frente.'
      }
    ]
  },

  rio: {
    title: 'Margem do Nilo',
    text: 'O rio estende-se como uma faixa de luz, e uma barca passa com viajantes cansados. O vento canta entre os juncos, e a decisão tem peso.',
    choices: [
      {
        label: 'Seguir ao Vale dos Reis',
        next: 'vale',
        effect: { energy: -5, sanity: 1 },
        description: 'Acelerar a investigação na região dos mortos.'
      },
      {
        label: 'Dormir sob as estrelas',
        next: 'descanso',
        effect: { hp: 12, energy: 12, sanity: 5 },
        description: 'Descansar e recuperar forças para a missão.'
      }
    ]
  },

  vale: {
    title: 'Vale dos Reis',
    text: 'Tumbas escavadas em rocha revelam histórias de reis e intrigas. Um mapa antigo indica uma passagem escondida para a biblioteca subterrânea.',
    choices: [
      {
        label: 'Entrar na tumba',
        next: 'tumba',
        effect: { hp: -12, energy: -8, sanity: -3 },
        description: 'Tentear um caminho perigoso na busca por respostas.'
      },
      {
        label: 'Seguir o mapa até a biblioteca',
        next: 'biblioteca',
        effect: { money: 0, energy: -6, sanity: 4 },
        description: 'Investigar a biblioteca escondida antes de agir.'
      },
      {
        label: 'Regressar ao faraó',
        next: 'finalFarao',
        effect: { gold: 10, sanity: 3 },
        description: 'Relatar o que descobriu e solicitar aprovação.'
      }
    ]
  },

  biblioteca: {
    title: 'Biblioteca de Memórias',
    text: 'Páginas de papiro e rolos de pergaminho guardam os segredos da civilização. Uma passagem secreta revela a verdade: alguém usa o poder dos deuses para manipular os altares e o povo.',
    choices: [
      {
        label: 'Escrever um relatório ao faraó',
        next: 'finalFarao',
        effect: { gold: 20, sanity: 6 },
        description: 'Apresentar provas e salvar o reino da corrupção.'
      },
      {
        label: 'Vingança silenciosa',
        next: 'finalCaos',
        effect: { hp: -15, sanity: -10, gold: -5 },
        description: 'Se aliar ao grupo oculto para obter poder em vez de justiça.'
      }
    ]
  },

  descanso: {
    title: 'Noite sob o céu egípcio',
    text: 'Você dorme sob estrelas cintilantes, e a noite traz a paz. Ao amanhecer, sente que o destino mudou e a coragem cresceu dentro de si.',
    choices: [
      {
        label: 'Retornar ao trabalho',
        next: 'vale',
        effect: { energy: 4, hp: 8, sanity: 8 },
        description: 'Recomeçar a jornada com mais vigor.'
      }
    ]
  },

  sacerdote: {
    title: 'Palavra do Sacerdote',
    text: 'O sacerdote revela que a destruição dos antigos templos foi obra de um grupo que quer manipular o faraó. Ele entrega um amuleto de Ísis para a missão.',
    choices: [
      {
        label: 'Aceitar o amuleto e seguir',
        next: 'vale',
        effect: { energy: -2, sanity: 8, gold: 0 },
        description: 'Seguir com proteção divina do reino.'
      }
    ]
  },

  cavernas: {
    title: 'Cavernas das Trevas',
    text: 'Você encontra um altar oculto e um artefato de obsidiana. O chão treme e o perigo se aproxima. Há um caminho para a verdade — e um para a ruína.',
    choices: [
      {
        label: 'Tomar o artefato',
        next: 'finalCaos',
        effect: { gold: 40, sanity: -15, hp: -25 },
        description: 'Usar o poder da pedra para dominar a região.'
      },
      {
        label: 'Queimar o altar e fugir',
        next: 'finalFarao',
        effect: { hp: -10, energy: -10, sanity: 5 },
        description: 'Destruir a origem do mal antes que o caos se espalhe.'
      }
    ]
  },

  tumba: {
    title: 'Tumba do Rei Esquecido',
    text: 'Entre pinturas de escarabajos e joias, você encontra um pergaminho que explica uma conspiração de altos sacerdotes. O nome de um traidor aparece em ouro.',
    choices: [
      {
        label: 'Apresentar a verdade ao faraó',
        next: 'finalFarao',
        effect: { gold: 30, sanity: 10 },
        description: 'Salvar o reino com coragem e astúcia.'
      },
      {
        label: 'Silenciar o segredo para sempre',
        next: 'finalCaos',
        effect: { gold: 15, sanity: -8 },
        description: 'A prática do silêncio pode trazer poder, mas também destruição.'
      }
    ]
  },

  finalFarao: {
    title: 'Vitória do Faraó',
    text: 'Seu nome ressoa pelo palácio. O faraó honra sua coragem, entrega terras e ouro e te nomeia guardião das escrituras do reino. O Egito continua vivo sob sua proteção.',
    choices: [
      {
        label: 'Recomeçar a aventura',
        next: 'start',
        effect: { hp: 100, energy: 60, gold: 20, sanity: 75 },
        description: 'Nova jornada, novos desafios.'
      }
    ]
  },

  finalMercado: {
    title: 'O Ouro da Ambição',
    text: 'Você vende o artefato e se torna rico, mas a verdade se perde no mercado. A sua fama cresce entre mercadores, porém o povo continua sem justiça.',
    choices: [
      {
        label: 'Começar de novo',
        next: 'start',
        effect: { hp: 100, energy: 60, gold: 20, sanity: 75 },
        description: 'Decidir melhor no próximo ciclo.'
      }
    ]
  },

  finalCaos: {
    title: 'Caos e Trevas',
    text: 'O poder que você buscou se volta contra você. As sombras do deserto consomem a paz do reino e sua alma. O egito desce em um longo período de dúvida.',
    choices: [
      {
        label: 'Tentar um novo destino',
        next: 'start',
        effect: { hp: 100, energy: 60, gold: 20, sanity: 75 },
        description: 'Reiniciar o caminho e escolher a verdade.'
      }
    ]
  },

  info: {
    title: 'Pistas no Mercado',
    text: 'O mercador te diz que o escriba desapareceu no Vale dos Reis, e que uma família poderosa teme que o segredo do templo seja revelado.',
    choices: [
      {
        label: 'Ir ao Vale dos Reis',
        next: 'vale',
        effect: { energy: -3, sanity: 2 },
        description: 'Seguir a pista sem demora.'
      }
    ]
  },

  lancamento: {
    title: 'Arma de Cobre',
    text: 'A lâmina serve bem em uma emboscada. Mas o tempo é curto, e a missão continua.',
    choices: [
      {
        label: 'Seguir para o Vale dos Reis',
        next: 'vale',
        effect: { energy: -2, sanity: 1 },
        description: 'Avançar com mais preparo.'
      }
    ]
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function render() {
  const characterInfo = document.getElementById('characterInfo');
  const hpStat = document.getElementById('hpStat');
  const energyStat = document.getElementById('energyStat');
  const goldStat = document.getElementById('goldStat');
  const sanityStat = document.getElementById('sanityStat');
  const inventoryList = document.getElementById('inventoryList');
  const questList = document.getElementById('questList');
  const sceneInfo = document.getElementById('sceneInfo');
  const storyText = document.getElementById('storyText');
  const choices = document.getElementById('choices');

  const scene = scenes[state.currentScene];

  characterInfo.textContent = state.playerName || 'Aventureiro';
  hpStat.textContent = state.hp;
  energyStat.textContent = state.energy;
  goldStat.textContent = state.gold;
  sanityStat.textContent = state.sanity;

  inventoryList.innerHTML = state.inventory.map(item => `<li>${item}</li>`).join('');
  questList.innerHTML = state.quests.map(q => `<li>${q.title} — ${q.status}</li>`).join('');

  sceneInfo.textContent = `Local: ${scene.title}`;
  storyText.textContent = scene.text;

  choices.innerHTML = '';

  for (const choice of scene.choices) {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.textContent = choice.label;
    button.addEventListener('click', () => applyChoice(choice));
    choices.appendChild(button);
  }
}

function applyChoice(choice) {
  state.hp = clamp(state.hp + (choice.effect?.hp || 0), 0, 100);
  state.energy = clamp(state.energy + (choice.effect?.energy || 0), 0, 100);
  state.gold = state.gold + (choice.effect?.gold || 0);
  state.sanity = clamp(state.sanity + (choice.effect?.sanity || 0), 0, 100);

  if (state.currentScene === 'start' && choice.next === 'mercado') {
    state.inventory.push('Mapa do mercado');
  }

  if (choice.next === 'finalFarao') {
    state.quests[0].status = 'Concluída';
  }

  if (choice.next === 'finalCaos') {
    state.quests[1].status = 'Ruído de sombras';
  }

  state.currentScene = choice.next;
  render();
}

function init() {
  const playerName = prompt('Qual é o nome do herói do Egito?');
  state.playerName = playerName && playerName.trim() ? playerName.trim() : 'Nefru';
  state.inventory = ['Caneta de escriba', 'Pão de cevada'];
  render();
}

init();
