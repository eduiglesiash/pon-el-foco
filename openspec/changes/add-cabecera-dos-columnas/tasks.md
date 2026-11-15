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
