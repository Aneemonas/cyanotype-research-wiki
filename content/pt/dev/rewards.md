# Recompensas

As recompensas de um nó são entregues na ordem da lista, depois que os requisitos foram pagos. Se uma falhar, o erro vai para o log e a próxima roda normalmente, então um comando com erro de digitação não faz o jogador perder o item que vem depois. Item que não cabe no inventário cai aos pés do jogador e nunca some.

```snbt
rewards: [
  { type: "item", args: ["minecraft:diamond", "2"] },
  { type: "xp_levels", args: ["3"] },
  { type: "toast", args: ["Forge ready", "Iron tools are yours.", "minecraft:iron_pickaxe"] },
  { type: "choice", options: [
      { type: "item", args: ["minecraft:golden_apple", "1"] },
      { type: "xp_levels", args: ["5"] }
  ] }
]
```

::video dev-rewards "Uma recompensa choice: o jogador escolhe uma opção"

Esta é a lista de tipos e argumentos. A seção seguinte explica o que cada um faz de fato, e é lá que ficam os casos de borda.

| `type` | args |
| --- | --- |
| `item` | item, quantidade |
| `xp_levels`, `xp_points` | quantidade |
| `message` | texto (cores com `&`, `%player%`) |
| `command` | comando; roda com nível 4 no jogador, em silêncio; `%player%` `%uuid%` `%tree%` `%node%` |
| `advancement` | id (todos os critérios restantes) |
| `toast` | título, texto, ícone |
| `title` | título, subtítulo |
| `sound` | id do som |
| `effect` | id, segundos, amplificador |
| `loot_table` | id (contexto de presente no jogador) |
| `stage` | nome |
| `recipe` | id da receita (livro de receitas) |
| `table` | id da tabela de recompensas |
| `function` | id, `world` (só o primeiro jogador no mundo) ou vazio |
| `choice` | `options: [ recompensas ]`; o jogador escolhe uma |
| `wheel` | `options: [ recompensas ]` com `weight`; uma é dada ao acaso |
| `currency` | id da moeda, quantidade (negativa tira) |
| `open_barrier` | id da barreira, `open` ou `close` |
| `summon` | id da entidade, quantidade, SNBT (opcional) |
| `attribute` | id do atributo, quantidade, `add` `mult_base` `mult_total` |

## Detalhes por tipo

| `type` | O que o código faz |
| --- | --- |
| `item` | a quantidade mínima é 1. Item desconhecido não entrega nada. O que não couber no inventário **cai aos pés do jogador**, nunca é apagado. Com `reward_to_buffer` no nó, os itens vão antes para o buffer de saída da máquina |
| `xp_levels`, `xp_points` | valores negativos viram 0: esta recompensa não tira XP |
| `message` | mensagem de sistema no chat do jogador. Aceita cores com `&` e substitui `%player%`. Pode ser traduzida |
| `command` | a `/` inicial é opcional. Roda como o jogador, com permissão nível 4 e sem saída. Substitui `%player%`, `%uuid%`, `%tree%` e `%node%`. Qualquer retorno do comando vai para o log do servidor |
| `advancement` | concede **todos os critérios que faltam**. Id desconhecido não faz nada |
| `toast` | o terceiro argumento é o item do ícone. Título e texto podem ser traduzidos |
| `title` | título grande na tela, com 10 ticks de entrada, 70 de permanência e 20 de saída. O subtítulo só é enviado se o segundo argumento não estiver vazio |
| `sound` | um id de evento de som (`minecraft:entity.player.levelup`), tocado na posição do jogador com volume 1 e tom 1, e quem está por perto também ouve |
| `effect` | segundos: padrão 30 (mínimo 1); amplificador 0 é o nível I |
| `loot_table` | sorteia a tabela com o jogador como contexto de *presente* e entrega os itens como o `item` faz |
| `stage` | concede o stage na hora (igual ao `grant_stages` do nó) |
| `recipe` | adiciona a receita ao livro de receitas. Não libera nada que um nó tenha restringido |
| `table` | sorteia uma tabela de recompensas global (veja abaixo). Funciona no nível de cima da lista e como opção de um `choice` ou `wheel` |
| `function` | roda uma função de pesquisa (veja [funções](dev/functions)). Com `world` no segundo argumento, só o primeiro jogador do mundo a dispara |
| `choice` | o jogador escolhe uma opção numa janela antes de o nó ser concluído. O `auto_complete` nunca conclui um nó com choice (alguém precisa escolher), o *Collect all* abre a escolha, e concluir o nó com `/cyanotype complete` ou com a ferramenta Auto Complete **não entrega nada** do choice, porque ninguém escolheu |
| `wheel` | sorteia uma opção pelo `weight` relativo. Se todos os pesos forem 0, o sorteio é uniforme |
| `currency` | soma ao saldo do jogador; quantidade negativa subtrai |
| `open_barrier` | abre (ou fecha) todo Barrier Gate com aquele id para este jogador, e isso fica salvo no progresso dele |
| `summon` | invoca de 1 a 20 mobs a 1,5 a 4 blocos do jogador. Com um id simples, o mob recebe o preparo normal de spawn por comando (armadura, variantes); com um SNBT no terceiro argumento, esse SNBT **substitui** o preparo, e aí você precisa informar tudo |
| `attribute` | veja abaixo |

:::warning
`choice` e `wheel` só funcionam no nível de cima da lista de recompensas do nó e não podem conter um ao outro. Uma `table` pode ficar no nível de cima ou ser opção de um `choice` ou `wheel`, mas nunca dentro de outra table. O carregador descarta qualquer combinação não permitida. Um nó com choice, wheel e table ao mesmo tempo funciona, desde que nenhum esteja dentro de outro.
:::

## Comandos

Os comandos rodam num executor silencioso, com permissão de operador, sem feedback e sem mostrar erro no chat do jogador. Se um comando falhar, o erro vai para o log do servidor com a árvore e o nó de origem. É lá que você deve olhar quando uma recompensa de comando parece não fazer nada.

```snbt
{ type: "command", args: ["give %player% minecraft:diamond 1"] }
{ type: "command", args: ["kubejs stages add %player% iron_age"] }
```

## Tabelas de recompensa

Uma tabela de recompensas é uma lista nomeada de recompensas, guardada em `config/cyanotype/reward_tables.snbt` e editada pelo botão de tabelas do editor. O nó a usa por uma recompensa `table` com o nome dela, então o mesmo loot pode ser compartilhado por vários nós e ajustado em um lugar só.

| Modo | Comportamento |
| --- | --- |
| `all` | dá todas as entradas |
| `each` | sorteia cada entrada separadamente, usando o `weight` como porcentagem |
| `one` | sorteia uma única entrada, usando os pesos como partes relativas |

Ou seja, o `weight` de uma entrada vale como porcentagem no `each` e como proporção no `one`, e o `all` o ignora. Tabelas não se aninham: uma entrada de tabela não pode ser outra table, nem um choice ou um wheel.

## Recompensas de atributo

A recompensa `attribute` é um **modificador permanente**: vale enquanto o nó estiver concluído e existir na dificuldade atual. Ela é reaplicada uma vez por segundo, e não na hora da conclusão, então pode haver um pequeno atraso. É a recompensa certa para skills de RPG. `add` soma um valor fixo; `mult_base` e `mult_total` multiplicam, e `0.1` com `mult_base` dá 10% a mais.

```snbt
{ type: "attribute", args: ["minecraft:generic.max_health", "4", "add"] }
{ type: "attribute", args: ["minecraft:generic.movement_speed", "0.1", "mult_base"] }
```

## Primeiro no mundo

Tanto o `ResearchCompletedEvent.isFirstInWorld()` quanto uma recompensa `function` com `world` avisam a um script quem foi o primeiro a concluir um nó. Veja [funções](dev/functions) e a [API](dev/api).

## Traduções

Os textos das recompensas `message`, `title` e `toast` podem ser traduzidos e ficam junto com os demais textos do nó (veja [traduções](dev/translations)).
