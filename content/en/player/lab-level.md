# Lab level and HUD

The lab level is a score that the mod derives from your progress, and nothing is stored for it, so it always agrees with what you have actually completed. Each finished node gives 10 XP and each fully finished tree gives 50 more. Going from level `L` to `L+1` costs `50 + 25 * L` XP, so the early levels come quickly and the later ones need real progress. The pack author can change the XP per node and per tree, and can override it for a single tree or node, which is how a milestone node can be made to count for more. The whole lab level can be turned off for a pack.

## Where it shows

A small **HUD** displays your level, an XP bar and the combo counter, and the client option *Progress HUD* turns it off if you would rather not see it. The level is also something a node can ask for, with the requirement **needs lab level N**, which lets a pack use it as a soft gate between sections of a tree.

## The gauge strip

Next to the lab badge you may see the machine's gauges, and which ones appear depends on what the tree uses.

| Gauge | Appears when |
| --- | --- |
| FE | the pack set an energy buffer and something asks for energy |
| Fluid | the pack set a fluid buffer and a fluid is used |
| Sources | the pack set a Source buffer and a Source is used, shown as one bar for all Sources |

Each gauge shows the total, and hovering it lists the individual fluids or Sources. In Quest Book mode the strip is shown while a tree is open.
