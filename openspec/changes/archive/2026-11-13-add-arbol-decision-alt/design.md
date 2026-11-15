# Design

## Context

- El comprobador de `/me-afecta/` (`src/components/Comprobador.astro`) ya resuelve un flujo de preguntas con un recorrido visible: lista `ol.route` con pasos `.route-stop` y `data-state` (`done`, `current`, `pending`, `skipped`), marcador numerado, «Tu respuesta: …» y un botón «Cambiar». Sus estilos (`.route-*`) están en `src/styles/global.css`. Ese comprobador tiene tres preguntas fijas con radios. Aquí el recorrido depende de las respuestas y llega a 9 conclusiones distintas.
- `CodeExample.astro` pinta código «Correcto» e «Incorrecto». El tipo `Codigo` de `componentes.ts` ya admite `tone`.
- Las páginas de criterio se generan desde `criterios.ts` y `ejemplos.ts` en `src/pages/criterios/[id].astro`.
- Motivación y alcance: `proposal.md`. Requisitos: `specs/arbol-decision-alt/spec.md`.

## Goals / Non-Goals

**Goals:**
- El árbol es un dato (`src/data/arbol-alt.ts`). Cambiar una pregunta o añadir una rama no toca la plantilla ni el script.
- Funciona sin JavaScript. Con JavaScript, muestra solo el recorrido y el punto actual.
- Una URL por punto del árbol, con el historial del navegador como mecanismo de «Atrás».

**Non-Goals:**
- No se guarda el progreso entre visitas (ni `localStorage`): la URL ya conserva el punto.
- No se extrae un componente genérico de árbol para el comprobador de `/me-afecta/`. Se reutilizan sus estilos, no su script.
- No hay contador de pasos («Pregunta 2 de 4»): la profundidad depende de la rama.

## Decisions

### 1. Árbol estricto: cada nodo tiene un solo padre
Cada pregunta y cada conclusión aparece en un único sitio del árbol. Así el recorrido hasta cualquier nodo se deduce de su id, y la URL solo necesita el nodo (`/alt/#c-decorativa`), no la ruta completa.
- Dos conclusiones con el mismo consejo (por ejemplo, las varias formas de llegar a `alt=""`) son nodos distintos con su propio texto, porque el motivo cambia según la rama. El código de ejemplo común se comparte como constante.
- **Alternativa descartada:** un grafo con conclusiones compartidas. El recorrido sería ambiguo y la URL tendría que guardar la ruta entera (`#texto=no&enlace=no…`), lo que complica la navegación sin JS.

### 2. Estructura del árbol
Basada en el árbol del W3C «An alt Decision Tree» (https://www.w3.org/WAI/tutorials/images/decision-tree/, actualizado el 13/05/2024, consultado el 13/11/2026). Sigue sus cinco preguntas en el mismo orden. Una diferencia deliberada: el W3C pregunta en una sola frase «¿está en un enlace o botón y costaría entender qué hace sin la imagen?». Aquí se divide en dos preguntas más sencillas (¿está en un enlace o botón? y ¿tiene además texto visible?), y el resultado es el mismo: con texto visible, la imagen es redundante y lleva `alt=""`, que es lo que el W3C resuelve en su pregunta 3.

```
p-texto  ¿La imagen contiene texto?
├─ Sí → p-texto-uso  ¿Qué papel tiene ese texto?
│   ├─ El mismo texto está escrito al lado como texto real → c-texto-repetido      alt=""
│   ├─ Es solo un efecto visual, sin significado          → c-texto-decorativo    alt=""
│   ├─ Está en un enlace o botón y dice lo que hace       → c-texto-funcion       alt = la acción
│   └─ Ninguna de las anteriores (logotipo, cartel…)      → c-texto-imagen        alt = el mismo texto
└─ No → p-enlace  ¿Está dentro de un enlace o un botón?
    ├─ Sí → p-enlace-texto  ¿El enlace o botón tiene además texto visible?
    │   ├─ Sí → c-icono-con-texto     alt="" (o aria-hidden en el svg)
    │   └─ No → c-funcional           alt = destino o acción, no el dibujo
    └─ No → p-info  ¿Aporta información que no está ya en el texto?
        ├─ Sí → p-info-tipo  ¿Qué tipo de imagen es?
        │   ├─ Foto, ilustración o icono con significado → c-informativa  descripción breve
        │   └─ Gráfica, diagrama, mapa o infografía      → c-compleja     alt breve + datos en la página
        ├─ No, repite lo que dice el texto → c-redundante   alt=""
        └─ No aporta nada → p-decorativa  ¿Es decoración o algo que no es para el usuario?
            ├─ Sí → c-decorativa  alt=""
            └─ No lo tengo claro → c-duda  orientaciones
```
Son 7 preguntas y 11 conclusiones; la spec exige al menos 9 tipos.

### 3. Modelo de datos (`src/data/arbol-alt.ts`)
```ts
type Nodo =
  | { id: string; tipo: "pregunta"; titulo: string; explicacion: string; ejemplos?: string[];
      respuestas: { texto: string; ayuda?: string; siguiente: string }[] }
  | { id: string; tipo: "conclusion"; titulo: string; veredicto: "texto" | "vacio" | "depende";
      resumen: string; porque: string[]; codigo: Codigo[]; nota?: string };
export const RAIZ = "p-texto";
export const NODOS: Record<string, Nodo>;
export function padres(): Map<string, { id: string; respuesta: number }>; // para reconstruir el recorrido
```
**Validación en la build:** en el frontmatter de la página se comprueba que cada `siguiente` exista, que cada nodo tenga como mucho un padre, que todos sean alcanzables desde `RAIZ` y que no haya ciclos. Si algo falla, la build se detiene (como en `AriaEntry`). Esto cubre de forma automática el escenario «Todas las ramas terminan».

### 4. HTML estático completo y mejora progresiva
- El servidor pinta **todos** los nodos como `<section id="p-…|c-…">`, cada uno con un `h2` enfocable (`tabindex="-1"`). Las respuestas son **enlaces** `<a href="#siguiente">`, no radios: cambian de punto y de URL, así que son navegación.
- **Sin JS:** todo se ve y las anclas llevan a cada punto. El «Atrás» del navegador funciona solo.
- **Con JS** (`src/scripts/arbol-alt.js`): lee `location.hash` (o `RAIZ`), reconstruye el recorrido con el mapa de padres, que se pasa al cliente como JSON en un `<script type="application/json">`, y pinta el recorrido (`ol.route`, con un paso por cada pregunta respondida: pregunta, «Tu respuesta: …» y «Cambiar»). Oculta con `hidden` todo lo que no es el punto actual. Escucha `hashchange` y vuelve a pintar.
- **Navegación:** responder, «Cambiar», «Pregunta anterior» y «Empezar de nuevo» son enlaces a hashes, así que cada paso crea una entrada en el historial y el «Atrás» del navegador retrocede. Al volver a una pregunta, la respuesta que se había elegido se marca como «Tu respuesta anterior», con texto y no solo con estilo.
- **Foco:** en cada `hashchange` provocado por la herramienta, se enfoca el `h2` del nuevo punto. En la carga inicial no se mueve el foco.
- **Alternativa descartada:** un estado solo en memoria con `pushState` y botones. Rompería el uso sin JS y obligaría a sincronizar el historial a mano.

### 5. Presentación
- El recorrido reutiliza `.route`, `.route-stop`, `.route-marker`, `.route-q` y `.route-change`.
- Las respuestas usan el aspecto de `.route-option` aplicado a enlaces, a ancho completo y con `min-h-11`.
- Conclusiones: una caja `bg-sign` con el veredicto en texto y forma («Lleva alt con texto» / «alt vacío» / «Depende»), sin depender del color, como el veredicto del comprobador. Debajo, «Por qué», los `CodeExample` y el enlace al criterio 1.1.1.
- **Explicación de cada pregunta:** un párrafo, más ejemplos en una lista, visibles debajo del `h2` (sin desplegar, para que no se pierda).
- **Introducción sobre `alt`:** una sección fija antes de la herramienta, con qué es, quién lo usa, `alt=""` frente a sin `alt` y consejos de redacción.

### 6. Integración
- La página es `src/pages/alt.astro`, fuera de `SECCIONES`.
- **Portada:** una línea de enlace destacada bajo «Qué puedes hacer aquí» o una tarjeta (se decide en la tarea 5.1 viendo el equilibrio visual; la spec solo exige el enlace).
- **Criterio 1.1.1:** un aviso con enlace en `[id].astro` cuando `c.id === "1.1.1"`, o un campo opcional `herramienta` en `Criterio`. Se elige el campo opcional si no complica el tipo.
- **Otros enlaces:** una `nota` en el componente `imagen`, una línea en `cuando`/`cuandoNo` de `aria-hidden` en `aria.ts`, `RUTAS` del sitemap y el README.

## Risks / Trade-offs

- [Contenido que simplifica en exceso casos reales] → La conclusión `c-duda` remite al tutorial del W3C, y cada conclusión dice qué hacer si el caso no encaja («Si la imagen además…»).
- [Árbol duplicado entre HTML y JSON del cliente] → Las dos salidas se generan del mismo `NODOS` en la build. El cliente solo recibe el mapa de padres y los textos de las respuestas.
- [Página larga sin JS] → Es aceptable: es la situación de respaldo, y cada sección lleva un enlace «Volver a la primera pregunta».
- [Hash que no existe en la URL] → Se trata como `RAIZ` sin error.
- [Foco en cada cambio] → Solo tras una acción de la persona; nunca en la carga, para no saltar al abrir un enlace compartido.

## Migration Plan

Es una página nueva, sin migración. Para deshacerlo basta con revertir el commit.

## Open Questions

- ¿La herramienta irá algún día en la navegación principal? Si es así, cuando haya más herramientas se puede plantear una sección «Herramientas». No cambia esta implementación.
