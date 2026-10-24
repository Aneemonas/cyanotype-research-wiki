# Traduções

Há dois conjuntos de texto, traduzidos em lugares diferentes: a interface do mod, que já vem com ele, e os textos das suas árvores, que ficam na sua config.

## A interface do próprio mod

Os textos da interface estão em `assets/cyanotype/lang/en_us.json` e `pt_br.json`. Um resource pack pode adicionar outros idiomas.

## Seus textos

Títulos, descrições, mensagens de bloqueio e os textos de algumas recompensas ficam em arquivos de idioma, e **não** nos arquivos de árvore. Assim, uma mesma árvore aparece em quantos idiomas você quiser, sem precisar de cópias:

```text
config/cyanotype/lang/<code>.json
```

| Chave | Texto |
| --- | --- |
| `tree.<tree>` | título da árvore |
| `node.<tree>.<node>.title` | título de um nó |
| `node.<tree>.<node>.description` | descrição de um nó |
| `tree.<tree>.lock` | mensagem de bloqueio padrão da árvore |
| `node.<tree>.<node>.lock` | mensagem de bloqueio de um nó |
| `node.<tree>.<node>.reward.<path>.<arg>` | textos das recompensas `message`, `title` e `toast` |

`path` é o índice da recompensa, seguido de `.child` e do índice da opção quando a recompensa está dentro de uma wheel ou de um choice. Os argumentos traduzíveis são o 0 de `message`, o 0 e o 1 de `title` e o 0 e o 1 de `toast`.

```json config/cyanotype/lang/pt_br.json
{
  "tree.my_first_tree": "Minha primeira árvore",
  "node.my_first_tree.iron.title": "Era do Ferro",
  "node.my_first_tree.iron.description": "&7Pague pelo direito de forjar ferro."
}
```

O editor grava o `en_us.json` a partir do que você digita. Os outros idiomas precisam ser feitos **à mão**: copie o arquivo e traduza os valores. Datapacks e mods também podem trazer `data/<ns>/cyanotype/lang/<code>.json`, e se a mesma chave existir nos dois lugares, a config vence.

## Qual idioma é mostrado

O cliente usa o idioma selecionado no Minecraft. Se faltar o texto nesse idioma, tenta o `fallback_locale` (uma opção de mundo) e depois o `en_us`. Nomes de função não são traduzidos, porque são ids e não texto que o jogador lê.

## Códigos de cor

As descrições aceitam códigos de cor do Minecraft e podem ter várias linhas.

| Código | Resultado |
| --- | --- |
| `&0` a `&f` | as dezesseis cores |
| `&l` `&o` `&n` `&m` `&k` | negrito, itálico, sublinhado, riscado, ofuscado |
| `&r` | reset |
| `&#RRGGBB` | qualquer cor |
| `§` | o mesmo que `&` |
| `&&` | um `&` literal |
| `\n` ou uma quebra de linha de verdade | nova linha |
