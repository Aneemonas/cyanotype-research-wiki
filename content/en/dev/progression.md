# Progression recipes

Most of the shapes a tree can take come from a handful of fields working together. The table below names the common ones, and the sections after it show the files for the ones that are easy to get wrong.

| Goal | How |
| --- | --- |
| Linear chain | each node has the previous one as parent |
| Branch choice (A or B) | A has `excludes: ["b"]` **and** B has `excludes: ["a"]` |
| Pick 2 of 3 | a node with three parents, `parents_needed: 2`, `exclude_rest: true` |
| Limit to 2 specialisations | the parent has `max_children: 2` |
| Secret node | `mystery`, `hide_text`, `reveal_mode: 2` with the nodes that reveal it |
| Surprise when half done | `reveal_mode: 4`, `reveal_tasks: 2` |
| Free-form skill web | tree `flexible: true`, nodes without parents just start |
| Bonus content | `optional: true` |
| Hide dead ends | tree `hide_dead: true` |

::video dev-progression "Exclusive branches and pick-two-of-three in the editor"

:::warning
An exclusion only works from the node that lists it. If only A lists B, then B can still be completed first and A stays open, which is rarely what you meant. List the exclusion on both sides.
:::

## Example: branch choice

Two nodes that exclude each other make a permanent choice. Once the player completes `warrior`, `mage` can never be researched and everything that hangs below `mage` becomes unreachable, and the same in reverse.

```snbt
nodes: [
  { id: "fork", x: 0, y: -60, parents: [] },
  { id: "warrior", x: -48, y: -120, parents: ["fork"], excludes: ["mage"] },
  { id: "mage",    x: 48,  y: -120, parents: ["fork"], excludes: ["warrior"] }
]
```

## Example: pick two of three

Here `master` has three parents but needs only two, and `exclude_rest` closes the third as soon as the other two are done, so the player ends up with exactly two of the three elements.

```snbt
nodes: [
  { id: "fire", x: -60, y: -60, parents: [] },
  { id: "ice", x: 0, y: -60, parents: [] },
  { id: "storm", x: 60, y: -60, parents: [] },
  { id: "master", x: 0, y: -120, parents: ["fire", "ice", "storm"], parents_needed: 2, exclude_rest: true }
]
```

The version of this with the limit on the parent's side is `max_children: 2`, which suits a branch that offers several specialisations and allows only two of them.

## Example: secret node

A secret node combines `mystery`, `hide_text` and a reveal rule. With `reveal_mode: 2` the node stays completely invisible until every node in `reveal_nodes` is done. After that it shows as a silhouette with `?????` in place of its text, until it becomes available, and only then does it show what it is.

```snbt
{ id: "secret", x: 96, y: -120, parents: ["a"], mystery: true, hide_text: true,
  reveal_mode: 2, reveal_nodes: ["a", "b"] }
```

Mode 4 gives a gentler reveal. The node appears when a number of its own requirements are met, `reveal_tasks`, which lets a hidden node show up once the player is half way through its conditions without ever being told about it.

## Hide a dependency line

`hide_in_lines` and `hide_out_lines` stop the line from being drawn while the dependency keeps working. That makes it possible to place a node away from its parents, for example in a separate cluster at the edge of the tree, without a long line crossing everything between them.
