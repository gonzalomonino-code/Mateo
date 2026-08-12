# Talleres Mateo 2.0 — sitio web estático

Sitio corporativo de un taller mecánico en Sangonera la Seca (Murcia).
**HTML/CSS/JS puro, sin build, sin dependencias npm.** Se despliega tal cual.

## Estructura

```
index.html          Landing principal (hero vídeo, servicios, equipo, contacto)
servicios.html      Catálogo completo de servicios por categorías
legal.html          Aviso legal + privacidad + cookies (RGPD)
cookie-consent.js   Banner de consentimiento de cookies
image-slot.js       Web component de placeholder de imagen (drag & drop)
assets/             37 imágenes + hero-bg.mp4 (solo las que se usan)
netlify.toml        Config de despliegue (headers de caché y seguridad)
```

Los estilos y el JS van **inline** en cada HTML (`<style>` / `<script>`). Es intencional:
el sitio son 3 páginas y así no hay round-trips extra.

## Datos reales del negocio — NO INVENTAR NI CAMBIAR

| Campo | Valor |
|---|---|
| Titular | Mateo Tormo Ferez |
| CIF/NIF | 48702478R |
| Domicilio | C. Concordia, nº8 - Nave 11, 30835 Sangonera la Seca, Murcia |
| Teléfono | 699 91 14 07 |
| WhatsApp | https://wa.me/34699911407 |
| Email | talleresmateo2.0.oficina@hotmail.com |
| TikTok | https://www.tiktok.com/@talleresmateo2.0 |

Estos datos aparecen en el nav, el footer, el bloque de contacto y en `legal.html`.
Si tocas uno, tócalo en **todas** las páginas.

## Equipo (orden de las tarjetas, no reordenar)

1. Víctor · 2. Camilo · 3. Mario · 4. José Antonio · 5. Lourdes (Administrativa) · 6. Jesús

## Tarea solicitada

1. **Limpiar el código** sin cambiar el diseño ni el contenido:
   - CSS muerto (reglas cuyos selectores ya no existen en el HTML)
   - Atributos/elementos duplicados o huérfanos
   - `<template>` de thumbnails al final de los HTML: sobran, se pueden borrar
   - Normalizar indentación y comillas
   - Verificar que no queda ninguna ruta `assets/...` rota
2. **Accesibilidad y SEO básicos**: `alt` en todas las imágenes, jerarquía de
   headings coherente, `<title>` y `<meta description>` por página, `lang="es"`.
3. **Desplegar en Netlify** (`netlify deploy --prod --dir .`) o Vercel.

### Reglas al limpiar

- **No cambiar el aspecto visual.** Compara antes/después; si un cambio mueve
  píxeles, revíertelo.
- **No introducir un build step** (no Vite, no Tailwind, no npm). Debe seguir
  siendo desplegable arrastrando la carpeta.
- **No renombrar archivos de `assets/`** — las rutas están escritas a mano.
- Las imágenes **ya están comprimidas** (ninguna pasa de ~400 KB). No hace
  falta re-optimizarlas; sí puedes generar WebP como mejora opcional, pero
  manteniendo los JPG como fallback.
- Google Fonts (Barlow / Barlow Condensed) y el iframe del mapa se cargan desde
  CDN: requieren internet, es correcto así.

## Detalles funcionales que deben seguir funcionando

- **Botón flotante de WhatsApp** (`#wa-fab`): fijo abajo a la derecha en las 3
  páginas, con anillo de pulso animado; en <480px se colapsa a solo el icono.
- **Banner de cookies**: se muestra una vez, guarda la elección en
  `localStorage`; el enlace "Configurar cookies" del footer lo reabre.
- **Nav sticky** con cambio de estado al hacer scroll.
- **Vídeo del hero**: `autoplay muted loop playsinline` — imprescindibles los
  cuatro atributos o iOS no lo reproduce.
- **Anclas internas** del nav a las secciones de `index.html`.
