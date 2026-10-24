# Custom shaders

Besides the built-in effects, a tree can use **your own GLSL fragment shader** as its animated background. It takes one `.fsh` file, with no JSON and no vertex shader, and this page follows the whole path from an empty file to a tree using it.

::video dev-shader-bg "Writing a shader file, pressing F3+T and picking it in the tree settings"

:::warning
A custom shader needs a real GPU and OpenGL, so check it on the machines of your players. A shader that fails to compile does not crash the game: it is logged and the tree uses a simple effect instead.
:::

## The file

Create `config/cyanotype/shaders/<name>.fsh` in the game folder.

- `<name>`: lowercase letters, digits and `_`, 1 to 32 characters (`myshader`, `nebula_red`, `grid2`). Anything else is ignored.
- The first run writes `config/cyanotype/shaders/_example.fsh.txt` with a working example. Copy it, rename the copy to `myshader.fsh` (remove the `.txt`).
- A resource pack can carry the same file as `assets/cyanotype/shaders/core/user_<name>.fsh` (note the `user_` prefix **in this location only**). Useful to ship a shader with the pack. Both places are found.
- Shaders are loaded when the game starts and on **F3+T**. Edit, save, press F3+T.

## What your shader gets

The mod generates the rest (the vertex shader and the program description), so you only write `main`:

```glsl
#version 150

in vec2 texCoord0;      // 0..1 across the view, (0,0) at the top left
out vec4 fragColor;

uniform float Time;     // seconds, keeps counting (frozen with "Reduce motion")
uniform vec2  Res;      // size of the view in real pixels
uniform vec2  Pan;      // how far the player dragged the tree, in pixels
uniform float Zoom;     // zoom of the tree view, 1.0 = 100 %
uniform vec3  Tint;     // the colour chosen in the tree settings, 0..1 per channel
```

- Declare only the uniforms you use. Names are case-sensitive.
- The only `in` is `texCoord0`.
- The version must be `#version 150`.
- **The result is added** to the picture behind it (additive blending). Black (`0,0,0`) adds nothing; the alpha you output is multiplied into what is added. Plan your shader in black and light, not in opaque colours.
- Nothing is drawn outside the tree area; you do not need to clip.

## Your first shader, step by step

A soft moving grid that follows the pan and tints with the colour of the tree:

```glsl
#version 150

in vec2 texCoord0;
out vec4 fragColor;

uniform float Time;
uniform vec2  Res;
uniform vec2  Pan;
uniform float Zoom;
uniform vec3  Tint;

void main() {
    // pixel position, centred on the view
    vec2 p = texCoord0 * Res - Res * 0.5;

    // the pattern slides with the drag and scales with the zoom
    p = (p - Pan * 0.4) / (48.0 * Zoom);

    // distance to the nearest grid line, 0 on a line
    vec2 g = abs(fract(p) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.04, min(0.5 - g.x, 0.5 - g.y));

    // a slow bright wave travelling through it
    float wave = 0.5 + 0.5 * sin(p.x * 0.6 + p.y * 0.4 - Time * 1.2);

    fragColor = vec4(Tint * line * (0.15 + 0.35 * wave), 1.0);
}
```

1. Save it as `config/cyanotype/shaders/grid2.fsh`.
2. In game press `F3+T`.
3. Open the editor, a tree, **Tree settings > Pictures and background**.
4. Click the effect button until it reads **Effect: custom shader grid2**. The button cycles: none, stars, aurora, streaks, embers, nebula, plasma, warp, then every custom shader found, then none again.
5. Change the colour box to see `Tint` change.

The tree file now stores:

```snbt
bg_fx: 8,
bg_shader: "grid2",
bg_fx_color: 7334399,
```

`bg_shader` is the **plain name**, without `user_` and without `.fsh`.

## Players need the shader too

The server sends the pictures of a tree, but **not shaders**. Each player must have the same `grid2.fsh` in their `config/cyanotype/shaders/` or in a resource pack they use. Without it, the effect is replaced by the simple fallback (stars). The easiest way for a modpack: put the `.fsh` in the pack's `config/cyanotype/shaders/` folder, which is already part of the modpack download.

## Debugging

| Problem | Likely cause |
| --- | --- |
| The shader does not appear in the effect button | wrong name (uppercase, hyphen, longer than 32), file extension is `.fsh.txt`, you did not press F3+T |
| The tree shows stars instead | the shader failed to compile. Read `logs/latest.log` for `shader … failed to load` |
| Black screen / nothing | you output black or tiny values. `Tint * 0.35` is already visible, a lone `0.02` is not |
| It looks too bright | additive blending: values over 1 clip to white. Keep the output below about 0.5 |
| The pattern jumps when the window resizes | you used raw pixel values; divide by `Res.y` |
| Wrong colour | `Tint` is 0 to 1 per channel (the tree's colour), not 0 to 255 |

Compile errors show the line number in the log.

## Ideas

- `Pan * 0.0` makes the background static, `Pan * 0.1` gives parallax, `Pan * 1.0` sticks to the tree.
- `pow(Zoom, 0.5)` as in the example gives a soft zoom response instead of a hard one.
- Use `Time` only through `sin`/`cos`/`fract`; it keeps counting for hours.

## Built-in shaders

`bg_nebula`, `bg_plasma` and `bg_warp` (effects 5, 6 and 7) live in `assets/cyanotype/shaders/core/` and use the same inputs. They are a good source for ideas: open the jar, read them, copy a part into your file.

The client option **Shader backgrounds** (`shader_backgrounds`) lets a player turn all GLSL effects off.
