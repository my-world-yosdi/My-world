import { useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { APODO_INICIAL, CARTA_MAXIMO, cartaParaAngel, paginas } from '../../data/mensajes'
import { apodoVisible, validarCarta, type ErroresCarta } from '../../lib/carta'
import { useBorrador } from '../../hooks/useBorrador'
import { useEnviarCarta } from '../../hooks/useEnviarCarta'
import { Contenido } from '../../components/ui/Pagina'
import { BotonVolver } from '../../components/ui/BotonVolver'
import { BotonLazo } from '../../components/ui/BotonLazo'
import { Corazon, Mono } from '../../components/decor/Adornos'
import { EscenaEscritorio } from './EscenaEscritorio'
import { SelectorApodo } from './SelectorApodo'
import { SobreVista } from './SobreVista'
import { NombreAnimado } from './NombreAnimado'
import './CartaParaAngel.css'

const suave = [0.22, 0.8, 0.26, 1] as const
const textos = cartaParaAngel
const CLAVE = 'my-world:carta-para-angel'

export default function CartaParaAngel() {
  const id = useId()
  const [apodo, setApodo] = useBorrador(`${CLAVE}:apodo`, APODO_INICIAL)
  const [mensaje, setMensaje, olvidarMensaje] = useBorrador(`${CLAVE}:mensaje`, '')
  const [errores, setErrores] = useState<ErroresCarta>({})
  const [disparo, setDisparo] = useState(0)
  const mensajeRef = useRef<HTMLTextAreaElement>(null)
  const envioRef = useRef<HTMLDivElement>(null)
  const { estado, enviar, reiniciar, turnstileRef } = useEnviarCarta()

  const nombre = apodoVisible(apodo)
  const enviando = estado.fase === 'enviando'
  const enviada = estado.fase === 'enviado'
  const largo = mensaje.length
  const casiLleno = largo > CARTA_MAXIMO * 0.9

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (enviando || enviada) return
    const encontrados = validarCarta(apodo, mensaje)
    setErrores(encontrados)
    if (encontrados.mensaje) {
      mensajeRef.current?.focus()
      return
    }
    if (encontrados.apodo) return
    // Campo trampa para robots: una persona nunca lo ve ni lo llena
    const trampa = new FormData(e.currentTarget).get('_gotcha')
    const ok = await enviar({ apodo, mensaje, trampa: typeof trampa === 'string' ? trampa : '' })
    if (ok) {
      olvidarMensaje()
      // Cuando la hoja termina de doblarse, lleva la vista al sobre que se está cerrando
      window.setTimeout(() => envioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 750)
      window.setTimeout(() => setDisparo((n) => n + 1), 1150)
    }
  }

  const escribirOtra = () => {
    setMensaje('')
    setErrores({})
    reiniciar()
  }

  return (
    <Contenido className="cpa" etiqueta={paginas.paraAngel.titulo}>
      <EscenaEscritorio />
      <BotonVolver />

      <div className="cpa__composicion contenido-escena">
        <motion.header
          className="cabecera cpa__cabecera"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: suave }}
        >
          <p className="antetitulo">{textos.antetitulo}</p>
          <h1 className="titulo-display cpa__titulo">
            {textos.tituloInicio} <NombreAnimado texto={nombre} className="cpa__titulo-nombre" />{' '}
            <Corazon className="cpa__titulo-corazon" color="#F28AAE" />
          </h1>
          <p className="texto-intro cpa__subtitulo">{textos.subtitulo}</p>
        </motion.header>

        <AnimatePresence mode="wait" initial={false}>
          {!enviada && (
            <motion.form
              key="carta"
              id={`${id}-carta`}
              className="cpa-carta"
              noValidate
              onSubmit={alEnviar}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: suave } }}
              // Al enviarse, la hoja se dobla y baja hacia el sobre
              exit={{ opacity: 0, y: 140, scaleY: 0.25, scaleX: 0.7, rotateX: 40, transition: { duration: 0.7, ease: [0.5, 0, 0.75, 0] } }}
              aria-busy={enviando}
            >
              <Mono className="cpa-carta__mono" ancho={44} />
              <span className="cpa-carta__cinta" aria-hidden="true" />

              <SelectorApodo
                valor={apodo}
                alCambiar={(v) => {
                  setApodo(v)
                  if (errores.apodo) setErrores((prev) => ({ ...prev, apodo: undefined }))
                }}
                error={errores.apodo}
                deshabilitado={enviando}
              />

              <div className="cpa-mensaje">
                <label className="cpa-campo__etiqueta" htmlFor={`${id}-mensaje`}>
                  {textos.mensaje.etiqueta}
                </label>
                <textarea
                  ref={mensajeRef}
                  id={`${id}-mensaje`}
                  className="cpa-mensaje__papel"
                  name="carta"
                  value={mensaje}
                  placeholder={textos.mensaje.placeholder(nombre)}
                  maxLength={CARTA_MAXIMO}
                  rows={9}
                  disabled={enviando}
                  aria-invalid={errores.mensaje ? true : undefined}
                  aria-describedby={`${id}-mensaje-ayuda ${id}-contador`}
                  onChange={(e) => {
                    setMensaje(e.target.value)
                    if (errores.mensaje) setErrores((prev) => ({ ...prev, mensaje: undefined }))
                  }}
                />
                <div className="cpa-mensaje__pie">
                  <span id={`${id}-mensaje-ayuda`} className={`cpa-mensaje__ayuda ${errores.mensaje ? 'es-error' : ''}`} aria-live="polite">
                    {errores.mensaje ?? textos.mensaje.borradorGuardado}
                  </span>
                  <span id={`${id}-contador`} className={`cpa-mensaje__contador ${casiLleno ? 'casi-lleno' : ''}`}>
                    {textos.mensaje.contador(largo, CARTA_MAXIMO)}
                  </span>
                </div>
              </div>

              {/* Trampa para robots (Formspree descarta los envíos que la llenan) */}
              <div className="cpa-trampa" aria-hidden="true">
                <label>
                  No llenes este campo
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div ref={envioRef} className={`cpa-envio ${enviada ? 'esta-enviada' : ''}`}>
          <SobreVista apodo={nombre} cerrado={enviada} disparo={disparo} />

          <div className="cpa-envio__acciones">
            <AnimatePresence mode="wait" initial={false}>
              {enviada ? (
                <motion.div
                  key="exito"
                  className="cpa-exito"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.7, ease: suave }}
                >
                  <p className="cpa-exito__titulo">{textos.exito.titulo(nombre)}</p>
                  <p className="cpa-exito__texto">{textos.exito.texto}</p>
                  <button type="button" className="boton-suave" onClick={escribirOtra}>
                    {textos.exito.otra}
                  </button>
                </motion.div>
              ) : (
                <motion.div key="enviar" className="cpa-envio__boton" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                  {estado.fase === 'error' && (
                    <motion.div className="cpa-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                      <p className="cpa-error__titulo">{textos.error.titulo}</p>
                      <p>{estado.motivo === 'sinConfigurar' ? textos.error.sinConfigurar : estado.motivo === 'sinConexion' ? textos.error.sinConexion : textos.error.texto}</p>
                    </motion.div>
                  )}
                  <BotonLazo type="submit" form={`${id}-carta`} variante="cereza" disabled={enviando} aria-disabled={enviando} className={enviando ? 'esta-enviando' : ''}>
                    {enviando ? (
                      <span className="cpa-cargando">
                        <span className="cpa-cargando__puntos" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        {textos.enviando}
                      </span>
                    ) : estado.fase === 'error' ? (
                      textos.error.reintentar
                    ) : (
                      textos.boton(nombre)
                    )}
                  </BotonLazo>
                  <p className="cpa-aviso">
                    <svg viewBox="0 0 24 24" width="14" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M8 11 V8 a4 4 0 0 1 8 0 V11" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {textos.aviso}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Verificación anti-robots (Cloudflare Turnstile): invisible salvo que haga falta marcar una casilla */}
          <div ref={turnstileRef} className="cpa-turnstile" />
        </div>
      </div>
    </Contenido>
  )
}
