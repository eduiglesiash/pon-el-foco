# arbol-decision-alt Specification

## Purpose

Guiar a cualquier persona, mediante preguntas sucesivas, hasta saber si una imagen, icono o gráfica necesita texto alternativo y cómo escribirlo, explicando siempre el porqué.

## Requirements

### Requirement: Página de la herramienta
El sitio SHALL publicar en `/alt/` una herramienta con un único `h1`, una introducción sobre el atributo `alt` y el árbol de decisiones, en castellano y con `lang="es"`.

#### Scenario: Abrir la herramienta
- **WHEN** una persona abre `/alt/`
- **THEN** ve el título, la introducción y la primera pregunta del árbol

### Requirement: Árbol de decisiones del W3C
El árbol SHALL seguir el orden del árbol de decisión del W3C para textos alternativos: si la imagen contiene texto, si está en un enlace o botón, si aporta información, si es decorativa y el caso de duda. Cada pregunta SHALL tener respuestas cerradas que llevan a otra pregunta o a una conclusión.

#### Scenario: Recorrido completo hasta una conclusión
- **WHEN** una persona responde «No» a si contiene texto, «No» a si está en un enlace o botón, «No» a si aporta información y «Sí» a si es decorativa
- **THEN** llega a la conclusión «Imagen decorativa: alt vacío»

#### Scenario: Todas las ramas terminan
- **WHEN** se recorre cualquier combinación de respuestas
- **THEN** siempre se llega a una conclusión, sin preguntas sin salida ni ciclos

### Requirement: Conclusiones cubiertas
El árbol SHALL tener al menos estas conclusiones: imagen de texto (el `alt` repite el texto), texto ya presente al lado (`alt=""`), imagen funcional en enlace o botón (el `alt` describe la acción o el destino), icono que acompaña a un texto visible (oculto), imagen informativa sencilla (descripción breve), imagen compleja o gráfica (descripción breve más alternativa larga), imagen redundante con el texto cercano (`alt=""`), imagen decorativa (`alt=""`) y caso dudoso (orientaciones).

#### Scenario: Gráfica
- **WHEN** una persona indica que la imagen aporta información y que es una gráfica o diagrama con datos
- **THEN** la conclusión pide un `alt` breve que diga qué muestra y una alternativa con los datos (tabla o texto) en la página, unida a la imagen

#### Scenario: Icono dentro de un botón
- **WHEN** una persona indica que la imagen es un icono dentro de un botón sin texto visible
- **THEN** la conclusión pide que el nombre describa la acción (por ejemplo «Buscar»), no el dibujo («lupa»)

### Requirement: Contenido de cada conclusión
Cada conclusión SHALL mostrar: la respuesta en una frase (lleva `alt` con texto o `alt=""`), por qué, cómo escribirlo con código correcto e incorrecto para `<img>` y, cuando aplique, para `<svg>` o iconos, y el enlace al criterio 1.1.1.

#### Scenario: Conclusión decorativa
- **WHEN** se muestra la conclusión «Imagen decorativa»
- **THEN** explica que `alt=""` hace que el lector la ignore, que quitar el `alt` no es lo mismo (muchos lectores leen el nombre del archivo) y muestra `<img alt="">` correcto frente a `<img>` sin `alt` incorrecto

### Requirement: Explicación en cada pregunta
Cada pregunta SHALL ir acompañada de una explicación breve de por qué importa y, cuando ayude, de ejemplos de cada respuesta.

#### Scenario: Pregunta sobre texto en la imagen
- **WHEN** se muestra la pregunta «¿La imagen contiene texto?»
- **THEN** se explica que el texto dentro de una imagen no lo lee un lector de pantalla ni se puede ampliar o traducir, con ejemplos (un logotipo con nombre, un cartel, un botón dibujado)

### Requirement: Introducción sobre alt
La página SHALL incluir, siempre visible, una explicación de qué es el `alt`, quién lo usa (lectores de pantalla, imágenes que no cargan, buscadores), la diferencia entre `alt=""` y no poner `alt`, y consejos de redacción (breve, sin «imagen de», sin repetir el texto cercano).

#### Scenario: Diferencia entre alt vacío y ausente
- **WHEN** una persona lee la introducción
- **THEN** encuentra explicado que `alt=""` marca la imagen como decorativa y que sin `alt` el lector puede leer el nombre del archivo

### Requirement: Recorrido de decisiones visible
La herramienta SHALL mostrar las preguntas ya respondidas como pasos del recorrido, en orden, con la pregunta y la respuesta elegida, además de la pregunta o conclusión actual.

#### Scenario: Tras dos respuestas
- **WHEN** una persona ha respondido dos preguntas
- **THEN** ve esas dos preguntas con su respuesta, y debajo la tercera pregunta

### Requirement: Volver atrás y cambiar de rama
La herramienta SHALL permitir en todo momento cambiar la respuesta de cualquier paso anterior, retroceder a la pregunta anterior y empezar de nuevo. Al cambiar una respuesta, los pasos posteriores SHALL descartarse y el árbol SHALL continuar por la nueva rama.

#### Scenario: Cambiar una respuesta anterior
- **WHEN** una persona está en una conclusión y pulsa «Cambiar» en el primer paso
- **THEN** vuelve a la primera pregunta con su respuesta anterior marcada, desaparecen los pasos posteriores y, al elegir otra respuesta, sigue por esa rama

#### Scenario: Botón Atrás del navegador
- **WHEN** una persona pulsa «Atrás» en el navegador después de responder una pregunta
- **THEN** vuelve a la pregunta anterior dentro de la herramienta, sin salir de la página

### Requirement: Conclusiones enlazables
Cada pregunta y cada conclusión SHALL tener una URL propia, y al abrir esa URL la herramienta SHALL mostrar ese punto del árbol con el recorrido que lleva hasta él.

#### Scenario: Compartir una conclusión
- **WHEN** una persona abre `/alt/#c-decorativa`
- **THEN** ve la conclusión «Imagen decorativa» con el recorrido de respuestas que lleva a ella

### Requirement: Funciona sin JavaScript
Sin JavaScript, la herramienta SHALL seguir siendo usable: cada respuesta es un enlace a la siguiente pregunta o conclusión dentro de la página, y todas las preguntas y conclusiones se pueden leer.

#### Scenario: JavaScript desactivado
- **WHEN** la página se carga sin JavaScript y una persona pulsa una respuesta
- **THEN** el navegador lleva a la siguiente pregunta o conclusión y el botón «Atrás» vuelve a la anterior

### Requirement: Foco y anuncios
Al responder, retroceder o cambiar una respuesta, el foco SHALL moverse al encabezado de la nueva pregunta o conclusión, de forma que el lector de pantalla la anuncie y nadie pierda su sitio.

#### Scenario: Avanzar con teclado
- **WHEN** una persona activa una respuesta con Enter
- **THEN** el foco pasa al encabezado de la siguiente pregunta y el lector la lee

### Requirement: Accesibilidad de la herramienta
La herramienta SHALL cumplir WCAG 2.2 AA: uso completo con teclado, foco visible, objetivos de al menos 44×44 px en las respuestas y botones, contraste en modo claro y oscuro, sin scroll horizontal a 320 px, legible con el texto al 200 % y sin animaciones con `prefers-reduced-motion`.

#### Scenario: Pantalla estrecha
- **WHEN** la herramienta se usa a 320 px de ancho
- **THEN** no hay scroll horizontal y el recorrido, las respuestas y el código se leen completos

### Requirement: Acceso desde el resto del sitio
La herramienta SHALL enlazarse desde la portada, la página del criterio 1.1.1, el componente «Imagen con alternativa», la entrada `aria-hidden` de `/aria/` y el sitemap.

#### Scenario: Desde el criterio 1.1.1
- **WHEN** una persona lee `/criterios/1-1-1/`
- **THEN** encuentra un enlace a la herramienta «¿Qué alt le pongo?»
