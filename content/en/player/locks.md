# What is locked and why

Finishing a node can **unlock** things anywhere in the pack. This is how research changes what you are allowed to do, and not only what you own.

::video player-locks "Locked recipe with a padlock, then unlocked after researching"

| What stays locked until the node is done | What it looks like in play |
| --- | --- |
| Crafting | the recipe disappears from the recipe book, JEI, EMI and REI, and a crafting grid leaves the result slot empty |
| Using an item | right clicking with it does nothing |
| Interacting with a block | levers, doors and chests ignore you |
| Opening a block's screen | machine and terminal menus will not open |
| Breaking or placing a block | obsidian, spawners and the like |
| Picking up or dropping an item | the item stays on the ground, or stays in your hand |
| Running a furnace | a given item will not smelt |
| Loot | block and mob drops of an item are removed for you |
| Equipping | the item will not stay in an armor or Curios slot |

Items that are affected carry a **padlock** in the inventory and a tooltip naming the node that unlocks them, which makes the lock itself a hint about what to research next. When you try an action that is locked, a red message on the action bar names the node that holds it.

:::warning
Restrictions apply to everybody, **operators and creative players included**. To test a pack as an operator, complete the nodes with `/cyanotype complete` or the Auto Complete tool.
:::

## Two layers for recipes

Recipes are the one restriction with a twist. Machines and automation, such as Create, hoppers feeding furnaces and modded machines, read the **world** recipe list. A locked recipe is taken out of that list on the server and stays out until **any** player completes the node, at which point it comes back for everybody. Only the recipe book, JEI, EMI and the result slots of crafting menus are decided **per player**.

In practice this means that on a multiplayer server one player's research can open an automated recipe for the whole world, while the other players still cannot craft it by hand until they have researched it too. The reasoning and the details are in [restrictions](dev/restrictions).
