# Histórico de versões

Resumo das versões mais recentes. A lista completa está no `CHANGELOG.md` do mod.

## 0.22.9-multiloader

- O mod agora sai para **NeoForge, Forge e Fabric** (1.21.1) a partir do mesmo código. O jar do NeoForge se comporta como antes, e as diferenças entre os três estão em [NeoForge, Forge e Fabric](start/loaders).
- No Fabric, a máquina recebe energia pela Team Reborn Energy e mana do Botania, e a restrição de equipar lê Trinkets e Accessories. O NeoForge passou a ler o Accessories também, além do Curios.
- Os fundos de shader embutidos voltaram a funcionar no Fabric, onde antes caíam no efeito simples.
- No Forge, a restrição `loot` usa um mixin e os requisitos de dano veem o dano antes da absorção.
- Suporte ao REI no Fabric: sem overlay na tela da máquina, com receitas bloqueadas escondidas e liberadas ao vivo.
- Testado: os três jars em modpacks, REI incluído. As integrações de cada loader não foram conferidas uma a uma.

## 0.22.9

- As restrições aceitam um mod inteiro como `modid:*`. Um `modid` solto ou `@modid` faz o mesmo quando nenhuma lista nomeada tem esse nome.
- O seletor de itens ganhou a aba **Mods**; `@mod` filtra por mod e `#tag` lista os membros de uma tag. O seletor de registro (mobs, biomas, estruturas e outros) também entende `@mod` e `#tag`.

## 0.22.8

- O servidor agora informa aos clientes quais receitas a camada do mundo removeu, para o JEI e o EMI trazerem a receita de volta assim que o nó dela é concluído.
- Uma recompensa `table` pode ser opção de uma `choice` ou de uma `wheel`.

## 0.22.7

- Os sprites dos nós podem ser trocados por um resource pack, e os itens podem receber tinta.
- Material em vídeo e theme packs.

## 0.22.6

- **Três buffers de máquina separados**: FE, Fluido e Source. Sources e gases do Mekanism usam só o buffer de Source, dividido igualmente entre os Sources em uso e exibido como **um medidor**.
- **Todos os buffers começam em 0.** Valores já salvos em um mundo são mantidos.
- O medidor de fluido fica escondido quando nenhum fluido é usado, e o de FE também.
- Grade de fundo e linhas do Codex mais discretas.

## 0.22.5

- Os Sources do custo operacional passam a bastar para a faixa do HUD aparecer.
- A faixa de medidores aparece também no modo Quest Book.
- O gás do Mekanism funciona com um Source.

## 0.22.4

- Os Sources ganharam um buffer próprio, e os fluidos se dividem só entre si.
- Primeiros diagnósticos para chemicals do Mekanism.

## 0.22.0 a 0.22.3

- Revisão da arte da interface: painéis, popups, cartões e banners do Codex, botões, campos e os itens blueprint foram redesenhados.
- Os itens blueprint agora empilham até 1.
- Sons de interface mais suaves.

## 0.21.x

- Autocomplete e buffer de saída da máquina.
- Imagens e fundos de árvore, efeitos, shaders, navegador de imagens, ferramenta de imagem e tutoriais no jogo.
- Chemicals do Mekanism como Sources.

## 0.20.x

- Controle por dificuldade, nós de uma vez por mundo e Barrier Gates.
- Novas recompensas: attribute, summon e wheel.
- Padrões com exceções, listas nomeadas e a restrição LOOT.
- Itens ligados, máquina portátil e mensagens de bloqueio traduzíveis.
- Profiler e cache da checagem de tasks.

## 0.19 e anteriores

Custos operacionais com vários fluidos e Sources, moedas, sockets, containers, nós repetíveis, estilos de linha, muitos tipos novos de requisito, a primeira versão do Codex, times e o editor.
