# Modelo mental

Três tipos de objeto cobrem quase tudo no mod. Saber a qual deles uma coisa pertence já diz onde ela fica guardada e quem pode mudá-la.

```text
Tree  = id + título + item de entrada + opções + [Node]
Node  = posição + ícone + pais + requisitos (custos, xp, tasks)
        + recompensas + restrições (locks) + visibilidade
Progresso do jogador (por UUID) = nós concluídos por árvore, árvores descobertas, stages, valores de tasks, pins
```

Uma **árvore** é uma lista de nós com algumas opções próprias, como o item que a abre. Um **nó** é um ponto no mapa com tudo que define quando ele pode ser feito e o que acontece ao concluí-lo. O **progresso** é do jogador, não da árvore: guarda os nós que ele concluiu, as árvores que descobriu, os contadores das tasks e os pins.

## Onde cada coisa vive

| O quê | Onde |
| --- | --- |
| Árvores | `config/cyanotype/trees/*.snbt`, distribuídas com o pack |
| Textos de árvores e nós | `config/cyanotype/lang/<código>.json` |
| Progresso | no mundo, como `<mundo>/data/cyanotype_progress.dat`, com os times em `.dat` próprio |
| Opções do mundo | `config/cyanotype/settings.snbt` |

Como as árvores são só arquivos, o modpack leva o desenho inteiro da pesquisa junto com a pasta `config/`. Só o progresso fica no mundo, e é por isso que um mundo novo do mesmo pack começa do zero.

## Quem decide

Quem decide é sempre o **servidor**. O cliente só manda pedidos, como "pesquisar este nó", e o servidor confere a árvore, a máquina e os requisitos antes de cobrar qualquer coisa. O cliente guarda uma cópia das árvores e do progresso só para desenhar a tela, e nenhuma decisão depende dela. Cada handler do servidor confere de novo se o menu está aberto, se a árvore corresponde ao item na máquina e se as ações exclusivas de dev vêm de um jogador em modo dev.

## Orientado a eventos

Quase nada roda por timer. O servidor recalcula os bloqueios quando as árvores ou o progresso mudam e, entre uma mudança e outra, fica parado. O único trabalho periódico é a **checagem de tasks**: uma vez por segundo, para cada jogador, olhando só os nós com requisitos que estão disponíveis naquele momento, a partir de uma lista em cache por jogador e árvore. As medições estão em [desempenho](dev/performance).

## Escrita segura

Tudo que o mod grava passa por um escritor seguro: ele escreve num arquivo temporário, troca pelo verdadeiro e guarda a última versão boa como `nome.bak`. Um arquivo de árvore ilegível é ignorado, vai para o log e nunca é sobrescrito. Ou seja, um erro de digitação num arquivo editado à mão tira aquela árvore do ar por um tempo, mas não destrói o seu trabalho. Um id ou comando errado, escrito pelo autor do pack, também não derruba o tick.
