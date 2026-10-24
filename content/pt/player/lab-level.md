# Lab level e HUD

O lab level é uma pontuação que o mod calcula a partir do seu progresso. Nada é guardado para ele, então ele sempre bate com o que você de fato concluiu. Cada nó concluído dá 10 XP, e cada árvore totalmente concluída dá mais 50. Subir do nível `L` para `L+1` custa `50 + 25 * L` XP, então os primeiros níveis vêm rápido e os seguintes pedem progresso de verdade. O autor do pack pode mudar o XP por nó e por árvore e sobrescrevê-lo numa árvore ou nó específico, que é como um nó de marco passa a valer mais. O lab level inteiro também pode ser desligado num pack.

## Onde aparece

Um **HUD** pequeno mostra o seu nível, uma barra de XP e o contador de combo, e a opção de cliente *Progress HUD* o desliga se você preferir não vê-lo. O nível também pode ser exigido por um nó, com o requisito **needs lab level N**, e o pack pode usá-lo como portão suave entre as seções de uma árvore.

## A faixa de medidores

Ao lado da insígnia do lab ficam os medidores da máquina, e quais aparecem depende do que a árvore usa.

| Medidor | Aparece quando |
| --- | --- |
| FE | o pack definiu um buffer de energia e algo pede energia |
| Fluido | o pack definiu um buffer de fluido e um fluido é usado |
| Sources | o pack definiu um buffer de Source e uma Source é usada, mostrado como uma barra para todas as Sources |

Cada medidor mostra o total, e passar o mouse lista os fluidos ou Sources individuais. No modo Quest Book, a faixa aparece enquanto uma árvore está aberta.
