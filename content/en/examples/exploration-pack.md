# Exploration pack

The trees are a **map of places to visit**: biomes, structures, dimensions. Rewards are small (toasts and loot), and one of them opens a **Barrier Gate**, so a dangerous area stays closed until the player has earned it.

::video example-exploration-overview "An Atlas tree being filled while the player travels"

## Layout

| Tree | Blueprint | Content |
| --- | --- | --- |
| Overworld Atlas | `exploration_blueprint` | walk, visit three biomes, stand in a village, pick any three of four |
| Depths | `dungeon_blueprint` | two caves reveal a secret node about the Deep Dark and the Ancient City |
| Beyond | `nether_blueprint` | portal, fortress, bastion, the End; opens after the Atlas |

No machine resources are needed, so the buffers can stay at 0 and no gauge appears.

```snbt config/cyanotype/settings.snbt (only the relevant keys)
{
  quest_book_mode: true,
  quest_wording: true,
  buffer_fe: 0,
  buffer_mb: 0,
  buffer_src: 0
}
```

`quest_book_mode` lets players pick trees in the Codex without carrying a blueprint, and `quest_wording` says *Quest* and *Complete* instead of *Research*.

## Overworld Atlas

::file assets/examples/exploration/overworld_atlas.snbt "overworld_atlas.snbt"

Notes:

- **`first_steps`** reads a **statistic**: `walk_one_cm` is in centimetres, so `100000` is one kilometre.
- **`village`** uses a **tag of structures** (`#minecraft:village`), so any village type counts.
- **`cartographer`** has four parents and `parents_needed: 3`: any three of the four are enough.
- Rewards: a **toast**, a **loot table** and XP levels.

::video example-exploration-biomes "Walking into a biome fills the task by itself"

## Depths

::file assets/examples/exploration/depths.snbt "depths.snbt"

Notes:

- **`deep_dark`** is a **mystery** node with `hide_text` and `reveal_mode: 2`: it stays hidden until both caves are done, and then shows as a silhouette with `?????`.
- **`ancient_city`** is a diamond and its second reward is `open_barrier` for the id `warden_gate`.

### Placing the Barrier Gate

Put the gate where you want the wall. The id is the **name of the item** you place, set in an anvil, or set it afterwards:

```cyan
/cyanotype barrier set ~ ~ ~ warden_gate
/cyanotype barrier fill 100 40 100 110 48 100 warden_gate
```

Players who finished `ancient_city` walk through it and do not see it. Everybody else sees a translucent wall.

## Beyond

::file assets/examples/exploration/beyond.snbt "beyond.snbt"

Notes:

- **`nether`** depends on `overworld_atlas/cartographer`: the **cross-tree** link keeps the dimensions closed until the Atlas is done.
- **`the_end`** needs two of its two parents (`parents_needed: 2`) and a `dimension` task.

## Adapting it

:::steps
1. Swap biomes and structures for the ones of your world generation mods: use `#namespace:tag` to cover whole families.
2. Add a `location` task (`x, y, z, radius, dimension`) for hand-placed points of interest. Radius defaults to 8.
3. Use `look` (`block, seconds`) for "study this monument" quests.
4. Give the first blueprint with a loot table in a spawn chest.
5. Add `hide_dead: true` to a tree to hide branches the player can no longer take.
:::

:::note
Location, biome and structure tasks are checked once a second while the node is **available**. Players have to be there after the node opens; walking through an area earlier does not count.
:::
