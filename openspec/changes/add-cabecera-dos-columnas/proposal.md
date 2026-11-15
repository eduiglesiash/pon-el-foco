# Proposal

## Why

En `/componentes/`, `/aria/` y `/alt/`, el bloque amarillo de ideas clave va debajo del título y la introducción, ocupando todo el ancho. En pantallas anchas eso deja el título con mucho hueco a la derecha y empuja el contenido principal hacia abajo. Si se colocan uno al lado del otro, el bloque clave se ve nada más llegar y la cabecera ocupa menos alto.

## What Changes

En pantallas anchas, la cabecera de estas tres páginas pasa a tener dos columnas al 50 %, alineadas arriba:

| Página | Columna izquierda | Columna derecha |
|---|---|---|
| `/componentes/` | «Componentes accesibles, con código» e introducción | «La regla de oro» |
| `/aria/` | «WAI-ARIA, bien usado» e introducción | «Antes de usar ARIA» |
| `/alt/` | «¿Qué alt le pongo?» e introducción | «Qué es el alt» |

- `PageHead` recibe el bloque en un slot con nombre (`aside`). Si la página no lo usa, la cabecera queda igual que ahora: las demás páginas no cambian.
- En pantallas estrechas no cambia nada: título, introducción y bloque, uno debajo de otro, en ese orden.
- No cambia el texto, los colores ni los estilos del bloque, solo su posición.

**Supuestos** (se pueden cambiar antes de implementar):
1. Las dos columnas aparecen desde `lg` (1024 px). Por debajo, todo va apilado como ahora. «Antes de usar ARIA» tiene cuatro reglas y una fuente, y por debajo de 1024 px una columna del 50 % quedaría demasiado estrecha para leerlo bien.
2. «A la misma altura» significa que las dos columnas empiezan arriba a la vez. No se estira la columna del título para igualar alturas: el bloque de ARIA es bastante más alto que el título y la introducción.
3. Cada página conserva su contenedor: `/componentes/` y `/aria/` usan el ancho (`wrap-wide`) y `/alt/` el normal (`wrap`), así que la cabecera sigue alineada con el resto de la página.
4. El orden del HTML no cambia (`h1`, introducción y después el bloque con su `h2`). Así el lector de pantalla y el teclado siguen el mismo orden que antes.

## Capabilities

### New Capabilities
- `cabecera-pagina`: cabecera de página (`PageHead`) con un bloque lateral opcional que va a dos columnas en pantallas anchas.

### Modified Capabilities
<!-- Ninguna. `guia-aria` y `arbol-decision-alt` no fijan la posición de sus bloques introductorios, así que sus requisitos se siguen cumpliendo. -->

## Impact

- **Modificado:** `src/components/PageHead.astro` (slot `aside` y rejilla), `src/pages/componentes.astro`, `src/pages/aria.astro` y `src/pages/alt.astro` (mover el bloque al slot y quitar su margen inferior propio).
- **Dependencias:** ninguna nueva.

## Out of Scope (Deferred)

- Aplicar las dos columnas a otras páginas (`/criterios/`, `/normativa/`, `/me-afecta/`): no lo has pedido y esas páginas no tienen un bloque equivalente.
- Rediseñar el bloque amarillo.
