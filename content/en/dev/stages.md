# Stages and scoreboard

## Stages

A stage is a named flag stored in a player's progress. Every completed node grants one automatically, named

```text
cyanotype_<tree>_<node>
```

in lower case, with anything that is not `a-z0-9_` turned into `_`. On top of that, a node can grant extra stages through its own `grant_stages` list and through `stage` rewards. With **KubeJS** installed, the same stage is also added with `kubejs stages add`, so scripts and other mods that work with KubeJS stages see it without any glue. The `stage` requirement reads the internal stages.

Stages are the bridge between this mod and everything else in a pack. A loot table condition, a dimension gate, a command block or another mod's own stage system can all key off the fact that a node was completed. Both commands below work on stages directly.

```cyan
/cyanotype stage add @s forge_unlocked
/cyanotype stage list @s
```

A stage can also be waited for by a node. The task below makes a node in any tree wait for the node `iron` of `my_first_tree`, using the automatic name.

```snbt
tasks: [{ type: "stage", args: ["cyanotype_my_first_tree_iron"] }]
```

## Scoreboard

When the world setting `scoreboard` is on, two objectives are kept up to date for every player.

| Objective | Value |
| --- | --- |
| `cyanotype_progress` | research percent, from 0 to 100 |
| `cyanotype_nodes` | number of completed nodes |

They behave like any other objective. Put one on the sidebar, or let datapack functions react to it.

```cyan
/scoreboard objectives setdisplay sidebar cyanotype_progress
/execute if score @s cyanotype_progress matches 50.. run say halfway there
```
