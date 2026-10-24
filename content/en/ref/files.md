# Files and folders

| File | What |
| --- | --- |
| `config/cyanotype/trees/*.snbt` | the trees |
| `config/cyanotype/settings.snbt` | world options (Quest Book, wording, skin, lab level, hints, teams, operating cost, buffers, fallback language, world reload) |
| `config/cyanotype/lang/<code>.json` | titles and descriptions of trees and nodes per language (`en_us.json` is written by the editor) |
| `config/cyanotype/reward_tables.snbt` | global reward tables |
| `config/cyanotype/sources.snbt` | extra resources (Sources) |
| `config/cyanotype/currencies.snbt` | virtual currencies |
| `config/cyanotype/functions/<id>.cyan` | scripts of Function rewards |
| `config/cyanotype/images/<name>.png` | pictures used by trees |
| `config/cyanotype/shaders/<name>.fsh` | custom background shaders |
| `config/cyanotype/presets.snbt` | tree presets of the dev (client) |
| `config/cyanotype-client.toml` | personal client options (also editable in Preferences) |
| `data/<ns>/cyanotype/trees/*.snbt`, `data/<ns>/cyanotype/lang/<code>.json` | trees and texts shipped by datapacks or mods |
| `assets/cyanotype/theme.json` | GUI colours and effects; copy it into a resource pack and keep only the keys you change (`F3+T` reloads) |
| `<world>/data/cyanotype_progress.dat` | player progress (teams in their own `.dat`) |

Data written under the old name of the mod (`aeroassembler`) is moved on the first start. Nothing is overwritten.

## What to ship with a pack

- `config/cyanotype/` (trees, lang, settings, sources, currencies, reward tables, functions, images).
- `config/cyanotype-client.toml` as defaults for players, if you want different defaults.
- A resource pack with `theme.json` or textures, if you restyle the GUI.

## Safety copies

Every file the mod writes keeps a `name.bak` of the previous good version. If a file is empty or corrupt, the backup is read instead. A tree file that cannot be read is skipped and logged, never overwritten.
