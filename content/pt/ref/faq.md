# FAQ e solução de problemas

## Funciona no Forge e no Fabric?

Funciona, com pequenas diferenças. O que muda e o que foi testado está em [NeoForge, Forge e Fabric](start/loaders) e em [limites e status](dev/limits).

## A máquina não recebe energia no Fabric

O Fabric não tem FE. A máquina recebe energia pela Team Reborn Energy, então essa biblioteca precisa estar instalada e o gerador precisa usar essa API. Se o seu mod de energia usa outra, crie um Source com `FE per unit` acima de 0 e alimente-o por um add-on, como explica [recursos da máquina](dev/resources).

## A máquina não mostra medidor de fluido ou de Sources

Os três buffers (FE, Fluid e Source) começam em 0 e são configurados em **Preferências > Machine**. Além disso, o medidor só aparece quando algo o usa: um fluido no custo operacional ou num nó, no caso do medidor de fluido, e um Source, no caso do medidor de Source.

## Um funil ou tubo não coloca nada dentro

A máquina só aceita o que alguma árvore pede, e só enquanto ainda é necessário. Confira se algum nó pendente pede o item, se o buffer correspondente está acima de 0 e se o nó está disponível.

## O gás do Mekanism não entra

Quatro condições precisam valer ao mesmo tempo: existir um Source com o adapter `chemical:mekanism:oxygen` (ou outro id de chemical), algum nó pendente ou o custo operacional pedir esse Source, o tanque do Mekanism ter uma face de saída virada para a máquina e o buffer de Source estar acima de 0.

## Uma receita está escondida (ou visível) quando não devia

```cyan
/cyanotype recipes check <item>
```

Os bloqueios seguem o resultado da receita. Ela fica escondida para todos no servidor (a camada do mundo) até algum jogador concluir o nó que a libera, e as outras duas camadas, a do jogador e a da fornalha, estão em [restrições](dev/restrictions). Se algum mod guarda receitas em cache por conta própria, tente a opção de mundo `recipe_lock_world_reload`.

JEI e EMI acompanham a liberação ao vivo desde a 0.22.8, então a receita deve aparecer no visualizador assim que o nó é concluído, sem relogar. Para entender como isso funciona, veja [visualizadores de receitas](dev/recipe-viewers).

## `JEI hideRecipes failed ... must be an instance of RecipeHolder` no log

É esperado. Cada categoria do JEI é tentada com holders e com receitas puras, e uma das duas tentativas falha por design.

## As restrições valem para mim como operador

Valem para todo mundo, operadores inclusive. Quando precisar passar por elas, conclua os nós com `/cyanotype complete` ou use a ferramenta **Auto Complete**.

## Bloqueei um mod inteiro e nada aconteceu

Use `modid:*`, por exemplo `irons_spellbooks:*`. Um `irons_spellbooks` solto ou `@irons_spellbooks` também vale para o mod inteiro, desde que nenhuma lista nomeada tenha esse nome. `modid:@nome` não casa com nada. O seletor de restrições tem uma aba **Mods** que já escreve a forma certa.

## Meu arquivo de árvore é ignorado

O nome do arquivo é o id da árvore e precisa seguir `[a-z0-9_-]{1,48}`. Um arquivo de verdade não pode ter comentários, e `lock_masks` precisa ser um int array, escrito `[I; ...]`. Se nada disso for o problema, procure `Error reading ...` no `latest.log`: um arquivo ilegível é ignorado e o `.bak` dele é tentado no lugar.

## Um requisito nunca completa

O progresso das tasks só conta enquanto o nó está disponível, então comece olhando os pais. As tasks lidas por consulta (polled) rodam uma vez por segundo, por isso reagem um instante depois do evento.

## Um nó que eu vejo está cinza e não completa

Se a dificuldade do mundo mudou, o nó pode pertencer a uma dificuldade que não está ativa. Nós limitados a outras dificuldades ficam inativos, e os nós cujos pais estão todos inativos também. Veja [dificuldade](dev/advanced-nodes#dificuldade).

## A tela está lenta

Nas Preferências, desligue o blur, limite o FPS em 60, deixe a escala do painel lateral em 90 e desative os efeitos ambiente. O resto está em [desempenho](dev/performance).

## O log do servidor mostra `Mismatch in destroy block pos`

É inofensivo. Aparece quando um jogador sem permissão para quebrar blocos ali clica num Barrier Gate.

## Onde reporto um bug?

Envie o `latest.log` e, em problemas de receita, a saída de `/cyanotype recipes check <item>`.
