# O arquivo da árvore

Uma árvore é um arquivo SNBT em `config/cyanotype/trees/<id>.snbt`, e o nome do arquivo (sem a extensão) é o id da árvore. O id tem de 1 a 48 caracteres entre `a-z`, `0-9`, `_` e `-`.

```snbt exemplo anotado (comentários NÃO são permitidos em um arquivo real)
{
  id: "example",                          // nome do arquivo sem .snbt
  input: "cyanotype:research_blueprint",  // "modid:item" ou "#modid:tag"
  quest_mode: false,                      // vocabulário Quest para esta árvore
  flexible: false,                        // true: nada é ligado ao centro
  hide_dead: false,                       // esconde nós que nunca podem ser pesquisados
  lock_message: "Come back after the nether.",   // padrão dos nós bloqueados (não traduzido)
  nodes: [ { /* ... */ } ]
}
```

Os campos da árvore estão na tabela abaixo. Os de cada nó têm página própria: [campos do nó](dev/node-fields).

## Campos da árvore

| Campo | Tipo | Significado |
| --- | --- | --- |
| `id` | string | o id da árvore |
| `input` | string | o item (ou `#tag`) que abre a árvore no modo Legacy |
| `quest_mode` | bool | vocabulário Quest para esta árvore |
| `flexible` | bool | true: nós sem pais simplesmente começam, nada é ligado ao centro |
| `hide_dead` | bool | esconde nós que nunca podem ser pesquisados |
| `lock_message` | string | mensagem padrão dos nós bloqueados |
| `line_style` | int | 0 cotovelo (V-H-V), reta, cobra, curva suave, chanfrada, cotovelo (H-V-H), degraus |
| `currency` | string | a moeda desta árvore (filtra a barra de baixo) |
| `cur_cost`, `cur_reward` | int | custo e recompensa base de moeda |
| `lab_xp` | int | substitui o XP de uma árvore concluída (-1 = valor do mundo) |
| `images`, `bg_image`, `bg_mode`, `bg_alpha`, `bg_fx`, `bg_fx_color`, `bg_shader` | | imagens e fundos, veja [Imagens e fundos](dev/visuals). `bg_shader` é o nome simples de um [shader personalizado](dev/shaders), usado quando `bg_fx` é 8 |
| `nodes` | lista | os nós, veja [campos do nó](dev/node-fields) |

:::note
Depois que o editor salva o arquivo, o `title` da árvore e dos nós **não** fica mais aqui: ele vai para `lang/en_us.json` (veja [traduções](dev/translations)). Num arquivo escrito à mão você ainda pode usar `title` e `description`, que são importados para o `en_us` ao carregar.
:::

## Arquivos antigos

Arquivos de versões antigas são migrados ao carregar. Campos como `commands`, `reward_items`, `reward_xp_levels`, `reward_xp_points`, `reward_message` e `lock_flags` viram as recompensas e máscaras atuais; ids de nó duplicados e tipos de recompensa desconhecidos são descartados. Tipos de task desconhecidos são mantidos, mas nunca bloqueiam o nó (veja [requisitos](dev/requirements)).

## Recarregando

`/cyanotype reload` recarrega as árvores, os arquivos de idioma e as tabelas de recompensa e ressincroniza todos os jogadores conectados. Assim você edita o arquivo no seu editor de texto e vê o resultado sem reiniciar o jogo.

## Dicas de SNBT

Os arquivos são lidos pelo parser SNBT do próprio Minecraft, que é mais rígido que o JSON em alguns pontos que costumam pegar de surpresa.

Strings levam aspas duplas e as chaves não precisam de aspas. Uma lista é `[a, b]`, mas um **int array** começa com `I;`, como em `[I; 1, 2]`. Campos que o mod espera como int array, caso do `lock_masks`, não carregam se forem escritos como lista comum. Comentários não existem no parser, então os `//` do exemplo anotado são só explicação e precisam sair de um arquivo de verdade. Vírgula depois do último item de uma lista ou composto também dá erro. Os números seguem o SNBT: `0` é int, `1.5f` é float, e `x`, `y` e quantidades de um nó são ints.

Se o arquivo não passa pelo parser, o log registra `Error reading` com o nome do arquivo e a posição, e o mod ignora aquele arquivo.
