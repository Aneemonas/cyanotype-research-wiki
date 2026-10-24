# Configurações do mundo

As opções de mundo ficam em `config/cyanotype/settings.snbt` e valem para o mundo inteiro. Quase todas também dá para mudar dentro do jogo: ative o modo dev com `/cyanotype dev true` e a janela de **Preferências** ganha as abas **World** e **Machine**, com as opções abaixo. As mudanças vão para o servidor, são gravadas no arquivo e aplicadas a todos. A gravação é atômica e mantém uma cópia `.bak`.

| Chave | Padrão | Significado |
| --- | --- | --- |
| `quest_book_mode` | false | Quest Book (Codex) em vez de Legacy |
| `quest_wording` | false | vocabulário Quest / Complete |
| `rpg_mode` | false | vocabulário Skill / Learn |
| `fallback_locale` | `en_us` | idioma usado quando o idioma do jogador não tem texto |
| `machine_skin` | `default` | `default`, `geral`, `create`, `aco`, `dungeon` |
| `recipe_lock_world_reload` | false | recarrega os datapacks quando a camada do mundo do bloqueio de receita muda |
| `portable_machine` | false | a máquina pode ser aberta sem um bloco colocado |
| `run_fe` | 0 | custo operacional em FE por pesquisa |
| `run_fluids`, `run_sources` | vazio | custo operacional em fluidos e Sources (listas de `{id, amount}`) |
| `lab_level` | true | HUD e requisito de lab level |
| `lab_xp_node`, `lab_xp_tree` | 10, 50 | XP por nó e por árvore (um nó ou árvore pode sobrescrever) |
| `item_hints` | true | dicas "Research item" e "Needed for" |
| `teams_enabled` | true | o botão Time e o progresso compartilhado |
| `team_rewards_all` | true | true: todos recebem as recompensas; false: só quem coletou |
| `team_max` | 8 | membros por time (2 a 64) |
| `scoreboard` | true | objetivos `cyanotype_progress` (0 a 100) e `cyanotype_nodes` |
| `buffer_fe`, `buffer_mb`, `buffer_src` | **0, 0, 0** | buffers da máquina: energia, fluido, Source (0 a 2 000 000 000) |
| `bucket_fill` | true | clique direito com balde enche a máquina |
| `scan_radius` | 20 | varreduras de proximidade só rodam com um jogador a esta distância (4 a 64) |

## Times

Três chaves controlam os times: `teams_enabled`, `team_rewards_all` e `team_max`. Quando um membro conclui um nó, o compartilhamento marca o nó como concluído para os outros, revela a árvore para eles, concede os stages, entrega as recompensas (se configurado) e dispara os mesmos eventos. Nós bloqueados para um colega, porque ele seguiu o outro ramo, são pulados. Membros offline recebem as entradas pendentes ao entrar, e os times são salvos junto com o mundo. Para ver como isso aparece para o jogador, veja [times](player/teams).

## Onde cada opção está na janela

| Aba | Contém |
| --- | --- |
| World | o botão da skin da máquina, os três modos de texto (Research, Quest, Skill), *Codex access* (`quest_book_mode`), lab level, dicas de item, times, recompensas de time, o idioma de reserva com *Apply* e o botão das tabelas de recompensa |
| Machine | o custo operacional (FE, fluidos, Sources), os três buffers com *Apply*, encher com balde, máquina portátil, raio de varredura, XP por nó e por árvore e o botão de moedas e recursos |

Os três modos de texto são exclusivos entre si e só trocam o vocabulário, como explica [abrindo uma árvore](player/opening-trees). Se as árvores abrem pelo Codex é outra opção, a *Codex access*. As unidades de estresse (SU) aparecem na aba Machine como ainda não suportadas, então crie um Source para elas (veja [recursos](dev/resources)).

## Skins da máquina

A skin pode ser `default`, `geral`, `create`, `aco` ou `dungeon`. Ela só muda o visual do bloco, e a escolha é sincronizada com todos os jogadores. Como as skins funcionam e como repintá-las está em [skins da máquina](dev/skins).

## Config do cliente

As opções pessoais de cada jogador ficam em `config/cyanotype-client.toml`, nas seções `appearance`, `gameplay` e `sound`. O pack pode distribuir esse arquivo para definir os padrões. Todas as chaves, valores padrão e faixas estão na [página de preferências](player/preferences).

## Os outros arquivos de configuração

| Arquivo | O que guarda |
| --- | --- |
| `config/cyanotype/sources.snbt` | recursos extras (veja [recursos](dev/resources)) |
| `config/cyanotype/currencies.snbt` | moedas virtuais |
| `config/cyanotype/reward_tables.snbt` | tabelas de recompensa globais |
| `config/cyanotype/presets.snbt` | os presets de árvore do dev, guardados no cliente |

:::tip
Distribua o `settings.snbt` com o pack e deixe nele o tamanho dos buffers. Os três começam em 0, e senão cada dono de servidor teria de configurá-los de novo.
:::
