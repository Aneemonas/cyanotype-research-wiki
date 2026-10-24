# Restrictions and recipe locks

A node can lock things across the whole pack until it is completed. Each node has a list of **patterns**, which say what is locked, and a **mask** for each pattern, which says in which ways it is locked.

```snbt
locks: ["minecraft:iron_pickaxe", "#minecraft:pickaxes", "create:*"],
lock_masks: [I; 1, 3, 32]
```

The two lists are parallel, so `lock_masks[i]` belongs to `locks[i]`, and `lock_masks` **must be an int array** (`[I; ...]`). In the example the iron pickaxe is locked for crafting only, every pickaxe tag is locked for crafting and use, and everything from Create is locked for placing.

::video dev-restrictions "Locking a recipe, then researching the node that frees it"

## Patterns

A pattern names an item or block in one of four ways.

| Pattern | Matches |
| --- | --- |
| `modid:item` | exactly that item or block |
| `#modid:tag` | everything in that tag |
| `modid:*` | everything from that mod, so `irons_spellbooks:*` locks the whole of Iron's Spells 'n Spellbooks |
| `@name` | a **named list** (see below), or, when no list has that name, the whole mod with that id, so `@irons_spellbooks` means the same as `irons_spellbooks:*` |

A bare `modid` with no colon is also read as the whole mod. Writing `modid:@irons_spellbooks`, with both a prefix and the `@`, matches nothing, which is the most common reason a mod lock seems to do nothing.

Any pattern can have exceptions added after `!`, for example `create:*!create:wrench!create:goggles`, which locks all of Create except the wrench and the goggles. A **named list** is a set of patterns you maintain with `/cyanotype list` (see [commands](dev/commands)) and reuse in many nodes as `@name`, so a change to the list reaches every node that uses it.

Which kind of thing a pattern is matched against depends on the flag. The block flags (INTERACT, GUI, BREAK, PLACE and RUN) match **blocks**, and a `#tag` there is a block tag. The item flags match **items**, and a `#tag` there is an item tag. A pattern that matches nothing is ignored without any message, so check a new lock with `/cyanotype recipes check` or by trying it.

In the editor, the item picker has an **Items** tab, a **Tags** tab and a **Mods** tab. Typing `@mod` in the search box filters the items of that mod, typing `#tag` lists the items of a tag, and picking an entry from the Mods tab adds the `modid:*` pattern.

::video dev-picker-search "Searching the item picker with @mod and #tag, then blocking a whole mod from the Mods tab"

## Flags

The mask of a pattern is the **sum** of the flags it uses, so `3` is RECIPE and USE together, and `33` is RECIPE and PLACE.

| Flag | Value | What is blocked until the node is done |
| --- | --- | --- |
| RECIPE | 1 | crafting the item |
| USE | 2 | right click with the item (block or air) |
| INTERACT | 4 | right click on that block |
| GUI | 8 | opening the menu of that block |
| BREAK | 16 | breaking that block |
| PLACE | 32 | placing that block |
| PICKUP | 64 | picking the item up (it stays on the ground) |
| DROP | 128 | tossing the item |
| RUN | 256 | vanilla furnaces working on this (matches the furnace block) |
| LOOT | 512 | block and mob drops of these items are removed for the player |
| EQUIP | 1024 | the item cannot stay in an armor slot or in an extra slot from another mod: it is moved back to the inventory (checked twice a second; the extra slots are Curios on NeoForge and Forge, Trinkets on Fabric and Accessories on NeoForge and Fabric, all by reflection) |

Restrictions affect everybody, **including operators and creative players**, which makes it easy to forget that you locked something for yourself while building a pack.

## The three layers of the recipe lock

Recipes are handled in three layers, because a recipe can be reached by a player's hands, by a machine or by a furnace.

The **world layer** is the first one. When recipes load, the server takes a snapshot of every recipe and its output. A recipe whose output matches a lock of a node that **nobody** has completed is removed from the server's recipe manager, so machines, hoppers, Create and other mods never learn it exists. The first player to complete the node puts it back **for everyone**. The optional setting `recipe_lock_world_reload` makes the server run a datapack reload at that moment, for mods that cache recipes and do not notice the change by themselves.

The **player layer** is what each player sees. Every player receives a recipe list without the recipes they have not researched, which is what the recipe book, JEI and EMI show, and the result slots of crafting-style menus are emptied or ignored for locked items. The recipes the server removed from the world list are also sent to the client, marked as hidden, so that JEI and EMI can bring a recipe back the moment the player researches the node, without a relog and without a viewer reload.

The third layer is for **furnaces**. The vanilla furnace tick compares the recipe output with the furnace's **owner**, the last player who placed or opened it, and stops if that player has not unlocked it.

All of it is event driven. It is recomputed when trees or progress change and never on a timer.

:::warning
On a multiplayer server, one player's research can open an automated recipe for the whole world. If mods that cache recipes, such as Create, do not notice the change, turn on `recipe_lock_world_reload`. The reload can be slow in a large pack, which is why it is off by default.
:::

## How the recipe output is found

The mod has to know what a recipe produces before it can match it against a lock, and recipe types from other mods do not share a format. It tries `getResultItem` first. If that gives nothing, it encodes the recipe with its own codec to JSON and takes any item id found under a key that contains `result`, `output` or `product`. As a last resort it walks the recipe object by reflection, to a limited depth, and never enters the ingredients. A recipe that has **no item output**, such as one that only produces a fluid, an entity or an effect, cannot be locked.

## What is covered

The recipe lock covers the **result slots** of the crafting table, the 2x2 inventory grid, the anvil, the smithing table, the stonecutter, the loom, the cartography table and any menu whose result slot is a vanilla `ResultContainer`. A modded menu with its own result slot type is not covered by the per-player block, although the world layer still hides its recipes from machines. A *recipe* lock says nothing about where else the item can come from, so chests, loot, trades, the creative menu and other players can still hand over the item. If those should be closed too, add PICKUP or USE to the mask.

**Furnaces**, which means the furnace, the blast furnace and the smoker, are gated by their owner. A furnace that nobody placed or opened, or that a machine placed, has no owner and is not gated, and a modded furnace that does not extend the vanilla furnace block entity only gets the world layer. RUN works only for vanilla furnaces.

The event based flags, USE, INTERACT, GUI, BREAK, PLACE, PICKUP and DROP, hold against players but not against blocks or machines that bypass the events, such as fake players, deployers and some quarries. USE is checked on a right click with the item and not on attacking or on mining speed. GUI detects blocks that provide a menu on the server, and DROP covers tossing and dropping from the inventory but not the drops on death. When an action is refused, the message names the node that locks it, and lock messages can be translated.

## Ideas

Locks work best when each one is a promise about the order of play. A **Stone Age** tree can lock every metal tool of every mod with `#minecraft:pickaxes` and similar tags set to USE plus RECIPE, so that a pack with twenty mods still has a single clear start. A **Permit** node can unlock the placing of `create:*` blocks only after the player has shown they can run the basics, and a node can keep all `ae2:*` screens closed until the player proves themselves. Chests can be held shut with INTERACT plus GUI until a node, and the obsidian that frames a nether portal can be locked with PLACE until a boss is dead.

## Debugging

```cyan
/cyanotype recipes check minecraft:iron_pickaxe
```

prints a diagnosis of the recipe locks for that item. Use it when a recipe is hidden or visible when it should not be, and include its lines when you report a problem.
