# theme.json reference

`theme.json` holds every colour and every number that controls how the machine screen looks and moves: the palette, the line colours, the glow behind nodes, the floating dust, the popup animation, the confetti. The file is in the mod at `assets/cyanotype/theme.json`, and a resource pack can change any value in it **without copying the whole file**.

::video dev-theme-recolor "Editing theme.json in a resource pack and pressing F3+T: the whole GUI changes colour"

:::note
`theme.json` is about colours and numbers. The pixel art (frames, buttons, node shapes, icons, the glow texture) are normal PNG textures, and the machine model is a separate thing. See [Resource pack: sprites and textures](dev/resource-pack) and [Machine skins](dev/skins).
:::

## Where the file goes

Inside your resource pack, with exactly this path:

```text
MyPack/
  pack.mcmeta
  assets/
    cyanotype/
      theme.json
```

`pack.mcmeta` for Minecraft 1.21.1 (pack format 34):

```json
{
  "pack": {
    "pack_format": 34,
    "description": "My Cyanotype theme"
  }
}
```

Put the folder (or a zip with `pack.mcmeta` at its root) in `resourcepacks/` and enable it in *Options > Resource Packs*.

## How it is read

- The mod's own file is the base. Every resource pack that has the file is merged on top, in pack order, **key by key**. A pack only lists what it changes.
- **F3+T** reloads resource packs and the theme with them. You do not have to restart the game.
- Keys that start with `_` (like `_help`) are ignored. Use them for notes.
- A pack's file that is not valid JSON is **skipped completely** (one line in `latest.log`, nothing else breaks). A single wrong value is also not fatal: that key uses its default and the log gets a warning (it prints the first 5 and then the count).
- Numbers outside the range are clamped to the nearest limit. A number where the mod expects a colour (and the other way around) counts as an invalid value.
- Nested objects and dotted keys are the same thing. These two are equivalent:

```json
{ "palette": { "accent_3": "#FFB000" } }
```

```json
{ "palette.accent_3": "#FFB000" }
```

## Value types

| Type | How to write it |
| --- | --- |
| Colour | `"#RRGGBB"` (opaque) or `"#AARRGGBB"` (with alpha, `00` is invisible). `"0xRRGGBB"` also works. A plain JSON number is read as the ARGB value, so `16757248` is not a safe way to write a colour: use the string. |
| Reference | `"@palette.accent_3"` takes the value of another key. It can point to another reference (up to 8 steps). The reference is followed after the packs are merged, so if you only change `palette.accent_3`, every key that points to it follows. |
| Number | a JSON number. Times are in milliseconds, `*_alpha` and `*_opacity` go from 0 (invisible) to 1. |
| Switch | `true` or `false`. |
| Colour list | `[ "#RRGGBB", ... ]`, only for the confetti. **References do not work inside lists**, and one bad entry makes the whole list fall back to the default. |

The most useful fact in that table: almost everything points to the palette. To recolour the GUI you normally touch **a dozen palette keys**, not the 160.

## Palette

These are the base colours. Nearly all other groups reference them. The names describe the family: `accent_*` is the cyan of the default look, `violet_*` the purple used by master nodes and the Codex, `gold`, `danger`, `success` the status colours, `text_*` the text greys, `surface_*`, `row_*`, `edge`, `divider` the panels and lists, `viewport_*`, `grid_*`, `axis`, `void` the tree area, `header_*` the title bars, `toggle_*` the switches, `link_*` the red line you drag in the editor.

| Key | Default |
| --- | --- |
| `outline` | `#02040B` |
| `surface_0` | `#070B1A` |
| `surface_1` | `#0E1838` |
| `surface_2` | `#111C47` |
| `surface_3` | `#1C3C7E` |
| `panel` | `#0A1128` |
| `accent_0` | `#073746` |
| `accent_1` | `#0E6F8C` |
| `accent_2` | `#1FC4E4` |
| `accent_3` | `#2FE4FF` |
| `accent_4` | `#9FF6FF` |
| `accent_dim` | `#11A8C9` |
| `accent_shade` | `#0A6A86` |
| `violet_0` | `#1A0C40` |
| `violet_1` | `#35187F` |
| `violet_2` | `#6A3FE0` |
| `violet_3` | `#8A5CFF` |
| `violet_hi` | `#F3EAFF` |
| `violet_tint` | `#A982F5` |
| `violet_soft` | `#D9C6FF` |
| `violet_text` | `#C9AEFF` |
| `gold` | `#FFC531` |
| `gold_hi` | `#FFE98A` |
| `amber` | `#C98A0F` |
| `danger` | `#FF4F6A` |
| `danger_soft` | `#FF9CB4` |
| `danger_dark` | `#C21F45` |
| `success` | `#25E39A` |
| `success_hi` | `#A6FFD8` |
| `success_dim` | `#0F8A5E` |
| `text` | `#DCE8FF` |
| `text_soft` | `#B9C8EE` |
| `text_muted` | `#9FB0D8` |
| `text_dim` | `#6A7CAE` |
| `text_disabled` | `#4A5A80` |
| `text_on_active` | `#03222B` |
| `mystery` | `#8EA6E0` |
| `hover_tint` | `#4FE0F0` |
| `spark` | `#EAFFFF` |
| `spark_soft` | `#BFF6FF` |
| `spark_violet` | `#E4D6FF` |
| `row` | `#0F1A3E` |
| `row_hover` | `#1B3A7C` |
| `row_dark` | `#0B1230` |
| `row_gradient` | `#12275A` |
| `edge` | `#2A4A9A` |
| `edge_dim` | `#27428F` |
| `divider` | `#18326E` |
| `void` | `#050816` |
| `viewport_top` | `#0A1330` |
| `viewport_bottom` | `#060914` |
| `grid_major` | `#2A5AB0` |
| `grid_minor` | `#1A2C62` |
| `axis` | `#16306A` |
| `header_top` | `#14214F` |
| `header_bottom` | `#0A1230` |
| `header_text` | `#E6FFFF` |
| `bar_tip` | `#E8FDFF` |
| `toggle_hover` | `#7E9BE8` |
| `toggle_off` | `#5878D0` |
| `toggle_dot` | `#3A5FD0` |
| `toggle_track` | `#1A2A66` |
| `link_glow` | `#FFB0BC` |
| `link_invalid` | `#8A3040` |
| `link_invalid_glow` | `#B06070` |

## Lines

Colours of the connections between nodes, by the state of the node they lead to, plus the light pulses that travel along them.

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `lines.locked` | `@palette.surface_3` |  | line into a locked node |
| `lines.available` | `@palette.text` |  | line into an available node |
| `lines.available_glow` | `#FFFFFF` |  | its glow |
| `lines.ready` | `@palette.accent_2` |  | line into a ready node |
| `lines.ready_glow` | `@palette.accent_4` |  | its glow |
| `lines.done` | `@palette.success` |  | line between completed nodes |
| `lines.done_glow` | `@palette.success_hi` |  | its glow |
| `lines.master` | `@palette.violet_2` |  | line into a master node |
| `lines.master_glow` | `@palette.violet_hi` |  | its glow |
| `lines.wave` | `@palette.violet_2` |  | colour of the ripple that runs along the lines on completion |
| `lines.wave_glow` | `@palette.violet_hi` |  | its glow |
| `lines.pulse.speed` | `0.07` | 0 to 2 | speed of the light pulses travelling along connections |
| `lines.pulse.tail` | `10` | 1 to 40 | length of the pulse tail |
| `lines.pulse.glow_alpha` | `0.16` | 0 to 1 | opacity of the glow around a pulse |
| `lines.pulse.max_per_frame` | `60` | 0 to 1000 | pulses drawn per frame at most (budget for huge trees; 0 = none) |

## Halo

Soft glow behind ready, done and master nodes. It can be turned off in the player's Preferences too (*Node halos*).

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `halo.enabled` | true |  | master switch of the glow behind nodes |
| `halo.ready` | `@palette.accent_3` |  | glow colour, ready |
| `halo.done` | `@palette.success` |  | glow colour, done |
| `halo.master` | `@palette.violet_3` |  | glow colour, master |
| `halo.ready_opacity` | `0.45` | 0 to 1 | glow of ready nodes |
| `halo.ready_pulse` | `0.25` | 0 to 1 | how much the ready glow breathes |
| `halo.done_opacity` | `0.4` | 0 to 1 | glow of completed nodes |
| `halo.master_opacity` | `0.55` | 0 to 1 | glow of master (branch end) nodes |
| `halo.radius_extra` | `13` | 0 to 80 | glow radius beyond the node edge, in px |
| `halo.max_nodes` | `160` | 0 to 5000 | trees with more nodes than this get no halos (performance) |
| `halo.min_zoom` | `0.5` | 0 to 3 | no halos below this zoom |

## Nodes

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `nodes.selection` | `@palette.accent_3` |  | selection outline (editor) |
| `nodes.selection_march` | `@palette.accent_4` |  | the moving dashes of the selection |
| `nodes.hover_brackets` | `#FFFFFF` |  | corner brackets under the mouse |
| `nodes.search_flash` | `#FFFFFF` |  | flash colour after a search |
| `nodes.search_flash_ms` | `2200` | 200 to 20000 | how long the found node flashes after a search |
| `nodes.locked_shade` | `#AA050816` |  | dark veil over locked nodes |
| `nodes.undiscovered_shade` | `#EE050816` |  | veil over undiscovered Codex entries |
| `nodes.hold_grow` | `0.28` | 0 to 2 | how much a node grows while you hold to complete it |
| `nodes.hold_shake` | `2.2` | 0 to 20 | shake amplitude while holding, in px |
| `nodes.bounce` | `0.38` | 0 to 2 | size of the bounce when a node completes |
| `nodes.bounce_ms` | `520` | 50 to 5000 | duration of that bounce |
| `nodes.wave_grow` | `0.42` | 0 to 2 | growth of the ripple that runs through the tree when a node completes |
| `nodes.max_item_icons` | `140` | 0 to 2000 | item icons drawn per frame at most |
| `nodes.item_min_zoom` | `0.55` | 0 to 3 | item icons only appear above this zoom |

## Ambient

The "machine is alive" layer: the running light on the frame, the corner LEDs, the dust, the scan line and a few selection colours. The player can turn the whole group off in Preferences (*Ambient effects*) without touching the theme.

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `ambient.frame_light.enabled` | true |  | running light around the machine frame |
| `ambient.frame_light.length` | `34` | 2 to 400 | length of that light |
| `ambient.frame_light.period_ms` | `9000` | 500 to 120000 | time for one lap |
| `ambient.frame_light.head` | `@palette.spark` |  | head of the running light |
| `ambient.frame_light.tail` | `@palette.accent_3` |  | its tail |
| `ambient.corner_leds.period_ms` | `700` | 100 to 20000 | blink period of the corner LEDs |
| `ambient.corner_leds.on_a` | `@palette.accent_3` |  | LED colour A |
| `ambient.corner_leds.on_b` | `@palette.success` |  | LED colour B |
| `ambient.corner_leds.off` | `@palette.edge_dim` |  | LED off |
| `ambient.particles.count` | `26` | 0 to 300 | floating dust particles in the viewport |
| `ambient.particles.alpha_min` | `0.1` | 0 to 1 | minimum particle opacity |
| `ambient.particles.alpha_range` | `0.22` | 0 to 1 | random extra opacity added on top |
| `ambient.particles.color_bright` | `@palette.accent_4` |  | bright particles |
| `ambient.particles.color` | `@palette.accent_3` |  | normal particles |
| `ambient.scan_line.enabled` | true |  | faint line sweeping down the viewport |
| `ambient.scan_line.color` | `@palette.accent_3` |  | scan line colour |
| `ambient.scan_line.alpha` | `0.035` | 0 to 1 | opacity of the scan line |
| `ambient.scan_line.period_ms` | `7000` | 500 to 120000 | time for one sweep |
| `ambient.scan_line.height` | `10` | 1 to 100 | height of the soft trail, in px |
| `ambient.box_select.fill` | `#331FC4E4` |  | box selection fill |
| `ambient.box_select.edge` | `#CC2FE4FF` |  | box selection edge |
| `ambient.locked_slot_outline` | `#AAFF4F6A` |  | outline of locked slots |

## Popup, header, button, bars

### Popup

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `popup.backdrop_alpha` | `0.75` | 0 to 1 | how dark the screen gets behind a popup |
| `popup.backdrop` | `#030610` |  | backdrop colour |
| `popup.vignette_alpha` | `0.35` | 0 to 1 | darkening of the edges behind a popup |
| `popup.vignette` | `#000000` |  | vignette colour |
| `popup.glow_alpha` | `0.22` | 0 to 1 | glow around the popup |
| `popup.glow` | `@palette.accent_3` |  | glow colour |
| `popup.open_ms` | `170` | 1 to 3000 | opening animation time |
| `popup.open_scale` | `0.94` | 0.3 to 1 | starting scale of the opening animation (1 = no zoom) |
| `popup.open_scan_line` | true |  | scan line that crosses the popup while it opens |
| `popup.open_scan_line_color` | `@palette.accent_4` |  | opening scan line colour |

### Header

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `header.uppercase` | true |  | window titles in capitals |
| `header.glow_alpha` | `0.18` | 0 to 1 | glow under the title bar |
| `header.glow` | `@palette.accent_3` |  | glow colour |
| `header.highlight_period_ms` | `2600` | 200 to 60000 | time for the moving highlight to cross the title |
| `header.highlight` | `@palette.accent_4` |  | moving highlight colour |
| `header.underline` | `@palette.accent_1` |  | line under the title |
| `header.leds` | true |  | small LEDs on the title bar |

### Button

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `button.hover_glow` | `0.3` | 0 to 1 | glow when the mouse is over a button |
| `button.glow` | `@palette.accent_3` |  | hover glow colour |
| `button.shine` | true |  | shine that sweeps over buttons |
| `button.shine_alpha` | `0.16` | 0 to 1 | opacity of that shine |
| `button.shine_period_ms` | `900` | 100 to 20000 | duration of one sweep |

### Progress bars

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `bars.segment_px` | `8` | 2 to 64 | width of the segments drawn on progress bars |
| `bars.segment_alpha` | `0.33` | 0 to 1 | darkness of the segment separators |
| `bars.shimmer` | true |  | shimmer travelling over full bars |
| `bars.shimmer_period_ms` | `2200` | 200 to 60000 | time per pass (normal bars) |
| `bars.shimmer_alpha` | `0.345` | 0 to 1 | opacity (normal bars) |
| `bars.slim_shimmer_period_ms` | `2600` | 200 to 60000 | time per pass (thin bars) |
| `bars.slim_shimmer_alpha` | `0.31` | 0 to 1 | opacity (thin bars) |

## Codex and celebration

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `codex.card_cascade_ms` | `45` | 0 to 500 | delay between cards when the Codex opens (first 12 cards) |
| `codex.bar_fill_ms` | `700` | 1 to 10000 | time the Codex bars take to fill |
| `codex.sparkles` | true |  | sparkles in the Codex |

| Key | Default | Range | What it does |
| --- | --- | --- | --- |
| `celebration.confetti_tree` | see below |  | colours of the confetti when a tree is completed (list) |
| `celebration.confetti_codex` | see below |  | colours of the confetti when the Codex is completed (list) |
| `celebration.amount` | `1.0` | 0 to 5 | amount of confetti (1 = normal, 0 = none, 5 = a lot) |

The confetti lists in full:

```json
"celebration": {
  "confetti_tree":  ["#9FF6FF", "#4FE0F0", "#22B4CC", "#FFFFFF", "#F0594A", "#FFC13D"],
  "confetti_codex": ["#E4D6FF", "#A982F5", "#7A4FD6", "#D9C6FF", "#9FF6FF", "#F0594A", "#FFFFFF"]
}
```

## Recipes

### Warm orange accent

Change the cyan ramp and everything that references it (lines, halos, popup glow, header, buttons' glow, particles) follows:

```json
{
  "palette": {
    "accent_0": "#462407",
    "accent_1": "#8C500E",
    "accent_2": "#E4901F",
    "accent_3": "#FFB02F",
    "accent_4": "#FFE09F",
    "accent_dim": "#C98A11",
    "accent_shade": "#865A0A",
    "hover_tint": "#F0B04F",
    "spark_soft": "#FFEFBF"
  },
  "ambient": {
    "box_select": { "fill": "#33E4901F", "edge": "#CCFFB02F" }
  },
  "nodes": { "hover_brackets": "#FFE09F" }
}
```

The last two blocks exist because those values are written as plain colours in the default file instead of pointing to the palette.

:::warning
This changes only what `theme.json` controls. The frame, the buttons, the node shapes and the icons are PNG files and stay cyan until you replace them (see [the sprites page](dev/resource-pack)). A warm theme with cyan frames looks wrong, so plan to do both.
:::

### Calm screen for weak PCs or motion sensitivity

```json
{
  "lines": { "pulse": { "max_per_frame": 0 } },
  "halo": { "enabled": false },
  "ambient": {
    "frame_light": { "enabled": false },
    "particles": { "count": 0 },
    "scan_line": { "enabled": false }
  },
  "popup": { "open_ms": 1, "open_scan_line": false },
  "button": { "shine": false },
  "bars": { "shimmer": false },
  "codex": { "sparkles": false, "card_cascade_ms": 0 },
  "celebration": { "amount": 0 }
}
```

::video dev-theme-effects "The same tree with the default effects and with the calm preset above"

### Titles in normal case, softer popups

```json
{
  "header": { "uppercase": false },
  "popup": { "backdrop_alpha": 0.5, "vignette_alpha": 0.1, "open_scale": 1 }
}
```

### Bigger celebration

```json
{ "celebration": { "amount": 3 } }
```

## What the theme does not cover

- Sprites, node shapes, icons, frames, the halo image: normal textures, see [the sprites page](dev/resource-pack).
- The machine block's look: see [Machine skins](dev/skins).
- Texts: resource-pack language files, see [Translations](dev/translations).
- Sounds: `sounds.json`, see [Sounds](dev/sounds).
- Per-tree background picture and shader: set in each tree, see [Pictures and backgrounds](dev/visuals).

## If something looks wrong

1. Open `logs/latest.log` and search for `theme.json`. A bad file or value is reported there.
2. Check the commas and quotes. JSON accepts neither comments nor a trailing comma.
3. Confirm that the pack is enabled and above other packs that also ship the file.
4. Press `F3+T` again.
