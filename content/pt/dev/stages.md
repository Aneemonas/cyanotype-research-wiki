# Stages e scoreboard

## Stages

Um stage é uma marca com nome, guardada no progresso do jogador. Todo nó concluído concede um automaticamente, com o nome

```text
cyanotype_<tree>_<node>
```

em minúsculas, com tudo que não é `a-z0-9_` trocado por `_`. Além disso, o nó pode conceder stages extras pela lista `grant_stages` e por recompensas `stage`. Com o **KubeJS** instalado, o stage também é adicionado com `kubejs stages add`, então scripts e outros mods que usam os stages do KubeJS o enxergam sem precisar de nenhuma ponte. O requisito `stage` lê os stages internos.

Os stages são a ligação entre este mod e o resto do pack. Uma condição de loot table, o portão de uma dimensão, um command block ou o sistema de stages de outro mod podem depender de um nó ter sido concluído. Os dois comandos abaixo mexem direto nos stages.

```cyan
/cyanotype stage add @s forge_unlocked
/cyanotype stage list @s
```

Um nó também pode esperar por um stage. A task abaixo faz um nó de qualquer árvore esperar pelo nó `iron` de `my_first_tree`, usando o nome automático.

```snbt
tasks: [{ type: "stage", args: ["cyanotype_my_first_tree_iron"] }]
```

## Scoreboard

Com a opção de mundo `scoreboard` ligada, dois objetivos são mantidos atualizados para cada jogador.

| Objetivo | Valor |
| --- | --- |
| `cyanotype_progress` | porcentagem de pesquisa, de 0 a 100 |
| `cyanotype_nodes` | número de nós concluídos |

Eles funcionam como qualquer outro objetivo: coloque um na lateral da tela ou faça funções de datapack reagirem a ele.

```cyan
/scoreboard objectives setdisplay sidebar cyanotype_progress
/execute if score @s cyanotype_progress matches 50.. run say halfway there
```
