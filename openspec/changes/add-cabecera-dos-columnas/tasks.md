# Tasks

## 1. Componente

- [x] 1.1 Guardar el HTML de la cabecera de `/criterios/` del `dist` actual como referencia.
- [x] 1.2 Añadir el slot `aside` y las dos ramas de marcado a `src/components/PageHead.astro` (design, decisión 1). Verificar con `npm run build` que compila y que el HTML de la cabecera de `/criterios/` es idéntico a la referencia.

## 2. Páginas

- [x] 2.1 `src/pages/componentes.astro`: mover «La regla de oro» a `slot="aside"` y quitar su `mb-10`.
- [x] 2.2 `src/pages/aria.astro`: mover «Antes de usar ARIA» a `slot="aside"` y quitar su `mb-10`.
- [x] 2.3 `src/pages/alt.astro`: mover «Qué es el alt» a `slot="aside"` y quitar su `max-w-[46rem]`.
- [x] 2.4 Verificar a 1280 y a 1024 px, en las tres páginas, que las columnas tienen el mismo ancho (±1 px) y empiezan a la misma altura. Si algún `h1` queda mal (riesgo de títulos largos), consultarlo antes de tocar tamaños.

## 3. Verificación

- [x] 3.1 A 1023 y a 320 px, comprobar que título, introducción y bloque van apilados en ese orden y sin scroll horizontal.
- [x] 3.2 Comprobar que el orden del DOM es `h1`, introducción y `h2` del bloque en las tres páginas, y que el enlace `#t-reglas` de `/aria/` sigue llevando al bloque.
- [x] 3.3 Con el texto al 200 % en una ventana de 1280 px, comprobar que la cabecera se lee completa y sin solapes, en modo claro y en modo oscuro.
- [x] 3.4 `npm run build` final, commit en `feature/cabeceras-dos-columnas` y PR contra `main`.

## 4. Revisión: reparto 30/70 en ARIA y alt

- [x] 4.1 Añadir la prop `reparto` y el objeto `COLUMNAS` a `src/components/PageHead.astro` (design, decisión 1b). Verificar con `npm run build` que compila, que `/componentes/` sigue en 50/50 y que las páginas sin bloque lateral siguen generando el mismo HTML que la referencia.
- [x] 4.2 Pasar `reparto="bloque"` en `src/pages/aria.astro` y `src/pages/alt.astro`.
- [x] 4.3 A 1280 y a 1024 px, medir en ARIA y alt que la columna del título mide 3/7 de la del bloque (±1 px), que las dos empiezan a la misma altura y que «WAI-ARIA,» se ve dentro de su columna sin invadir el bloque.
- [x] 4.4 Con el texto al 200 % a 1280 px, en claro y en oscuro, comprobar que la columna del título se ensancha lo justo, que no hay solapes ni scroll horizontal, y que a 1023 y a 320 px todo sigue apilado.
- [x] 4.5 Actualizar la descripción de la PR #7 con el nuevo reparto, hacer commit y subirlo a la misma rama.
