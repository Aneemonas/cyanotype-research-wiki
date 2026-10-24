# Estados dos nós

A aparência de um nó muda conforme o quão perto você está de concluí-lo, então dá para ler o estado de uma árvore num relance.

::image node-states "Os estados de um nó: disponível, bloqueado, concluído, mistério e bloqueado de vez"

| Estado | O que você vê | O que significa |
| --- | --- | --- |
| **Disponível** | brilhante, com um leve brilho | tudo que vem antes está feito e você pode pesquisá-lo agora |
| **Bloqueado** | escuro, com um cadeado | falta alguma coisa, e passar o mouse mostra o quê |
| **Concluído** | preenchido, com um check | já pesquisado |
| **Mistério** | só uma silhueta | ainda não está disponível, então forma e ícone ficam escondidos |
| **Texto oculto** | título e descrição aparecem como `?????` | o texto só fica legível depois que o nó é concluído |
| **Bloqueado de vez** | um cadeado que nunca sai | você escolheu outro ramo, então este nó não pode mais ser pesquisado |
| **Opcional** | marcado como opcional | não conta na porcentagem da árvore |

Algumas árvores escondem por completo os nós bloqueados de vez, com a opção *hide unreachable nodes*.

## Por que um nó está bloqueado

Passe o mouse sobre o nó. O texto que aparece é uma mensagem escrita pelo autor do pack para aquele nó, que costuma apontar o verdadeiro obstáculo, como "precisa do Nether primeiro", ou uma lista automática do que ainda falta: pais não concluídos, requisitos não cumpridos ou uma dificuldade que não combina.

## Nós que aparecem depois

O autor pode manter um nó invisível até uma condição ser cumprida: até um pai estar concluído, até um conjunto de nós estar concluído, ou até certo número dos requisitos do próprio nó estar cumprido. Você vai ver esses nós surgindo enquanto joga, então uma árvore que parece pequena no começo pode ter ramos que você ainda não liberou.

## Marcadores num nó

Um **anel girando devagar** indica que o nó depende de, ou exclui, um nó de outra árvore. **Marcas de dificuldade** (peaceful, easy, normal e hard) indicam que o nó só existe em algumas dificuldades, e a opção de cliente *difficulty marks* as desliga. Uma **barra fina** sob o nó mostra que ele é repetível e está contando até poder ser concluído de novo. **Ícones pequenos de recurso** (energia, fluido, Source ou moeda) avisam que o nó custa recursos da máquina ou moeda, além do que ele pede para você carregar.
