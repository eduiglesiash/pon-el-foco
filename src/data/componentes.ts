/** Contenido de la página de componentes: elementos HTML nativos y componentes a medida. */
import interruptorJs from "../scripts/interruptor.js?raw";
import pestanasJs from "../scripts/pestanas.js?raw";
import menuJs from "../scripts/menu.js?raw";
import autocompletarJs from "../scripts/autocompletar.js?raw";
import carruselJs from "../scripts/carrusel.js?raw";
import avisoJs from "../scripts/aviso.js?raw";
import type { Lang } from "./ejemplos";

export interface Codigo {
  lang: Lang;
  code: string;
  /** Etiqueta del bloque; por defecto, el lenguaje */
  label?: string;
  /** Valoración del bloque: correcto o incorrecto (se pinta con texto e icono) */
  tone?: "bien" | "mal";
  /** Vista previa propia de este bloque (cuando el componente enseña varias versiones); "same" reutiliza el código */
  demo?: string;
}

/** Para qué sirve cada componente; ordena el catálogo y deja sitio para crecer */
export const CATEGORIAS = [
  "Acciones",
  "Formularios",
  "Navegación",
  "Contenido",
  "Avisos y estado",
  "Qué no hacer",
] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export interface Componente {
  id: string;
  categoria: Categoria;
  nombre: string;
  /** Elemento o patrón, mostrado en monoespaciada */
  elemento: string;
  intro: string;
  /** Nativos: lo que da el navegador sin escribir nada. A medida: lo que tienes que añadir tú. */
  claves: string[];
  /** [tecla, qué hace] */
  teclado?: [string, string][];
  codigo: Codigo[];
  /** HTML de la vista previa en vivo; "same" reutiliza el primer bloque de código. Sin demo, no se muestra. */
  demo?: string;
  nota?: string;
  /** Enlace a una herramienta o página del sitio relacionada */
  enlace?: { href: string; texto: string };
  /** Criterios WCAG relacionados */
  criterios: string[];
  /** Patrón en la guía de prácticas de ARIA del W3C */
  apg?: string;
}

const APG = "https://www.w3.org/WAI/ARIA/apg/patterns/";

export const NATIVOS: Componente[] = [
  {
    id: "boton",
    categoria: "Acciones",
    nombre: "Botón",
    elemento: "<button>",
    intro: "Para cualquier acción dentro de la página: enviar, abrir, guardar, cerrar.",
    claves: [
      "Se anuncia como «botón» con su texto como nombre.",
      "Se enfoca con Tab y se activa con Enter y con Espacio.",
      "Con disabled sale del orden de foco y se anuncia como no disponible.",
      "Dentro de un formulario, type=\"submit\" lo envía sin JavaScript.",
    ],
    teclado: [
      ["Tab", "Llega al botón"],
      ["Enter o Espacio", "Lo activa"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<button type="button">Guardar borrador</button>
<button type="submit">Enviar solicitud</button>`,
      },
    ],
    demo: `
<button type="button" data-demo-msg="Borrador guardado.">Guardar borrador</button>
<p role="status" class="mt-2 text-muted"></p>`,
    nota: "Pon siempre type=\"button\" si no envía un formulario: el valor por defecto es submit.",
    criterios: ["2.1.1", "4.1.2"],
  },
  {
    id: "enlace",
    categoria: "Navegación",
    nombre: "Enlace",
    elemento: "<a href>",
    intro: "Para ir a otra página o a otra parte de la misma. Si no navega, es un botón.",
    claves: [
      "Se anuncia como «enlace» y aparece en la lista de enlaces del lector de pantalla.",
      "Se activa con Enter.",
      "Se puede abrir en otra pestaña, copiar o guardar desde el menú contextual.",
      "Sin href no es un enlace: no se enfoca ni se anuncia como tal.",
    ],
    teclado: [
      ["Tab", "Llega al enlace"],
      ["Enter", "Lo sigue"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<a href="/criterios/">Ver los criterios WCAG</a>

<!-- Si descarga un archivo, dilo en el texto -->
<a href="/guia.pdf">Guía de accesibilidad (PDF, 1,2 MB)</a>`,
      },
    ],
    demo: `<a href="/criterios/">Ver los criterios WCAG</a>`,
    nota: "¿Lleva a otro sitio? Enlace. ¿Hace algo aquí? Botón. Mezclarlos confunde a quien usa lector de pantalla, porque espera un comportamiento distinto.",
    criterios: ["2.4.4", "4.1.2"],
  },
  {
    id: "campo",
    categoria: "Formularios",
    nombre: "Campo de texto con etiqueta",
    elemento: "<label> + <input>",
    intro: "Todo campo necesita una etiqueta visible unida al campo con for e id.",
    claves: [
      "La etiqueta es el nombre accesible del campo.",
      "Pulsar la etiqueta enfoca el campo: el área para tocar es más grande.",
      "type=\"email\" o inputmode muestran el teclado adecuado en el móvil.",
      "required y aria-invalid se anuncian; aria-describedby añade la ayuda.",
    ],
    teclado: [["Tab", "Llega al campo; el lector lee etiqueta, tipo y ayuda"]],
    codigo: [
      {
        lang: "html",
        code: `
<label for="demo-email">Correo electrónico</label>
<p id="demo-email-ayuda">Te enviaremos la confirmación aquí.</p>
<input id="demo-email" type="email" autocomplete="email"
  aria-describedby="demo-email-ayuda" required>`,
      },
    ],
    demo: `
<label for="demo-email">Correo electrónico</label>
<p id="demo-email-ayuda" class="text-[.93rem] text-muted">Te enviaremos la confirmación aquí.</p>
<input id="demo-email" type="email" autocomplete="email" aria-describedby="demo-email-ayuda" required>`,
    criterios: ["1.3.1", "1.3.5", "3.3.2"],
  },
  {
    id: "grupo",
    categoria: "Formularios",
    nombre: "Grupo de opciones",
    elemento: "<fieldset> + <legend>",
    intro: "Para agrupar opciones relacionadas, como botones de opción o casillas.",
    claves: [
      "Al entrar en el grupo, el lector anuncia la pregunta (la legend).",
      "Tab entra y sale del grupo de una vez; las flechas cambian de opción.",
      "Cada opción anuncia si está marcada y su posición («2 de 3»).",
    ],
    teclado: [
      ["Tab", "Entra en el grupo, en la opción marcada"],
      ["Flechas", "Cambian de opción"],
      ["Espacio", "Marca la opción enfocada"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<fieldset>
  <legend>Tipo de entrega</legend>
  <label><input type="radio" name="demo-entrega" value="domicilio" checked> A domicilio</label>
  <label><input type="radio" name="demo-entrega" value="tienda"> Recoger en tienda</label>
  <label><input type="radio" name="demo-entrega" value="punto"> Punto de recogida</label>
</fieldset>`,
      },
    ],
    demo: "same",
    criterios: ["1.3.1", "3.3.2"],
  },
  {
    id: "select",
    categoria: "Formularios",
    nombre: "Lista desplegable",
    elemento: "<select>",
    intro: "Para elegir una opción de una lista. En el móvil usa el selector del sistema operativo.",
    claves: [
      "Se anuncia con su etiqueta, la opción elegida y cuántas hay.",
      "Se maneja con flechas y saltando a la primera letra.",
      "Funciona con lectores de pantalla, control por voz y teclados de cualquier sistema.",
    ],
    teclado: [
      ["Flechas", "Cambian de opción"],
      ["Una letra", "Salta a la opción que empieza por ella"],
      ["Alt + ↓ o Espacio", "Abre la lista (según navegador)"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<label for="demo-provincia">Provincia</label>
<select id="demo-provincia" name="provincia" autocomplete="address-level2">
  <option value="">Elige una provincia</option>
  <option>Álava</option>
  <option>Albacete</option>
  <option>Alicante</option>
</select>`,
      },
    ],
    demo: "same",
    nota: "Antes de construir un desplegable a medida, prueba a dar estilo al select. Con appearance: base-select (ya disponible en Chrome y Edge) se puede personalizar casi por completo.",
    criterios: ["1.3.1", "3.2.2", "4.1.2"],
  },
  {
    id: "details",
    categoria: "Contenido",
    nombre: "Desplegable o acordeón",
    elemento: "<details> + <summary>",
    intro: "Para mostrar y ocultar contenido, como preguntas frecuentes. Sin una línea de JavaScript.",
    claves: [
      "El summary se anuncia como un control con estado «contraído» o «expandido».",
      "Se abre y se cierra con Enter o Espacio.",
      "Con el mismo atributo name en varios details, solo uno queda abierto a la vez.",
    ],
    teclado: [
      ["Tab", "Llega al summary"],
      ["Enter o Espacio", "Abre o cierra"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<details name="demo-faq">
  <summary>¿Cuánto tarda el envío?</summary>
  <p>Entre 24 y 48 horas en la península.</p>
</details>
<details name="demo-faq">
  <summary>¿Puedo devolver un pedido?</summary>
  <p>Sí, durante 30 días desde la entrega.</p>
</details>`,
      },
    ],
    demo: "same",
    criterios: ["4.1.2", "2.1.1"],
  },
  {
    id: "dialog",
    categoria: "Avisos y estado",
    nombre: "Ventana modal",
    elemento: "<dialog>",
    intro: "Para pedir atención o confirmar algo sin salir de la página. Ábrela con showModal().",
    claves: [
      "Mueve el foco dentro de la ventana y no deja que salga mientras está abierta.",
      "Esc la cierra.",
      "El resto de la página queda inerte: no se puede enfocar ni leer.",
      "Al cerrarse, el foco vuelve al botón que la abrió.",
    ],
    teclado: [
      ["Tab", "Recorre solo los controles de la ventana"],
      ["Esc", "Cierra la ventana"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<button type="button" id="demo-abrir">Ver condiciones de envío</button>

<dialog id="demo-dialogo" aria-labelledby="demo-dialogo-titulo">
  <h2 id="demo-dialogo-titulo">Condiciones de envío</h2>
  <p>Envío gratis a partir de 50 €. Devoluciones en 30 días.</p>
  <form method="dialog">
    <button>Cerrar</button>
  </form>
</dialog>

<script>
  const dialogo = document.getElementById("demo-dialogo");
  document.getElementById("demo-abrir").addEventListener("click", () => dialogo.showModal());
</script>`,
      },
    ],
    demo: `
<button type="button" id="demo-abrir">Ver condiciones de envío</button>
<dialog id="demo-dialogo" aria-labelledby="demo-dialogo-titulo">
  <h2 id="demo-dialogo-titulo">Condiciones de envío</h2>
  <p>Envío gratis a partir de 50 €. Devoluciones en 30 días.</p>
  <form method="dialog" class="mt-4">
    <button>Cerrar</button>
  </form>
</dialog>`,
    criterios: ["2.1.2", "2.4.3", "4.1.2"],
  },
  {
    id: "tabla",
    categoria: "Contenido",
    nombre: "Tabla de datos",
    elemento: "<table> + <th>",
    intro: "Para datos con filas y columnas. Nunca para maquetar.",
    claves: [
      "El lector anuncia cuántas filas y columnas tiene y lee el título (caption).",
      "Al moverse por las celdas, lee el encabezado de la fila y de la columna.",
      "scope indica si un th encabeza una columna o una fila.",
    ],
    teclado: [["Atajos del lector", "Mueven celda a celda (por ejemplo, Ctrl + Alt + flechas en NVDA)"]],
    codigo: [
      {
        lang: "html",
        code: `
<table>
  <caption>Multas según la gravedad</caption>
  <thead>
    <tr><th scope="col">Infracción</th><th scope="col">Multa</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Leve</th><td>301 € a 30.000 €</td></tr>
    <tr><th scope="row">Grave</th><td>30.001 € a 90.000 €</td></tr>
    <tr><th scope="row">Muy grave</th><td>90.001 € a 1.000.000 €</td></tr>
  </tbody>
</table>`,
      },
    ],
    demo: "same",
    criterios: ["1.3.1"],
  },
  {
    id: "regiones",
    categoria: "Navegación",
    nombre: "Regiones de la página",
    elemento: "<header> <nav> <main> <footer>",
    intro: "Dividen la página en zonas a las que se puede saltar directamente.",
    claves: [
      "Los lectores de pantalla listan las regiones y saltan entre ellas (tecla D en NVDA, rotor en VoiceOver).",
      "Si hay varias nav, aria-label las distingue: «Principal», «Pie de página».",
      "search marca la zona del buscador.",
      "Solo debe haber un main visible por página.",
    ],
    codigo: [
      {
        lang: "html",
        code: `
<body>
  <a href="#contenido">Saltar al contenido</a>
  <header>
    <search>…buscador…</search>
  </header>
  <nav aria-label="Principal">…</nav>
  <main id="contenido">
    <h1>Título de la página</h1>
  </main>
  <footer>…</footer>
</body>`,
      },
    ],
    demo: `
<p class="sr-only">Esquema visual de las regiones; no se reproducen de verdad para no duplicar las de esta página.</p>
<div class="esquema-regiones" aria-hidden="true">
  <span class="r-skip">Saltar al contenido</span>
  <span class="r-header">header · search</span>
  <span class="r-nav">nav «Principal»</span>
  <span class="r-main">main · h1</span>
  <span class="r-footer">footer</span>
</div>`,
    criterios: ["1.3.1", "2.4.1"],
  },
  {
    id: "imagen",
    categoria: "Contenido",
    nombre: "Imagen con alternativa",
    elemento: "<img alt> + <figure>",
    intro: "El alt es lo que se lee en lugar de la imagen. figcaption añade un pie visible para todo el mundo.",
    claves: [
      "Se anuncia como imagen y lee el alt.",
      "Con alt=\"\" el lector la ignora (decorativa).",
      "Sin alt, muchos lectores leen el nombre del archivo.",
    ],
    codigo: [
      {
        lang: "html",
        code: `
<figure>
  <img src="ventas.png" alt="Las ventas online crecieron un 30 % entre 2024 y 2026.">
  <figcaption>Evolución de las ventas online, 2024 a 2026.</figcaption>
</figure>

<img src="separador.svg" alt="">`,
      },
    ],
    demo: `
<figure>
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23f1f3f8'/%3E%3Crect x='30' y='60' width='40' height='45' rx='4' fill='%231d5bd8'/%3E%3Crect x='100' y='48' width='40' height='57' rx='4' fill='%231d5bd8'/%3E%3Crect x='170' y='30' width='40' height='75' rx='4' fill='%23e3122d'/%3E%3Cpath d='M20 105h200' stroke='%2314161c' stroke-width='2'/%3E%3C/svg%3E" width="240" height="120" alt="Las ventas online crecieron un 30 % entre 2024 y 2026.">
  <figcaption>Evolución de las ventas online, 2024 a 2026 (datos de ejemplo).</figcaption>
</figure>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 12'%3E%3Cpath d='M4 6c40-6 80 6 116 0s76-6 116 0' fill='none' stroke='%23ffc21a' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E" width="240" height="12" alt="">`,
    enlace: { href: "/alt/", texto: "¿Dudas con una imagen concreta? Usa la herramienta «¿Qué alt le pongo?»" },
    criterios: ["1.1.1"],
  },
  {
    id: "progreso",
    categoria: "Avisos y estado",
    nombre: "Progreso y medidores",
    elemento: "<progress> <meter>",
    intro: "Para mostrar el avance de una tarea o un valor dentro de un rango.",
    claves: [
      "El lector anuncia el valor (por ejemplo, «60 %»).",
      "La etiqueta les da nombre como a cualquier campo.",
      "No necesitan ARIA ni JavaScript para ser accesibles.",
    ],
    codigo: [
      {
        lang: "html",
        code: `
<label for="demo-subida">Subiendo documento</label>
<progress id="demo-subida" max="100" value="60">60 %</progress>

<label for="demo-fuerza">Seguridad de la contraseña</label>
<meter id="demo-fuerza" min="0" max="4" low="2" high="3" optimum="4" value="3">Buena</meter>`,
      },
    ],
    demo: "same",
    criterios: ["1.3.1", "4.1.2"],
  },
];

export const A_MEDIDA: Componente[] = [
  {
    id: "interruptor",
    categoria: "Acciones",
    nombre: "Interruptor",
    elemento: 'role="switch"',
    intro:
      "El clásico «encendido / apagado» de los ajustes. Una casilla (input type=\"checkbox\") con estilos ya es accesible; si el diseño lo pide como botón, usa role=\"switch\".",
    claves: [
      "role=\"switch\": se anuncia como interruptor.",
      "aria-checked=\"true\" o \"false\": el estado actual.",
      "El texto del botón es su nombre; el dibujo del interruptor va con aria-hidden.",
      "Dibuja el estado a partir de aria-checked: así lo que se ve y lo que se anuncia nunca se separan.",
    ],
    teclado: [
      ["Tab", "Llega al interruptor"],
      ["Espacio o Enter", "Cambia el estado"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<button type="button" role="switch" aria-checked="false" class="switch">
  <span class="switch-track" aria-hidden="true"></span>
  Recibir avisos por correo
</button>`,
      },
      { lang: "js", code: interruptorJs },
      {
        lang: "css",
        code: `
/* El estado visual sale del atributo ARIA */
.switch[aria-checked="true"] .switch-track { background: var(--accent); }
.switch[aria-checked="true"] .switch-track::after { transform: translateX(1.25rem); }`,
      },
    ],
    demo: `
<button type="button" role="switch" aria-checked="false" class="switch">
  <span class="switch-track" aria-hidden="true"></span>
  Recibir avisos por correo
</button>`,
    criterios: ["4.1.2", "1.4.1", "1.4.11"],
    apg: APG + "switch/",
  },
  {
    id: "pestanas",
    categoria: "Navegación",
    nombre: "Pestañas",
    elemento: 'role="tablist"',
    intro: "Varias vistas en el mismo espacio. No hay elemento nativo, así que ARIA y un poco de JavaScript.",
    claves: [
      "role=\"tablist\" agrupa las pestañas; aria-label le da nombre.",
      "Cada pestaña es un button con role=\"tab\", aria-selected y aria-controls.",
      "Solo la pestaña activa recibe Tab (tabindex=\"-1\" en las demás); las flechas mueven entre ellas.",
      "Cada panel tiene role=\"tabpanel\" y aria-labelledby con su pestaña.",
    ],
    teclado: [
      ["Tab", "Entra en la pestaña activa; otro Tab va al panel"],
      ["← →", "Pestaña anterior o siguiente"],
      ["Inicio / Fin", "Primera o última pestaña"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<div class="tabs">
  <div role="tablist" aria-label="Información del producto">
    <button type="button" role="tab" id="tab-desc" aria-selected="true" aria-controls="panel-desc">Descripción</button>
    <button type="button" role="tab" id="tab-tallas" aria-selected="false" aria-controls="panel-tallas" tabindex="-1">Tallas</button>
    <button type="button" role="tab" id="tab-envio" aria-selected="false" aria-controls="panel-envio" tabindex="-1">Envío</button>
  </div>
  <div role="tabpanel" id="panel-desc" aria-labelledby="tab-desc" tabindex="0">…</div>
  <div role="tabpanel" id="panel-tallas" aria-labelledby="tab-tallas" tabindex="0" hidden>…</div>
  <div role="tabpanel" id="panel-envio" aria-labelledby="tab-envio" tabindex="0" hidden>…</div>
</div>`,
      },
      { lang: "js", code: pestanasJs },
    ],
    demo: `
<div class="tabs">
  <div role="tablist" aria-label="Información del producto">
    <button type="button" role="tab" id="tab-desc" aria-selected="true" aria-controls="panel-desc">Descripción</button>
    <button type="button" role="tab" id="tab-tallas" aria-selected="false" aria-controls="panel-tallas" tabindex="-1">Tallas</button>
    <button type="button" role="tab" id="tab-envio" aria-selected="false" aria-controls="panel-envio" tabindex="-1">Envío</button>
  </div>
  <div role="tabpanel" id="panel-desc" aria-labelledby="tab-desc" tabindex="0">Zapatillas de trail con suela de agarre y malla transpirable.</div>
  <div role="tabpanel" id="panel-tallas" aria-labelledby="tab-tallas" tabindex="0" hidden>Disponibles de la 36 a la 47.</div>
  <div role="tabpanel" id="panel-envio" aria-labelledby="tab-envio" tabindex="0" hidden>Envío gratis en 24 a 48 horas.</div>
</div>`,
    criterios: ["4.1.2", "2.1.1", "1.3.1"],
    apg: APG + "tabs/",
  },
  {
    id: "menu",
    categoria: "Navegación",
    nombre: "Menú desplegable de navegación",
    elemento: "aria-expanded",
    intro:
      "Un botón que muestra y oculta una lista de enlaces. Es un patrón «disclosure»: no uses role=\"menu\", que es para menús de aplicación (como Archivo o Editar) y obliga a navegar con flechas.",
    claves: [
      "Un button con aria-expanded indica si la lista está abierta.",
      "aria-controls apunta a la lista que muestra.",
      "Esc cierra y devuelve el foco al botón.",
      "Los enlaces siguen siendo enlaces normales: se recorren con Tab.",
    ],
    teclado: [
      ["Enter o Espacio", "Abre o cierra la lista"],
      ["Tab", "Recorre los enlaces"],
      ["Esc", "Cierra y vuelve al botón"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<nav aria-label="Principal">
  <button type="button" aria-expanded="false" aria-controls="menu-servicios">Servicios</button>
  <ul id="menu-servicios" hidden>
    <li><a href="/auditorias">Auditorías</a></li>
    <li><a href="/formacion">Formación</a></li>
  </ul>
</nav>`,
      },
      { lang: "js", code: menuJs },
    ],
    demo: `
<nav aria-label="Ejemplo de menú">
  <button type="button" aria-expanded="false" aria-controls="menu-servicios">Servicios</button>
  <ul id="menu-servicios" hidden>
    <li><a href="/criterios/">Criterios</a></li>
    <li><a href="/normativa/">Normativa</a></li>
  </ul>
</nav>`,
    nota: "Alternativa casi nativa: con popovertarget en el botón y popover en la lista, el navegador gestiona Esc, el clic fuera y el estado expandido sin JavaScript.",
    criterios: ["4.1.2", "2.1.1", "1.4.13"],
    apg: APG + "disclosure/",
  },
  {
    id: "autocompletar",
    categoria: "Formularios",
    nombre: "Autocompletar",
    elemento: 'role="combobox"',
    intro:
      "Un campo que sugiere opciones mientras escribes. Es de los componentes más difíciles de hacer bien: si te basta, usa datalist, que es nativo.",
    claves: [
      "El input lleva role=\"combobox\", aria-expanded y aria-controls con la lista.",
      "La lista es role=\"listbox\" y cada sugerencia role=\"option\".",
      "aria-activedescendant indica qué opción está resaltada sin mover el foco del campo.",
      "Una región role=\"status\" anuncia cuántas sugerencias hay.",
    ],
    teclado: [
      ["Escribir", "Filtra las sugerencias"],
      ["↓ ↑", "Recorren las sugerencias"],
      ["Enter", "Elige la sugerencia resaltada"],
      ["Esc", "Cierra la lista"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<label for="ciudad">Ciudad</label>
<input id="ciudad" type="text" role="combobox" autocomplete="off"
  aria-autocomplete="list" aria-expanded="false" aria-controls="ciudad-lista">
<ul id="ciudad-lista" role="listbox" aria-label="Sugerencias" hidden></ul>
<p role="status" id="ciudad-estado" class="sr-only"></p>`,
      },
      { lang: "js", code: autocompletarJs },
      {
        lang: "css",
        code: `
/* La opción resaltada tiene que verse, no solo anunciarse */
[role="option"][aria-selected="true"] {
  background: var(--accent);
  color: var(--accent-ink);
}`,
      },
      {
        lang: "html",
        label: "Alternativa nativa",
        demo: "same",
        code: `
<label for="ciudad-nativa">Ciudad</label>
<input id="ciudad-nativa" list="ciudades">
<datalist id="ciudades">
  <option value="Barcelona"></option>
  <option value="Madrid"></option>
  <option value="Sevilla"></option>
</datalist>`,
      },
    ],
    demo: `
<label for="ciudad">Ciudad</label>
<input id="ciudad" type="text" role="combobox" autocomplete="off"
  aria-autocomplete="list" aria-expanded="false" aria-controls="ciudad-lista">
<ul id="ciudad-lista" role="listbox" aria-label="Sugerencias" hidden></ul>
<p role="status" id="ciudad-estado" class="sr-only"></p>`,
    criterios: ["4.1.2", "2.1.1", "4.1.3", "1.3.1"],
    apg: APG + "combobox/",
  },
  {
    id: "carrusel",
    categoria: "Contenido",
    nombre: "Carrusel",
    elemento: 'aria-roledescription="carrusel"',
    intro:
      "Diapositivas que rotan. Antes de usarlo, pregúntate si hace falta: mucha gente no pasa de la primera. Si lo usas, que se pueda pausar y manejar con botones.",
    claves: [
      "Botón de pausa, el primero en el orden de foco.",
      "Botones anterior y siguiente, además de cualquier gesto de deslizar.",
      "Cada diapositiva se identifica como «1 de 3».",
      "Se detiene cuando el foco entra y no arranca si la persona prefiere menos movimiento.",
      "Los cambios se anuncian (aria-live=\"polite\") solo cuando los provoca la persona.",
    ],
    teclado: [
      ["Tab", "Pausa, anterior, siguiente y contenido de la diapositiva"],
      ["Enter o Espacio", "Activa el botón enfocado"],
    ],
    codigo: [
      {
        lang: "html",
        code: `
<section class="carrusel" aria-roledescription="carrusel" aria-label="Ofertas destacadas">
  <button type="button" class="pausa">Pausar</button>
  <button type="button" class="anterior">Anterior</button>
  <button type="button" class="siguiente">Siguiente</button>
  <div class="diapositivas" aria-live="off">
    <div role="group" aria-roledescription="diapositiva" aria-label="1 de 3">…</div>
    <div role="group" aria-roledescription="diapositiva" aria-label="2 de 3" hidden>…</div>
    <div role="group" aria-roledescription="diapositiva" aria-label="3 de 3" hidden>…</div>
  </div>
</section>`,
      },
      { lang: "js", code: carruselJs },
    ],
    demo: `
<section class="carrusel" aria-roledescription="carrusel" aria-label="Ejemplo de carrusel">
  <div class="carrusel-controles">
    <button type="button" class="pausa">Pausar</button>
    <button type="button" class="anterior">Anterior</button>
    <button type="button" class="siguiente">Siguiente</button>
  </div>
  <div class="diapositivas" aria-live="off">
    <div role="group" aria-roledescription="diapositiva" aria-label="1 de 3"><p><b>Envío gratis</b> en pedidos desde 30 €.</p></div>
    <div role="group" aria-roledescription="diapositiva" aria-label="2 de 3" hidden><p><b>Devoluciones</b> sin coste durante 30 días.</p></div>
    <div role="group" aria-roledescription="diapositiva" aria-label="3 de 3" hidden><p><b>Atención</b> por teléfono, chat o correo.</p></div>
  </div>
</section>`,
    criterios: ["2.2.2", "2.5.1", "4.1.2"],
    apg: APG + "carousel/",
  },
  {
    id: "aviso",
    categoria: "Avisos y estado",
    nombre: "Aviso emergente (toast)",
    elemento: 'role="status"',
    intro: "Mensajes breves como «Cambios guardados». Tienen que anunciarse sin robar el foco y no desaparecer antes de poder leerlos.",
    claves: [
      "La región con role=\"status\" existe desde que carga la página, vacía.",
      "Para errores urgentes, role=\"alert\" (interrumpe la lectura): úsalo con moderación.",
      "No lo hagas desaparecer a los pocos segundos: deja que se cierre con un botón.",
      "No muevas el foco al aviso.",
    ],
    codigo: [
      {
        lang: "html",
        code: `
<button type="button" class="guardar">Guardar cambios</button>
<div class="avisos" role="status"></div>`,
      },
      { lang: "js", code: avisoJs },
    ],
    demo: "same",
    criterios: ["4.1.3", "2.2.1"],
    apg: APG + "alert/",
  },
  {
    id: "div-boton",
    categoria: "Qué no hacer",
    nombre: "Un div que hace de botón",
    elemento: 'role="button" tabindex="0"',
    intro:
      "Solo si no puedes cambiar el HTML (por ejemplo, en un componente de terceros). Mira todo lo que hay que añadir para igualar a un simple button.",
    claves: [
      "role=\"button\" para que se anuncie como botón.",
      "tabindex=\"0\" para que se pueda enfocar.",
      "Enter y Espacio tienen que activarlo: un div no lo hace solo.",
      "Aun así, no envía formularios ni tiene estado deshabilitado nativo.",
    ],
    teclado: [
      ["Tab", "Llega al elemento (gracias a tabindex)"],
      ["Enter", "Lo activa al pulsar (hay que programarlo)"],
      ["Espacio", "Lo activa al soltar (hay que programarlo)"],
    ],
    codigo: [
      {
        lang: "html",
        label: "Mejor así",
        demo: `
<button type="button" data-demo-msg="Añadido a favoritos.">Añadir a favoritos</button>
<p role="status"></p>`,
        code: `
<button type="button">Añadir a favoritos</button>`,
      },
      {
        lang: "html",
        label: "Si no queda otro remedio",
        demo: `
<div role="button" tabindex="0" class="favorito">Añadir a favoritos</div>
<p role="status" class="favorito-estado"></p>`,
        code: `
<div role="button" tabindex="0" class="favorito">Añadir a favoritos</div>

<script>
  const favorito = document.querySelector(".favorito");
  favorito.addEventListener("click", anadirFavorito);
  favorito.addEventListener("keydown", (e) => {
    if (e.key === "Enter") anadirFavorito();
    if (e.key === " ") e.preventDefault();  // evita que la página se desplace
  });
  favorito.addEventListener("keyup", (e) => {
    if (e.key === " ") anadirFavorito();
  });
</script>`,
      },
    ],
    criterios: ["2.1.1", "4.1.2"],
    apg: APG + "button/",
  },
];
