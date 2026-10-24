# Node states

A node looks different depending on how close you are to finishing it, so you can read the state of a tree at a glance.

::image node-states "The states of a node: available, locked, done, mystery and blocked"

| State | What you see | What it means |
| --- | --- | --- |
| **Available** | bright, with a soft glow | everything before it is done and you can research it now |
| **Locked** | dark, with a padlock | something is missing, and hovering it tells you what |
| **Done** | filled in, with a check | already researched |
| **Mystery** | only a silhouette | not available yet, so its shape and icon are hidden |
| **Text-hidden** | the title and description read `?????` | the text only becomes readable once the node is done |
| **Blocked** | a padlock that never goes away | you chose another branch, so this node can no longer be researched |
| **Optional** | marked as optional | it does not count towards the percentage of the tree |

Some trees go further and hide blocked nodes completely, using the tree option *hide unreachable nodes*.

## Why a node is locked

Hover a locked node to find out. The text is either a message the pack author wrote for that node, which usually points at the real gate such as "needs the Nether first", or it is an automatic list of what is still missing, which can be parents that are not done, requirements that are not met, or a difficulty that does not match.

## Nodes that appear later

An author can keep a node invisible until a condition is met: until a parent is done, until a chosen set of nodes is done, or until a number of that node's own requirements have been met. You will see these nodes appear as you play, and a tree that looks small at first may turn out to have branches you have not unlocked.

## Small markers on a node

A **ring that slowly rotates** means the node depends on, or excludes, a node of another tree. Small **difficulty marks** for peaceful, easy, normal and hard show that the node exists on only some difficulties, and the client option *difficulty marks* turns them off. A thin **bar** under a node is a repeatable node counting down until it can be completed again. **Tiny resource icons** for energy, fluid, a Source or a currency say that the node costs machine resources or currency, on top of whatever it asks you to carry.
