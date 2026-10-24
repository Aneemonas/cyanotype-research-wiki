# Cross-tree links

Anywhere a node id from the same tree is accepted, which means `parents`, `excludes` and `reveal_nodes`, you can instead write `other_tree/node_id` to point at a node in a different tree. The node picker in the editor has an **Other trees** tab for choosing one.

```snbt
{ id: "nether_core", x: 0, y: -120, parents: ["industry/steam_engine"], excludes: ["pacifist/peace_pact"] }
```

::video cross-tree-ring "A node with the rotating ring: its parent is in another tree"

## How it behaves

Evaluation stays local to each tree. Internally, the set of completed nodes handed to a tree answers `contains("other/node")` from the other tree's progress, so a cross-tree parent is checked the same way as a local one and none of the other rules need to know about it. Tree ids never contain `/`, which is what makes the split unambiguous.

A reference to a node or tree that does not exist is ignored, so deleting a tree never blocks anything that pointed at it. Cross-tree children do not count for `max_children`, which only looks at children of the same tree. Because the other node is not on this screen there is no line to draw, so these nodes get the rotating **portal ring** instead. In Quest Book mode, the *link item* key (`Y` by default) can highlight the linked item in the other trees.

## What it is good for

Cross-tree links are how you chain trees into a larger campaign without merging them into one enormous map. A main **Industrial Age** tree can have one line per sector, with a separate tree for each sector that opens only when the matching main node is done. Two trees can also oppose each other: finishing a node in a **Pacifist** tree can exclude its equivalent in a **Warrior** tree, so the choice is made across trees and not inside one. A **hub** tree whose nodes are plain gates, with hidden text and a large scale, can unlock whole other trees one at a time, which keeps each tree small and readable on its own.
