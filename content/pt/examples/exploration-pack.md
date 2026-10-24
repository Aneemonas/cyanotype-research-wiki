# Pack de exploração

As árvores aqui são um **mapa de lugares para visitar**: biomas, estruturas e dimensões. As recompensas são pequenas (toasts e loot), e uma delas abre um **Barrier Gate**, para manter uma área perigosa fechada até o jogador merecer.

::video example-exploration-overview "Uma árvore Atlas sendo preenchida enquanto o jogador viaja"

## Estrutura

| Árvore | Blueprint | Conteúdo |
| --- | --- | --- |
| Overworld Atlas | `exploration_blueprint` | andar, visitar três biomas, estar numa vila, escolher três de quatro |
| Depths | `dungeon_blueprint` | duas cavernas revelam um nó secreto sobre o Deep Dark e a Ancient City |
| Beyond | `nether_blueprint` | portal, fortaleza, bastião e o End; só abre depois do Atlas |

Nenhum recurso de máquina é necessário, então os buffers ficam em 0 e nenhum medidor aparece.

```snbt config/cyanotype/settings.snbt (só as chaves relevantes)
{
  quest_book_mode: true,
  quest_wording: true,
  buffer_fe: 0,
  buffer_mb: 0,
  buffer_src: 0
}
```

`quest_book_mode` deixa o jogador escolher as árvores no Codex, sem precisar de um blueprint, e `quest_wording` troca *Pesquisar* por *Quest* e *Concluir*.

## Overworld Atlas

::file assets/examples/exploration/overworld_atlas.snbt "overworld_atlas.snbt"

Notas:

- **`first_steps`** lê uma **estatística**: `walk_one_cm` é em centímetros, então `100000` equivale a um quilômetro.
- **`village`** usa uma **tag de estruturas** (`#minecraft:village`), então qualquer tipo de vila vale.
- **`cartographer`** tem quatro pais e `parents_needed: 3`: quaisquer três dos quatro bastam.
- Recompensas: um **toast**, uma **loot table** e níveis de XP.

::video example-exploration-biomes "Entrar num bioma já cumpre a task"

## Depths

::file assets/examples/exploration/depths.snbt "depths.snbt"

Notas:

- **`deep_dark`** é um nó **mystery** com `hide_text` e `reveal_mode: 2`: fica escondido até as duas cavernas serem concluídas e então aparece como silhueta, com `?????`.
- **`ancient_city`** é um losango, e a segunda recompensa dele é um `open_barrier` para o id `warden_gate`.

### Colocando o Barrier Gate

Coloque o portão onde você quer a parede. O id é o **nome do item** que você coloca (definido numa bigorna), ou você pode defini-lo depois:

```cyan
/cyanotype barrier set ~ ~ ~ warden_gate
/cyanotype barrier fill 100 40 100 110 48 100 warden_gate
```

Quem concluiu `ancient_city` atravessa sem ver o portão. Para todos os outros, ele aparece como uma parede translúcida.

## Beyond

::file assets/examples/exploration/beyond.snbt "beyond.snbt"

Notas:

- **`nether`** depende de `overworld_atlas/cartographer`: o link **entre árvores** mantém as dimensões fechadas até o Atlas ficar pronto.
- **`the_end`** exige os dois pais (`parents_needed: 2`) e uma task `dimension`.

## Adaptando

:::steps
1. Troque biomas e estruturas pelos dos seus mods de geração de mundo, e use `#namespace:tag` para cobrir famílias inteiras.
2. Use a task `location` (`x, y, z, raio, dimensão`) para pontos de interesse marcados à mão. O raio padrão é 8.
3. Use `look` (`bloco, segundos`) para quests do tipo "observe este monumento".
4. Entregue o primeiro blueprint com uma loot table num baú de spawn.
5. Use `hide_dead: true` numa árvore para esconder ramos que o jogador não pode mais seguir.
:::

:::note
As tasks de local, bioma e estrutura são checadas uma vez por segundo enquanto o nó está **disponível**. O jogador precisa estar no lugar depois que o nó abre: passar por lá antes não conta.
:::
