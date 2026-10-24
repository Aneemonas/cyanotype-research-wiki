# Referência do theme.json

O `theme.json` reúne todas as cores e números que definem o visual e o movimento da tela da máquina: paleta, cores das linhas, brilho atrás dos nós, poeira flutuante, animação dos popups e confete. O arquivo vem dentro do mod, em `assets/cyanotype/theme.json`, e um resource pack pode alterar qualquer valor **sem copiar o arquivo inteiro**.

::video dev-theme-recolor "Editando o theme.json num resource pack e apertando F3+T: a interface inteira muda de cor"

:::note
O `theme.json` cuida só de cores e números. A pixel art (molduras, botões, formas dos nós, ícones, imagem do brilho) são PNGs comuns, e o modelo da máquina é outra história. Veja [Sprites e texturas](dev/resource-pack) e [Skins da máquina](dev/skins).
:::

## Onde o arquivo fica

Dentro do seu resource pack, com exatamente este caminho:

```text
MeuPack/
  pack.mcmeta
  assets/
    cyanotype/
      theme.json
```

`pack.mcmeta` para o Minecraft 1.21.1 (pack format 34):

```json
{
  "pack": {
    "pack_format": 34,
    "description": "Meu tema do Cyanotype"
  }
}
```

Coloque a pasta (ou um zip com o `pack.mcmeta` na raiz) em `resourcepacks/` e ative em *Opções > Pacotes de recursos*.

## Como ele é lido

- O arquivo de dentro do mod é a base. Cada resource pack que tiver o arquivo é aplicado por cima, na ordem dos packs, **chave por chave**, então o pack só precisa listar o que muda.
- **F3+T** recarrega os resource packs e o tema juntos, sem reiniciar o jogo.
- Chaves que começam com `_` (como `_help`) são ignoradas, então servem de anotação.
- Um arquivo de pack com JSON inválido é **ignorado por inteiro** (uma linha no `latest.log`, e nada mais quebra). Um valor errado também não é fatal: aquela chave volta ao padrão e o log registra um aviso (os 5 primeiros, e depois só a contagem).
- Número fora da faixa é ajustado para o limite mais próximo. Número onde o mod espera cor (e o contrário) conta como valor inválido.
- Objeto aninhado e chave com ponto são a mesma coisa. Estes dois são equivalentes:

```json
{ "palette": { "accent_3": "#FFB000" } }
```

```json
{ "palette.accent_3": "#FFB000" }
```

## Tipos de valor

| Tipo | Como escrever |
| --- | --- |
| Cor | `"#RRGGBB"` (opaca) ou `"#AARRGGBB"` (com alfa, `00` é invisível). `"0xRRGGBB"` também vale. Um número JSON puro é lido como o valor ARGB, então `16757248` não é um jeito seguro de escrever cor (o alfa fica 0): use a string. |
| Referência | `"@palette.accent_3"` pega o valor de outra chave. Pode apontar para outra referência (até 8 passos). A referência é seguida depois que os packs são somados, então se você mudar só `palette.accent_3`, toda chave que aponta para ela acompanha. |
| Número | um número JSON. Tempos em milissegundos, `*_alpha` e `*_opacity` vão de 0 (invisível) a 1. |
| Chave liga/desliga | `true` ou `false`. |
| Lista de cores | `[ "#RRGGBB", ... ]`, só no confete. **Referências não funcionam dentro de listas**, e uma entrada ruim faz a lista inteira voltar ao padrão. |

O mais útil de tudo isso: quase tudo aponta para a paleta. Para recolorir a interface, normalmente basta mexer em **uma dúzia de chaves da paleta**, e não nas 160.

## Paleta

São as cores base, e quase todos os outros grupos apontam para elas. O nome indica a família: `accent_*` é o ciano do visual padrão, `violet_*` o roxo dos nós mestres e do Codex, `gold`, `danger`, `success` as cores de status, `text_*` os cinzas do texto, `surface_*`, `row_*`, `edge`, `divider` os painéis e listas, `viewport_*`, `grid_*`, `axis`, `void` a área da árvore, `header_*` as barras de título, `toggle_*` os interruptores, `link_*` a linha vermelha que você arrasta no editor.

| Key | Default |
| --- | --- |
| `outline` | `#02040B` |
| `surface_0` | `#070B1A` |
| `surface_1` | `#0E1838` |
| `surface_2` | `#111C47` |
| `surface_3` | `#1C3C7E` |
| `panel` | `#0A1128` |
| `accent_0` | `#073746` |
| `accent_1` | `#0E6F8C` |
| `accent_2` | `#1FC4E4` |
| `accent_3` | `#2FE4FF` |
| `accent_4` | `#9FF6FF` |
| `accent_dim` | `#11A8C9` |
| `accent_shade` | `#0A6A86` |
| `violet_0` | `#1A0C40` |
| `violet_1` | `#35187F` |
| `violet_2` | `#6A3FE0` |
| `violet_3` | `#8A5CFF` |
| `violet_hi` | `#F3EAFF` |
| `violet_tint` | `#A982F5` |
| `violet_soft` | `#D9C6FF` |
| `violet_text` | `#C9AEFF` |
| `gold` | `#FFC531` |
| `gold_hi` | `#FFE98A` |
| `amber` | `#C98A0F` |
| `danger` | `#FF4F6A` |
| `danger_soft` | `#FF9CB4` |
| `danger_dark` | `#C21F45` |
| `success` | `#25E39A` |
| `success_hi` | `#A6FFD8` |
| `success_dim` | `#0F8A5E` |
| `text` | `#DCE8FF` |
| `text_soft` | `#B9C8EE` |
| `text_muted` | `#9FB0D8` |
| `text_dim` | `#6A7CAE` |
| `text_disabled` | `#4A5A80` |
| `text_on_active` | `#03222B` |
| `mystery` | `#8EA6E0` |
| `hover_tint` | `#4FE0F0` |
| `spark` | `#EAFFFF` |
| `spark_soft` | `#BFF6FF` |
| `spark_violet` | `#E4D6FF` |
| `row` | `#0F1A3E` |
| `row_hover` | `#1B3A7C` |
| `row_dark` | `#0B1230` |
| `row_gradient` | `#12275A` |
| `edge` | `#2A4A9A` |
| `edge_dim` | `#27428F` |
| `divider` | `#18326E` |
| `void` | `#050816` |
| `viewport_top` | `#0A1330` |
| `viewport_bottom` | `#060914` |
| `grid_major` | `#2A5AB0` |
| `grid_minor` | `#1A2C62` |
| `axis` | `#16306A` |
| `header_top` | `#14214F` |
| `header_bottom` | `#0A1230` |
| `header_text` | `#E6FFFF` |
| `bar_tip` | `#E8FDFF` |
| `toggle_hover` | `#7E9BE8` |
| `toggle_off` | `#5878D0` |
| `toggle_dot` | `#3A5FD0` |
| `toggle_track` | `#1A2A66` |
| `link_glow` | `#FFB0BC` |
| `link_invalid` | `#8A3040` |
| `link_invalid_glow` | `#B06070` |

## Lines (linhas)

Cores das conexões entre nós, pelo estado do nó para onde elas vão, mais os pulsos de luz que correm por elas.

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `lines.locked` | `@palette.surface_3` |  | linha para um nó bloqueado |
| `lines.available` | `@palette.text` |  | linha para um nó disponível |
| `lines.available_glow` | `#FFFFFF` |  | brilho dela |
| `lines.ready` | `@palette.accent_2` |  | linha para um nó pronto |
| `lines.ready_glow` | `@palette.accent_4` |  | brilho dela |
| `lines.done` | `@palette.success` |  | linha entre nós concluídos |
| `lines.done_glow` | `@palette.success_hi` |  | brilho dela |
| `lines.master` | `@palette.violet_2` |  | linha para um nó mestre |
| `lines.master_glow` | `@palette.violet_hi` |  | brilho dela |
| `lines.wave` | `@palette.violet_2` |  | cor da onda que corre pelas linhas ao concluir |
| `lines.wave_glow` | `@palette.violet_hi` |  | brilho dela |
| `lines.pulse.speed` | `0.07` | 0 a 2 | velocidade dos pulsos de luz que correm pelas conexões |
| `lines.pulse.tail` | `10` | 1 a 40 | comprimento da cauda do pulso |
| `lines.pulse.glow_alpha` | `0.16` | 0 a 1 | opacidade do brilho em volta do pulso |
| `lines.pulse.max_per_frame` | `60` | 0 a 1000 | máximo de pulsos por quadro (limite para árvores enormes; 0 = nenhum) |

## Halo

Brilho suave atrás de nós prontos, concluídos e mestres. O jogador também pode desligar nas Preferências (*Node halos*).

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `halo.enabled` | true |  | liga/desliga o brilho atrás dos nós |
| `halo.ready` | `@palette.accent_3` |  | cor do brilho, prontos |
| `halo.done` | `@palette.success` |  | cor do brilho, concluídos |
| `halo.master` | `@palette.violet_3` |  | cor do brilho, mestres |
| `halo.ready_opacity` | `0.45` | 0 a 1 | brilho dos nós prontos |
| `halo.ready_pulse` | `0.25` | 0 a 1 | quanto o brilho dos prontos "respira" |
| `halo.done_opacity` | `0.4` | 0 a 1 | brilho dos nós concluídos |
| `halo.master_opacity` | `0.55` | 0 a 1 | brilho dos nós mestres |
| `halo.radius_extra` | `13` | 0 a 80 | raio do brilho além da borda do nó, em px |
| `halo.max_nodes` | `160` | 0 a 5000 | árvores com mais nós que isso ficam sem halo (desempenho) |
| `halo.min_zoom` | `0.5` | 0 a 3 | sem halo abaixo deste zoom |

## Nodes (nós)

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `nodes.selection` | `@palette.accent_3` |  | contorno da seleção (editor) |
| `nodes.selection_march` | `@palette.accent_4` |  | os traços que andam no contorno |
| `nodes.hover_brackets` | `#FFFFFF` |  | cantoneiras sob o mouse |
| `nodes.search_flash` | `#FFFFFF` |  | cor do piscar depois da busca |
| `nodes.search_flash_ms` | `2200` | 200 a 20000 | quanto tempo o nó achado pisca depois da busca |
| `nodes.locked_shade` | `#AA050816` |  | véu escuro sobre nós bloqueados |
| `nodes.undiscovered_shade` | `#EE050816` |  | véu sobre entradas não descobertas do Codex |
| `nodes.hold_grow` | `0.28` | 0 a 2 | quanto o nó cresce enquanto você segura para concluir |
| `nodes.hold_shake` | `2.2` | 0 a 20 | amplitude da tremida ao segurar, em px |
| `nodes.bounce` | `0.38` | 0 a 2 | tamanho do pulo quando o nó conclui |
| `nodes.bounce_ms` | `520` | 50 a 5000 | duração desse pulo |
| `nodes.wave_grow` | `0.42` | 0 a 2 | crescimento da onda que corre pela árvore quando um nó conclui |
| `nodes.max_item_icons` | `140` | 0 a 2000 | máximo de ícones de item por quadro |
| `nodes.item_min_zoom` | `0.55` | 0 a 3 | os ícones de item só aparecem acima deste zoom |

## Ambient (ambiente)

A camada de "a máquina está viva": a luz que corre pela moldura, os LEDs dos cantos, a poeira, a linha de varredura e algumas cores de seleção. O jogador pode desligar o grupo todo nas Preferências (*Ambient effects*) sem mexer no tema.

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `ambient.frame_light.enabled` | true |  | luz que corre pela moldura da máquina |
| `ambient.frame_light.length` | `34` | 2 a 400 | comprimento dessa luz |
| `ambient.frame_light.period_ms` | `9000` | 500 a 120000 | tempo de uma volta |
| `ambient.frame_light.head` | `@palette.spark` |  | cabeça da luz |
| `ambient.frame_light.tail` | `@palette.accent_3` |  | cauda dela |
| `ambient.corner_leds.period_ms` | `700` | 100 a 20000 | período de piscada dos LEDs dos cantos |
| `ambient.corner_leds.on_a` | `@palette.accent_3` |  | cor A do LED |
| `ambient.corner_leds.on_b` | `@palette.success` |  | cor B do LED |
| `ambient.corner_leds.off` | `@palette.edge_dim` |  | LED apagado |
| `ambient.particles.count` | `26` | 0 a 300 | partículas de poeira flutuando na área da árvore |
| `ambient.particles.alpha_min` | `0.1` | 0 a 1 | opacidade mínima da partícula |
| `ambient.particles.alpha_range` | `0.22` | 0 a 1 | opacidade extra aleatória somada |
| `ambient.particles.color_bright` | `@palette.accent_4` |  | partículas claras |
| `ambient.particles.color` | `@palette.accent_3` |  | partículas normais |
| `ambient.scan_line.enabled` | true |  | linha fraca que desce pela área da árvore |
| `ambient.scan_line.color` | `@palette.accent_3` |  | cor da linha |
| `ambient.scan_line.alpha` | `0.035` | 0 a 1 | opacidade da linha |
| `ambient.scan_line.period_ms` | `7000` | 500 a 120000 | tempo de uma varredura |
| `ambient.scan_line.height` | `10` | 1 a 100 | altura do rastro suave, em px |
| `ambient.box_select.fill` | `#331FC4E4` |  | preenchimento da seleção em caixa |
| `ambient.box_select.edge` | `#CC2FE4FF` |  | borda da seleção em caixa |
| `ambient.locked_slot_outline` | `#AAFF4F6A` |  | contorno de slots bloqueados |

## Popup, header, button, bars

### Popup

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `popup.backdrop_alpha` | `0.75` | 0 a 1 | quão escura a tela fica atrás de um popup |
| `popup.backdrop` | `#030610` |  | cor do fundo escurecido |
| `popup.vignette_alpha` | `0.35` | 0 a 1 | escurecimento das bordas atrás do popup |
| `popup.vignette` | `#000000` |  | cor da vinheta |
| `popup.glow_alpha` | `0.22` | 0 a 1 | brilho em volta do popup |
| `popup.glow` | `@palette.accent_3` |  | cor do brilho |
| `popup.open_ms` | `170` | 1 a 3000 | tempo da animação de abertura |
| `popup.open_scale` | `0.94` | 0.3 a 1 | escala inicial da abertura (1 = sem zoom) |
| `popup.open_scan_line` | true |  | linha que cruza o popup enquanto ele abre |
| `popup.open_scan_line_color` | `@palette.accent_4` |  | cor da linha de abertura |

### Header

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `header.uppercase` | true |  | títulos das janelas em maiúsculas |
| `header.glow_alpha` | `0.18` | 0 a 1 | brilho sob a barra de título |
| `header.glow` | `@palette.accent_3` |  | cor do brilho |
| `header.highlight_period_ms` | `2600` | 200 a 60000 | tempo do brilho que atravessa o título |
| `header.highlight` | `@palette.accent_4` |  | cor do brilho que anda |
| `header.underline` | `@palette.accent_1` |  | linha sob o título |
| `header.leds` | true |  | LEDs pequenos na barra de título |

### Button

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `button.hover_glow` | `0.3` | 0 a 1 | brilho com o mouse sobre o botão |
| `button.glow` | `@palette.accent_3` |  | cor do brilho do hover |
| `button.shine` | true |  | brilho que passa sobre os botões |
| `button.shine_alpha` | `0.16` | 0 a 1 | opacidade desse brilho |
| `button.shine_period_ms` | `900` | 100 a 20000 | duração de uma passada |

### Barras de progresso

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `bars.segment_px` | `8` | 2 a 64 | largura dos segmentos nas barras de progresso |
| `bars.segment_alpha` | `0.33` | 0 a 1 | escuridão das divisões dos segmentos |
| `bars.shimmer` | true |  | brilho que corre pelas barras |
| `bars.shimmer_period_ms` | `2200` | 200 a 60000 | tempo por passada (barras normais) |
| `bars.shimmer_alpha` | `0.345` | 0 a 1 | opacidade (barras normais) |
| `bars.slim_shimmer_period_ms` | `2600` | 200 a 60000 | tempo por passada (barras finas) |
| `bars.slim_shimmer_alpha` | `0.31` | 0 a 1 | opacidade (barras finas) |

## Codex e celebração

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `codex.card_cascade_ms` | `45` | 0 a 500 | atraso entre cartões ao abrir o Codex (12 primeiros) |
| `codex.bar_fill_ms` | `700` | 1 a 10000 | tempo das barras do Codex para encher |
| `codex.sparkles` | true |  | faíscas no Codex |

| Chave | Padrão | Faixa | O que faz |
| --- | --- | --- | --- |
| `celebration.confetti_tree` | veja abaixo |  | cores do confete ao concluir uma árvore (lista) |
| `celebration.confetti_codex` | veja abaixo |  | cores do confete ao completar o Codex (lista) |
| `celebration.amount` | `1.0` | 0 a 5 | quantidade de confete (1 = normal, 0 = nenhum, 5 = muito) |

As listas de confete completas:

```json
"celebration": {
  "confetti_tree":  ["#9FF6FF", "#4FE0F0", "#22B4CC", "#FFFFFF", "#F0594A", "#FFC13D"],
  "confetti_codex": ["#E4D6FF", "#A982F5", "#7A4FD6", "#D9C6FF", "#9FF6FF", "#F0594A", "#FFFFFF"]
}
```

## Receitas

### Destaque laranja quente

Troque a rampa de ciano e tudo que aponta para ela (linhas, halos, brilho do popup, cabeçalho, brilho dos botões, partículas) acompanha:

```json
{
  "palette": {
    "accent_0": "#462407",
    "accent_1": "#8C500E",
    "accent_2": "#E4901F",
    "accent_3": "#FFB02F",
    "accent_4": "#FFE09F",
    "accent_dim": "#C98A11",
    "accent_shade": "#865A0A",
    "hover_tint": "#F0B04F",
    "spark_soft": "#FFEFBF"
  },
  "ambient": {
    "box_select": { "fill": "#33E4901F", "edge": "#CCFFB02F" }
  },
  "nodes": { "hover_brackets": "#FFE09F" }
}
```

Os dois últimos blocos existem porque esses valores estão escritos como cor fixa no arquivo padrão, em vez de apontar para a paleta.

:::warning
Isso muda só o que o `theme.json` controla. Moldura, botões, formas dos nós e ícones são PNGs e continuam ciano até você trocá-los (veja [a página de sprites](dev/resource-pack)). Um tema quente com moldura ciano fica estranho, então planeje trocar os dois.
:::

### Tela calma, para PC fraco ou sensibilidade a movimento

```json
{
  "lines": { "pulse": { "max_per_frame": 0 } },
  "halo": { "enabled": false },
  "ambient": {
    "frame_light": { "enabled": false },
    "particles": { "count": 0 },
    "scan_line": { "enabled": false }
  },
  "popup": { "open_ms": 1, "open_scan_line": false },
  "button": { "shine": false },
  "bars": { "shimmer": false },
  "codex": { "sparkles": false, "card_cascade_ms": 0 },
  "celebration": { "amount": 0 }
}
```

::video dev-theme-effects "A mesma árvore com os efeitos padrão e com o preset calmo acima"

### Títulos em minúsculas e popups mais leves

```json
{
  "header": { "uppercase": false },
  "popup": { "backdrop_alpha": 0.5, "vignette_alpha": 0.1, "open_scale": 1 }
}
```

### Comemoração maior

```json
{ "celebration": { "amount": 3 } }
```

## O que o tema não cobre

- Sprites, formas de nós, ícones, molduras, a imagem do halo: texturas normais, veja [a página de sprites](dev/resource-pack).
- O visual do bloco da máquina: veja [Skins da máquina](dev/skins).
- Textos: arquivos de idioma do resource pack, veja [Traduções](dev/translations).
- Sons: `sounds.json`, veja [Sons](dev/sounds).
- Imagem de fundo e shader de cada árvore: configurados na própria árvore, veja [Imagens e fundos](dev/visuals).

## Se algo parecer errado

1. Abra o `logs/latest.log` e procure por `theme.json`: arquivo ou valor inválido é registrado ali.
2. Confira vírgulas e aspas. JSON não aceita comentário nem vírgula sobrando no final.
3. Confirme que o pack está ativo e acima dos outros packs que também trazem o arquivo.
4. Aperte `F3+T` de novo.
