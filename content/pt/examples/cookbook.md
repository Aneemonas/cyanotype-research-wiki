# Cookbook

Receitas curtas para copiar e colar. Cada uma é um trecho de nó.

## Bloquear todas as ferramentas de metal até um nó ser concluído

```snbt
locks: ["#minecraft:pickaxes", "#minecraft:axes", "#minecraft:shovels"],
lock_masks: [I; 3, 3, 3]
```

`3` = RECIPE + USE. O jogador não consegue craftar nem usar as ferramentas que encontrar.

## Uma porta que abre depois de um chefe

```snbt
rewards: [{ type: "open_barrier", args: ["boss_door", "open"] }]
```

mais um Barrier Gate chamado `boss_door`. Veja [nós avançados](dev/advanced-nodes#barrier-gates).

## Escolher uma de três recompensas

```snbt
rewards: [
  { type: "choice", options: [
    { type: "item", args: ["minecraft:diamond_sword", "1"] },
    { type: "item", args: ["minecraft:bow", "1"] },
    { type: "effect", args: ["minecraft:strength", "600", "1"] }
  ] }
]
```

## Um bônus aleatório

```snbt
rewards: [
  { type: "wheel", options: [
    { type: "item", args: ["minecraft:emerald", "3"], weight: 70 },
    { type: "item", args: ["minecraft:diamond", "1"], weight: 25 },
    { type: "item", args: ["minecraft:netherite_ingot", "1"], weight: 5 }
  ] }
]
```

## Recompensa repetível, no estilo diária

```snbt
repeatable: true,
repeat_seconds: 1200,
tasks: [{ type: "check", args: ["Claim"] }],
rewards: [{ type: "item", args: ["minecraft:bread", "4"] }]
```

## Nó secreto, revelado por outros dois

```snbt
mystery: true, hide_text: true, reveal_mode: 2, reveal_nodes: ["a", "b"]
```

## Escolher dois de três (o terceiro fica bloqueado para sempre)

```snbt
parents: ["fire", "ice", "storm"], parents_needed: 2, exclude_rest: true
```

## Só o primeiro jogador no mundo

```snbt
world_once: true,
rewards: [{ type: "function", args: ["first_to_finish", "world"] }]
```

com `config/cyanotype/functions/first_to_finish.cyan`:

```cyan
broadcast &6%player% &7was the first to finish &e%node%&7!
```

## Só na dificuldade difícil

```snbt
difficulties: 8
```

(1 peaceful, 2 easy, 4 normal, 8 hard; some os valores para combinar dificuldades).

## Levar um mob até a máquina

```snbt
tasks: [{ type: "near_entity", args: ["minecraft:cow", "3", "6"] }]
```

## Matar com um arco no Nether

```snbt
tasks: [{ type: "adv_kill", args: ["minecraft:skeleton", "10", "minecraft:bow", "", "minecraft:the_nether", ""] }]
```

## Entregar o primeiro blueprint

```cyan
/give @s cyanotype:exploration_blueprint
```

ou coloque na loot table de um baú de spawn, ou como recompensa de uma quest de outro mod.

## Anunciar marcos no servidor (KubeJS)

```js
NativeEvents.onEvent('com.aneemonas.cyanotype.event.ResearchCompletedEvent', e => {
  console.info(`${e.player.name.string} completed ${e.treeId}/${e.nodeId}`)
})
```

## Cancelar uma pesquisa com um motivo

```java
@SubscribeEvent
public static void onAttempt(ResearchAttemptEvent e) {
    if (e.getNode().id.equals("nether_core") && e.getPlayer().level().dimension() != Level.NETHER)
        e.deny("You must be in the Nether.");
}
```
