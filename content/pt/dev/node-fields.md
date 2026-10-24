# Campos do nó

Estes são todos os campos que um nó aceita no arquivo da árvore. Só o `id` é obrigatório. Quase todos também existem como botões e caixas no editor de nó, então você raramente vai precisar digitá-los, mas a tabela é o jeito mais rápido de ver o que dá para fazer.

| Campo | Tipo | Significado |
| --- | --- | --- |
| `id` | string | único dentro da árvore |
| `title`, `description` | string | textos. Depois que o editor salva o arquivo eles vão para os arquivos de idioma, veja [traduções](dev/translations) |
| `icon` | id de item | ícone (um item que não existe vira uma barreira) |
| `x`, `y` | int | posição; os filhos ficam em `y` mais negativo |
| `shape` | `square` `circle` `diamond` `hexagon` | forma do sprite (padrão square) |
| `scale` | 0.5 a 3 | multiplicador de tamanho. O sprite é escalado, veja [Sprites](dev/resource-pack#sprites-dos-nos) |
| `parents` | lista | ids da mesma árvore, ou `tree/node` de outra |
| `any_parent` | bool | basta um pai |
| `parents_needed` | int | exatamente N pais (vale mais que `any_parent`); 0 = automático |
| `exclude_rest` | bool | quando já há pais suficientes feitos, os pais que *não* foram feitos ficam bloqueados para sempre ("escolha N de M") |
| `excludes` | lista | depois que este nó é concluído, aqueles nós (ou `tree/node`) nunca mais podem ser pesquisados, e os descendentes deles ficam inalcançáveis |
| `max_children` | int | quando N filhos estão feitos, os outros ficam bloqueados (só filhos da mesma árvore) |
| `optional` | bool | não conta para o progresso, para a árvore concluída nem para o lab level |
| `personal` | bool | times: nunca é compartilhado |
| `hidden` | bool | invisível até ficar disponível |
| `mystery` | bool | silhueta até ficar disponível |
| `hide_text` | bool | título e descrição mostram `?????` até concluir |
| `hide_lock` | bool | sem cadeado quando o nó nunca poderá ser pesquisado |
| `hide_in_lines`, `hide_out_lines` | bool | não desenha as linhas de entrada ou de saída (a dependência continua valendo) |
| `reveal_mode` | 0 a 4 | 0 padrão (`hidden`), 1 sempre visível, 2 visível quando todos os `reveal_nodes` estão feitos, 3 quando qualquer um está feito, 4 quando as `reveal_tasks` dos próprios requisitos estão cumpridas |
| `reveal_nodes`, `reveal_tasks` | lista, int | para os modos 2 a 4 |
| `lock_message` | string | mostrada enquanto o nó está bloqueado; vazia, usa a da árvore |
| `cost` | lista | `{item: "minecraft:iron_ingot", count: 8}`; `#tag` permitido; consumido |
| `xp_levels` | int | consumido |
| `tasks` | lista | `{type, args}`, veja [requisitos](dev/requirements) |
| `rewards` | lista | `{type, args, options?, weight?}`, veja [recompensas](dev/rewards) |
| `grant_stages` | lista | stages extras ao concluir |
| `locks`, `lock_masks` | listas | restrições, veja [restrições](dev/restrictions) |
| `difficulties` | int | máscara de bits das dificuldades em que o nó existe: 1 peaceful, 2 easy, 4 normal, 8 hard; 15 (todas, o padrão) = qualquer uma |
| `world_once` | bool | só a primeira conclusão no mundo conta |
| `repeatable`, `repeat_seconds` | bool, int | pode ser concluído de novo depois do intervalo (1 a 31 536 000 s, padrão 60) |
| `auto_complete` | bool | a máquina conclui o nó sozinha quando todos os requisitos estão cumpridos |
| `reward_to_buffer` | bool | as recompensas em item vão primeiro para o buffer de saída da máquina |
| `lab_xp` | int | substitui o XP deste nó, 0 a 100 000 (-1 = valor do mundo) |

## Como os pais são contados

Um nó está **disponível** quando não está bloqueado e tem pais *válidos* concluídos em quantidade suficiente. Um pai é válido se existe: um nó ou uma árvore apagada é ignorado e nunca segura ninguém. Quantos pais bastam depende da configuração: com `parents_needed`, é esse número; sem ele, `any_parent` faz um pai bastar, e do contrário são necessários todos. Pais que **se excluem mutuamente** contam como uma escolha só. Com A e B exclusivos e C à parte, um nó que exige todos os pais precisa de dois: um entre A e B, mais o C.

Um nó **sem nenhum pai válido** é ligado ao centro da árvore no modo padrão e, no modo Flexible, simplesmente já começa liberado.

Um nó está **bloqueado** quando algo o fechou de vez. As causas são checadas nesta ordem: exclusão local, exclusão entre árvores, `exclude_rest` e `max_children`. Um nó é **inalcançável** se está bloqueado ou se todos os caminhos até ele estão bloqueados ou inalcançáveis, e é assim que um ramo inteiro escurece quando a raiz dele é excluída.

Uma árvore está **completa** quando todo nó não opcional está concluído ou inalcançável e pelo menos um foi concluído. Uma árvore vazia nunca está completa.

## Formas e tamanhos

::image node-shapes "As quatro formas de nó em escalas diferentes"

Um nó pode ser desenhado como quadrado, círculo, losango ou hexágono, e `scale` multiplica o tamanho de 0,5 a 3. As formas não têm significado fixo, mas duas convenções funcionam bem: uma escala maior, perto de 2,0, destaca um marco, e o círculo ou o hexágono marca um nó de natureza diferente do resto do ramo. Sockets são um tipo de nó à parte, com sprites próprios, explicados em [nós avançados](dev/advanced-nodes).
