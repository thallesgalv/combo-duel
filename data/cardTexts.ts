// Textos da skin por id da carta (base/csv/originalCards.csv). Editado à mão.
// Usado por `npm run cardlist` para gerar data/cardList.ts.
// Marcações: **negrito**, *(nota)* e [red] [orange] [blue] [purple] [green] [yellow] (escudo → selo do tipo).
export type CardText = {
  ability: string;
  score: string;
  // Carta com bolsa (guarda ouro)
  purse?: boolean;
};

export const cardTexts: Record<number, CardText> = {
  1: {
    // Lookout (Vigia)
    ability: "1 **chave** por [red]",
    score: "4 pontos por tipo diferente na mesma coluna",
  },
  2: {
    // Knight (Cavaleiro)
    ability: "1 **ouro** por carta de **Castelo**",
    score: "3 pontos por [blue] na mesma linha ou coluna",
  },
  3: {
    // General (General)
    ability: "1 **chave** por tipo diferente",
    score: "6 pontos por trio de tipos iguais",
  },
  4: {
    // Chaplain (Capelão)
    ability: "**Desconto** de 1 em cartas de **Vilarejo**",
    score: "8 pontos se a coluna da direita estiver completa",
  },
  5: {
    // Officer (Oficial)
    ability: "1 **ouro** por [blue] e por [red]",
    score: "4 pontos por par [blue] + [red]",
  },
  6: {
    // Mercenary (Mercenário)
    ability: "1 **ouro** por tipo diferente",
    score: "7 pontos por trio [purple] + [red] + [yellow]",
  },
  7: {
    // Master-at-arms (Mestre de Armas)
    ability: "1 **ouro** por [red]",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 4)*",
    purse: true,
  },
  8: {
    // Blacksmith (Ferreiro)
    ability: "1 **ouro** por [blue] de um vizinho **OU** ganhe 2 **chaves**",
    score: "2 pontos por carta com dois tipos",
  },
  9: {
    // Squire (Escudeiro)
    ability: "**Desconto** de 1 em todas as cartas",
    score: "2 pontos por [orange] na mesma linha ou coluna",
  },
  10: {
    // Bombardier (Bombardeiro)
    ability: "1 **ouro** por [orange] de um vizinho **OU** ganhe 2 **chaves**",
    score: "3 pontos por [red] na mesma coluna",
  },
  11: {
    // Militiaman (Miliciano)
    ability: "1 **ouro** por [yellow] de um vizinho **OU** ganhe 2 **chaves**",
    score: "3 pontos por [red] na mesma linha",
  },
  12: {
    // Barbarian (Bárbaro)
    ability: "1 **ouro** por [green] de um vizinho **OU** ganhe 2 **chaves**",
    score: "10 pontos se não houver [green]",
  },
  13: {
    // Executioner (Carrasco)
    ability: "Descarte uma carta de **Castelo** do seu reino e ganhe o custo dela em **ouro**",
    score: "1 ponto por carta de **Castelo**",
  },
  14: {
    // Guildmaster (Mestre da Guilda)
    ability: "Descarte uma carta de **Vilarejo** e ganhe o custo dela em **ouro**",
    score: "5 pontos se estiver na linha de baixo",
  },
  15: {
    // Glassblower (Vidreiro)
    ability: "1 **ouro** por [purple] e por [orange]",
    score: "4 pontos por par [purple] + [orange]",
  },
  16: {
    // Pawnbroker (Penhorista)
    ability: "1 **ouro** por carta de custo 4",
    score: "3 pontos por carta de custo 4",
  },
  17: {
    // Banker (Banqueiro)
    ability: "2 **ouro** em cada **bolsa** **OU** ganhe 3 **chaves**",
    score: "1 ponto por **ouro** guardado nas bolsas",
  },
  18: {
    // Potter (Oleiro)
    ability: "2 **ouro** em cada **bolsa**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 4)*",
    purse: true,
  },
  19: {
    // Carpenter (Carpinteiro)
    ability: "1 **ouro** por tipo ausente",
    score: "8 pontos se tiver ao menos 1 carta virada para baixo",
  },
  20: {
    // Locksmith (Chaveiro)
    ability: "1 **chave** por [orange]",
    score: "1 ponto por **chave**",
  },
  21: {
    // Stonemason (Pedreiro)
    ability: "**Desconto** de 1 em cartas de **Vilarejo**",
    score: "3 pontos por [orange] na mesma coluna",
  },
  22: {
    // Armorer (Armeiro)
    ability: "**Desconto** de 1 em todas as cartas",
    score: "3 pontos por [red] na mesma linha ou coluna",
  },
  23: {
    // Spice Merchant (Mercador de Especiarias)
    ability: "2 **ouro** por [orange]",
    score: "5 pontos se estiver na linha do meio",
  },
  24: {
    // Clockmaker (Relojoeiro)
    ability: "1 **ouro** por [orange]",
    score: "3 pontos por [orange] na mesma linha",
  },
  25: {
    // Innkeeper (Estalajadeiro)
    ability: "Ganhe 2 **ouro** em cada **bolsa** **E** os oponentes ganham 2 **ouro**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 6)*",
    purse: true,
  },
  26: {
    // Chatelaine (Castelã)
    ability: "**Desconto** de 1 em cartas de **Castelo**",
    score: "2 pontos por tipo diferente na mesma linha",
  },
  27: {
    // Duchess (Duquesa)
    ability: "Ganhe 2 **chaves**",
    score: "8 pontos se estiver na linha de cima",
  },
  28: {
    // His Majesty (Sua Majestade)
    ability: "Os oponentes ganham 1 **ouro**",
    score: "4 pontos por [blue] na mesma coluna",
  },
  29: {
    // Queen Mother (Rainha-Mãe)
    ability: "2 **ouro** em cada **bolsa**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 5)*",
    purse: true,
  },
  30: {
    // Jester (Bobo da Corte)
    ability: "2 **ouro** por [blue]",
    score: "2 pontos por [blue] na mesma linha ou coluna",
  },
  31: {
    // Chancellor (Chanceler)
    ability: "1 **chave** por [green]",
    score: "2 pontos por ícone de **Castelo**",
  },
  32: {
    // Princess (Princesa)
    ability: "**Desconto** de 1 em cartas de **Castelo**",
    score: "3 pontos por [blue] na mesma linha",
  },
  33: {
    // Prince (Príncipe)
    ability: "1 **ouro** por [blue]",
    score: "4 pontos por [blue] na mesma linha",
  },
  34: {
    // Her Majesty the Queen (Sua Majestade, a Rainha)
    ability: "1 **chave** por [blue]",
    score: "10 pontos por trio [blue] + [green] + [orange]",
  },
  35: {
    // Baron (Barão)
    ability: "**Desconto** de 1 em todas as cartas",
    score: "10 pontos se não houver [yellow]",
  },
  36: {
    // Steward (Mordomo)
    ability: "Encha duas bolsas com **ouro**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 3)*",
    purse: true,
  },
  37: {
    // Royal Guard (Guarda Real)
    ability: "Todos os jogadores ganham 1 **chave**",
    score: "3 pontos por [blue] na mesma coluna",
  },
  38: {
    // Stable Boy (Cavalariço)
    ability: "1 **chave** por [blue]",
    score: "3 pontos por [yellow] na mesma coluna",
  },
  39: {
    // Nun (Freira)
    ability: "1 **ouro** por carta de **Castelo**",
    score: "3 pontos por [purple] na mesma coluna",
  },
  40: {
    // Devout (Devota)
    ability: "1 **ouro** por espaço vazio",
    score: "10 pontos se não houver [orange]",
  },
  41: {
    // His Holiness (Sua Santidade)
    ability: "Ganhe 3 **chaves** **OU** os oponentes ganham 1 **chave**",
    score: "6 pontos por tipo ausente",
  },
  42: {
    // Cardinal (Cardeal)
    ability: "1 **chave** por carta de **Castelo**",
    score: "3 pontos por [purple] na mesma linha",
  },
  43: {
    // Templar (Templário)
    ability: "1 **ouro** por [purple] de um vizinho **OU** 1 **chave** por [red]",
    score: "1 ponto por **chave**",
  },
  44: {
    // Pilgrim (Peregrino)
    ability: "**Desconto** de 1 em cartas de **Vilarejo**",
    score: "4 pontos por escudo marrom (?) na mesma linha",
  },
  45: {
    // Chaplain (Capelão)
    ability: "1 **ouro** por carta com um tipo",
    score: "2 pontos por carta de **Vilarejo**",
  },
  46: {
    // Gravedigger (Coveiro)
    ability: "Descarte uma carta de **Vilarejo** e ganhe o custo dela em **ouro**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 8)*",
    purse: true,
  },
  47: {
    // Scribe (Escriba)
    ability: "1 **ouro** por [purple]",
    score: "3 pontos por [green] na mesma linha ou coluna",
  },
  48: {
    // Mother Superior (Madre Superiora)
    ability: "Ganhe 4 **chaves**",
    score: "5 pontos se estiver na linha de cima",
  },
  49: {
    // Monk (Monge)
    ability: "1 **chave** por [purple]",
    score: "2 pontos por [yellow] na mesma linha",
  },
  50: {
    // Sculptor (Escultor)
    ability: "1 **chave** por [purple]",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 7)*",
    purse: true,
  },
  51: {
    // Miraculously cured! (Milagrosamente Curado!)
    ability: "1 **chave** por **bolsa**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 4)*",
    purse: true,
  },
  52: {
    // Vicar (Vigário)
    ability: "1 **ouro** por carta de **Vilarejo**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 5)*",
    purse: true,
  },
  53: {
    // Astronomer (Astrônomo)
    ability: "**Desconto** de 1 em cartas de **Castelo**",
    score: "8 pontos se estiver na coluna da esquerda",
  },
  54: {
    // Alchemist (Alquimista)
    ability: "**Desconto** de 1 em todas as cartas",
    score: "4 pontos por carta de desconto",
  },
  55: {
    // Professor (Professor)
    ability: "1 **ouro** por tipo diferente",
    score: "3 pontos por [green] na mesma linha",
  },
  56: {
    // Apothecary (Boticário)
    ability: "**Desconto** de 1 em cartas de **Castelo**",
    score: "3 pontos por [green] na mesma coluna",
  },
  57: {
    // Goldsmith (Ourives)
    ability: "1 **chave** por carta com dois tipos",
    score: "6 pontos se estiver na coluna da esquerda",
  },
  58: {
    // Architect (Arquiteto)
    ability: "**Desconto** de 1 em cartas de **Vilarejo**",
    score: "2 pontos por tipo diferente",
  },
  59: {
    // Patron (Mecenas)
    ability: "Os oponentes ganham 2 **ouro**",
    score: "5 pontos por **bolsa** em carta de custo 5 ou mais",
  },
  60: {
    // Judge (Juiz)
    ability: "Ganhe 2 **chaves**",
    score: "3 pontos por par de carta de **Castelo** e carta de **Vilarejo**",
  },
  61: {
    // Winemaker (Vinicultor)
    ability: "1 **ouro** por carta de **Vilarejo**",
    score: "2 pontos por tipo diferente na mesma coluna",
  },
  62: {
    // Spy (Espião)
    ability: "1 **ouro** por [green] **E** 1 **chave** por [red] de um vizinho",
    score: "6 pontos se estiver na coluna do meio",
  },
  63: {
    // Inventor (Inventor)
    ability: "1 **ouro** por [green]",
    score: "1 ponto por carta de **Vilarejo**",
  },
  64: {
    // Doctor (Médico)
    ability: "1 **ouro** por [green] e 1 **ouro** por [yellow]",
    score: "4 pontos por par [green] + [yellow]",
  },
  65: {
    // Philosopher (Filósofo)
    ability: "**Desconto** de 1 em cartas de **Castelo**",
    score: "10 pontos se não houver [red]",
  },
  66: {
    // Brigand (Bandoleiro)
    ability: "1 **chave** por carta de **Castelo** de um vizinho",
    score: "7 pontos por trio de ícones de **Vilarejo**",
  },
  67: {
    // Beggar (Mendigo)
    ability: "1 **ouro** por espaço ocupado",
    score: "2 pontos por [purple] na mesma linha ou coluna",
  },
  68: {
    // Shepherd (Pastor)
    ability: "1 **ouro** por espaço vazio",
    score: "3 pontos por [yellow] na mesma linha",
  },
  69: {
    // Farmer (Fazendeiro)
    ability: "1 **chave** por [yellow]",
    score: "7 pontos se estiver na linha de baixo",
  },
  70: {
    // Woodcutter (Lenhador)
    ability: "1 **ouro** por espaço ocupado",
    score: "5 pontos se estiver na coluna da direita",
  },
  71: {
    // Witch (Bruxa)
    ability: "1 **ouro** por [yellow] **OU** 1 **chave** por [purple] de um vizinho",
    score: "9 pontos se não houver [purple]",
  },
  72: {
    // Farmhand (Peão)
    ability: "**Desconto** de 1 em cartas de **Vilarejo**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 5)*",
    purse: true,
  },
  73: {
    // Traveler (Viajante)
    ability: "3 **ouro** por carta de custo 0",
    score: "2 pontos por carta de custo 0",
  },
  74: {
    // Usurper (Usurpador)
    ability: "1 **chave** por carta com um tipo",
    score: "2 pontos por carta de **Castelo**",
  },
  75: {
    // Fisherman (Pescador)
    ability: "**Desconto** de 1 em cartas de **Castelo**",
    score: "4 pontos se estiver em um canto",
  },
  76: {
    // Revolutionary (Revolucionário)
    ability: "1 **chave** por carta de **Vilarejo**",
    score: "9 pontos se não houver [blue]",
  },
  77: {
    // Baker (Padeiro)
    ability: "1 **ouro** por [yellow] e 1 **chave** por ícone de **Vilarejo**",
    score: "3 pontos se estiver no meio de uma borda",
  },
  78: {
    // Beekeeper (Apicultor)
    ability: "Ganhe 2 **ouro** em cada **bolsa**",
    score: "2 pontos por **ouro** nesta **bolsa** *(máx. 9)*",
    purse: true,
  },
};
