# Installation

## Requirements

| What | Version | Needed |
| --- | --- | --- |
| Minecraft | 1.21.1 | yes |
| Loader | NeoForge 21.1.x, Forge 52.x or Fabric (Loader 0.16 or newer) | yes, one of the three. On Fabric, Fabric API as well |
| GeckoLib | 4.x (on Fabric, 4.7 or newer) | yes, it animates the machine |
| JEI, EMI or REI | any recent version (REI 16, Fabric only) | optional, used to hide locked recipes and to remove the viewer overlay on the machine screen |
| KubeJS | 7 | optional, stages are mirrored as KubeJS stages and, on NeoForge, scripts can listen to the mod's events |
| Botania, Mekanism | recent versions | optional, they provide Sources such as mana and gases. The Botania bridge exists on NeoForge and Fabric, the Mekanism one only on NeoForge |
| Curios, Trinkets, Accessories | recent versions | optional, they let the equip restriction reach the slots of those mods. Curios on NeoForge and Forge, Trinkets on Fabric, Accessories on NeoForge and Fabric |
| Team Reborn Energy | any | optional, Fabric only: it is how the machine receives energy |

The mod has to be on **both the client and the server**, and both must run the same version. It installs like any other mod, by placing the `.jar` for your loader in `mods/`. Each jar serves one loader, so a Fabric pack does not use the NeoForge jar. What differs between them is in [NeoForge, Forge and Fabric](start/loaders).

:::steps
1. Install NeoForge, Forge or Fabric for Minecraft 1.21.1 with your launcher.
2. Put the mod's `.jar` built for your loader and GeckoLib in the `mods/` folder of the client and of the server. On Fabric, add Fabric API too.
3. Start the game once. The mod creates `config/cyanotype/` and `config/cyanotype-client.toml`.
4. Craft the Research Station with the recipe below, or take it from the creative tab.
:::

## Crafting recipe

```text
I L I     I = iron ingot       L = lapis lazuli
B C B     B = book             C = crafting table
S S S     S = stone
```

## The 30 blueprints

The mod includes thirty blueprint items, each with its own drawing. A blueprint is the usual **input item** of a tree, the thing the player places in the machine to open it. They all appear in the creative tab and none has a recipe, so a pack hands them out through commands, loot tables or its own recipes, which is also a convenient way to pace progression.

The ids follow the pattern `cyanotype:<name>_blueprint`, and the names are electrical, engineer, factory, dungeon, rotational_force, mining, farming, alchemy, magic, combat, defense, exploration, logistics, fluid, steam, smelting, storage, automation, aviation, nether, end, redstone, enchanting, building, trading, cooking, forestry, fishing, space and research. The last one is the generic blueprint.

```cyan
/give @s cyanotype:steam_blueprint
```

## Shipping a pack

Everything an author creates lives in `config/`, so shipping `config/cyanotype/` with the modpack gives every player the same trees, texts and settings. Progress is not part of that: it lives in the world, per player, so a new world starts from zero even with the same config. The full list of files is in [files and folders](ref/files).

:::tip
Test at least once on a LAN or a dedicated server with a second account. Teams, recipe locks and the task poll all behave differently once there is more than one player.
:::
