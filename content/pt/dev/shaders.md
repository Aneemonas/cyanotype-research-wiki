# Shaders personalizados

Além dos efeitos prontos, uma árvore pode usar **o seu próprio fragment shader GLSL** como fundo animado. Basta escrever um arquivo `.fsh`, sem JSON e sem vertex shader. Esta página leva do arquivo vazio até uma árvore usando o shader.

::video dev-shader-bg "Escrevendo o arquivo de shader, apertando F3+T e escolhendo nas configurações da árvore"

:::warning
Um shader personalizado exige GPU de verdade e OpenGL, então teste nas máquinas dos seus jogadores. Um shader que não compila não derruba o jogo: o erro vai para o log e a árvore usa um efeito simples no lugar.
:::

## O arquivo

Crie `config/cyanotype/shaders/<nome>.fsh` na pasta do jogo.

- `<nome>`: letras minúsculas, dígitos e `_`, de 1 a 32 caracteres (`meushader`, `nebula_vermelha`, `grade2`). Qualquer outro nome é ignorado.
- Na primeira execução, o mod grava `config/cyanotype/shaders/_example.fsh.txt` com um exemplo que funciona. Copie e renomeie a cópia para `meushader.fsh` (sem o `.txt`).
- Um resource pack pode trazer o mesmo arquivo como `assets/cyanotype/shaders/core/user_<nome>.fsh` (o prefixo `user_` vale **só neste local**). É um jeito de distribuir o shader junto com o pack, e o mod procura nos dois lugares.
- Os shaders são carregados quando o jogo inicia e no **F3+T**: edite, salve e aperte F3+T.

## O que o shader recebe

O mod gera o resto (o vertex shader e a descrição do programa), então você escreve só o `main`:

```glsl
#version 150

in vec2 texCoord0;      // 0..1 pela área, (0,0) no canto superior esquerdo
out vec4 fragColor;

uniform float Time;     // segundos, não para de contar (congelado com "Reduce motion")
uniform vec2  Res;      // tamanho da área em pixels reais
uniform vec2  Pan;      // quanto o jogador arrastou a árvore, em pixels
uniform float Zoom;     // zoom da área da árvore, 1.0 = 100 %
uniform vec3  Tint;     // a cor escolhida nas configurações da árvore, 0..1 por canal
```

- Declare só os uniforms que for usar. Os nomes diferenciam maiúsculas de minúsculas.
- O único `in` é `texCoord0`.
- A versão precisa ser `#version 150`.
- **O resultado é somado** à imagem que está atrás (mistura aditiva). Preto (`0,0,0`) não soma nada, e o alfa que você devolve multiplica o que é somado. Pense o shader em termos de preto e luz, e não de cores opacas.
- Nada é desenhado fora da área da árvore, então não precisa recortar.

## Seu primeiro shader, passo a passo

Uma grade suave em movimento, que acompanha o arrasto e usa a cor da árvore:

```glsl
#version 150

in vec2 texCoord0;
out vec4 fragColor;

uniform float Time;
uniform vec2  Res;
uniform vec2  Pan;
uniform float Zoom;
uniform vec3  Tint;

void main() {
    // posição do pixel, centrada na área
    vec2 p = texCoord0 * Res - Res * 0.5;

    // o padrão desliza com o arrasto e escala com o zoom
    p = (p - Pan * 0.4) / (48.0 * Zoom);

    // distância até a linha de grade mais próxima, 0 em cima da linha
    vec2 g = abs(fract(p) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.04, min(0.5 - g.x, 0.5 - g.y));

    // uma onda clara e lenta atravessando
    float wave = 0.5 + 0.5 * sin(p.x * 0.6 + p.y * 0.4 - Time * 1.2);

    fragColor = vec4(Tint * line * (0.15 + 0.35 * wave), 1.0);
}
```

1. Salve como `config/cyanotype/shaders/grade2.fsh`.
2. No jogo, aperte `F3+T`.
3. Abra o editor, uma árvore, **Tree settings > Pictures and background**.
4. Clique no botão de efeito até aparecer **Effect: custom shader grade2**. O botão percorre: nenhum, estrelas, aurora, rastros, brasas, nebula, plasma, warp, depois cada shader personalizado encontrado, e volta a nenhum.
5. Mude a caixa de cor para ver o `Tint` mudar.

O arquivo da árvore passa a ter:

```snbt
bg_fx: 8,
bg_shader: "grade2",
bg_fx_color: 7334399,
```

O `bg_shader` é o **nome simples**, sem `user_` e sem `.fsh`.

## Os jogadores também precisam do shader

O servidor envia as imagens de uma árvore, mas **não envia shaders**. Cada jogador precisa ter o mesmo `grade2.fsh` no próprio `config/cyanotype/shaders/` ou num resource pack que use. Sem ele, o efeito é trocado pelo substituto simples (estrelas). Num modpack, o mais fácil é colocar o `.fsh` na pasta `config/cyanotype/shaders/` do pack, que já vai no download do modpack.

## Depurando

| Problema | Causa provável |
| --- | --- |
| O shader não aparece no botão de efeito | nome inválido (maiúscula, hífen, mais de 32 caracteres), extensão `.fsh.txt` ou falta de F3+T |
| A árvore mostra estrelas | o shader falhou na compilação. Procure `shader … failed to load` no `logs/latest.log` |
| Tela preta ou nada aparece | o shader devolve preto ou valores minúsculos. `Tint * 0.35` já aparece, um `0.02` sozinho não |
| Ficou claro demais | a mistura é aditiva, e valores acima de 1 estouram para branco. Mantenha a saída abaixo de uns 0.5 |
| O padrão pula quando a janela muda de tamanho | você usou valores de pixel puros; divida por `Res.y` |
| Cor errada | `Tint` vai de 0 a 1 por canal (a cor da árvore), e não de 0 a 255 |

Os erros de compilação mostram o número da linha no log.

## Ideias

- `Pan * 0.0` deixa o fundo parado, `Pan * 0.1` cria paralaxe e `Pan * 1.0` o cola na árvore.
- `pow(Zoom, 0.5)` dá uma resposta suave ao zoom, em vez de uma resposta seca.
- Use o `Time` só dentro de `sin`, `cos` ou `fract`, porque ele continua contando por horas.

## Shaders que vêm no mod

`bg_nebula`, `bg_plasma` e `bg_warp` (efeitos 5, 6 e 7) ficam em `assets/cyanotype/shaders/core/` e usam as mesmas entradas. São uma boa fonte de ideias: abra o jar, leia o código e copie o que servir para o seu arquivo.

A opção de cliente **Shader backgrounds** (`shader_backgrounds`) permite ao jogador desligar todos os efeitos GLSL.
