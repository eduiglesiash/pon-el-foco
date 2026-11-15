# Design

## Context

- `src/data/navegacion.ts` exporta `SECCIONES`, un array plano `{ href, label }`. Lo usan dos componentes: `Header.astro`, que pinta el `<nav aria-label="Principal">`, y `Footer.astro`, que pinta la lista del pie.
- En la cabecera, la lista del menú es un `<ul>` que en móvil se desplaza en horizontal: `overflow-x-auto`, una máscara con degradado y la barra de scroll oculta. Desde `md` se convierte en una fila normal (`md:overflow-visible md:flex-wrap`).
- La página activa se marca con `aria-current` (`"page"` en la página exacta y `"true"` en sus subpáginas) y con una barra pseudo-elemento `after:` bajo el texto.
- No hay `ClientRouter`. Las transiciones son de documento a documento (`@view-transition` en CSS), así que cada `<script>` de Astro se ejecuta una vez por carga de página.
- El proyecto no tiene tests automáticos (`package.json` no tiene script `test`). La verificación es la build (`npm run build`) más comprobaciones manuales en el navegador.
- Requisitos: `specs/navegacion-principal/spec.md`. Motivación: `proposal.md`.

## Goals / Non-Goals

**Goals:**
- Un solo array de navegación sigue siendo la fuente de verdad del orden, tanto en la cabecera como en el pie.
- Sin JavaScript, todo se puede usar. Con JavaScript se añade el desplegable.
- Sin dependencias nuevas, sin cálculo de posiciones en JavaScript y con el mínimo script posible.

**Non-Goals:**
- No se crea un componente genérico de desplegable reutilizable. Hay uno solo.
- No se usa la API `popover` ni el anchor positioning de CSS (ver decisión 3).
- No hay menú de hamburguesa en móvil.

## Decisions

### 1. Datos: «Herramientas» es una entrada de `SECCIONES` con hijos

```ts
export type Enlace = { href: string; label: string };
export type Seccion = Enlace & { hijos?: Enlace[] };

/** Herramientas interactivas. Cuelgan de «Herramientas» en la cabecera y aparecen sueltas en el pie. */
export const HERRAMIENTAS: Enlace[] = [{ href: "/alt/", label: "¿Qué alt le pongo?" }];

export const SECCIONES: Seccion[] = [
  { href: "/criterios/", label: "Criterios" },
  { href: "/componentes/", label: "Componentes" },
  { href: "/aria/", label: "ARIA" },
  // Sin JavaScript, «Herramientas» es un enlace a la primera herramienta
  { href: HERRAMIENTAS[0].href, label: "Herramientas", hijos: HERRAMIENTAS },
  { href: "/me-afecta/", label: "¿Me afecta?" },
  { href: "/normativa/", label: "Normativa" },
];
```

- El orden de la cabecera sale del array, igual que ahora.
- El pie recorre `SECCIONES`. Para una entrada con `hijos`, pinta los hijos en lugar de la entrada. Así el pie muestra «¿Qué alt le pongo?» y no «Herramientas».
- **Alternativa descartada:** dejar `SECCIONES` como estaba e insertar «Herramientas» en `Header.astro` por posición (después del índice 2). Es frágil: si se reordena el array, la entrada acaba en otro sitio.

### 2. Marcado: enlace de reserva, botón oculto y panel oculto

Dentro del `<li>` de «Herramientas»:

```astro
<li class="md:relative" data-desplegable>
  <a href="/alt/" class="…mismas clases que las demás…" data-sin-js>Herramientas</a>
  <button type="button" hidden aria-expanded="false" aria-controls="nav-herramientas" class="…mismas clases… gap-1.5">
    Herramientas
    <svg aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180 motion-reduce:transition-none">…chevron…</svg>
  </button>
  <ul id="nav-herramientas" hidden class="…panel…">
    <li><a href="/alt/" aria-current={…}>¿Qué alt le pongo?</a></li>
  </ul>
</li>
```

- El HTML ya trae el enlace visible, y el botón y el panel con `hidden`. El script muestra el botón y oculta el enlace. Sin JavaScript queda el enlace, como pide el requisito «Sin JavaScript».
- `hidden` también saca el panel del árbol de accesibilidad y del orden de tabulación. No hace falta `aria-hidden`.
- El panel va justo después del botón en el DOM. Así el orden de tabulación es botón → enlaces del panel → «¿Me afecta?», como exige el escenario «Salir con Tab» (WCAG 2.4.3).
- Se añade a `Icon.astro` un icono `chevron-down` (un `path` más). No hay un icono parecido entre los existentes.
- La sección activa: si `path` empieza por el `href` de algún hijo, el botón y el enlace de reserva llevan la barra `after:` (solo visual, sin `aria-current`, porque «Herramientas» no es una página), y el hijo lleva `aria-current="page"`.

### 3. Que el panel no quede recortado en móvil (sin calcular posiciones)

El problema es que `overflow-x: auto` en el `<ul>` móvil recorta cualquier descendiente que desborde, también uno con posición absoluta *si su bloque contenedor está dentro del `<ul>`*.

La solución es que el bloque contenedor del panel quede **fuera** del `<ul>` que hace scroll:
- **Móvil (< `md`):** ni el `<li>` ni el `<ul>` tienen `position`. El `<nav>` lleva `relative`. El panel es `absolute inset-x-0 top-full`, así que se ancla al `<nav>` y ocupa todo el ancho bajo la fila del menú. Como el `<ul>` no es su bloque contenedor, su `overflow` no lo recorta. Esto lo define CSS 2.1, en el apartado sobre `overflow` y bloques contenedores.
- **`md` en adelante:** el `<ul>` ya no hace scroll (`md:overflow-visible`). El `<li>` pasa a `md:relative` y el panel a `md:left-0 md:right-auto md:min-w-max`, así que queda bajo el botón.
- El `backdrop-filter` de la cabecera no afecta, porque el panel es `absolute`, no `fixed`.
- **Hallado al implementar:** el `mask-image` que crea el degradado del final de la lista móvil también afecta al panel. El panel se pinta dentro del contexto de apilamiento del `<ul>` y la máscara lo hacía transparente. Por eso, mientras el panel está abierto, el script pone `data-abierto` en el `<ul>` y la clase `data-abierto:[mask-image:none]` quita la máscara. Al cerrarlo, el degradado vuelve.
- **Hallado al implementar:** en móvil la cabecera no tenía `position`, así que su `z-50` no se aplicaba y el contenido de la página tapaba el panel. Ahora la cabecera es `relative z-50`. Desde `md` sigue siendo `md:sticky`.
- **Alternativas descartadas:**
  - `popover` con anchor positioning de CSS: el panel saldría en la capa superior sin recortes y con Escape y clic fuera ya resueltos. Pero el anchor positioning no está disponible en todos los navegadores que hay que soportar, y sin él el panel aparece en el centro de la pantalla. Además, `popovertarget` despliega sin JavaScript, lo que contradice el requisito aprobado.
  - Posición `fixed` calculada en JavaScript: más código y hay que recalcularla al hacer scroll o redimensionar.
  - Quitar el scroll horizontal del menú al abrir el panel: el menú cambia de forma bajo el dedo.

### 4. Comportamiento (≈ 30 líneas en el `<script>` de `Header.astro`)

```ts
const caja = document.querySelector<HTMLElement>("[data-desplegable]");
if (caja) {
  const enlace = caja.querySelector<HTMLAnchorElement>("[data-sin-js]")!;
  const boton = caja.querySelector("button")!;
  const panel = document.getElementById(boton.getAttribute("aria-controls")!)!;
  enlace.hidden = true;
  boton.hidden = false;
  const abrir = (si: boolean) => { boton.setAttribute("aria-expanded", String(si)); panel.hidden = !si; };
  boton.addEventListener("click", () => abrir(panel.hidden));
  caja.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { abrir(false); boton.focus(); }
  });
  // Cerrar al salir con Tab: el foco pasa a un elemento fuera de la caja
  caja.addEventListener("focusout", (e) => {
    const destino = e.relatedTarget as Node | null;
    if (destino && !caja.contains(destino)) abrir(false);
  });
  // Cerrar al pulsar fuera
  document.addEventListener("click", (e) => {
    if (!caja.contains(e.target as Node)) abrir(false);
  });
}
```

- Enter y Espacio los gestiona el propio `<button>`.
- No se mueve el foco al abrir (patrón de divulgación del W3C, «Disclosure Navigation Menu»).
- `focusout` solo cierra cuando el foco va a otro elemento (`relatedTarget` distinto de `null`). Safari en macOS no da foco a botones ni enlaces al hacer clic. Allí `relatedTarget` puede ser `null` al pulsar un enlace del panel, y si `focusout` cerrara en ese caso, el panel desaparecería antes de navegar. El clic en una zona sin foco lo cierra el listener de `click`. **A verificar en Safari** (tarea 3.3).

### 5. Estilos del panel

- `bg-surface`, `border border-edge` (≥ 3:1 sobre el fondo en claro y en oscuro, como el resto de controles), `rounded-2xl`, `shadow-[0_12px_32px_-16px_var(--shadow)]`, `p-1.5` y `z-50`.
- Los enlaces son `flex min-h-11 items-center rounded-xl px-3 font-bold text-ink no-underline hover:bg-sunk`. El enlace activo lleva la misma barra `after:` que el menú.
- Sin animación de apertura. Solo gira el chevron, y con `motion-reduce:transition-none` no hay transición.
- Solo se usan tokens existentes. No se añaden colores.

## Risks / Trade-offs

- **[Riesgo] Safari y `focusout`:** ver decisión 4. Mitigación: probarlo en Safari antes de dar la tarea por hecha.
- **[Riesgo] En móvil el panel tapa el principio del contenido.** Es intencionado: se cierra al tocar fuera, al pulsar Escape o al salir con Tab, y la cabecera no es sticky en móvil.
- **[Riesgo] 200 % de texto en `md`:** con el texto ampliado el menú puede pasar a dos filas (`md:flex-wrap`). El panel sigue anclado al `<li>`, así que no se desalinea.
- **[Trade-off] Una sola herramienta en un desplegable:** es un clic más que un enlace directo. Se acepta porque es la estructura que se ha pedido y prepara la llegada de más herramientas.

## Verificación

No hay tests automáticos ni se añade un framework de tests: sería una dependencia nueva para un único componente. La verificación es:
1. `npm run build` sin errores.
2. `npm run preview` y comprobación manual de cada escenario de la spec, con teclado, ratón y táctil (emulación móvil a 320 px).
3. Contraste medido en claro y en oscuro, Lighthouse o axe sin errores en la cabecera, y VoiceOver con Safari para el anuncio de «contraído» y «expandido».
