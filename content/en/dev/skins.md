# Machine skins

The Research Station block is an animated 3D model (GeckoLib). A **skin** is the texture painted on that model. The pack has five skins, and one of them is active for the whole server.

::video dev-skin-picker "Opening the skin picker in dev mode and applying each skin"

| Skin id | Name in the picker | Texture file |
| --- | --- | --- |
| `default` | Default | `textures/geo/research_station.png` |
| `geral` | General | `textures/geo/research_station_geral.png` |
| `create` | Create | `textures/geo/research_station_create.png` |
| `aco` | Steel | `textures/geo/research_station_aco.png` |
| `dungeon` | Dungeon | `textures/geo/research_station_dungeon.png` |

(The names come from `skin.cyanotype.<id>` in the language files.)

## Choosing the skin

An operator can pick the skin in game, in **Preferences > Machine > Machine skin**, where each skin is a card with its animation running and white corners mark the one in use. Click a card and press apply. The same choice can be written by hand in `config/cyanotype/settings.snbt` as `machine_skin: "geral"`.

The choice is a **world-independent server setting** that is synced to every player, so the whole pack shows the same machine. See [World settings](dev/settings).

## What a skin is, technically

- The model is `geo/research_station.geo.json` and has a texture size of **64×80**. The animation `running` lasts **3.2 s**.
- Each skin texture is a vertical strip of **64 frames, 64×80 each**, so the PNG is **64×5120**. Its `.mcmeta` plays the strip:

```json
{ "animation": { "frametime": 1, "width": 64, "height": 80 } }
```

`frametime: 1` is one game tick per frame, so 64 frames take 3.2 s, matching the model animation. This is how the fans, the three arms and the sheet change colour and glow over time while the UV layout stays the same.

- Every frame uses the **same layout**. To make a skin, open an existing strip, and repaint each frame by following the layout of the first one. The easiest method is to paint the 64×80 frame once as a still, then duplicate and animate only the parts that move or glow (lights, screen, props).

The model has these named parts, useful when reading the strip: `body`, `fan_east_frame`, `fan_west_frame`, `sheet`, three robotic arms (`a1_*`, `a2_*`, `a3_*`: base, yaw, lower, upper, claw, grips) and the propellers `prop_east` and `prop_west`.

## The picker preview

The cards in the skin picker use a pre-rendered animation:

| File | Size | Layout |
| --- | --- | --- |
| `textures/gui/skins/preview_<id>.png` | **624×1040** | 64 frames in 8 columns × 8 rows, each frame **78×130** |

The `.mcmeta` of the preview is `{"texture":{"blur":true}}` (smoothed, since it is a render, not pixel art). If you change a skin's texture but not its preview, the picker still shows the old look.

## Changing the look of an existing skin

Because skins are chosen by id, a resource pack can **repaint** them:

1. Ship `assets/cyanotype/textures/geo/research_station_geral.png` (or whichever id) with its `.mcmeta` copied.
2. Optionally ship the matching `textures/gui/skins/preview_geral.png` so the picker is honest.
3. `F3+T`.

This repaints the skin on **every client that has the pack**. Players without the pack see the original texture of that id.

:::note
A texture with the right name but the wrong size does not look like a distorted skin, it looks like **garbage**: the model reads fixed positions of a 64×80 frame. If the machine looks scrambled, check the strip size first.
:::

## Adding a sixth skin

The list of skins is an enum inside the mod: the ids `default`, `geral`, `create`, `aco` and `dungeon` are fixed. A resource pack **cannot** add a new id. What you can do:

- repaint one of the five and use that id (the easiest way to have a "custom" machine in your pack);
- ask for a new id in the mod (it needs a code change: the enum, the two textures and a language key `skin.cyanotype.<id>`).

## Static skins

A skin does not have to animate. I have not tested it, but a single 64×80 PNG without the `animation` block should work as a still skin, since the model's texture size is 64×80. Because of that doubt, if you want a still machine, keep the strip and repeat the same frame 64 times (guaranteed to work) instead of shipping a smaller file.

::video dev-skin-compare "The five skins running side by side"
