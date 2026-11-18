# Decisiones del proyecto

Pon el foco (accesibilidad web y WCAG en español) es una web informativa sobre normativa de accesibilidad digital (España y UE) y criterios WCAG 2.2. Estas reglas aplican a cualquier cambio.

## Prioridades

1. **La accesibilidad va antes que el diseño.** Si una decisión visual choca con WCAG 2.2 AA, gana la accesibilidad. La web tiene que ser un ejemplo de lo que explica.
2. **Contenido correcto y verificable.** Los datos legales (fechas, artículos, importes) se citan con fuente oficial (BOE, DOUE, W3C, ETSI). Si algo no está confirmado, se dice.
3. **Sencillez.** Menos código y menos dependencias antes que soluciones ingeniosas.

## Stack

- **Gestor de paquetes: pnpm.** No usar npm ni yarn (no generar `package-lock.json` ni `yarn.lock`).
- **Framework: Astro.** Páginas y componentes `.astro`; HTML estático por defecto.
- **Estilos: Tailwind CSS v4** (plugin `@tailwindcss/vite`). Los colores son tokens en `src/styles/global.css` (variables CSS en `:root` con su versión oscura, expuestas como `bg-surface`, `text-muted`, `border-line`…). No usar colores sueltos de la paleta de Tailwind ni hex en los componentes.
- **JavaScript mínimo:** solo `<script>` de Astro donde haga falta interactividad. Sin frameworks de UI (React, Vue…) salvo justificación.

## Dependencias

- No añadir librerías sin una justificación escrita (qué problema resuelven y por qué no basta con la plataforma o unas pocas líneas propias). Anotar la decisión en este archivo.
- Fijar versiones exactas.
- Respetar el `minimumReleaseAge` de pnpm: no añadir excepciones en `pnpm-workspace.yaml` para instalar versiones recién publicadas; usar la última versión que cumpla la política.

## Accesibilidad (obligatorio en cada cambio)

- HTML semántico primero: `button`, `a`, `details`, `fieldset`/`legend`, `label`, `table` con `th`. ARIA solo cuando no haya elemento nativo.
- Contraste mínimo 4,5:1 en texto y 3:1 en componentes; comprobarlo en modo claro y oscuro.
- Todo se usa con teclado y el foco siempre es visible (no quitar el `:focus-visible` global).
- Objetivos táctiles de al menos 44×44 px en controles principales (24×24 px como mínimo absoluto).
- El texto se puede ampliar al 200 % y la página funciona a 320 px de ancho sin scroll horizontal. Usar `rem`, no alturas fijas en contenedores de texto.
- Respetar `prefers-reduced-motion` y `prefers-color-scheme`.
- Los mensajes dinámicos se anuncian con `aria-live` / `role="status"`.
- `lang="es"` en la página y `lang` en fragmentos en otros idiomas.
- Imágenes con `alt` útil; las decorativas con `alt=""` o `aria-hidden="true"`.
- Nada de overlays o plugins de "accesibilidad automática".

## Idioma y tono

- Castellano claro, para personas que no son juristas. Frases cortas, sin jerga innecesaria.
- Código, nombres de archivos y commits pueden ir en inglés o castellano, pero de forma coherente dentro de cada archivo.

## Estructura

- `src/pages/` una página por sección (inicio, criterios, componentes, me-afecta, normativa) · `src/components/` secciones · `src/data/` contenido (criterios WCAG, ejemplos de código, componentes, contexto del asistente) · `src/scripts/` JS de las demos · `src/lib/` utilidades de build (fechas de modificación desde git) · `src/styles/global.css` tokens y estilos base.
- Los bloques de código se pintan con `<Code>` de Astro (tema `css-variables` mapeado a los tokens): no añadir librerías de resaltado.
