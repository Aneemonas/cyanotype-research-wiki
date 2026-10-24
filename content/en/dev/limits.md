# Limits and status

What the mod does not do, and what I tested.

## What I tested

On NeoForge, I tested in single player, on a LAN with several clients and on a dedicated server, and in large modpacks, FTB ones included. The things that need other mods (Botania mana, Mekanism gases, Curios equip, JEI recipe locks, GLSL backgrounds) were tried with the real mods.

Forge and Fabric were played in modpacks as well, and that is where the Fabric interface bug and the REI problems were found and fixed. What I did not verify one by one are the pieces that exist only on those loaders: Team Reborn Energy, Trinkets, Accessories, the Forge `loot` mixin and the dedicated server on both.

What I did **not** test is a server with many players at the same time. Teams, the task poll and recipe locks should scale, and the profiler numbers on the [performance page](dev/performance) say so, but I have not seen it with a full server.

| Area | Status |
| --- | --- |
| Tasks, teams, difficulty, Barrier Gates, recipe locks, profiler | tested in single player, LAN and dedicated server |
| Large packs (FTB and others) | tested |
| Botania mana, Mekanism gases, Curios equip lock, JEI | tested with the real mods |
| GLSL background shaders | tested |
| REI (Fabric) | tested in a modpack |
| EMI live update | works by reflection on EMI internals, so another EMI version may break it |
| Forge and Fabric | played in modpacks. The loader-specific integrations and the dedicated server were not checked one by one |
| Many players on one server | not tested |

## Restrictions and recipe locks

Recipe locks follow the **recipe output**, so a recipe with no item output, such as one that produces only a fluid, an entity or an effect, cannot be locked. They also work in two layers, and the second is world-wide: machines and automation use the world recipe list, so a locked recipe comes back for **everybody** as soon as any player completes the node. See [restrictions](dev/restrictions) for how this plays out.

The per-player block on crafting does not cover a modded menu that has its own type of result slot. A *recipe* lock also says nothing about other sources of the item, so chests, loot, trades and the creative menu are not blocked by it. Furnaces are gated by their owner, the last player who placed or opened them, and a furnace placed by a machine has no owner. The event based restrictions hold against players but not against fake players, deployers or some quarries. All of them apply to everybody, **operators and creative players included**.

The `loot` restriction covers block and mob drops only, and not chest or fishing loot. The `equip` restriction is checked twice a second and reaches Curios, Trinkets and Accessories slots by reflection, each on the loader where it exists (see [NeoForge, Forge and Fabric](start/loaders)). A `modid:*` or `#tag` pattern that matches nothing is ignored without any message.

## Trees, tasks and teams

Task progress counts **only while the node is available** and is checked once a second, so very short events can be missed. A `kill` counts when the player, or a projectile they own, is the killer. `max_children` counts only children of the **same tree**, and references to a deleted node or tree are ignored and do not block, with the progress of deleted nodes purged. In Legacy mode the once-per-second check only runs for trees the player has already opened, although kill counting runs for all trees, and Quest Book mode checks them all. Attribute rewards and difficulty stage changes are reconciled once per second, and autocomplete only runs for the player who last opened the machine and is still online.

For teams, a *personal* node is never shared, and a teammate who took the other branch of an exclusion keeps their choice. *Blocks placed (total)* uses each player's own statistics. A dev reset of a node or tree is shared with teammates when team sharing is on, and a teammate who is offline keeps the item in a socket.

## Machine

A portable machine has no delivery requirements and no operating cost, because FE and fluids need the placed machine. Create's stress units are not an energy or fluid capability, so define a Source and feed it with an add-on or KubeJS. Other energies such as EU and RF can be handled with a Source whose `FE per unit` is above 0, which converts to FE, but only energy is native and detected automatically (FE on NeoForge and Forge, Team Reborn Energy on Fabric). Thaumcraft aspects can be a Source once that mod exists for 1.21.1, and GregTech cleanroom integration is not implemented.

## Texts and interface

Titles, descriptions, lock messages and the texts of message, title and toast rewards are translatable, while **function names are not**. Tree pictures are downloaded from the server the first time they are drawn. The dev editor still shows nodes that are hidden by difficulty, without a dimming indicator yet. Named lists are edited by command, and exceptions are typed with `!` in the pattern field. The linked-item highlight in other trees only cycles in Quest Book mode. The recipe-book hold is saved on logout, so a server crash while a player is online can lose it.

## Barrier Gates

Gates opened by hand, or in saves from 0.20.0 and 0.20.1, have no source node, so they stay open when a node is reset.
