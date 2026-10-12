import { Link } from 'react-router'
import { motion } from 'motion/react'
import { noEncontrado } from '../data/mensajes'
import { rutas } from '../rutas'
import { Contenido } from '../components/ui/Pagina'
import { Personaje } from '../components/personajes/Personaje'
import { Particulas } from '../components/decor/Particulas'
import { Nube } from '../components/decor/Adornos'

export default function NoEncontrado() {
  return (
    <Contenido className="no-encontrado">
      <div className="escenario">
        <div className="no-encontrado__cielo" />
        <Nube className="no-encontrado__nube flotar flotar--lento" />
        <Particulas cantidad={10} semilla={404} modo="titila" tipos={['destello', 'estrella']} />
      </div>
      <motion.div
        className="no-encontrado__caja contenido-escena"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <Personaje id="melody" className="no-encontrado__melody" />
        <h1 className="titulo-display">{noEncontrado.titulo}</h1>
        <p className="texto-intro">{noEncontrado.texto}</p>
        <Link to={rutas.mundo} className="boton-suave">
          {noEncontrado.boton} ♡
        </Link>
      </motion.div>
      <style>{`
        .no-encontrado { display: grid; place-items: center; padding: 24px; }
        .no-encontrado__cielo { inset: 0; background: radial-gradient(circle at 50% 40%, #fff6f0, var(--rosa) 60%, #f6c3d8); }
        .no-encontrado__nube { left: 8%; top: 18%; width: 220px; opacity: .9; }
        .no-encontrado__caja { display: grid; justify-items: center; gap: 14px; text-align: center; }
        .no-encontrado__melody { width: min(220px, 34vh); }
        .no-encontrado h1 { font-size: clamp(2rem, 5vw, 3.4rem); }
      `}</style>
    </Contenido>
  )
}
