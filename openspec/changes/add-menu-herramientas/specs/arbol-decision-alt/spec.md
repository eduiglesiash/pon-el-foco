## MODIFIED Requirements

### Requirement: Acceso desde el resto del sitio
La herramienta SHALL enlazarse desde el menú principal (entrada «Herramientas»), el pie de página, la portada, la página del criterio 1.1.1, el componente «Imagen con alternativa», la entrada `aria-hidden` de `/aria/` y el sitemap.

#### Scenario: Desde el criterio 1.1.1
- **WHEN** una persona lee `/criterios/1-1-1/`
- **THEN** encuentra un enlace a la herramienta «¿Qué alt le pongo?»

#### Scenario: Desde el menú principal
- **WHEN** una persona está en cualquier página y abre «Herramientas» en la cabecera
- **THEN** encuentra el enlace «¿Qué alt le pongo?» a `/alt/`
