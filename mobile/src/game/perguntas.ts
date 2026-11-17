import type { Resposta } from './jogo'

export type Pergunta = {
  enunciado: string
  alternativas: Record<Resposta, string>
}

const perguntas: Record<number, Pergunta> = {
  1: {
    enunciado: 'Para fazer Toy Story, os artistas dos estúdios Disney usaram programas de ...',
    alternativas: { A: 'auditório', B: 'rádio', C: 'televisão', D: 'computador' },
  },
  2: {
    enunciado: 'Muitos desses programas foram bolados especialmente pela Pixar, uma empresa de ...',
    alternativas: { A: 'diversões eletrônicas', B: 'fast food', C: 'computação gráfica', D: 'lavanderias automáticas' },
  },
  3: {
    enunciado: 'Todas as imagens de Toy Story foram ... por computador.',
    alternativas: { A: 'zeradas', B: 'geradas', C: 'viradas', D: 'gemadas' },
  },
  4: {
    enunciado: 'Isto quer dizer que o computador recebeu um monte de informações e depois ... as imagens.',
    alternativas: { A: 'enganou', B: 'criou', C: 'esqueceu', D: 'perdeu' },
  },
  5: {
    enunciado: 'Essas informações são trabalhadas no computador por ... especiais, os programas de animação.',
    alternativas: { A: 'popcorn', B: 'blue jeans', C: 'softwares', D: 'hot dogs' },
  },
  6: {
    enunciado: 'Para fazer Toy Story, o diretor John Lasseter contou com uma talentosa equipe de mais de cem ...',
    alternativas: { A: 'caubóis', B: 'pára-quedistas', C: 'bombeiros', D: 'micreiros' },
  },
  7: {
    enunciado: 'Eles são chamados assim porque são verdadeiras feras em seus ...',
    alternativas: { A: 'microorganismos', B: 'microondas', C: 'micróbios', D: 'microcomputadores' },
  },
  8: {
    enunciado: 'Nos Estados Unidos, a voz de Woody foi dublada por ...',
    alternativas: { A: 'Tom Jobim', B: 'Tom Story', C: 'Tom Hanks', D: 'Tom Cavalcante' },
  },
  9: {
    enunciado: 'Esse ator já ganhou dois Oscars, um deles pelo filme ...',
    alternativas: { A: 'Forrest Gump', B: 'Velocidade Máxima', C: 'O Quatrilho', D: 'E.T.' },
  },
  10: {
    enunciado: 'Para fazer os 77 minutos de Toy Story, foram gastos mais de ... horas nos computadores.',
    alternativas: { A: '800 mil', B: '24', C: '100', D: '57' },
  },
  11: {
    enunciado: 'Todas essas horas de computador produziram ...',
    alternativas: { A: '230 pizzas de mussarela', B: '65 quilômetros por hora', C: '100 toneladas de chiclete', D: '600 milhões de bytes' },
  },
  12: {
    enunciado: 'O Rei Leão custou 45 milhões de dólares; Toy Story custou 30 milhões. Isso mostra que o uso de computadores ... os custos de produção.',
    alternativas: { A: 'aumenta', B: 'engole', C: 'diminui', D: 'inverte' },
  },
  13: {
    enunciado: 'O Rei Leão empregou 800 ..., enquanto Toy Story teve uma equipe de apenas 110 pessoas.',
    alternativas: { A: 'animais', B: 'desenhistas', C: 'felinos', D: 'domadores' },
  },
  14: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'tênis', B: 'lápis', C: 'luva', D: 'lenço' },
  },
  15: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'colete', B: 'pirulito', C: 'relógio', D: 'rato' },
  },
  16: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'pé-de-pato', B: 'torta', C: 'picolé', D: 'botas' },
  },
  17: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'cinturão', B: 'cadeira', C: 'tesoura', D: 'areia' },
  },
  18: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'skate', B: 'capacete', C: 'serrote', D: 'asa delta' },
  },
  19: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'estrela', B: 'chapéu', C: 'peixe', D: 'saiote' },
  },
  20: {
    enunciado: 'Encontre no caça-palavras o nome do equipamento de Woody.',
    alternativas: { A: 'gorro', B: 'cinturão', C: 'areia', D: 'capacete' },
  },
  21: {
    enunciado: 'O nome do menino desta história é ...',
    alternativas: { A: 'Billy', B: 'Andy', C: 'Ted', D: 'Ricky' },
  },
  22: {
    enunciado: 'O que você calça no pé é ...',
    alternativas: { A: 'luva', B: 'sapato', C: 'óculos', D: 'gorro' },
  },
  23: {
    enunciado: 'A Lua é o satélite da ...',
    alternativas: { A: 'Sol', B: 'Vênus', C: 'Marte', D: 'Terra' },
  },
  24: {
    enunciado: 'Para saber as horas, olhamos o ...',
    alternativas: { A: 'relógio', B: 'fogão', C: 'cinema', D: 'tempo' },
  },
  25: {
    enunciado: 'As galinhas botam ...',
    alternativas: { A: 'penas', B: 'coxinhas', C: 'ovos', D: 'estrelas' },
  },
  26: {
    enunciado: 'A gente respira pelo ...',
    alternativas: { A: 'nariz', B: 'ouvido', C: 'braço', D: 'pé' },
  },
  27: {
    enunciado: 'Depois de hoje vem ...',
    alternativas: { A: 'ontem', B: 'amanhã', C: 'chuva', D: 'cachorro' },
  },
  28: {
    enunciado: 'Na ponta dos dedos, você tem ...',
    alternativas: { A: 'dentes', B: 'rodas', C: 'pestanas', D: 'unhas' },
  },
  29: {
    enunciado: '“Brinquedo” em inglês é ...',
    alternativas: { A: 'toy', B: 'boy', C: 'red', D: 'day' },
  },
  30: {
    enunciado: 'Andy deu uma festa de ...',
    alternativas: { A: 'Natal', B: 'Halloween', C: 'aniversário', D: 'carnaval' },
  },
  31: {
    enunciado: 'No primeiro desenho, o boneco está com o braço ...',
    alternativas: { A: 'abaixado', B: 'verde', C: 'quente', D: 'encolhido' },
  },
  32: {
    enunciado: 'No segundo desenho, o braço do boneco está um pouco mais para ...',
    alternativas: { A: 'o sul', B: 'cima', C: 'baixo', D: 'lá embaixo' },
  },
  33: {
    enunciado: 'Cada desenho é um pouquinho ... do desenho anterior.',
    alternativas: { A: 'igual', B: 'maior', C: 'diferente', D: 'menor' },
  },
  34: {
    enunciado: 'O braço do boneco vai ... cada vez mais.',
    alternativas: { A: 'falando', B: 'dormindo', C: 'subindo', D: 'pesando' },
  },
  35: {
    enunciado: 'Uma ... especial filma todos os desenhos.',
    alternativas: { A: 'sanfona', B: 'geladeira', C: 'guitarra', D: 'câmera' },
  },
  36: {
    enunciado: 'Quando o filme é projetado, o braço do boneco parece estar em ...',
    alternativas: { A: 'casa', B: 'férias', C: 'amarelo', D: 'movimento' },
  },
  37: {
    enunciado: 'Primeiro, o roteirista escreve o ... do filme.',
    alternativas: { A: 'cenário', B: 'colorido', C: 'som', D: 'roteiro' },
  },
  38: {
    enunciado: 'O desenhista faz o storyboard, que é o desenho do roteiro dividido em ...',
    alternativas: { A: 'fatias', B: 'planos', C: 'pedaços', D: 'números' },
  },
  39: {
    enunciado: 'A figura mostra o diretor e o roteirista diante do ...',
    alternativas: { A: 'portão', B: 'shopping', C: 'quadro negro', D: 'storyboard' },
  },
  40: {
    enunciado: 'Agora, o desenhista faz o ..., definindo os movimentos de câmera, cortes e posição dos personagens.',
    alternativas: { A: 'layout', B: 'almoço', C: 'sanduíche', D: 'exercício' },
  },
  41: {
    enunciado: 'O desenhista faz os cenários e escolhe as ...',
    alternativas: { A: 'frutas', B: 'cores', C: 'balas', D: 'piadas' },
  },
  42: {
    enunciado: 'Os cenários vão ficar no fundo, ... dos personagens.',
    alternativas: { A: 'atrás', B: 'em cima', C: 'depois', D: 'na frente' },
  },
  43: {
    enunciado: 'Os desenhos são feitos em acetato transparente e ... com tinta guache por trás.',
    alternativas: { A: 'divididos', B: 'enrolados', C: 'rasgados', D: 'coloridos' },
  },
  44: {
    enunciado: 'Depois de prontos, os desenhos são ... com uma câmera especial.',
    alternativas: { A: 'filmados', B: 'lavados', C: 'polidos', D: 'marcados' },
  },
  45: {
    enunciado: 'O filme é montado na ... certa, de acordo com o roteiro.',
    alternativas: { A: 'ordem', B: 'lua', C: 'semana', D: 'medida' },
  },
  46: {
    enunciado: 'O técnico de som junta as pistas de música, de diálogos e de ruídos, formando a ... sonora.',
    alternativas: { A: 'trilha', B: 'pizza', C: 'pilha', D: 'pasta' },
  },
  47: {
    enunciado: 'Já com a banda sonora, o filme é levado ao ... para ser revelado.',
    alternativas: { A: 'hospital', B: 'laboratório', C: 'dentista', D: 'táxi' },
  },
  48: {
    enunciado: 'São tiradas várias cópias do filme, para ... nos cinemas.',
    alternativas: { A: 'mergulhar', B: 'cozinhar', C: 'projetar', D: 'dizer' },
  },
  49: {
    enunciado: 'O primeiro personagem famoso do desenho animado foi o Gato Félix, criado em 1919 por Pat Sullivan.',
    alternativas: { A: 'Pat Sullivan', B: 'Walt Disney', C: 'Woody', D: 'Buzz' },
  },
  50: {
    enunciado: 'O camundongo ... foi criado por Walt Disney em 1926.',
    alternativas: { A: 'Mickey', B: 'Donald', C: 'Pateta', D: 'Pluto' },
  },
  51: {
    enunciado: 'Nessa época, o cinema era ...',
    alternativas: { A: 'mudo', B: 'apagado', C: 'cego', D: 'surdo' },
  },
  52: {
    enunciado: 'Foi só em 1927 que surgiram os filmes ...',
    alternativas: { A: 'duplos', B: 'falados', C: 'antigos', D: 'inteiros' },
  },
  53: {
    enunciado: 'Os filmes antigos eram em ...',
    alternativas: { A: 'preto e branco', B: 'queijo e presunto', C: 'laser e vídeo', D: 'verde e rosa' },
  },
  54: {
    enunciado: 'Mas tudo mudou quando foram inventados os filmes ...',
    alternativas: { A: 'solúveis', B: 'dupla face', C: 'coreanos', D: 'coloridos' },
  },
  55: {
    enunciado: 'Em 1937, a Disney lançou o primeiro desenho animado de longa metragem: ...',
    alternativas: { A: 'Pocahontas', B: 'Branca de Neve', C: 'Peter Pan', D: 'Toy Story' },
  },
  56: {
    enunciado: 'E, nos anos 80, a Disney usou pela primeira vez a tecnologia dos ... no desenho animado.',
    alternativas: { A: 'celulares', B: 'computadores', C: 'CD-ROM', D: 'lápis de cor' },
  },
  57: {
    enunciado: 'Feito em 1940, o desenho ... colocou personagens divertidos no ritmo da música clássica.',
    alternativas: { A: 'Spartacus', B: 'Fantasia', C: 'Pato Donald', D: 'Mad Max' },
  },
  58: {
    enunciado: 'A Bela e a Fera, de 1991, foi indicado para o ...',
    alternativas: { A: 'Oscar', B: 'Heitor', C: 'Gaspar', D: 'William' },
  },
  59: {
    enunciado: 'A trilha sonora e a canção de Aladdin foram premiadas com o Oscar e o Globo de ...',
    alternativas: { A: 'Vidro', B: 'Cenoura', C: 'Veludo', D: 'Ouro' },
  },
  60: {
    enunciado: 'Toy Story é o ... desenho da Disney realizado por computação gráfica.',
    alternativas: { A: 'inesperado', B: 'quinto', C: 'primeiro', D: 'outro' },
  },
  61: {
    enunciado: 'Utilizando tecnologia de computadores, em 1988, o filme ... combinou atores de verdade com desenho animado.',
    alternativas: { A: 'Cinderela', B: 'A Pequena Sereia', C: 'O Rei Leão', D: 'Uma Cilada para Roger Rabbit' },
  },
  62: {
    enunciado: 'Os répteis gigantes de ... também foram criados em computadores.',
    alternativas: { A: 'Robin Hood', B: 'Branca de Neve', C: 'Aladdin', D: 'O Parque dos Dinossauros' },
  },
  63: {
    enunciado: 'Se você gosta de brincar no computador, já deve saber o nome das partes numeradas.',
    alternativas: { A: 'celular', B: 'teclado', C: 'fax', D: 'televisor' },
  },
  64: {
    enunciado: 'Se você gosta de brincar no computador, já deve saber o nome das partes numeradas.',
    alternativas: { A: 'tablado', B: 'memória', C: 'mouse', D: 'cassete' },
  },
  65: {
    enunciado: 'Se você gosta de brincar no computador, já deve saber o nome das partes numeradas.',
    alternativas: { A: 'fax', B: 'chip', C: 'mouse', D: 'monitor' },
  },
  66: {
    enunciado: 'Se você gosta de brincar no computador, já deve saber o nome das partes numeradas.',
    alternativas: { A: 'CD-ROM', B: 'byte', C: 'impressora', D: 'vídeo' },
  },
  67: {
    enunciado: 'Este micro é um ...',
    alternativas: { A: 'multimídia', B: 'notebook', C: 'septimum', D: 'minisystem' },
  },
  68: {
    enunciado: 'Em primeiro lugar, os artistas fazem desenhos das principais cenas do filme, que irão compor o storyboard.',
    alternativas: { A: 'storyboard', B: 'personagens', C: 'rumo', D: 'plots' },
  },
  69: {
    enunciado: 'O storyboard é montado com as cenas na ordem certa, junto com as falas dos personagens.',
    alternativas: { A: 'falas', B: 'som', C: 'voz', D: 'ruído' },
  },
  70: {
    enunciado: 'Quando as cenas e os diálogos estão na ordem, o diretor de arte escolhe a luz e o colorido de cada cena.',
    alternativas: { A: 'luz', B: 'música', C: 'pistas', D: 'gravação' },
  },
  71: {
    enunciado: 'Na quarta etapa, o computador cria modelos tridimensionais dos personagens e dos objetos.',
    alternativas: { A: 'modelos', B: 'quadros', C: 'storyboard', D: 'planos' },
  },
  72: {
    enunciado: 'Com os modelos prontos, o departamento de layout define os “movimentos de câmera” no computador.',
    alternativas: { A: 'câmera', B: 'movimento', C: 'som', D: 'luz' },
  },
  73: {
    enunciado: 'Em seguida, os micreiros “animam” os personagens e o computador preenche o caminho do movimento.',
    alternativas: { A: 'movimento', B: 'som', C: 'luz', D: 'rumo' },
  },
  74: {
    enunciado: 'As cenas já animadas passam pelos “shaders”, programas que definem como serão as superfícies.',
    alternativas: { A: 'tecido', B: 'luz', C: 'música', D: 'filme' },
  },
  75: {
    enunciado: 'Depois de trabalhada nos shaders, cada cena é iluminada e o processo é chamado de renderização.',
    alternativas: { A: 'renderização', B: 'storyboard', C: 'som', D: 'layout' },
  },
  76: {
    enunciado: 'A etapa final do processo é a gravação de todas as imagens em filme.',
    alternativas: { A: 'gravação', B: 'renderização', C: 'layout', D: 'som' },
  },
  77: {
    enunciado: 'Qual etapa do processo de animação por computador vem depois da renderização?',
    alternativas: { A: 'gravação em filme', B: 'storyboard', C: 'layout', D: 'som' },
  },
  78: {
    enunciado: 'Encontre a peça correspondente ao espaço numerado no quebra-cabeça.',
    alternativas: { A: 'A', B: 'B', C: 'C', D: 'D' },
  },
  79: {
    enunciado: 'Encontre a peça correspondente ao espaço numerado no quebra-cabeça.',
    alternativas: { A: 'A', B: 'B', C: 'C', D: 'D' },
  },
  80: {
    enunciado: 'Encontre a peça correspondente ao espaço numerado no quebra-cabeça.',
    alternativas: { A: 'A', B: 'B', C: 'C', D: 'D' },
  },
  81: {
    enunciado: 'Encontre a peça correspondente ao espaço numerado no quebra-cabeça.',
    alternativas: { A: 'A', B: 'B', C: 'C', D: 'D' },
  },
  82: {
    enunciado: 'Encontre a peça correspondente ao espaço numerado no quebra-cabeça.',
    alternativas: { A: 'A', B: 'B', C: 'C', D: 'D' },
  },
  83: {
    enunciado: 'Encontre a peça correspondente ao espaço numerado no quebra-cabeça.',
    alternativas: { A: 'A', B: 'B', C: 'C', D: 'D' },
  },
  84: {
    enunciado: 'Descubra a palavra que falta no texto sobre Toy Story.',
    alternativas: { A: 'subir', B: 'fechar', C: 'dançar', D: 'estrear' },
  },
  85: {
    enunciado: 'Descubra a palavra que falta no texto sobre Toy Story.',
    alternativas: { A: 'Cybernet', B: 'Internet', C: 'Network', D: 'Toynet' },
  },
  86: {
    enunciado: 'Descubra a palavra que falta no texto sobre Toy Story.',
    alternativas: { A: 'correio', B: 'endereço', C: 'carteiro', D: 'selo' },
  },
  87: {
    enunciado: 'Descubra a palavra que falta no texto sobre Toy Story.',
    alternativas: { A: 'pedras', B: 'balas', C: 'sombras', D: 'informações' },
  },
  88: {
    enunciado: 'Descubra a palavra que falta no texto sobre Toy Story.',
    alternativas: { A: 'pipocas', B: 'saudades', C: 'curiosidades', D: 'abobrinhas' },
  },
  89: {
    enunciado: 'Qual palavra completa a frase: “Vamos entrar na ...”?',
    alternativas: { A: 'casa', B: 'piscina', C: 'rede', D: 'igreja' },
  },
  90: {
    enunciado: 'Qual palavra completa a frase: “Vamos entrar na ...”?',
    alternativas: { A: 'pescar', B: 'mergulhar', C: 'navegar', D: 'chorar' },
  },
  91: {
    enunciado: 'Faça a associação: CAUBÓI combina com ...',
    alternativas: { A: 'Prepara comidas', B: 'Cuida dos doentes', C: 'Cuida do gado e doma cavalos', D: 'Dirige aviões' },
  },
  92: {
    enunciado: 'Faça a associação: ASTRONAUTA combina com ...',
    alternativas: { A: 'Conserta carros', B: 'Explora o espaço', C: 'Dirige aviões', D: 'Prepara comidas' },
  },
  93: {
    enunciado: 'Faça a associação: MECÂNICO combina com ...',
    alternativas: { A: 'Conserta carros', B: 'Cuida dos doentes', C: 'Explora o espaço', D: 'Dirige aviões' },
  },
  94: {
    enunciado: 'Faça a associação: MÉDICO combina com ...',
    alternativas: { A: 'Prepara comidas', B: 'Cuida dos doentes', C: 'Dirige aviões', D: 'Explora o espaço' },
  },
  95: {
    enunciado: 'Faça a associação: PILOTO combina com ...',
    alternativas: { A: 'Cuida do gado', B: 'Dirige aviões', C: 'Prepara comidas', D: 'Explora o espaço' },
  },
  96: {
    enunciado: 'Faça a associação: COZINHEIRO combina com ...',
    alternativas: { A: 'Prepara comidas', B: 'Cuida dos doentes', C: 'Dirige aviões', D: 'Explora o espaço' },
  },
  97: {
    enunciado: 'A tenda está ... de Beth.',
    alternativas: { A: 'depois', B: 'dentro', C: 'atrás', D: 'longe' },
  },
  98: {
    enunciado: 'Woody está ... da cama.',
    alternativas: { A: 'em cima', B: 'na frente', C: 'debaixo', D: 'caindo' },
  },
  99: {
    enunciado: 'Na cama de Andy há dois ...',
    alternativas: { A: 'aviões', B: 'tomates', C: 'camelos', D: 'travesseiros' },
  },
  100: {
    enunciado: 'O soldadinho levanta o braço ...',
    alternativas: { A: 'depois', B: 'dentro', C: 'esquerdo', D: 'direito' },
  },
  101: {
    enunciado: 'Vejo ... soldadinhos verdes.',
    alternativas: { A: 'muitos', B: 'alguns', C: 'vários', D: 'três' },
  },
  102: {
    enunciado: 'Buzz está todo ...',
    alternativas: { A: 'contente', B: 'faminto', C: 'zangado', D: 'molhado' },
  },
  103: {
    enunciado: 'Quantos foguetes aparecem na figura?',
    alternativas: { A: '9', B: '5', C: '12', D: '7' },
  },
  104: {
    enunciado: 'Quantos planetas têm anéis?',
    alternativas: { A: '7', B: '8', C: '6', D: '4' },
  },
  105: {
    enunciado: 'O que aparece mais vezes?',
    alternativas: { A: 'flor', B: 'foguete', C: 'lua', D: 'estrela' },
  },
  106: {
    enunciado: 'Os cometas têm ...',
    alternativas: { A: 'caudas', B: 'anéis', C: 'satélites', D: 'asas' },
  },
  107: {
    enunciado: 'Quantos cometas você consegue ver?',
    alternativas: { A: '10', B: '6', C: '15', D: '37' },
  },
  108: {
    enunciado: 'E quantos astronautas?',
    alternativas: { A: '7', B: 'nenhum', C: '1', D: 'vários' },
  },
  109: {
    enunciado: 'Como se chama esta forma?',
    alternativas: { A: 'triângulo', B: 'círculo', C: 'quadrado', D: 'pentágono' },
  },
  110: {
    enunciado: 'Esta planta é um ...',
    alternativas: { A: 'pepino', B: 'pinheiro', C: 'molusco', D: 'cacto' },
  },
  111: {
    enunciado: 'A caveira no desenho é de ...',
    alternativas: { A: 'tubarão', B: 'leão', C: 'cobra', D: 'boi' },
  },
  112: {
    enunciado: 'Isto é uma ...',
    alternativas: { A: 'lanterna', B: 'cesta', C: 'cerca', D: 'âncora' },
  },
  113: {
    enunciado: 'O laço do caubói é feito de ...',
    alternativas: { A: 'arame', B: 'açúcar', C: 'corda', D: 'plástico' },
  },
  114: {
    enunciado: 'Quantos cavalos há em cada linha vertical?',
    alternativas: { A: '9', B: '3', C: '12', D: '4' },
  },
  115: {
    enunciado: 'Buzz pensa que é um ... de verdade.',
    alternativas: { A: 'eletricista', B: 'jardineiro', C: 'lenhador', D: 'astronauta' },
  },
  116: {
    enunciado: 'Mas ele é apenas um ... de ação.',
    alternativas: { A: 'boneco', B: 'pimentão', C: 'relógio', D: 'suspiro' },
  },
  117: {
    enunciado: 'O ... comanda os soldadinhos verdes.',
    alternativas: { A: 'Sargento', B: 'Pateta', C: 'Mágico', D: 'Pluto' },
  },
  118: {
    enunciado: 'Woody é um caubói de ...',
    alternativas: { A: 'sorvete', B: 'verdade', C: 'madeira', D: 'massinha' },
  },
  119: {
    enunciado: 'Beth é a boneca do ... de Molly.',
    alternativas: { A: 'estojo', B: 'piano', C: 'travesseiro', D: 'abajur' },
  },
  120: {
    enunciado: 'Os brinquedos vivem no quarto de ...',
    alternativas: { A: 'Woody', B: 'Andy', C: 'Porquinho', D: 'Slinky' },
  },
  121: {
    enunciado: 'Astronautas de verdade viajam em ...',
    alternativas: { A: 'trens', B: 'naves', C: 'bandos', D: 'navios' },
  },
  122: {
    enunciado: 'Eles usam trajes ...',
    alternativas: { A: 'de balé', B: 'a rigor', C: 'roxos', D: 'espaciais' },
  },
  123: {
    enunciado: '“Traje” é o mesmo que ...',
    alternativas: { A: 'rato', B: 'jato', C: 'trapo', D: 'roupa' },
  },
  124: {
    enunciado: 'O ... faz parte da roupa espacial.',
    alternativas: { A: 'pastel', B: 'capacete', C: 'asteróide', D: 'travesseiro' },
  },
  125: {
    enunciado: 'Eles também usam um tanque de ...',
    alternativas: { A: 'água', B: 'oxigênio', C: 'guerra', D: 'raspadinha' },
  },
  126: {
    enunciado: 'Com ele, podem ... no espaço.',
    alternativas: { A: 'falar', B: 'beber', C: 'lavar roupa', D: 'respirar' },
  },
  127: {
    enunciado: 'Buzz acha que é um astronauta de ...',
    alternativas: { A: 'verdade', B: 'mentira', C: 'falso', D: 'pergunta' },
  },
  128: {
    enunciado: 'Os dinossauros de verdade viveram há ... de anos.',
    alternativas: { A: 'centenas', B: 'milhões', C: 'um par', D: 'dezenas' },
  },
  129: {
    enunciado: 'A palavra “dinossauro” vem do grego e quer dizer ...',
    alternativas: { A: 'crustáceo minúsculo', B: 'inseto gigante', C: 'molusco dourado', D: 'lagarto terrível' },
  },
  130: {
    enunciado: 'Alguns dinossauros eram ...',
    alternativas: { A: 'ferozes', B: 'salgados', C: 'voadores', D: 'mamíferos' },
  },
  131: {
    enunciado: 'Os dinossauros eram ...',
    alternativas: { A: 'aves', B: 'répteis', C: 'moluscos', D: 'mosquitos' },
  },
  132: {
    enunciado: 'Eles se reproduziam por meio de ...',
    alternativas: { A: 'sementes', B: 'xerox', C: 'ovos', D: 'fotossíntese' },
  },
  133: {
    enunciado: 'Alguns dinossauros comiam carne: eram ...',
    alternativas: { A: 'metaleiros', B: 'adolescentes', C: 'carnívoros', D: 'surfistas' },
  },
  134: {
    enunciado: 'Assinale o animal que não é carnívoro.',
    alternativas: { A: 'elefante', B: 'tigre', C: 'lobo', D: 'tubarão' },
  },
  135: {
    enunciado: 'Rex é um ...',
    alternativas: { A: 'verdossauro', B: 'tiranossauro', C: 'sapossauro', D: 'democratossauro' },
  },
  136: {
    enunciado: 'Seu corpo é coberto de ...',
    alternativas: { A: 'asas', B: 'penas', C: 'pêlos', D: 'escamas' },
  },
  137: {
    enunciado: 'Rex tem uma ... comprida.',
    alternativas: { A: 'orelha', B: 'antena', C: 'chifre', D: 'cauda' },
  },
  138: {
    enunciado: 'Sua boca tem ... afiados.',
    alternativas: { A: 'dedos', B: 'patas', C: 'dentes', D: 'nozes' },
  },
  139: {
    enunciado: 'Hoje em dia os dinossauros estão ...',
    alternativas: { A: 'viajando', B: 'filmando', C: 'contentes', D: 'extintos' },
  },
  140: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Tim', B: 'Sid', C: 'Rex', D: 'Roy' },
  },
  141: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Soldado', B: 'Snoopy', C: 'Bidu', D: 'Dinky' },
  },
  142: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Tom', B: 'Buzz', C: 'Byte', D: 'Mike' },
  },
  143: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Buck', B: 'Woody', C: 'Blizz', D: 'Wonder' },
  },
  144: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Bonny', B: 'Beth', C: 'Julia', D: 'Jane' },
  },
  145: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Tom Toy', B: 'Tec Toy', C: 'Toy Story', D: 'Tom Boy' },
  },
  146: {
    enunciado: 'Complete o diagrama com o nome dos personagens e o título do filme.',
    alternativas: { A: 'Porquinho', B: 'Piggy', C: 'Petunia', D: 'Priscila' },
  },
  147: {
    enunciado: 'Ligue cada personagem com a palavra que combina com ele.',
    alternativas: { A: 'pastora', B: 'nave espacial', C: 'moedas', D: 'mola' },
  },
  148: {
    enunciado: 'Ligue cada personagem com a palavra que combina com ele.',
    alternativas: { A: 'pastora', B: 'nave espacial', C: 'moedas', D: 'mola' },
  },
  149: {
    enunciado: 'Ligue cada personagem com a palavra que combina com ele.',
    alternativas: { A: 'pastora', B: 'nave espacial', C: 'moedas', D: 'mola' },
  },
  150: {
    enunciado: 'Ligue cada personagem com a palavra que combina com ele.',
    alternativas: { A: 'pastora', B: 'nave espacial', C: 'moedas', D: 'mola' },
  },
}

export function obterPergunta(numero: number): Pergunta | undefined {
  return perguntas[numero]
}
