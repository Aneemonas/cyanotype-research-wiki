# RPG pack

Classes and skill points. The player **awakens**, picks one of three classes, earns **skill points** from milestones and spends them on a skill web. Everything the player gets is an **attribute**, so no other mod is needed.

::video example-rpg-overview "Choosing a class, then spending skill points"

## Layout

| Tree | Blueprint | Content |
| --- | --- | --- |
| Class | `research_blueprint` | an awakening node, then **Warrior, Mage or Ranger**, mutually exclusive |
| Milestones | `combat_blueprint` | quests that **pay skill points** |
| Warrior Skills | `defense_blueprint` | a skill web that **costs skill points**; opens with the Warrior class |

Two things make this a skill system: a **virtual currency** (`skill_point`) and **attribute rewards**.

## Settings and the currency

```snbt config/cyanotype/settings.snbt (only the relevant keys)
{
  rpg_mode: true,
  quest_book_mode: true,
  buffer_fe: 0,
  buffer_mb: 0,
  buffer_src: 0
}
```

`rpg_mode` changes the words to *Skill* and *Learn*. Define the currency once:

::file assets/examples/rpg/currencies.snbt "currencies.snbt"

You can also create it with **Edit currencies / resources** in the Preferences window, and read it with `/cyanotype currency get <player> skill_point`.

## Class

::file assets/examples/rpg/class.snbt "class.snbt"

Notes:

- **`awakening`** uses a `check` task: the player clicks a button. It gives the first two skill points.
- The three classes list **each other** in `excludes`. Both sides must list the others, or one of them could be done first and still leave the other open. See [progression](dev/progression).
- **Attribute rewards** are permanent modifiers while the node is completed. `add` adds a flat value, `mult_base` multiplies the base value (0.1 = +10 %).
- The class also grants the stage `cyanotype_class_warrior` (or mage, ranger) automatically, which scripts can read.

::video example-rpg-class "Picking Warrior locks Mage and Ranger for good"

## Milestones: earning skill points

::file assets/examples/rpg/milestones.snbt "milestones.snbt"

Each node pays `{ type: "currency", args: ["skill_point", "1"] }`. Use any task as a quest: kill, travel, craft, reach a lab level.

## Warrior Skills

::file assets/examples/rpg/warrior_skills.snbt "warrior_skills.snbt"

Notes:

- The root has the parent `class/warrior`, so the whole tree stays closed for a Mage or a Ranger.
- Every node **spends** skill points: `{ type: "currency", args: ["skill_point", "2", "spend"] }`. Use `keep` instead to only require the points.
- **`berserker`** and **`guardian`** exclude each other: a **specialisation** choice.
- **`rage`** and **`bulwark`** add a *proof* task (50 undead, or 200 damage taken) in front of the cost, so skills are earned as well as bought.

::video example-rpg-skills "The skill web: spending points, the exclusive branches"

## Adapting it

:::steps
1. Copy `warrior_skills.snbt` to `mage_skills.snbt`, change the `id`, the parent to `class/mage`, the attributes and the icons. Do the same for the Ranger.
2. Add a **respec**: an operator can run `/cyanotype reset <player> warrior_skills` and give the points back with `/cyanotype currency set <player> skill_point <amount>`. Nothing refunds points automatically.
3. Show the cost: put it in the description, as in the example, and use the tree's **currency** setting so the bar at the bottom shows the points.
4. Use `exclude_rest` and `max_children` for "pick 2 of 3" capstones. See [progression](dev/progression).
5. Add a `flexible: true` tree for a free-form web where nodes without parents just start.
:::

:::tip
Attribute rewards and difficulty are reconciled once per second. A skill from a node that does not exist at the current difficulty is dropped and restored automatically.
:::
