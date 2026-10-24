# Preferences

The **Preferences** button on the machine screen opens your personal options. They are saved in `config/cyanotype-client.toml` (sections `appearance`, `gameplay`, `sound`) and apply to every world and server you join. A pack can ship that file to set defaults.

::video player-preferences "The Preferences window, its tabs, the search box and the High / Balanced / Low buttons"

The window has a **search box** at the top (it looks through every tab and shows only the matching rows) and four tabs: **General, Visual, HUD, Audio**. With dev mode on (`/cyanotype dev true`) two more appear, **World** and **Machine**; those are pack-wide settings, see [World settings](dev/settings).

Every visual option is **on by default**, except the blur, so a fresh install shows the mod at its best and the options below are for dialling things back.

## General

| Option | Key | Default | Effect |
| --- | --- | --- | --- |
| Open full screen | `open_fullscreen` | on | the machine opens already maximised. `M` toggles it |
| Hover panel | `hover_panel` | on | the details panel shows while you hover a node |
| Side panel scale | `side_panel_scale` | 100 % | 50 to 150, size of the panel and its contents. It also shrinks on its own in a small window |
| Toasts | `toasts` | on | the pop-up notifications. The activity log in the Codex still records them |
| Auto-open Codex | `auto_open_codex` | on | in Quest Book mode, open the Codex when the machine has no tree |
| Hold time | `hold_ms` | 900 ms | 100 to 3000, how long you hold the button to complete a node |
| Socket: open inventory | `socket_auto_inventory` | on | clicking a node that asks for an item opens the inventory bar, and clicking elsewhere closes it |
| Pause in single player | `pause_in_singleplayer` | off | pauses the game while the screen is open. Off: the machine and the world keep running |
| Autosave tree | `autosave_tree` | off | dev mode only. Saves the tree 30 s after the first unsaved change, like `Ctrl+S` |
| EMI reload after unlock | `emi_auto_reload` | on | one EMI reload when you close the screen, if what is hidden changed |
| EMI live update | `emi_live_update` | on | updates EMI without a reload; falls back to the reload when it cannot. See [JEI and EMI](dev/recipe-viewers) |
| Hide other mods' buttons | `hide_foreign_buttons` | on | removes the sort/move/settings buttons that other mods add to every container screen, only the machine's own stay |

The width of the side panel can also be dragged by the arrow on its left edge (`side_panel_extra_width`, 0 to 1200 px, not shown in the window).

## Visual

| Option | Key | Default | Effect |
| --- | --- | --- | --- |
| Reveal animation | `reveal_animation` | on | nodes and lines unfold when the machine opens or the item is placed, and fold when removed |
| Ambient effects | `ambient_effects` | on | master switch of the next five |
| Blur background | `blur_background` | **off** | vanilla blur behind the screen, heavy on weak GPUs |
| Particles | `particles` | on | floating dust in the tree area (needs ambient effects) |
| Scan line | `scan_line` | on | faint line that sweeps the tree area (needs ambient effects) |
| Frame lights | `frame_lights` | on | running light and blinking LEDs on the frame (needs ambient effects) |
| Node halos | `node_halos` | on | glow behind ready and done nodes (needs ambient effects) |
| Connection pulses | `connection_pulses` | on | light pulses along the lines |
| Portal ring | `portal_effect` | on | rotating ring on nodes that depend on, or exclude, a node of another tree |
| Grid | `grid` | on | dotted grid in the tree area |
| Difficulty marks | `difficulty_marks` | on | small icons on nodes that exist only on some difficulties |
| Sparks, Codex button | `sparks_codex_button` | on | sparks when something unlocks |
| Sparks, tree centre | `sparks_tree_center` | on | sparks at the centre of the tree |
| Reduce motion | `reduce_motion` | off | removes the shake, grow and bounce of nodes and freezes the background effect clock |
| Tree pictures | `tree_images` | on | draws the background picture, floating pictures and the animated background effects of trees. Off saves memory and bandwidth |
| Shader backgrounds | `shader_backgrounds` | on | allows the GLSL backgrounds. Off: a simple effect takes their place. See [custom shaders](dev/shaders) |

**Presets.** The *High / Balanced / Low* buttons set several of these at once:

| | High | Balanced | Low |
| --- | --- | --- | --- |
| Blur | on | off | off |
| Ambient effects, frame lights, pulses, sparks, reveal animation, progress HUD | on | on | off |
| Particles, scan line, node halos | on | off | off |

All three leave the grid and the portal ring on.

**Performance.**

| Option | Key | Default | Effect |
| --- | --- | --- | --- |
| Fast frames | `fast_frames` | on | draws the big frames in one call instead of thousands of tiles. Turn it off only if a frame looks wrong |
| Screen FPS limit | `screen_fps_limit` | 0 (off) | 0 to 260. Lowers the frame rate cap while the screen is open; the previous limit returns when it closes. It only lowers, never raises |

## HUD

| Option | Key | Default | Effect |
| --- | --- | --- | --- |
| Progress HUD | `progress_hud` | on | lab level, XP and the combo counter (cosmetic) |
| Show energy | `show_energy` | on | FE gauge in the Codex and beside the lab level |
| Show fluid | `show_fluid` | on | fluid buffer gauge |
| Show other resources | `show_sources` | on | mana and other Sources |
| Show currencies | `show_currencies` | on | your virtual currencies |

## Audio

| Option | Key | Default | Effect |
| --- | --- | --- | --- |
| Machine sound | `machine_sound` | on | the hum of the placed station |
| UI sounds | `ui_sounds` | on | clicks, popups, nodes and everything else in the screen |

To change the sounds themselves, see [Sounds](dev/sounds).

## One more key

Under *Controls > Cyanotype Research* there are two bindings:

| Binding | Default | Use |
| --- | --- | --- |
| Show the nodes of the hovered item | `Y` | over an inventory item (or in JEI/EMI): marks every node that asks for or rewards it. `Tab` then walks through them (`Shift+Tab` goes back); `Y` over nothing clears it |
| Open the machine (portable) | unbound | opens the machine from anywhere when the pack enables `portable_machine` |

## Cheapest screen for a weak PC

Start by pressing **Low**, which already turns off the ambient effects, particles, scan line and halos, and leave the blur off. Then set a screen FPS limit of about 60, which stops the machine screen from spending frames you will not see, and bring the side panel scale down to 90 if the screen feels cramped. When the pack uses animated or shader backgrounds, switching off *Tree pictures* removes the last of the heavy drawing at the cost of the backgrounds.
