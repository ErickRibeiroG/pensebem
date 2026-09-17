import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Topo from './components/Topo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Topo />
  </StrictMode>,
)
