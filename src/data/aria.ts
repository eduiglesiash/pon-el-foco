/**
 * Contenido de la página de ARIA: los atributos y roles de WAI-ARIA más usados.
 * Referencia: WAI-ARIA 1.2, Recomendación del W3C de 6 de junio de 2023 (https://www.w3.org/TR/wai-aria-1.2/).
 */
import pressedJs from "../scripts/aria-pressed.js?raw";
import expandedJs from "../scripts/aria-expanded.js?raw";
import statusJs from "../scripts/aria-status.js?raw";
import invalidJs from "../scripts/aria-invalid.js?raw";
import type { Codigo } from "./componentes";

/** Para qué sirve cada atributo; ordena la página y el índice */
export const GRUPOS = [
  "Nombre y descripción",
  "Estados de controles",
  "Relaciones",
  "Formularios",
  "Mensajes dinámicos",
  "Ocultar contenido",
  "Ventanas",
] as const;
export type GrupoAria = (typeof GRUPOS)[number];

export interface EntradaAria {
  /** Ancla de la entrada: /aria/#<id> */
  id: string;
  grupo: GrupoAria;
  /** Atributo o rol, en monoespaciada */
  nombre: string;
  /** Qué hace, en una o dos frases */
  queHace: string;
  cuando: string[];
  /** Cuándo no usarlo; incluye la alternativa nativa si existe */
  cuandoNo: string[];
  /** Qué expone a los lectores de pantalla, en términos generales */
  anuncia: string;
  /** Código mínimo: correcto y, si hay un error frecuente, incorrecto */
  codigo: Codigo[];
  /** Ejemplo en un caso real de interfaz */
  uso: { titulo: string; texto: string; codigo: Codigo[] };
  /** HTML de la demo en vivo (opcional) */
  demo?: string;
  /** Criterios WCAG relacionados */
  criterios: string[];
  /** Componentes de /componentes/ que ya lo usan */
  componentes?: string[];
  /** Enlace a una herramienta o página del sitio relacionada */
  enlace?: { href: string; texto: string };
  /** Ancla en la especificación WAI-ARIA 1.2 */
  spec: string;
}

export const SPEC = "https://www.w3.org/TR/wai-aria-1.2/";
export const USING_ARIA = "https://www.w3.org/TR/using-aria/";
export const APG = "https://www.w3.org/WAI/ARIA/apg/";

export const ENTRADAS: EntradaAria[] = [
  // ——— Nombre y descripción ———
  {
    id: "aria-label",
    grupo: "Nombre y descripción",
    nombre: "aria-label",
    queHace: "Da un nombre accesible a un elemento cuando no tiene texto visible que lo nombre. Sustituye a cualquier otro nombre que tuviera.",
    cuando: [
      "Botones o enlaces que solo tienen un icono (cerrar, buscar, menú).",
      "Dos zonas iguales que hay que distinguir, como dos nav: «Principal» y «Pie de página».",
    ],
    cuandoNo: [
      "Si hay texto visible que sirve de nombre: usa ese texto o aria-labelledby.",
      "En campos de formulario: usa un label visible.",
      "En elementos sin rol interactivo ni de región (div, span, p): muchos lectores lo ignoran.",
      "No pongas un aria-label distinto del texto visible: quien usa control por voz dice lo que ve y no funciona (criterio 2.5.3).",
    ],
    anuncia: "El texto de aria-label como nombre, seguido del rol: «Cerrar, botón».",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<button type="button" aria-label="Cerrar">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- El nombre no coincide con lo que se ve: «Enviar» por voz no lo activa -->
<button type="submit" aria-label="Formulario de contacto">Enviar</button>

<!-- En un div sin rol, el aria-label no se anuncia de forma fiable -->
<div aria-label="Ofertas de verano">…</div>`,
      },
    ],
    uso: {
      titulo: "Cabecera con buscador de solo icono y dos menús",
      texto: "El botón de la lupa no tiene texto, así que necesita nombre. Las dos nav se distinguen por su aria-label.",
      codigo: [
        {
          lang: "html",
          code: `
<nav aria-label="Principal">…</nav>

<button type="button" aria-label="Buscar en la tienda" aria-expanded="false" aria-controls="buscador">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>

<footer>
  <nav aria-label="Pie de página">…</nav>
</footer>`,
        },
      ],
    },
    criterios: ["1.1.1", "2.5.3", "4.1.2"],
    spec: "aria-label",
  },
  {
    id: "aria-labelledby",
    grupo: "Nombre y descripción",
    nombre: "aria-labelledby",
    queHace: "Toma el nombre accesible del texto de otro u otros elementos de la página, señalados por su id. Tiene prioridad sobre aria-label y sobre el contenido.",
    cuando: [
      "Una sección, tabla o ventana cuyo título ya está escrito en la página.",
      "Un nombre que combina varios textos: «Comprar» + «Zapatillas azules».",
    ],
    cuandoNo: [
      "En un campo de formulario con label: el label con for ya hace este trabajo.",
      "Para apuntar a un texto largo: el nombre debe ser corto; para explicaciones usa aria-describedby.",
    ],
    anuncia: "El texto de los elementos señalados, en el orden de los id, como nombre del elemento.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<section aria-labelledby="t-envios">
  <h2 id="t-envios">Gastos de envío</h2>
  …
</section>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- El id no existe: la sección se queda sin nombre -->
<section aria-labelledby="titulo-envios">
  <h2 id="t-envios">Gastos de envío</h2>
</section>`,
      },
    ],
    uso: {
      titulo: "Botones repetidos en un listado de productos",
      texto: "Muchos botones «Comprar» iguales no dicen qué compran. Con aria-labelledby cada botón suma su texto y el nombre del producto, sin cambiar lo que se ve.",
      codigo: [
        {
          lang: "html",
          code: `
<article>
  <h3 id="p-14">Zapatillas azules</h3>
  <p>59,90 €</p>
  <button type="button" id="b-14" aria-labelledby="b-14 p-14">Comprar</button>
</article>
<!-- Se anuncia «Comprar Zapatillas azules, botón» -->`,
        },
      ],
    },
    criterios: ["1.3.1", "2.4.6", "4.1.2"],
    componentes: ["pestanas", "dialog"],
    spec: "aria-labelledby",
  },
  {
    id: "aria-describedby",
    grupo: "Nombre y descripción",
    nombre: "aria-describedby",
    queHace: "Une a un elemento una descripción que está en otro sitio de la página. Se lee después del nombre, el rol y el estado.",
    cuando: [
      "Instrucciones o requisitos de un campo de formulario.",
      "El mensaje de error de un campo.",
      "Una nota que amplía lo que hace un botón.",
    ],
    cuandoNo: [
      "Para el nombre del elemento: eso es label, aria-labelledby o aria-label.",
      "Para información imprescindible que solo está en la descripción: algunos usuarios la desactivan o la saltan. Lo esencial va en el nombre o en el texto visible.",
    ],
    anuncia: "Nombre, rol y estado, y después (a veces tras una pausa) el texto de la descripción.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<label for="clave">Contraseña</label>
<input id="clave" type="password" aria-describedby="clave-ayuda">
<p id="clave-ayuda">Mínimo 12 caracteres.</p>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- La ayuda está, pero no está unida al campo: al tabular no se lee -->
<label for="clave">Contraseña</label>
<input id="clave" type="password">
<p>Mínimo 12 caracteres.</p>`,
      },
    ],
    uso: {
      titulo: "Contraseña con requisitos y error",
      texto: "aria-describedby admite varios id: primero los requisitos y, si hay error, el mensaje. Los dos se leen al llegar al campo.",
      codigo: [
        {
          lang: "html",
          code: `
<label for="nueva-clave">Nueva contraseña</label>
<input id="nueva-clave" type="password" autocomplete="new-password"
  aria-describedby="nueva-clave-ayuda nueva-clave-error" aria-invalid="true">
<p id="nueva-clave-ayuda">Mínimo 12 caracteres, con al menos un número.</p>
<p id="nueva-clave-error">Falta un número.</p>`,
        },
      ],
    },
    criterios: ["1.3.1", "3.3.1", "3.3.2"],
    componentes: ["campo"],
    spec: "aria-describedby",
  },

  // ——— Estados de controles ———
  {
    id: "aria-expanded",
    grupo: "Estados de controles",
    nombre: "aria-expanded",
    queHace: "Dice si el contenido que abre un control está desplegado (true) o plegado (false). Va en el botón que abre, no en el bloque que se muestra.",
    cuando: [
      "Botones que muestran u ocultan un bloque: acordeones, «Ver más», menús desplegables, el menú de móvil.",
      "Campos con lista de sugerencias (combobox).",
    ],
    cuandoNo: [
      "Si te vale <details> y <summary>: el navegador ya anuncia abierto y cerrado.",
      "En enlaces que llevan a otra página.",
      "En el bloque que se despliega: el estado va en el control.",
    ],
    anuncia: "El rol y el estado: «Envíos y devoluciones, botón, contraído» o «expandido», según el lector.",
    codigo: [
      { lang: "html", tone: "bien", code: `
<button type="button" aria-expanded="false" aria-controls="filtros">Filtros</button>
<div id="filtros" hidden>…</div>` },
      { lang: "js", label: "JavaScript", code: expandedJs },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Un div no se enfoca ni responde al teclado, y el estado no se actualiza -->
<div class="acordeon-titulo" onclick="abrir()" aria-expanded="false">Filtros</div>`,
      },
    ],
    uso: {
      titulo: "Preguntas frecuentes en acordeón",
      texto: "Cada pregunta es un encabezado con un botón dentro. El botón lleva aria-expanded y el panel se oculta con hidden.",
      codigo: [
        {
          lang: "html",
          code: `
<h3>
  <button type="button" aria-expanded="false" aria-controls="faq-1" data-demo-expanded>
    ¿Cuánto tarda el envío?
  </button>
</h3>
<div id="faq-1" hidden>
  <p>Entre 24 y 48 horas laborables en la península.</p>
</div>`,
        },
      ],
    },
    demo: `
<h4 class="text-label font-bold">
  <button type="button" aria-expanded="false" aria-controls="demo-faq-1" data-demo-expanded>
    ¿Cuánto tarda el envío?
  </button>
</h4>
<div id="demo-faq-1" hidden>
  <p>Entre 24 y 48 horas laborables en la península.</p>
</div>`,
    criterios: ["4.1.2", "1.3.1"],
    componentes: ["menu", "details", "autocompletar"],
    spec: "aria-expanded",
  },
  {
    id: "aria-pressed",
    grupo: "Estados de controles",
    nombre: "aria-pressed",
    queHace: "Convierte un botón en un botón de alternar: dice si está pulsado (true) o no (false).",
    cuando: [
      "Botones que activan o desactivan algo y se quedan así: negrita, silenciar, filtros, modo oscuro.",
    ],
    cuandoNo: [
      "Si el texto del botón cambia («Silenciar» / «Activar sonido»): con eso basta, y añadir aria-pressed confunde.",
      "Para un ajuste de encendido y apagado: un checkbox o role=\"switch\" se entienden mejor.",
      "En botones que hacen una acción y no se quedan pulsados (Guardar, Enviar).",
    ],
    anuncia: "«Negrita, botón de alternar, pulsado» o «no pulsado», con fórmulas que cambian según el lector.",
    codigo: [
      { lang: "html", tone: "bien", code: `<button type="button" aria-pressed="false">Negrita</button>` },
      { lang: "js", label: "JavaScript", code: pressedJs },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- El texto cambia y además lleva aria-pressed: se oye «Silenciado, pulsado» -->
<button type="button" aria-pressed="true">Silenciado</button>`,
      },
    ],
    uso: {
      titulo: "Filtros rápidos de un listado",
      texto: "Cada filtro es un botón de alternar. El estilo de «activo» sale del atributo, así el aspecto y lo que se anuncia no se separan.",
      codigo: [
        {
          lang: "html",
          code: `
<div role="group" aria-label="Filtrar ofertas">
  <button type="button" aria-pressed="true" data-demo-pressed>Envío gratis</button>
  <button type="button" aria-pressed="false" data-demo-pressed>En tienda</button>
</div>`,
        },
        {
          lang: "css",
          code: `
/* El estado visual sale del atributo ARIA, no de una clase aparte */
button[aria-pressed="true"] { background: var(--ink); color: var(--bg); }`,
        },
      ],
    },
    demo: `
<div role="group" aria-label="Filtrar ofertas" class="flex flex-wrap gap-2">
  <button type="button" aria-pressed="true" data-demo-pressed class="toggle">Envío gratis</button>
  <button type="button" aria-pressed="false" data-demo-pressed class="toggle">En tienda</button>
</div>`,
    criterios: ["4.1.2", "1.4.1"],
    spec: "aria-pressed",
  },
  {
    id: "aria-checked",
    grupo: "Estados de controles",
    nombre: "aria-checked",
    queHace: "Dice si un control a medida está marcado (true), sin marcar (false) o, en casillas, a medias (mixed).",
    cuando: [
      "En controles a medida con role=\"checkbox\", role=\"radio\", role=\"switch\" o role=\"menuitemcheckbox\".",
    ],
    cuandoNo: [
      "En <input type=\"checkbox\"> o type=\"radio\": el navegador ya expone el estado; usa checked y, para «a medias», la propiedad indeterminate.",
      "En un elemento sin uno de esos roles: no significa nada.",
    ],
    anuncia: "El rol y el estado: «Recibir avisos, interruptor, activado» o «casilla, marcada».",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<!-- Lo más sencillo: la casilla nativa -->
<label><input type="checkbox" checked> Recordarme</label>

<!-- Si el diseño pide un interruptor -->
<button type="button" role="switch" aria-checked="false">Recibir avisos</button>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Duplica lo que ya hace el input y puede contradecirlo -->
<input type="checkbox" aria-checked="true">`,
      },
    ],
    uso: {
      titulo: "Ajustes de notificaciones",
      texto: "Un interruptor por ajuste. El botón ya responde a Enter y Espacio; el script solo cambia aria-checked.",
      codigo: [
        {
          lang: "html",
          code: `
<button type="button" role="switch" aria-checked="true" class="switch">
  <span class="switch-track" aria-hidden="true"></span>
  Avisos por correo
</button>`,
        },
      ],
    },
    criterios: ["4.1.2", "1.3.1"],
    componentes: ["interruptor", "grupo"],
    spec: "aria-checked",
  },
  {
    id: "aria-selected",
    grupo: "Estados de controles",
    nombre: "aria-selected",
    queHace: "Marca qué elemento está seleccionado dentro de un widget compuesto: la pestaña activa, la opción elegida de una lista.",
    cuando: [
      "En role=\"tab\" (la pestaña activa lleva true; las demás, false).",
      "En role=\"option\" dentro de un listbox, y en celdas o filas de grid y treegrid.",
    ],
    cuandoNo: [
      "Para marcar la página o el paso actual en una navegación: eso es aria-current.",
      "En casillas o interruptores: eso es aria-checked.",
      "En un <select>: el navegador ya lo hace.",
    ],
    anuncia: "«Envíos, pestaña, seleccionada, 2 de 3» (la posición la añaden muchos lectores).",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<div role="tablist" aria-label="Información del producto">
  <button role="tab" aria-selected="true" aria-controls="p-desc" id="t-desc">Descripción</button>
  <button role="tab" aria-selected="false" aria-controls="p-envio" id="t-envio" tabindex="-1">Envíos</button>
</div>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- aria-selected no vale en un enlace de navegación: usa aria-current -->
<a href="/ofertas/" aria-selected="true">Ofertas</a>`,
      },
    ],
    uso: {
      titulo: "Pestañas de ficha de producto",
      texto: "Al cambiar de pestaña se mueve aria-selected y se muestra su panel. El componente completo, con el teclado de flechas, está en Componentes.",
      codigo: [
        {
          lang: "html",
          code: `
<div role="tabpanel" id="p-desc" aria-labelledby="t-desc">…</div>
<div role="tabpanel" id="p-envio" aria-labelledby="t-envio" hidden>…</div>`,
        },
      ],
    },
    criterios: ["4.1.2", "1.3.1"],
    componentes: ["pestanas", "autocompletar"],
    spec: "aria-selected",
  },
  {
    id: "aria-current",
    grupo: "Estados de controles",
    nombre: "aria-current",
    queHace: "Señala el elemento actual dentro de un conjunto: la página en la que estás, el paso de un proceso o el día de hoy en un calendario.",
    cuando: [
      "aria-current=\"page\" en el enlace de la página actual del menú o de las migas de pan.",
      "aria-current=\"step\" en el paso actual de un proceso; \"date\" o \"time\" en calendarios.",
    ],
    cuandoNo: [
      "En pestañas u opciones de una lista: eso es aria-selected.",
      "Para resaltar algo que no es «el actual» de un conjunto (una oferta destacada, por ejemplo).",
    ],
    anuncia: "«Inicio, enlace, página actual» o «paso actual», según el valor.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<nav aria-label="Principal">
  <a href="/">Inicio</a>
  <a href="/ofertas/" aria-current="page">Ofertas</a>
</nav>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Solo una clase: se ve, pero no se anuncia -->
<a href="/ofertas/" class="activo">Ofertas</a>`,
      },
    ],
    uso: {
      titulo: "Pasos de un proceso de compra",
      texto: "El paso actual lleva aria-current=\"step\". El estilo puede apoyarse en el mismo atributo.",
      codigo: [
        {
          lang: "html",
          code: `
<ol aria-label="Pasos de la compra">
  <li>Carrito</li>
  <li aria-current="step">Envío</li>
  <li>Pago</li>
</ol>`,
        },
        {
          lang: "css",
          code: `
[aria-current="page"], [aria-current="step"] { font-weight: 700; text-decoration: underline; }`,
        },
      ],
    },
    criterios: ["1.3.1", "4.1.2"],
    spec: "aria-current",
  },
  {
    id: "aria-disabled",
    grupo: "Estados de controles",
    nombre: "aria-disabled",
    queHace: "Anuncia que un control no está disponible, pero lo deja en el orden de foco. No bloquea nada: tienes que impedir tú la acción con JavaScript.",
    cuando: [
      "Cuando quieres que el control siga siendo enfocable para poder explicar por qué no está disponible (por ejemplo, con una descripción).",
      "En opciones de menús o pestañas a medida que no se pueden elegir.",
    ],
    cuandoNo: [
      "En controles nativos (button, input) si te vale que salgan del foco: usa el atributo disabled.",
      "Como sustituto de disabled sin bloquear el clic ni la tecla: el botón sigue funcionando.",
      "En elementos que no son controles: en ARIA 1.2 su uso global está obsoleto.",
    ],
    anuncia: "«Pagar, botón, no disponible» (o «atenuado», según el lector).",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<button type="button" aria-disabled="true" aria-describedby="pagar-nota">Pagar</button>
<p id="pagar-nota">Acepta las condiciones para poder pagar.</p>`,
      },
      {
        lang: "js",
        label: "JavaScript",
        code: `
pagar.addEventListener("click", (e) => {
  if (pagar.getAttribute("aria-disabled") === "true") return; // no hace nada
  enviarPago();
});`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Se anuncia como no disponible, pero al pulsarlo envía el formulario -->
<button type="submit" aria-disabled="true">Pagar</button>`,
      },
    ],
    uso: {
      titulo: "Botón de pago que explica por qué no se puede usar",
      texto: "Con disabled, quien navega con teclado no llegaría al botón ni a su explicación. Con aria-disabled llega, oye la nota y sabe qué le falta.",
      codigo: [
        {
          lang: "css",
          code: `
/* Que se vea como no disponible, con contraste suficiente para leerlo */
button[aria-disabled="true"] { cursor: not-allowed; border-style: dashed; }`,
        },
      ],
    },
    criterios: ["4.1.2", "3.3.2"],
    spec: "aria-disabled",
  },

  // ——— Relaciones ———
  {
    id: "aria-controls",
    grupo: "Relaciones",
    nombre: "aria-controls",
    queHace: "Señala con su id el elemento cuyo contenido o visibilidad cambia este control.",
    cuando: [
      "En pestañas (cada tab controla su panel), botones que despliegan un bloque y campos con lista de sugerencias.",
    ],
    cuandoNo: [
      "Como única pista de la relación: el soporte en lectores es desigual y muchos no lo anuncian. Que la relación se entienda también por el orden y el texto.",
      "Si el id no existe en la página (por ejemplo, el panel se crea más tarde): espera a que exista o no lo pongas.",
    ],
    anuncia: "Casi nada por sí solo. Algunos lectores ofrecen una orden para saltar al elemento controlado; la mayoría no dice nada.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<button type="button" aria-expanded="false" aria-controls="menu-cuenta">Mi cuenta</button>
<ul id="menu-cuenta" hidden>…</ul>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Apunta a una clase, no a un id: no hay relación -->
<button type="button" aria-controls=".menu-cuenta">Mi cuenta</button>`,
      },
    ],
    uso: {
      titulo: "Botón de menú en móvil",
      texto: "El botón dice qué abre (aria-controls) y si está abierto (aria-expanded). El menú va justo después en el código, para que el orden de lectura acompañe.",
      codigo: [
        {
          lang: "html",
          code: `
<button type="button" aria-expanded="false" aria-controls="menu-movil">Menú</button>
<nav id="menu-movil" aria-label="Principal" hidden>…</nav>`,
        },
      ],
    },
    criterios: ["1.3.1", "4.1.2"],
    componentes: ["pestanas", "menu", "autocompletar"],
    spec: "aria-controls",
  },

  // ——— Formularios ———
  {
    id: "aria-invalid",
    grupo: "Formularios",
    nombre: "aria-invalid",
    queHace: "Marca que el valor de un campo no es válido. Debe ir con un mensaje de texto que explique el error.",
    cuando: [
      "Cuando el campo tiene un error, después de que la persona lo envíe o salga del campo.",
    ],
    cuandoNo: [
      "Antes de que la persona escriba: un campo vacío recién cargado no es un error.",
      "Como única señal: el error se dice también en texto y no solo con color rojo.",
      "Fuera de campos de formulario: en ARIA 1.2 su uso global está obsoleto.",
    ],
    anuncia: "«Código postal, editar texto, no válido», seguido del mensaje si está unido con aria-describedby.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<label for="cp">Código postal</label>
<input id="cp" inputmode="numeric" autocomplete="postal-code"
  aria-invalid="true" aria-describedby="cp-error">
<p id="cp-error">El código postal tiene que tener 5 cifras, por ejemplo 08001.</p>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Solo un borde rojo: no se anuncia el error ni se explica -->
<input id="cp" class="borde-rojo">`,
      },
    ],
    uso: {
      titulo: "Validar al enviar",
      texto: "El mensaje de error ya está en la página, vacío. Al enviar se rellena, se marca el campo y el foco vuelve a él, así que se lee todo junto.",
      codigo: [
        {
          lang: "html",
          code: `
<form novalidate data-demo-invalid="cp-error">
  <label for="cp">Código postal</label>
  <input id="cp" inputmode="numeric" autocomplete="postal-code" aria-describedby="cp-error">
  <p id="cp-error"></p>
  <button type="submit">Calcular envío</button>
</form>`,
        },
        { lang: "js", label: "JavaScript", code: invalidJs },
      ],
    },
    demo: `
<form novalidate data-demo-invalid="demo-cp-error" class="flex w-full flex-col items-start gap-2">
  <label for="demo-cp">Código postal</label>
  <input id="demo-cp" inputmode="numeric" autocomplete="postal-code" aria-describedby="demo-cp-error">
  <p id="demo-cp-error" class="font-semibold text-ko"></p>
  <button type="submit">Calcular envío</button>
</form>`,
    criterios: ["3.3.1", "3.3.3", "4.1.2"],
    componentes: ["campo"],
    spec: "aria-invalid",
  },
  {
    id: "aria-errormessage",
    grupo: "Formularios",
    nombre: "aria-errormessage",
    queHace: "Señala el elemento que contiene el mensaje de error de un campo. Solo cuenta cuando el campo tiene aria-invalid=\"true\".",
    cuando: [
      "Cuando quieres separar el error de las instrucciones del campo, siempre junto a aria-invalid=\"true\".",
    ],
    cuandoNo: [
      "Como única forma de unir el error: los lectores de pantalla no lo anuncian de forma tan fiable como aria-describedby. Hoy lo más seguro es aria-describedby.",
      "Sin aria-invalid=\"true\": la especificación dice que entonces no se expone.",
      "Fuera de campos de formulario: en ARIA 1.2 su uso global está obsoleto.",
    ],
    anuncia: "Depende del lector: unos leen el mensaje con el campo y otros no. Por eso se recomienda unir el error también con aria-describedby.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<label for="email">Correo electrónico</label>
<input id="email" type="email" aria-invalid="true"
  aria-errormessage="email-error" aria-describedby="email-error">
<p id="email-error">Falta la @. Ejemplo: nombre@dominio.es</p>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Sin aria-invalid="true" el mensaje no cuenta -->
<input id="email" type="email" aria-errormessage="email-error">
<p id="email-error">Falta la @.</p>`,
      },
    ],
    uso: {
      titulo: "Campo con ayuda y error por separado",
      texto: "La ayuda va en aria-describedby y el error en los dos atributos. Así, si el lector no admite aria-errormessage, el error se lee igual.",
      codigo: [
        {
          lang: "html",
          code: `
<label for="tel">Teléfono</label>
<input id="tel" type="tel" autocomplete="tel" aria-invalid="true"
  aria-describedby="tel-ayuda tel-error" aria-errormessage="tel-error">
<p id="tel-ayuda">Solo te llamaremos si hay un problema con el pedido.</p>
<p id="tel-error">Escribe 9 cifras, sin espacios.</p>`,
        },
      ],
    },
    criterios: ["3.3.1", "3.3.3"],
    spec: "aria-errormessage",
  },
  {
    id: "aria-required",
    grupo: "Formularios",
    nombre: "aria-required",
    queHace: "Anuncia que un campo es obligatorio. No impide enviar el formulario vacío: solo informa.",
    cuando: [
      "En controles a medida que no tienen el atributo required (un role=\"combobox\" o un role=\"radiogroup\" propios).",
      "En formularios que se validan con JavaScript y no quieres los mensajes del navegador. Aun así, a menudo basta con required y novalidate en el form.",
    ],
    cuandoNo: [
      "En input, select o textarea: el atributo nativo required ya se anuncia como obligatorio.",
      "Como única indicación: hay que decirlo también en el texto visible, con la palabra «obligatorio» o explicando el asterisco.",
    ],
    anuncia: "«Nombre, editar texto, obligatorio» (o «requerido»).",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<label for="nombre">Nombre (obligatorio)</label>
<input id="nombre" autocomplete="given-name" required>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Asterisco sin explicar y aria-required duplicando a required -->
<label for="nombre">Nombre *</label>
<input id="nombre" required aria-required="true">`,
      },
    ],
    uso: {
      titulo: "Grupo de opciones a medida obligatorio",
      texto: "Un radiogroup hecho con ARIA no admite required, así que se usa aria-required en el grupo.",
      codigo: [
        {
          lang: "html",
          code: `
<p id="t-entrega">Forma de entrega (obligatorio)</p>
<div role="radiogroup" aria-labelledby="t-entrega" aria-required="true">
  <div role="radio" aria-checked="false" tabindex="0">A domicilio</div>
  <div role="radio" aria-checked="false" tabindex="-1">Recogida en tienda</div>
</div>`,
        },
      ],
    },
    criterios: ["3.3.2", "1.3.1"],
    componentes: ["campo", "grupo"],
    spec: "aria-required",
  },

  // ——— Mensajes dinámicos ———
  {
    id: "aria-live",
    grupo: "Mensajes dinámicos",
    nombre: "aria-live",
    queHace: "Convierte un bloque en una región viva: cuando su contenido cambia, el lector lo anuncia sin mover el foco. Con \"polite\" espera a que termine de hablar; con \"assertive\" interrumpe.",
    cuando: [
      "Mensajes que aparecen sin recargar la página: resultados de un filtro, «Guardado», un contador.",
      "Usa \"polite\" casi siempre. \"assertive\" solo para lo urgente.",
    ],
    cuandoNo: [
      "Si un role=\"status\" o role=\"alert\" te vale: ya llevan aria-live implícito y se entienden mejor.",
      "Sobre zonas grandes que cambian a menudo (un chat entero, un teletipo): satura al usuario.",
      "Añadiendo la región en el mismo momento que el mensaje: la región tiene que existir antes.",
    ],
    anuncia: "Solo el texto que cambia, sin el rol. Con \"assertive\" corta lo que estuviera leyendo.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<!-- La región está desde el principio, vacía -->
<p aria-live="polite" id="resultados"></p>`,
      },
      {
        lang: "js",
        label: "JavaScript",
        code: `
resultados.textContent = "24 productos encontrados.";`,
      },
      {
        lang: "js",
        tone: "mal",
        code: `
// La región se crea con el mensaje dentro: muchos lectores no lo anuncian
document.body.insertAdjacentHTML("beforeend",
  '<p aria-live="polite">24 productos encontrados.</p>');`,
      },
    ],
    uso: {
      titulo: "Contador de resultados de un buscador",
      texto: "Al escribir, el contador se actualiza con un pequeño retardo para no anunciar cada tecla.",
      codigo: [
        {
          lang: "html",
          code: `
<label for="q">Buscar producto</label>
<input id="q" type="search">
<p aria-live="polite" id="q-resultados"></p>`,
        },
      ],
    },
    criterios: ["4.1.3"],
    componentes: ["aviso"],
    spec: "aria-live",
  },
  {
    id: "role-status",
    grupo: "Mensajes dinámicos",
    nombre: "role=\"status\"",
    queHace: "Una región viva para mensajes informativos que no son urgentes. Equivale a aria-live=\"polite\" y además dice qué es.",
    cuando: [
      "Confirmaciones y resultados: «Añadido al carrito», «3 resultados», «Guardado hace un momento».",
    ],
    cuandoNo: [
      "Para errores que hay que atender ya: role=\"alert\".",
      "Para mensajes que mueven el foco (un diálogo): ese contenido ya se lee al recibir el foco.",
    ],
    anuncia: "El texto nuevo, de forma educada: espera a que el lector termine lo que está leyendo.",
    codigo: [
      { lang: "html", tone: "bien", code: `
<button type="button" data-demo-status="carrito-estado">Añadir al carrito</button>
<p role="status" id="carrito-estado"></p>` },
      { lang: "js", label: "JavaScript", code: statusJs },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Un aviso flotante que se ve, pero el lector no se entera -->
<div class="toast">Añadido al carrito</div>`,
      },
    ],
    uso: {
      titulo: "Añadir al carrito sin salir de la página",
      texto: "El botón no mueve el foco. El mensaje se anuncia y la persona sigue donde estaba.",
      codigo: [],
    },
    demo: `
<button type="button" data-demo-status="demo-carrito-estado">Añadir al carrito</button>
<p role="status" id="demo-carrito-estado" class="font-semibold"></p>`,
    criterios: ["4.1.3"],
    componentes: ["aviso", "boton"],
    spec: "status",
  },
  {
    id: "role-alert",
    grupo: "Mensajes dinámicos",
    nombre: "role=\"alert\"",
    queHace: "Una región viva para mensajes importantes y urgentes. Equivale a aria-live=\"assertive\": interrumpe lo que esté leyendo el lector.",
    cuando: [
      "Errores que impiden seguir: «No se ha podido guardar. Revisa tu conexión».",
      "Avisos con tiempo: «Tu sesión caduca en 2 minutos».",
    ],
    cuandoNo: [
      "Para confirmaciones normales: role=\"status\".",
      "En el texto de cada error de campo al validar: si hay varios, se pisan. Mejor un resumen o mover el foco al primer error.",
      "En contenido que ya está al cargar la página: no se anuncia y además confunde.",
    ],
    anuncia: "El texto, en cuanto aparece, cortando lo que estuviera leyendo. Algunos lectores dicen antes «alerta».",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<div role="alert" id="aviso-sesion"></div>
<!-- Más tarde, con JavaScript: -->
<!-- aviso-sesion.textContent = "Tu sesión caduca en 2 minutos." -->`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Un mensaje de bienvenida no es urgente y role="alert" lo convierte en una interrupción -->
<p role="alert">¡Bienvenida de nuevo!</p>`,
      },
    ],
    uso: {
      titulo: "Error al guardar",
      texto: "El contenedor está desde el principio. Si falla el guardado, se escribe el error y se anuncia de inmediato.",
      codigo: [
        {
          lang: "js",
          code: `
try {
  await guardar();
  estado.textContent = "Cambios guardados."; // role="status"
} catch {
  error.textContent = "No se han podido guardar los cambios. Inténtalo de nuevo."; // role="alert"
}`,
        },
      ],
    },
    criterios: ["4.1.3", "3.3.1"],
    componentes: ["aviso"],
    spec: "alert",
  },

  // ——— Ocultar contenido ———
  {
    id: "aria-hidden",
    grupo: "Ocultar contenido",
    nombre: "aria-hidden",
    queHace: "Saca un elemento y todo lo que contiene del árbol de accesibilidad: el lector no lo lee, aunque se siga viendo.",
    cuando: [
      "Iconos decorativos o que repiten el texto que tienen al lado.",
      "Adornos hechos con texto o con caracteres (flechas, viñetas, emojis decorativos).",
    ],
    cuandoNo: [
      "En un elemento enfocable o que contiene elementos enfocables: el foco llega a algo que «no existe» y se oye un silencio.",
      "Para ocultar algo a todo el mundo: usa hidden o display: none, que ya lo ocultan también al lector.",
      "En imágenes: usa alt=\"\".",
    ],
    anuncia: "Nada: el contenido no existe para el lector.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<button type="button">
  <svg aria-hidden="true" focusable="false">…</svg>
  Descargar factura
</button>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- El enlace se enfoca, pero el lector no dice nada -->
<a href="/carrito/" aria-hidden="true">Carrito</a>

<!-- Todo el formulario queda oculto al lector, botones incluidos -->
<form aria-hidden="true">…</form>`,
      },
    ],
    uso: {
      titulo: "Enlace con icono y flecha decorativa",
      texto: "El texto ya dice adónde va. La flecha y el icono solo adornan, así que se ocultan.",
      codigo: [
        {
          lang: "html",
          code: `
<a href="/devoluciones/">
  <svg aria-hidden="true" focusable="false">…</svg>
  Política de devoluciones <span aria-hidden="true">→</span>
</a>`,
        },
      ],
    },
    criterios: ["1.1.1", "1.3.1", "4.1.2"],
    componentes: ["imagen", "div-boton"],
    enlace: { href: "/alt/", texto: "¿Imagen informativa o decorativa? Decídelo con «¿Qué alt le pongo?»" },
    spec: "aria-hidden",
  },

  // ——— Ventanas ———
  {
    id: "role-dialog",
    grupo: "Ventanas",
    nombre: "role=\"dialog\" y aria-modal",
    queHace: "role=\"dialog\" marca una ventana que se abre sobre la página. aria-modal=\"true\" dice que, mientras está abierta, el resto de la página no se puede usar.",
    cuando: [
      "Solo si no puedes usar <dialog>, por ejemplo por una librería que ya genera su propio marcado.",
    ],
    cuandoNo: [
      "Casi nunca: <dialog> abierto con showModal() ya trae el rol, el modo modal, el foco atrapado, Escape para cerrar y el resto de la página inerte.",
      "aria-modal no bloquea nada por sí solo: si lo usas a mano, tienes que mover el foco, atraparlo, cerrar con Escape y devolver el foco al cerrar.",
    ],
    anuncia: "«Confirmar pedido, diálogo», seguido del contenido enfocado. Con aria-modal, muchos lectores dejan de leer lo que hay detrás.",
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<!-- Lo recomendado: el elemento nativo -->
<dialog id="confirmar" aria-labelledby="t-confirmar">
  <h2 id="t-confirmar">Confirmar pedido</h2>
  …
  <button type="button" onclick="this.closest('dialog').close()">Cerrar</button>
</dialog>
<script>confirmar.showModal();</script>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Rol y aria-modal sin nombre, sin foco y sin Escape: solo es un div que se ve encima -->
<div class="modal" role="dialog" aria-modal="true">…</div>`,
      },
    ],
    uso: {
      titulo: "Si tienes que hacerlo con ARIA",
      texto: "El contenedor necesita nombre, recibir el foco al abrirse y devolverlo al botón que lo abrió al cerrarse. Todo eso es JavaScript tuyo.",
      codigo: [
        {
          lang: "html",
          code: `
<div role="dialog" aria-modal="true" aria-labelledby="t-cookies" tabindex="-1" id="cookies">
  <h2 id="t-cookies">Preferencias de cookies</h2>
  …
  <button type="button">Guardar preferencias</button>
</div>`,
        },
      ],
    },
    criterios: ["2.1.2", "2.4.3", "4.1.2"],
    componentes: ["dialog"],
    spec: "dialog",
  },
];
