type TelasProps = {
  tela1: string
  tela2: string
  borda: string
}

function Telas({ tela1, tela2, borda }: TelasProps) {
  return(
    <>
      <input type="text" id="tela1" readOnly value={tela1} />
      <input type="text" id="tela2" readOnly value={tela2} style={{ border: borda }} />
    </>
  )
}

export default Telas
