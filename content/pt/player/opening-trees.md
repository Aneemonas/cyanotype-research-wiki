# Abrindo uma árvore

O autor do pack escolhe nas configurações do mundo como as árvores são abertas, entre dois modos. A escolha vale para o mundo inteiro, então todos os jogadores de um servidor usam o mesmo.

::video player-opening "Modo Legacy: o blueprint entra e a árvore se desdobra"

## Modo Legacy

Aqui a árvore abre por meio de um item. Você coloca o **item da árvore** no slot central da máquina (em geral um blueprint, mas o pack pode escolher qualquer item) e, se existir uma árvore para ele, ela se desdobra nível por nível, começando pelos nós mais próximos. Tirar o item dobra a árvore de volta. Enquanto a animação roda, o slot fica travado e o item não pode ser retirado.

Depois que você descobre uma árvore, o item que a abre ganha **Research item** na dica. Se o pack mantém as dicas de item ligadas, os itens que algum nó pede ou dá mostram também uma linha **Needed for**. As duas ajudam a descobrir qual blueprint combina com qual árvore.

## Modo Quest Book

Não existe slot central. Você abre o [Codex](player/codex) e clica na árvore. Com a máquina vazia, o Codex abre sozinho nesse modo, e a opção de cliente *Auto-open Codex* controla isso.

## Vocabulário

A mesma tela pode parecer um laboratório de pesquisa, um diário de quests ou uma árvore de habilidades. O autor do pack escolhe o vocabulário nas configurações do mundo, e isso muda só os rótulos de botões e mensagens.

| Modo | Palavras |
| --- | --- |
| Research (padrão) | Research, Complete |
| Quest | Quest, Complete |
| Skill (RPG) | Skill, Learn |

## Árvores não descobertas

Uma árvore que você nunca abriu aparece criptografada no Codex. Na primeira vez que você a abre, ela passa a contar como **descoberta**, e nós de outras árvores podem ser configurados justamente para esperar isso. Veja [requisitos](dev/requirements).
