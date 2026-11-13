# Proposal

## Why

La web enseña criterios WCAG y componentes, pero no explica WAI-ARIA por sí mismo: qué hace cada atributo, cuándo hace falta y, sobre todo, cuándo sobra. ARIA es la parte de la accesibilidad que más se usa mal (roles que rompen el elemento nativo, `aria-label` en elementos que no lo admiten, `aria-hidden` sobre contenido enfocable), así que una referencia clara en castellano, con código correcto e incorrecto, encaja con el objetivo del sitio.

## What Changes

- Nueva página `/aria/` («ARIA») con los atributos y roles de WAI-ARIA más usados, agrupados por para qué sirven:
  - **Nombre y descripción:** `aria-label`, `aria-labelledby`, `aria-describedby`.
  - **Estados de controles:** `aria-expanded`, `aria-pressed`, `aria-checked`, `aria-selected`, `aria-current`, `aria-disabled`.
  - **Relaciones:** `aria-controls`.
  - **Formularios:** `aria-invalid`, `aria-errormessage`, `aria-required`.
  - **Mensajes dinámicos:** `aria-live`, `role="status"`, `role="alert"`.
  - **Ocultar y mostrar:** `aria-hidden`.
  - **Ventanas:** `role="dialog"` y `aria-modal`.
- Cada entrada explica en lenguaje llano: qué hace, cuándo usarlo, cuándo no (y qué elemento nativo lo sustituye), cómo lo anuncia un lector de pantalla, código **correcto** e **incorrecto**, un ejemplo de uso real y, cuando aporta, una demo en vivo. Enlaza a los criterios WCAG relacionados y a la especificación del W3C (en inglés).
- Bloque introductorio con las reglas de uso de ARIA del W3C («Using ARIA»), empezando por «si hay un elemento HTML nativo, úsalo».
- Enlaces a la nueva sección desde la navegación principal y el pie (`SECCIONES`), la portada (tarjetas de «Qué puedes hacer aquí»), el sitemap y el README.
- Enlaces cruzados desde la página `/aria/` a los componentes a medida que ya usan cada atributo (pestañas, menú, autocompletar…), sin duplicar su código.

**Supuestos** (se pueden cambiar antes de implementar):
- La lista de atributos de arriba es la propuesta de «los más utilizados». No incluye roles de landmark (ya se cubren con `header`, `nav`, `main`… en Componentes) ni atributos avanzados (`aria-activedescendant`, `aria-owns`, `aria-busy`).
- La referencia es WAI-ARIA 1.2 (Recomendación del W3C). Si en el momento de implementar ARIA 1.3 ya es Recomendación, se revisa y se dice explícitamente.
- La URL es `/aria/` y la etiqueta del menú «ARIA».

## Capabilities

### New Capabilities
- `guia-aria`: página de referencia de WAI-ARIA: qué atributos y roles cubre, qué información da cada entrada, cómo se navega y cómo se enlaza desde el resto del sitio.

### Modified Capabilities
<!-- Ninguna: no hay especificaciones previas en openspec/specs/. -->

## Impact

- **Nuevo:** `src/pages/aria.astro`, `src/data/aria.ts` (contenido) y `src/components/AriaEntry.astro` (una entrada).
- **Modificado:** `src/data/navegacion.ts` (nueva sección), `src/pages/index.astro` (tarjeta en portada), `src/pages/sitemap.xml.ts` (nueva ruta), `README.md`.
- **Reutilizado sin cambios:** `CodeExample.astro`, `PageHead.astro`, `Icon.astro`, tokens de `global.css`, datos de `criterios.ts` y los `id` de `componentes.ts` para enlazar.
- **Dependencias:** ninguna nueva.
- **Riesgo:** la cabecera pasa de 4 a 5 enlaces. Hay que comprobar que no provoca scroll horizontal a 320 px ni con el texto al 200 %.
