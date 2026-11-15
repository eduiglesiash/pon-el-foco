# Tasks

## 1. Datos de navegación

- [x] 1.1 En `src/data/navegacion.ts`, añadir los tipos `Enlace` y `Seccion`, la constante `HERRAMIENTAS` y la entrada «Herramientas» con `hijos` entre «ARIA» y «¿Me afecta?» (design, decisión 1). Verificar que `npm run build` compila.
- [x] 1.2 En `src/components/Footer.astro`, pintar los `hijos` en lugar de la entrada cuando los tenga. Verificar en `npm run preview` que el pie muestra «¿Qué alt le pongo?» y no «Herramientas», y que el resto del pie no cambia.

## 2. Cabecera sin JavaScript

- [x] 2.1 Añadir el icono `chevron-down` a `src/components/Icon.astro`.
- [x] 2.2 En `src/components/Header.astro`, pintar el `<li data-desplegable>` con el enlace de reserva, el botón `hidden` y el panel `hidden` (design, decisiones 2, 3 y 5). Añadir `relative` al `<nav>` y marcar como activa la sección cuando `path` coincide con un hijo. Verificar con JavaScript desactivado que «Herramientas» aparece entre «ARIA» y «¿Me afecta?», que lleva a `/alt/` y que en `/alt/` se ve subrayada.

## 3. Desplegable con JavaScript

- [x] 3.1 Añadir el script del desplegable al `<script>` de `Header.astro` (design, decisión 4). Verificar los escenarios «Abrir el desplegable», «Ir a la herramienta» y «Clic fuera».
- [x] 3.2 Verificar con teclado los escenarios «Cerrar con Escape» y «Salir con Tab», y que Enter y Espacio abren y cierran la lista sin mover el foco.
- [ ] 3.3 Verificar en Safari (macOS) que pulsar «¿Qué alt le pongo?» con el ratón navega sin que el panel se cierre antes, y ajustar `focusout` si hace falta (design, riesgo de Safari).
- [x] 3.4 Verificar el escenario «Estar en la herramienta»: en `/alt/`, el botón muestra la barra de sección activa y el enlace del panel lleva `aria-current="page"`.

## 4. Verificación de accesibilidad y responsive

- [x] 4.1 A 320 px (emulación móvil) abrir «Herramientas» con la lista del menú desplazada al final. Verificar que el panel se ve entero, a todo el ancho y sin recortes, y que la página no hace scroll horizontal (escenario «Móvil»).
- [x] 4.2 Con el texto al 200 % (botón A+ hasta el máximo y zoom del navegador) en móvil y en escritorio, verificar que el panel sigue anclado bajo «Herramientas» y se lee completo.
  - Nota: a 320 px con el texto al 200 % la página ya se ensanchaba a 524 px antes de este cambio (comprobado en `feature/aeo`). No lo causa el desplegable; queda pendiente aparte.
- [x] 4.3 Medir el contraste del texto del panel (≥ 4,5:1) y del borde (≥ 3:1) en modo claro y en modo oscuro. Comprobar que el botón y el enlace miden al menos 44×44 px y que con `prefers-reduced-motion: reduce` el chevron no se anima.
- [ ] 4.4 Pasar axe o Lighthouse a una página cualquiera con el panel abierto y cerrado, sin errores nuevos.
- [ ] 4.5 Con VoiceOver y Safari, verificar que el botón se anuncia como «Herramientas, botón, contraído» y después «expandido», y que el enlace activo se anuncia como página actual.

## 5. Cierre

- [x] 5.1 Revisar que el README no describe la navegación de forma que haya quedado desactualizada, y actualizarlo si es así.
- [x] 5.2 `npm run build` final y commit en `feature/menu-herramientas`.
