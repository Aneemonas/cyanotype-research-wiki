# Arquivos e pastas

| Arquivo | O quê |
| --- | --- |
| `config/cyanotype/trees/*.snbt` | as árvores |
| `config/cyanotype/settings.snbt` | opções do mundo (Quest Book, vocabulário, skin, lab level, dicas, times, custo operacional, buffers, idioma de reserva, reload de mundo) |
| `config/cyanotype/lang/<code>.json` | títulos e descrições de árvores e nós, por idioma (o `en_us.json` é gravado pelo editor) |
| `config/cyanotype/reward_tables.snbt` | tabelas de recompensa globais |
| `config/cyanotype/sources.snbt` | recursos extras (Sources) |
| `config/cyanotype/currencies.snbt` | moedas virtuais |
| `config/cyanotype/functions/<id>.cyan` | scripts das recompensas Function |
| `config/cyanotype/images/<name>.png` | imagens usadas pelas árvores |
| `config/cyanotype/shaders/<name>.fsh` | shaders de fundo personalizados |
| `config/cyanotype/presets.snbt` | presets de árvore do dev (cliente) |
| `config/cyanotype-client.toml` | opções pessoais do cliente (também editáveis nas Preferências) |
| `data/<ns>/cyanotype/trees/*.snbt`, `data/<ns>/cyanotype/lang/<code>.json` | árvores e textos que vêm em datapacks ou mods |
| `assets/cyanotype/theme.json` | cores e efeitos da interface; copie para um resource pack e deixe só as chaves que você mudar (`F3+T` recarrega) |
| `<world>/data/cyanotype_progress.dat` | progresso dos jogadores (os times ficam em outro `.dat`) |

Dados gravados com o nome antigo do mod (`aeroassembler`) são movidos na primeira inicialização, e nada é sobrescrito.

## O que distribuir com um pack

- `config/cyanotype/` (árvores, lang, settings, sources, currencies, tabelas de recompensa, funções, imagens).
- `config/cyanotype-client.toml`, se quiser definir padrões diferentes para os jogadores.
- Um resource pack com `theme.json` ou texturas, se você mudar o visual da interface.

## Cópias de segurança

Todo arquivo que o mod grava mantém um `nome.bak` com a última versão boa. Se o arquivo estiver vazio ou corrompido, o backup é lido no lugar. Um arquivo de árvore ilegível é ignorado e registrado no log, e nunca é sobrescrito.
