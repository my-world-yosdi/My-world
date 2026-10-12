import { Flor, Mariposa, Destello, Corazon } from '../../components/decor/Adornos'
import { Particulas } from '../../components/decor/Particulas'

/** Mesa de scrapbook: papel con lunares, blonda de encaje, cintas washi, botoncitos y florecitas prensadas. */
export function EscenaScrapbook() {
  return (
    <div className="escenario escena-scrap">
      <div className="escena-scrap__mesa" />
      <div className="escena-scrap__blonda escena-scrap__blonda--1" />
      <div className="escena-scrap__blonda escena-scrap__blonda--2" />

      <span className="escena-scrap__washi escena-scrap__washi--1 cinta--lunares" />
      <span className="escena-scrap__washi escena-scrap__washi--2 cinta--rayas" />
      <span className="escena-scrap__washi escena-scrap__washi--3 cinta--lavanda" />

      <span className="escena-scrap__boton escena-scrap__boton--1" />
      <span className="escena-scrap__boton escena-scrap__boton--2" />
      <span className="escena-scrap__boton escena-scrap__boton--3" />

      <Flor className="escena-scrap__flor escena-scrap__flor--1" color="#FFC2D6" />
      <Flor className="escena-scrap__flor escena-scrap__flor--2" color="#E9DDFB" />
      <Flor className="escena-scrap__flor escena-scrap__flor--3" color="#fff" />
      <Mariposa className="escena-scrap__mariposa flotar" color="#F7A9C6" />
      <Corazon className="escena-scrap__corazon" color="#F28AAE" />
      <Destello className="escena-scrap__destello" color="#FFE08A" />

      <Particulas cantidad={9} modo="titila" semilla={58} tipos={['destello']} colores={['#fff', '#FFE08A']} tamano={[10, 18]} />
    </div>
  )
}
