# O que é bloqueado e por quê

Concluir um nó pode **liberar** coisas em qualquer parte do pack. É assim que a pesquisa muda o que você pode fazer, e não só o que você tem.

::video player-locks "Receita bloqueada com cadeado, depois liberada ao pesquisar"

| O que fica bloqueado até o nó ser concluído | Como aparece no jogo |
| --- | --- |
| Crafting | a receita some do livro de receitas, do JEI, do EMI e do REI, e a grade de crafting deixa o slot de resultado vazio |
| Usar um item | clicar com o botão direito com ele não faz nada |
| Interagir com um bloco | alavancas, portas e baús ignoram você |
| Abrir a tela de um bloco | menus de máquinas e terminais não abrem |
| Quebrar ou colocar um bloco | obsidiana, spawners e afins |
| Pegar ou largar um item | o item fica no chão, ou fica na sua mão |
| Rodar uma fornalha | um determinado item não derrete |
| Loot | os drops de bloco e de mob desse item são removidos para você |
| Equipar | o item não entra num slot de armadura nem de Curios |

Os itens afetados mostram um **cadeado** no inventário e uma dica com o nome do nó que os libera, então o próprio bloqueio já é uma pista do que pesquisar a seguir. Quando você tenta uma ação bloqueada, uma mensagem vermelha na action bar diz qual nó está segurando.

:::warning
As restrições valem para todos, **operadores e jogadores no criativo inclusos**. Para testar um pack como operador, conclua os nós com `/cyanotype complete` ou com a ferramenta Auto Complete.
:::

## Duas camadas para receitas

Receitas têm uma particularidade. Máquinas e automação (o Create, funis alimentando fornalhas, máquinas de mods) leem a lista de receitas do **mundo**. Uma receita bloqueada sai dessa lista no servidor e só volta, para todos, quando **qualquer** jogador conclui o nó. Já o livro de receitas, o JEI, o EMI e os slots de resultado dos menus de crafting são decididos **por jogador**.

Num servidor multiplayer, isso quer dizer que a pesquisa de um jogador pode liberar uma receita automatizada para o mundo inteiro, enquanto os outros ainda não conseguem craftá-la à mão até pesquisarem também. Os motivos e os detalhes estão em [restrições](dev/restrictions).
