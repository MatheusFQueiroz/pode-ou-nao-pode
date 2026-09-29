# Pode ou não pode?

Jogo para crianças sobre **cuidar dos aparelhos e de si mesmas**. O Bit, um robozinho atrapalhado, quer fazer de tudo com os aparelhos; a criança decide se pode ou não pode e vê o que acontece. Sem pontos e sem competição.

🎮 **Jogar:** https://pode-ou-nao-pode.cliick.dev

## Como funciona

- **11 temas e 71 situações:** hora do lanche; água, sol e calor; fios e tomadas; cuidado ao usar; na escola; olhos e corpo; guardar e carregar; na internet; dividindo com os outros; conserte a cena; e detetive dos cuidados (três podem, ache a que não pode). Dá de 30 a 35 minutos de aula.
- **Consequência animada:** ao responder, a carta vira e a criança vê o resultado: migalhas no teclado, gotas, calor, rachadura, ou brilhos quando é um cuidado bom. O Bit reage.
- **Vários jeitos de responder:** botões, arrastar a carta (direita é pode, esquerda é não pode) ou setas do teclado. Em algumas situações, depois de acertar, a criança escolhe o **porquê**.
- **Sem pontos:** cada situação vira um carimbo na carteirinha de guardião. Errar só pede para pensar de novo. Comemorações de sequência ("3 seguidas!", "tema perfeito!") sem placar e sem comparação.
- **Tirinha para levar:** ao completar um tema, o jogo monta uma tirinha em quadrinhos do Bit com as escolhas certas, com o nome da criança, para imprimir ou salvar.
- Nome e avatar opcionais, rituais de bom dia e boa noite, leitura em voz alta, animações desligáveis.

## Para o professor

- Em **Ajustes**: **Modo turma (projetor)** com letras e botões maiores para jogar com a sala toda, **Todas as situações abertas** para escolher qualquer tema, sons e animações.
- O progresso fica salvo no próprio aparelho.

## Rodar localmente

Site estático. Sirva a pasta com um servidor simples:

```bash
npx serve .
```

## Estrutura

| Arquivo | O que é |
|---|---|
| `index.html` | A página do jogo |
| `estilo.css` | Visual, o Bit e as animações de consequência |
| `jogo.js` | Situações, temas, o Bit, tirinhas e a lógica do jogo |
| `icones.js` | Ícones em SVG, gerados a partir da IconPark |
| `fontes/` | Fredoka e Nunito |
| `CNAME` | Domínio do GitHub Pages |

Para acrescentar situações, edite `MUNDOS` em `jogo.js`: cada uma tem ícone, cor, texto (`p`), resposta (`ok`), explicação (`x`), carimbo (`f`) e, opcionalmente, o efeito (`fx`) e as opções de porquê (`q`).

## Créditos e licenças

Veja [CREDITOS.md](CREDITOS.md). Ícones da [IconPark](https://github.com/bytedance/IconPark) (Apache 2.0); fontes [Fredoka](https://fonts.google.com/specimen/Fredoka) e [Nunito](https://fonts.google.com/specimen/Nunito) (OFL). O Bit e os efeitos são desenhos próprios.

Faz parte de uma coleção de jogos educativos: [Qual vem depois?](https://github.com/MatheusFQueiroz/padroes), [Qual tecnologia resolve?](https://github.com/MatheusFQueiroz/qual-tecnologia), [Invasão das Letras](https://github.com/MatheusFQueiroz/invasao-das-letras) e [A casa das máquinas](https://github.com/MatheusFQueiroz/casa-das-tecnologias).
