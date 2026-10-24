# Pack tech

São três árvores: **Steam Age**, **Electric Age** e **Automation**. Cada nó bloqueia as receitas de uma máquina até o jogador construir o que ela representa, e alguns nós pedem que o jogador **alimente a máquina** com fluido, FE e itens.

::video example-tech-overview "As três árvores tech, encadeadas uma depois da outra"

## Estrutura

| Árvore | Blueprint | O que o jogador aprende |
| --- | --- | --- |
| Steam Age | `steam_blueprint` | entregar água, ferro e pólvora; as máquinas são liberadas em ordem |
| Electric Age | `electrical_blueprint` | entregar FE e redstone; circuitos e armazenamento são liberados |
| Automation | `automation_blueprint` | montar uma linha de funis de verdade, manter um armazém e, por fim, um produtor repetível |

As árvores são encadeadas: o primeiro nó da Electric Age tem `steam_age/steam_master` como pai, e a Automation depende de `electric_age/electric_master`. O nó final de cada árvore também entrega o blueprint da próxima.

## Configurações

Este pack entrega fluido e FE à máquina, então precisa destes buffers:

```snbt config/cyanotype/settings.snbt (só as chaves relevantes)
{
  buffer_fe: 200000,
  buffer_mb: 16000,
  buffer_src: 0,
  quest_book_mode: false
}
```

Com `buffer_src` em 0, não há medidor de Source. O pack só usa água e FE, então só esses dois medidores aparecem.

## Steam Age

::file assets/examples/tech/steam_age.snbt "steam_age.snbt"

Notas:

- **`boiler`** cobra ferro e pede que o jogador *entregue* 4000 mB de água. A máquina precisa de um buffer de fluido de pelo menos esse tamanho para aceitar. Com um fluido só em uso, o buffer inteiro é dele.
- **`press`** e **`mixer`** bloqueiam uma receita cada (`lock_masks: [I; 1]` = RECIPE). O jogador ainda pode *colocar* o bloco se o encontrar, mas não consegue craftá-lo.
- **`pipes`** precisa de apenas um dos dois pais (`any_parent`).
- **`steam_master`** é um hexágono maior (`scale: 1.5`) e entrega o blueprint seguinte.

## Electric Age

::file assets/examples/tech/electric_age.snbt "electric_age.snbt"

Notas:

- **`generator`** tem um pai em **outra árvore** (`steam_age/steam_master`), então o nó aparece com o anel giratório na tela.
- **`circuits`** pede dois itens entregues, e a máquina guarda os dois até o nó ser concluído.
- **`storage`** usa a máscara `9` = RECIPE (1) + GUI (8) em `ae2:*`: os menus desse mod ficam fechados e as receitas escondidas até o nó ser concluído.

## Automation

::file assets/examples/tech/automation.snbt "automation.snbt"

Notas:

- **`hoppers`** usa `placed_new`: só contam os funis colocados *depois* de o nó abrir, então o jogador não pode reaproveitar os antigos.
- **`chest_wall`** usa `container` com `keep`: os itens são conferidos, mas **não** consumidos.
- **`cobble_to_iron`** é o **produtor de recursos**: `repeatable` (a cada 120 s), `auto_complete` (a máquina conclui sozinha) e `reward_to_buffer` (o ferro vai para o buffer de saída da máquina, pronto para um funil puxar).

::video example-tech-producer "Um funil alimenta pedregulho e o ferro sai do buffer de saída"

## Adaptando

:::steps
1. Troque os ids bloqueados pelas máquinas do seu pack. `create:*` bloqueia todas as receitas do Create de uma vez.
2. Use [listas nomeadas](dev/commands#listas-nomeadas) para reaproveitar uma mesma lista em vários nós.
3. Coloque um `lock_message` em cada nó dizendo o que o jogador precisa construir, por exemplo `"Needs a Boiler first."`.
4. Se quiser anunciar marcos, adicione um script **KubeJS** que escute o `ResearchCompletedEvent` (veja [API e KubeJS](dev/api)).
5. Ligue `recipe_lock_world_reload` se algum mod de máquinas guardar receitas em cache e não perceber a liberação.
:::

:::tip
Multiplayer: o bloqueio de receitas tem uma camada de mundo. Quando *qualquer* jogador conclui `press`, a receita da Mechanical Press volta para **todos**, nas máquinas e na automação. Se você quer o bloqueio por jogador também na automação, mantenha essas receitas fora de máquinas automatizadas. Veja [restrições](dev/restrictions).
:::
