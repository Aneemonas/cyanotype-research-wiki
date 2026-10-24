# Limites e status

O que o mod não faz e o que eu já testei.

## O que eu testei

No NeoForge, testei em singleplayer, numa LAN com vários clientes e num servidor dedicado, além de modpacks grandes, inclusive packs do FTB. O que depende de outros mods (mana do Botania, gases do Mekanism, equipar do Curios, bloqueio de receitas com JEI, fundos GLSL) foi testado com os mods de verdade.

O Forge e o Fabric também foram jogados em modpacks, e foi assim que o bug de interface do Fabric e os problemas do REI apareceram e foram corrigidos. O que não conferi uma a uma são as peças que só existem nesses loaders: Team Reborn Energy, Trinkets, Accessories, o mixin de `loot` do Forge e o servidor dedicado nos dois.

O que **não** testei foi um servidor com muitos jogadores ao mesmo tempo. Times, a checagem de tasks e o bloqueio de receitas deveriam escalar bem, e os números do profiler na [página de desempenho](dev/performance) indicam isso, mas nunca vi com o servidor cheio.

| Área | Status |
| --- | --- |
| Tasks, times, dificuldade, Barrier Gates, bloqueio de receitas, profiler | testado em singleplayer, LAN e servidor dedicado |
| Packs grandes (FTB e outros) | testado |
| Mana do Botania, gases do Mekanism, bloqueio de equipar do Curios, JEI | testado com os mods de verdade |
| Shaders GLSL de fundo | testado |
| REI (Fabric) | testado em um modpack |
| Atualização ao vivo do EMI | usa reflexão em partes internas do EMI, então outra versão do EMI pode quebrar |
| Forge e Fabric | jogados em modpacks. As integrações de cada loader e o servidor dedicado não foram conferidos um a um |
| Muitos jogadores num servidor | não testado |

## Restrições e bloqueio de receitas

Os bloqueios de receita seguem a **saída da receita**, então uma receita sem saída em item (que produz só um fluido, uma entidade ou um efeito) não pode ser bloqueada. Eles também funcionam em camadas, e uma delas vale para o mundo todo: máquinas e automação usam a lista de receitas do mundo, então a receita bloqueada volta para **todos** assim que qualquer jogador conclui o nó. Os detalhes estão em [restrições](dev/restrictions).

O bloqueio de crafting por jogador não cobre menus de mod com um tipo próprio de slot de resultado. Um bloqueio de *receita* também não diz nada sobre outras origens do item, então baús, loot, trocas e o menu criativo não são bloqueados por ele. As fornalhas são controladas pelo dono (o último jogador que as colocou ou abriu), e uma fornalha colocada por uma máquina não tem dono. As restrições baseadas em eventos valem contra jogadores, mas não contra fake players, deployers ou algumas quarries. Todas valem para todo mundo, **operadores e jogadores no criativo inclusos**.

A restrição `loot` cobre apenas drops de blocos e mobs, não o loot de baús nem de pesca. A restrição `equip` é checada duas vezes por segundo e alcança os slots de Curios, Trinkets e Accessories por reflexão, cada um no loader onde existe (veja [NeoForge, Forge e Fabric](start/loaders)). Um padrão `modid:*` ou `#tag` que não casa com nada é ignorado sem aviso.

## Árvores, tasks e times

O progresso das tasks conta **só enquanto o nó está disponível** e é checado uma vez por segundo, então eventos muito curtos podem passar batido. Um `kill` conta quando o jogador (ou um projétil dele) é o assassino. `max_children` conta só filhos da **mesma árvore**, e referências a nó ou árvore apagados são ignoradas e não bloqueiam; o progresso dos nós apagados é limpo. No modo Legacy, a checagem de uma vez por segundo só roda nas árvores que o jogador já abriu, embora a contagem de kills rode em todas, e o modo Quest Book checa todas. Recompensas de atributo e mudanças de stage por dificuldade são reaplicadas uma vez por segundo, e o autocomplete só roda para o último jogador que abriu a máquina e continua online.

Em times, um nó *personal* nunca é compartilhado, e um colega que seguiu o outro ramo de uma exclusão mantém a escolha dele. *Blocks placed (total)* usa as estatísticas de cada jogador. O reset dev de um nó ou árvore vale também para os colegas quando o compartilhamento de time está ligado, e um colega offline mantém o item no socket.

## Máquina

A máquina portátil não tem requisitos de entrega nem custo operacional, porque FE e fluido precisam da máquina colocada. As unidades de estresse do Create não são uma capability de energia nem de fluido, então crie um Source e alimente-o com um add-on ou com KubeJS. Outras energias, como EU e RF, podem ser tratadas com um Source de `FE per unit` acima de 0, que converte em FE, mas só a energia é nativa e detectada automaticamente (FE no NeoForge e no Forge, Team Reborn Energy no Fabric). Os aspectos do Thaumcraft poderão ser um Source quando esse mod existir para a 1.21.1, e a integração com a cleanroom do GregTech não está implementada.

## Textos e interface

Títulos, descrições, mensagens de bloqueio e os textos das recompensas message, title e toast podem ser traduzidos, mas **nomes de funções não**. As imagens de árvore são baixadas do servidor na primeira vez que são desenhadas. O editor dev ainda mostra nós escondidos pela dificuldade, por enquanto sem indicador de esmaecido. As listas nomeadas são editadas por comando, e as exceções vão com `!` no campo de padrão. O destaque do item ligado em outras árvores só alterna no modo Quest Book. O hold do livro de receitas é salvo ao sair, então um crash do servidor com um jogador online pode perdê-lo.

## Barrier Gates

Portões abertos na mão, ou em saves das versões 0.20.0 e 0.20.1, não têm nó de origem e continuam abertos quando um nó é resetado.
