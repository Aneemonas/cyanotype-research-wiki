# Sprites and textures

The pixel art of the machine screen is made of normal PNG files. A resource pack replaces any of them by shipping a file with the **same path**. The theme file only recolours; this page is about changing the art itself.

::video dev-resourcepack-sprites "Replacing button.png and frame.png in a resource pack"

## How the sprites are loaded

The GUI sprites are standard Minecraft 1.21 GUI sprites. The file `assets/cyanotype/textures/gui/sprites/<name>.png` is the sprite called `cyanotype:<name>`. Extra settings go in `<name>.png.mcmeta` next to it. They are stitched into the game's GUI atlas on every resource reload, so **F3+T** applies your edit.

Rules that apply to every sprite:

- **Same file name.** The mod asks for these names, nothing else.
- **Same size.** The mod draws many of them at a fixed size in GUI pixels. A bigger image will be squeezed, or cropped. Sizes are listed below.
- **Transparency is allowed** and expected (most icons are transparent around the shape).
- **Pixel art is drawn without smoothing.** Do not rely on blur or anti-aliasing.
- The `.mcmeta` of the original is part of the sprite. If you replace a nine-slice sprite, **copy its `.mcmeta` too** with the same numbers.

## Nine-slice sprites (stretchable)

These grow to any size. The border stays the same, the middle stretches. Their `.mcmeta` has the format below, shown for `button.png`:

```json
{
  "gui": {
    "scaling": {
      "type": "nine_slice",
      "width": 20,
      "height": 20,
      "border": 4
    }
  }
}
```

`width` and `height` are the **image size** and `border` is the width of the four corners in pixels. If you draw the sprite on a different canvas size, change these numbers to match.

| Sprite | Image size | Border | Where |
| --- | --- | --- | --- |
| `frame` | 48×48 | 14 | the machine frame around the whole screen (the middle is not drawn) |
| `viewport` | 24×24 | 4 | border of the tree area (the middle is not drawn) |
| `popup` | 32×32 | 8 | every popup window |
| `button`, `button_hover`, `button_active`, `button_disabled` | 20×20 | 4 | all buttons, by state |
| `field`, `field_focus` | 18×18 | 3 | text boxes |
| `codex_banner`, `codex_banner_purple`, `codex_banner_gold` | 32×32 | 8 | banners in the Codex and celebration |
| `codex_card`, `codex_card_done`, `codex_card_locked`, `codex_card_purple` | 32×32 | 6 | cards in the Codex |

:::warning
`frame`, `viewport`, `popup` and the Codex banners/cards are also drawn by a fast path ("Fast frames" in Preferences, on by default) that reads the PNG with the **original size and border built into the mod**. For these, keep the image size and the border exactly as listed. If you need different values, a player can turn *Fast frames* off, but the default path will look wrong, so keep the numbers.
:::

## Node sprites

Nodes are drawn from `node_<shape>_<state>.png`.

| Shape | Size | Sprites |
| --- | --- | --- |
| square | 24×24 | `node_square_locked`, `_available`, `_ready`, `_done`, `_master` |
| circle | 26×26 | `node_circle_…` (same five states) |
| diamond | 32×32 | `node_diamond_…` |
| hexagon | 30×30 | `node_hexagon_…` |
| socket (item node) | 24×24 | `node_socket_locked`, `_available`, `_ready`, `_done`, `_master` |

The states are: **locked** (cannot be reached), **available** (can be started), **ready** (everything is met, waiting for the player), **done**, **master** (the end of a branch). The size multiplier of a node (`scale`, 0.5 to 3) scales the sprite, so keep the original canvas.

`node_available.png`, `node_done.png` and `node_locked.png` (24×24) are in the files but I did not find code that uses them. They look like the old square set, so edit the `node_square_*` ones.

Other small pieces on nodes: `badge_done` (9×9, tick on a done node), `pin_mark` (7×7, pinned), `diff_peaceful`, `diff_easy`, `diff_normal`, `diff_hard` (7×7, the difficulty marks), `item_lock` (10×10, padlock on locked items in inventory and recipe viewers).

::video dev-resourcepack-nodes "The same tree with the default node sprites and with a custom set"

## Icons

All 16×16, transparent: `icon_arrow_down`, `icon_arrow_up`, `icon_auto`, `icon_bolt`, `icon_center`, `icon_check`, `icon_check_purple`, `icon_close`, `icon_codex`, `icon_collect`, `icon_crown`, `icon_dev`, `icon_drop`, `icon_edit`, `icon_expand`, `icon_eye`, `icon_flame`, `icon_full`, `icon_help`, `icon_image`, `icon_info`, `icon_inv`, `icon_link`, `icon_lock`, `icon_move`, `icon_newtree`, `icon_pin`, `icon_plus`, `icon_prefs`, `icon_redo`, `icon_reset`, `icon_reset_s`, `icon_save`, `icon_search`, `icon_shrink`, `icon_skin`, `icon_sort`, `icon_spark`, `icon_star`, `icon_team`, `icon_trash`, `icon_trophy`, `icon_undo`.

The names say what they are (`icon_save` is the save button). `icon_eye`, `icon_reset_s`, `icon_skin`, `icon_sort` and `icon_trophy` are shipped but I did not find a place that loads them.

## Currency icons

Virtual currencies use a set of 15 icons: `coin`, `crown`, `feather`, `flask`, `gem`, `heart`, `key`, `leaf`, `orb`, `scroll`, `shard`, `shield`, `skull`, `soul`, `star`. Each exists twice:

| File | Size | Used for |
| --- | --- | --- |
| `cur16_<name>.png` | 16×16 | big icon in the currency list and in requirements |
| `cur_<name>.png` | 6×7 | tiny icon next to numbers |

A currency chooses its icon in `currencies.snbt` by that name (see [Resources](dev/resources)). You can redraw all of them, but you cannot add a sixteenth: the list of names is fixed by the mod.

## Other sprites

| Sprite | Size | Where |
| --- | --- | --- |
| `slot` | 18×18 | inventory slots on the machine screen |
| `socket` | 28×28 | the big item slot in the middle of the machine |
| `header_arms` | 152×40 | decoration above the frame |
| `codex_emblem`, `codex_emblem_purple`, `codex_emblem_gold` | 32×32 | emblem in the Codex banner and celebrations |
| `hud_hex_cyan`, `hud_hex_gold`, `hud_hex_violet` | 24×24 | the lab level hexagon, changes with the level |
| `head_unknown` | 8×8 | placeholder head in the Team window |
| `pip_bolt`, `pip_box`, `pip_drop`, `pip_src` | 6×7 | tiny cost markers (energy, items, fluid, Source) in the node panel |

## The halo

`assets/cyanotype/textures/gui/halo.png` (64×64) is the soft glow image drawn behind ready, done and master nodes. It is tinted by the colours of the `halo` group in [theme.json](dev/theme#halo), so keep it grey/white with soft alpha if you want the colours to work. This one is a plain texture, not a sprite, and has no `.mcmeta`.

## Items and blocks

| File | Size | What |
| --- | --- | --- |
| `textures/item/*_blueprint.png` | 16×16 | the 30 blueprint items (alchemy, automation, aviation, building, combat, cooking, defense, dungeon, electrical, enchanting, end, engineer, exploration, factory, farming, fishing, fluid, forestry, logistics, magic, mining, nether, redstone, research, rotational force, smelting, space, steam, storage, trading; `research_blueprint` is the generic one) |
| `textures/item/research_station.png` | 16×16 | the station's item icon |
| `textures/block/barrier_gate.png` | 16×16 | the Barrier Gate block |

The models (`assets/cyanotype/models/item` and `block`) point to these names, so the same replace-by-name rule applies. The station block itself is not a texture of this kind: it is the animated model, see [Machine skins](dev/skins).

## Workflow that saves time

1. Open the mod jar as a zip and copy `assets/cyanotype/textures/gui/sprites/` out.
2. Keep only the files you change in your pack. A pack with 3 files works.
3. Edit with a pixel editor that keeps transparency and **does not resample** (Aseprite, LibreSprite, GIMP with the pencil tool, Paint.NET).
4. Enable the pack, open the machine screen, press `F3+T` after each save.
5. If a sprite shows as the purple-black missing texture, the name or the folder is wrong. If it looks stretched, the size is not the original.


## Checking your work

- The log (`logs/latest.log`) lists sprites or `.mcmeta` files that failed to parse.
- Open every state: hover a button, focus a text box, open a popup, open the Codex, complete a node.
- Test with a node of each shape (the tree settings and the node editor let you change the shape).
