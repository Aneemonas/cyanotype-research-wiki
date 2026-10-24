# Your first tree in 10 minutes

By the end of this tutorial you will have a small tree with three nodes: one that costs iron, one that asks you to kill zombies and one that unlocks a recipe.

::video dev-quickstart "The whole tutorial in two minutes"

:::steps
1. **Become a dev.** Operators only. The mode lasts until the world closes.

   ```cyan
   /cyanotype dev true
   ```

2. **Open the machine and create the tree.** Right click a Research Station and put any item in the central slot. A blueprint is the usual choice, or any item that has no tree yet. Press **Save as tree** (bottom left), type a name. The name becomes the id: `My First Tree` becomes `my_first_tree`.

   ::video dev-create-tree "Creating a tree from a blueprint"

3. **Add nodes.** Choose the **Add** tool (`N`) and click on empty space three times. Leave about 60 units between levels.

4. **Link them.** Choose the **Link** tool (`2`). Click the parent, a red line follows the mouse, then click the child. Click the same pair again to unlink.

   ::video dev-link-nodes "Adding nodes and linking them"

5. **Edit the first node.** Choose **Edit** (`3`) and click a node, or double click it. In the **General** tab type a title and pick an icon. In the **Requirements** tab add a cost: 8 iron ingots.

6. **Edit the second node.** Requirements tab, add a task *Kill mobs*: `minecraft:zombie`, 25. Rewards tab, add a *Toast* reward.

7. **Edit the third node.** Restrictions tab, add a locked item with the **Recipe** flag, for example `minecraft:iron_pickaxe`. Until a player finishes this node, nobody can craft an iron pickaxe.

8. **Save.** Press `Ctrl+S`. The file is written to `config/cyanotype/trees/my_first_tree.snbt`.
:::

## Test it

Dev mode adds the editor tools to the machine screen. To see the tree the way a player does, run `/cyanotype dev false` and research the nodes in order.

:::tip
Restrictions apply to everybody, operators included, so the iron pickaxe will stay uncraftable for you as well. When you want to skip a requirement while testing, use the **Auto Complete** tool or run `/cyanotype complete @s my_first_tree <node>`.
:::

## The same tree as a file

Everything you clicked is stored as a plain text file, so you can also write a tree by hand, copy it between packs or keep it in git. This is the tree from the tutorial.

```snbt config/cyanotype/trees/my_first_tree.snbt
{
  id: "my_first_tree",
  input: "cyanotype:research_blueprint",
  nodes: [
    {
      id: "iron",
      title: "Iron Age",
      description: "Pay for the right to forge iron.",
      icon: "minecraft:iron_ingot",
      x: 0, y: -60,
      parents: [],
      cost: [{ item: "minecraft:iron_ingot", count: 8 }]
    },
    {
      id: "hunter",
      title: "Zombie Hunter",
      icon: "minecraft:rotten_flesh",
      x: -48, y: -120,
      parents: ["iron"],
      tasks: [{ type: "kill", args: ["minecraft:zombie", "25"] }],
      rewards: [{ type: "toast", args: ["Hunter!", "You cleared the night.", "minecraft:rotten_flesh"] }]
    },
    {
      id: "tools",
      title: "Iron Tools",
      icon: "minecraft:iron_pickaxe",
      x: 48, y: -120,
      parents: ["iron"],
      locks: ["minecraft:iron_pickaxe"],
      lock_masks: [I; 1]
    }
  ]
}
```

Some details of the file matter if you edit it by hand. `title` and `description` may be written inline like this, and they are imported into `lang/en_us.json` when the file loads, after which the editor keeps them there (see [translations](dev/translations)). `lock_masks` must be an **int array**, which is why it is written `[I; 1]` with the `I;`, and the flag `1` means RECIPE (see [restrictions](dev/restrictions)). The `y` axis points down the screen and children sit at more negative `y`, so the second and third nodes above have `-120` while their parent has `-60`. After editing a file by hand, run `/cyanotype reload` to load it.

## What to read next

The next pages go through the pieces in more detail. [Node fields](dev/node-fields) lists every setting a node has, [requirements](dev/requirements) covers every kind of task, [rewards](dev/rewards) covers what a finished node pays, and the [examples](examples/overview) contain complete trees for three kinds of pack.

::card Node fields | dev/node-fields | Every field of a node. | icon_edit
::card Requirements | dev/requirements | All the tasks a node can ask for. | icon_check
::card Rewards | dev/rewards | What a finished node pays. | icon_star
::card Examples | examples/overview | Full trees for three kinds of pack. | icon_codex
