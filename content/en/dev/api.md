# API, events and KubeJS

The mod can be used from Java, from KubeJS and from other mods, through a small server-side API and a set of events. Everything below runs on the server. The Java API is the same on all three loaders, and the events change bus depending on the loader.

## Java API (server side)

The entry point is `com.aneemonas.cyanotype.api.CyanotypeApi`, which offers these methods.

| Method | Returns |
| --- | --- |
| `treeIds()` | ids of loaded trees |
| `treeTag(id)` | `Optional<CompoundTag>`, a copy of the tree |
| `isNodeDone(player, tree, node)`, `doneNodes(player, tree)` | progress |
| `isTreeComplete(player, tree)` | every node done (optional ones too) |
| `completeNode(player, tree, node)` | completes without paying; false if unknown or done |
| `stageOf(tree, node)` | the automatic stage |
| `labLevel(player)` | 0 when off |
| `restrictedBy(player, flag, stack)` or `(player, flag, blockState)` | title of the node that restricts, or null |
| `teamMembers(player)` | UUIDs including the player |

The flag constants that `restrictedBy` expects are in `com.aneemonas.cyanotype.data.Restriction`.

## Events (server)

The six events are the same classes on all three loaders. NeoForge posts them on `NeoForge.EVENT_BUS` and Forge on `MinecraftForge.EVENT_BUS`, where you listen as for any other event. Fabric has no bus of its own, so the mod ships one: `CyanotypeEvents.listen(Class.class, consumer)`, with listeners running on the server thread in the order they were registered.

| Event | When | Notes |
| --- | --- | --- |
| `ResearchAttemptEvent` | requirements are met, before paying | **cancelable**; `deny("reason")`; the reason (a lang key or text) is shown; not posted for dev tools or commands |
| `ResearchCompletedEvent` | a node was completed (also for teammates) | `getPlayer()`, `getTree()`, `getNode()`, `isFirstInWorld()` |
| `TreeCompletedEvent` | the last missing node was completed | right after the completed event |
| `ResearchFunctionEvent` | a Function reward ran | `getFunctionId()`, player, tree, node, first |
| `ResearchRegistrationEvent` | after the tree files were read | `register(CompoundTag)` adds a tree in memory, no file written |
| `NodeActiveChangedEvent` | a node became active or inactive (difficulty) | player, tree, node, active |

```java
@SubscribeEvent
public static void onAttempt(ResearchAttemptEvent e) {
    if (e.getNode().id.equals("nether_core") && e.getPlayer().level().dimension() != Level.NETHER)
        e.deny("You must be in the Nether.");
}
```

On Fabric the same veto looks like this:

```java
CyanotypeEvents.listen(ResearchAttemptEvent.class, e -> {
    if (e.getNode().id.equals("nether_core") && e.getPlayer().level().dimension() != Level.NETHER)
        e.deny("You must be in the Nether.");
});
```

## KubeJS 7

This part applies to NeoForge, where the events go through the NeoForge bus and KubeJS listens to them through `NativeEvents`:

```js kubejs/server_scripts/cyanotype.js
NativeEvents.onEvent('com.aneemonas.cyanotype.event.ResearchCompletedEvent', e => {
  console.info(`${e.player.name.string} completed ${e.treeId}/${e.nodeId}`)
})

// A "Function" reward posts this event with the function id chosen in the node editor.
NativeEvents.onEvent('com.aneemonas.cyanotype.event.ResearchFunctionEvent', e => {
  if (e.functionId == 'my_script_hook') {
    console.info(`${e.player.name.string} triggered my_script_hook from ${e.treeId}/${e.nodeId}`)
  }
})
```

Adding a tree from a script:

```js
NativeEvents.onEvent('com.aneemonas.cyanotype.event.ResearchRegistrationEvent', e => {
  e.register(NBT.compoundTag({ id: 'from_script', input: 'minecraft:book', nodes: [] }))
})
```

:::note
The KubeJS example comes from the mod's `docs/examples/kubejs_server_script.js` and was written for KubeJS 7 on Minecraft 1.21.1, on NeoForge. On Forge and Fabric I did not check how KubeJS listens to these events. The Java examples were not compiled in a real add-on yet.
:::

## Stages with KubeJS

Every completed node grants `cyanotype_<tree>_<node>`, and with KubeJS installed the same stage is added as a KubeJS stage, so a script can check it the usual way. See [stages](dev/stages).

## Source handler

Other mods push extra resources into the machine through a block capability with the id `cyanotype:source_handler` (`ISourceHandler`). On each loader it is that loader's own type: a `BlockCapability` on NeoForge, a `Capability` on Forge and a `BlockApiLookup` on Fabric. On all of them it lives in `CyanotypeCapabilities.SOURCE_HANDLER`. The capability is what lets a mod with its own energy or resource, say a custom generator, deliver into a Source without any code on this side. See [machine resources](dev/resources).

## Ideas

A few uses that fit the API well. `ResearchAttemptEvent` is the place for anti-cheese rules, such as a cooldown between researches or a stage check that depends on something the tree itself cannot see. A `function` reward that begins with `once` can broadcast who was first on the server. A script that listens to `ResearchRegistrationEvent` can add seasonal trees in memory, with no file to clean up afterwards. And because the scoreboard objectives are kept in sync, a datapack function that reacts to `cyanotype_nodes` can drive things that this mod knows nothing about.

## Network (for maintainers)

This section is for people who work on the mod itself. The payloads are `RequestSync, Research, CreateTree, DeleteTree, DevToggle, SyncSettings, SetSettings, SelectTree, CollectAll, ForceComplete, ResetNode, ResetTree, OpenChoices, ChooseRewards, ShowToast, ClickCheck, SetMachine, SetFallbackLocale, TogglePin, PinsImport, SyncTeam` and `TeamAction`. Large messages go through a chunked channel, where they are compressed with gzip, cut into pieces below the packet limits and reassembled by kind. Every server handler validates again what it receives, and client and server must run the **same version** of the mod.
