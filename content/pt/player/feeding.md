# Alimentando a máquina

Alguns nós não pedem que você carregue nada. Eles pedem itens, fluidos ou energia **entregues** à máquina, e isso transforma a máquina num pequeno quebra-cabeça de logística, em vez de um menu onde você fica parado.

::video player-feeding "Funil, tubo e cabo entregando à máquina"

## Como entregar

Encoste um funil, tubo ou cabo em **qualquer face** da máquina e alimente por ali. Ela é exigente de propósito: aceita só o que alguma árvore está pedindo e só a quantidade que ainda falta, então um funil não engole uma pilha inteira quando o nó quer oito itens. O que entra fica guardado e só é consumido quando o nó é concluído, por isso nenhum tubo consegue tirar de volta. Fluidos também podem ser despejados à mão: clicar com o botão direito na máquina com um balde enche o buffer de fluido, a menos que o autor do pack tenha desligado isso.

## O que a máquina guarda

| Recurso | Como é guardado |
| --- | --- |
| Itens | os itens entregues esperam dentro da máquina até um requisito usá-los |
| Fluidos | vários fluidos ao mesmo tempo, com o buffer de fluido dividido igualmente entre os que estão em uso |
| Energia (FE) | um buffer próprio |
| Sources | recursos extras como mana do Botania, gases do Mekanism ou personalizados, com o buffer de Source dividido igualmente entre as Sources em uso |

O autor do pack escolhe o tamanho de cada buffer, e todos começam em 0. Um buffer 0 não guarda nada e o medidor dele não aparece, e é por isso que um pack que nunca pede fluidos não mostra medidor de fluido. Os buffers são definidos nas configurações da máquina, veja [recursos da máquina](dev/resources).

## Requisitos detectados por varredura

Dois tipos de requisito não passam por tubo nenhum: um pede que você **jogue um item perto da máquina** e o outro que você **traga um animal ou mob até ela**. A máquina os detecta varrendo a área ao redor uma vez por segundo. A varredura só roda enquanto aquele nó é o que está em andamento e há um jogador dentro do raio, que é de 20 blocos, a menos que o pack tenha mudado.

## Custo operacional

O pack também pode cobrar um **custo operacional** a cada pesquisa, pago em energia, fluidos ou Sources. Ele é somado, a cada conclusão, aos requisitos do próprio nó e aparece no painel do nó, então uma árvore que parece barata ainda pode exigir que a máquina esteja abastecida.

## Autocomplete e o buffer de saída

O pack pode marcar nós como **Autocomplete**, e a máquina os conclui sozinha assim que todos os requisitos estão cumpridos. Também pode mandar as recompensas em item de um nó para o **buffer de saída** da máquina, que tem nove slots. Num nó repetível, os dois juntos transformam a máquina num pequeno produtor, que é o que o [tech pack](examples/tech-pack) faz com pedregulho e ferro. Os detalhes estão em [nós avançados](dev/advanced-nodes).
