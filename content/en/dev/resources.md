# Machine resources

The machine can store items, fluids, energy and extra resources called **Sources**. How much of each is up to you, and you set it in **Preferences > Machine**, which operators see once dev mode is on.

::video dev-buffers "Preferences > Machine: the three buffers and the operating cost"

## The three buffers

Energy, fluids and Sources each have their own buffer, and they share space differently.

| Buffer | Holds | How it is split |
| --- | --- | --- |
| **Energy (FE)** | energy (on Fabric through Team Reborn Energy, with 1 E counting as 1 FE) | one pool |
| **Fluid (mB)** | all fluids together | shared **equally** between the fluids in use, so two fluids get half each |
| **Source (units)** | all Sources together | shared **equally** between the Sources in use, and the total never passes the buffer |

:::warning
**All three buffers start at 0.** At 0 the machine stores nothing of that kind and its gauge is hidden, so set the ones you need yourself. This is intentional, so that a pack that never uses fluids does not show a fluid gauge. Values you already saved in a world are kept.
:::

A fluid or Source that nothing asks for any more is removed from the buffer. It counts as in use while it is part of the operating cost or of a requirement that is still pending. In `settings.snbt` the keys are `buffer_fe`, `buffer_mb` and `buffer_src`, each from 0 to 2 000 000 000.

## Gauges on the HUD

The strip beside the lab badge shows an **FE** gauge when the energy buffer is set and something asks for energy, a **Fluid** gauge when the fluid buffer is set and a fluid is in use, and **one** Source gauge showing the total when the Source buffer is set, with a line per Source in its tooltip. Players can hide each group in their client preferences.

## Operating cost

The operating cost is paid on **every** research, on top of what the node itself asks for. It is set in Preferences > Machine, under *Energy per research*, *Fluids per research* and *Sources per research*. The energy part is a number of FE (`run_fe`). Fluids and Sources can have any number of rows, a fluid pattern with an amount in mB for the first, and a Source id with a number of units for the second. A fluid pattern is usually a fluid id such as `minecraft:water`.

A cost is a good way to make the machine feel like a machine, because every research draws from the same buffers that deliveries fill, which turns the feeding setup into something the player has to keep running.

## Requirements that use the buffers

The `feed_item`, `fluid`, `energy` and `source` tasks are delivered to the machine and consumed when the node completes, see [requirements](dev/requirements).

```snbt
tasks: [
  { type: "fluid", args: ["minecraft:water", "4000"] },
  { type: "energy", args: ["50000"] },
  { type: "source", args: ["mana", "2000"] }
]
```

## Bucket fill

Right clicking the machine with a bucket or another fluid container fills the fluid buffer, and only with fluids that some tree asks for. The *Fill with buckets* switch in Preferences > Machine turns it off.

## Sources

A **Source** is any extra resource, such as mana, EU, Create stress, aspects or a gas. Sources are defined in `config/cyanotype/sources.snbt` and edited with the **Edit currencies / resources** button in the Preferences window, which operators can use.

| Field | Meaning |
| --- | --- |
| name | what the player sees, and the id is derived from it |
| icon | an item |
| FE per unit | `0` stores the Source as it is, and anything above `0` **converts** it to FE as it arrives, which is how EU, RF and similar units work with the ordinary FE buffer |
| adapter | how the Source is fed automatically, see below |

The default Source is `mana`, with the Botania adapter. This example file has three Sources, which are mana, a Mekanism gas and a converted EU:

::file assets/examples/tech/sources.snbt "sources.snbt"

`fe_ratio` in the file is the FE per unit. An old `buffer` key is ignored, since the size of the Source buffer is the world setting `buffer_src`.

### Adapters

| Adapter | Effect |
| --- | --- |
| `botania_mana` | accepts Botania mana from spreaders and pools (NeoForge and Fabric) |
| `chemical:<id>` | accepts a **Mekanism** chemical, on NeoForge only (gas, infusion, pigment or slurry), for example `chemical:mekanism:oxygen`, and `chemical:oxygen` means the `mekanism` namespace. 1 mB is 1 unit |
| none | fed by another mod through the block capability `cyanotype:source_handler` (`ISourceHandler`), or by command |

:::tip
For a gas to arrive, a **pending** node (or the operating cost) must be asking for that Source, and the Mekanism tank needs an **output face** set towards the machine, since a tank only pushes gas through a face in output mode.
:::

To test a Source by hand, push some in with a command that takes the machine's position, the Source id and an amount.

```cyan
/cyanotype source ~ ~ ~ mana 1000
```

### Create stress units, EU and others

Nothing is detected automatically except energy: FE on NeoForge and Forge, Team Reborn Energy on Fabric. For stress units, EU or anything else, define a Source (`su`, `eu` and so on) and feed it from an add-on or from KubeJS through `ISourceHandler`, or with `/cyanotype source`. A Source whose `FE per unit` is above 0 converts what it receives into FE.

## Currencies

**Virtual currencies** live in the player's progress and not in the machine, so they follow the player and cannot be piped in or out.

A currency is defined in `config/cyanotype/currencies.snbt` with a short id, the name players see, and one of 15 icons (coin, gem, flask, soul, star, heart, crown, key, skull, leaf, feather, scroll, shard, orb and shield). A `currency` reward gives it, or takes it when the amount is negative, and a `currency` requirement asks for an amount and either spends it or only checks it. A tree can have a **tree currency**, which filters the bar at the bottom of the screen, and the **apply** button writes a base cost and reward for it into the tree's nodes. `/cyanotype currency get|add|remove|set` manages balances by command. The currency is drawn as a small icon on nodes, in the node panel and next to the lab level, and the client options can hide energy, fluids, other resources or currencies separately. The [RPG pack](examples/rpg-pack) builds a whole skill point economy on one currency.

## Items

Delivered items wait in the machine until a node uses them. Item rewards go to the **output buffer** of nine slots when the node has *Rewards to machine buffer* on. Every face of the machine exposes the item handler, with slots 0 to 8 as input that only accepts inserts and slots 9 to 17 as output that only allows extraction.
