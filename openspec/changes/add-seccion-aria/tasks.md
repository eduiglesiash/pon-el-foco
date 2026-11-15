# Tasks

## 1. Fuentes y modelo de datos

- [x] 1.1 Comprobar en w3.org el estado actual de WAI-ARIA (1.2 frente a 1.3) y de «Using ARIA», y anotar en `design.md` (decisión 5) la versión y las URL usadas; verificar que las anclas de cada atributo en la spec existen
- [x] 1.2 Añadir `tone?: "bien" | "mal"` al tipo `Codigo` en `src/data/componentes.ts` y verificar que la build del proyecto (`astro build`) sigue pasando y `/componentes/` se ve igual
- [x] 1.3 Crear `src/data/aria.ts` con `GRUPOS` y la interfaz `EntradaAria` (design, decisión 2) y verificar que `astro check` o la build no dan errores de tipos

## 2. Contenido de las entradas

- [x] 2.1 Escribir las entradas de «Nombre y descripción» (`aria-label`, `aria-labelledby`, `aria-describedby`), con código correcto e incorrecto, un ejemplo de uso real, criterios (1.1.1, 1.3.1, 2.5.3, 4.1.2, según aplique) y enlace a la spec; verificar contra el requisito «Contenido de cada entrada»
- [x] 2.2 Escribir las entradas de «Estados de controles» (`aria-expanded`, `aria-pressed`, `aria-checked`, `aria-selected`, `aria-current`, `aria-disabled`) enlazando a los componentes que ya los usan (`interruptor`, `pestanas`, `menu`…); verificar que cada `id` de componente existe en `componentes.ts`
- [x] 2.3 Escribir las entradas de «Relaciones» (`aria-controls`) y «Formularios» (`aria-invalid`, `aria-errormessage`, `aria-required`), recomendando `required` nativo y avisando del soporte desigual de `aria-errormessage` frente a `aria-describedby`; verificar las afirmaciones de soporte contra una fuente citada o dejarlas como no confirmadas
- [x] 2.4 Escribir las entradas de «Mensajes dinámicos» (`aria-live`, `role="status"`, `role="alert"`), «Ocultar contenido» (`aria-hidden`, con el error de ocultar un elemento enfocable) y «Ventanas» (`role="dialog"` + `aria-modal`, recomendando `<dialog>` con `showModal()`); verificar que hay una entrada por cada atributo o rol del requisito «Atributos y roles cubiertos»
- [x] 2.5 Revisar el tono de todo el contenido (castellano claro, frases cortas, `lang="en"` en los términos o citas en inglés) y verificar que «Qué anuncia» no da un texto literal de un lector concreto como universal

## 3. Componente y página

- [x] 3.1 Crear `src/components/AriaEntry.astro` (design, decisión 3) que use `CodeExample` con `tone`, y verificar que una entrada se pinta con todas sus partes y con un solo `h3` (los `h2` son los grupos)
- [x] 3.2 Crear `src/pages/aria.astro` con `Layout`, `PageHead` (único `h1`), el bloque de reglas de uso de ARIA con enlace a «Using ARIA», el índice agrupado (`nav` con `aria-labelledby`, `<details>` en móvil y columna fija en escritorio) y las entradas; verificar que funciona entera con JavaScript desactivado y que las anclas `/aria/#<id>` llevan a cada entrada
- [x] 3.3 Añadir al final de cada grupo un enlace «Volver al índice» y verificar con teclado que el foco llega al índice

## 4. Demos en vivo

- [x] 4.1 Crear un script por demo (`aria-pressed.js`, `aria-expanded.js`, `aria-status.js`, `aria-invalid.js`), importarlo en `aria.astro` y mostrar su código con `?raw` donde se enseñe; verificar con teclado (Tab, Enter, Espacio) que cada demo cambia el atributo y el estado visible
- [ ] 4.2 Verificar que los mensajes de las demos se escriben en regiones `role="status"` presentes desde la carga y que se anuncian con un lector de pantalla (NVDA + Firefox o VoiceOver + Safari)
- [x] 4.3 Verificar que las demos no animan con `prefers-reduced-motion: reduce`

## 5. Integración en el sitio

- [x] 5.1 Añadir `{ href: "/aria/", label: "ARIA" }` a `SECCIONES` después de «Componentes» y verificar que aparece en la cabecera y el pie, con `aria-current="page"` en `/aria/`
- [x] 5.2 Añadir la tarjeta de la sección en `secciones` de `src/pages/index.astro` y verificar que la portada mantiene la rejilla sin huecos
- [x] 5.3 Añadir `/aria/` a `RUTAS` en `src/pages/sitemap.xml.ts` y verificar que aparece en `dist/sitemap.xml` tras la build
- [x] 5.4 Añadir la sección `/aria/` a la lista de secciones de `README.md`

## 6. Verificación de accesibilidad integrada

- [x] 6.1 Revisar `/aria/` y la cabecera a 320 px de ancho y con el texto al 200 % (y con los botones A+ del sitio), y verificar que no hay scroll horizontal en la página y que los bloques de código ajustan sus líneas
- [x] 6.2 Comprobar el contraste de las etiquetas Correcto/Incorrecto, el índice y las demos en modo claro y oscuro (4,5:1 en texto, 3:1 en componentes) y que el foco es visible en todos los controles
- [x] 6.3 Pasar axe o Lighthouse a `/aria/`, `/` y `/componentes/` y verificar que no hay errores nuevos
- [x] 6.4 Ejecutar la build de producción y verificar que termina sin avisos nuevos

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` cuando esté revisado, para que `guia-aria` pase a `openspec/specs/`.
