# Imagens e fundos

Cada árvore pode ter **imagem de fundo**, **efeito de fundo** animado, **imagens** soltas e um **estilo de linha** próprios. Tudo fica no arquivo da árvore, então vem do servidor e todo jogador vê sem instalar nada.

Ative o editor (`/cyanotype dev true`), abra a árvore e vá em **Tree settings > Pictures and background**.

::video dev-bg-effects "Alternando os efeitos de fundo de uma árvore e mudando a cor"

## Camadas

Da camada mais ao fundo para a mais à frente, a área da árvore é desenhada assim:

1. a cor do vazio;
2. a **imagem de fundo**;
3. o **efeito de fundo** (estrelas, aurora, um shader...), desenhado por cima da imagem;
4. a grade pontilhada (o jogador pode desligar);
5. imagens marcadas como *Behind* (atrás);
6. as linhas, depois os nós;
7. imagens marcadas como *Above* (acima).

Os efeitos de shader são **somados** ao que está atrás deles (preto não soma nada), então a imagem continua visível por baixo.

## Imagem de fundo

| Tag | Significado |
| --- | --- |
| `bg_image` | nome da imagem (veja abaixo) |
| `bg_mode` | `0` cobrir a área, `1` repetir no tamanho original, `2` cobrir e deslizar devagar quando a árvore é arrastada |
| `bg_alpha` | opacidade de 1 a 100 (padrão 100) |

- **Cover** escala a imagem até preencher a área. Escolha uma imagem na proporção de uma janela larga (16:9 serve para a maioria).
- **Tiled** repete a imagem no tamanho original. Use uma textura que se encaixe sem emenda.
- **Drift** preenche a área e se move devagar quando a árvore é arrastada, o que dá sensação de profundidade.
- Reduza o `bg_alpha` (30 a 60) quando a imagem competir com os nós. Texto sobre imagem clara é o maior problema de leitura numa árvore.

::video dev-bg-picture "Cover, tiled e drift na mesma imagem, e o controle de opacidade"

## Nomes de imagem

A tag guarda um **nome**, e não um caminho.

- Um **nome** como `floresta_noite` (letras minúsculas, dígitos, `_` e `-`, no máximo 48 caracteres, sem extensão) é um PNG no **servidor**, em `config/cyanotype/images/floresta_noite.png`. O dev envia pela janela (informando um caminho no computador dele; o servidor salva com o nome escolhido), ou você coloca o arquivo nessa pasta na mão.
- Um nome como `game:minecraft:textures/gui/title/background/panorama_0.png` (`game:<namespace>:<caminho>`) usa uma **textura que o jogo já tem**, seja do vanilla, de um mod ou de um resource pack. Não há nada para enviar, e a aba *Game assets* do seletor lista todas, com busca.

Limites das imagens enviadas: 12 MB, 16384 px de cada lado e 64 imagens por árvore. Os clientes pedem as imagens de uma árvore na primeira vez que ela é desenhada e as guardam até saírem do mundo.

:::tip
Num modpack, prefira `config/cyanotype/images/` (vai junto com o pack, e o servidor envia para todos) a nomes `game:` que dependem de um resource pack que todo jogador também precisaria ter.
:::

## Imagens na árvore

A tag `images` é uma lista, e cada elemento tem estes campos:

```snbt
images: [
  { file: "castelo", x: 0, y: -120, w: 256, h: 0, front: 0b, alpha: 80 }
]
```

| Campo | Significado |
| --- | --- |
| `file` | nome da imagem (como acima) |
| `x`, `y` | **centro** da imagem, em unidades da árvore (as mesmas das posições dos nós) |
| `w`, `h` | tamanho em unidades da árvore. `0` = o tamanho da própria imagem. Defina só um dos dois para escalar mantendo a proporção |
| `front` | `1b` desenha acima das linhas e dos nós; caso contrário, fica atrás |
| `alpha` | opacidade de 1 a 100 |

Imagens servem para rótulos de região ("ramo do Nether"), um logo grande atrás do tronco, setas ou uma peça de cenário atrás de um ramo inteiro.

A **ferramenta Image** (tecla `6` ou `I`) permite posicionar, arrastar e redimensionar direto na árvore, com encaixe de 4 px. Uma imagem cujo arquivo não existe aparece como um contorno com o nome dela.

::video dev-images "Posicionando uma imagem numa árvore com a ferramenta Image"

## Efeitos de fundo

`bg_fx` escolhe o efeito e `bg_fx_color`, a cor.

| `bg_fx` | Efeito | Tipo |
| --- | --- | --- |
| `0` | nenhum | |
| `1` | estrelas: três camadas de pontos que piscam e se movem em velocidades diferentes quando a árvore é arrastada | desenhado pela interface |
| `2` | aurora: duas fitas de cor | desenhado pela interface |
| `3` | rastros: pequenos cometas cruzando a área | desenhado pela interface |
| `4` | brasas: faíscas subindo | desenhado pela interface |
| `5` | **nebula** | shader GLSL que vem com o mod |
| `6` | **plasma** | shader GLSL que vem com o mod |
| `7` | **warp** | shader GLSL que vem com o mod |
| `8` | **shader personalizado**, nomeado por `bg_shader` | seu próprio arquivo GLSL, veja [Shaders personalizados](dev/shaders) |

`bg_fx_color` é a cor do efeito, escrita como **um único número decimal** (`0xRRGGBB`). O padrão é `7334399` (`#6FE9FF`). Na janela, você digita em hex, sem o `#`. Num SNBT editado à mão, o valor precisa ser decimal, porque o SNBT da 1.21.1 não aceita literais `0x`:

| Cor | Decimal |
| --- | --- |
| `#6FE9FF` ciano (padrão) | `7334399` |
| `#FF6B3D` laranja | `16739133` |
| `#9B6BFF` violeta | `10186751` |
| `#59E08A` verde | `5857418` |
| `#FFFFFF` branco | `16777215` |

(Calcule qualquer outra com `R × 65536 + G × 256 + B`.)

Exemplo das tags num arquivo de árvore:

```snbt
bg_fx: 2,
bg_fx_color: 10186751,
bg_image: "floresta_noite",
bg_mode: 2,
bg_alpha: 55,
```

### Efeitos de reserva

- Os efeitos de shader (5 a 8) dependem de o programa GLSL carregar. Se ele não existir, falhar na compilação ou o jogador desligar *Shader backgrounds* na config do cliente (`shader_backgrounds`), a tela desenha um efeito simples no lugar: 5 vira estrelas, 6 aurora, 7 rastros e 8 estrelas. Por isso a árvore nunca fica com o fundo vazio.
- Com **Reduce motion** ligado, o relógio do efeito para, e a imagem fica congelada num momento fixo.
- A opção de cliente `tree_images` desliga **tudo** isso para um jogador: imagem de fundo, imagens soltas e efeitos animados (é a chave de "economizar memória e banda").

:::note
Se um shader pack ou uma GPU antiga desenhar os fundos GLSL errado, troque a árvore por um dos efeitos de 1 a 4, que não usam shader.
:::

## Estilos de linha

Tree settings > **Line style**, guardado como `line_style`:

| Valor | Estilo | Aparência |
| --- | --- | --- |
| `0` | cotovelo (vertical, horizontal, vertical) | o padrão, com linhas de pixel nítidas |
| `1` | reta | uma diagonal reta |
| `2` | cobra (S) | uma curva em S |
| `3` | curva suave | uma curva suave |
| `4` | chanfrado | cotovelo com os cantos cortados |
| `5` | cotovelo (horizontal, vertical, horizontal) | bom para árvores que crescem para o lado |
| `6` | degraus | escada |

Os estilos `0` e `5` ficam nítidos, em pixel. Os diagonais e curvos usam um renderizador de linha com antialiasing, que destoa um pouco da pixel art. Escolha um estilo por árvore e mantenha o mesmo no pack inteiro.

## Qual escolher

| Se você quer | Use |
| --- | --- |
| uma árvore calma e fácil de ler | sem imagem, `bg_fx` 1 (estrelas) e uma cor discreta |
| um ramo de magia ou de fim de jogo | `bg_fx` 2 (aurora) ou 5 (nebula) em violeta |
| clima industrial ou de máquinas | `bg_fx` 4 (brasas) em laranja, ou uma textura de blueprint repetida com `bg_alpha` 30 |
| clima de história ou de região | uma imagem cover com `bg_alpha` de 40 a 60 e algumas imagens com rótulos |
| algo que só o seu pack tem | o seu próprio [shader](dev/shaders) com `bg_fx` 8 |
