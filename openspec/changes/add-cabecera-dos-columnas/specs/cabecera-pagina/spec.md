## ADDED Requirements

### Requirement: Bloque lateral opcional
`PageHead` SHALL aceptar un bloque opcional en el slot `aside`. Sin ese slot, la cabecera SHALL renderizarse igual que antes de este cambio.

#### Scenario: Página sin bloque lateral
- **WHEN** una página usa `PageHead` sin el slot `aside` (por ejemplo, `/criterios/`)
- **THEN** su cabecera se ve igual que antes del cambio

### Requirement: Dos columnas en pantallas anchas
Desde 1024 px de ancho de ventana, una cabecera con bloque lateral SHALL mostrar dos columnas: a la izquierda el `h1` y la introducción, y a la derecha el bloque. Las dos columnas SHALL empezar a la misma altura. El reparto SHALL ser uno de estos dos, elegido por cada página:
- **mitad:** 50 % para el título y 50 % para el bloque
- **bloque ancho:** 30 % para el título y 70 % para el bloque

Los porcentajes se calculan sobre el ancho disponible después de restar el hueco entre columnas.

#### Scenario: Componentes en escritorio (mitad)
- **WHEN** una persona abre `/componentes/` en una ventana de 1280 px
- **THEN** «La regla de oro» aparece a la derecha de «Componentes accesibles, con código», con su borde superior a la misma altura que el título, y las dos columnas tienen el mismo ancho (±1 px)

#### Scenario: ARIA en escritorio (bloque ancho)
- **WHEN** una persona abre `/aria/` en una ventana de 1280 px
- **THEN** «Antes de usar ARIA» aparece a la derecha de «WAI-ARIA, bien usado», alineado arriba, y la columna del título mide 3/7 de la del bloque (±1 px)

#### Scenario: Alt en escritorio (bloque ancho)
- **WHEN** una persona abre `/alt/` en una ventana de 1280 px
- **THEN** «Qué es el alt» aparece a la derecha de «¿Qué alt le pongo?», alineado arriba, y la columna del título mide 3/7 de la del bloque (±1 px)

### Requirement: El título cabe en su columna
En la columna del 30 %, el `h1` SHALL caber sin desbordar ni cortar palabras, desde 1024 px y con el texto al 100 % y al 200 %. Si la palabra más larga del título no cabe en el 30 % (por ejemplo, con el texto ampliado), la columna del título SHALL ensancharse lo justo para que quepa, quitando ese espacio a la columna del bloque. No se reduce el tamaño de letra.

#### Scenario: Palabra larga en el título
- **WHEN** una persona abre `/aria/` en una ventana de 1024 px
- **THEN** «WAI-ARIA,» se ve dentro de su columna (puede partirse por el guion, «WAI-» y «ARIA,»), sin invadir el bloque y sin scroll horizontal

#### Scenario: Texto al 200 % con bloque ancho
- **WHEN** una persona amplía el texto al 200 % en `/aria/` a 1280 px
- **THEN** la columna del título se ensancha lo necesario para que «ARIA,» quepa entera, y el bloque ocupa el resto sin solaparse

### Requirement: Una columna en pantallas estrechas
Por debajo de 1024 px, la cabecera SHALL mostrar el `h1`, la introducción y el bloque uno debajo de otro, en ese orden y a todo el ancho del contenedor, como antes del cambio.

#### Scenario: Móvil
- **WHEN** una persona abre `/aria/` a 320 px
- **THEN** ve el título, la introducción y «Antes de usar ARIA» apilados, sin scroll horizontal

### Requirement: Orden de lectura y foco
El orden del HTML SHALL ser `h1`, introducción y bloque, de modo que el orden de lectura y de tabulación coincida con el visual (WCAG 1.3.2 y 2.4.3) en todos los anchos.

#### Scenario: Lector de pantalla
- **WHEN** una persona recorre `/componentes/` con un lector de pantalla desde el principio del contenido
- **THEN** oye el `h1` y la introducción antes del `h2` «La regla de oro»

### Requirement: Texto ampliado
Con el texto al 200 %, el contenido de la cabecera SHALL seguir leyéndose completo, sin cortes ni solapes entre columnas y sin scroll horizontal provocado por la cabecera.

#### Scenario: Texto al 200 % en escritorio
- **WHEN** una persona amplía el texto al 200 % en una ventana de 1280 px
- **THEN** el título, la introducción y el bloque se leen completos y no se solapan
