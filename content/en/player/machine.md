# The Research Station

The Research Station is a block you craft once and place wherever you like. Right clicking it opens the research screen. The block is an animated model made with GeckoLib, and it hums while a player is nearby.

::video player-machine "The Research Station block: placing it and opening the screen"

## What it does

The machine is the place where a tree is shown, and also the place where its resources are kept. The screen draws the tree as a full-screen blueprint that can be panned and zoomed. Behind the screen the machine holds whatever the nodes ask to have delivered, whether that is items, fluids, energy or an extra Source such as mana. It gives access to the [Codex](player/codex), the overview of every tree you can see, and it keeps an output buffer for rewards when a node is set to send them there.

Hoppers, pipes and cables can push items, fluids and energy into the machine, but nothing can be pulled back out by automation except the output buffer. In item handler terms the input slots are 0 to 8 and accept inserts only, while slots 9 to 17 are the output buffer and allow extraction only. See [feeding the machine](player/feeding) for how delivery works.

:::note
The look of the block comes from a **skin**. The pack author chooses one of five (default, geral, create, aco and dungeon) in the world settings, and it only changes how the block looks, never what it does.
:::

## The screen

The tree takes up the whole screen. In Legacy mode the central slot is where the blueprint goes, and removing the blueprint folds the tree away again. A side panel on the right shows the details of the selected node, with its requirements, rewards and the research button.

Next to the lab level badge there are gauges for the machine's resources, which only appear when the pack uses them. The inventory bar and the currencies of the tree sit along the bottom, and `Tab` shows or hides the inventory. A row of buttons opens the Codex, the search, the team window, the preferences and the in-game help. Operators who have dev mode on also see the editor tools, which are described in [the editor](dev/editor).

## Portable machine

A pack can switch on a **portable machine**. It opens the same screen without a placed block, using a key that you bind under Controls, in the Cyanotype category, since it has no default. Because energy and fluids can only be delivered to a real block, a portable machine has no delivery requirements and no operating cost, and nodes that depend on them cannot be completed from it.
