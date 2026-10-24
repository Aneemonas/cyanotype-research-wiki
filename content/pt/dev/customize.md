# Personalizando o visual

Quase tudo que se vê no Cyanotype Research pode ser mudado por quem monta o pack, sem mexer em código. Esta página liga cada item ao arquivo onde ele fica e à página que o explica.

::video dev-customize-overview "A máquina padrão ao lado da mesma máquina com tema, sprites, skin e fundo personalizados"

## O que fica onde

| O que você quer mudar | Como | Quem vê | Página |
| --- | --- | --- | --- |
| Cores da interface, brilho, poeira, animação dos popups, confete | `assets/cyanotype/theme.json` num **resource pack** | cada jogador com o pack | [Referência do theme.json](dev/theme) |
| Molduras, botões, formas dos nós, ícones, a imagem do brilho | PNG em `assets/cyanotype/textures/gui/` num resource pack | cada jogador com o pack | [Sprites e texturas](dev/resource-pack) |
| Visual do bloco da máquina | um id de skin no `settings.snbt`, e opcionalmente texturas trocadas por um resource pack | o id da skin: todos, vem do servidor; as texturas: cada jogador com o pack | [Skins da máquina](dev/skins) |
| Sons | `assets/cyanotype/sounds.json` e arquivos `.ogg` num resource pack | cada jogador com o pack | [Sons](dev/sounds) |
| Textos da interface e das árvores | arquivos de idioma | cada jogador (textos de árvore: o servidor envia) | [Traduções](dev/translations) |
| Imagem de fundo, imagens soltas, efeito e cor de **uma árvore** | configurações da árvore (guardadas no arquivo da árvore) | todos, o servidor envia as imagens | [Imagens e fundos](dev/visuals) |
| Seu próprio fundo em GLSL | `config/cyanotype/shaders/<nome>.fsh` | cada jogador precisa do mesmo arquivo | [Shaders personalizados](dev/shaders) |
| Estilo das linhas de uma árvore | configurações da árvore | todos | [Imagens e fundos](dev/visuals#estilos-de-linha) |
| Opções pessoais (blur, efeitos, escala, sons) | janela de Preferências | um jogador | [Preferências](player/preferences) |

O que importa aqui: **resource pack é do lado do cliente**. O servidor não envia nada que está num resource pack, então todo mundo que deve ver o seu tema precisa instalar o pack. O que fica guardado na árvore (imagens, fundo, efeito, estilo de linha) ou no `settings.snbt` (id da skin) vem do servidor e aparece para todos.

## Ordem sugerida

1. Comece pelo [theme.json](dev/theme). É um arquivo pequeno, o resultado aparece com `F3+T`, e uma dúzia de chaves da paleta recolore a interface inteira.
2. Se mudar as cores, troque também os sprites ([Sprites](dev/resource-pack)). Molduras e botões são PNGs ciano, e o `theme.json` não consegue recolori-los.
3. Escolha ou faça uma [skin da máquina](dev/skins).
4. Dê a cada árvore o [fundo e as imagens](dev/visuals) dela. É o que o jogador mais nota ao abrir uma árvore.
5. Se os efeitos prontos não bastarem, escreva um [shader](dev/shaders).
6. Por último, troque os [sons](dev/sounds), se quiser.

## Montando um resource pack para isso

Um único pack pode reunir tudo isso:

```text
CyanotypeVisual/
  pack.mcmeta
  assets/cyanotype/
    theme.json
    sounds.json                      (só se mudar sons)
    lang/pt_br.json                  (só se mudar textos da interface)
    sounds/ui_click.ogg              (seus sons de substituição)
    textures/
      gui/
        halo.png
        sprites/frame.png
        sprites/button.png  (+ .mcmeta)
        ...
      geo/research_station_geral.png (+ .mcmeta)
```

`pack.mcmeta` para a 1.21.1:

```json
{ "pack": { "pack_format": 34, "description": "Visual do Cyanotype Research" } }
```

Copie os arquivos originais de dentro do jar do mod (abra como zip, pasta `assets/cyanotype/`) e edite as cópias. Mantenha os **mesmos nomes e tamanhos**, porque o mod procura exatamente esses nomes. Para recarregar, aperte `F3+T` no jogo.

:::tip
Deixe um mundo criativo aberto com a tela da máquina aberta e aperte `F3+T` a cada salvamento. Sprites, tema e sons recarregam na hora, sem reiniciar.
:::

## O que um pack não consegue mudar

- O **número de skins** ou os ids delas (veja [Skins da máquina](dev/skins)).
- A geometria da máquina (é um arquivo de modelo, e trocá-lo está fora do que esta wiki cobre).
- Qual sprite é usado onde. Um sprite só pode ser substituído por outra imagem com o mesmo nome.
- As fontes.
