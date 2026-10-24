# Skins da máquina

O bloco Research Station é um modelo 3D animado (GeckoLib), e a **skin** é a textura pintada nele. O mod traz cinco skins, e uma fica ativa para o servidor inteiro.

::video dev-skin-picker "Abrindo o seletor de skins no modo dev e aplicando cada skin"

| Id da skin | Nome no seletor | Arquivo da textura |
| --- | --- | --- |
| `default` | Padrão | `textures/geo/research_station.png` |
| `geral` | Geral | `textures/geo/research_station_geral.png` |
| `create` | Create | `textures/geo/research_station_create.png` |
| `aco` | Aço | `textures/geo/research_station_aco.png` |
| `dungeon` | Dungeon | `textures/geo/research_station_dungeon.png` |

(Os nomes vêm de `skin.cyanotype.<id>` nos arquivos de idioma.)

## Escolhendo a skin

O operador escolhe a skin dentro do jogo, em **Preferências > Machine > Machine skin**. Cada skin é um cartão com a animação rodando, e cantos brancos marcam a que está em uso. Clique no cartão e aplique. Dá para escolher também à mão, no `config/cyanotype/settings.snbt`, com `machine_skin: "geral"`.

A escolha é uma **configuração do servidor, independente do mundo**, e é sincronizada com todos os jogadores, então todo mundo vê a mesma máquina. Veja [Configurações do mundo](dev/settings).

## Como uma skin é feita

- O modelo é `geo/research_station.geo.json`, com textura de **64×80**. A animação `running` dura **3,2 s**.
- Cada textura de skin é uma tira vertical de **64 quadros de 64×80**, ou seja, um PNG de **64×5120**. O `.mcmeta` anima a tira:

```json
{ "animation": { "frametime": 1, "width": 64, "height": 80 } }
```

`frametime: 1` é um tick por quadro, então 64 quadros levam 3,2 s, o mesmo tempo da animação do modelo. É assim que os ventiladores, os três braços e a folha mudam de cor e brilho ao longo do tempo, com o mesmo mapeamento UV.

- Todos os quadros seguem o **mesmo layout**. Para fazer uma skin, abra uma tira existente e repinte cada quadro com base no primeiro. O caminho mais fácil é pintar o quadro de 64×80 uma vez, como imagem parada, depois duplicar e animar só o que se mexe ou brilha (luzes, tela, hélices).

As partes nomeadas do modelo ajudam a ler a tira: `body`, `fan_east_frame`, `fan_west_frame`, `sheet`, três braços robóticos (`a1_*`, `a2_*`, `a3_*`: base, yaw, lower, upper, claw, grips) e as hélices `prop_east` e `prop_west`.

## A prévia do seletor

Os cartões do seletor de skins usam uma animação pré-renderizada:

| Arquivo | Tamanho | Layout |
| --- | --- | --- |
| `textures/gui/skins/preview_<id>.png` | **624×1040** | 64 quadros em 8 colunas × 8 linhas, cada quadro **78×130** |

O `.mcmeta` da prévia é `{"texture":{"blur":true}}` (suavizada, porque é um render e não pixel art). Se você mudar a textura de uma skin e esquecer a prévia, o seletor continua mostrando o visual antigo.

## Mudando o visual de uma skin existente

Como as skins são escolhidas por id, um resource pack pode **repintá-las**:

1. Inclua `assets/cyanotype/textures/geo/research_station_geral.png` (ou o id que for), com o `.mcmeta` copiado.
2. Se quiser, inclua também a `textures/gui/skins/preview_geral.png` correspondente, para o seletor mostrar o visual novo.
3. `F3+T`.

Isso repinta a skin em **todo cliente que tem o pack**. Quem não tem o pack vê a textura original daquele id.

:::note
Uma textura com o nome certo e o tamanho errado não parece uma skin esquisita, parece **lixo**: o modelo lê posições fixas de um quadro 64×80. Se a máquina aparecer embaralhada, confira primeiro o tamanho da tira.
:::

## Adicionando uma sexta skin

A lista de skins é um enum dentro do mod, e os ids `default`, `geral`, `create`, `aco` e `dungeon` são fixos. Um resource pack **não consegue** criar um id novo. O que dá para fazer:

- repintar uma das cinco e usar aquele id (o jeito mais simples de ter uma máquina "própria" no seu pack);
- pedir um id novo no mod (exige mexer no código: o enum, as duas texturas e uma chave de idioma `skin.cyanotype.<id>`).

## Skins estáticas

Uma skin não precisa se mexer. Não testei, mas um PNG único de 64×80, sem o bloco `animation`, deve funcionar como skin parada, já que a textura do modelo é 64×80. Na dúvida, para uma máquina parada, mantenha a tira e repita o mesmo quadro 64 vezes (isso funciona com certeza) em vez de entregar um arquivo menor.

::video dev-skin-compare "As cinco skins rodando lado a lado"
