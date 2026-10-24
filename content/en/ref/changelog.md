# Version history

A summary of the latest versions. The complete list is in `CHANGELOG.md` of the mod.

## 0.22.9-multiloader

- The mod now ships for **NeoForge, Forge and Fabric** (1.21.1) from the same code. The NeoForge jar behaves as before. The differences between the three are in [NeoForge, Forge and Fabric](start/loaders).
- On Fabric, the machine accepts energy through Team Reborn Energy and Botania mana, and the equip restriction reads Trinkets and Accessories. NeoForge now reads Accessories too, besides Curios.
- The built-in shader backgrounds work on Fabric again, where they used to fall back to the simple effect.
- On Forge, the `loot` restriction uses a mixin and damage requirements see the damage before absorption.
- On Fabric, support for REI: no overlay on the machine screen, and locked recipes are hidden and shown again live.
- Tested: the three jars in modpacks, REI included. The loader-specific integrations were not checked one by one.

## 0.22.9

- Restrictions accept a whole mod as `modid:*`. A bare `modid` or `@modid` does the same when no named list has that name.
- The item picker has a **Mods** tab, `@mod` filters by mod and `#tag` lists the members of a tag. The registry picker (mobs, biomes, structures and so on) understands `@mod` and `#tag` too.

## 0.22.8

- The server now tells clients which recipes the world layer removed, so JEI and EMI can bring a recipe back as soon as its node is completed.
- A `table` reward can be an option of a `choice` or a `wheel`.

## 0.22.7

- Node sprites can be replaced from a resource pack, and items can be tinted.
- Video materials and theme packs.

## 0.22.6

- **Three separate machine buffers**: FE, Fluid and Source. Sources and Mekanism gases use only the Source buffer, split equally between the Sources in use and shown as **one gauge**.
- **All buffers default to 0.** Values already saved in a world are kept.
- The fluid gauge is hidden when no fluid is used; FE the same.
- Fainter background grid and Codex line background.

## 0.22.5

- The Sources of the operating cost make the HUD strip relevant by themselves.
- The gauge strip is shown in Quest Book mode too.
- Mekanism gas works with a Source.

## 0.22.4

- Sources have their own buffer, fluids split only between themselves.
- First diagnostics for Mekanism chemicals.

## 0.22.0 to 0.22.3

- Interface art pass: panels, popups, Codex cards and banners, buttons, fields and the blueprint items were redrawn.
- Blueprint items stack to 1.
- Softer interface sounds.

## 0.21.x

- Autocomplete and the machine output buffer.
- Tree pictures and backgrounds, effects, shaders, picture browser, image tool, in-game tutorials.
- Mekanism chemicals as Sources.

## 0.20.x

- Difficulty gating, once-per-world nodes, Barrier Gates.
- New rewards: attribute, summon, wheel.
- Patterns with exceptions and named lists, the LOOT restriction.
- Linked items, portable machine, translatable lock messages.
- Profiler, poll cache.

## 0.19 and earlier

Operating costs with several fluids and Sources, currencies, sockets, containers, repeatable nodes, line styles, many new requirement types, the first version of the Codex, teams and the editor.
