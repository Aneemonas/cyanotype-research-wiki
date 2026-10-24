# Nós avançados

Tudo nesta página é configurado por nó, na aba **Options** do editor de nó ou como campo no arquivo da árvore. Uma árvore simples não precisa de nada disso, mas sockets, dificuldade e o par autocomplete + buffer de saída mudam o jeito de jogar o pack, então vale ler antes de desenhar a progressão em torno deles.

## Sockets

Um socket é um nó que pede um item encaixado nele de verdade, como uma gema numa joia. Ele usa o requisito `socket`, com três argumentos: o item (pode ser uma `#tag`), a quantidade e `auto` ou `manual`.

```snbt
{ id: "gem_slot", x: 0, y: -60, parents: [],
  tasks: [{ type: "socket", args: ["minecraft:amethyst_shard", "1", "auto"] }] }
```

::video dev-sockets "Um nó socket: o jogador leva um item até ele, o socket se enche e tudo que estava atrás se abre"

O jogador não paga um socket com o botão de pesquisa. Com o nó disponível, clicar nele abre a barra de inventário (opção do cliente *Socket: open inventory*; a barra fecha quando o socket é preenchido ou quando o jogador clica em outro lugar). Aí ele pega o item com o cursor e clica no nó. O servidor confere se a pilha no cursor é o item certo e tem pelo menos a quantidade pedida, retira exatamente essa quantidade e guarda dentro do nó. Se o item estiver errado, uma mensagem na action bar avisa e nada é movido.

O que separa um socket de um custo é o efeito dele no resto da árvore. **Todo nó que descende de um socket vazio fica escondido**, e não só os filhos diretos: a cadeia inteira. O jogador vê um slot sozinho, sem nada depois. Quando o item entra, um anel de faíscas sai do socket e os nós escondidos aparecem nível por nível, com as linhas crescendo e cada nó surgindo no lugar, como a árvore inteira se abre quando um blueprint é inserido. Tirar o item dobra tudo de novo.

Enquanto o nó não estiver concluído, o jogador pode pegar o item de volta clicando no socket cheio. Um socket `manual` preenchido espera o botão normal de pesquisa, então dá para mudar de ideia. Com `auto`, o nó é concluído no instante em que o item entra, e o socket vira uma porta de mão única. No editor, um clique simples no socket só o seleciona, então para testar o encaixe você precisa estar segurando um item.

Algumas observações práticas. O nó guarda a pilha de verdade, com os components, então quem pega o item de volta recebe o mesmo item. Colegas de time não compartilham a pilha: se um colega estiver offline quando você resetar o nó, o item continua no socket dele até ele logar de novo. Sockets têm sprites próprios (`node_socket_*`, veja [sprites](dev/resource-pack)), e o jogador pode desligar a abertura automática do inventário nas [Preferências](player/preferences) se preferir abri-lo por conta própria.

Sockets funcionam melhor como portão na frente de um ramo que precisa parecer uma conquista: uma gema que tem de ser achada no mundo antes de uma linha de melhorias aparecer, ou um blueprint que precisa ser entregue para uma seção inteira da árvore existir. Para um custo que é só pagar, use `cost` ou `have`.

## Dificuldade

Cada nó tem um conjunto de dificuldades entre Peaceful, Easy, Normal e Hard, configurado em *Difficulty* no editor de nó e guardado como a máscara de bits `difficulties` (1, 2, 4 e 8 somados). O padrão são as quatro, ou seja, o nó não depende disso. Se o conjunto do nó não inclui a dificuldade atual do mundo, ele simplesmente não existe enquanto o mundo estiver nela: não é desenhado, não pode ser pesquisado e não conta na porcentagem da árvore.

::video dev-difficulty "Mudando a dificuldade do mundo: nós que só existem no Hard aparecem e somem, e as linhas se reconectam"

Quem vale é a dificuldade do mundo, nunca uma configuração por jogador: no single player é a do mapa, numa LAN é a do host e num servidor é a do servidor. O servidor a lê a cada tick, então mudar com `/difficulty` tem efeito quase imediato.

Três regras, aplicadas em conjunto, decidem se um nó está ativo.

1. Um nó já concluído está sempre ativo. Trocar a dificuldade nunca tira progresso do jogador.
2. Um nó não concluído fica inativo quando o conjunto dele não inclui a dificuldade atual.
3. Um nó não concluído que tem pais também fica inativo quando todos os pais existentes estão inativos, porque não há mais caminho até ele.

Há mais uma regra, que importa em árvores ramificadas: quando um filho foi concluído por um dos pais, o pai não concluído que só existe em outra dificuldade some, porque o caminho do jogador já está definido. É isso que permite que um pai só do Hard e um pai do Normal alimentem o mesmo filho sem que o do Hard vire um beco sem saída.

Stages e recompensas de atributo de um nó que acabou de ficar inativo são retirados, e voltam quando o nó volta. Isso acontece uma vez por segundo, junto com o resto da reconciliação, então pode haver um pequeno atraso depois de trocar a dificuldade. Marquinhas nos nós mostram quais têm dificuldade limitada (a opção do cliente *difficulty marks* as desliga), e o editor dev continua mostrando os nós escondidos pela dificuldade, para você poder editá-los. Um script pode escutar o `NodeActiveChangedEvent` para reagir.

Usos comuns: um ramo do modo difícil com recompensas melhores, uma alternativa para o modo pacífico numa tarefa de combate (dois nós irmãos, cada um limitado às suas dificuldades, alimentando o mesmo filho) e um nó de tutorial que só existe no Easy.

## Uma vez no mundo

Um nó com `world_once` só pode ser concluído por um jogador: o primeiro. A conclusão fica registrada para o mundo inteiro, e quem tentar depois recebe a mensagem *world taken*. Combine com uma recompensa `function` em modo `world` para anunciar o vencedor (veja [funções](dev/functions)). Serve para um artefato único ou uma corrida entre jogadores, e faz pouco sentido numa árvore compartilhada por time, já que o time inteiro conta como quem terminou.

## Nós pessoais

`personal` tira o nó do compartilhamento de time. Cada jogador precisa concluí-lo por conta própria, e a conclusão nunca é copiada para os colegas. Use em escolhas que definem o personagem, como uma classe, para que dois colegas possam seguir caminhos diferentes.

## Nós repetíveis

Um nó com `repeatable` e `repeat_seconds` pode ser concluído de novo depois do intervalo, de 1 a 31 536 000 segundos (padrão 60). Depois da primeira conclusão, os filhos continuam liberados, então repetir nunca fecha um ramo. A cada repetição os requisitos recomeçam do zero e as recompensas são pagas de novo, e uma barra fina sob o nó faz a contagem até a próxima vez em que ele pode ser feito.

Sozinho, o nó repetível serve de recompensa diária, de botão de resgate com recarga ou de missão que volta. Junto com autocomplete e o buffer de saída, ele transforma a máquina num produtor, como explicado a seguir.

## Autocomplete e o buffer de saída

São duas opções separadas, `auto_complete` e `reward_to_buffer`, pensadas para uso em conjunto.

Com `auto_complete`, a máquina pesquisa sozinha. Uma vez por segundo ela olha a árvore aberta nela (o item no slot, no modo Legacy, ou a última árvore aberta ali, no modo Quest Book) e, para o último jogador que abriu a máquina e continua online, conclui todo nó marcado que esteja disponível e pago, até 8 por passada. Os recursos da própria máquina cobrem os requisitos entregues, e os custos de item e XP saem do inventário daquele jogador. Nós com recompensa Choice ficam de fora porque alguém precisa escolher, assim como nós exclusivos e qualquer nó vetado por um listener de `ResearchAttemptEvent`. Esses esperam um clique.

Com `reward_to_buffer`, as recompensas em item do nó (loot tables e sorteios de tabela inclusos) vão antes para o buffer de saída da máquina. O buffer tem nove slots, expostos em todas as faces só para extração, então um funil ou tubo pode puxar de lá. O que não couber vai para o jogador, como de costume.

Juntando nó repetível, autocomplete e buffer de saída, você tem uma fábrica sem receita: um funil entrega pedregulho, o nó conclui a cada dois minutos e o ferro aparece no buffer para outro funil levar embora. O [tech pack](examples/tech-pack) monta exatamente isso, e a mesma ideia serve para uma fazenda, um drop de mob ou um ralo de itens.

::video dev-producer "Um nó repetível com autocomplete alimentando o buffer de saída, e um funil retirando o resultado"

## Containers

O requisito `container` lê os inventários ao redor da máquina: baús, barris, molduras com um item container (como um badge case) e bundles. A varredura só roda enquanto o nó está disponível e há um jogador dentro do raio de varredura (20 blocos por padrão, de 4 a 64 nas configurações do mundo), então não custa nada numa árvore sem ninguém por perto. Com `consume`, os itens saem dos containers quando o nó é concluído; com `keep`, só são conferidos.

## Barrier Gates

O Barrier Gate (`cyanotype:barrier_gate`) é um bloco de parede transparente que só deixa passar quem pesquisou o nó certo.

::video dev-barrier "Um Barrier Gate: invisível para quem pode passar, sólido para os outros"

Para quem pode passar, o bloco nem é desenhado; para todos os outros ele aparece como um cubo translúcido, inclusive para jogadores no criativo e no espectador, para que quem constrói veja o que está construindo. O id do portão é o nome personalizado do item que você coloca (definido numa bigorna), ou você o define depois por comando. Um nó abre o portão com a recompensa `open_barrier`, informando o id e `open` ou `close`. Um portão aberto por recompensa fecha de novo se o nó for resetado, então resetar uma árvore de teste devolve o mundo ao que era.

Os comandos são `/cyanotype barrier set <pos> <id> [allow_mobs]` para um bloco, `fill <from> <to> <id> [allow_mobs]` para uma área, `open` e `close <players> <id>` para forçar na mão e `list <player>` para ver o que um jogador pode atravessar. `allow_mobs` deixa mobs passarem e vem desligado.

:::note
Um portão aberto na mão com `/cyanotype barrier open` não tem nó de origem, então resetar um nó não o fecha. O mesmo vale para portões abertos em saves das versões 0.20.0 e 0.20.1. O log do servidor também pode mostrar `Mismatch in destroy block pos` quando um jogador sem permissão para quebrar blocos ali clica num portão. É inofensivo.
:::

## Itens ligados e a máquina portátil

Duas teclas ficam em Controles, na categoria Cyanotype. *Show the nodes of the hovered item* vem em `Y` e destaca todos os nós que pedem ou dão o item sob o cursor, no inventário ou no JEI, EMI e REI. *Open the machine (portable)* vem sem tecla e só funciona com a opção de mundo `portable_machine` ligada: a tela abre em qualquer lugar, sem precisar de um bloco colocado. A máquina portátil não tem requisitos de entrega nem custo operacional, porque energia e fluidos precisam de uma máquina real para chegar.

## XP do lab sobrescrito

O XP que um nó, ou uma árvore inteira, dá ao lab level pode ser sobrescrito. No editor de nó o valor fica na aba Options; nas configurações da árvore, ele vale para o bônus de árvore concluída. Nos dois casos, -1 significa "usar o valor do mundo". Para que serve esse número, veja [lab level](player/lab-level).
