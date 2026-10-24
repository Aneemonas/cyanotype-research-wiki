# O editor no jogo

O editor é parte da tela da máquina. Ative com `/cyanotype dev true` (só operadores, e dura até o mundo fechar) e a tela ganha as ferramentas de edição e o botão **Save as tree**. Tudo que você faz aqui edita os mesmos arquivos de texto descritos em [o arquivo da árvore](dev/tree-file), então dá para ler, comparar e copiar o resultado como qualquer outra config.

::video dev-editor "Um tour pelas ferramentas do editor"

## Ferramentas

| Ferramenta | Tecla | Uso |
| --- | --- | --- |
| Add | `N` | clique no espaço vazio para criar um nó |
| Move | `1` | arraste; com uma seleção, move todos os nós selecionados juntos |
| Link | `2` | clique no pai (uma linha vermelha segue o mouse) e depois no filho. Clicar num link que já existe o remove. Um link que criaria um ciclo aparece apagado e o clique não faz nada |
| Edit | `3` | editor completo do nó (seis abas, mais abaixo) |
| Delete | `4` | clique num nó para apagá-lo. Com qualquer ferramenta, `Del`, `X` ou `Backspace` apagam o nó sob o mouse ou a seleção inteira |
| Image | `6` ou `I` | coloca e edita imagens na árvore (veja [visuais](dev/visuals)) |
| Auto Complete | `5` | clique num nó para concluí-lo sem pagar custos nem respeitar a ordem (as recompensas ainda são entregues) |
| Collect all | `C` | funciona fora do editor também: conclui, num clique, todos os nós disponíveis que você consegue pagar |
| Reset node | no rodapé do painel | desfaz a conclusão do nó para você e, se o time compartilha progresso, para os colegas também (nós personal ficam de fora) |
| Save | `Ctrl+S` | escreve o arquivo da árvore |
| Tree settings | botão | modo de progressão, esconder inalcançáveis, mensagem de bloqueio, estilo de linha, moeda, imagens e fundo |

Nós e imagens se alinham a uma grade de 4 px ao serem arrastados ou criados.

A opção *Autosave tree* das [Preferências](player/preferences) (desligada por padrão) salva a árvore aberta 30 segundos depois da primeira alteração. Sem ela, nada é gravado até você apertar `Ctrl+S`.

## Seleção e edição

| Ação | Teclas |
| --- | --- |
| Seleção por caixa | `Shift` + arrastar |
| Alternar seleção | `Ctrl` + clique |
| Selecionar tudo | `Ctrl+A` |
| Copiar, recortar, colar | `Ctrl+C`, `Ctrl+X`, `Ctrl+V` (os links entre nós copiados sobrevivem) |
| Colar como filhos dos nós copiados | `Ctrl+Shift+V` |
| Duplicar | `Ctrl+D` |
| Desfazer, refazer | `Ctrl+Z`, `Ctrl+Y` |
| Empurrar | `Shift` + setas, 4 px por toque |
| Limpar a seleção | `Esc` |
| Refazer (alternativa) | `Ctrl+Shift+Z` |

## O editor de nó

A janela tem seis abas e, quando a tela é larga, usa duas colunas. O que você digita se mantém ao trocar de aba, e cada aba tem um botão **?** que abre o tutorial dela na ajuda do jogo.

| Aba | Conteúdo |
| --- | --- |
| **General** | título, descrição (editor grande com prévia de cor ao vivo), ícone, forma, tamanho e mensagem de bloqueio |
| **Options** | hidden, mystery, texto, cadeado e linhas escondidos, personal, optional, dificuldade, uma vez no mundo, repeatable, XP do lab, autocomplete e recompensas para o buffer |
| **Links** | dependências, pais necessários, qualquer pai, escolher N de M, máximo de filhos, nós exclusivos, visibilidade |
| **Requirements** | custo, níveis de XP e tasks |
| **Rewards** | recompensas, tabelas de recompensa, moedas |
| **Restrictions** | itens bloqueados com um conjunto de flags e stages concedidos |

## Criando uma árvore

Para criar uma árvore, coloque no slot central um item que ainda não tenha árvore e clique em **Save as tree**. Um **preset** pode já deixar a árvore montada: até 80 nós em um de quatro layouts, com forma, ícone, padrão de título como `Node %n`, custo, XP, XP de recompensa e as chaves hidden, mystery e any-parent. Os presets ficam no cliente, em `config/cyanotype/presets.snbt`, e por isso acompanham você de um mundo para outro.

## Seletores

Todo id que o editor pede tem um seletor com busca e ícones: itens, tags, mobs, blocos, advancements, biomas, dimensões, estruturas e fluidos. Com `Ctrl` + clique você marca várias entradas e o **Done** devolve todas de uma vez.

A caixa de busca dos seletores tem dois atalhos. Digitar `@` e parte do id de um mod, como `@cataclysm`, mostra só o que pertence àquele mod. Digitar `#` e parte do nome de uma tag lista os membros dela, o que ajuda a ver o que a tag realmente contém antes de usá-la. Nos seletores que misturam entradas, tags e mods, como o das restrições, a aba **Mods** lista todos os mods e escolhe um como `modid:*`. Nos seletores que aceitam várias entradas, apertar Enter numa lista gerada por `@mod` ou `#tag` escolhe tudo que aparece nela.

Advancements e estruturas são pedidos ao servidor, porque o cliente não conhece todos.

## Descrições com cor

As descrições aceitam várias linhas e os códigos de cor do Minecraft, e o editor mostra uma prévia ao vivo enquanto você digita. A lista de códigos está em [traduções](dev/translations#codigos-de-cor).
