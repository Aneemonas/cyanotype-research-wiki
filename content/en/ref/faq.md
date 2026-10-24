# FAQ and troubleshooting

## Does it work on Forge and Fabric?

It does, with small differences. What changes and what was tested is in [NeoForge, Forge and Fabric](start/loaders) and in [limits and status](dev/limits).

## The machine gets no energy on Fabric

Fabric has no FE. The machine accepts energy through Team Reborn Energy, so that library has to be installed and the generator has to speak that API. If your energy mod uses another one, define a Source with `FE per unit` above 0 and feed it from an add-on, as described in [machine resources](dev/resources).

## The machine shows no gauge for fluid or Sources

The three buffers (FE, Fluid and Source) start at 0 and are set in **Preferences > Machine**. A gauge also only appears when something uses it: a fluid in the operating cost or in a node for the fluid gauge, and a Source for the Source gauge.

## A hopper or pipe does not put anything in

The machine only accepts what a tree asks for, and only while that is still needed. Check that a pending node asks for the item, that the matching buffer is above 0 and that the node is available.

## Mekanism gas does not enter

Four things have to be true together. A Source with the adapter `chemical:mekanism:oxygen` (or any other chemical id) must exist, a pending node or the operating cost must ask for that Source, the Mekanism tank needs an output face pointing at the machine, and the Source buffer must be above 0.

## A recipe is hidden, or visible, when it should not be

```cyan
/cyanotype recipes check <item>
```

Locks follow the recipe output. A recipe stays hidden for everybody on the server (the world layer) until some player completes the node that releases it, and the other two layers, player and furnace, are explained in [restrictions](dev/restrictions). If a mod caches recipes on its own, try the world setting `recipe_lock_world_reload`.

JEI and EMI follow the unlock live since 0.22.8, so a recipe should show up in the viewer as soon as the node is done, without relogging. See [recipe viewers](dev/recipe-viewers) for how that works.

## `JEI hideRecipes failed ... must be an instance of RecipeHolder` in the log

This is expected. Each JEI category is tried with holders and with bare recipes, and one of the two attempts fails by design.

## Restrictions apply to me as an operator

They apply to everybody, operators included. Complete the nodes with `/cyanotype complete` or use the **Auto Complete** tool when you need to get past them.

## I blocked a whole mod and nothing happened

Use `modid:*`, for example `irons_spellbooks:*`. A bare `irons_spellbooks` or `@irons_spellbooks` also means the whole mod, as long as no named list has that name. `modid:@name` matches nothing. The restriction picker has a **Mods** tab that writes the right form for you.

## My tree file is ignored

The file name is the tree id and has to match `[a-z0-9_-]{1,48}`. A real file cannot contain comments, and `lock_masks` has to be an int array written `[I; ...]`. When none of that is the problem, search `latest.log` for `Error reading ...`: a file that cannot be read is skipped and its `.bak` is tried instead.

## A requirement never completes

Task progress only counts while the node is available, so look at the parents first. Polled tasks are read once a second, which is why they react a moment after the event.

## A node I can see is greyed out and will not complete

If the world difficulty changed, the node may belong to a difficulty that is not active. Nodes limited to other difficulties go inactive, and so do nodes whose parents are all inactive. See [difficulty](dev/advanced-nodes#difficulty).

## The screen is slow

Turn blur off, set the FPS limit to 60, the side panel scale to 90 and the ambient effects off, in Preferences. [Performance](dev/performance) has the rest.

## The server log shows `Mismatch in destroy block pos`

It is harmless. It comes from a Barrier Gate clicked by a player who is not allowed to break blocks there.

## Where do I report a bug?

Send the `latest.log` and, for recipe problems, the output of `/cyanotype recipes check <item>`.
