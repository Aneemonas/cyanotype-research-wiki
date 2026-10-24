# Instalação

## Requisitos

| O quê | Versão | Necessário |
| --- | --- | --- |
| Minecraft | 1.21.1 | sim |
| Loader | NeoForge 21.1.x, Forge 52.x ou Fabric (Loader 0.16 ou mais novo) | sim, um dos três. No Fabric, o Fabric API também |
| GeckoLib | 4.x (no Fabric, 4.7 ou mais novo) | sim, é ele que anima a máquina |
| JEI, EMI ou REI | qualquer versão recente (REI 16, só no Fabric) | opcional, usado para esconder receitas bloqueadas e tirar o overlay do visualizador da tela da máquina |
| KubeJS | 7 | opcional, os stages são espelhados como stages do KubeJS e, no NeoForge, scripts podem ouvir os eventos do mod |
| Botania, Mekanism | versões recentes | opcional, fornecem Sources como mana e gases. A ponte do Botania existe no NeoForge e no Fabric, a do Mekanism só no NeoForge |
| Curios, Trinkets, Accessories | versões recentes | opcional, fazem a restrição de equipar alcançar os slots desses mods. Curios no NeoForge e no Forge, Trinkets no Fabric, Accessories no NeoForge e no Fabric |
| Team Reborn Energy | qualquer | opcional, só no Fabric: é por ela que a máquina recebe energia |

O mod precisa estar no **cliente e no servidor**, e os dois devem rodar a mesma versão. A instalação é a de qualquer mod: coloque o `.jar` do seu loader em `mods/`. Cada jar serve a um loader só, então um pack em Fabric não usa o jar do NeoForge. As diferenças entre eles estão em [NeoForge, Forge e Fabric](start/loaders).

:::steps
1. Instale o NeoForge, o Forge ou o Fabric para o Minecraft 1.21.1 no seu launcher.
2. Coloque o `.jar` do mod feito para o seu loader e o GeckoLib na pasta `mods/` do cliente e do servidor. No Fabric, coloque também o Fabric API.
3. Abra o jogo uma vez. O mod cria `config/cyanotype/` e `config/cyanotype-client.toml`.
4. Crafte a Research Station com a receita abaixo, ou pegue na aba criativa.
:::

## Receita de crafting

```text
I L I     I = lingote de ferro   L = lápis-lazúli
B C B     B = livro              C = mesa de trabalho
S S S     S = pedra
```

## Os 30 blueprints

O mod traz trinta itens blueprint, cada um com o próprio desenho. O blueprint é o **item de entrada** mais comum de uma árvore: o jogador o coloca na máquina para abri-la. Todos aparecem na aba criativa e nenhum tem receita, então o pack os entrega por comandos, loot tables ou receitas próprias, o que também ajuda a controlar o ritmo da progressão.

Os ids seguem o padrão `cyanotype:<nome>_blueprint`, e os nomes são electrical, engineer, factory, dungeon, rotational_force, mining, farming, alchemy, magic, combat, defense, exploration, logistics, fluid, steam, smelting, storage, automation, aviation, nether, end, redstone, enchanting, building, trading, cooking, forestry, fishing, space e research. O último é o blueprint genérico.

```cyan
/give @s cyanotype:steam_blueprint
```

## Distribuindo um pack

Tudo que o autor cria fica em `config/`, então basta distribuir `config/cyanotype/` junto com o modpack para todos os jogadores terem as mesmas árvores, textos e configurações. O progresso fica de fora: ele é guardado no mundo, por jogador, e um mundo novo começa do zero mesmo com a mesma config. A lista completa de arquivos está em [arquivos e pastas](ref/files).

:::tip
Teste pelo menos uma vez numa LAN ou num servidor dedicado, com uma segunda conta. Times, bloqueio de receitas e a checagem de tasks se comportam de outro jeito quando há mais de um jogador.
:::
