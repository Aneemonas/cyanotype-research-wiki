# Sounds

All sounds of the mod are normal Minecraft sound events, declared in `assets/cyanotype/sounds.json` with `.ogg` files in `assets/cyanotype/sounds/`. A resource pack can replace any of them, or silence them.

::video dev-sounds-replace "Replacing ui_click.ogg in a resource pack"

## Replacing a sound

Ship an `.ogg` file with the **same name** in your pack:

```text
assets/cyanotype/sounds/ui_click.ogg
```

`F3+T` reloads sounds. Rules for the file: Ogg Vorbis, **mono** if you want the sound to be positional in the world (the machine hum); the UI sounds play flat and can be stereo. Keep them short, the UI sounds play very often.

To change which files an event uses (for example to add variation), ship your own `sounds.json`. Minecraft merges the file of every pack by event name:

```json
{
  "ui_click": {
    "sounds": [
      "cyanotype:ui_click",
      "cyanotype:my_click_2"
    ]
  }
}
```

(a second file `assets/cyanotype/sounds/my_click_2.ogg`). The machine hum uses this to rotate four variations.

To silence an event, replace its `.ogg` with a short silent file. Players can also turn off the GUI sounds and the hum in Preferences (*UI sounds*, *Machine sound*), and Minecraft's own volume sliders apply to everything.

## The events

42 events are declared. When each one plays, from reading the code:

| Event | When |
| --- | --- |
| `ui_click` | every button click, list selections |
| `ui_hover` | the mouse enters a button (quiet) |
| `ui_tab`, `ui_toggle_on`, `ui_toggle_off` | switching tabs, switches in Preferences and editors |
| `ui_error` | invalid action: creating a tree without a name, collect all with nothing to collect, clicking a node that cannot be completed |
| `ui_close`, `popup_open`, `popup_close` | popups and closing things |
| `tool_switch` | changing the editor tool; also following a link in the in-game help |
| `machine_open`, `machine_close` | the machine screen opens and closes (opening plays once, a window resize does not repeat it) |
| `machine` | the hum of the placed station (4 variations, with a subtitle) |
| `node_select` | selecting a node, picking the start of a link |
| `node_place`, `node_delete`, `link_make` | editor: add, delete, create a link |
| `node_pop`, `node_unpop` | nodes appear / fold when the tree opens or closes (pitch rises with the depth) |
| `node_ready` | a node became ready (everything met) |
| `socket_fit` | an item enters a socket node |
| `hold_tick` | while holding to complete a node (the pitch rises with progress) |
| `wave_tick` | each step of the ripple through the tree after a completion |
| `research_done` | node completed (played by the server at the player's position, so people nearby hear it) |
| `tree_create` | a tree is created |
| `tree_reveal` | the tree appears |
| `tree_complete`, `codex_complete` | the celebration for a finished tree and for a finished Codex |
| `codex_tick` | Codex cards and some list items |
| `choice_pick` | picking an option of a choice reward |
| `lock_deny` | clicking a node that is locked for good |
| `xp_gain`, `combo`, `level_up` | the progress HUD |
| `charge` | the machine receives energy |
| `skin_apply` | applying a machine skin |
| `ui_open`, `ui_confirm`, `ui_scroll`, `ui_type`, `reward_claim`, `panel_slide` | declared and shipped, but I did not find code that plays them in this version |

Events that show a subtitle with captions on (`codex_complete`, `combo`, `level_up`, `lock_deny`, `research_done`, `reward_claim`, `tree_complete`, `xp_gain`, `machine`, `machine_open`, `machine_close`) read it from `subtitles.cyanotype.<event>` in the language files.

## Replacing by a vanilla sound

You can point an event at a vanilla sound without shipping any file:

```json
{
  "level_up": {
    "sounds": [
      { "name": "minecraft:entity.player.levelup", "type": "event" }
    ]
  }
}
```

`"type": "event"` tells Minecraft that the name is another sound event, not a file.

## Where the pitch comes from

Several sounds change pitch while they play (`hold_tick`, `node_pop`, `wave_tick`, `combo`, `xp_gain`). The code sets the pitch, so a replacement sound should be a **neutral, short tone**: it will be played higher or lower than recorded.
