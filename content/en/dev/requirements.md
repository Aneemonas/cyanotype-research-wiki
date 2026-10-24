# Requirements

A node can ask for three things at once: **cost**, which is items, **XP levels**, and any number of **tasks**. Every one of them has to be satisfied before the node can be completed. Arguments are always written as strings, even the numbers.

```snbt
cost: [{ item: "minecraft:iron_ingot", count: 8 }, { item: "#c:gems/diamond", count: 1 }],
xp_levels: 5,
tasks: [
  { type: "kill", args: ["minecraft:zombie", "25"] },
  { type: "biome", args: ["minecraft:desert"] }
]
```

Cost items are consumed when the node completes, and a `#tag` is allowed in place of an item. XP levels are spent too, except in creative. Tasks are different because they are conditions and not payments. They are checked once a second, with kills counted at the moment they happen, and each player's progress is saved under the key `tree|node|index`. Tasks that depend on what the player does, such as kills, looking at a block or a timer, only count while the node is available.

::video dev-requirements "Adding a kill task and a biome task in the Requirements tab"

## The basics

| `type` | args | Notes |
| --- | --- | --- |
| `have` | item, count | owned, not consumed |
| `kill` | entity id or `#tag` or `*`, count | counted only while the node is available |
| `advancement` | id | vanilla or modded |
| `look` | block id or `#tag`, seconds | look at the block (reach + 1.5) |
| `location` | x, y, z, radius, dimension | radius default 8; dimension optional |
| `structure` | id or `#tag` | standing in a piece of the structure |
| `biome` | id or `#tag` | |
| `dimension` | id | |
| `timer` | seconds | starts when the node becomes available |
| `stage` | name | a stage from a command, another node or a script |
| `stat` | stat type, id, amount | for example `custom`, `walk_one_cm`, `100000` (namespace `minecraft` by default) |
| `check` | label | the player clicks a check button |
| `lab_level` | level | ignored when lab level is off |
| `placed` | block, `#tag`, `modid:*` or `*`, count | all blocks ever placed (statistics) |
| `placed_new` | same | only blocks placed after the node became available |

## Delivered to the machine

The player does not carry the following. A hopper, pipe or cable delivers them to the machine, and they are consumed when the node completes. See [machine resources](dev/resources) for the buffers behind them.

| `type` | args | Notes |
| --- | --- | --- |
| `feed_item` | item, count | delivered items |
| `fluid` | fluid id, mB | delivered fluid |
| `energy` | FE | delivered energy |
| `source` | source id, amount | an extra resource (mana, a gas, EU...) |
| `near_item` | item, count, radius (4) | thrown near the machine; scanned once a second while the node is active |
| `near_entity` | entity, count, radius (4) | animals or mobs brought near the machine |
| `container` | item, count, radius, `consume` or `keep` | items inside containers near the machine (chests, barrels, item frames holding a container item, bundles) |

## Event and state tasks (0.18+)

These were added in 0.18. The event tasks count when the event happens while the node is open. The ones marked polled (attribute, tag, effect, hold, find and check quest) are instead read once a second while the node is available, which means they describe a state the player has to be in at that moment.

| `type` | args | Notes |
| --- | --- | --- |
| `interact_entity` | entity or `#tag`, count, hand (`any` `main` `off`), held item (optional) | right click an entity |
| `attribute` | attribute id, at least | polled, for example `minecraft:generic.max_health`, `30` |
| `adv_kill` | entity, count, weapon, biome, dimension, structure (last four optional) | kill with conditions |
| `adv_item` | item, count, components filter (SNBT, optional), `consume` or `keep` | item with component conditions |
| `damage` | entity or `*`, damage amount, damage type (optional), `total` or `single` | deal damage |
| `receive_damage` | damage type (empty = any), amount, `total` or `single` | take damage |
| `tame` | entity, count | tame mobs |
| `use_item` | item, count | use an item (eat, throw a pearl...) |
| `hold_item` | item, hand, seconds | polled |
| `find_entity` | entity, count, radius | polled: living entities of the type within the radius of the player |
| `check_quest` | `node` `tree` `discover_tree` `discover_node`, `tree` or `tree/node` | another node or tree is completed, or a tree was opened or a node became available |
| `player_tag` | tag | vanilla entity or scoreboard tag (`/tag @s add x`), not a stage |
| `break_block` | block, count, tool (optional) | break blocks |
| `potion_effect` | effect, min amplifier, min seconds left | polled |
| `trading` | profession (empty = any), count | trade with villagers |
| `use_block` | block, count, held item (optional) | right click a block |
| `fishing` | item or `*`, count | fishing catches |
| `villager_trade` | output item, count, count trades not items (`true` / `false`) | villager trades; trades are random, so the item picker is used |
| `socket` | item, count, `auto` or `manual` | see [advanced nodes](dev/advanced-nodes) |
| `currency` | currency id, amount, `spend` or `keep` | virtual currency, see [resources](dev/resources) |

## Examples

The first lines below combine a kill with a biome and a delivery with energy. The last three show the longer argument lists of `stat`, `adv_kill` and `check_quest`.

```snbt
tasks: [ { type: "kill", args: ["minecraft:zombie", "25"] }, { type: "biome", args: ["minecraft:desert"] } ]
tasks: [ { type: "feed_item", args: ["minecraft:redstone", "64"] }, { type: "energy", args: ["10000"] } ]
tasks: [ { type: "stat", args: ["custom", "walk_one_cm", "100000"] } ]
tasks: [ { type: "adv_kill", args: ["minecraft:skeleton", "10", "minecraft:bow", "", "minecraft:the_nether", ""] } ]
tasks: [ { type: "check_quest", args: ["node", "industry/steam_engine"] } ]
```

## How each kind is evaluated

An **unknown `type` counts as fulfilled**. This is deliberate, because a file written for a newer version must not lock a player out of a node, but it has a sharp edge: a typo such as `kil` silently opens the node. Pick types from the editor's list while you write, or complete a test node in a copy of the tree to check that it really waits.

`have` counts the stacks in the player's inventory and takes nothing, while `cost` is the one that takes. `timer` starts the first time the node becomes available to the player and runs on the **world's game time**, so it keeps counting while the player is offline as long as the server is running. The delivered kinds, `feed_item`, `fluid`, `energy` and `source`, read the machine the player is using, so the player has to have the screen open at that machine when completing, and the amount is taken at that moment. `currency` with `spend`, the default, removes the amount on completion and `keep` only checks it. `container` and `adv_item` have the same `consume` and `keep` choice, with `consume` removing the items on completion.

`stage` compares the name exactly, apart from spaces at the ends, and sees stages from commands, `grant_stages`, rewards and KubeJS. Counters such as `kill`, `look`, `stat`, `near_item` and `placed` store their progress per player and node, and once they reach their target they stay reached. A task shows `x / y` for a counter and a tick for a yes or no task, and a node with several tasks needs all of them.

## Operating cost

Besides the tasks of a node, the pack can add an **operating cost** in energy, fluids or Sources to every research. It is set in the Preferences window and is described in [settings](dev/settings).

## Limits

Kills count when the player, or a projectile the player owns, is the killer, so pets and indirect damage do not count. Because tasks tick once a second, a very short stay in a location or a structure can be missed. `placed` reads the item-used statistic, which the game raises by one per placement. A bad id in a task never crashes anything, it just never completes. Editing the requirement list of a node resets that node's stored progress for all players, so change requirements on a live server with that in mind.

The tables above are complete as of this version. The node editor always shows the current list, with a hint for each argument, so when the two disagree the editor is right.
