# Pense Bem - Toy Story

Versão para celular do Pense Bem, o brinquedo eletrônico de perguntas e respostas da Tec Toy,
com o livro **Pense Bem Disney – Toy Story**. O app reproduz o aparelho (visor, botões coloridos
A/B/C/D e pontuação) e mostra as perguntas e as páginas da revista de cada programa.

O app fica na pasta [`mobile/`](mobile/), feito com Expo (React Native).

## Como rodar

Precisa do Node 22.13 ou mais novo e do app **Expo Go** no celular.

```bash
cd mobile
npm install
npx expo start          # mostra o QR code para abrir no Expo Go
npx expo start --web    # abre no navegador
```

No Windows, o `mobile/iniciar.cmd` faz o mesmo usando um Node 22 portátil
(`iniciar.cmd --web` abre no navegador).

## Como jogar

1. Escolha um programa (111 a 115) na revista ou digite o código no aparelho.
2. Leia a pergunta e responda com o botão da cor certa. O botão **Ver revista** abre as páginas
   do programa, para as perguntas que dependem de imagem.
3. Acertando de primeira você ganha 3 pontos, na segunda tentativa 2 e na terceira 1. Errando
   as três, o jogo passa para a próxima pergunta sem pontos. Ao final aparecem as estrelas e a
   pontuação.

## Onde fica cada coisa

| Arquivo                               | O que tem                                             |
| ------------------------------------- | ----------------------------------------------------- |
| `mobile/src/game/jogo.ts`             | Programas, gabarito e regras de pontuação             |
| `mobile/src/game/perguntas.ts`        | Texto das 150 perguntas e alternativas                |
| `mobile/src/game/revista.ts`          | Páginas da revista de cada programa                   |
| `mobile/src/components/`              | Telas e componentes (aparelho, revista, visualizador) |
| `mobile/assets/revista/`              | Páginas da revista em imagem                          |
| `mobile/scripts/converter-revista.py` | Gera as imagens das páginas a partir do PDF           |

O PDF da revista não fica no repositório. Para gerar as páginas de novo, coloque o PDF em
`mobile/` e rode `python scripts/converter-revista.py <arquivo.pdf>` (precisa de `pip install pymupdf`).
