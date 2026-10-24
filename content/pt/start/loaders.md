# NeoForge, Forge e Fabric

O mod sai em três jars feitos a partir do mesmo código: NeoForge 21.1.x, Forge 52.x e Fabric, todos para o Minecraft 1.21.1. Árvores, nós, requisitos, recompensas, restrições, Barrier Gates, times e a tela da máquina ficam num módulo comum e se comportam igual nos três. As diferenças estão na borda, onde o mod conversa com o loader ou com outros mods, e esta página reúne todas elas.

:::warning
O mod nasceu no NeoForge, e foi nele que aconteceu a maior parte dos testes. O Forge e o Fabric também foram jogados em modpacks, mas as integrações da tabela abaixo não foram conferidas uma por uma. A página [limites e status](dev/limits) detalha isso.
:::

## O que muda de um loader para outro

| Assunto | NeoForge | Forge | Fabric |
| --- | --- | --- | --- |
| Eventos para outros mods | `NeoForge.EVENT_BUS` | `MinecraftForge.EVENT_BUS` | `CyanotypeEvents.listen` |
| Energia (FE) | nativa | nativa | Team Reborn Energy, com 1 E valendo 1 FE |
| Itens e fluidos | capabilities | capabilities | Transfer API |
| Mana do Botania | sim | sem ponte | sim |
| Gases do Mekanism | sim | sem ponte | sem ponte |
| Slot extra na restrição `equip` | Curios e Accessories | Curios | Trinkets e Accessories |
| Capability de Source | `BlockCapability` | `Capability` | `BlockApiLookup` |
| Dependências obrigatórias | GeckoLib 4 | GeckoLib 4 | GeckoLib 4.7 ou mais novo e Fabric API |

Quem usa o mod num pack não precisa decorar a tabela. A linha que costuma importar é a das integrações: se o seu pack depende de mana ou gás entrando na máquina, confira se o loader escolhido tem a ponte.

## Detalhes

**Energia no Fabric.** O Fabric não tem o FE do NeoForge e do Forge. A máquina recebe energia pela Team Reborn Energy, quando essa biblioteca está instalada, e cada unidade vale 1 FE no buffer. Um mod de energia que fale outra API não consegue encher a máquina. Nesse caso, a saída é um Source com `FE per unit` acima de 0, descrito em [recursos da máquina](dev/resources). O id `team_reborn_energy` é uma suposição minha sobre como a biblioteca se registra, então vale testar com um gerador de verdade.

**Restrição de equipar.** Os slots de armadura são checados nos três loaders. Os slots de mods extras dependem do que existe em cada um: o Forge lê o Curios, o NeoForge lê o Curios e o Accessories, e o Fabric lê o Trinkets e o Accessories. Tudo isso é feito por reflexão, então um mod que mude a própria API pode deixar de ser reconhecido sem nenhum erro visível. Nesse caso, os slots de armadura continuam sendo checados.

**Dano no Forge.** Os requisitos de dano enxergam o dano antes da absorção, e não depois, como nos outros dois.

**Loot de blocos no Forge.** O Forge 1.21.1 não tem um evento de drops de bloco, então a restrição `loot` usa um mixin. Se outro mod mexer no mesmo ponto, a restrição pode falhar em silêncio, e esse é um dos itens que eu mais quero ver testados.

**Eventos no Fabric.** O Fabric API não oferece tick de jogador, colocar bloco, soltar e pegar item, loot de mob, domar, trocar com aldeão, pescar, terminar de usar um item nem dano final. O mod cobre tudo isso com mixins próprios, e um mod que mexa nos mesmos pontos pode conflitar.

**Versões fixadas no Fabric.** Usei o Fabric API 0.107.0 e o GeckoLib 4.7, porque as versões mais novas exigem uma Loom que o resto do projeto não aceita. Não testei versões bem mais novas dos dois.

**KubeJS.** Os stages automáticos são espelhados em qualquer loader com o KubeJS instalado, pelo comando `kubejs stages`. Os exemplos de script da [página de API](dev/api) foram escritos para o KubeJS 7 no NeoForge, e eu não verifiquei como escutar os eventos do mod a partir do KubeJS no Forge ou no Fabric.

**Visualizadores de receitas.** O JEI e o EMI são atendidos pelos plugins do módulo comum. O REI é suportado só no Fabric, por um plugin próprio. Veja [JEI, EMI e REI](dev/recipe-viewers).

**O que é igual.** Os arquivos de config, os datapacks, o `theme.json`, os shaders de fundo, as skins e os comandos têm o mesmo formato e ficam nas mesmas pastas nos três. Um `config/cyanotype/` pronto funciona em qualquer um. Não testei abrir um mundo salvo num loader com outro.
