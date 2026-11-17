"""Converte as páginas do PDF da revista em imagens para o botão "Revista" do app.

Uso (dentro da pasta mobile):
    pip install pymupdf
    python scripts/converter-revista.py caminho/da/revista.pdf

Por padrão converte as páginas 4 a 33 (os 5 programas). Para outro intervalo:
    python scripts/converter-revista.py revista.pdf --primeira 4 --ultima 33

Gera assets/revista/pagina-NN.jpg e reescreve src/game/paginasRevista.ts.
A divisão das páginas por programa fica em src/game/revista.ts.
"""

import argparse
import pathlib
import sys

import pymupdf

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PASTA_IMAGENS = RAIZ / "assets" / "revista"
ARQUIVO_MAPA = RAIZ / "src" / "game" / "paginasRevista.ts"

# Largura final das imagens: dá para ampliar 2x no celular sem ficar borrado
LARGURA = 1200
QUALIDADE_JPG = 80


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("pdf", type=pathlib.Path)
    parser.add_argument("--primeira", type=int, default=4)
    parser.add_argument("--ultima", type=int, default=33)
    args = parser.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")  # acentos no terminal do Windows

    documento = pymupdf.open(args.pdf)
    if args.ultima > documento.page_count:
        raise SystemExit(f"O PDF só tem {documento.page_count} páginas (pedido até a {args.ultima}).")

    PASTA_IMAGENS.mkdir(parents=True, exist_ok=True)
    for antiga in PASTA_IMAGENS.glob("pagina-*.jpg"):
        antiga.unlink()

    entradas = []
    for numero in range(args.primeira, args.ultima + 1):
        pagina = documento[numero - 1]  # o PDF começa na página 1, o pymupdf no índice 0
        escala = LARGURA / pagina.rect.width
        imagem = pagina.get_pixmap(matrix=pymupdf.Matrix(escala, escala), alpha=False)
        nome = f"pagina-{numero:02d}.jpg"
        imagem.save(PASTA_IMAGENS / nome, jpg_quality=QUALIDADE_JPG)
        entradas.append(
            f"  {numero}: {{ fonte: require('../../assets/revista/{nome}'), "
            f"largura: {imagem.width}, altura: {imagem.height} }},"
        )
        print(f"página {numero} -> {nome} ({imagem.width}x{imagem.height})")

    ARQUIVO_MAPA.write_text(
        "// Gerado por scripts/converter-revista.py: não edite à mão.\n"
        "import type { ImageSourcePropType } from 'react-native'\n"
        "\n"
        "type Pagina = { fonte: ImageSourcePropType; largura: number; altura: number }\n"
        "\n"
        "const paginasRevista: Record<number, Pagina> = {\n"
        + "\n".join(entradas)
        + "\n}\n\nexport default paginasRevista\n",
        encoding="utf-8",
    )
    print(f"{len(entradas)} páginas convertidas; mapa salvo em {ARQUIVO_MAPA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
