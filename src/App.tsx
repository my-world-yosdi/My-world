import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { general } from './data/mensajes'
import { rutas, Mundo, CositasDeTi, Recuerditos, Cartita, CartaEspecial, Regalito, CuandoMeExtranes } from './rutas'
import Inicio from './pages/inicio/Inicio'
import NoEncontrado from './pages/NoEncontrado'
import { Pagina } from './components/ui/Pagina'
import { MenuFlotante } from './components/ui/MenuFlotante'
import { BotonMusica } from './components/ui/BotonMusica'
import { RastroCorazones } from './components/ui/RastroCorazones'

export default function App() {
  const location = useLocation()
  const enPortada = location.pathname === rutas.inicio

  useEffect(() => {
    document.title = general.tituloPestana
  }, [])

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 0.8, 0.26, 1] }}>
      <a href="#contenido" className="saltar-contenido">
        {general.saltarAlContenido}
      </a>

      {!enPortada && <MenuFlotante />}
      <BotonMusica />
      <RastroCorazones />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path={rutas.inicio} element={<Pagina><Inicio /></Pagina>} />
          <Route path={rutas.mundo} element={<Pagina><Mundo /></Pagina>} />
          <Route path={rutas.cositas} element={<Pagina><CositasDeTi /></Pagina>} />
          <Route path={rutas.recuerditos} element={<Pagina><Recuerditos /></Pagina>} />
          <Route path={rutas.cartita} element={<Pagina><Cartita /></Pagina>} />
          <Route path={rutas.especial} element={<Pagina><CartaEspecial /></Pagina>} />
          <Route path={rutas.regalito} element={<Pagina><Regalito /></Pagina>} />
          <Route path={rutas.extranes} element={<Pagina><CuandoMeExtranes /></Pagina>} />
          <Route path="*" element={<Pagina><NoEncontrado /></Pagina>} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}
