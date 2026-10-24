# JEI, EMI e REI

JEI, EMI e REI são opcionais, tanto para compilar o mod quanto para rodá-lo. Com um deles instalado, o mod esconde as receitas bloqueadas e tira o overlay do visualizador da tela da máquina, onde só atrapalharia. O REI é suportado apenas no Fabric.

## Como as receitas chegam ao visualizador

Um visualizador mostra as receitas que o cliente recebeu do servidor. Desde a 0.22.8, o servidor manda ao cliente a lista completa de receitas, inclusive as que a camada do mundo do bloqueio removeu do servidor, e o cliente esconde as que o jogador ainda não pesquisou. É por isso que a receita aparece no instante em que o nó é concluído, sem relogar e sem recarregar o visualizador: o cliente já a tem e só deixa de escondê-la. O bloqueio de receita em si está explicado em [restrições](dev/restrictions).

## JEI

O JEI é atualizado ao vivo pela API de runtime dele. As categorias vanilla são acessadas por constante e as de mods por uma busca de id feita por reflexão, e é por isso que algumas categorias de outros mods podem se comportar diferente das vanilla. Um mod que monta as categorias do JEI uma vez na inicialização e nunca as atualiza pode continuar mostrando o estado inicial até o próximo reload completo do JEI. Se uma categoria de mod ficar para trás das outras, o motivo é esse.

## EMI

O plugin do EMI remove as receitas com saída bloqueada toda vez que o EMI recarrega. Para mudanças ao vivo, o mod guarda todas as receitas que viu no carregamento. Quando os bloqueios mudam, ele monta um novo gerenciador de receitas sem as bloqueadas e o troca por reflexão. Se algo for diferente do que o mod espera, ele registra uma falha e faz um reload normal depois que a tela fecha (`emi_reload`).

O cadeado no índice de itens do EMI é desenhado por dois mixins: um em volta do início e do fim de um lote e outro em volta do desenho da quantidade. Se o EMI mudar esses métodos numa versão futura, o cadeado deixa de aparecer sem nenhum aviso, mas o ocultamento de receitas continua funcionando.

:::warning
A atualização ao vivo do EMI usa reflexão em partes internas dele, então outra versão do EMI pode quebrá-la. Quando isso acontece, o mod volta para um reload normal e nada se perde, mas a atualização deixa de ser instantânea.
:::

## REI

O plugin do REI faz duas coisas. Primeiro, avisa o REI para não cobrir a tela da máquina: a lista de itens e o painel de favoritos nunca aparecem ali, e nunca tomam cliques ou rolagem do Codex e dos popups. Segundo, acrescenta uma regra de visibilidade: uma receita cuja saída está bloqueada para o jogador não aparece, não importa de que jeito ela seja fabricada.

A regra é avaliada toda vez que o REI mostra uma receita, então o bloqueio vale na hora. O caminho contrário dá mais trabalho: o REI monta as receitas quando carrega, com o que o cliente tem naquele momento, e uma receita que estava escondida simplesmente não existe nele. Quando um nó é concluído e receitas voltam, o mod pede um reload ao REI uma fração de segundo depois, para que várias liberações compartilhem um reload só. Essa chamada é interna do REI, e durante o reload ele fica vazio por um instante.

## Opções do cliente

As duas ficam na aba General das [preferências](player/preferences) e vêm ligadas. *EMI live update* troca o gerenciador de receitas sem reload, e *EMI reload after unlock* faz um reload normal quando a tela fecha, se a atualização ao vivo falhou ou se o que está escondido mudou.

## Se uma receita aparece quando não devia

Comece por `/cyanotype recipes check <item>`, que mostra o que o bloqueio entende sobre aquele item. Depois feche e reabra o visualizador, porque alguns mantêm um cache próprio até a próxima abertura. Se houver um mod que guarda receitas em cache no meio, como o Create ou o FastSuite, tente a opção `recipe_lock_world_reload`, descrita em [restrições](dev/restrictions).
