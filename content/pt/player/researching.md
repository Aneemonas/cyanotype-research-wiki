# Pesquisando um nó

Clicar num nó abre os detalhes dele no painel lateral: ícone, título e descrição (que pode ter cor e várias linhas), os **requisitos** com o progresso (`3/10`), as **recompensas** e o botão de pesquisa.

::video player-researching "Segurando o botão até o anel encher"

## Segure para pesquisar

Pesquisar exige um gesto deliberado: você **segura** o botão, ou o próprio nó, até o anel em volta dele encher. O padrão é 900 ms, e dá para ajustar de 100 a 3000 ms nas [preferências](player/preferences). A espera existe para que um clique perdido numa árvore cheia não gaste o seu ferro.

Os itens saem do seu inventário e os níveis de XP são gastos, exceto no criativo, onde nada é pago. Os requisitos que não são de pagamento (matar, olhar para um bloco, ficar num lugar, num bioma ou esperar um timer) se cumprem **sozinhos enquanto você joga**, mas só depois que o nó fica disponível. Alguns você clica: uma tarefa de check tem o próprio botão no painel. Outros são entregues, ou seja, em vez de carregar algo você alimenta a máquina. Veja [alimentando](player/feeding).

## Escolhas

Se o nó tem uma recompensa **Choice**, uma janela pede que você escolha uma opção para cada escolha antes de o nó ser concluído. Cancelar deixa tudo como estava e nada é pago. A recompensa **wheel** não pede nada, porque sorteia a recompensa com os pesos definidos pelo autor.

## Collect All

O botão *Collect All* conclui, em ordem e num único clique, todo nó disponível que você consegue pagar. Ele para e pergunta quando chega a um nó com recompensa Choice.

## Som e efeitos

Cada pesquisa toca um som, e um `+XP` flutuante sobe do nó. Concluir vários nós em sequência rápida monta um contador de combo, e avisos na tela podem anunciar o que um nó liberou.

:::note
O progresso de tarefas como matar, olhar para blocos, timers e trazer algo para perto da máquina só conta **enquanto o nó está disponível para você**, e é checado uma vez por segundo, então um evento muito curto pode passar batido. Requisitos que leem um estado atual (itens que você carrega, advancements, estatísticas, stages e o seu lab level) valem na hora, sem espera.
:::
