# Tasks

## 1. Contenido y datos del árbol

- [x] 1.1 Leer el árbol de decisión del W3C (https://www.w3.org/WAI/tutorials/images/decision-tree/) y las páginas de imágenes decorativas, funcionales, de texto y complejas del mismo tutorial; ajustar la estructura de `design.md` (decisión 2) si difiere y anotar la fecha de consulta
- [x] 1.2 Crear `src/data/arbol-alt.ts` con el tipo `Nodo`, `RAIZ`, `NODOS` y `padres()` (design, decisión 3) y verificar que la build compila
- [x] 1.3 Escribir las 7 preguntas con su explicación y ejemplos, y las respuestas con su ayuda, en castellano claro; verificar contra el requisito «Explicación en cada pregunta»
- [x] 1.4 Escribir las 11 conclusiones con veredicto, resumen, «por qué» y código correcto e incorrecto (`<img>` y, cuando aplique, `<svg>` o icono); verificar que cada conclusión de la spec («Conclusiones cubiertas») tiene su nodo y que la de gráficas incluye la alternativa con los datos
- [x] 1.5 Añadir la validación en la build (ids existentes, un solo padre, todo alcanzable desde `RAIZ`, sin ciclos) y verificar que, si se rompe a propósito un `siguiente`, la build falla con un mensaje claro; después restaurarlo

## 2. Página sin JavaScript

- [x] 2.1 Crear `src/pages/alt.astro` con `Layout`, `PageHead` (único `h1`) y la introducción sobre `alt` (qué es, quién lo usa, `alt=""` frente a sin `alt`, consejos de redacción); verificar contra el requisito «Introducción sobre alt»
- [x] 2.2 Pintar todos los nodos como `<section id>` con `h2 tabindex="-1"`; las respuestas como enlaces a `#siguiente` con aspecto de `.route-option` y las conclusiones con caja de veredicto, `CodeExample` y enlace a 1.1.1; verificar con JavaScript desactivado que se puede ir de la primera pregunta a cualquier conclusión y volver con el botón «Atrás» del navegador

## 3. Recorrido interactivo

- [x] 3.1 Crear `src/scripts/arbol-alt.js` que lea el hash, reconstruya el recorrido con el mapa de padres (JSON en la página), pinte el `ol.route` con los pasos hechos («Tu respuesta: …» y «Cambiar») y muestre solo el punto actual; verificar que tras dos respuestas se ven dos pasos y la tercera pregunta
- [x] 3.2 Añadir «Pregunta anterior» y «Empezar de nuevo» como enlaces, y marcar con texto la respuesta elegida al volver a una pregunta; verificar el escenario «Cambiar una respuesta anterior» (desaparecen los pasos posteriores y se sigue por la nueva rama)
- [x] 3.3 Mover el foco al `h2` del nuevo punto en cada `hashchange` provocado por la herramienta (no en la carga inicial); verificar con teclado (Tab, Enter) y con el botón «Atrás» del navegador
- [x] 3.4 Verificar que abrir `/alt/#c-decorativa` y `/alt/#c-compleja` directamente muestra la conclusión con su recorrido completo, y que un hash inexistente muestra la primera pregunta

## 4. Verificación de accesibilidad

- [x] 4.1 Comprobar a 320 px, con el texto al 200 % (640 y 1280 px) y en modo claro y oscuro que no hay scroll horizontal y que el contraste cumple (4,5:1 en texto, 3:1 en componentes)
- [x] 4.2 Pasar Lighthouse y axe a `/alt/` y verificar que no hay errores; comprobar que todas las respuestas y botones miden al menos 44×44 px y que con `prefers-reduced-motion: reduce` no hay animaciones
- [ ] 4.3 Recorrer una rama completa con un lector de pantalla (VoiceOver + Safari o NVDA + Firefox) y verificar que cada nueva pregunta o conclusión se anuncia al llegar

## 5. Integración en el sitio

- [x] 5.1 Enlazar la herramienta desde la portada y verificar que la rejilla de la portada sigue equilibrada en móvil y escritorio
- [x] 5.2 Enlazar desde `/criterios/1-1-1/` (design, decisión 6) y verificar que el enlace aparece solo en ese criterio
- [x] 5.3 Añadir el enlace en la nota del componente «imagen» (`componentes.ts`) y en la entrada `aria-hidden` (`aria.ts`), y verificar que la build pasa (los enlaces de `aria.ts` se validan)
- [x] 5.4 Añadir `/alt/` a `RUTAS` del sitemap y una línea al README; verificar que aparece en `dist/sitemap.xml`
- [x] 5.5 Ejecutar la build de producción y verificar que termina sin avisos nuevos

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` cuando esté revisado.
