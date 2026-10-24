# Datapacks e mods

As árvores e os textos delas não precisam vir de `config/`. Um datapack, ou outro mod, pode trazê-los na própria pasta de dados.

```text
data/<namespace>/cyanotype/trees/<id>.snbt
data/<namespace>/cyanotype/lang/<código>.json
```

Árvores que chegam assim são carregadas **somente para leitura**. Se existir uma árvore com o mesmo id em `config/`, a de `config/` vence. Editar uma árvore de datapack no jogo grava uma cópia em `config/` e não mexe no original, então o editor nunca estraga algo que vem de um mod. Ids inválidos e duplicados são ignorados, com uma linha no log.

## Adicionando árvores por código

O `ResearchRegistrationEvent` é disparado depois que os arquivos de árvore são lidos. Chamar `register(CompoundTag)` nele adiciona uma árvore **só na memória**, sem gravar arquivo, o que serve para árvores geradas ou temporárias. Veja [API e KubeJS](dev/api).

## Qual usar

| Situação | Use |
| --- | --- |
| Um pack só, que o autor edita dentro do jogo | `config/cyanotype/trees` |
| Um mod que traz a própria pesquisa | uma pasta de datapack dentro do mod |
| Árvores sazonais ou geradas | `ResearchRegistrationEvent`, a partir de um script |
