# What is Cyanotype Research

Cyanotype Research adds a single machine, the **Research Station**, and a research system that runs through it. The machine ships empty. There are no built-in techs, quests or skills: every tree, node, requirement, reward and restriction is data that the pack author builds in game with the editor, or writes as text files and ships with the pack. What the mod provides is the screen, the rules and the plumbing.

::video tour-overview "The Research Station: a blueprint goes in and the tree opens"

## How it works

A **tree** is a map of **nodes**. A node has a position, an icon, parents that must be finished first, **requirements** to pay or meet, and **rewards** to hand out. The player puts a blueprint, or whichever item the author chose for that tree, into the Research Station, and the tree unfolds on a full-screen view. In Quest Book mode there is no item at all: the player picks the tree in the Codex.

Requirements come in two families. Some are paid, like items and XP levels, or delivered to the machine by a hopper, pipe or cable when the node asks for items, fluids or energy. The others are things the player does in the world while the node is open, such as killing mobs, entering a biome, looking at a block, placing blocks or simply waiting for a timer.

A finished node pays its rewards and can also unlock things anywhere in the pack. Recipes, item use, blocks, container screens, furnaces and even physical doors (the Barrier Gates) can stay locked until the right node is done, which is how a tree turns into real progression and not only a checklist.

::card Player guide | player/machine | The machine, the Codex and every screen. | icon_team
::card Your first tree | dev/quick-start | A working tree in ten minutes. | icon_edit
::card Pack examples | examples/overview | Tech, exploration and RPG setups with real files. | icon_star

## Three ways packs use it

The same system can be pointed at very different designs, and the example packs in this wiki are one of each.

| Style | Trees | Example node |
| --- | --- | --- |
| Tech progression | one tree per technology, with nodes that lock the recipes of a mod | "Steam Age" asks for water and FE to be delivered to the machine, then unlocks `create:*` crafting |
| Exploration | a map of places to visit | "Deep Dark" completes when the player enters the biome, shows a toast and rolls a loot table |
| RPG skills | a loose web with classes and branches | "Berserker" is one of three exclusive specialisations and grants attributes |

The [examples](examples/overview) include the complete tree files for all three.

## What is in the box

Trees can be linear or branch in any way you like. A node may need all its parents, any one of them or exactly N, and a branch can exclude another so that a choice is permanent. Nodes can be secret, shown only as silhouettes, hidden until others are done, or linked across trees, and a whole tree can be flexible, with no central root. See [progression](dev/progression).

There are more than forty kinds of requirement, from "pay 8 iron ingots" to "stand inside a village", and the list grows with each version. See [requirements](dev/requirements). Rewards cover items, XP, commands, loot tables, attributes, summons, one-of-N choices and weighted wheels, and are described in [rewards](dev/rewards). [Restrictions](dev/restrictions) are the other half of progression: they decide what a player cannot craft, use, open, break, place, pick up, equip or even receive as loot until a node is done.

The machine itself holds resources. Hoppers, pipes and cables deliver items, fluids and FE to it, and extra *Sources* such as Botania mana or Mekanism gases can be added, as described in [machine resources](dev/resources). [Teams](player/teams) share progress, and a scripting layer with stages, events, a Java API and KubeJS support lets other mods and scripts react to research, see [API](dev/api).

:::note
The mod is still in development. The [limits page](dev/limits) lists what I have tested and what I have not.
:::
