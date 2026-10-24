# Como usar os exemplos

Três packs de exemplo completos. Cada um traz arquivos de árvore reais para baixar, a lógica por trás do desenho e as configurações e scripts que o acompanham.

::card Pack tech | examples/tech-pack | Vapor, eletricidade e automação com receitas bloqueadas. | bp_steam
::card Pack de exploração | examples/exploration-pack | Biomas, estruturas e dimensões como quests. | bp_exploration
::card Pack de RPG | examples/rpg-pack | Classes, pontos de skill e atributos. | bp_combat
::card Cookbook | examples/cookbook | Receitas curtas para truques comuns. | icon_spark

## Usando um arquivo

:::steps
1. Baixe o arquivo `.snbt` da página do exemplo (botão **Baixar**).
2. Coloque em `config/cyanotype/trees/`, no seu mundo ou pack. O nome do arquivo precisa ser igual ao `id` dentro dele.
3. Rode `/cyanotype reload` ou reinicie o jogo.
4. Pegue o blueprint da árvore: `/give @s cyanotype:steam_blueprint`.
5. Abra a máquina e coloque o blueprint. No modo Quest Book, escolha a árvore no Codex.
:::

:::note
Os exemplos usam itens de outros mods (`create:*`, `ae2:*`) só como ids. Se o mod não estiver instalado, o id simplesmente nunca casa e nada quebra. Troque pelos mods do seu pack.
:::

## Confira seus próprios arquivos

Todos os arquivos de exemplo desta wiki passam por um script pequeno (`tools/validate_examples.py`) que confere a sintaxe e as regras do mod: sem comentários, sem vírgulas sobrando, tipos de task e de recompensa conhecidos, número certo de argumentos, pais que existem e `lock_masks` como int array. Faça o mesmo com os seus arquivos: quando o mod não consegue ler uma árvore, ele registra `Error reading ...` e **ignora** o arquivo, sem nunca sobrescrevê-lo.

## Leia nesta ordem

1. O **pack tech** mostra recursos, bloqueios e links entre árvores.
2. O **pack de exploração** mostra tasks de local, segredos e Barrier Gates.
3. O **pack de RPG** mostra escolhas, moedas e atributos.
4. O **cookbook** reúne receitas curtas.

## O que vale para qualquer pack

- Configure os buffers de que precisa em Preferências > Machine. Eles começam em **0**.
- Entregue o primeiro blueprint ao jogador por uma quest, loot table, receita ou comando.
- O tamanho da árvore não pesa no desempenho, então divida as árvores por tema, e não por quantidade de nós. Ligue-as com [links entre árvores](dev/cross-tree).
- Escreva os textos primeiro em `lang/en_us.json` e só depois adicione outros idiomas (veja [traduções](dev/translations)).
