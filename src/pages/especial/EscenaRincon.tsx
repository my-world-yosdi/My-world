import { Guirnalda, Mono } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'

/** Rincón secreto: seda rosada con pliegues, encaje arriba y abajo, perlas, luz cálida y pétalos que caen. */
export function EscenaRincon() {
  return (
    <div className="escenario escena-rincon">
      <div className="escena-rincon__seda" />
      <div className="escena-rincon__pliegues" />
      <div className="escena-rincon__luz" />
      <Particulas cantidad={14} modo="cae" semilla={214} tipos={['petalo', 'petalo', 'corazon']} colores={['#F7A9C6', '#FBC2D7', '#fff', '#F28AAE']} tamano={[10, 22]} />
      <Particulas cantidad={8} modo="titila" semilla={88} tipos={['destello']} colores={['#fff', '#FFE08A']} tamano={[8, 15]} zona={[12, 70]} />
      <div className="encaje escena-rincon__encaje escena-rincon__encaje--arriba" />
      <div className="encaje escena-rincon__encaje escena-rincon__encaje--abajo" />
      <Guirnalda className="escena-rincon__perlas" patron={['perla', 'perla', 'perla', 'corazon']} cuentas={27} caida={30} />
      <Mono className="escena-rincon__mono escena-rincon__mono--izq mecerse" ancho={52} color="#F7A9C6" />
      <Mono className="escena-rincon__mono escena-rincon__mono--der mecerse" ancho={52} color="#F7A9C6" />
    </div>
  )
}
