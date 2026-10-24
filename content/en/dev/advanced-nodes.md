# Advanced nodes

Everything on this page is switched on per node, either in the **Options** tab of the node editor or as a field in the tree file. None of it is needed for a plain tree, but sockets, difficulty gating and the autocomplete and buffer pair change how a pack plays, so they are worth reading before you design around them.

## Sockets

A socket is a node that asks for an item to be physically placed in it, the way you would slot a gem into a setting. It uses the `socket` requirement with three arguments: the item (a `#tag` is fine), the count, and `auto` or `manual`.

```snbt
{ id: "gem_slot", x: 0, y: -60, parents: [],
  tasks: [{ type: "socket", args: ["minecraft:amethyst_shard", "1", "auto"] }] }
```

::video dev-sockets "A socket node: the player carries an item to it, the socket fills and everything behind it unfolds"

The player does not pay for a socket by pressing the research button. Once the node is available, clicking it opens the inventory bar (this is the client option *Socket: open inventory*, and the bar closes again when the socket is filled or you click away). The player picks the item up with the cursor and clicks the node. The server checks that the stack on the cursor matches the item and holds at least the required count, takes exactly that many, and stores them inside the node. If the item is wrong, an action-bar message says so and nothing moves.

What makes a socket different from a cost is what it does to the rest of the tree. **Every node that descends from an unfilled socket is hidden**, not only its direct children but the whole chain behind it, so the player sees a lone slot with nothing after it. When the item goes in, a ring of sparks leaves the socket and the hidden nodes come out level by level, with each line growing and each node popping into place, the same way the whole tree unfolds when a blueprint is inserted. Taking the item back out folds them away again.

An item can be taken back by clicking a filled socket for as long as the node is not completed, and a socket that was filled with `manual` waits for the normal research button, so the player can change their mind. With `auto` the node is completed in the same moment the item goes in, which makes the socket a one-way door. In the editor, a plain click on a socket selects it as usual, so you have to carry an item to test the fitting.

A few practical notes. The node keeps the actual stack, including its components, so a player who takes it back gets the same item. Teammates do not share the stack: if a teammate is offline when you reset the node, they keep the item in their socket until they next log in. Sockets have their own sprites (`node_socket_*`, see [sprites](dev/resource-pack)), and the player can turn the automatic inventory off in [Preferences](player/preferences) if they would rather open it themselves.

Sockets are at their best as gates in front of a branch that should feel earned, such as a gem that has to be found in the world before an upgrade line appears, or a blueprint that has to be handed over before a whole section of a tree exists at all. For a cost that should simply be paid, use `cost` or `have` instead.

## Difficulty

Each node has a difficulty set made of Peaceful, Easy, Normal and Hard, found in the node editor under *Difficulty* and stored as the bit mask `difficulties` (1, 2, 4 and 8, added together). The default is all four, which means the node does not care. A node whose set leaves out the current world difficulty does not exist at all while the world is on that difficulty: it is not drawn, it cannot be researched, and it does not count for the percentage of the tree.

::video dev-difficulty "Changing the world difficulty: nodes that only exist on Hard appear and disappear, and the lines reconnect"

The difficulty that counts is the one of the world, never a per-player setting. In single player it is the difficulty of the map, on a LAN it is the host's and on a server it is the server's. The server reads it every tick, so changing it with `/difficulty` takes effect almost immediately.

Whether a node is active is decided by three rules that are applied together.

1. A node that is already completed is always active. Switching the difficulty never takes progress away from a player.
2. A node that is not completed is inactive when its own set excludes the current difficulty.
3. A node that is not completed and has parents is also inactive when every one of its existing parents is inactive, because there is no longer any way to reach it.

There is one more rule that matters for branching trees. When a child has been completed through one parent, an uncompleted parent that only exists on another difficulty goes away, since the path the player took is now fixed. This is what lets a Hard-only parent and a Normal parent feed the same child without the Hard one lingering as a dead end afterwards.

Stages and attribute rewards that come from a node that has just become inactive are withdrawn, and handed back when the node returns. This happens once per second, together with the other reconciliation work, so there can be a short delay after a difficulty change. Small difficulty marks on the nodes show which ones are gated (the client option *difficulty marks* turns them off), and the dev editor keeps showing nodes that are hidden by difficulty so you can still edit them. A script can listen to `NodeActiveChangedEvent` to react.

The usual uses are a hard-mode branch with better rewards, a peaceful-friendly alternative to a combat task (two sibling nodes, each limited to its own difficulties, both feeding the same child), and a tutorial node that only exists on Easy.

## Once in the world

A node with `world_once` can be completed by one player only, the first one to do it. The completion is recorded for the whole world, and anyone who tries afterwards gets the *world taken* message. Combine it with a `function` reward set to `world` to announce the winner, see [functions](dev/functions). It suits a unique artifact or a race between players, and makes little sense in a tree that teams share, because the whole team counts as the one who finished.

## Personal nodes

`personal` keeps a node out of team sharing. Everyone has to complete it themselves, and its completion is never copied to teammates. Use it for choices that define a character, such as a class, so that two teammates can take different ones.

## Repeatable nodes

A node with `repeatable` and `repeat_seconds` can be completed again after the interval. The seconds go from 1 to 31 536 000 and default to 60. After the first completion the node's children stay unlocked, so repeating never closes a branch. Each repeat starts the requirements from zero and pays the rewards again, and a thin bar under the node counts down to the next time it can be done.

On its own a repeatable node is a daily reward, a claim button on a cooldown, or a bounty that comes back. Together with autocomplete and the output buffer it turns the machine into a producer, as described below.

## Autocomplete and the output buffer

These are two separate switches, `auto_complete` and `reward_to_buffer`, designed to be used together.

With `auto_complete` the machine does the research by itself. Once a second it looks at the tree it has open (the item in the slot in Legacy mode, or the tree last opened there in Quest Book mode) and, for the player who opened the machine last and is still online, completes every flagged node that is available and fully paid, up to 8 per pass. The machine's own resources are used for delivered requirements, while item and XP costs come out of that player's inventory. Nodes with a Choice reward are left alone because somebody has to choose, and so are exclusive nodes and any node that a `ResearchAttemptEvent` listener vetoes. They wait for a click.

With `reward_to_buffer` the item rewards of the node, including loot tables and table rolls, go into the machine's output buffer first. The buffer has nine item slots, exposed on every face of the machine as extract-only, so a hopper or pipe can pull from them. Whatever does not fit goes to the player as usual.

Put a repeatable node, autocomplete and the output buffer together and you get a factory that has no recipe: a hopper delivers cobblestone, the node completes every two minutes, and iron appears in the buffer for another hopper to carry away. The [tech pack](examples/tech-pack) builds exactly that, and the same idea works for a farm, a mob drop or an item sink.

::video dev-producer "A repeatable, autocompleting node feeding the output buffer, with a hopper taking the result"

## Containers

The `container` requirement reads the inventories around the machine: chests, barrels, item frames holding a container item such as a badge case, and bundles. The scan only runs while the node is available and a player is within the scan radius (20 blocks by default, 4 to 64 in the world settings), which keeps the cost at nothing for a tree nobody is near. With `consume` the items are removed from the containers when the node completes, and with `keep` they are only looked at.

## Barrier Gates

A Barrier Gate is a see-through wall block, `cyanotype:barrier_gate`, that only players who have researched the right node can walk through.

::video dev-barrier "A Barrier Gate: invisible to those who may pass, solid for the rest"

The block does not draw at all for players who are allowed through, and appears as a translucent cube to everyone else, including creative and spectator players, so that builders can see what they are building. The gate id is the custom name of the item you place, which you set in an anvil, or you can set it afterwards with a command. A node opens the gate with the reward `open_barrier`, giving the id and `open` or `close`, and a gate opened by a reward closes again if that node is reset, so resetting a tree in testing puts the world back as it was.

The commands are `/cyanotype barrier set <pos> <id> [allow_mobs]` for one block, `fill <from> <to> <id> [allow_mobs]` for an area, `open` and `close <players> <id>` to override by hand, and `list <player>` to see what a player can pass. `allow_mobs` lets mobs through, which is off by default.

:::note
A gate opened by hand with `/cyanotype barrier open` has no source node, so a node reset does not close it. The same is true of gates opened in saves made with 0.20.0 and 0.20.1. The server log may also print `Mismatch in destroy block pos` when a player who cannot break blocks there clicks on a gate. It is harmless.
:::

## Linked items and the portable machine

Two keys live under Controls, in the Cyanotype category. *Show the nodes of the hovered item* defaults to `Y` and highlights every node that asks for or rewards the item under the cursor, in the inventory or in JEI and EMI. *Open the machine (portable)* is unbound by default and only works when the world setting `portable_machine` is on, in which case the screen opens anywhere without a placed block. A portable machine has no delivery requirements and no operating cost, since energy and fluids need a real machine to arrive in.

## Lab XP overrides

The XP that a node or a whole tree gives to the lab level can be overridden. In the node editor the value is in the Options tab, in the tree settings it is for the finished-tree bonus, and in both cases -1 means "use the world value". See [lab level](player/lab-level) for what the number is for.
