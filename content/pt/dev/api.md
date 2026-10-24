# API, eventos e KubeJS

Dá para usar o mod a partir de Java, de KubeJS e de outros mods, por uma API pequena do lado do servidor e por um conjunto de eventos. Tudo abaixo roda no servidor. A API Java é a mesma nos três loaders; o que muda, de um loader para outro, é o barramento dos eventos.

## API Java (lado do servidor)

O ponto de entrada é `com.aneemonas.cyanotype.api.CyanotypeApi`, com estes métodos:

| Método | Retorna |
| --- | --- |
| `treeIds()` | ids das árvores carregadas |
| `treeTag(id)` | `Optional<CompoundTag>`, uma cópia da árvore |
| `isNodeDone(player, tree, node)`, `doneNodes(player, tree)` | progresso |
| `isTreeComplete(player, tree)` | todos os nós concluídos (os opcionais também) |
| `completeNode(player, tree, node)` | conclui sem cobrar; false se o nó não existe ou já foi concluído |
| `stageOf(tree, node)` | o stage automático |
| `labLevel(player)` | 0 quando desligado |
| `restrictedBy(player, flag, stack)` ou `(player, flag, blockState)` | título do nó que restringe, ou null |
| `teamMembers(player)` | UUIDs, incluindo o do próprio jogador |

As constantes de flag que o `restrictedBy` espera estão em `com.aneemonas.cyanotype.data.Restriction`.

## Eventos (servidor)

Os seis eventos usam as mesmas classes nos três loaders. O NeoForge os dispara no `NeoForge.EVENT_BUS` e o Forge no `MinecraftForge.EVENT_BUS`, e você os escuta como qualquer outro evento. O Fabric não tem um barramento próprio, então o mod traz um: `CyanotypeEvents.listen(Classe.class, consumidor)`, com os listeners rodando na thread do servidor, na ordem em que foram registrados.

| Evento | Quando | Notas |
| --- | --- | --- |
| `ResearchAttemptEvent` | os requisitos foram cumpridos, antes da cobrança | **cancelável**; `deny("motivo")`; o motivo (chave de lang ou texto) é mostrado ao jogador; não é disparado por ferramentas de dev nem por comandos |
| `ResearchCompletedEvent` | um nó foi concluído (inclusive para colegas de time) | `getPlayer()`, `getTree()`, `getNode()`, `isFirstInWorld()` |
| `TreeCompletedEvent` | o último nó que faltava foi concluído | logo depois do evento de conclusão do nó |
| `ResearchFunctionEvent` | uma recompensa Function foi executada | `getFunctionId()`, jogador, árvore, nó, first |
| `ResearchRegistrationEvent` | depois que os arquivos de árvore foram lidos | `register(CompoundTag)` adiciona uma árvore na memória, sem gravar arquivo |
| `NodeActiveChangedEvent` | um nó ficou ativo ou inativo (por dificuldade) | jogador, árvore, nó, ativo |

```java
@SubscribeEvent
public static void onAttempt(ResearchAttemptEvent e) {
    if (e.getNode().id.equals("nether_core") && e.getPlayer().level().dimension() != Level.NETHER)
        e.deny("You must be in the Nether.");
}
```

No Fabric, o mesmo veto fica assim:

```java
CyanotypeEvents.listen(ResearchAttemptEvent.class, e -> {
    if (e.getNode().id.equals("nether_core") && e.getPlayer().level().dimension() != Level.NETHER)
        e.deny("You must be in the Nether.");
});
```

## KubeJS 7

Este trecho vale para o NeoForge, onde os eventos passam pelo bus do NeoForge e o KubeJS os escuta com `NativeEvents`:

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

Adicionando uma árvore por um script:

```js
NativeEvents.onEvent('com.aneemonas.cyanotype.event.ResearchRegistrationEvent', e => {
  e.register(NBT.compoundTag({ id: 'from_script', input: 'minecraft:book', nodes: [] }))
})
```

:::note
O exemplo de KubeJS vem do `docs/examples/kubejs_server_script.js` do mod e foi escrito para o KubeJS 7 no Minecraft 1.21.1, no NeoForge. No Forge e no Fabric, não verifiquei como o KubeJS escuta esses eventos. Os exemplos em Java ainda não foram compilados num add-on real.
:::

## Stages com KubeJS

Todo nó concluído concede `cyanotype_<tree>_<node>`, e com o KubeJS instalado o mesmo stage é adicionado como stage do KubeJS, então um script pode checá-lo do jeito de sempre. Veja [stages](dev/stages).

## Source handler

Outros mods enviam recursos extras para a máquina por uma capability de bloco com o id `cyanotype:source_handler` (`ISourceHandler`). Em cada loader ela usa o tipo nativo dele: `BlockCapability` no NeoForge, `Capability` no Forge e `BlockApiLookup` no Fabric, e em todos fica em `CyanotypeCapabilities.SOURCE_HANDLER`. É ela que permite a um mod com energia ou recurso próprio, como um gerador customizado, alimentar um Source sem nenhum código deste lado. Veja [recursos da máquina](dev/resources).

## Ideias

Alguns usos que combinam bem com a API. O `ResearchAttemptEvent` é o lugar para regras anti-abuso, como um tempo de espera entre pesquisas ou uma checagem de stage que dependa de algo que a árvore não enxerga. Uma recompensa `function` que começa com `once` pode anunciar no servidor quem foi o primeiro. Um script que escuta o `ResearchRegistrationEvent` pode adicionar árvores sazonais só na memória, sem arquivo para limpar depois. E como os objetivos de scoreboard são mantidos em sincronia, uma função de datapack que reage a `cyanotype_nodes` pode controlar coisas que este mod desconhece.

## Rede (para mantenedores)

Esta seção é para quem trabalha no código do mod. Os payloads são `RequestSync, Research, CreateTree, DeleteTree, DevToggle, SyncSettings, SetSettings, SelectTree, CollectAll, ForceComplete, ResetNode, ResetTree, OpenChoices, ChooseRewards, ShowToast, ClickCheck, SetMachine, SetFallbackLocale, TogglePin, PinsImport, SyncTeam` e `TeamAction`. Mensagens grandes passam por um canal em partes: são comprimidas com gzip, cortadas em pedaços abaixo dos limites de pacote e remontadas por tipo. Todo handler do servidor valida de novo o que recebe, e cliente e servidor precisam rodar a **mesma versão** do mod.
