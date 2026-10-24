# Recursos da máquina

A máquina guarda itens, fluidos, energia e recursos extras chamados **Sources**. Você decide quanto cabe de cada um em **Preferências > Machine**, que os operadores veem quando o modo dev está ligado.

::video dev-buffers "Preferências > Machine: os três buffers e o custo operacional"

## Os três buffers

Energia, fluidos e Sources têm um buffer cada, e cada um divide o espaço de um jeito.

| Buffer | Guarda | Como é dividido |
| --- | --- | --- |
| **Energia (FE)** | energia (no Fabric, pela Team Reborn Energy, com 1 E valendo 1 FE) | um único reservatório |
| **Fluido (mB)** | todos os fluidos juntos | dividido **igualmente** entre os fluidos em uso: com dois fluidos, cada um fica com metade |
| **Source (unidades)** | todas as Sources juntas | dividido **igualmente** entre as Sources em uso; o total nunca passa do buffer |

:::warning
**Os três buffers começam em 0.** Com 0, a máquina não guarda nada daquele tipo e o medidor some, então configure os que o seu pack precisa. É de propósito: um pack que nunca usa fluidos não deve mostrar medidor de fluido. Valores já salvos num mundo são mantidos.
:::

Um fluido ou Source que nada mais pede sai do buffer. Ele conta como "em uso" enquanto fizer parte do custo operacional ou de um requisito ainda pendente. No `settings.snbt`, as chaves são `buffer_fe`, `buffer_mb` e `buffer_src`, cada uma de 0 a 2 000 000 000.

## Medidores no HUD

A faixa ao lado do selo de lab mostra:

- um medidor de **FE**, quando o buffer de energia está definido e algo pede energia;
- um medidor de **Fluido**, quando o buffer de fluido está definido e algum fluido é usado;
- **um** medidor de Source (o total), quando o buffer de Source está definido, com uma linha por Source na dica.

O jogador pode esconder cada grupo nas preferências do cliente.

## Custo operacional

O custo operacional é cobrado em **toda** pesquisa, além do que o próprio nó pede. Ele fica em Preferências > Machine, em *Energy per research*, *Fluids per research* e *Sources per research*. A parte de energia é um número de FE (`run_fe`). Fluidos e Sources aceitam quantas linhas você quiser: um padrão de fluido com a quantidade em mB, ou um id de Source com a quantidade de unidades. O padrão de fluido costuma ser um id como `minecraft:water`.

Um custo operacional ajuda a fazer a máquina parecer uma máquina de verdade: toda pesquisa tira dos mesmos buffers que as entregas enchem, e o jogador precisa manter a alimentação funcionando.

## Requisitos que usam os buffers

As tasks `feed_item`, `fluid`, `energy` e `source` são entregues à máquina e consumidas quando o nó é concluído (veja [requisitos](dev/requirements)).

```snbt
tasks: [
  { type: "fluid", args: ["minecraft:water", "4000"] },
  { type: "energy", args: ["50000"] },
  { type: "source", args: ["mana", "2000"] }
]
```

## Encher com baldes

Clicar com o botão direito na máquina segurando um balde (ou outro recipiente de fluido) enche o buffer de fluido, mas só com fluidos que alguma árvore pede. A opção *Fill with buckets*, em Preferências > Machine, desliga isso.

## Sources

Um **Source** é qualquer recurso extra: mana, EU, estresse do Create, aspectos, um gás. Os Sources ficam em `config/cyanotype/sources.snbt` e são editados pelo botão **Edit currencies / resources** da janela de Preferências, disponível para operadores.

| Campo | Significado |
| --- | --- |
| name | o que o jogador vê; o id é derivado dele |
| icon | um item |
| FE per unit | `0` guarda o Source como ele é; acima de `0`, ele é **convertido** em FE ao chegar, e é assim que EU, RF e unidades parecidas funcionam com o buffer comum de FE |
| adapter | como o Source é alimentado automaticamente (veja abaixo) |

O Source padrão é `mana`, com o adapter do Botania. Este arquivo de exemplo tem três Sources: mana, um gás do Mekanism e EU convertido:

::file assets/examples/tech/sources.snbt "sources.snbt"

No arquivo, `fe_ratio` é o FE por unidade. Uma chave `buffer` antiga é ignorada, porque o tamanho do buffer de Source é a opção de mundo `buffer_src`.

### Adapters

| Adapter | Efeito |
| --- | --- |
| `botania_mana` | aceita mana do Botania vinda de spreaders e pools (NeoForge e Fabric) |
| `chemical:<id>` | aceita um chemical do **Mekanism**, só no NeoForge (gás, infusion, pigment ou slurry), como `chemical:mekanism:oxygen`; `chemical:oxygen` usa o namespace `mekanism`. 1 mB = 1 unidade |
| nenhum | alimentado por outro mod pela capability de bloco `cyanotype:source_handler` (`ISourceHandler`) ou por comando |

:::tip
Para o gás chegar, algum nó **pendente** (ou o custo operacional) precisa estar pedindo aquele Source, e o tanque do Mekanism precisa de uma **face de saída** virada para a máquina, porque o tanque só empurra gás por uma face em modo output.
:::

Para testar um Source na mão, envie uma quantidade com um comando que recebe a posição da máquina, o id do Source e o valor.

```cyan
/cyanotype source ~ ~ ~ mana 1000
```

### Unidades de estresse do Create, EU e outros

Só a energia é detectada automaticamente: FE no NeoForge e no Forge, Team Reborn Energy no Fabric. Para unidades de estresse, EU ou qualquer outra coisa, crie um Source (`su`, `eu` etc.) e alimente-o por um add-on ou pelo KubeJS usando o `ISourceHandler`, ou com `/cyanotype source`. Um Source com `FE per unit` acima de 0 converte o que recebe em FE.

## Moedas

As **moedas virtuais** ficam no progresso do jogador, não na máquina. Elas acompanham o jogador e não dá para canalizá-las para dentro ou para fora.

Uma moeda é definida em `config/cyanotype/currencies.snbt` com um id curto, o nome que o jogador vê e um entre 15 ícones (coin, gem, flask, soul, star, heart, crown, key, skull, leaf, feather, scroll, shard, orb e shield). A recompensa `currency` entrega a moeda (ou tira, se a quantidade for negativa), e o requisito `currency` pede uma quantidade e a gasta ou só confere. Uma árvore pode ter uma **moeda da árvore**, que filtra a barra de baixo da tela, e o botão **apply** grava um custo e uma recompensa base dela nos nós. `/cyanotype currency get|add|remove|set` gerencia os saldos por comando. A moeda aparece como um ícone pequeno nos nós, no painel do nó e ao lado do lab level, e as opções do cliente permitem esconder energia, fluidos, outros recursos ou moedas separadamente. O [pack de RPG](examples/rpg-pack) monta uma economia inteira de pontos de skill em cima de uma moeda.

## Itens

Os itens entregues ficam na máquina até algum nó usá-los. As recompensas em item vão para o **buffer de saída** de nove slots quando o nó tem *Rewards to machine buffer* ligado. Todas as faces da máquina expõem o item handler: os slots 0 a 8 são de entrada e só aceitam inserção, e os slots 9 a 17 são de saída e só permitem extração.
