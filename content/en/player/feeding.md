# Feeding the machine

Some nodes do not ask you to carry anything. They ask for items, fluids or energy to be **delivered** to the machine, which makes the machine part of a small logistics puzzle instead of a menu you stand in front of.

::video player-feeding "Hopper, pipe and cable delivering to the machine"

## How to deliver

Put a hopper, pipe or cable against **any face** of the machine and feed it from there. The machine is picky on purpose. It accepts only what some tree is asking for, and only as much of it as is still needed, so a hopper will not swallow a whole stack when the node wants eight items. Whatever it accepts it keeps, and it is consumed when the node completes, so nothing can be taken back out through a pipe. Fluids can also be poured by hand: right clicking the machine with a bucket fills the fluid buffer, unless the pack author has turned that off.

## What the machine holds

| Resource | How it is stored |
| --- | --- |
| Items | fed items wait inside the machine until a requirement uses them |
| Fluids | several fluids at once, and the fluid buffer is shared equally between the fluids that are in use |
| Energy (FE) | its own buffer |
| Sources | extra resources such as Botania mana, Mekanism gases or custom ones, with the Source buffer shared equally between the Sources in use |

The size of each buffer is chosen by the pack author and every one of them starts at 0. A buffer of 0 stores nothing and its gauge is not shown, which is why a pack that never asks for fluids will not show a fluid gauge. The author sets them in the machine settings, see [machine resources](dev/resources).

## Requirements found by scanning

Two kinds of requirement are not delivered by a pipe at all. One asks you to **throw an item near the machine**, and the other to **bring an animal or a mob near it**. These are found by scanning the area around the machine once a second, and the scan only runs while that node is the one being worked on and a player is within the scan radius, which is 20 blocks unless the pack changed it.

## Operating cost

A pack can also charge an **operating cost** for every research, paid in energy, fluids or Sources. It is added to each completion on top of the node's own requirements and appears in the node panel, so a tree that looks cheap may still need the machine to be powered.

## Autocomplete and the output buffer

A pack can flag nodes as **Autocomplete**, in which case the machine completes them by itself as soon as every requirement is met, and it can send a node's item rewards into the machine's **output buffer** of nine slots. With a repeatable node the two together turn the machine into a small producer, which is what the [tech pack](examples/tech-pack) does with cobblestone and iron. The details are in [advanced nodes](dev/advanced-nodes).
