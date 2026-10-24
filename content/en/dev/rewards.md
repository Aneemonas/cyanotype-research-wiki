# Rewards

A node's rewards are given in the order they are listed, after its requirements have been paid. If one reward fails, the error is logged and the next one still runs, so a typo in a command does not swallow the item that follows it. Items that do not fit in the player's inventory are dropped at their feet and are never deleted.

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

::video dev-rewards "A choice reward: the player picks one option"

This is the list of types and their arguments. The next section says what the code does for each one, which is where the edge cases are.

| `type` | args |
| --- | --- |
| `item` | item, count |
| `xp_levels`, `xp_points` | amount |
| `message` | text (`&` colours, `%player%`) |
| `command` | command; runs with level 4 at the player, silent; `%player%` `%uuid%` `%tree%` `%node%` |
| `advancement` | id (all remaining criteria) |
| `toast` | title, text, icon |
| `title` | title, subtitle |
| `sound` | sound id |
| `effect` | id, seconds, amplifier |
| `loot_table` | id (gift context at the player) |
| `stage` | name |
| `recipe` | recipe id (recipe book) |
| `table` | reward table id |
| `function` | id, `world` (only the first player in the world) or empty |
| `choice` | `options: [ rewards ]`; the player picks one |
| `wheel` | `options: [ rewards ]` with `weight`; one is given at random |
| `currency` | currency id, amount (negative takes) |
| `open_barrier` | barrier id, `open` or `close` |
| `summon` | entity id, count, SNBT (optional) |
| `attribute` | attribute id, amount, `add` `mult_base` `mult_total` |

## Details per type

| `type` | What the code does |
| --- | --- |
| `item` | count is at least 1. An unknown item gives nothing. Whatever does not fit in the inventory is **dropped at the player's feet**, never deleted. With `reward_to_buffer` on the node, items go to the machine's output buffer first |
| `xp_levels`, `xp_points` | negative values count as 0; this reward cannot take XP away |
| `message` | system chat message to the player. `&` colour codes work and `%player%` is replaced. Translatable |
| `command` | leading `/` is optional. Runs as the player with permission level 4 and no output. Replaces `%player%`, `%uuid%`, `%tree%`, `%node%`. Anything the command reports goes to the server log |
| `advancement` | grants **all remaining criteria**. An unknown id does nothing |
| `toast` | the third argument is the icon item. Title and text are translatable |
| `title` | big title on screen, fade in 10 ticks, stay 70, fade out 20. The subtitle is only sent when the second argument is not empty |
| `sound` | a sound event id (`minecraft:entity.player.levelup`), played at the player's position at volume 1 and pitch 1, heard by people nearby |
| `effect` | seconds default to 30 (minimum 1), amplifier 0 is level I |
| `loot_table` | rolls the table with a *gift* context at the player and gives the stacks like `item` does |
| `stage` | grants the stage immediately (same as a node's `grant_stages`) |
| `recipe` | adds the recipe to the recipe book. Does not unlock anything restricted by a node |
| `table` | rolls a global reward table, see below. Works at the top level and as an option of a `choice` or `wheel` |
| `function` | runs a research function, see [functions](dev/functions). The second argument `world` means only the first player in the world triggers it |
| `choice` | the player picks one child in a window before the node completes. `auto_complete` never completes a node that has a choice (a person must pick), *Collect all* asks you to pick, and completing the node with `/cyanotype complete` or the Auto Complete tool gives **nothing** for the choice because nobody picked |
| `wheel` | picks a child by relative `weight`. If all weights are 0 it picks uniformly |
| `currency` | adds to the player's balance; a negative amount takes |
| `open_barrier` | opens (or closes) every Barrier Gate with that id for this player, saved with their progress |
| `summon` | spawns 1 to 20 mobs 1.5 to 4 blocks from the player. With a bare id the mob gets the normal command-spawn setup (armour, variants); with an SNBT in the third argument that SNBT **replaces** that setup, so you provide everything |
| `attribute` | see below |

:::warning
`choice` and `wheel` only work at the top level of a node's reward list, and they cannot contain each other. A `table` can sit at the top level or be one option of a `choice` or a `wheel`, but never inside another table, and the loader drops any combination that is not allowed. A node that has a choice, a wheel and a table all at once is fine, as long as none of them is placed inside one of the others.
:::

## Commands

Commands run through a silent runner with operator rights, no feedback and no chat error shown to the player. If a command fails, the error goes to the server log together with the tree and node it came from, which is where to look when a command reward seems to do nothing.

```snbt
{ type: "command", args: ["give %player% minecraft:diamond 1"] }
{ type: "command", args: ["kubejs stages add %player% iron_age"] }
```

## Reward tables

A reward table is a named list of rewards kept in `config/cyanotype/reward_tables.snbt` and edited with the table button in the editor. A node uses one through a `table` reward that names it, so the same loot can be shared by many nodes and changed in one place.

| Mode | Behaviour |
| --- | --- |
| `all` | gives every entry |
| `each` | rolls each entry on its own, using its `weight` as a percentage |
| `one` | draws a single entry, using the weights as relative shares |

The `weight` of an entry therefore means a percentage in `each` and a relative share in `one`, and `all` ignores it. Tables cannot nest, so a table entry may not itself be a table, a choice or a wheel.

## Attribute rewards

An `attribute` reward is a **permanent modifier** that applies for as long as the node is completed and also exists at the current difficulty. It is reconciled once per second and not at the instant of completion, so there can be a short delay. This makes it the natural reward for RPG skills. `add` adds a flat amount, and `mult_base` and `mult_total` multiply, so `0.1` with `mult_base` is ten percent more.

```snbt
{ type: "attribute", args: ["minecraft:generic.max_health", "4", "add"] }
{ type: "attribute", args: ["minecraft:generic.movement_speed", "0.1", "mult_base"] }
```

## First in the world

`ResearchCompletedEvent.isFirstInWorld()` and a `function` reward set to `world` both tell a script who completed a node first. See [functions](dev/functions) and the [API](dev/api).

## Translations

The texts of `message`, `title` and `toast` rewards can be translated, and are stored with the node's other texts, see [translations](dev/translations).
