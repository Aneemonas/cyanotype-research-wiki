# Mental model

Three kinds of object cover almost everything in the mod, and knowing which one a thing belongs to tells you where it is stored and who can change it.

```text
Tree  = id + title + input item + options + [Node]
Node  = position + icon + parents + requirements (costs, xp, tasks)
        + rewards + restrictions (locks) + visibility
Player progress (per UUID) = done nodes per tree, discovered trees, stages, task values, pins
```

A **tree** is a list of nodes plus a few options of its own, such as which item opens it. A **node** is a position on the map together with everything that decides when it can be done and what happens when it is. **Progress** belongs to a player, not to a tree, and records which nodes that player has finished, which trees they have discovered, the task counters they have built up and their pins.

## Where things live

| What | Where |
| --- | --- |
| Trees | `config/cyanotype/trees/*.snbt`, shipped with the pack |
| Texts of trees and nodes | `config/cyanotype/lang/<code>.json` |
| Progress | in the world, as `<world>/data/cyanotype_progress.dat`, with teams in their own `.dat` |
| World options | `config/cyanotype/settings.snbt` |

Because everything about trees is in files, a modpack ships its whole research design by shipping the `config/` folder. Progress is the only part that stays with the world, which is why a new world on the same pack starts from zero.

## Who decides

The **server decides everything**. The client only sends requests, such as "research this node", and the server checks the tree, the machine and the requirements before it pays anything. The client keeps a mirror of the synced trees and of the player's progress so it can draw the screen, but it never trusts that mirror for a decision. Every server handler checks again that the menu is open, that the tree matches the item in the machine, and that dev-only actions come from a player who is in dev mode.

## Event driven

Almost nothing runs on a timer. The server recomputes locks when trees or progress change and does nothing in between. The one periodic job is the **task poll**, which runs once a second for each player and only looks at nodes that have requirements and are currently available, using a list that is cached per player and tree. See [performance](dev/performance) for the measurements.

## Safe writes

Everything the mod writes goes through a safe writer. It writes a temporary file, moves it over the real one, and keeps the previous good version as `name.bak`. A tree file that cannot be read is skipped and logged and is never overwritten, so a typo in a hand-edited file costs you that tree for a moment and not your work. A bad id or a bad command typed by an author is not allowed to crash a tick.
