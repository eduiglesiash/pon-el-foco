# Proposal

## Why

El `alt` es el fallo de accesibilidad más frecuente y el que más dudas genera: ¿esta imagen necesita texto?, ¿qué pongo si es un icono dentro de un botón?, ¿y una gráfica? El criterio 1.1.1 lo explica en abstracto. Una herramienta que guíe con preguntas concretas hasta una respuesta, con el porqué y el código, resuelve la duda en el momento en que aparece, que es como la gente trabaja de verdad.

## What Changes

- Nueva página-herramienta **«¿Qué alt le pongo?»** en `/alt/`: un árbol de decisiones que pregunta paso a paso hasta llegar a una conclusión sobre el atributo `alt` de una imagen, icono o gráfica.
- **Recorrido visible:** cada respuesta queda como un paso del camino («Tu respuesta: Sí, contiene texto»), de modo que siempre se ve qué se ha decidido.
- **Volver atrás siempre:** se puede cambiar cualquier respuesta anterior (y el árbol sigue desde ahí por la otra rama), retroceder una pregunta o empezar de nuevo. El botón «Atrás» del navegador también retrocede.
- **Explicación en todo momento:** cada pregunta explica por qué se pregunta, cada conclusión explica el motivo y da código correcto e incorrecto, y la página incluye una introducción sobre qué es el `alt`, qué hace y errores frecuentes.
- **Conclusiones enlazables:** cada resultado tiene su propia URL (por ejemplo `/alt/#decorativa`) para compartirlo.
- El árbol sigue el **árbol de decisión del W3C** para textos alternativos (WAI Images Tutorial), adaptado al castellano y ampliado con los casos de iconos SVG y gráficas.
- Enlaces a la herramienta desde la portada, la página del criterio 1.1.1, el componente «Imagen con alternativa» y la entrada de `aria-hidden` de `/aria/`, y desde el sitemap y el README.

**Supuestos** (se pueden cambiar antes de implementar):
- La URL es `/alt/` y **no** se añade a la navegación principal, que ya tiene 5 enlaces. Se llega desde la portada y los enlaces contextuales.
- Cubre `<img>`, `<svg>` en línea, iconos (SVG o fuente de iconos) e imágenes dentro de enlaces o botones. Las imágenes de fondo CSS aparecen como nota en las conclusiones de decorativa e informativa, no como rama propia.
- No analiza imágenes subidas ni genera textos con IA: es una guía de decisión.

## Capabilities

### New Capabilities
- `arbol-decision-alt`: herramienta guiada para decidir el texto alternativo de una imagen: preguntas, recorrido visible, retroceso, conclusiones con explicación y código, y cómo se enlaza desde el resto del sitio.

### Modified Capabilities
<!-- Ninguna: `guia-aria` aún no está archivada en openspec/specs/ y este cambio solo le añade un enlace, sin cambiar sus requisitos. -->

## Impact

- **Nuevo:** `src/pages/alt.astro`, `src/data/arbol-alt.ts` (preguntas, respuestas y conclusiones como datos) y `src/scripts/arbol-alt.js` (navegación del árbol).
- **Modificado:** `src/pages/index.astro` (tarjeta), `src/pages/criterios/[id].astro` o `src/data/criterios.ts` (enlace desde 1.1.1), `src/data/componentes.ts` (nota en «imagen»), `src/data/aria.ts` (enlace en `aria-hidden`), `src/pages/sitemap.xml.ts`, `README.md`.
- **Reutilizado:** estilos del recorrido `.route-*` de `global.css` (los del comprobador de `/me-afecta/`), `CodeExample`, `PageHead` y los tokens de color.
- **Dependencias:** ninguna nueva.
