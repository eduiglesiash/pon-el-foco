# Design

## Context

El sitio es Astro estático con Tailwind v4 y tokens de color en `src/styles/global.css`. La sección más parecida es `/componentes/`:

- El contenido vive en `src/data/componentes.ts` (interfaz `Componente`, bloques `Codigo` con `lang`, `code`, `label` y `demo` opcional).
- `ComponentEntry.astro` pinta cada entrada con `CodeExample.astro` (etiquetas «Correcto»/«Incorrecto» con icono y `<Code>` de Astro, tema `css-variables`).
- Las demos usan scripts de `src/scripts/` que la página importa y que también se muestran con `?raw`, así que el código enseñado y el que se ejecuta son el mismo.
- La navegación sale de `SECCIONES` en `src/data/navegacion.ts` (cabecera y pie). El sitemap tiene una lista `RUTAS` fija. La portada tiene un array `secciones` de tarjetas.
- `componentes.astro` lleva un maestro-detalle con buscador (unas 120 líneas de JS en línea) porque tiene 18 componentes con demos largas.

Motivación y alcance: ver `proposal.md`. Requisitos: ver `specs/guia-aria/spec.md`.

## Goals / Non-Goals

**Goals:**
- Reutilizar `CodeExample`, `PageHead`, `Icon`, tokens y el patrón de datos de Componentes. Cero dependencias nuevas.
- Página que funcione completa sin JavaScript; JS solo para las demos.
- Contenido separado de la presentación (`src/data/aria.ts`), para que añadir un atributo sea añadir un objeto.

**Non-Goals:**
- No reproducir el maestro-detalle ni el buscador de Componentes.
- No refactorizar `componentes.astro` ni extraer su JS a un módulo compartido.
- No cubrir todos los atributos de ARIA 1.2 ni los roles de landmark o de widget compuesto (`tablist`, `menu`, `combobox`), que ya están en Componentes.

## Decisions

### 1. Página larga con índice, no maestro-detalle
Todas las entradas se muestran una tras otra con un índice agrupado. En escritorio el índice es una columna fija (`sticky`, solo CSS). En móvil es una lista en dos columnas antes de las entradas. *(Al implementar se descartó el `<details>`: sin JS no se puede dejarlo abierto en escritorio y cerrado en móvil, y la lista corta no lo necesita.)*
- **Por qué:** son unas 17 entradas cortas. Una página continua se lee de corrido, funciona sin JS, Ctrl+F encuentra cualquier atributo y no hay que mantener otro script de navegación.
- **Alternativa descartada:** reutilizar el maestro-detalle. Daría coherencia visual con Componentes, pero obliga a duplicar unas 120 líneas o a extraerlas a un módulo compartido tocando una página que funciona. Si más adelante se quiere unificar, se hace en un cambio aparte.

### 2. Modelo de datos `EntradaAria` en `src/data/aria.ts`
```ts
interface EntradaAria {
  id: string;              // ancla: "aria-label", "role-status"…
  grupo: GrupoAria;        // const GRUPOS = ["Nombre y descripción", …] as const
  nombre: string;          // "aria-label", 'role="status"'
  queHace: string;
  cuando: string[];
  cuandoNo: string[];      // incluye la alternativa nativa
  anuncia: string;         // qué anuncia un lector, en términos generales
  codigo: Codigo[];        // reutiliza Codigo de componentes.ts; tone en lugar de label
  uso: { titulo: string; texto: string; codigo: Codigo[] };
  demo?: string;           // HTML de la demo, como en Componentes
  criterios: string[];     // ids WCAG
  componentes?: string[];  // ids de componentes.ts
  spec: string;            // ancla en WAI-ARIA 1.2
}
```
- Se reutiliza el tipo `Codigo` y se le añade un `tone?: "bien" | "mal"` opcional, que `CodeExample` ya acepta. Es un cambio compatible y `ComponentEntry` no lo usa.
- **Alternativa descartada:** añadir las entradas a `componentes.ts` con una categoría nueva. Mezcla dos cosas distintas (componentes frente a atributos) y la interfaz `Componente` no tiene «cuándo no» ni «qué anuncia».

### 3. Componente `AriaEntry.astro`
Es un `<article id>` con su `h2`, que pinta «Qué hace», «Cuándo usarlo» / «Cuándo no» (dos listas), «Qué anuncia», el código correcto/incorrecto, «Ejemplo de uso», la demo opcional y los enlaces (criterios, componentes, spec). Jerarquía: `h1` de página, `h2` por grupo, `h3` por entrada y `h4` para sus apartados. La caja de demo copia el marcado de `ComponentEntry` («Vista previa · Pruébala con el ratón y con el teclado»), pero sin extraerlo a un componente: hacerlo obligaría a tocar `ComponentEntry`. Si se repite una tercera vez, se extrae.

### 4. Demos: un script por atributo
`src/scripts/aria-pressed.js`, `aria-expanded.js`, `aria-status.js` y `aria-invalid.js`, enganchados por `data-demo-*`, importados en la página y mostrados enteros con `?raw` en su entrada. *(Al implementar se cambió el script único por uno por atributo, como en Componentes: así cada entrada muestra exactamente el código que se ejecuta.)* Respeta `prefers-reduced-motion` (las demos no animan). Los mensajes dinámicos escriben en regiones `role="status"` que existen desde la carga.

### 5. Fuente de referencia
**Comprobado el 12/11/2026 en w3.org (tarea 1.1):**
- `https://www.w3.org/TR/wai-aria/` apunta a **WAI-ARIA 1.2, Recomendación del W3C del 6 de junio de 2023**. ARIA 1.3 no se ha publicado como Recomendación. Las definiciones se enlazan a `https://www.w3.org/TR/wai-aria-1.2/#<id>`; existen las 19 anclas usadas (`aria-label` … `aria-modal`, `status`, `alert`, `dialog`).
- **«Using ARIA» es un borrador discontinuado** (W3C Discontinued Draft, 24/02/2026), que se conserva como histórico y remite a la ARIA Authoring Practices Guide (APG). Las cuatro reglas se resumen en la página citando «Using ARIA» como origen, con la advertencia de que ya no se mantiene, y se enlaza también a la APG (`https://www.w3.org/WAI/ARIA/apg/`) como guía vigente.
- En ARIA 1.2, el uso **global** de `aria-disabled`, `aria-invalid` y `aria-errormessage` está obsoleto: solo valen en los roles que los admiten. `aria-errormessage` va siempre junto a `aria-invalid="true"`. Las entradas lo dicen.

### 6. «Qué anuncia» en términos generales
Los lectores de pantalla (NVDA, JAWS, VoiceOver, TalkBack) verbalizan distinto. Se describe el rol, el nombre y el estado que se exponen (por ejemplo «botón, contraído»), aclarando una vez en la introducción que el texto exacto cambia según el lector. Así no se afirma nada que no se haya comprobado (CLAUDE.md: contenido verificable).

### 7. Integración con el sitio
- `SECCIONES`: `{ href: "/aria/", label: "ARIA" }` después de «Componentes».
- Portada: una tarjeta «WAI-ARIA, bien usado» en `secciones`.
- `sitemap.xml.ts`: añadir `/aria/` a `RUTAS`.
- `README.md`: una línea en la lista de secciones.

## Risks / Trade-offs

- [Cabecera con 5 enlaces] → En móvil la lista ya es un carrusel horizontal propio con máscara, así que no crea scroll en la página. Hay que comprobarlo a 320 px y con el zoom al 200 %, y en `md` revisar que el `flex-wrap` no descoloque los botones de tamaño y tema.
- [Contenido con imprecisiones sobre soporte de lectores] → Fórmula general en «Qué anuncia», enlaces a la spec y revisión con al menos NVDA + Firefox o VoiceOver + Safari de las demos antes de cerrar.
- [Demos que contradicen el texto] → El código mostrado sale del mismo archivo que se ejecuta (`?raw`) o del mismo string que la demo (`demo: "same"`).
- [Página larga] → Índice fijo en escritorio, anclas estables y un enlace «Volver al índice» al final de cada grupo.
- [Duplicar el marcado de la caja de demo] → Se acepta de forma consciente (decisión 3).

## Migration Plan

Es contenido nuevo, sin migración. Para deshacerlo basta con revertir el commit; los únicos archivos existentes que se tocan son `navegacion.ts`, `index.astro`, `sitemap.xml.ts`, `README.md` y el tipo `Codigo`.

## Open Questions

- ¿El texto de la tarjeta de portada y la etiqueta «ARIA» del menú son los definitivos? Se pueden ajustar al implementar sin cambiar la spec.
