# O que é o Cyanotype Research

O Cyanotype Research é um mod para quem monta modpacks. Ele adiciona uma única máquina, a **Research Station**, e um sistema de pesquisa que gira em torno dela. A máquina chega vazia: não existem techs, quests ou skills prontas. Cada árvore, nó, requisito, recompensa e restrição é criado por você, no editor dentro do jogo ou em arquivos de texto distribuídos junto com o pack. O mod fornece a tela, as regras e a infraestrutura.

::video tour-overview "A Research Station: o blueprint entra e a árvore se abre"

## Como funciona

Uma **árvore** é um mapa de **nós**. Cada nó tem posição, ícone, pais que precisam estar concluídos antes, **requisitos** a pagar ou cumprir e **recompensas**. O jogador coloca na Research Station um blueprint, ou o item que você escolheu para aquela árvore, e ela se desdobra numa visão de tela cheia. No modo Quest Book não há item: o jogador escolhe a árvore no Codex.

Os requisitos se dividem em duas famílias. Uns são pagos, como itens e níveis de XP, ou entregues à máquina por funil, tubo ou cabo, quando o nó pede itens, fluidos ou energia. Os outros são coisas que o jogador faz no mundo enquanto o nó está aberto: matar mobs, entrar num bioma, olhar para um bloco, colocar blocos ou só esperar um timer.

Um nó concluído paga as recompensas e pode liberar coisas em qualquer parte do pack. Receitas, uso de itens, blocos, telas de container, fornalhas e até portas físicas (os Barrier Gates) podem ficar trancados até o jogador concluir o nó certo. É isso que faz da árvore uma progressão de verdade, e não uma simples lista de tarefas.

::card Guia do jogador | player/machine | A máquina, o Codex e cada tela. | icon_team
::card Sua primeira árvore | dev/quick-start | Uma árvore funcionando em dez minutos. | icon_edit
::card Exemplos de pack | examples/overview | Setups tech, de exploração e de RPG com arquivos reais. | icon_star

## Três estilos de pack

O mesmo sistema serve a desenhos bem diferentes, e os packs de exemplo desta wiki são um de cada.

| Estilo | Árvores | Nó de exemplo |
| --- | --- | --- |
| Progressão tech | uma árvore por tecnologia, com nós que trancam as receitas de um mod | "Steam Age" pede água e FE entregues à máquina e depois libera o crafting de `create:*` |
| Exploração | um mapa de lugares para visitar | "Deep Dark" conclui quando o jogador entra no bioma, mostra um aviso na tela e sorteia uma loot table |
| Skills de RPG | uma teia solta com classes e ramos | "Berserker" é uma de três especializações exclusivas e dá atributos |

Os [exemplos](examples/overview) incluem os arquivos completos das árvores dos três.

## O que vem na caixa

As árvores podem ser lineares ou se ramificar como você quiser. Um nó pode exigir todos os pais, qualquer um ou exatamente N, e um ramo pode excluir outro para a escolha ser permanente. Os nós podem ser secretos, aparecer só como silhuetas, ficar escondidos até outros serem concluídos ou ligar árvores diferentes. Uma árvore inteira também pode ser flexível, sem raiz central. Veja [progressão](dev/progression).

São mais de quarenta tipos de requisito, de "pagar 8 lingotes de ferro" a "ficar dentro de uma vila", e a lista cresce a cada versão. Veja [requisitos](dev/requirements). As recompensas incluem itens, XP, comandos, loot tables, atributos, summons, escolhas de uma entre N e roletas com peso, e estão em [recompensas](dev/rewards). As [restrições](dev/restrictions) são a outra metade da progressão: elas decidem o que o jogador não pode craftar, usar, abrir, quebrar, colocar, pegar, equipar ou até receber como loot até concluir um nó.

A própria máquina guarda recursos. Funis, tubos e cabos entregam itens, fluidos e FE a ela, e *Sources* extras, como mana do Botania ou gases do Mekanism, podem ser adicionadas, como explica [recursos da máquina](dev/resources). Os [times](player/teams) compartilham progresso, e uma camada de scripts com stages, eventos, API Java e suporte a KubeJS deixa outros mods e scripts reagirem à pesquisa. Veja a [API](dev/api).

:::note
O mod ainda está em desenvolvimento. A [página de limites](dev/limits) lista o que foi testado e o que não foi.
:::
