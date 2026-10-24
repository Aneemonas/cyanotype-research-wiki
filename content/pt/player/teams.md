# Times

::video player-teams "Criando um time, convidando um amigo e compartilhando o progresso"

O botão **Team** na tela da máquina cria um time e convida outros jogadores pelo nome. Quem recebe o convite vê botões no chat para aceitar ou recusar, e o convite expira em 10 minutos. O pack define o número máximo de membros: 8 por padrão, de 2 a 64.

## O que é compartilhado

Quando um membro conclui um nó, ele conta como concluído para o time todo, e os stages e restrições que vêm com ele acompanham. Uma receita liberada por um colega fica liberada para todos. Se as **recompensas** também vão para todos ou só para quem coletou, é uma configuração do pack. O membro que está offline recebe tudo no próximo login.

Quem entra num time que já existe passa a ter o progresso do time, sem receber as recompensas antigas. O reset de dev de um nó ou de uma árvore também vale para os colegas.

Nem tudo é compartilhado. Os nós marcados como **personal** nunca são copiados para o time, então cada membro precisa fazê-los. Um colega que já seguiu o outro ramo de uma exclusão mantém a própria escolha, e a conclusão compartilhada não a sobrescreve.

:::note
Um requisito como "blocos colocados (total)" lê as estatísticas de cada jogador. O primeiro colega que chega ao número conclui o nó para o time inteiro, então o trabalho de vários jogadores não se soma.
:::

## Comandos por trás dos botões do chat

`/cyanoteam accept <id>`, `/cyanoteam decline <id>` e `/cyanoteam leave` existem para os botões de convite, e qualquer jogador pode usá-los, operador ou não.
