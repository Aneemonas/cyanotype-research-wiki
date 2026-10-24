# Commands

Every `/cyanotype` command needs permission level 2, which means operators, except the team commands that the chat buttons use.

| Command | Effect |
| --- | --- |
| `/cyanotype dev [true\|false]` | editor mode for you |
| `/cyanotype reload` | reload trees, language files and reward tables, resync everybody |
| `/cyanotype tree list` | list the tree ids |
| `/cyanotype complete <players> <tree> <node>` | complete without paying (rewards are given) |
| `/cyanotype reset <players> [tree]` | forget progress |
| `/cyanotype stage add\|remove <players> <stage>` | add or remove a stage |
| `/cyanotype stage list <player>` | list the stages of a player |
| `/cyanotype function <players> <id>` | run a function reward |
| `/cyanotype scoreboard <true\|false>` | scoreboard objectives |
| `/cyanotype list` | named lists: `show <id>`, `add <id> <pattern>`, `remove <id> <pattern>`, `delete <id>` |
| `/cyanotype currency get\|add\|remove\|set ...` | virtual currencies (`get <player> <id>`, others take `<players> <id> <amount>`) |
| `/cyanotype source <pos> <id> <amount>` | push a Source into the machine at a position |
| `/cyanotype barrier set <pos> <id> [allow_mobs]` | set the id of a Barrier Gate |
| `/cyanotype barrier fill <from> <to> <id> [allow_mobs]` | set the id on every gate in an area (max 200 000 blocks) |
| `/cyanotype barrier open\|close <players> <id>` | open or close a gate id for players |
| `/cyanotype barrier list <player>` | list the gates open for a player |
| `/cyanotype recipes check <item>` | diagnose the recipe lock of an item |
| `/cyanotype profile start\|stop\|reset\|verify` | server cost profiler, see [performance](dev/performance) |
| `/cyanotype profile load <n> [spread\|burst]` | simulate load of `n` players |
| `/cyanotype profile stress <trees> <nodes> [chain]` and `stress clear` | create and remove big test trees |
| `/cyanoteam accept\|decline <id>`, `/cyanoteam leave` | team invitations (any player) |

## Details

`/cyanotype dev` with no value toggles dev mode. It applies to you only and is forgotten when the world closes.

`complete` marks a node as done **without charging** its cost, but the rewards are given. A `choice` reward gives nothing this way, because nobody picked. `reset <players>` with no tree forgets the progress of **all** trees for those players, so name a tree when that is not what you want.

`currency add`, `remove` and `set` take a whole amount of 0 or more, while `get` takes a single player. `source <pos> <id> <amount>` needs a Research Station at that position and reports how many units it accepted. It accepts 0 when no node asks for that Source or when the buffer is full, which makes it a useful way to find out why a delivery is not arriving.

`profile load <n>` takes 1 to 500, where 1 switches the simulation off. `profile stress` takes 1 to 200 trees with 1 to 2000 nodes each and creates trees named `stress_*`, which `stress clear` removes. `profile verify` compares the cached node lists that the poll uses for you with a full evaluation, and a healthy result ends in "OK". If it says "BUG", send that line to the mod author. Finally, `function <players> <id>` runs a research function straight away, which is the way to test one without completing a node.

## Named lists

A named list is a set of patterns that you build once and reuse in restrictions as `@name`, so that a change to the list reaches every node that uses it.

```cyan
/cyanotype list add metal_tools #minecraft:pickaxes
/cyanotype list add metal_tools #minecraft:axes
/cyanotype list show metal_tools
```

Then lock `@metal_tools` in a node. Exceptions are typed with `!` in the pattern field and not in the list. If you name a list after a mod id, `@that_name` refers to the list and no longer to the whole mod, so pick names that are not mod ids.

## Scoreboard

The two scoreboard objectives and how to use them are described in [stages and scoreboard](dev/stages).
