# Opening a tree

The pack author picks one of two ways to open trees, in the world settings. The choice affects the whole world, so every player on a server uses the same one.

::video player-opening "Legacy mode: the blueprint goes in and the tree unfolds"

## Legacy mode

In Legacy mode the tree is opened by an item. The player places the **tree item** in the central slot of the machine, which is normally a blueprint but can be any item the pack chose, and if a tree exists for that item it unfolds level by level, the closest nodes first. Taking the item out folds it back again. While the animation plays the slot is locked, so the item cannot be pulled out half way.

Once a player has discovered a tree, the item that opens it shows **Research item** in its tooltip, and when the pack leaves item hints on, items that some node asks for or rewards show a **Needed for** line. Both are handy for working out which blueprint goes with which tree.

## Quest Book mode

In Quest Book mode there is no central slot. The player opens the [Codex](player/codex) and clicks a tree. With an empty machine in this mode the Codex opens by itself, which the client option *Auto-open Codex* controls.

## Wording

The same screen can sound like a research lab, a quest log or a skill tree, and the pack author picks the vocabulary in the world settings. It changes only the labels on buttons and messages.

| Mode | Words |
| --- | --- |
| Research (default) | Research, Complete |
| Quest | Quest, Complete |
| Skill (RPG) | Skill, Learn |

## Undiscovered trees

A tree you have never opened appears encrypted in the Codex. The first time you open it, the tree counts as **discovered**, and some nodes in other trees can be set to wait for exactly that, see [requirements](dev/requirements).
