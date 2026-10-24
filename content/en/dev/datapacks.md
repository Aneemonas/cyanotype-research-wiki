# Datapacks and mods

Trees and their texts do not have to come from `config/`. A datapack, or another mod, can ship them in its own data folder.

```text
data/<namespace>/cyanotype/trees/<id>.snbt
data/<namespace>/cyanotype/lang/<code>.json
```

Trees that come this way load **read-only**. If a tree with the same id exists in `config/`, the one in `config/` wins, and editing a datapack tree in game writes a copy into `config/` instead of touching the original, so the editor can never damage something that a mod ships. Invalid ids and duplicates are skipped with a line in the log.

## Adding trees from code

`ResearchRegistrationEvent` is posted after the tree files have been read. Calling `register(CompoundTag)` on it adds a tree **in memory** and writes no file, so it suits trees that are generated or that exist only for a while. See [API and KubeJS](dev/api).

## Which one to use

| Situation | Use |
| --- | --- |
| A single pack that the author edits in game | `config/cyanotype/trees` |
| A mod that ships its own research | a datapack folder inside the mod |
| Seasonal or generated trees | `ResearchRegistrationEvent` from a script |
