# Proposal

## Why

La herramienta «¿Qué alt le pongo?» (`/alt/`) solo se encuentra desde la portada y desde enlaces dentro de otras páginas. Quien llega a cualquier otra página no sabe que existe. Al archivar `add-arbol-decision-alt` se decidió dejarla fuera del menú principal porque ya tenía 5 enlaces. Este cambio revisa esa decisión: añade una única entrada, **«Herramientas»**, que agrupa las herramientas y deja sitio para las que lleguen después.

## What Changes

- Nueva entrada **«Herramientas»** en el menú principal de la cabecera, entre «ARIA» y «¿Me afecta?». Es un botón que despliega una lista de enlaces. Por ahora la lista tiene uno: **«¿Qué alt le pongo?»** → `/alt/`.
- El desplegable sigue el patrón de **divulgación (disclosure)** del W3C: `<button aria-expanded>` y una lista de enlaces normales. **No** usa `role="menu"`: es navegación entre páginas, no un menú de aplicación.
- **Sin JavaScript, la entrada lleva a la herramienta.** «Herramientas» se pinta como un enlace a `/alt/`. Con JavaScript se convierte en el botón que despliega la lista. Así nadie se queda sin acceso.
- **Teclado:** Enter o Espacio abren y cierran la lista. Escape la cierra y devuelve el foco al botón. Al salir con Tab, o al pulsar fuera, la lista se cierra.
- **Página actual:** en `/alt/`, el enlace de la herramienta lleva `aria-current="page"` y «Herramientas» muestra el mismo subrayado que las demás secciones activas.
- **Pie de página:** «¿Qué alt le pongo?» aparece como un enlace más en la lista de secciones. El pie no tiene desplegables.
- **Datos:** la lista de herramientas va en `src/data/navegacion.ts` (`HERRAMIENTAS`), junto a `SECCIONES`. Añadir una herramienta nueva es añadir una línea.

**Supuestos** (se pueden cambiar antes de implementar):
1. El texto del enlace es el nombre que ya tiene la herramienta, «¿Qué alt le pongo?». La petición decía «Qué alt pongo».
2. «Herramientas» va detrás de «ARIA», como pediste en la revisión. El orden queda: Criterios, Componentes, ARIA, Herramientas, ¿Me afecta?, Normativa.
3. «¿Me afecta?» se queda como sección propia, aunque también es un comprobador. No se mueve dentro de «Herramientas».
4. No se crea una página índice `/herramientas/`. Con una sola herramienta no aporta nada.
5. La rama de trabajo parte de `feature/aeo`, porque `/alt/` todavía no está en `main`.

## Capabilities

### New Capabilities
- `navegacion-principal`: el menú principal de la cabecera y el pie. Recoge qué enlaces tienen, en qué orden, cómo se marca la página actual y cómo funciona el desplegable «Herramientas».

### Modified Capabilities
- `arbol-decision-alt`: el requisito «Acceso desde el resto del sitio» añade el menú principal y el pie como puntos de acceso.

## Impact

- **Modificado:** `src/data/navegacion.ts` (nueva constante `HERRAMIENTAS`), `src/components/Header.astro` (desplegable y su `<script>`), `src/components/Footer.astro` (enlace a la herramienta).
- **Riesgo en móvil:** en pantallas estrechas, la lista del menú se desplaza en horizontal (`overflow-x-auto`). Un panel con posición absoluta dentro de ella quedaría recortado. En móvil el panel tiene que mostrarse dentro del flujo de la página, o fuera del `<ul>` que hace scroll. Se resolverá en `design.md`, en la fase de plan.
- **Dependencias:** ninguna nueva.

## Out of Scope (Deferred)

- Página índice `/herramientas/`: se añadirá cuando haya dos o más herramientas.
- Mover «¿Me afecta?» dentro de «Herramientas»: hay que decidirlo aparte.
- Menú de hamburguesa en móvil: hoy no hay y este cambio no lo introduce.
