## ADDED Requirements

### Requirement: Entradas del menú principal
La cabecera SHALL tener un `<nav aria-label="Principal">` con, en este orden: Criterios, Componentes, ARIA, Herramientas, ¿Me afecta? y Normativa. Todas salvo «Herramientas» SHALL ser enlaces. «Herramientas» SHALL agrupar las herramientas definidas en `HERRAMIENTAS` (`src/data/navegacion.ts`).

#### Scenario: Ver el menú
- **WHEN** una persona abre cualquier página del sitio
- **THEN** ve en la cabecera las seis entradas, con «Herramientas» entre «ARIA» y «¿Me afecta?»

### Requirement: Desplegable de Herramientas
Con JavaScript, «Herramientas» SHALL ser un `<button type="button">` con `aria-expanded` y `aria-controls` que muestra u oculta una lista (`<ul>`) de enlaces. La lista SHALL contener «¿Qué alt le pongo?», que enlaza a `/alt/`. El patrón SHALL ser el de divulgación (disclosure): sin `role="menu"` ni `role="menuitem"`.

#### Scenario: Abrir el desplegable
- **WHEN** una persona activa «Herramientas»
- **THEN** el botón pasa a `aria-expanded="true"` y se ve la lista con el enlace «¿Qué alt le pongo?»

#### Scenario: Ir a la herramienta
- **WHEN** con la lista abierta una persona activa «¿Qué alt le pongo?»
- **THEN** el navegador abre `/alt/`

### Requirement: Uso con teclado
El desplegable SHALL usarse por completo con teclado. Enter y Espacio sobre el botón SHALL abrir y cerrar la lista. Tab SHALL recorrer los enlaces de la lista en orden. Escape SHALL cerrar la lista y devolver el foco al botón. Al abrir la lista, el foco SHALL quedarse en el botón.

#### Scenario: Cerrar con Escape
- **WHEN** el foco está en «¿Qué alt le pongo?» con la lista abierta y la persona pulsa Escape
- **THEN** la lista se cierra, el botón pasa a `aria-expanded="false"` y el foco vuelve al botón

#### Scenario: Salir con Tab
- **WHEN** el foco está en el último enlace de la lista y la persona pulsa Tab
- **THEN** el foco pasa a «¿Me afecta?» y la lista se cierra

### Requirement: Cierre al pulsar fuera
La lista SHALL cerrarse cuando se pulsa o se toca fuera del botón y de la lista. En ese caso el foco SHALL quedarse donde la persona ha pulsado.

#### Scenario: Clic fuera
- **WHEN** la lista está abierta y la persona hace clic en el contenido de la página
- **THEN** la lista se cierra

### Requirement: Sin JavaScript
Sin JavaScript, «Herramientas» SHALL ser un enlace a `/alt/`, con el mismo aspecto que las demás entradas del menú.

#### Scenario: JavaScript desactivado
- **WHEN** la página se carga sin JavaScript y la persona activa «Herramientas»
- **THEN** el navegador abre `/alt/`

### Requirement: Página actual
En una página de `HERRAMIENTAS`, su enlace SHALL llevar `aria-current="page"`, y la entrada «Herramientas» SHALL mostrar el mismo indicador visual que las secciones activas. El indicador no puede depender solo del color.

#### Scenario: Estar en la herramienta
- **WHEN** una persona está en `/alt/` y abre el desplegable
- **THEN** «Herramientas» aparece subrayada como sección activa y «¿Qué alt le pongo?» tiene `aria-current="page"`

### Requirement: Pie de página
El pie SHALL listar como enlaces normales, sin desplegable, Inicio, las secciones de `SECCIONES` y cada herramienta de `HERRAMIENTAS`.

#### Scenario: Herramienta en el pie
- **WHEN** una persona llega al pie de cualquier página
- **THEN** encuentra el enlace «¿Qué alt le pongo?» a `/alt/`

### Requirement: Accesibilidad del desplegable
El desplegable SHALL cumplir WCAG 2.2 AA:
- foco visible en el botón y en los enlaces
- objetivos de al menos 44×44 px
- contraste de 4,5:1 en el texto y de 3:1 en los bordes del panel, en modo claro y en modo oscuro
- un indicador visual de abierto o cerrado que no dependa solo del color (por ejemplo, un chevron que gira)
- sin animación con `prefers-reduced-motion: reduce`

El panel no SHALL tapar el elemento que tiene el foco (2.4.11).

#### Scenario: Modo oscuro
- **WHEN** la lista está abierta en modo oscuro
- **THEN** el panel y sus enlaces cumplen los contrastes mínimos

### Requirement: Pantallas estrechas y texto ampliado
A 320 px de ancho y con el texto al 200 %, el desplegable SHALL verse completo, sin recortes por el desplazamiento horizontal del menú y sin scroll horizontal en la página.

#### Scenario: Móvil
- **WHEN** una persona abre «Herramientas» en una pantalla de 320 px
- **THEN** ve la lista entera, puede tocar el enlace y la página no se desplaza en horizontal
