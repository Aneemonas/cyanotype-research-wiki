# Receitas de progressão

Quase todo formato de árvore sai da combinação de alguns poucos campos. A tabela abaixo traz os mais comuns, e as seções seguintes mostram o arquivo daqueles em que é fácil errar.

| Objetivo | Como |
| --- | --- |
| Cadeia linear | cada nó tem o anterior como pai |
| Escolha de ramo (A ou B) | A tem `excludes: ["b"]` **e** B tem `excludes: ["a"]` |
| Escolher 2 de 3 | um nó com três pais, `parents_needed: 2`, `exclude_rest: true` |
| Limitar a 2 especializações | o pai tem `max_children: 2` |
| Nó secreto | `mystery`, `hide_text`, `reveal_mode: 2` com os nós que o revelam |
| Nó que surge no meio do caminho | `reveal_mode: 4`, `reveal_tasks: 2` |
| Teia de skills livre | árvore `flexible: true`; nós sem pais já começam liberados |
| Conteúdo bônus | `optional: true` |
| Esconder becos sem saída | árvore `hide_dead: true` |

::video dev-progression "Ramos exclusivos e escolher dois de três no editor"

:::warning
A exclusão só vale a partir do nó que a declara. Se só o A lista o B, o B ainda pode ser concluído primeiro e o A continua aberto, o que quase nunca é o que você quer. Declare a exclusão nos dois lados.
:::

## Exemplo: escolha de ramo

Dois nós que se excluem formam uma escolha permanente. Quando o jogador conclui `warrior`, o `mage` nunca mais pode ser pesquisado e tudo que depende dele fica inalcançável. O contrário também vale.

```snbt
nodes: [
  { id: "fork", x: 0, y: -60, parents: [] },
  { id: "warrior", x: -48, y: -120, parents: ["fork"], excludes: ["mage"] },
  { id: "mage",    x: 48,  y: -120, parents: ["fork"], excludes: ["warrior"] }
]
```

## Exemplo: escolher dois de três

Aqui o `master` tem três pais, mas só precisa de dois, e o `exclude_rest` fecha o terceiro assim que os outros dois estão feitos. O jogador acaba com exatamente dois dos três elementos.

```snbt
nodes: [
  { id: "fire", x: -60, y: -60, parents: [] },
  { id: "ice", x: 0, y: -60, parents: [] },
  { id: "storm", x: 60, y: -60, parents: [] },
  { id: "master", x: 0, y: -120, parents: ["fire", "ice", "storm"], parents_needed: 2, exclude_rest: true }
]
```

A mesma ideia com o limite no lado do pai é o `max_children: 2`, útil para um ramo que oferece várias especializações e deixa o jogador pegar só duas.

## Exemplo: nó secreto

Um nó secreto junta `mystery`, `hide_text` e uma regra de revelação. Com `reveal_mode: 2`, o nó fica totalmente invisível até todos os nós de `reveal_nodes` serem concluídos. Aí ele aparece como silhueta, com `?????` no lugar do texto, e só mostra o que é quando fica disponível.

```snbt
{ id: "secret", x: 96, y: -120, parents: ["a"], mystery: true, hide_text: true,
  reveal_mode: 2, reveal_nodes: ["a", "b"] }
```

O modo 4 é uma revelação mais sutil: o nó aparece quando o jogador cumpre um certo número dos próprios requisitos dele (`reveal_tasks`). Assim o nó escondido surge quando o jogador está na metade das condições, sem ter sido avisado de nada.

## Esconder uma linha de dependência

`hide_in_lines` e `hide_out_lines` tiram a linha da tela, mas a dependência continua valendo. Com isso dá para posicionar um nó longe dos pais, num grupo à parte na borda da árvore, sem uma linha comprida cortando o mapa.
