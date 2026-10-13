/**
 * ♡ BUZÓN DE CARTITAS · configuración PÚBLICA ♡
 *
 * Todo lo de este archivo termina en el JavaScript que descarga el navegador,
 * así que aquí solo van identificadores públicos. NUNCA pongas aquí:
 *   - tu correo (se configura como destinatario dentro del panel de Formspree),
 *   - tu número de WhatsApp ni tokens de Meta (viven como variables privadas en Vercel).
 *
 * Los valores se leen de variables de entorno de Vite al compilar:
 *   - en local: archivo `.env.local` (ya está ignorado por git; usa `.env.example` como guía),
 *   - en GitHub Pages: "variables" del repositorio, que el workflow pasa al compilar.
 */
export const buzon = {
  /** ID del formulario de Formspree: lo que va después de /f/ en https://formspree.io/f/xxxxxxxx */
  formspreeId: import.meta.env.VITE_FORMSPREE_FORM_ID ?? '',
  /** URL de la función que avisa por WhatsApp (en Vercel). Vacía = no se avisa por WhatsApp. */
  notificadorUrl: import.meta.env.VITE_NOTIFICADOR_URL ?? '',
  /** Site key PÚBLICA de Cloudflare Turnstile, que protege al notificador de robots. Vacía = sin Turnstile. */
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '',
}
