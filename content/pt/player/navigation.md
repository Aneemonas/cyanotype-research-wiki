# Navegando pela árvore

Uma árvore grande pode ter centenas de nós, então a tela tem câmera livre e alguns atalhos para você voltar ao ponto onde estava.

::video player-navigation "Movendo, dando zoom, enquadrando a vista e buscando"

| Ação | Teclas |
| --- | --- |
| Mover | arraste o fundo, botão direito ou do meio do mouse, as setas ou `WASD` |
| Rolar | roda para vertical, `Shift` + roda para horizontal |
| Zoom | `Ctrl` + `Alt` esquerdo + roda, ou `+` e `-` |
| Resetar a vista, enquadrar tudo | `R` ou `Home`, e `F` |
| Detalhes de um nó | clique nele, ou `Enter` com o mouse sobre ele |
| Fixar um nó | `P` com o mouse sobre ele, ou o botão de pin no painel |
| Busca | o botão de lupa, `Ctrl+F` ou `/` |
| Mostrar ou esconder o inventário | `Tab` |
| Ajuda | `H` ou `F1` |
| Tela cheia | `M` |

## Busca

A caixa de busca leva até um nó pelo título. Digite algumas letras, escolha um resultado da lista e a vista centraliza naquele nó. É o jeito mais rápido de cruzar uma árvore grande quando você sabe o que procura.

## Pins

Um nó fixado é um nó que você quer reencontrar. Os pins são salvos por jogador, então continuam lá depois de fechar a máquina ou sair do jogo, e o time não os compartilha. Numa árvore grande, vale apertar `F` para ver o desenho todo, fixar os dois ou três nós que vêm a seguir e usar a busca ou os pins para voltar a eles enquanto você junta os materiais.

## Linhas e links

As linhas mostram dependências, do pai para os nós que precisam dele. Um nó que depende de, ou exclui, um nó de **outra árvore** não tem linha para desenhar, porque o outro nó não está nesta tela. Em vez disso, ele ganha um pequeno anel girando. O autor também pode esconder as linhas que entram ou saem de um nó sem desfazer a dependência, e é assim que uma árvore coloca um nó longe do pai sem uma linha atravessando a tela.
