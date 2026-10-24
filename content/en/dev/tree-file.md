# The tree file

A tree is one SNBT file, `config/cyanotype/trees/<id>.snbt`, and the file name without the extension is the tree's id. Ids are 1 to 48 characters from `a-z`, `0-9`, `_` and `-`.

```snbt annotated example (comments are NOT allowed in a real file)
{
  id: "example",                          // file name without .snbt
  input: "cyanotype:research_blueprint",  // "modid:item" or "#modid:tag"
  quest_mode: false,                      // Quest wording for this tree
  flexible: false,                        // true: nothing is linked to the centre
  hide_dead: false,                       // hide nodes that can never be researched
  lock_message: "Come back after the nether.",   // default for locked nodes (not translated)
  nodes: [ { /* ... */ } ]
}
```

The fields on the tree itself are listed below, and the fields of each node have their own page, [node fields](dev/node-fields).

## Tree fields

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | the tree id |
| `input` | string | the item (or `#tag`) that opens the tree in Legacy mode |
| `quest_mode` | bool | Quest wording for this tree |
| `flexible` | bool | true: nodes without parents just start, nothing is linked to the centre |
| `hide_dead` | bool | hide nodes that can never be researched |
| `lock_message` | string | default message for locked nodes |
| `line_style` | int | 0 elbow (V-H-V), straight, snake, smooth curve, chamfered, elbow (H-V-H), steps |
| `currency` | string | the currency of this tree (filters the bottom bar) |
| `cur_cost`, `cur_reward` | int | base currency cost and reward |
| `lab_xp` | int | override of the XP of a finished tree (-1 = world value) |
| `images`, `bg_image`, `bg_mode`, `bg_alpha`, `bg_fx`, `bg_fx_color`, `bg_shader` | | pictures and backgrounds, see [Pictures and backgrounds](dev/visuals). `bg_shader` is the plain name of a [custom shader](dev/shaders), used when `bg_fx` is 8 |
| `nodes` | list | the nodes, see [node fields](dev/node-fields) |

:::note
`title` of a tree and its nodes is **not** stored here once the editor has saved the file. They move to `lang/en_us.json` (see [translations](dev/translations)). You may still write `title` and `description` in a hand-written file: they are imported to `en_us` on load.
:::

## Old files

Files written by older versions are migrated when they load. Fields such as `commands`, `reward_items`, `reward_xp_levels`, `reward_xp_points`, `reward_message` and `lock_flags` are converted to the current rewards and masks, duplicated node ids are dropped, and reward types the mod does not know are dropped too. Task types the mod does not know are kept but never block, which is described in [requirements](dev/requirements).

## Reloading

`/cyanotype reload` reloads the trees, the language files and the reward tables and resyncs every connected player, so you can edit a file in your editor of choice and see the result without restarting the game.

## SNBT tips

The files are read with Minecraft's own SNBT parser, which is stricter than JSON in a few ways that catch people out.

Strings use double quotes, and keys do not need quotes. A list is written `[a, b]`, but an **int array** has an `I;` at the start, `[I; 1, 2]`, and fields that the mod expects as int arrays, such as `lock_masks`, will not load if they are written as a plain list. Comments are not allowed at all, because the parser has none, so the `//` notes in the annotated example above are only there to explain it and have to be removed in a real file. A comma after the last item of a list or a compound is an error as well. Numbers follow SNBT rules, so `0` is an int and `1.5f` is a float, and the `x`, `y` and count fields of a node are ints.

If a file does not parse, the log says `Error reading` with the file name and the position, and the mod skips that file.
