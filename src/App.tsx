import './App.css'
import Titulo from './components/Titulo'
import Telas from './components/Telas'
import Botoes from './components/Botoes'
import Start from './components/Start'
import { useJogo } from './hooks/useJogo'

function App() {
  const { telas, iniciar, jogar } = useJogo()

  return (
    <div className="App">
      <div id="quadro">
        <Titulo />
        <Telas {...telas} />
        <Botoes onAnswer={jogar} />
        <Start onStart={iniciar} />
      </div>
    </div>
  )
}

export default App
