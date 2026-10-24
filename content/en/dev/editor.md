# The in-game editor

The editor is part of the machine screen. Turn it on with `/cyanotype dev true`, which only operators can do and which lasts until the world closes, and the screen gains the editing tools and the **Save as tree** button. Everything the editor does is an edit of the same text files described in [the tree file](dev/tree-file), so what you build here can be read, diffed and copied like any other config.

::video dev-editor "A tour of the editor tools"

## Tools

| Tool | Key | Use |
| --- | --- | --- |
| Add | `N` | click empty space to place a node |
| Move | `1` | drag; with a selection it moves all selected nodes |
| Link | `2` | click the parent, a red line follows the mouse, click the child. Clicking an existing link removes it. A link that would create a loop is shown dimmer and the click does nothing |
| Edit | `3` | full node editor (six tabs, below) |
| Delete | `4` | click a node to delete it. `Del`, `X` or `Backspace` delete the hovered node or the whole selection, with any tool |
| Image | `6` or `I` | place and edit pictures on the tree (see [visuals](dev/visuals)) |
| Auto Complete | `5` | click a node to complete it ignoring costs and order (it still gives the rewards) |
| Collect all | `C` | outside the editor too: completes every available node you can afford, in one click |
| Reset node | in the panel footer | un-completes the node for you and, with team sharing on, for your teammates (personal nodes excepted) |
| Save | `Ctrl+S` | writes the tree file |
| Tree settings | button | progression mode, hide unreachable nodes, lock message, line style, currency, pictures, background |

Nodes and pictures snap to a 4 px grid when you drag them or add them.

The option *Autosave tree* in [Preferences](player/preferences) (off by default) saves the open tree 30 seconds after the first unsaved change. Without it nothing is written until you press `Ctrl+S`.

## Selection and editing

| Action | Keys |
| --- | --- |
| Box select | `Shift` + drag |
| Toggle selection | `Ctrl` + click |
| Select all | `Ctrl+A` |
| Copy, cut, paste | `Ctrl+C`, `Ctrl+X`, `Ctrl+V` (links between copied nodes survive) |
| Paste as children of the copied nodes | `Ctrl+Shift+V` |
| Duplicate | `Ctrl+D` |
| Undo, redo | `Ctrl+Z`, `Ctrl+Y` |
| Nudge | `Shift` + arrows, 4 px per press |
| Clear the selection | `Esc` |
| Redo (alternative) | `Ctrl+Shift+Z` |

## The node editor

The window has six tabs and shows two columns on a wide window. What you type is kept when you change tab. Each tab has a **?** button that opens the matching tutorial in the in-game help.

| Tab | Contents |
| --- | --- |
| **General** | title, description (big editor with live colour preview), icon, shape, size, lock message |
| **Options** | hidden, mystery, text, padlock and line hiding, personal, optional, difficulty, once in the world, repeatable, lab XP, autocomplete, rewards to buffer |
| **Links** | dependencies, parents needed, any parent, pick N of M, max children, exclusive nodes, visibility |
| **Requirements** | cost, XP levels and tasks |
| **Rewards** | rewards, reward tables, currencies |
| **Restrictions** | locked items per pattern with a flag set, stages granted |

## Creating a tree

To create a tree, put an item that has no tree yet into the centre slot and press **Save as tree**. A **preset** can fill the new tree for you, with up to 80 nodes in one of four layouts, a shape, an icon, a title pattern such as `Node %n`, a cost, XP, a reward XP, and the hidden, mystery and any-parent switches. Presets are stored on the client in `config/cyanotype/presets.snbt`, so they follow you between worlds.

## Pickers

Every id the editor asks for has a searchable picker with icons: items, tags, mobs, blocks, advancements, biomes, dimensions, structures and fluids. `Ctrl` + click selects several entries at once, and **Done** returns them all.

The pickers understand two shortcuts in the search box. Typing `@` followed by part of a mod id, such as `@cataclysm`, shows only what belongs to that mod. Typing `#` followed by part of a tag name lists the members of the matching tag, which is how you see what a tag actually contains before using it. In a picker that offers a choice between entries, tags and mods, as the restriction picker does, the **Mods** tab lists every mod and picks it as `modid:*`. Pressing Enter on a list produced by `@mod` or `#tag` picks everything in it in the pickers that accept several entries.

Advancements and structures are requested from the server, because the client does not know all of them.

## Descriptions with colour

Descriptions accept Minecraft colour codes and several lines, and the editor shows a live preview as you type. The codes are listed in [translations](dev/translations#colour-codes).
