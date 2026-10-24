# How to use the examples

Three complete example packs, each with real tree files you can download, the reasoning behind the design, and the settings and scripts around them.

::card Tech pack | examples/tech-pack | Steam, electricity and automation with locked recipes. | bp_steam
::card Exploration pack | examples/exploration-pack | Biomes, structures and dimensions as quests. | bp_exploration
::card RPG pack | examples/rpg-pack | Classes, skill points and attributes. | bp_combat
::card Cookbook | examples/cookbook | Short recipes for common tricks. | icon_spark

## Using a file

:::steps
1. Download the `.snbt` file from the example page (the **Download** button).
2. Put it in `config/cyanotype/trees/` of your world or pack. The file name must match the `id` inside.
3. Run `/cyanotype reload`, or restart.
4. Give yourself the blueprint of the tree: `/give @s cyanotype:steam_blueprint`.
5. Open the machine and put the blueprint in. In Quest Book mode, pick the tree in the Codex.
:::

:::note
The examples use items from other mods (`create:*`, `ae2:*`) as plain ids. If a mod is not installed, the id simply never matches and nothing breaks. Replace them with the mods of your pack.
:::

## Check your own files

All the example files in this wiki are checked by a small script (`tools/validate_examples.py`) for syntax and for the mod's rules: no comments, no trailing commas, known task and reward types, the right number of arguments, parents that exist, and `lock_masks` written as an int array. Do the same with yours: if the mod cannot read a tree file, it logs `Error reading ...` and **skips** the file, it never overwrites it.

## Read them in this order

1. The **tech pack** teaches resources, locks and cross-tree links.
2. The **exploration pack** teaches location tasks, secrets and Barrier Gates.
3. The **RPG pack** teaches choices, currencies and attributes.
4. The **cookbook** collects small patterns.

## Common to every pack

- Set the buffers you need in Preferences > Machine. They start at **0**.
- Give the player the first blueprint with a quest, a loot table, a recipe or a command.
- Tree size is not a performance problem, so split trees by theme, not by node count. Chain them with [cross-tree links](dev/cross-tree).
- Write texts in `lang/en_us.json` first, then add other languages. See [translations](dev/translations).
