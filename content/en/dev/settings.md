# World settings

World options are stored in `config/cyanotype/settings.snbt` and apply to the whole world. Most of them can also be changed in game. Turn dev mode on with `/cyanotype dev true` and the **Preferences** window gains the **World** and **Machine** tabs, which hold the options below. Changes are sent to the server, written to the file and applied to everybody, and the file is written atomically with a `.bak` copy.

| Key | Default | Meaning |
| --- | --- | --- |
| `quest_book_mode` | false | Quest Book (Codex) instead of Legacy |
| `quest_wording` | false | Quest / Complete wording |
| `rpg_mode` | false | Skill / Learn wording |
| `fallback_locale` | `en_us` | language used when the player's language has no text |
| `machine_skin` | `default` | `default`, `geral`, `create`, `aco`, `dungeon` |
| `recipe_lock_world_reload` | false | datapack reload when the world layer of the recipe lock changes |
| `portable_machine` | false | the machine can be opened without a placed block |
| `run_fe` | 0 | operating cost in FE per research |
| `run_fluids`, `run_sources` | empty | operating cost in fluids and Sources (lists of `{id, amount}`) |
| `lab_level` | true | HUD and lab level requirement |
| `lab_xp_node`, `lab_xp_tree` | 10, 50 | XP per node and per tree (a node or tree can override) |
| `item_hints` | true | tooltips "Research item" and "Needed for" |
| `teams_enabled` | true | the Team button and shared progress |
| `team_rewards_all` | true | true: everybody receives the rewards; false: only who collected |
| `team_max` | 8 | members per team (2 to 64) |
| `scoreboard` | true | objectives `cyanotype_progress` (0 to 100) and `cyanotype_nodes` |
| `buffer_fe`, `buffer_mb`, `buffer_src` | **0, 0, 0** | machine buffers: energy, fluid, Source (0 to 2 000 000 000) |
| `bucket_fill` | true | right click with a bucket fills the machine |
| `scan_radius` | 20 | proximity scans run only with a player this close (4 to 64) |

## Teams

Three keys control teams: `teams_enabled`, `team_rewards_all` and `team_max`. When a member completes a node, sharing marks the node as done for the others, discovers the tree for them, grants the stages, optionally gives the rewards and posts the same events. Nodes that are blocked for a teammate, because they took the other branch, are skipped. Members who are offline get pending entries delivered at login, and all teams are saved with the world. See [teams](player/teams) for how it looks to a player.

## Where each option is in the window

| Tab | Contains |
| --- | --- |
| World | the machine skin button, the three wording modes (Research, Quest, Skill), *Codex access* (`quest_book_mode`), lab level, item hints, teams, team rewards, the fallback language with *Apply*, and the reward tables button |
| Machine | the operating cost (FE, fluids, Sources), the three buffers with *Apply*, bucket fill, portable machine, scan radius, XP per node and per tree, and the currencies and resources button |

The three wording modes are mutually exclusive and only change the words, as described in [opening a tree](player/opening-trees). Whether trees open through the Codex is a separate switch, *Codex access*. Stress units (SU) appear in the Machine tab as not supported yet, so define a Source for them instead, see [resources](dev/resources).

## Machine skins

The skin is one of `default`, `geral`, `create`, `aco` and `dungeon`. It only changes the look of the block, and the choice is synced to every player. How skins work and how to repaint them is in [machine skins](dev/skins).

## Client config

Each player's personal options are in `config/cyanotype-client.toml`, in the sections `appearance`, `gameplay` and `sound`. A pack can ship that file to set defaults. Every key, its default and its range are on the [preferences page](player/preferences).

## The other settings files

| File | What it holds |
| --- | --- |
| `config/cyanotype/sources.snbt` | extra resources, see [resources](dev/resources) |
| `config/cyanotype/currencies.snbt` | virtual currencies |
| `config/cyanotype/reward_tables.snbt` | global reward tables |
| `config/cyanotype/presets.snbt` | the dev's tree presets, stored on the client |

:::tip
Ship `settings.snbt` with your pack, and write the buffer sizes in it, since all three start at 0 and each server owner would otherwise have to set them again.
:::
