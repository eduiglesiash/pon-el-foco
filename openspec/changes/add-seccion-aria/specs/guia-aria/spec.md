# Spec Delta

## Purpose

Ofrecer en el sitio una referencia en castellano de los atributos y roles de WAI-ARIA más usados: qué hacen, cuándo aplicarlos, cuándo no y cómo se escriben bien, con código y ejemplos de uso.

## ADDED Requirements

### Requirement: Página de la sección ARIA
El sitio SHALL publicar una página en `/aria/` con un único `h1`, una introducción y todas las entradas de ARIA en HTML estático, legibles y enlazables sin JavaScript.

#### Scenario: Acceso directo a la página
- **WHEN** una persona abre `/aria/`
- **THEN** ve el título de la sección, la introducción y el índice de entradas, y la página tiene `lang="es"`

#### Scenario: Sin JavaScript
- **WHEN** la página se carga con JavaScript desactivado
- **THEN** todas las entradas y su código se ven completos, y los enlaces del índice llevan a cada entrada

### Requirement: Atributos y roles cubiertos
La página SHALL incluir una entrada para cada uno de estos atributos o roles: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-pressed`, `aria-checked`, `aria-selected`, `aria-current`, `aria-disabled`, `aria-controls`, `aria-invalid`, `aria-errormessage`, `aria-required`, `aria-live`, `role="status"`, `role="alert"`, `aria-hidden`, `role="dialog"` con `aria-modal`.

#### Scenario: Cobertura completa
- **WHEN** se recorre el índice de la página
- **THEN** aparece una entrada por cada atributo o rol de la lista, cada una con un ancla estable (por ejemplo `/aria/#aria-label`)

### Requirement: Entradas agrupadas por propósito
Las entradas SHALL agruparse por para qué sirven (nombre y descripción, estados de controles, relaciones, formularios, mensajes dinámicos, ocultar contenido, ventanas), y el índice SHALL mostrar esos grupos con encabezados.

#### Scenario: Índice por grupos
- **WHEN** una persona consulta el índice
- **THEN** ve las entradas bajo el encabezado de su grupo, en el mismo orden en que aparecen en la página

### Requirement: Contenido de cada entrada
Cada entrada SHALL incluir: el nombre del atributo o rol en monoespaciada, qué hace en una o dos frases llanas, cuándo usarlo, cuándo no usarlo con la alternativa nativa si existe, y qué anuncia un lector de pantalla.

#### Scenario: Entrada con alternativa nativa
- **WHEN** existe un elemento o atributo HTML que hace lo mismo (por ejemplo `required` frente a `aria-required`, o `<dialog>` frente a `role="dialog"`)
- **THEN** la entrada lo dice de forma explícita y recomienda la opción nativa

#### Scenario: Qué se anuncia
- **WHEN** una persona lee la entrada de `aria-expanded`
- **THEN** encuentra una descripción de lo que anuncia un lector de pantalla (por ejemplo «botón, contraído» / «expandido»), sin afirmar un texto literal de un lector concreto como si fuera universal

### Requirement: Código correcto e incorrecto
Cada entrada SHALL mostrar al menos un bloque de código marcado como «Correcto» y, cuando exista un error frecuente, uno marcado como «Incorrecto», ambos con su lenguaje indicado.

#### Scenario: Error frecuente documentado
- **WHEN** una persona abre la entrada de `aria-hidden`
- **THEN** ve un ejemplo correcto (un icono decorativo oculto) y uno incorrecto (`aria-hidden="true"` sobre un elemento enfocable) con la explicación de por qué falla

#### Scenario: Marcado no solo por color
- **WHEN** se muestra un bloque correcto o incorrecto
- **THEN** su tipo se indica con texto e icono, no solo con color

### Requirement: Ejemplo de uso real
Cada entrada SHALL incluir al menos un ejemplo de uso situado en un caso real de interfaz (un acordeón, un formulario de alta, un carrito…), además del fragmento mínimo.

#### Scenario: Caso real
- **WHEN** una persona lee la entrada de `aria-describedby`
- **THEN** ve un caso concreto, como un campo de contraseña con sus requisitos asociados mediante `aria-describedby`

### Requirement: Demos en vivo accesibles
Las entradas cuyo efecto depende de la interacción (al menos `aria-expanded`, `aria-pressed`, `aria-live`/`role="status"` y `aria-invalid`) SHALL incluir una demo en vivo que funcione con ratón y con teclado y que use el mismo código que se muestra.

#### Scenario: Demo con teclado
- **WHEN** una persona llega con Tab a la demo de `aria-pressed` y pulsa Espacio o Enter
- **THEN** el botón cambia de estado, `aria-pressed` se actualiza y el cambio es visible además de anunciarse

#### Scenario: Demo de mensaje dinámico
- **WHEN** una persona activa la demo de `role="status"`
- **THEN** el mensaje aparece en una región que ya existía en la página antes del cambio, para que se anuncie

### Requirement: Reglas de uso de ARIA
La página SHALL empezar con un bloque que resuma las reglas de uso de ARIA del W3C, empezando por «si existe un elemento HTML nativo, úsalo», y SHALL enlazar a la fuente oficial.

#### Scenario: Primera regla visible
- **WHEN** una persona abre `/aria/`
- **THEN** antes de la primera entrada lee que ARIA cambia lo que se anuncia pero no añade comportamiento, y que el elemento nativo va primero

### Requirement: Enlaces a fuentes y criterios
Cada entrada SHALL enlazar a su definición en la especificación WAI-ARIA del W3C (marcada como «en inglés» con `hreflang="en"`) y a los criterios WCAG 2.2 relacionados del propio sitio.

#### Scenario: Enlaces de una entrada
- **WHEN** una persona termina de leer la entrada de `aria-invalid`
- **THEN** encuentra enlaces al criterio 3.3.1 de la web y a la definición de `aria-invalid` en la especificación del W3C

### Requirement: Enlaces a componentes que lo usan
Cuando un componente de `/componentes/` ya use el atributo o rol, la entrada SHALL enlazar a ese componente en lugar de repetir su código completo.

#### Scenario: Componente relacionado
- **WHEN** una persona lee la entrada de `aria-selected`
- **THEN** ve un enlace a las pestañas de `/componentes/#pestanas`

### Requirement: Acceso desde el resto del sitio
La sección SHALL aparecer en la navegación principal y en el pie con la etiqueta «ARIA», en la portada como tarjeta de «Qué puedes hacer aquí» y en el sitemap.

#### Scenario: Navegación principal
- **WHEN** una persona está en cualquier página
- **THEN** ve «ARIA» en la navegación principal y, si está en `/aria/`, ese enlace tiene `aria-current="page"`

#### Scenario: Sitemap
- **WHEN** se genera `sitemap.xml`
- **THEN** incluye la URL de `/aria/`

### Requirement: Accesibilidad de la propia página
La página SHALL cumplir WCAG 2.2 AA: contraste suficiente en modo claro y oscuro, foco visible, uso completo con teclado, objetivos táctiles de al menos 24×24 px (44×44 px en controles principales), sin scroll horizontal a 320 px y legible con el texto al 200 %.

#### Scenario: Pantalla estrecha
- **WHEN** la página, incluida la cabecera con la nueva sección, se ve a 320 px de ancho
- **THEN** no aparece scroll horizontal en la página; los bloques de código ajustan sus líneas

#### Scenario: Movimiento reducido
- **WHEN** la persona tiene activado `prefers-reduced-motion`
- **THEN** las demos no tienen animaciones ni transiciones
