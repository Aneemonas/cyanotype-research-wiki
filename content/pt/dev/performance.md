# Desempenho

## Custo no servidor

No servidor, o mod é orientado a eventos. O único custo constante é a checagem de tasks, uma vez por segundo para cada jogador, e o trabalho com receitas só acontece quando o progresso muda. Desde a 0.20.3, a checagem percorre apenas os nós com requisitos que estão disponíveis no momento, a partir de uma lista em cache por jogador e árvore, e os jogadores são distribuídos ao longo do segundo pelo UUID, para as checagens não caírem todas no mesmo tick. Quando um bloqueio de receita muda, a lista de receitas ocultas do jogador só é reenviada se mudou de fato, o que importa porque os clientes recarregam o JEI e o EMI a cada pacote de receitas.

Medi isso num servidor dedicado rodando só este mod e o GeckoLib. Uma checagem custou cerca de **0,1 ms** em árvores com bloqueio, e cerca de **2,7 ms** no pior caso que consegui montar: 9000 nós com todos os requisitos ativos ao mesmo tempo. Com o servidor parado, o bloqueio de receitas ficou abaixo de 0,1% da thread do servidor.

## Profiler

O profiler mede o seu próprio pack, para você não precisar confiar nos meus números.

```cyan
/cyanotype profile start
/cyanotype profile stop
/cyanotype profile stress 5 500 chain
/cyanotype profile load 50 spread
/cyanotype profile stress clear
```

`profile start` e `stop` medem o trabalho real do servidor enquanto você joga. `stress` cria árvores de teste grandes, e `load` simula muitos jogadores repetindo a checagem de um jogador real. Tudo isso mede a **CPU do servidor**, não a rede nem os pacotes que clientes reais receberiam.

## Cliente

O tamanho da árvore não pesa para o cliente. Usei árvores de 2000 nós sem problemas, então não precisa dividir uma árvore só por desempenho. Divida por tema quando isso deixar o desenho mais claro, e ligue as partes com [links entre árvores](dev/cross-tree).

Num PC fraco com um pack pesado, ajuda desligar o `blur_background`, ligar o `fast_frames`, usar um `screen_fps_limit` por volta de 60 e um `side_panel_scale` de 90. Cada efeito ambiente tem o próprio botão, listado nas [preferências](player/preferences). Uma imagem de árvore de 16384 px consome muita memória de vídeo, e a opção do cliente `tree_images` desliga as imagens.

## Dicas para quem monta packs

Bloqueios por `modid:*` são baratos, e milhares de padrões de item único também funcionam bem, embora listas nomeadas facilitem a manutenção. Requisitos baseados em eventos não custam nada em repouso. As varreduras de proximidade (`near_item`, `near_entity` e `container`) só rodam enquanto o nó está ativo e há um jogador perto da máquina, então uma árvore em que ninguém está mexendo não custa nada, mesmo cheia de varreduras.
