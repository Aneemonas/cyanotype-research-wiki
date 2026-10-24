# Comandos

Todo comando `/cyanotype` exige permissão nível 2 (operador), exceto os comandos de time usados pelos botões do chat.

| Comando | Efeito |
| --- | --- |
| `/cyanotype dev [true\|false]` | modo editor, só para você |
| `/cyanotype reload` | recarrega árvores, arquivos de idioma e tabelas de recompensa, ressincroniza todos |
| `/cyanotype tree list` | lista os ids das árvores |
| `/cyanotype complete <players> <tree> <node>` | conclui sem cobrar (as recompensas são entregues) |
| `/cyanotype reset <players> [tree]` | apaga o progresso |
| `/cyanotype stage add\|remove <players> <stage>` | adiciona ou remove um stage |
| `/cyanotype stage list <player>` | lista os stages de um jogador |
| `/cyanotype function <players> <id>` | executa uma função de recompensa |
| `/cyanotype scoreboard <true\|false>` | liga ou desliga os objetivos de scoreboard |
| `/cyanotype list` | listas nomeadas: `show <id>`, `add <id> <pattern>`, `remove <id> <pattern>`, `delete <id>` |
| `/cyanotype currency get\|add\|remove\|set ...` | moedas virtuais (`get <player> <id>`, os outros recebem `<players> <id> <amount>`) |
| `/cyanotype source <pos> <id> <amount>` | envia um Source para a máquina numa posição |
| `/cyanotype barrier set <pos> <id> [allow_mobs]` | define o id de um Barrier Gate |
| `/cyanotype barrier fill <from> <to> <id> [allow_mobs]` | define o id de todos os portões de uma área (máx. 200 000 blocos) |
| `/cyanotype barrier open\|close <players> <id>` | abre ou fecha um id de portão para os jogadores |
| `/cyanotype barrier list <player>` | lista os portões que um jogador pode atravessar |
| `/cyanotype recipes check <item>` | diagnostica o bloqueio de receita de um item |
| `/cyanotype profile start\|stop\|reset\|verify` | profiler de custo do servidor (veja [desempenho](dev/performance)) |
| `/cyanotype profile load <n> [spread\|burst]` | simula a carga de `n` jogadores |
| `/cyanotype profile stress <trees> <nodes> [chain]` e `stress clear` | cria e remove árvores de teste grandes |
| `/cyanoteam accept\|decline <id>`, `/cyanoteam leave` | convites de time (qualquer jogador) |

## Detalhes

`/cyanotype dev` sem valor alterna o modo dev. Vale só para você e é esquecido quando o mundo fecha.

`complete` marca um nó como concluído **sem cobrar** o custo, mas as recompensas são entregues. Uma recompensa `choice` não entrega nada assim, porque ninguém escolheu. `reset <players>` sem árvore apaga o progresso de **todas** as árvores daqueles jogadores, então informe a árvore quando não for isso que você quer.

`currency add`, `remove` e `set` aceitam uma quantidade inteira a partir de 0, e `get` aceita um único jogador. `source <pos> <id> <amount>` exige uma Research Station naquela posição e informa quantas unidades ela aceitou. Se nenhum nó pede aquele Source, ou se o buffer está cheio, ela aceita 0, e isso ajuda a descobrir por que uma entrega não está chegando.

`profile load <n>` aceita de 1 a 500, e 1 desliga a simulação. `profile stress` aceita de 1 a 200 árvores com 1 a 2000 nós cada e cria árvores chamadas `stress_*`, que o `stress clear` remove. `profile verify` compara as listas de nós em cache usadas na checagem com uma avaliação completa, e um resultado saudável termina em "OK". Se aparecer "BUG", mande essa linha para o autor do mod. Por fim, `function <players> <id>` executa uma função de pesquisa na hora, o que permite testar uma sem concluir nenhum nó.

## Listas nomeadas

Uma lista nomeada é um conjunto de padrões que você monta uma vez e reutiliza nas restrições como `@nome`. Mudou a lista, mudaram todos os nós que a usam.

```cyan
/cyanotype list add metal_tools #minecraft:pickaxes
/cyanotype list add metal_tools #minecraft:axes
/cyanotype list show metal_tools
```

Depois é só bloquear `@metal_tools` em um nó. As exceções com `!` vão no campo de padrão, não na lista. Se você der a uma lista o nome de um id de mod, `@esse_nome` passa a apontar para a lista e deixa de valer para o mod inteiro, então escolha nomes que não sejam ids de mods.

## Scoreboard

Os dois objetivos de scoreboard e como usá-los estão em [stages e scoreboard](dev/stages).
