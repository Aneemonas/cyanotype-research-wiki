# Restrições e bloqueio de receitas

Um nó pode bloquear coisas em todo o pack até ser concluído. Cada nó tem uma lista de **padrões**, que dizem o que é bloqueado, e uma **máscara** para cada padrão, que diz de que formas.

```snbt
locks: ["minecraft:iron_pickaxe", "#minecraft:pickaxes", "create:*"],
lock_masks: [I; 1, 3, 32]
```

As duas listas andam em paralelo: `lock_masks[i]` pertence a `locks[i]`, e `lock_masks` **precisa ser um int array** (`[I; ...]`). No exemplo, a picareta de ferro é bloqueada só para craft, toda a tag de picaretas para craft e uso, e tudo do Create para colocar.

::video dev-restrictions "Bloqueando uma receita e depois pesquisando o nó que a libera"

## Padrões

Um padrão pode apontar para um item ou bloco de quatro formas.

| Padrão | Casa com |
| --- | --- |
| `modid:item` | exatamente aquele item ou bloco |
| `#modid:tag` | tudo naquela tag |
| `modid:*` | tudo de um mod: `irons_spellbooks:*` bloqueia o Iron's Spells 'n Spellbooks inteiro |
| `@nome` | uma **lista nomeada** (veja abaixo) ou, se nenhuma lista tiver esse nome, o mod inteiro com aquele id: `@irons_spellbooks` equivale a `irons_spellbooks:*` |

Um `modid` puro, sem dois-pontos, também vale como o mod inteiro. Já `modid:@irons_spellbooks`, com prefixo e `@` juntos, não casa com nada, e esse é o motivo mais comum de um bloqueio de mod parecer não funcionar.

Qualquer padrão aceita exceções depois de `!`. Por exemplo, `create:*!create:wrench!create:goggles` bloqueia o Create inteiro, menos a chave inglesa e os óculos. Uma **lista nomeada** é um conjunto de padrões que você mantém com `/cyanotype list` (veja [comandos](dev/commands)) e reaproveita em vários nós como `@nome`, então mudar a lista atualiza todos os nós que a usam.

O que o padrão compara depende da flag. As flags de bloco (INTERACT, GUI, BREAK, PLACE e RUN) casam com **blocos**, e uma `#tag` ali é uma tag de bloco. As flags de item casam com **itens**, e a `#tag` é uma tag de item. Um padrão que não casa com nada é ignorado sem aviso, então confira cada bloqueio novo com `/cyanotype recipes check` ou jogando.

No editor, o seletor de itens tem as abas **Items**, **Tags** e **Mods**. Digitar `@mod` na busca filtra os itens daquele mod, `#tag` lista os itens de uma tag, e escolher uma entrada da aba Mods adiciona o padrão `modid:*`.

::video dev-picker-search "Buscando no seletor de itens com @mod e #tag, e bloqueando um mod inteiro pela aba Mods"

## Flags

A máscara de um padrão é a **soma** das flags usadas: `3` é RECIPE + USE, e `33` é RECIPE + PLACE.

| Flag | Valor | O que fica bloqueado até o nó ser concluído |
| --- | --- | --- |
| RECIPE | 1 | craftar o item |
| USE | 2 | clique direito com o item (em bloco ou no ar) |
| INTERACT | 4 | clique direito naquele bloco |
| GUI | 8 | abrir o menu daquele bloco |
| BREAK | 16 | quebrar aquele bloco |
| PLACE | 32 | colocar aquele bloco |
| PICKUP | 64 | pegar o item (ele fica no chão) |
| DROP | 128 | jogar o item |
| RUN | 256 | fornalhas vanilla processando o item (casa com o bloco da fornalha) |
| LOOT | 512 | os drops desses itens, de blocos e de mobs, são removidos para o jogador |
| EQUIP | 1024 | o item não pode ficar num slot de armadura nem num slot extra de outro mod, e volta para o inventário (checado duas vezes por segundo; os slots extras são Curios no NeoForge e no Forge, Trinkets no Fabric e Accessories no NeoForge e no Fabric, todos por reflexão) |

As restrições valem para todo mundo, **operadores e jogadores no criativo inclusos**. É fácil esquecer que você mesmo bloqueou algo enquanto monta o pack.

## As três camadas do bloqueio de receita

O bloqueio de receitas age em três camadas, porque uma receita pode ser executada pelas mãos do jogador, por uma máquina ou por uma fornalha.

A **camada do mundo** vem primeiro. Quando as receitas carregam, o servidor registra cada receita e a saída dela. Se a saída casa com o bloqueio de um nó que **ninguém** concluiu, a receita é removida do gerenciador de receitas do servidor, e máquinas, funis, Create e outros mods nem ficam sabendo que ela existe. O primeiro jogador a concluir o nó devolve a receita **para todos**. A opção `recipe_lock_world_reload` faz o servidor recarregar os datapacks nesse momento, para os mods que guardam receitas em cache e não percebem a mudança sozinhos.

A **camada do jogador** é o que cada jogador enxerga. Cada um recebe uma lista de receitas sem as que ainda não pesquisou, que é o que aparece no livro de receitas, no JEI e no EMI, e os slots de resultado dos menus de crafting ficam vazios ou são ignorados para itens bloqueados. As receitas que o servidor tirou da lista do mundo também vão para o cliente, marcadas como ocultas, para o visualizador poder trazer a receita de volta assim que o jogador pesquisa o nó, sem relogar nem recarregar nada.

A terceira camada é a das **fornalhas**. A cada tick, a fornalha vanilla compara a saída da receita com o **dono** dela (o último jogador que a colocou ou abriu) e para se esse jogador não liberou a receita.

Tudo é orientado a eventos: o cálculo refaz quando as árvores ou o progresso mudam, nunca por timer.

:::warning
Num servidor multiplayer, a pesquisa de um jogador pode liberar uma receita automatizada para o mundo todo. Se mods que guardam receitas em cache, como o Create, não perceberem a mudança, ligue `recipe_lock_world_reload`. O reload pode ser lento num pack grande, e por isso vem desligado.
:::

## Como a saída da receita é encontrada

Para comparar uma receita com um bloqueio, o mod precisa saber o que ela produz, e as receitas de outros mods não seguem um formato único. Ele tenta `getResultItem` primeiro. Se não der resultado, converte a receita para JSON com o próprio codec e pega qualquer id de item sob uma chave que contenha `result`, `output` ou `product`. Em último caso, percorre o objeto da receita por reflexão, com profundidade limitada, sem nunca entrar nos ingredientes. Uma receita **sem saída em item** (que só produz fluido, entidade ou efeito) não pode ser bloqueada.

## O que é coberto

O bloqueio de receita cobre os **slots de resultado** da mesa de trabalho, da grade 2x2 do inventário, da bigorna, da mesa de ferraria, do cortador de pedra, do tear, da mesa de cartografia e de qualquer menu cujo slot de resultado seja um `ResultContainer` vanilla. Menus de mod com um tipo próprio de slot de resultado não entram no bloqueio por jogador, embora a camada do mundo continue escondendo as receitas deles das máquinas. Um bloqueio de *receita* não diz nada sobre outras origens do item: baús, loot, trocas, o menu criativo e outros jogadores ainda podem entregá-lo. Para fechar isso também, some PICKUP ou USE à máscara.

As **fornalhas** (fornalha, alto-forno e defumador) são controladas pelo dono. Uma fornalha que ninguém colocou nem abriu, ou que foi colocada por uma máquina, não tem dono e não é controlada. Uma fornalha de mod que não estende a block entity da fornalha vanilla só recebe a camada do mundo. RUN funciona apenas em fornalhas vanilla.

As flags baseadas em eventos (USE, INTERACT, GUI, BREAK, PLACE, PICKUP e DROP) valem contra jogadores, mas não contra blocos ou máquinas que contornam os eventos, como fake players, deployers e algumas quarries. USE é checado no clique direito com o item, não ao atacar nem na velocidade de mineração. GUI detecta blocos que abrem um menu no servidor, e DROP cobre jogar o item e largá-lo pelo inventário, mas não os drops da morte. Quando uma ação é recusada, a mensagem diz qual nó a bloqueia, e essas mensagens podem ser traduzidas.

## Ideias

Um bloqueio funciona melhor quando representa uma promessa sobre a ordem do jogo. Uma árvore **Stone Age** pode bloquear as ferramentas de metal de todos os mods com `#minecraft:pickaxes` e tags parecidas, em USE + RECIPE, e assim um pack com vinte mods ainda tem um começo claro. Um nó **Permit** pode liberar a colocação de blocos `create:*` só depois de o jogador dominar o básico, e outro pode manter todas as telas `ae2:*` fechadas até ele provar o que sabe. Baús podem ficar fechados com INTERACT + GUI até um nó, e a obsidiana do portal do Nether pode ser bloqueada com PLACE até um chefe morrer.

## Depuração

```cyan
/cyanotype recipes check minecraft:iron_pickaxe
```

imprime um diagnóstico dos bloqueios de receita daquele item. Use quando uma receita estiver escondida ou visível sem deveria, e inclua a saída do comando ao relatar um problema.
