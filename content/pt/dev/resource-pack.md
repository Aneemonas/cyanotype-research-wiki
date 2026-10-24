# Sprites e texturas

A pixel art da tela da máquina são arquivos PNG comuns. Um resource pack substitui qualquer um deles com um arquivo no **mesmo caminho**. O tema só recolore; esta página é sobre trocar a arte em si.

::video dev-resourcepack-sprites "Trocando button.png e frame.png num resource pack"

## Como os sprites são carregados

Os sprites da interface são sprites de GUI padrão do Minecraft 1.21. O arquivo `assets/cyanotype/textures/gui/sprites/<nome>.png` vira o sprite `cyanotype:<nome>`, e configurações extras ficam num `<nome>.png.mcmeta` ao lado. Eles entram no atlas de GUI do jogo a cada recarga de recursos, então o **F3+T** aplica a sua edição.

Regras que valem para todo sprite:

- **Mesmo nome de arquivo.** O mod só procura esses nomes.
- **Mesmo tamanho.** O mod desenha vários deles num tamanho fixo, em pixels de GUI, e uma imagem maior é espremida ou cortada. Os tamanhos estão listados abaixo.
- **A transparência é permitida** e esperada (a maioria dos ícones é transparente em volta da forma).
- **A pixel art é desenhada sem suavização.** Não conte com blur nem antialiasing.
- O `.mcmeta` do original faz parte do sprite. Ao trocar um sprite nine-slice, **copie o `.mcmeta` junto**, com os mesmos números.

## Sprites nine-slice (esticáveis)

Esses sprites crescem para qualquer tamanho: a borda se mantém e o meio estica. O `.mcmeta` tem o formato abaixo, aqui para o `button.png`:

```json
{
  "gui": {
    "scaling": {
      "type": "nine_slice",
      "width": 20,
      "height": 20,
      "border": 4
    }
  }
}
```

`width` e `height` são o **tamanho da imagem** e `border` é a largura dos quatro cantos, em pixels. Se você desenhar o sprite num tamanho diferente, ajuste esses números.

| Sprite | Tamanho da imagem | Borda | Onde |
| --- | --- | --- | --- |
| `frame` | 48×48 | 14 | a moldura da máquina em volta da tela inteira (o meio não é desenhado) |
| `viewport` | 24×24 | 4 | borda da área da árvore (o meio não é desenhado) |
| `popup` | 32×32 | 8 | toda janela popup |
| `button`, `button_hover`, `button_active`, `button_disabled` | 20×20 | 4 | todos os botões, por estado |
| `field`, `field_focus` | 18×18 | 3 | caixas de texto |
| `codex_banner`, `codex_banner_purple`, `codex_banner_gold` | 32×32 | 8 | banners do Codex e da comemoração |
| `codex_card`, `codex_card_done`, `codex_card_locked`, `codex_card_purple` | 32×32 | 6 | cartões do Codex |

:::warning
`frame`, `viewport`, `popup` e os banners e cartões do Codex também passam por um caminho rápido de desenho ("Fast frames" nas Preferências, ligado por padrão), que lê o PNG usando o **tamanho e a borda originais embutidos no mod**. Para esses sprites, mantenha tamanho e borda exatamente como na tabela. O jogador pode desligar *Fast frames*, mas o caminho padrão ficaria errado, então não mude os números.
:::

## Sprites dos nós

Os nós usam os arquivos `node_<forma>_<estado>.png`.

| Forma | Tamanho | Sprites |
| --- | --- | --- |
| square (quadrado) | 24×24 | `node_square_locked`, `_available`, `_ready`, `_done`, `_master` |
| circle (círculo) | 26×26 | `node_circle_…` (mesmos cinco estados) |
| diamond (losango) | 32×32 | `node_diamond_…` |
| hexagon (hexágono) | 30×30 | `node_hexagon_…` |
| socket (nó de item) | 24×24 | `node_socket_locked`, `_available`, `_ready`, `_done`, `_master` |

Os estados são: **locked** (inalcançável), **available** (pode ser iniciado), **ready** (tudo cumprido, esperando o jogador), **done** (concluído) e **master** (fim de um ramo). O `scale` do nó (0,5 a 3) amplia o sprite, então mantenha o tamanho original.

`node_available.png`, `node_done.png` e `node_locked.png` (24×24) estão nos arquivos, mas não encontrei código que os use. Parecem o conjunto antigo do quadrado, então edite os `node_square_*`.

Outras peças pequenas dos nós: `badge_done` (9×9, check no nó concluído), `pin_mark` (7×7, nó fixado), `diff_peaceful`, `diff_easy`, `diff_normal` e `diff_hard` (7×7, marcas de dificuldade) e `item_lock` (10×10, cadeado em itens bloqueados no inventário e nos visualizadores de receita).

::video dev-resourcepack-nodes "A mesma árvore com os sprites de nó padrão e com um conjunto personalizado"

## Ícones

Todos 16×16 e transparentes: `icon_arrow_down`, `icon_arrow_up`, `icon_auto`, `icon_bolt`, `icon_center`, `icon_check`, `icon_check_purple`, `icon_close`, `icon_codex`, `icon_collect`, `icon_crown`, `icon_dev`, `icon_drop`, `icon_edit`, `icon_expand`, `icon_eye`, `icon_flame`, `icon_full`, `icon_help`, `icon_image`, `icon_info`, `icon_inv`, `icon_link`, `icon_lock`, `icon_move`, `icon_newtree`, `icon_pin`, `icon_plus`, `icon_prefs`, `icon_redo`, `icon_reset`, `icon_reset_s`, `icon_save`, `icon_search`, `icon_shrink`, `icon_skin`, `icon_sort`, `icon_spark`, `icon_star`, `icon_team`, `icon_trash`, `icon_trophy`, `icon_undo`.

Os nomes dizem o que cada um é (`icon_save` é o botão de salvar). `icon_eye`, `icon_reset_s`, `icon_skin`, `icon_sort` e `icon_trophy` vêm no mod, mas não encontrei onde são carregados.

## Ícones de moeda

As moedas virtuais usam um conjunto de 15 ícones: `coin`, `crown`, `feather`, `flask`, `gem`, `heart`, `key`, `leaf`, `orb`, `scroll`, `shard`, `shield`, `skull`, `soul`, `star`. Cada um existe duas vezes:

| Arquivo | Tamanho | Usado em |
| --- | --- | --- |
| `cur16_<nome>.png` | 16×16 | ícone grande na lista de moedas e nos requisitos |
| `cur_<nome>.png` | 6×7 | ícone minúsculo ao lado de números |

A moeda escolhe o ícone no `currencies.snbt` por esse nome (veja [Recursos](dev/resources)). Dá para redesenhar todos, mas não para adicionar um décimo sexto, porque a lista de nomes é fixa no mod.

## Outros sprites

| Sprite | Tamanho | Onde |
| --- | --- | --- |
| `slot` | 18×18 | slots de inventário na tela da máquina |
| `socket` | 28×28 | o slot grande de item no meio da máquina |
| `header_arms` | 152×40 | decoração acima da moldura |
| `codex_emblem`, `codex_emblem_purple`, `codex_emblem_gold` | 32×32 | emblema no banner do Codex e nas comemorações |
| `hud_hex_cyan`, `hud_hex_gold`, `hud_hex_violet` | 24×24 | o hexágono do nível do laboratório, que muda com o nível |
| `head_unknown` | 8×8 | cabeça padrão na janela de Time |
| `pip_bolt`, `pip_box`, `pip_drop`, `pip_src` | 6×7 | marcadores minúsculos de custo (energia, itens, fluido, Source) no painel do nó |

## O halo

`assets/cyanotype/textures/gui/halo.png` (64×64) é a imagem de brilho suave desenhada atrás dos nós prontos, concluídos e mestres. Ela é tingida pelas cores do grupo `halo` do [theme.json](dev/theme#halo), então use cinza ou branco com alfa suave para as cores funcionarem. É uma textura simples, não um sprite, e não tem `.mcmeta`.

## Itens e blocos

| Arquivo | Tamanho | O quê |
| --- | --- | --- |
| `textures/item/*_blueprint.png` | 16×16 | os 30 itens de blueprint (alchemy, automation, aviation, building, combat, cooking, defense, dungeon, electrical, enchanting, end, engineer, exploration, factory, farming, fishing, fluid, forestry, logistics, magic, mining, nether, redstone, research, rotational force, smelting, space, steam, storage, trading; `research_blueprint` é o genérico) |
| `textures/item/research_station.png` | 16×16 | o ícone do item da estação |
| `textures/block/barrier_gate.png` | 16×16 | o bloco Barrier Gate |

Os modelos (`assets/cyanotype/models/item` e `block`) apontam para esses nomes, então vale a mesma regra de trocar pelo nome. O bloco da estação em si não usa uma textura assim: é o modelo animado (veja [Skins da máquina](dev/skins)).

## Um fluxo de trabalho que poupa tempo

1. Abra o jar do mod como zip e copie `assets/cyanotype/textures/gui/sprites/` para fora.
2. Deixe no pack só os arquivos que você mudou. Um pack com 3 arquivos funciona.
3. Edite num editor de pixel art que preserva a transparência e **não reamostra** a imagem (Aseprite, LibreSprite, GIMP com o lápis, Paint.NET).
4. Ative o pack, abra a tela da máquina e aperte `F3+T` depois de cada salvamento.
5. Se um sprite aparecer roxo e preto (textura ausente), o nome ou a pasta está errado. Se aparecer esticado, o tamanho não é o original.


## Conferindo o resultado

- O `logs/latest.log` lista os sprites e `.mcmeta` que falharam ao ler.
- Passe por todos os estados: mouse sobre um botão, foco numa caixa de texto, um popup aberto, o Codex, um nó concluído.
- Teste com um nó de cada forma (o editor de nós permite trocar a forma).
