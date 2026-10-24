# A Research Station

A Research Station é um bloco que você crafta uma vez e coloca onde quiser. Clicar com o botão direito abre a tela de pesquisa. O bloco é um modelo animado feito com GeckoLib e zumbe enquanto algum jogador está por perto.

::video player-machine "O bloco Research Station: colocando e abrindo a tela"

## O que ela faz

A máquina mostra a árvore e também guarda os recursos dela. A tela desenha a árvore como um blueprint em tela cheia, que você pode mover e ampliar. Por trás, a máquina guarda o que os nós pedem para ser entregue: item, fluido, energia ou uma Source extra, como mana. Ela dá acesso ao [Codex](player/codex), a visão geral de todas as árvores que você pode ver, e mantém um buffer de saída para as recompensas de nós configurados para mandá-las para lá.

Funis, tubos e cabos empurram itens, fluidos e energia para dentro da máquina, mas a automação não puxa nada de volta, exceto do buffer de saída. No item handler, os slots de 0 a 8 são de entrada e só aceitam inserção, e os slots de 9 a 17 são o buffer de saída e só permitem extração. Para saber como a entrega funciona, veja [alimentando a máquina](player/feeding).

:::note
O visual do bloco vem de uma **skin**. O autor do pack escolhe uma de cinco (default, geral, create, aco e dungeon) nas configurações do mundo. A skin só muda a aparência do bloco, nunca o que ele faz.
:::

## A tela

A árvore ocupa a tela inteira. No modo Legacy, o blueprint vai no slot central, e tirar o blueprint dobra a árvore de volta. Um painel lateral à direita mostra os detalhes do nó selecionado: requisitos, recompensas e o botão de pesquisa.

Ao lado da insígnia do lab level ficam os medidores de recursos da máquina, que só aparecem quando o pack os usa. A barra de inventário e as moedas da árvore ficam embaixo, e `Tab` mostra ou esconde o inventário. Uma fileira de botões abre o Codex, a busca, a janela de time, as preferências e a ajuda dentro do jogo. Operadores com o modo dev ligado também veem as ferramentas do editor, descritas em [o editor](dev/editor).

## Máquina portátil

O pack pode ativar a **máquina portátil**, que abre a mesma tela sem precisar de um bloco colocado. Você define a tecla em Controles, na categoria Cyanotype, porque não há tecla padrão. Como energia e fluidos só podem ser entregues a um bloco de verdade, a máquina portátil não tem requisitos de entrega nem custo operacional, e os nós que dependem disso não podem ser concluídos por ela.
