# ♡ Buzón de cartitas: guía de configuración

La página **/carta-para-angel** permite que Yosdi le escriba a Ángel. Así viaja cada cartita:

```
Página (navegador)
  ├─ 1. Formspree (oficial, @formspree/react) ──▶ correo de Ángel        ← el canal principal
  └─ 2. Solo si Formspree confirmó: notificador en Vercel (esta carpeta)
         ├─ verifica Cloudflare Turnstile, origen, tamaño y límites
         └─ WhatsApp Cloud API (Meta) ──▶ aviso "tienes una nueva cartita"
```

- La carta completa **solo** viaja a Formspree, que la manda a tu correo. A WhatsApp solo va el apodo.
- Tu correo **no** aparece en el código: se configura en el panel de Formspree.
- Tu número **no** aparece en el código: es una variable privada de Vercel (`WHATSAPP_DESTINO`).
- Si el aviso por WhatsApp falla, la carta igual llegó al correo, y a Yosdi no se le muestra ningún error.

> ¿Por qué no un webhook de Formspree? Los webhooks de Formspree solo vienen en el plan Professional ($30/mes).
> En el plan gratis, la página avisa al notificador después de que Formspree confirma el envío, y Turnstile protege ese endpoint.

---

## 1. Formspree (correo)

1. Crea una cuenta en <https://formspree.io>. El plan gratis permite **50 envíos al mes**.
2. Crea un formulario nuevo (por ejemplo, "Cartitas de Yosdi"). Su URL es `https://formspree.io/f/XXXXXXXX`; el **ID** es `XXXXXXXX`.
3. Asocia tu correo como destinatario:
   - Si te registraste con ese correo, ya es el destinatario por defecto.
   - Si no, ve a **Account → Linked emails → + Add Email**, verifícalo desde tu bandeja y elígelo como destino en la configuración del formulario.
4. En **Settings → Spam protection** del formulario, **desactiva reCAPTCHA**. La página envía la carta por AJAX y no usa reCAPTCHA; si queda activo, Formspree rechaza esos envíos. El campo trampa `_gotcha` sigue funcionando.
5. Pon el ID en la página:
   - **En local:** copia `../.env.example` como `../.env.local` y escribe `VITE_FORMSPREE_FORM_ID=XXXXXXXX`.
   - **Al publicar:** ve a GitHub → repositorio → **Settings → Secrets and variables → Actions → Variables** y agrega `VITE_FORMSPREE_FORM_ID`. Si publicas en Vercel, va en sus Environment Variables.

El ID del formulario es público por diseño, porque el navegador lo necesita. Lo privado es tu correo, que solo vive en Formspree.

Cada correo trae: remitente, apodo (`para`), la carta completa, la fecha y hora de Perú (`enviadoEl`), la fecha ISO y un identificador `idCarta`. Formspree no le devuelve al navegador un ID del envío, así que la página genera el suyo.

## 2. WhatsApp Cloud API (aviso al celular)

Es el proveedor **oficial de Meta**. No se usan enlaces wa.me ni servicios no autorizados.

1. Entra a <https://developers.facebook.com>, crea una app con el caso de uso **"Connect with customers through WhatsApp"** y elige o crea un *business portfolio*.
2. En **WhatsApp → API Setup**, Meta crea un **número de prueba**. Anota su **Phone number ID**.
3. En **"To" / Manage phone number list**, agrega **tu** número personal y confírmalo con el código que llega por WhatsApp. El número de prueba solo puede escribir a números verificados así.
4. Crea la plantilla en **WhatsApp Manager → Message templates → Create**:
   - **Nombre:** `nueva_cartita`
   - **Categoría:** Utility
   - **Idioma:** Spanish (`es`)
   - **Cuerpo:**
     ```
     💗 Tienes una nueva cartita de Yosdi.

     Para: {{1}}

     Revisa tu correo para leer el mensaje completo.
     ```
   - **Ejemplo de `{{1}}`:** `Amorcito`

   Meta revisa las plantillas en hasta 24 horas y puede recategorizarlas. Las plantillas no pueden empezar ni terminar con una variable; esta cumple esa regla.
5. Crea un **token permanente**. El temporal de la pantalla de API Setup vence pronto.
   1. Ve a **Business Settings → Users → System users → Add**.
   2. Asígnale la app (Manage app) y tu cuenta de WhatsApp (Full control).
   3. Ve a **Generate token** y marca `whatsapp_business_messaging`, `whatsapp_business_management` y `business_management`.
6. **Costos:** desde julio de 2025, Meta cobra por cada plantilla entregada, según su categoría y el país. Revisa la tarifa de *utility* para Perú en <https://developers.facebook.com/docs/whatsapp/pricing> antes de usar un número de producción. El número de prueba no pide método de pago.

**Primera prueba sin esperar la aprobación:** usa la plantilla `hello_world` que trae Meta, con estas variables:

```
WHATSAPP_PLANTILLA=hello_world
WHATSAPP_IDIOMA=en_US
WHATSAPP_CON_APODO=false
```

Cuando aprueben `nueva_cartita`, vuelve a `nueva_cartita`, `es` y `true`.

## 3. Cloudflare Turnstile (anti-robots, gratis)

1. Ve a <https://dash.cloudflare.com> → **Turnstile → Add widget**. En hostnames agrega el dominio donde publiques la página y `localhost` para probar. Elige el modo **Managed**.
2. La **Site key** (pública) va en la página como `VITE_TURNSTILE_SITE_KEY`.
3. La **Secret key** (privada) va **solo** en Vercel como `TURNSTILE_SECRET_KEY`.

Sin `TURNSTILE_SECRET_KEY`, el notificador rechaza todos los avisos, salvo que pongas `PERMITIR_SIN_TURNSTILE=true`. Usa eso solo para una prueba rápida y quítalo después.

## 4. Desplegar el notificador en Vercel

1. Crea una cuenta en <https://vercel.com>. El plan Hobby es gratis para uso personal y no comercial.
2. Ve a **Add New → Project**, importa este repositorio y en **Root Directory** elige `notificador`. En Framework, elige "Other".
3. En **Settings → Environment Variables** (Production), agrega las variables de `.env.example`. Marca como *Sensitive* `WHATSAPP_TOKEN`, `WHATSAPP_DESTINO` y `TURNSTILE_SECRET_KEY`.
   - `ORIGENES_PERMITIDOS`: el origen exacto de tu página, por ejemplo `https://tu-usuario.github.io`. Para probar en local agrega también `http://localhost:5173`, separado por coma.
   - `WHATSAPP_DESTINO`: tu número con código de país, solo dígitos.
4. Haz el deploy. El endpoint queda en `https://<tu-proyecto>.vercel.app/api/notificar`.
5. Esa URL va en la página como `VITE_NOTIFICADOR_URL`.

Los cambios de variables solo se aplican en un deploy nuevo: después de cambiarlas, haz *Redeploy*.

## 5. Probar el envío real

1. Configura `.env.local` con las tres variables `VITE_…` y ejecuta `npm run dev`.
2. Abre `http://localhost:5173/carta-para-angel`, escribe una carta corta y envíala.
3. **Correo:** debe llegar un mensaje con el asunto "💌 Nueva cartita de Yosdi para …". Si no llega, revisa el panel de Formspree (Submissions) y la carpeta de spam.
4. **WhatsApp:** en Vercel → proyecto → **Logs** debe aparecer la llamada a `/api/notificar` con estado 202. Si aparece `[notificador] WhatsApp respondió …`, el código de Meta indica el problema: token, plantilla no aprobada, número no verificado, etc.
5. Cada carta enviada cuenta en el límite de 50 envíos al mes de Formspree.

## 6. Publicar la página

- **GitHub Pages** solo publica archivos estáticos: sirve para la página, pero **no** puede ejecutar el notificador (por eso existe Vercel).
- En el plan gratis de GitHub, Pages **no publica repositorios privados**. Como el repositorio es privado, tienes dos caminos:
  - **Recomendado:** publica también la página en Vercel, como otro proyecto con Root Directory `.`, Build `npm run build` y Output `dist`. `vercel.json` ya tiene la regla para que funcionen las rutas. Pon las variables `VITE_…` en ese proyecto.
  - O vuelve público el repositorio y reactiva Pages y el workflow. En ese caso el código, los textos y las fotos serían visibles, aunque los secretos no.
- Agrega el dominio final a `ORIGENES_PERMITIDOS` (Vercel) y a los hostnames de Turnstile.

## Medidas de seguridad incluidas

- **En la página:**
  - Validación de apodo (máximo 30 letras) y carta (no vacía, máximo 5000).
  - Limpieza de caracteres invisibles.
  - Bloqueo de doble envío.
  - Campo trampa `_gotcha`.
  - El texto se conserva si algo falla.
  - El borrador queda solo en el navegador de ella.
- **En el notificador:**
  - Solo acepta `POST` JSON desde los orígenes permitidos.
  - Cuerpo máximo de 2 KB.
  - Valida el apodo y el `idCarta`.
  - Verifica Cloudflare Turnstile, con token de un solo uso.
  - Ignora la misma carta repetida.
  - Límite de 3 avisos cada 10 minutos por IP y 15 por hora por instancia.
  - No registra el número, el token ni el contenido.
- **Las cartas no se guardan** en GitHub ni en Vercel: solo quedan en tu correo y en tu panel privado de Formspree.
