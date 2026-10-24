# Funções (.cyan)

Uma **função** é um script pequeno que a recompensa `function` executa. Ela fica em `config/cyanotype/functions/<id>.cyan`, com uma diretiva por linha e `#` para comentários. Serve para quando uma lista simples de recompensas fica incômoda, por exemplo uma mensagem para o servidor todo seguida de itens, um efeito e um stage, tudo reunido numa unidade com nome que vários nós podem compartilhar.

```cyan config/cyanotype/functions/forge.cyan
# Uma diretiva por linha. %player% %tree% %node% são substituídos.
# 'once' = só o primeiro jogador no mundo roda este arquivo (efeitos globais).
once
broadcast &6%player% &7finished &e%node%&7 first!
msg &aThe forge hums to life...
give minecraft:iron_ingot 8
xp 3L
effect minecraft:speed 60 1
sound minecraft:entity.player.levelup
stage forge_unlocked
cmd say hello from %player%
event my_script_hook
```

Cada diretiva faz uma coisa só, e `%player%`, `%tree%` e `%node%` são substituídos no texto.

| Diretiva | Efeito |
| --- | --- |
| `once` | só o primeiro jogador no mundo continua |
| `msg <texto>` | mensagem no chat, só para o jogador |
| `actionbar <texto>` | mensagem na action bar |
| `broadcast <texto>` | mensagem para todos |
| `give <item> <quantidade>` | entrega itens |
| `xp 3L` ou `xp 30P` | níveis ou pontos |
| `effect <id> <segundos> <amplificador>` | efeito de poção |
| `sound <id>` | toca um som |
| `stage <nome>` | concede um stage |
| `cmd <comando>` | roda um comando |
| `event <nome>` | dispara `ResearchFunctionEvent` com esse nome |

A `once` é diferente das outras: ela não faz nada sozinha, só limita o resto do arquivo ao primeiro jogador do mundo. É assim que você anuncia ou premia quem chegou primeiro.

## Use em um nó

Adicione uma recompensa `function` com o id do arquivo sem o `.cyan`: `forge` para `forge.cyan`. O segundo argumento, `world`, limita ao primeiro jogador do mundo, o mesmo efeito de começar o arquivo com `once`.

```snbt
{ type: "function", args: ["forge", "world"] }
```

## Eventos e scripts

Toda função também dispara um `ResearchFunctionEvent` **antes** de o arquivo rodar, com o id da função, o jogador, a árvore e o nó. Por isso um script pode fazer todo o trabalho sozinho, sem que o arquivo `.cyan` precise existir, e a recompensa function vira um gancho prático para KubeJS ou código Java. Veja [API e KubeJS](dev/api).

## Teste

```cyan
/cyanotype function @s forge
```

roda uma função na hora para um jogador, assim você testa sem concluir um nó. Os ids de função aceitam `[a-zA-Z0-9_\-/.]{1,64}`, nunca `..`. O id vale exatamente como foi escrito e não é traduzido.
