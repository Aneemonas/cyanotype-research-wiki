# Functions (.cyan)

A **function** is a small script that a `function` reward runs. It lives in `config/cyanotype/functions/<id>.cyan` and has one directive per line, with `#` starting a comment. Functions exist for the cases where a plain reward list is awkward, such as a message to the whole server followed by a few items, an effect and a stage, all as one named unit that several nodes can share.

```cyan config/cyanotype/functions/forge.cyan
# One directive per line. %player% %tree% %node% are replaced.
# 'once' = only the first player in the world runs this file (world-wide effects).
once
broadcast &6%player% &7finished &e%node%&7 first!
msg &aThe forge hums to life...
give minecraft:iron_ingot 8
xp 3L
effect minecraft:speed 60 1
sound minecraft:entity.player.levelup
stage forge_unlocked
cmd say hello from %player%
event my_script_hook
```

Each directive does one thing, and `%player%`, `%tree%` and `%node%` are replaced in the text.

| Directive | Effect |
| --- | --- |
| `once` | only the first player in the world continues |
| `msg <text>` | chat message to the player |
| `actionbar <text>` | action bar message |
| `broadcast <text>` | message to everyone |
| `give <item> <count>` | give items |
| `xp 3L` or `xp 30P` | levels or points |
| `effect <id> <seconds> <amplifier>` | potion effect |
| `sound <id>` | play a sound |
| `stage <name>` | grant a stage |
| `cmd <command>` | run a command |
| `event <name>` | post `ResearchFunctionEvent` with that name |

The line `once` is the odd one out, because it does not do anything by itself. It makes the rest of the file run for the first player in the world only, so a function that begins with `once` is how you announce or reward a world first.

## Use it from a node

Add a `function` reward and give it the id of the file without `.cyan`, so `forge` for `forge.cyan`. The second argument `world` limits it to the first player in the world, which does the same as starting the file with `once`.

```snbt
{ type: "function", args: ["forge", "world"] }
```

## Events and scripts

Every function also posts a `ResearchFunctionEvent` **before** the file runs, with the function id, the player, the tree and the node. A script can therefore do all the work itself and the `.cyan` file does not need to exist at all, which makes a function reward a handy hook for KubeJS or Java code. See [API and KubeJS](dev/api).

## Test it

```cyan
/cyanotype function @s forge
```

runs a function immediately for a player, so you can try it without completing a node. Function ids accept `[a-zA-Z0-9_\-/.]{1,64}` and never `..`. The id is written as it is and is not translatable.
