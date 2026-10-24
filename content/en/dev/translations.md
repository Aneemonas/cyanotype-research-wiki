# Translations

Two different sets of text are translated in different places. The mod's own interface ships with the mod, and the texts of your trees live in your config.

## The mod's own interface

The interface strings are in `assets/cyanotype/lang/en_us.json` and `pt_br.json`, and a resource pack can add more languages.

## Your texts

Titles, descriptions, lock messages and the texts of some rewards live in language files and **not** in the tree files, so one tree can be shown in any number of languages without being copied:

```text
config/cyanotype/lang/<code>.json
```

| Key | Text |
| --- | --- |
| `tree.<tree>` | title of the tree |
| `node.<tree>.<node>.title` | title of a node |
| `node.<tree>.<node>.description` | description of a node |
| `tree.<tree>.lock` | default lock message of the tree |
| `node.<tree>.<node>.lock` | lock message of a node |
| `node.<tree>.<node>.reward.<path>.<arg>` | texts of `message`, `title` and `toast` rewards |

`path` is the index of the reward, followed by `.child` and the index of the option when the reward sits inside a wheel or a choice. The arguments that can be translated are argument 0 of `message`, arguments 0 and 1 of `title`, and arguments 0 and 1 of `toast`.

```json config/cyanotype/lang/pt_br.json
{
  "tree.my_first_tree": "Minha primeira árvore",
  "node.my_first_tree.iron.title": "Era do Ferro",
  "node.my_first_tree.iron.description": "&7Pague pelo direito de forjar ferro."
}
```

The editor writes `en_us.json` from what you type, and every other language has to be added **by hand**, by copying the file and translating the values. Datapacks and mods may ship `data/<ns>/cyanotype/lang/<code>.json` as well, and when the same key exists in both places the config wins.

## Which language is shown

The client uses the language selected in Minecraft. If a text is missing in that language it tries `fallback_locale`, a world setting, and then `en_us`. Function names are not translatable, since they are ids and not text a player reads.

## Colour codes

Descriptions accept Minecraft colour codes and run over several lines.

| Code | Result |
| --- | --- |
| `&0` to `&f` | the sixteen colours |
| `&l` `&o` `&n` `&m` `&k` | bold, italic, underline, strikethrough, obfuscated |
| `&r` | reset |
| `&#RRGGBB` | any colour |
| `§` | the same as `&` |
| `&&` | a literal `&` |
| `\n` or a real line break | a new line |
