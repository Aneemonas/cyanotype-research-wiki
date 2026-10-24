# NeoForge, Forge and Fabric

The mod ships as three jars built from the same code: NeoForge 21.1.x, Forge 52.x and Fabric, all for Minecraft 1.21.1. Trees, nodes, requirements, rewards, restrictions, Barrier Gates, teams and the machine screen live in a shared module and behave the same on all three. The differences sit at the edge, where the mod talks to the loader or to other mods, and this page collects them.

:::warning
The mod started on NeoForge, and that is where most of the testing happened. Forge and Fabric were played in modpacks too, but the integrations in the table below were not checked one by one there. [Limits and status](dev/limits) has the details.
:::

## What changes between loaders

| Topic | NeoForge | Forge | Fabric |
| --- | --- | --- | --- |
| Events for other mods | `NeoForge.EVENT_BUS` | `MinecraftForge.EVENT_BUS` | `CyanotypeEvents.listen` |
| Energy (FE) | native | native | Team Reborn Energy, with 1 E counting as 1 FE |
| Items and fluids | capabilities | capabilities | Transfer API |
| Botania mana | yes | no bridge | yes |
| Mekanism gases | yes | no bridge | no bridge |
| Extra slots for the `equip` restriction | Curios and Accessories | Curios | Trinkets and Accessories |
| Source capability | `BlockCapability` | `Capability` | `BlockApiLookup` |
| Required dependencies | GeckoLib 4 | GeckoLib 4 | GeckoLib 4.7 or newer and Fabric API |

A pack author does not need to memorise the table. The row that usually matters is the integrations one: if your pack relies on mana or gas entering the machine, check that the loader you chose has the bridge.

## Details

**Energy on Fabric.** Fabric has no FE like NeoForge and Forge do. The machine accepts energy through Team Reborn Energy when that library is installed, and each unit counts as 1 FE in the buffer. An energy mod that speaks another API cannot fill the machine, and the way around it is a Source with `FE per unit` above 0, described in [machine resources](dev/resources). The mod id `team_reborn_energy` is my assumption about how the library registers itself, so it deserves a test with a real generator.

**The equip restriction.** Armor slots are checked on all three. Slots from other mods depend on what exists for each loader: Forge reads Curios, NeoForge reads Curios and Accessories, and Fabric reads Trinkets and Accessories. All of it goes through reflection, so a mod that changes its own API can stop being recognised without a visible error. When that happens the armor slots are still checked.

**Damage on Forge.** Damage requirements see the damage before absorption, not after it as on the other two.

**Block loot on Forge.** Forge 1.21.1 has no block-drops event, so the `loot` restriction uses a mixin. If another mod touches the same spot, the restriction can fail silently, and this is one of the items I most want to see tested.

**Events on Fabric.** Fabric API does not offer player tick, block placing, item toss and pickup, mob loot, taming, villager trades, fishing, finishing the use of an item or final damage. The mod covers them with its own mixins, and a mod that changes the same places can conflict.

**Pinned versions on Fabric.** I used Fabric API 0.107.0 and GeckoLib 4.7, because newer builds of both need a Loom that the rest of the project does not accept. I did not test much newer versions of either.

**KubeJS.** Automatic stages are mirrored on any loader where KubeJS is installed, through the `kubejs stages` command. The script examples on the [API page](dev/api) were written for KubeJS 7 on NeoForge, and I did not check how to listen to the mod's events from KubeJS on Forge or Fabric.

**Recipe viewers.** JEI and EMI are supported by the plugins in the shared module. REI is supported on Fabric only, through its own plugin. See [JEI, EMI and REI](dev/recipe-viewers).

**What stays the same.** Config files, datapacks, `theme.json`, background shaders, skins and commands have the same format and live in the same folders on all three. A finished `config/cyanotype/` works on any of them. I did not test opening a world saved on one loader with another.
