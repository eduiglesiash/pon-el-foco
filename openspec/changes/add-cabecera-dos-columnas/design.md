# Design

## Context

- `src/components/PageHead.astro` pinta el único `h1` de cada página y su introducción, dentro de `wrap` o `wrap-wide` (prop `wide`), con `flex flex-col gap-4 pt-[clamp(2rem,5vw,3.5rem)] pb-8`.
- Hoy los tres bloques están fuera de `PageHead`, al principio del contenido:
  - `/componentes/`: un `<div>` con `h2` «La regla de oro» y `mb-10`.
  - `/aria/`: un `<section aria-labelledby="t-reglas">` con `mb-10`.
  - `/alt/`: un `<section aria-labelledby="t-que-es">` con `max-w-[46rem]`, dentro de un contenedor `flex flex-col gap-12`.
- Los tres comparten las mismas clases de bloque amarillo (`bg-sign text-sign-ink`, esquinas irregulares). Este cambio no las toca.
- Requisitos: `specs/cabecera-pagina/spec.md`.

## Goals / Non-Goals

**Goals:**
- La rejilla de dos columnas vive en un solo sitio (`PageHead`), no en cada página.
- Las páginas sin bloque lateral generan exactamente el mismo HTML que ahora.

**Non-Goals:**
- No se extrae un componente para el bloque amarillo. Hay tres variantes con contenido distinto y moverlas no lo pide.
- No se cambian los tamaños de letra.

## Decisions

### 1. Slot `aside` en `PageHead` con dos ramas de marcado

```astro
---
const lateral = Astro.slots.has("aside");
const ancho = wide ? "wrap-wide" : "wrap";
---
{lateral ? (
  <div class:list={[ancho, "grid gap-x-12 gap-y-8 pt-[clamp(2rem,5vw,3.5rem)] pb-10 lg:grid-cols-2 lg:items-start"]}>
    <div class="flex flex-col gap-4">
      <h1 …>{title}</h1>
      <p …><slot /></p>
    </div>
    <slot name="aside" />
  </div>
) : (
  <div class:list={[ancho, "flex flex-col gap-4 pt-[clamp(2rem,5vw,3.5rem)] pb-8"]}>…igual que ahora…</div>
)}
```

- `lg:grid-cols-2` genera `repeat(2, minmax(0, 1fr))`: dos columnas del mismo ancho que no se desbordan con palabras largas o con `code`. Es el «50 % - 50 %» descontando el hueco entre columnas.
- `lg:items-start`: las dos columnas empiezan arriba y cada una tiene su propia altura (supuesto 2 de la propuesta).
- Por debajo de `lg` es una rejilla de una columna, así que todo queda apilado en el orden del HTML.
- `pb-10` con bloque lateral sustituye al `mb-10` que tenían los bloques. La distancia hasta el contenido de debajo queda casi igual que ahora.
- La rama sin bloque lateral es el marcado actual sin cambios. Así se cumple el requisito «Página sin bloque lateral» por construcción.
- **Alternativa descartada:** una rejilla en cada página. Repite el mismo código tres veces y la cuarta página que lo necesite tendría que copiarlo.

### 2. Cambios en cada página

- El bloque pasa dentro de `<PageHead>` con `slot="aside"` en su elemento raíz (el `<div>` o el `<section>`). Así no hace falta un `<Fragment>`.
- Se quitan `mb-10` (componentes y ARIA) y `max-w-[46rem]` (alt), que dejan de tener sentido dentro de una columna.
- En `/alt/`, el contenedor `wrap flex flex-col gap-12` se queda solo con el árbol. Su `gap-12` deja de separar el bloque del árbol; esa distancia la da el `pb-10` de `PageHead`.
- Los `h2`, los `id` y los `aria-labelledby` no cambian. Los enlaces internos (`#t-reglas`) siguen funcionando.

## Risks / Trade-offs

- **[Riesgo] Títulos largos en media columna:** el `h1` llega a 3,75 rem y «Componentes accesibles, con código» puede ocupar 3 líneas a 1024 px. Mitigación: comprobarlo a 1024 y a 1280 px. Si queda mal, se puede bajar el tamaño máximo del `h1` solo cuando hay bloque lateral. Eso sería un ajuste a decidir contigo, porque la spec no lo pide.
- **[Trade-off] Columnas de alturas distintas:** en `/aria/` el bloque es mucho más alto que el título, así que queda hueco bajo la introducción. Es lo que implica el supuesto 2.

## Verificación

No hay tests automáticos. La verificación es:
1. `npm run build` sin errores.
2. Comparar el HTML generado de una página sin bloque lateral (`/criterios/`) antes y después: tiene que ser idéntico.
3. En el navegador, a 1280 y a 1024 px, medir que las dos columnas tienen el mismo ancho (±1 px) y la misma coordenada superior. A 1023 y a 320 px, comprobar que van apiladas y que no hay scroll horizontal.
4. Comprobar el orden del DOM y el texto al 200 % (escenarios de la spec).
