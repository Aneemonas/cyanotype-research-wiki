# Preferências

O botão **Preferências** da tela da máquina abre as suas opções pessoais. Elas ficam em `config/cyanotype-client.toml` (seções `appearance`, `gameplay`, `sound`) e valem em qualquer mundo ou servidor em que você entrar. O pack pode incluir esse arquivo para definir os padrões.

::video player-preferences "A janela de Preferências, as abas, a caixa de busca e os botões High / Balanced / Low"

A janela tem uma **caixa de busca** no topo, que olha todas as abas e mostra só as linhas que combinam, e quatro abas: **General, Visual, HUD, Audio**. Com o modo dev ligado (`/cyanotype dev true`) aparecem mais duas, **World** e **Machine**, que são configurações do pack inteiro. Veja [configurações do mundo](dev/settings).

Toda opção visual vem **ligada por padrão**, menos o blur. Assim, uma instalação nova mostra o mod no seu melhor, e as opções abaixo servem para ir reduzindo.

## General

| Opção | Chave | Padrão | Efeito |
| --- | --- | --- | --- |
| Open full screen | `open_fullscreen` | ligado | a máquina abre já maximizada. `M` alterna |
| Hover panel | `hover_panel` | ligado | o painel de detalhes aparece ao passar o mouse num nó |
| Side panel scale | `side_panel_scale` | 100 % | 50 a 150, tamanho do painel e do conteúdo. Ele também encolhe sozinho numa janela pequena |
| Toasts | `toasts` | ligado | as notificações pop-up. O registro de atividade do Codex continua anotando |
| Auto-open Codex | `auto_open_codex` | ligado | no modo Quest Book, abre o Codex quando a máquina está sem árvore |
| Hold time | `hold_ms` | 900 ms | 100 a 3000, quanto tempo você segura o botão para concluir um nó |
| Socket: open inventory | `socket_auto_inventory` | ligado | clicar num nó que pede item abre a barra de inventário, e clicar fora fecha |
| Pause in single player | `pause_in_singleplayer` | desligado | pausa o jogo enquanto a tela está aberta. Desligado: a máquina e o mundo continuam rodando |
| Autosave tree | `autosave_tree` | desligado | só no modo dev. Salva a árvore 30 s depois da primeira alteração não salva, como `Ctrl+S` |
| EMI reload after unlock | `emi_auto_reload` | ligado | um reload do EMI ao fechar a tela, se o que está escondido mudou |
| EMI live update | `emi_live_update` | ligado | atualiza o EMI sem reload e volta ao reload quando não consegue. Veja [JEI, EMI e REI](dev/recipe-viewers) |
| Hide other mods' buttons | `hide_foreign_buttons` | ligado | remove os botões de ordenar/mover/configurar que outros mods põem em toda tela de container; ficam só os da máquina |

A largura do painel lateral também pode ser arrastada pela seta na borda esquerda dele (`side_panel_extra_width`, 0 a 1200 px, não aparece na janela).

## Visual

| Opção | Chave | Padrão | Efeito |
| --- | --- | --- | --- |
| Reveal animation | `reveal_animation` | ligado | nós e linhas se abrem quando a máquina abre ou o item é colocado, e se fecham quando é retirado |
| Ambient effects | `ambient_effects` | ligado | chave geral das cinco seguintes |
| Blur background | `blur_background` | **desligado** | blur do jogo atrás da tela, pesado em GPUs fracas |
| Particles | `particles` | ligado | poeira flutuando na área da árvore (precisa de ambient effects) |
| Scan line | `scan_line` | ligado | linha fraca que varre a área da árvore (precisa de ambient effects) |
| Frame lights | `frame_lights` | ligado | luz correndo e LEDs piscando na moldura (precisa de ambient effects) |
| Node halos | `node_halos` | ligado | brilho atrás de nós prontos e concluídos (precisa de ambient effects) |
| Connection pulses | `connection_pulses` | ligado | pulsos de luz ao longo das linhas |
| Portal ring | `portal_effect` | ligado | anel girando em nós que dependem de, ou excluem, um nó de outra árvore |
| Grid | `grid` | ligado | grade pontilhada na área da árvore |
| Difficulty marks | `difficulty_marks` | ligado | ícones pequenos em nós que só existem em algumas dificuldades |
| Sparks, Codex button | `sparks_codex_button` | ligado | faíscas quando algo desbloqueia |
| Sparks, tree centre | `sparks_tree_center` | ligado | faíscas no centro da árvore |
| Reduce motion | `reduce_motion` | desligado | tira o tremor, crescimento e quique dos nós e congela o relógio do efeito de fundo |
| Tree pictures | `tree_images` | ligado | desenha a imagem de fundo, as imagens soltas e os efeitos de fundo animados das árvores. Desligado economiza memória e banda |
| Shader backgrounds | `shader_backgrounds` | ligado | permite os fundos GLSL. Desligado: um efeito simples toma o lugar. Veja [shaders personalizados](dev/shaders) |

**Presets.** Os botões *High / Balanced / Low* mexem em várias dessas de uma vez:

| | High | Balanced | Low |
| --- | --- | --- | --- |
| Blur | ligado | desligado | desligado |
| Ambient effects, frame lights, pulses, sparks, reveal animation, progress HUD | ligado | ligado | desligado |
| Particles, scan line, node halos | ligado | desligado | desligado |

Os três deixam a grade e o anel de portal ligados.

**Desempenho.**

| Opção | Chave | Padrão | Efeito |
| --- | --- | --- | --- |
| Fast frames | `fast_frames` | ligado | desenha as molduras grandes numa chamada só em vez de milhares de blocos. Desligue só se uma moldura parecer errada |
| Screen FPS limit | `screen_fps_limit` | 0 (desligado) | 0 a 260. Baixa o limite de quadros enquanto a tela está aberta; o limite anterior volta ao fechar. Só abaixa, nunca sobe |

## HUD

| Opção | Chave | Padrão | Efeito |
| --- | --- | --- | --- |
| Progress HUD | `progress_hud` | ligado | nível do laboratório, XP e o contador de combo (cosmético) |
| Show energy | `show_energy` | ligado | medidor de FE no Codex e ao lado do nível do laboratório |
| Show fluid | `show_fluid` | ligado | medidor do buffer de fluido |
| Show other resources | `show_sources` | ligado | mana e outras Sources |
| Show currencies | `show_currencies` | ligado | suas moedas virtuais |

## Audio

| Opção | Chave | Padrão | Efeito |
| --- | --- | --- | --- |
| Machine sound | `machine_sound` | ligado | o zumbido da estação colocada |
| UI sounds | `ui_sounds` | ligado | cliques, popups, nós e todo o resto da tela |

Para mudar os sons em si, veja [Sons](dev/sounds).

## Mais uma tecla

Em *Controles > Cyanotype Research* há dois atalhos:

| Atalho | Padrão | Uso |
| --- | --- | --- |
| Show the nodes of the hovered item | `Y` | sobre um item do inventário (ou no JEI/EMI): marca todos os nós que pedem ou dão aquele item. `Tab` anda por eles (`Shift+Tab` volta); `Y` sobre o nada limpa |
| Open the machine (portable) | sem tecla | abre a máquina de qualquer lugar quando o pack liga `portable_machine` |

## A tela mais leve para um PC fraco

Comece apertando **Low**, que já desliga os efeitos ambientes, as partículas, a linha de varredura e os halos, e deixe o blur desligado. Depois coloque o limite de FPS da tela em uns 60, para a máquina não gastar quadros que você nem vai ver, e baixe a escala do painel lateral para 90 se a tela ficar apertada. Se o pack usa fundos animados ou com shader, desligar *Tree pictures* tira o resto do desenho pesado, ao custo dos fundos.
