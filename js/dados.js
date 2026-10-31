const DADOS_INICIAIS = {
  nome:"Vaerik Vharzeth", apelido:"O Corvo", raca:"Tiefling", classe:"Ladino", nivel:1, experiencia:0,
  origem:"Khar-Vhar", local:"Valedouro, Alyndor", idade:"18 anos", altura:"1,80 m",
  atributos:{FOR:1,AGI:4,CON:1,INT:2,CAR:2},
  recursos:{pv:15,pvMax:15,pm:16,pmMax:16,sanidade:16,sanidadeMax:16,destino:3},
  pericias:[
    ["Pontaria","AGI",0],["Reflexo","AGI",1],["Corte","FOR",0],["Furtividade","AGI",2],
    ["Roubo","AGI",2],["Intimidação","CAR",0],["Flerte","CAR",0],["Diplomacia","CAR",0],
    ["Percepção","INT",1],["Investigação","INT",0],["Iniciativa","AGI",0],["Sorte","CON",0],
    ["Cura","INT",0],["Sobrevivência","CON",0],["Tecnologia","INT",0],["Engenharia","INT",0],
    ["Arcana","INT",0],["Vontade","CAR/CON",0]
  ],
  habilidades:[
    {nome:"Chama Sombria",tipo:"Racial",descricao:"Produz uma pequena energia de chama sombria para iluminação ou ataque. Dano ofensivo informado: 8. Uso: uma vez por descanso curto."},
    {nome:"Resistência à Influência",tipo:"Racial",descricao:"+15% em testes contra controle mental ou manipulação sobrenatural."},
    {nome:"Golpe das Sombras",tipo:"Ladino",descricao:"Contra alvo desprevenido, causa dano ×2. Crítico supremo (01–05): ×3. Após o ataque, pode testar Furtividade para permanecer oculto. Recarga: uma vez a cada 3 rodadas."}
  ],
  
inventario: [
  // VESTIMENTAS EQUIPADAS
  {
    nome: "Camisa escura de manga longa",
    quantidade: 1,
    peso: 0,
    descricao: "Camisa ajustada ao corpo, feita de tecido resistente, cobrindo os braços e o torso. Vestimenta habitual."
  },
  {
    nome: "Colete de couro gasto",
    quantidade: 1,
    peso: 0,
    descricao: "Colete preto ou marrom-escuro, com sinais de uso e pequenos desgastes. Vestimenta habitual."
  },
  {
    nome: "Calça escura flexível",
    quantidade: 1,
    peso: 0,
    descricao: "Permite movimentação livre durante corridas, escaladas e combates. Vestimenta habitual."
  },
  {
    nome: "Botas de couro",
    quantidade: 1,
    peso: 0,
    descricao: "Botas resistentes, adequadas para longas caminhadas."
  },
  {
    nome: "Braceletes de couro",
    quantidade: 1,
    peso: 0,
    descricao: "Protegem parcialmente os antebraços."
  },
  {
    nome: "Luvas sem dedos",
    quantidade: 1,
    peso: 0,
    descricao: "Permitem maior precisão ao manusear armas e ferramentas."
  },
  {
    nome: "Cinto com compartimentos",
    quantidade: 1,
    peso: 0,
    descricao: "Utilizado para guardar adagas, moedas e pequenos objetos."
  },
  {
    nome: "Capa de viagem",
    quantidade: 1,
    peso: 0,
    descricao: "Capa escura, resistente e relativamente longa. Protege contra frio e chuva, ajuda a esconder equipamentos e possui capuz."
  },

  // ARMAS
  {
    nome: "Adaga",
    quantidade: 2,
    peso: 0.4,
    descricao: "Armas principais de Vaerik, mantidas em bainhas presas ao cinto. Dano base informado: 5. Peso registrado anteriormente por unidade."
  },

  // MOCHILA E CONTEÚDO
  {
    nome: "Mochila de viagem",
    quantidade: 1,
    peso: 0,
    descricao: "Mochila resistente de couro escuro, utilizada para transportar os pertences durante as viagens. Peso pendente."
  },
  {
    nome: "Cantil para água",
    quantidade: 1,
    peso: 0,
    descricao: "Recipiente utilizado para armazenar água durante as viagens."
  },
  {
    nome: "Corda resistente",
    quantidade: 1,
    peso: 0,
    descricao: "Corda utilizada durante viagens e situações que exigem escalada ou amarração."
  },
  {
    nome: "Trocas de roupa",
    quantidade: 1,
    peso: 0,
    descricao: "Conjunto de roupas adicionais transportado dentro da mochila."
  },
  {
    nome: "Terno escuro",
    quantidade: 1,
    peso: 0,
    descricao: "Traje reservado para ocasiões formais, encontros com comerciantes e ambientes nobres."
  },
  {
    nome: "Camisa adicional",
    quantidade: 1,
    peso: 0,
    descricao: "Peça de roupa extra, guardada dobrada dentro da mochila."
  },
  {
    nome: "Calça adicional",
    quantidade: 1,
    peso: 0,
    descricao: "Peça de roupa extra, guardada dobrada dentro da mochila."
  },
  {
    nome: "Roupas íntimas e meias",
    quantidade: 1,
    peso: 0,
    descricao: "Peças adicionais de uso pessoal, guardadas dentro da mochila."
  },
  {
    nome: "Conjunto de higiene pessoal",
    quantidade: 1,
    peso: 0,
    descricao: "Pequeno conjunto com itens básicos de higiene pessoal."
  },
  {
    nome: "Pano de manutenção",
    quantidade: 1,
    peso: 0,
    descricao: "Pano de tecido utilizado para limpeza e manutenção dos equipamentos."
  },

  // OBJETOS PESSOAIS
  {
    nome: "Carta misteriosa",
    quantidade: 1,
    peso: 0,
    descricao: "Carta antiga que Vaerik carrega desde seu despertar na caverna. Estava junto dele quando foi encontrado por Thalen. Sua origem e conteúdo são desconhecidos. Continua fechada e permanece sob sua proteção, preferencialmente junto ao corpo."
  },

  // EQUIPAMENTOS DE USO PESSOAL
  {
    nome: "Pano de limpeza das adagas",
    quantidade: 1,
    peso: 0,
    descricao: "Pequeno pano utilizado para limpar e conservar as adagas."
  },
  {
    nome: "Estojo para objetos de valor",
    quantidade: 1,
    peso: 0,
    descricao: "Pequeno estojo utilizado para guardar objetos pessoais de valor."
  },
  {
    nome: "Bolsa de dinheiro",
    quantidade: 1,
    peso: 0,
    descricao: "Bolsa destinada a guardar moedas. Quantidade de moedas e peso ainda não definidos pelo Mestre."
  }
],

  diario:""
};
