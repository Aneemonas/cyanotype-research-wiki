# Links entre árvores

Em qualquer campo que aceita o id de um nó da mesma árvore (`parents`, `excludes` e `reveal_nodes`), você pode escrever `outra_arvore/id_do_no` para apontar para um nó de outra árvore. O seletor de nós do editor tem uma aba **Other trees** para isso.

```snbt
{ id: "nether_core", x: 0, y: -120, parents: ["industry/steam_engine"], excludes: ["pacifist/peace_pact"] }
```

::video cross-tree-ring "Um nó com o anel giratório: o pai dele está em outra árvore"

## Como funciona

A avaliação continua local a cada árvore. Por dentro, o conjunto de nós concluídos que a árvore recebe responde `contains("other/node")` com o progresso da outra árvore. Assim, um pai de outra árvore é checado do mesmo jeito que um local, e as demais regras nem precisam saber disso. Ids de árvore nunca têm `/`, o que deixa a separação sem ambiguidade.

Referência a um nó ou árvore que não existe é ignorada, então apagar uma árvore nunca trava quem apontava para ela. Filhos de outras árvores não contam no `max_children`, que só olha filhos da mesma árvore. Como o outro nó não está na tela, não há linha para desenhar, e esses nós ganham um **anel de portal** giratório no lugar. No modo Quest Book, a tecla *link item* (`Y` por padrão) pode destacar o item ligado nas outras árvores.

## Para que serve

Os links entre árvores servem para encadear árvores numa campanha maior sem juntar tudo num mapa gigante. Uma árvore principal **Industrial Age** pode ter uma linha por setor, e cada setor ter a própria árvore, que só abre quando o nó correspondente da principal é concluído. Duas árvores também podem se opor: concluir um nó da árvore **Pacifista** pode excluir o equivalente na árvore **Guerreiro**, e a escolha passa a ser entre árvores, não dentro de uma. Uma árvore **hub** feita só de nós-portão, com texto escondido e escala grande, libera árvores inteiras uma de cada vez e mantém cada uma pequena e fácil de ler.
