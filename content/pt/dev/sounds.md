# Sons

Todos os sons do mod são eventos de som comuns do Minecraft, declarados em `assets/cyanotype/sounds.json`, com arquivos `.ogg` em `assets/cyanotype/sounds/`. Um resource pack pode trocar ou silenciar qualquer um deles.

::video dev-sounds-replace "Trocando o ui_click.ogg num resource pack"

## Trocando um som

Coloque no seu pack um arquivo `.ogg` com o **mesmo nome**:

```text
assets/cyanotype/sounds/ui_click.ogg
```

O `F3+T` recarrega os sons. O arquivo precisa ser Ogg Vorbis, **mono** se o som for posicional no mundo (o zumbido da máquina); os sons da interface não têm posição e podem ser estéreo. Prefira sons curtos, porque os da interface tocam o tempo todo.

Para mudar os arquivos que um evento usa (por exemplo, para criar variações), inclua o seu próprio `sounds.json`. O Minecraft combina os arquivos de todos os packs pelo nome do evento:

```json
{
  "ui_click": {
    "sounds": [
      "cyanotype:ui_click",
      "cyanotype:meu_click_2"
    ]
  }
}
```

(mais o arquivo `assets/cyanotype/sounds/meu_click_2.ogg`). O zumbido da máquina usa esse recurso para alternar entre quatro variações.

Para silenciar um evento, troque o `.ogg` dele por um arquivo curto e mudo. O jogador também pode desligar os sons da interface e o zumbido nas Preferências (*UI sounds*, *Machine sound*), e os controles de volume do Minecraft valem para todos eles.

## Os eventos

São 42 eventos declarados. Estes são os momentos em que cada um toca, segundo o código:

| Evento | Quando |
| --- | --- |
| `ui_click` | todo clique de botão e seleção de lista |
| `ui_hover` | o mouse passa por cima de um botão (bem baixinho) |
| `ui_tab`, `ui_toggle_on`, `ui_toggle_off` | trocar de aba e ligar ou desligar interruptores nas Preferências e nos editores |
| `ui_error` | ação inválida: criar uma árvore sem nome, coletar tudo sem ter o que coletar, clicar num nó que não dá para concluir |
| `ui_close`, `popup_open`, `popup_close` | popups e fechamentos |
| `tool_switch` | trocar de ferramenta no editor, e também seguir um link na ajuda do jogo |
| `machine_open`, `machine_close` | a tela da máquina abre e fecha (a abertura toca uma vez; redimensionar a janela não repete) |
| `machine` | o zumbido da estação colocada (4 variações, com legenda) |
| `node_select` | selecionar um nó e escolher o início de um link |
| `node_place`, `node_delete`, `link_make` | editor: adicionar, apagar, criar link |
| `node_pop`, `node_unpop` | os nós aparecem ou se recolhem quando a árvore abre ou fecha (o tom sobe com a profundidade) |
| `node_ready` | um nó ficou pronto (tudo cumprido) |
| `socket_fit` | um item entra num nó socket |
| `hold_tick` | enquanto o jogador segura para concluir um nó (o tom sobe com o progresso) |
| `wave_tick` | cada passo da onda que percorre a árvore depois de uma conclusão |
| `research_done` | nó concluído (tocado pelo servidor na posição do jogador, e quem está perto ouve) |
| `tree_create` | uma árvore é criada |
| `tree_reveal` | a árvore é revelada |
| `tree_complete`, `codex_complete` | a comemoração de uma árvore concluída ou do Codex completo |
| `codex_tick` | cartões do Codex e alguns itens de lista |
| `choice_pick` | escolher uma opção numa recompensa choice |
| `lock_deny` | clicar num nó bloqueado de vez |
| `xp_gain`, `combo`, `level_up` | o HUD de progresso |
| `charge` | a máquina recebe energia |
| `skin_apply` | aplicar uma skin da máquina |
| `ui_open`, `ui_confirm`, `ui_scroll`, `ui_type`, `reward_claim`, `panel_slide` | declarados e incluídos, mas não encontrei código que os toque nesta versão |

Os eventos que mostram legenda quando as legendas estão ligadas (`codex_complete`, `combo`, `level_up`, `lock_deny`, `research_done`, `reward_claim`, `tree_complete`, `xp_gain`, `machine`, `machine_open`, `machine_close`) pegam o texto de `subtitles.cyanotype.<evento>` nos arquivos de idioma.

## Trocando por um som do vanilla

Dá para apontar um evento para um som do vanilla sem incluir arquivo nenhum:

```json
{
  "level_up": {
    "sounds": [
      { "name": "minecraft:entity.player.levelup", "type": "event" }
    ]
  }
}
```

`"type": "event"` avisa o Minecraft de que o nome é outro evento de som, e não um arquivo.

## De onde vem o tom

Vários sons mudam de tom enquanto tocam (`hold_tick`, `node_pop`, `wave_tick`, `combo`, `xp_gain`). Quem define o tom é o código, então um som de substituição deve ser **curto e neutro**: ele vai tocar mais agudo ou mais grave do que foi gravado.
