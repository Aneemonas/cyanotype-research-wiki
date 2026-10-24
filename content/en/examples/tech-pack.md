# Tech pack

Three trees: **Steam Age**, **Electric Age** and **Automation**. Each node locks the recipes of a machine until the player has built what that machine stands for, and some nodes ask the player to **feed the machine** with fluid, FE and items.

::video example-tech-overview "The three tech trees, chained one after the other"

## Layout

| Tree | Blueprint | What it teaches the player |
| --- | --- | --- |
| Steam Age | `steam_blueprint` | deliver water, iron and gunpowder; machines unlock in order |
| Electric Age | `electrical_blueprint` | deliver FE and redstone; circuits and storage unlock |
| Automation | `automation_blueprint` | build a real hopper line, keep a warehouse, then a repeatable producer |

The trees are chained: the first node of Electric Age has `steam_age/steam_master` as a parent, and Automation depends on `electric_age/electric_master`. The final node of each tree also gives the next blueprint.

## Settings

This pack delivers fluid and FE to the machine, so it needs those buffers:

```snbt config/cyanotype/settings.snbt (only the relevant keys)
{
  buffer_fe: 200000,
  buffer_mb: 16000,
  buffer_src: 0,
  quest_book_mode: false
}
```

With `buffer_src` at 0 there is no Source gauge. The pack only uses water and FE, so only those two gauges appear.

## Steam Age

::file assets/examples/tech/steam_age.snbt "steam_age.snbt"

Notes:

- **`boiler`** pays iron and asks the player to *deliver* 4000 mB of water. The machine needs a fluid buffer of at least that size to accept it. With 1 fluid in use, the whole fluid buffer is its share.
- **`press`** and **`mixer`** lock one recipe each (`lock_masks: [I; 1]` = RECIPE). The player can still *place* the block if they find it, but cannot craft it.
- **`pipes`** needs only one of its two parents (`any_parent`).
- **`steam_master`** is a bigger hexagon (`scale: 1.5`) and pays the next blueprint.

## Electric Age

::file assets/examples/tech/electric_age.snbt "electric_age.snbt"

Notes:

- **`generator`** has a parent in **another tree** (`steam_age/steam_master`), so the node shows the rotating ring in the GUI.
- **`circuits`** asks for two delivered items, so the machine keeps both until the node completes.
- **`storage`** uses mask `9` = RECIPE (1) + GUI (8) on `ae2:*`: the menus of that mod stay closed, and its recipes hidden, until the node is done.

## Automation

::file assets/examples/tech/automation.snbt "automation.snbt"

Notes:

- **`hoppers`** uses `placed_new`: only hoppers placed *after* the node opens count, so players cannot reuse old ones.
- **`chest_wall`** uses `container` with `keep`: the items are looked at but **not** consumed.
- **`cobble_to_iron`** is the **resource producer**: `repeatable` (every 120 s), `auto_complete` (the machine does it by itself) and `reward_to_buffer` (the iron goes into the machine's output buffer, ready for a hopper to pull).

::video example-tech-producer "A funnel feeds cobblestone, iron comes out of the output buffer"

## Adapting it

:::steps
1. Replace the locked ids with the machines of your pack. `create:*` locks every Create recipe at once.
2. Use [named lists](dev/commands#named-lists) so one list is reused by many nodes.
3. Add a `lock_message` per node that tells the player what to build, for example `"Needs a Boiler first."`.
4. Add a **KubeJS** script that listens for `ResearchCompletedEvent` to announce milestones. See [API and KubeJS](dev/api).
5. Turn on `recipe_lock_world_reload` if a machine mod caches recipes and does not notice the unlock.
:::

:::tip
Multiplayer: recipe locks have a world layer. When *any* player completes `press`, the Mechanical Press recipe is back for **everybody** in machines and automation. If you want recipes locked per player in automation too, keep those recipes out of automated machines. See [restrictions](dev/restrictions).
:::
