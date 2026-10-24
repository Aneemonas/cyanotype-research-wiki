# Cookbook

Small, copyable patterns. Each one is a piece of a node.

## Lock all metal tools until a node is done

```snbt
locks: ["#minecraft:pickaxes", "#minecraft:axes", "#minecraft:shovels"],
lock_masks: [I; 3, 3, 3]
```

`3` = RECIPE + USE. Players cannot craft them and cannot use any they find.

## A door that opens after a boss

```snbt
rewards: [{ type: "open_barrier", args: ["boss_door", "open"] }]
```

and a Barrier Gate named `boss_door`. See [advanced nodes](dev/advanced-nodes#barrier-gates).

## Pick one of three rewards

```snbt
rewards: [
  { type: "choice", options: [
    { type: "item", args: ["minecraft:diamond_sword", "1"] },
    { type: "item", args: ["minecraft:bow", "1"] },
    { type: "effect", args: ["minecraft:strength", "600", "1"] }
  ] }
]
```

## A random bonus

```snbt
rewards: [
  { type: "wheel", options: [
    { type: "item", args: ["minecraft:emerald", "3"], weight: 70 },
    { type: "item", args: ["minecraft:diamond", "1"], weight: 25 },
    { type: "item", args: ["minecraft:netherite_ingot", "1"], weight: 5 }
  ] }
]
```

## Daily-style repeatable reward

```snbt
repeatable: true,
repeat_seconds: 1200,
tasks: [{ type: "check", args: ["Claim"] }],
rewards: [{ type: "item", args: ["minecraft:bread", "4"] }]
```

## Secret node revealed by two others

```snbt
mystery: true, hide_text: true, reveal_mode: 2, reveal_nodes: ["a", "b"]
```

## Pick two of three, the third is locked for good

```snbt
parents: ["fire", "ice", "storm"], parents_needed: 2, exclude_rest: true
```

## Only the first player in the world

```snbt
world_once: true,
rewards: [{ type: "function", args: ["first_to_finish", "world"] }]
```

with `config/cyanotype/functions/first_to_finish.cyan`:

```cyan
broadcast &6%player% &7was the first to finish &e%node%&7!
```

## Only on hard difficulty

```snbt
difficulties: 8
```

(1 peaceful, 2 easy, 4 normal, 8 hard; add them to combine).

## Bring a mob to the machine

```snbt
tasks: [{ type: "near_entity", args: ["minecraft:cow", "3", "6"] }]
```

## Kill with a bow in the Nether

```snbt
tasks: [{ type: "adv_kill", args: ["minecraft:skeleton", "10", "minecraft:bow", "", "minecraft:the_nether", ""] }]
```

## Give the first blueprint

```cyan
/give @s cyanotype:exploration_blueprint
```

or put it in a spawn chest loot table, or as the reward of a quest in another mod.

## Announce milestones to the server (KubeJS)

```js
NativeEvents.onEvent('com.aneemonas.cyanotype.event.ResearchCompletedEvent', e => {
  console.info(`${e.player.name.string} completed ${e.treeId}/${e.nodeId}`)
})
```

## Cancel a research with a reason

```java
@SubscribeEvent
public static void onAttempt(ResearchAttemptEvent e) {
    if (e.getNode().id.equals("nether_core") && e.getPlayer().level().dimension() != Level.NETHER)
        e.deny("You must be in the Nether.");
}
```
