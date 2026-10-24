# Customizing the look

Almost everything you see in Cyanotype Research can be changed by the pack maker without touching code. This page maps each thing to the file that holds it and to the page that explains it.

::video dev-customize-overview "A default machine next to the same machine with a custom theme, sprites, skin and background"

## What lives where

| What you want to change | How | Who sees it | Page |
| --- | --- | --- | --- |
| Colours of the GUI, glow, dust, popup animation, confetti | `assets/cyanotype/theme.json` in a **resource pack** | each player with the pack | [theme.json reference](dev/theme) |
| Frames, buttons, node shapes, icons, the glow image | PNG in `assets/cyanotype/textures/gui/` in a resource pack | each player with the pack | [Sprites and textures](dev/resource-pack) |
| Look of the machine block | a skin id in `settings.snbt`, optionally textures replaced by a resource pack | the skin id: everyone, from the server; textures: each player with the pack | [Machine skins](dev/skins) |
| Sounds | `assets/cyanotype/sounds.json` and `.ogg` files in a resource pack | each player with the pack | [Sounds](dev/sounds) |
| Texts of the GUI and of the trees | language files | each player (tree texts: the server sends them) | [Translations](dev/translations) |
| Background picture, floating pictures, effect and colour of **one tree** | tree settings (stored in the tree file) | everybody, the server sends the pictures | [Pictures and backgrounds](dev/visuals) |
| Your own GLSL background | `config/cyanotype/shaders/<name>.fsh` | every player needs the same file | [Custom shaders](dev/shaders) |
| Line style of a tree | tree settings | everybody | [Pictures and backgrounds](dev/visuals#line-styles) |
| Personal toggles (blur, effects, scale, sounds) | Preferences window | one player | [Preferences](player/preferences) |

The distinction that matters: **a resource pack is client-side**. Nothing in a resource pack is sent by the server, so everybody who should see your theme has to have the pack. Anything stored in the tree (pictures, background, effect, line style) or in `settings.snbt` (skin id) comes from the server and appears for everybody.

## Suggested order

1. Start with [theme.json](dev/theme). It is one small file, you see the result with `F3+T`, and a dozen palette keys recolour the whole GUI.
2. If you recoloured, replace the matching sprites ([Sprites](dev/resource-pack)). Frames and buttons are cyan PNGs, `theme.json` cannot recolour them.
3. Pick or make a [machine skin](dev/skins).
4. Give each tree its [background and pictures](dev/visuals). This is the part players notice most when they open a tree.
5. If the built-in effects are not enough, write a [shader](dev/shaders).
6. Last, replace [sounds](dev/sounds) if you want to.

## Making a resource pack for it

One pack can hold all of the above:

```text
CyanotypeLook/
  pack.mcmeta
  assets/cyanotype/
    theme.json
    sounds.json                      (only if you change sounds)
    lang/en_us.json                  (only if you change GUI texts)
    sounds/ui_click.ogg              (your replacement sounds)
    textures/
      gui/
        halo.png
        sprites/frame.png
        sprites/button.png  (+ .mcmeta)
        ...
      geo/research_station_geral.png (+ .mcmeta)
```

`pack.mcmeta` for 1.21.1:

```json
{ "pack": { "pack_format": 34, "description": "Cyanotype Research look" } }
```

Copy the original files from the mod's jar (open it as a zip, folder `assets/cyanotype/`) and edit the copies. Keep the **same names and sizes**: the mod looks for these exact names. Press `F3+T` in the game to reload.

:::tip
Work with a creative world open, the machine screen open and `F3+T` pressed after each save. Sprites, theme and sounds reload live, you do not need to restart.
:::

## What cannot be changed from a pack

- The **number of skins** or their ids (see [Machine skins](dev/skins)).
- The geometry of the machine (it is a model file, replacing it is outside what this wiki covers).
- Which sprite is used where. A sprite can only be replaced by another image with the same name.
- The fonts.
