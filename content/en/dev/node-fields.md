# Node fields

This is every field a node can have in the tree file. Only `id` is required. Most fields are also available as buttons and boxes in the node editor, so you rarely need to type them, but the table is the quickest way to see what exists.

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | unique inside the tree |
| `title`, `description` | string | texts. Once the editor saves the file they move to the language files, see [translations](dev/translations) |
| `icon` | item id | icon (a missing item becomes a barrier) |
| `x`, `y` | int | position; children sit at more negative `y` |
| `shape` | `square` `circle` `diamond` `hexagon` | sprite shape (default square) |
| `scale` | 0.5 to 3 | size multiplier. The sprite is scaled, see [Sprites](dev/resource-pack#node-sprites) |
| `parents` | list | ids of the same tree, or `tree/node` of another |
| `any_parent` | bool | one parent is enough |
| `parents_needed` | int | exactly N parents (wins over `any_parent`); 0 = automatic |
| `exclude_rest` | bool | once enough parents are done, the parents *not* done are locked for good ("pick N of M") |
| `excludes` | list | once this node is done, those nodes (or `tree/node`) can never be researched; their descendants become unreachable |
| `max_children` | int | once N children are done, the other children are locked (children of the same tree only) |
| `optional` | bool | ignored by progress, tree complete and lab level |
| `personal` | bool | teams: never shared |
| `hidden` | bool | invisible until available |
| `mystery` | bool | silhouette until available |
| `hide_text` | bool | title and description show `?????` until done |
| `hide_lock` | bool | no padlock when the node can never be researched |
| `hide_in_lines`, `hide_out_lines` | bool | do not draw the lines in or out (the dependency still works) |
| `reveal_mode` | 0 to 4 | 0 default (`hidden`), 1 always visible, 2 visible when all `reveal_nodes` are done, 3 when any is done, 4 when `reveal_tasks` of its own requirements are met |
| `reveal_nodes`, `reveal_tasks` | list, int | for modes 2 to 4 |
| `lock_message` | string | shown while locked; empty uses the tree's |
| `cost` | list | `{item: "minecraft:iron_ingot", count: 8}`; `#tag` allowed; consumed |
| `xp_levels` | int | consumed |
| `tasks` | list | `{type, args}`, see [requirements](dev/requirements) |
| `rewards` | list | `{type, args, options?, weight?}`, see [rewards](dev/rewards) |
| `grant_stages` | list | extra stages when done |
| `locks`, `lock_masks` | lists | restrictions, see [restrictions](dev/restrictions) |
| `difficulties` | int | bit mask of the world difficulties where the node exists: 1 peaceful, 2 easy, 4 normal, 8 hard; 15 (all, the default) = does not care |
| `world_once` | bool | only the first completion in the world counts |
| `repeatable`, `repeat_seconds` | bool, int | can be completed again after the interval (1 to 31 536 000 s, default 60) |
| `auto_complete` | bool | the machine completes it by itself when every requirement is met |
| `reward_to_buffer` | bool | item rewards go to the machine's output buffer first |
| `lab_xp` | int | override of the XP of this node, 0 to 100 000 (-1 = world value) |

## How parents are counted

A node is **available** when it is not blocked and enough of its *valid* parents are done. A parent is valid if it exists, so a deleted node or a deleted tree is simply ignored and never holds anything back. How many are enough depends on the settings. With `parents_needed` it is that number. Without it, `any_parent` makes one parent enough, and otherwise all of them are needed. Parents that **exclude each other** are counted as a single choice, so with A and B exclusive and C separate, a node that needs all its parents needs two, one of A or B and then C.

A node with **no valid parent** is joined to the centre of the tree in the default mode and just starts in Flexible mode.

A node is **blocked** when something has permanently closed it. The causes are checked in this order: a local exclusion, a cross-tree exclusion, `exclude_rest` and `max_children`. A node is **unreachable** if it is blocked or if every way into it is blocked or unreachable, which is how a whole branch goes dark when its root is excluded.

A tree is **complete** when every node that is not optional is either done or unreachable and at least one node is done. An empty tree is never complete.

## Shapes and sizes

::image node-shapes "The four node shapes at different scales"

A node is drawn as a square, circle, diamond or hexagon, and `scale` multiplies its size from 0.5 to 3. The shapes carry meaning only through your own conventions, but two work well in practice. A larger scale, around 2.0, picks out a milestone, and the circle or the hexagon marks a node that is different in kind from the rest of its branch. Sockets are a separate kind of node with their own sprites, covered in [advanced nodes](dev/advanced-nodes).
