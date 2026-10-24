# Pictures and backgrounds

Every tree can have its own **background picture**, an animated **background effect**, floating **pictures** placed on the tree, and a **line style**. All of it is stored in the tree file, so the server sends it and nobody has to install anything to see it.

Open the editor (`/cyanotype dev true`), open the tree, press **Tree settings** and then **Pictures and background**.

::video dev-bg-effects "Cycling the background effects of a tree and changing the colour"

## Layers

From back to front, what is drawn in the tree area:

1. the void colour;
2. the **background picture**;
3. the **background effect** (stars, aurora, a shader...), drawn over the picture;
4. the dotted grid (the player can turn it off);
5. pictures set to *Behind*;
6. the lines, then the nodes;
7. pictures set to *Above*.

Shader effects are **added** to what is behind them (black adds nothing), so the picture stays visible under a shader.

## Background picture

| Tag | Meaning |
| --- | --- |
| `bg_image` | name of the picture (see below) |
| `bg_mode` | `0` cover the view, `1` tiled at its own size, `2` cover and drift slowly when you pan |
| `bg_alpha` | opacity from 1 to 100 (default 100) |

- **Cover** scales the picture to fill the view. Choose a picture with the same proportions as a wide window (16:9 works for most).
- **Tiled** repeats the picture at its own size. Use a seamless texture.
- **Drift** fills the view and moves slowly when you drag the tree, giving a feeling of depth.
- Lower `bg_alpha` (30 to 60) when the picture competes with the nodes. Text on top of a bright picture is the number one readability problem in a tree.

::video dev-bg-picture "Cover, tiled and drift on the same picture, and the opacity slider"

## Picture names

The tag stores a **name**, not a path.

- A **name** like `forest_night` (lowercase letters, digits, `_` and `-`, at most 48 characters, no extension) is a PNG on the **server** at `config/cyanotype/images/forest_night.png`. A dev uploads it from the window (a path on their own computer; the server saves it with the name given), or you drop the file into that folder by hand.
- A name like `game:minecraft:textures/gui/title/background/panorama_0.png` (`game:<namespace>:<path>`) uses a **texture the game already has**: vanilla, a mod, or a resource pack. Nothing to upload. The *Game assets* tab of the picker lists them all with a search box.

Limits for uploaded pictures: 12 MB, 16384 px on each side, 64 pictures per tree. Clients ask for the pictures of a tree the first time they are drawn and keep them until logout.

:::tip
For a modpack, prefer `config/cyanotype/images/` (it ships with the pack, the server sends it to everybody) over `game:` names that depend on a resource pack every player must also have.
:::

## Pictures on the tree

The tag `images` is a list. Each element:

```snbt
images: [
  { file: "castle", x: 0, y: -120, w: 256, h: 0, front: 0b, alpha: 80 }
]
```

| Field | Meaning |
| --- | --- |
| `file` | picture name (as above) |
| `x`, `y` | **centre** of the picture, in tree units (the same units as node positions) |
| `w`, `h` | size in tree units. `0` = the picture's own size. Set only one to scale it keeping the proportions |
| `front` | `1b` draws it above lines and nodes, otherwise behind them |
| `alpha` | opacity 1 to 100 |

Use pictures for region labels ("Nether branch"), a big logo behind the trunk, arrows, or a scenic piece behind a whole branch.

The **Image tool** (key `6` or `I`) lets you place, drag and resize them on the tree itself, with a snap of 4 px. A picture whose file is missing shows an outline with its name instead.

::video dev-images "Placing a picture on a tree with the Image tool"

## Background effects

`bg_fx` picks the effect, `bg_fx_color` its colour.

| `bg_fx` | Effect | Kind |
| --- | --- | --- |
| `0` | none | |
| `1` | stars: three layers of twinkling points that move at different speeds when you pan | drawn with the interface |
| `2` | aurora: two ribbons of colour | drawn with the interface |
| `3` | streaks: small comets crossing the view | drawn with the interface |
| `4` | embers: rising sparks | drawn with the interface |
| `5` | **nebula** | GLSL shader that ships with the mod |
| `6` | **plasma** | GLSL shader that ships with the mod |
| `7` | **warp** | GLSL shader that ships with the mod |
| `8` | **custom shader**, named by `bg_shader` | your own GLSL file, see [Custom shaders](dev/shaders) |

`bg_fx_color` is the effect colour as a **single decimal number** (`0xRRGGBB`). The default is `7334399` (`#6FE9FF`). In the window you type it in hex without `#`. In a hand-edited SNBT file the value must be decimal, SNBT in 1.21.1 does not accept `0x` literals:

| Colour | Decimal |
| --- | --- |
| `#6FE9FF` cyan (default) | `7334399` |
| `#FF6B3D` orange | `16739133` |
| `#9B6BFF` violet | `10186751` |
| `#59E08A` green | `5857418` |
| `#FFFFFF` white | `16777215` |

(Compute any other with `R × 65536 + G × 256 + B`.)

Example of the three tags in a tree file:

```snbt
bg_fx: 2,
bg_fx_color: 10186751,
bg_image: "forest_night",
bg_mode: 2,
bg_alpha: 55,
```

### Fallbacks

- The shader effects (5 to 8) need the GLSL program to load. If the program is missing or failed to compile, or the player turned off *Shader backgrounds* in the client config (`shader_backgrounds`), the screen draws a simple effect in its place: 5 becomes stars, 6 aurora, 7 streaks, 8 stars. The tree never shows an empty background because of this.
- With **Reduce motion** on, the effect clock stops (it is frozen at a fixed moment).
- The client option `tree_images` turns off **all** of this for a player: the background picture, the floating pictures and the effects (it is the "save memory and bandwidth" switch).

:::note
If a shader pack or an old GPU draws the GLSL backgrounds wrongly, switch the tree to one of the effects from 1 to 4. They do not use shaders.
:::

## Line styles

Tree settings > **Line style**, stored as `line_style`:

| Value | Style | Look |
| --- | --- | --- |
| `0` | elbow (vertical, horizontal, vertical) | the default, crisp pixel lines |
| `1` | straight | a straight diagonal |
| `2` | snake (S) | one S curve |
| `3` | smooth curve | a smooth curve |
| `4` | chamfered | an elbow with cut corners |
| `5` | elbow (horizontal, vertical, horizontal) | good for trees that grow sideways |
| `6` | steps | staircase |

Styles `0` and `5` stay pixel-sharp. The diagonal and curved styles are drawn with an anti-aliased line renderer, which looks slightly different next to the pixel art. Pick one style per tree and keep the same across the pack.

## Which to pick

| You want | Use |
| --- | --- |
| a calm, readable tree | no picture, `bg_fx` 1 (stars), a muted colour |
| a magic or end-game branch | `bg_fx` 2 (aurora) or 5 (nebula) in violet |
| industrial / machine | `bg_fx` 4 (embers) in orange, or a tiled blueprint texture at `bg_alpha` 30 |
| a story or region feeling | a cover picture at `bg_alpha` 40 to 60, plus a few labelled pictures |
| something that only you have | your own [shader](dev/shaders) with `bg_fx` 8 |
