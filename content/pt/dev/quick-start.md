# Sua primeira árvore em 10 minutos

Ao final deste tutorial você vai ter uma árvore pequena com três nós: um que custa ferro, um que pede para matar zumbis e um que libera uma receita.

::video dev-quickstart "O tutorial inteiro em dois minutos"

:::steps
1. **Ative o modo dev.** Só operadores podem. Ele dura até você fechar o mundo.

   ```cyan
   /cyanotype dev true
   ```

2. **Abra a máquina e crie a árvore.** Clique com o botão direito numa Research Station e coloque um item no slot central. Pode ser um blueprint ou qualquer item que ainda não tenha árvore. Clique em **Save as tree** (canto inferior esquerdo) e digite um nome. O nome vira o id: `My First Tree` vira `my_first_tree`.

   ::video dev-create-tree "Criando uma árvore a partir de um blueprint"

3. **Adicione nós.** Pegue a ferramenta **Add** (`N`) e clique três vezes no espaço vazio. Deixe uns 60 de distância entre os níveis.

4. **Ligue-os.** Pegue a ferramenta **Link** (`2`). Clique no pai e uma linha vermelha passa a seguir o mouse; aí é só clicar no filho. Clicar no mesmo par de novo desfaz a ligação.

   ::video dev-link-nodes "Adicionando nós e ligando-os"

5. **Edite o primeiro nó.** Pegue a ferramenta **Edit** (`3`) e clique num nó (ou dê dois cliques). Na aba **General**, escreva um título e escolha um ícone. Na aba **Requirements**, adicione um custo: 8 lingotes de ferro.

6. **Edite o segundo nó.** Na aba Requirements, adicione a task *Kill mobs* com `minecraft:zombie` e 25. Na aba Rewards, adicione uma recompensa *Toast*.

7. **Edite o terceiro nó.** Na aba Restrictions, adicione um item bloqueado com a flag **Recipe**, por exemplo `minecraft:iron_pickaxe`. Enquanto o jogador não concluir este nó, ele não consegue craftar uma picareta de ferro.

8. **Salve.** Aperte `Ctrl+S`. O arquivo vai para `config/cyanotype/trees/my_first_tree.snbt`.
:::

## Teste

O modo dev acrescenta as ferramentas do editor à tela da máquina. Para ver a árvore como o jogador vê, rode `/cyanotype dev false` e pesquise os nós em ordem.

:::tip
As restrições valem para todo mundo, operador inclusive, então você também não vai conseguir craftar a picareta de ferro. Para pular um requisito durante o teste, use a ferramenta **Auto Complete** ou rode `/cyanotype complete @s my_first_tree <node>`.
:::

## A mesma árvore como arquivo

Tudo que você fez com cliques fica salvo num arquivo de texto simples. Isso quer dizer que dá para escrever uma árvore à mão, copiar entre packs ou versionar no git. Esta é a árvore do tutorial:

```snbt config/cyanotype/trees/my_first_tree.snbt
{
  id: "my_first_tree",
  input: "cyanotype:research_blueprint",
  nodes: [
    {
      id: "iron",
      title: "Era do Ferro",
      description: "Pague pelo direito de forjar ferro.",
      icon: "minecraft:iron_ingot",
      x: 0, y: -60,
      parents: [],
      cost: [{ item: "minecraft:iron_ingot", count: 8 }]
    },
    {
      id: "hunter",
      title: "Caçador de Zumbis",
      icon: "minecraft:rotten_flesh",
      x: -48, y: -120,
      parents: ["iron"],
      tasks: [{ type: "kill", args: ["minecraft:zombie", "25"] }],
      rewards: [{ type: "toast", args: ["Caçador!", "Você limpou a noite.", "minecraft:rotten_flesh"] }]
    },
    {
      id: "tools",
      title: "Ferramentas de Ferro",
      icon: "minecraft:iron_pickaxe",
      x: 48, y: -120,
      parents: ["iron"],
      locks: ["minecraft:iron_pickaxe"],
      lock_masks: [I; 1]
    }
  ]
}
```

Se for editar à mão, fique atento a alguns detalhes. `title` e `description` podem ficar direto no arquivo: eles são importados para `lang/en_us.json` quando a árvore carrega, e dali em diante o editor os mantém lá (veja [traduções](dev/translations)). `lock_masks` precisa ser um **int array**, por isso o `I;` em `[I; 1]`, e a flag `1` é RECIPE (veja [restrições](dev/restrictions)). O eixo `y` cresce para baixo na tela e os filhos ficam em `y` mais negativo, por isso o pai está em `-60` e os dois filhos em `-120`. Depois de editar um arquivo à mão, rode `/cyanotype reload` para carregá-lo.

## O que ler a seguir

As próximas páginas entram em cada peça com mais detalhe. [Campos do nó](dev/node-fields) lista tudo que um nó aceita, [requisitos](dev/requirements) cobre cada tipo de task, [recompensas](dev/rewards) mostra o que um nó concluído entrega, e os [exemplos](examples/overview) trazem árvores completas de três tipos de pack.

::card Campos do nó | dev/node-fields | Todos os campos de um nó. | icon_edit
::card Requisitos | dev/requirements | Todas as tasks que um nó pode pedir. | icon_check
::card Recompensas | dev/rewards | O que um nó concluído paga. | icon_star
::card Exemplos | examples/overview | Árvores completas para três tipos de pack. | icon_codex
