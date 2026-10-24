# Moving around the tree

Big trees can have hundreds of nodes, so the screen is built around a free-moving camera and a few shortcuts for getting back to where you were.

::video player-navigation "Panning, zooming, fitting the view and searching"

| Action | Keys |
| --- | --- |
| Pan | drag the background, right or middle mouse button, the arrows or `WASD` |
| Scroll | wheel for vertical, `Shift` + wheel for horizontal |
| Zoom | `Ctrl` + left `Alt` + wheel, or `+` and `-` |
| Reset the view, fit everything | `R` or `Home`, and `F` |
| Details of a node | click it, or `Enter` while hovering it |
| Pin a node | `P` while hovering it, or the pin button in its panel |
| Search | the magnifier button, `Ctrl+F` or `/` |
| Show or hide the inventory | `Tab` |
| Help | `H` or `F1` |
| Full screen | `M` |

## Search

The search box jumps to a node by its title. Type a few letters, choose a result from the list and the view moves to centre on that node, which is the quickest way to cross a large tree when you know what you are looking for.

## Pins

A pinned node is one you want to find again. Pins are saved per player, so they survive closing the machine and logging out, and a team does not share them. In a large tree it works well to press `F` and look at the whole shape, pin the two or three nodes you want next, and then use the search or the pins to jump back to them while you gather materials.

## Lines and links

Lines show dependencies, from a parent to the nodes that need it. A node that depends on, or excludes, a node of **another tree** has no line to draw, because the other node is not on this screen, so it gets a small rotating ring instead. Authors can also hide the lines going into or out of a node while keeping the dependency itself, which is how a tree can place a node far from its parent without a line crossing the screen.
