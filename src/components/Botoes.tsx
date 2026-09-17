import type { Resposta } from '../game/jogo'

type BotoesProps = {
  onAnswer: (resposta: Resposta) => void
}

function Botoes({ onAnswer }: BotoesProps) {
  return (
    <p>
      <input type="button" className="botao" id="botaoA" value="A" onClick={() => onAnswer('A')} />
      <input type="button" className="botao" id="botaoB" value="B" onClick={() => onAnswer('B')} />
      <input type="button" className="botao" id="botaoC" value="C" onClick={() => onAnswer('C')} />
      <input type="button" className="botao" id="botaoD" value="D" onClick={() => onAnswer('D')} />
    </p>
  )
}

export default Botoes
