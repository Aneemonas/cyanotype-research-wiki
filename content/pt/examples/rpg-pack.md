# Pack de RPG

Classes e pontos de skill. O jogador **desperta**, escolhe uma entre três classes, ganha **pontos de skill** em marcos e os gasta numa teia de skills. Tudo que ele recebe é um **atributo**, então não precisa de nenhum outro mod.

::video example-rpg-overview "Escolhendo uma classe, depois gastando pontos de skill"

## Estrutura

| Árvore | Blueprint | Conteúdo |
| --- | --- | --- |
| Class | `research_blueprint` | um nó de despertar e depois **Warrior, Mage ou Ranger**, mutuamente exclusivos |
| Milestones | `combat_blueprint` | quests que **dão pontos de skill** |
| Warrior Skills | `defense_blueprint` | uma teia de skills que **custa pontos de skill** e abre com a classe Warrior |

Duas peças fazem disto um sistema de skills: uma **moeda virtual** (`skill_point`) e as **recompensas de atributo**.

## Configurações e a moeda

```snbt config/cyanotype/settings.snbt (só as chaves relevantes)
{
  rpg_mode: true,
  quest_book_mode: true,
  buffer_fe: 0,
  buffer_mb: 0,
  buffer_src: 0
}
```

`rpg_mode` troca o vocabulário para *Skill* e *Learn*. A moeda é definida uma vez só:

::file assets/examples/rpg/currencies.snbt "currencies.snbt"

Também dá para criá-la em **Edit currencies / resources**, na janela de Preferências, e consultar o saldo com `/cyanotype currency get <player> skill_point`.

## Class

::file assets/examples/rpg/class.snbt "class.snbt"

Notas:

- **`awakening`** usa uma task `check`: o jogador só clica num botão. Ele rende os dois primeiros pontos de skill.
- As três classes listam **umas às outras** em `excludes`. A exclusão precisa estar dos dois lados; do contrário, uma classe poderia ser feita primeiro e deixar a outra aberta. Veja [progressão](dev/progression).
- As **recompensas de atributo** são modificadores permanentes enquanto o nó está concluído. `add` soma um valor fixo e `mult_base` multiplica o valor base (0.1 = +10%).
- A classe também concede automaticamente o stage `cyanotype_class_warrior` (ou mage, ranger), que os scripts podem ler.

::video example-rpg-class "Escolher Warrior bloqueia Mage e Ranger de vez"

## Milestones: como ganhar pontos de skill

::file assets/examples/rpg/milestones.snbt "milestones.snbt"

Cada nó entrega `{ type: "currency", args: ["skill_point", "1"] }`. Qualquer task serve de quest: kill, viagem, craft, chegar a um lab level.

## Warrior Skills

::file assets/examples/rpg/warrior_skills.snbt "warrior_skills.snbt"

Notas:

- A raiz tem `class/warrior` como pai, então a árvore inteira fica fechada para Mage e Ranger.
- Todo nó **gasta** pontos de skill: `{ type: "currency", args: ["skill_point", "2", "spend"] }`. Com `keep` no lugar, os pontos só são exigidos, sem serem gastos.
- **`berserker`** e **`guardian`** se excluem: é uma escolha de **especialização**.
- **`rage`** e **`bulwark`** têm uma task de *prova* (50 mortos-vivos, ou 200 de dano sofrido) antes do custo, então a skill é conquistada, e não só comprada.

::video example-rpg-skills "A teia de skills: gastando pontos e escolhendo entre ramos exclusivos"

## Adaptando

:::steps
1. Copie `warrior_skills.snbt` para `mage_skills.snbt` e troque o `id`, o pai (`class/mage`), os atributos e os ícones. Repita para o Ranger.
2. Para um **respec**, um operador roda `/cyanotype reset <player> warrior_skills` e devolve os pontos com `/cyanotype currency set <player> skill_point <quantidade>`. Nada reembolsa pontos automaticamente.
3. Mostre o custo na descrição, como no exemplo, e use a **moeda** da árvore para a barra de baixo exibir os pontos.
4. Use `exclude_rest` e `max_children` em capstones de "escolha 2 de 3" (veja [progressão](dev/progression)).
5. Crie uma árvore `flexible: true` para uma teia livre, em que os nós sem pais já começam liberados.
:::

:::tip
As recompensas de atributo e a dificuldade são reaplicadas uma vez por segundo. A skill de um nó que não existe na dificuldade atual é retirada e restaurada automaticamente.
:::
