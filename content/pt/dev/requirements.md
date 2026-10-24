# Requisitos

Um nó pode pedir três coisas ao mesmo tempo: **cost** (itens), **níveis de XP** e qualquer número de **tasks**. Tudo isso precisa estar satisfeito para o nó ser concluído. Os argumentos são sempre strings, até os números.

```snbt
cost: [{ item: "minecraft:iron_ingot", count: 8 }, { item: "#c:gems/diamond", count: 1 }],
xp_levels: 5,
tasks: [
  { type: "kill", args: ["minecraft:zombie", "25"] },
  { type: "biome", args: ["minecraft:desert"] }
]
```

Os itens do cost são consumidos quando o nó é concluído, e dá para usar uma `#tag` no lugar de um item. Os níveis de XP também são gastos, exceto no criativo. As tasks são outra coisa: são condições, não pagamentos. Elas são checadas uma vez por segundo (as mortes são contadas na hora em que acontecem), e o progresso de cada jogador fica guardado sob a chave `tree|node|index`. Tasks que dependem de uma ação do jogador, como matar, olhar para um bloco ou esperar um timer, só contam enquanto o nó está disponível.

::video dev-requirements "Adicionando uma task de kill e uma de bioma na aba Requirements"

## O básico

| `type` | args | Notas |
| --- | --- | --- |
| `have` | item, quantidade | possuído, não consumido |
| `kill` | id de entidade ou `#tag` ou `*`, quantidade | conta só enquanto o nó está disponível |
| `advancement` | id | vanilla ou de mod |
| `look` | id de bloco ou `#tag`, segundos | olhar para o bloco (alcance + 1.5) |
| `location` | x, y, z, raio, dimensão | raio padrão 8; dimensão opcional |
| `structure` | id ou `#tag` | estar dentro de uma peça da estrutura |
| `biome` | id ou `#tag` | |
| `dimension` | id | |
| `timer` | segundos | começa quando o nó fica disponível |
| `stage` | nome | um stage vindo de comando, outro nó ou script |
| `stat` | tipo de estatística, id, quantidade | por exemplo `custom`, `walk_one_cm`, `100000` (namespace `minecraft` por padrão) |
| `check` | rótulo | o jogador clica em um botão de check |
| `lab_level` | nível | ignorado quando o lab level está desligado |
| `placed` | bloco, `#tag`, `modid:*` ou `*`, quantidade | todos os blocos já colocados (estatísticas) |
| `placed_new` | igual | só blocos colocados depois que o nó ficou disponível |

## Entregues à máquina

Aqui o jogador não leva nada no inventário: um funil, tubo ou cabo entrega à máquina, e tudo é consumido quando o nó é concluído. Os buffers por trás disso estão em [recursos da máquina](dev/resources).

| `type` | args | Notas |
| --- | --- | --- |
| `feed_item` | item, quantidade | itens entregues |
| `fluid` | id do fluido, mB | fluido entregue |
| `energy` | FE | energia entregue |
| `source` | id do source, quantidade | um recurso extra (mana, um gás, EU...) |
| `near_item` | item, quantidade, raio (4) | jogado perto da máquina; varrido uma vez por segundo enquanto o nó está ativo |
| `near_entity` | entidade, quantidade, raio (4) | animais ou mobs trazidos perto da máquina |
| `container` | item, quantidade, raio, `consume` ou `keep` | itens dentro de containers perto da máquina (baús, barris, molduras com um item container, bundles) |

## Tasks de evento e de estado (0.18+)

Chegaram na 0.18. As tasks de evento contam quando o evento acontece com o nó aberto. As marcadas como polled (attribute, tag, effect, hold, find e check quest) são lidas uma vez por segundo enquanto o nó está disponível, ou seja, descrevem um estado em que o jogador precisa estar naquele momento.

| `type` | args | Notas |
| --- | --- | --- |
| `interact_entity` | entidade ou `#tag`, quantidade, mão (`any` `main` `off`), item na mão (opcional) | clicar com o botão direito numa entidade |
| `attribute` | id do atributo, no mínimo | polled, por exemplo `minecraft:generic.max_health`, `30` |
| `adv_kill` | entidade, quantidade, arma, bioma, dimensão, estrutura (as quatro últimas opcionais) | matar com condições |
| `adv_item` | item, quantidade, filtro de components (SNBT, opcional), `consume` ou `keep` | item com condições de component |
| `damage` | entidade ou `*`, quantidade de dano, tipo de dano (opcional), `total` ou `single` | causar dano |
| `receive_damage` | tipo de dano (vazio = qualquer), quantidade, `total` ou `single` | sofrer dano |
| `tame` | entidade, quantidade | domar mobs |
| `use_item` | item, quantidade | usar um item (comer, jogar uma pérola...) |
| `hold_item` | item, mão, segundos | polled |
| `find_entity` | entidade, quantidade, raio | polled: entidades vivas do tipo dentro do raio do jogador |
| `check_quest` | `node` `tree` `discover_tree` `discover_node`, `tree` ou `tree/node` | outro nó ou árvore foi concluído, ou uma árvore foi aberta ou um nó ficou disponível |
| `player_tag` | tag | tag de entidade vanilla ou de scoreboard (`/tag @s add x`), não um stage |
| `break_block` | bloco, quantidade, ferramenta (opcional) | quebrar blocos |
| `potion_effect` | efeito, amplificador mínimo, segundos restantes mínimos | polled |
| `trading` | profissão (vazio = qualquer), quantidade | negociar com aldeões |
| `use_block` | bloco, quantidade, item na mão (opcional) | clicar com o botão direito num bloco |
| `fishing` | item ou `*`, quantidade | itens pescados |
| `villager_trade` | item de saída, quantidade, contar trocas e não itens (`true` / `false`) | trocas com aldeões; como as trocas são aleatórias, use o seletor de item |
| `socket` | item, quantidade, `auto` ou `manual` | veja [nós avançados](dev/advanced-nodes) |
| `currency` | id da moeda, quantidade, `spend` ou `keep` | moeda virtual, veja [recursos](dev/resources) |

## Exemplos

As duas primeiras linhas combinam kill com bioma e entrega de item com energia. As três últimas mostram as listas de argumentos mais longas, de `stat`, `adv_kill` e `check_quest`.

```snbt
tasks: [ { type: "kill", args: ["minecraft:zombie", "25"] }, { type: "biome", args: ["minecraft:desert"] } ]
tasks: [ { type: "feed_item", args: ["minecraft:redstone", "64"] }, { type: "energy", args: ["10000"] } ]
tasks: [ { type: "stat", args: ["custom", "walk_one_cm", "100000"] } ]
tasks: [ { type: "adv_kill", args: ["minecraft:skeleton", "10", "minecraft:bow", "", "minecraft:the_nether", ""] } ]
tasks: [ { type: "check_quest", args: ["node", "industry/steam_engine"] } ]
```

## Como cada tipo é avaliado

Um **`type` desconhecido conta como cumprido**. É de propósito, para que um arquivo feito para uma versão mais nova não prenda ninguém fora de um nó, mas tem um lado ruim: um erro de digitação como `kil` libera o nó em silêncio. Escolha os tipos pela lista do editor ou teste numa cópia da árvore para conferir que o nó realmente espera.

`have` conta o que está no inventário do jogador e não tira nada; quem tira é o `cost`. O `timer` começa na primeira vez que o nó fica disponível para o jogador e corre no **tempo de jogo do mundo**, então continua contando com o jogador offline, desde que o servidor esteja ligado. Os tipos entregues (`feed_item`, `fluid`, `energy` e `source`) leem a máquina que o jogador está usando, então ele precisa estar com a tela dessa máquina aberta ao concluir, e a quantidade sai naquele momento. `currency` com `spend` (o padrão) retira a quantidade ao concluir, e `keep` só confere. `container` e `adv_item` têm a mesma escolha entre `consume` e `keep`, e `consume` retira os itens ao concluir.

`stage` compara o nome exato (espaços nas pontas são ignorados) e enxerga stages vindos de comandos, `grant_stages`, recompensas e KubeJS. Contadores como `kill`, `look`, `stat`, `near_item` e `placed` guardam o progresso por jogador e por nó, e depois de atingir a meta continuam atingidos. A task mostra `x / y` quando é um contador e um check quando é sim ou não. Um nó com várias tasks exige todas.

## Custo operacional

Além das tasks do nó, o pack pode cobrar um **custo operacional** em energia, fluidos ou Sources em toda pesquisa. Ele é configurado na janela de Preferências e explicado em [configurações](dev/settings).

## Limites

A morte só conta quando o jogador (ou um projétil dele) é o assassino, então pets e dano indireto não valem. Como as tasks rodam uma vez por segundo, passar muito rápido por um local ou estrutura pode não ser registrado. `placed` lê a estatística de item usado, que o jogo aumenta em um a cada colocação. Um id errado numa task nunca causa crash: ela só nunca é concluída. Editar a lista de requisitos de um nó zera o progresso guardado dele para todos os jogadores, então tenha isso em mente ao mudar requisitos num servidor em uso.

As tabelas acima estão completas para esta versão. O editor de nós sempre mostra a lista atual, com uma dica para cada argumento; se os dois divergirem, vale o editor.
