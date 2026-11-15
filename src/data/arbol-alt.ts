/**
 * Árbol de decisión «¿Qué alt le pongo?».
 * Basado en «An alt Decision Tree» del W3C (https://www.w3.org/WAI/tutorials/images/decision-tree/, actualizado el 13/05/2024).
 * Árbol estricto: cada nodo tiene un solo padre, así el recorrido hasta cualquier nodo se deduce de su id.
 */
import type { Codigo } from "./componentes";

export interface Respuesta {
  texto: string;
  /** Aclaración corta bajo la respuesta */
  ayuda?: string;
  siguiente: string;
}

export interface Pregunta {
  id: string;
  tipo: "pregunta";
  titulo: string;
  /** Por qué se pregunta */
  explicacion: string;
  ejemplos?: string[];
  respuestas: Respuesta[];
}

export interface Conclusion {
  id: string;
  tipo: "conclusion";
  titulo: string;
  /** texto: alt con contenido · vacio: alt="" · depende: no hay una única respuesta */
  veredicto: "texto" | "vacio" | "depende";
  resumen: string;
  porque: string[];
  codigo: Codigo[];
  nota?: string;
  /** Página del tutorial de imágenes del W3C */
  fuente: string;
}

export type Nodo = Pregunta | Conclusion;

export const RAIZ = "p-texto";
const W3C = "https://www.w3.org/WAI/tutorials/images/";
export const FUENTE_ARBOL = W3C + "decision-tree/";

export const VEREDICTO: Record<Conclusion["veredicto"], string> = {
  texto: "Lleva alt con texto",
  vacio: "Lleva alt vacío: alt=\"\"",
  depende: "Depende del caso",
};

/** Ejemplos de código compartidos entre conclusiones */
const SIN_ALT: Codigo = {
  lang: "html",
  tone: "mal",
  code: `
<!-- Sin alt: muchos lectores leen el nombre del archivo, «img 2034 punto jpg» -->
<img src="adorno.svg">`,
};
const NOTA_FONDO =
  "Si la imagen es un fondo puesto con CSS (background-image), no tiene alt: los lectores de pantalla no la ven. Úsalo solo para imágenes decorativas; si aporta información, ponla en el HTML con su alt.";

const NODOS_LISTA: Nodo[] = [
  // ——— 1. ¿Contiene texto? ———
  {
    id: "p-texto",
    tipo: "pregunta",
    titulo: "¿La imagen contiene texto?",
    explicacion:
      "El texto que forma parte de una imagen no lo puede leer un lector de pantalla, ni se puede ampliar sin pixelarse, traducir, copiar o encontrar con el buscador del navegador. Por eso es lo primero que hay que mirar.",
    ejemplos: [
      "Un logotipo con el nombre de la marca.",
      "Un cartel o una captura con frases.",
      "Un botón dibujado como imagen con la palabra «Comprar».",
    ],
    respuestas: [
      { texto: "Sí, tiene texto", siguiente: "p-texto-uso" },
      { texto: "No, no tiene texto", ayuda: "O solo números o letras sueltas sin significado", siguiente: "p-enlace" },
    ],
  },
  {
    id: "p-texto-uso",
    tipo: "pregunta",
    titulo: "¿Qué papel tiene el texto de la imagen?",
    explicacion:
      "Lo que importa no es que haya texto, sino si esa información ya llega por otro camino. Si el mismo texto está escrito en la página, repetirlo en el alt hace que el lector lo diga dos veces.",
    respuestas: [
      {
        texto: "El mismo texto está escrito al lado como texto real",
        ayuda: "Por ejemplo, un titular que también aparece en el HTML",
        siguiente: "c-texto-repetido",
      },
      {
        texto: "Es solo un efecto visual, sin significado",
        ayuda: "Letras de fondo, una textura tipográfica",
        siguiente: "c-texto-decorativo",
      },
      {
        texto: "Está en un enlace o botón y dice lo que hace",
        ayuda: "Un icono con la palabra «PDF», un botón dibujado «Enviar»",
        siguiente: "c-texto-funcion",
      },
      {
        texto: "Ninguna de las anteriores: ese texto solo está en la imagen",
        ayuda: "Un logotipo, un cartel, una cita en imagen",
        siguiente: "c-texto-imagen",
      },
    ],
  },

  // ——— 2. ¿Enlace o botón? ———
  {
    id: "p-enlace",
    tipo: "pregunta",
    titulo: "¿La imagen está dentro de un enlace o de un botón?",
    explicacion:
      "Si una imagen es lo que se pulsa, su alt es el nombre del enlace o del botón. Un lector de pantalla dirá «enlace» o «botón» seguido de ese texto: tiene que explicar adónde lleva o qué hace.",
    ejemplos: ["El logotipo que lleva a la portada.", "Una lupa que abre el buscador.", "La miniatura de un producto que abre su ficha."],
    respuestas: [
      { texto: "Sí, se puede pulsar", siguiente: "p-enlace-texto" },
      { texto: "No, no se puede pulsar", siguiente: "p-info" },
    ],
  },
  {
    id: "p-enlace-texto",
    tipo: "pregunta",
    titulo: "¿El enlace o el botón tiene además texto visible?",
    explicacion:
      "Si junto a la imagen ya hay un texto que dice lo que hace el enlace o el botón, ese texto es su nombre. La imagen solo acompaña y no hace falta describirla.",
    ejemplos: ["Sí: un icono de descarga seguido de «Descargar factura».", "No: un botón con solo una X para cerrar."],
    respuestas: [
      { texto: "Sí, hay texto que dice lo que hace", siguiente: "c-icono-con-texto" },
      { texto: "No, la imagen es lo único que hay", siguiente: "c-funcional" },
    ],
  },

  // ——— 3. ¿Aporta información? ———
  {
    id: "p-info",
    tipo: "pregunta",
    titulo: "¿La imagen aporta información que no está ya en el texto?",
    explicacion:
      "Piensa qué perdería alguien que no ve la imagen. Si pierde un dato, una idea o un contexto, la imagen es informativa y necesita alt. Si no pierde nada, no.",
    ejemplos: [
      "Aporta: la foto de un producto en una tienda, un mapa con la ubicación, una gráfica de ventas.",
      "No aporta: la foto de una persona sonriendo junto a un texto de bienvenida.",
    ],
    respuestas: [
      { texto: "Sí, aporta información", siguiente: "p-info-tipo" },
      {
        texto: "No: muestra lo mismo que dice el texto de al lado",
        ayuda: "Una foto del ponente junto a su nombre y su cargo",
        siguiente: "c-redundante",
      },
      { texto: "No, no aporta nada", siguiente: "p-decorativa" },
    ],
  },
  {
    id: "p-info-tipo",
    tipo: "pregunta",
    titulo: "¿Qué tipo de imagen es?",
    explicacion:
      "Una foto o un icono se resumen en una frase. Una gráfica o un diagrama tienen demasiados datos para un alt: hace falta además una alternativa con toda la información.",
    respuestas: [
      { texto: "Una foto, una ilustración o un icono con significado", siguiente: "c-informativa" },
      { texto: "Una gráfica, un diagrama, un mapa o una infografía", siguiente: "c-compleja" },
    ],
  },

  // ——— 4 y 5. ¿Decorativa? ¿Dudas? ———
  {
    id: "p-decorativa",
    tipo: "pregunta",
    titulo: "¿Es decoración o algo que no está pensado para el usuario?",
    explicacion:
      "Las imágenes decorativas solo adornan: bordes, separadores, fondos, ambientación. También hay imágenes que no son para nadie, como un píxel de seguimiento o un espaciador.",
    ejemplos: ["Una ola dibujada entre dos secciones.", "Una foto de ambiente que no añade nada al texto.", "Un píxel de 1×1 de estadísticas."],
    respuestas: [
      { texto: "Sí, solo adorna o no es para el usuario", siguiente: "c-decorativa" },
      { texto: "No lo tengo claro", siguiente: "c-duda" },
    ],
  },

  // ——— Conclusiones ———
  {
    id: "c-texto-repetido",
    tipo: "conclusion",
    titulo: "El texto ya está en la página: alt vacío",
    veredicto: "vacio",
    resumen: "Como el texto ya se lee en la página, la imagen no añade nada. Con alt=\"\" el lector la salta y no repite lo mismo.",
    porque: [
      "Repetir el texto en el alt hace que el lector lo diga dos veces seguidas.",
      "Mejor aún: si puedes, quita el texto de la imagen y deja solo el texto real, que se amplía y se traduce.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<h2>Rebajas de verano</h2>
<img src="rebajas.png" alt="">`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<h2>Rebajas de verano</h2>
<img src="rebajas.png" alt="Rebajas de verano">`,
      },
    ],
    fuente: W3C + "decorative/",
  },
  {
    id: "c-texto-decorativo",
    tipo: "conclusion",
    titulo: "Texto como efecto visual: alt vacío",
    veredicto: "vacio",
    resumen: "Si las letras son solo un adorno y no hay nada que leer, la imagen es decorativa. Lleva alt=\"\".",
    porque: [
      "El lector no tiene que leer un texto que nadie necesita entender.",
      "Si en realidad alguien podría querer leerlo, no es decorativo: vuelve atrás y elige otra respuesta.",
    ],
    codigo: [
      { lang: "html", tone: "bien", code: `<img src="letras-fondo.png" alt="">` },
      SIN_ALT,
    ],
    nota: NOTA_FONDO,
    fuente: W3C + "decorative/",
  },
  {
    id: "c-texto-funcion",
    tipo: "conclusion",
    titulo: "Imagen con texto que es un control: el alt dice lo que hace",
    veredicto: "texto",
    resumen: "La imagen es el nombre del enlace o del botón. El alt tiene que decir lo mismo que el texto de la imagen o, mejor, qué pasa al pulsarla.",
    porque: [
      "Quien usa control por voz dice lo que ve: si la imagen pone «Enviar», el alt debe empezar por «Enviar» (criterio 2.5.3).",
      "Mejor aún: usa un botón con texto real y estilos en lugar de una imagen de texto.",
    ],
    codigo: [
      { lang: "html", tone: "bien", code: `<button type="submit"><img src="boton-enviar.png" alt="Enviar"></button>` },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Describe el dibujo, no la acción -->
<button type="submit"><img src="boton-enviar.png" alt="Botón verde con flecha"></button>`,
      },
    ],
    fuente: W3C + "functional/",
  },
  {
    id: "c-texto-imagen",
    tipo: "conclusion",
    titulo: "Imagen de texto: el alt repite el texto",
    veredicto: "texto",
    resumen: "Como ese texto solo está en la imagen, el alt lo copia tal cual. En un logotipo, basta con el nombre.",
    porque: [
      "El alt es la única forma de que ese texto llegue a quien no ve la imagen.",
      "No añadas «logotipo de» ni «imagen de»: el lector ya anuncia que es una imagen.",
      "Si puedes, evita las imágenes de texto: el criterio 1.4.5 pide usar texto real salvo en logotipos o cuando la forma es esencial.",
    ],
    codigo: [
      { lang: "html", tone: "bien", code: `<img src="logo.svg" alt="Pon el foco">` },
      {
        lang: "html",
        tone: "mal",
        code: `
<img src="logo.svg" alt="Logotipo">
<img src="cartel.png" alt="cartel.png">`,
      },
    ],
    fuente: W3C + "textual/",
  },
  {
    id: "c-icono-con-texto",
    tipo: "conclusion",
    titulo: "Icono junto a un texto: se oculta",
    veredicto: "vacio",
    resumen: "El texto visible ya da nombre al enlace o al botón. El icono solo acompaña: alt=\"\" si es un <img>, aria-hidden=\"true\" si es un <svg>.",
    porque: [
      "Si el icono tuviera alt, el lector diría las dos cosas: «Descargar, Descargar factura».",
      "El nombre del control lo da el texto, que además ven todos.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<a href="/factura.pdf">
  <img src="descarga.svg" alt="">
  Descargar factura
</a>

<button type="button">
  <svg aria-hidden="true" focusable="false">…</svg>
  Buscar
</button>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<a href="/factura.pdf">
  <img src="descarga.svg" alt="Icono de descarga">
  Descargar factura
</a>`,
      },
    ],
    fuente: W3C + "functional/",
  },
  {
    id: "c-funcional",
    tipo: "conclusion",
    titulo: "Imagen que es lo único del enlace o botón: el alt dice adónde va o qué hace",
    veredicto: "texto",
    resumen: "El alt es el nombre del control. Describe la acción o el destino («Buscar», «Ir a la portada»), no el dibujo («lupa», «casa»).",
    porque: [
      "Un lector dirá «botón, Buscar»: con eso basta para saber qué pasa al pulsarlo.",
      "Un logotipo que enlaza a la portada suele llevar el nombre de la web; si quieres, «Inicio» o «Portada» tras el nombre.",
      "Con un <svg> en línea, el nombre va en el botón con aria-label, y el svg se oculta.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<a href="/"><img src="logo.svg" alt="Pon el foco, inicio"></a>

<button type="button" aria-label="Buscar">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Describe el dibujo: el lector dice «botón, lupa» -->
<button type="button"><img src="lupa.svg" alt="lupa"></button>

<!-- Sin nombre: el lector solo dice «botón» -->
<button type="button"><svg>…</svg></button>`,
      },
    ],
    fuente: W3C + "functional/",
  },
  {
    id: "c-informativa",
    tipo: "conclusion",
    titulo: "Imagen informativa: una descripción breve",
    veredicto: "texto",
    resumen: "Escribe en una frase lo que la imagen aporta en este contexto, no todo lo que se ve.",
    porque: [
      "La misma foto puede necesitar alt distintos según para qué esté: en una tienda importa el color del producto; en una noticia, quién aparece y qué hace.",
      "Sé breve: lo que entraría en una frase. Sin «imagen de» ni «foto de», salvo que el tipo importe (por ejemplo, «Captura de pantalla de…»).",
      "Termina con un punto: los lectores hacen una pausa y suena más natural.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<img src="zapatillas.jpg" alt="Zapatillas de running azules con suela blanca, vista lateral.">`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<img src="zapatillas.jpg" alt="imagen">
<img src="zapatillas.jpg" alt="IMG_2034.jpg">`,
      },
    ],
    nota: NOTA_FONDO,
    fuente: W3C + "informative/",
  },
  {
    id: "c-compleja",
    tipo: "conclusion",
    titulo: "Gráfica o diagrama: alt breve y los datos en la página",
    veredicto: "texto",
    resumen: "El alt resume en una frase qué muestra la imagen. Los datos completos van en la página como texto o tabla, unidos a la imagen.",
    porque: [
      "Un alt no puede contener todos los valores de una gráfica, y quien no la ve necesita esos datos igual que los demás.",
      "Una tabla bajo la gráfica, o un <details> con los datos, sirve a todo el mundo: también a quien quiere el número exacto.",
      "Une la imagen con su descripción con figure y figcaption, o con aria-describedby.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<figure>
  <img src="ventas.png" alt="Gráfica de barras: las ventas online crecen cada año entre 2024 y 2026.">
  <figcaption>Ventas online por año. Datos en la tabla siguiente.</figcaption>
</figure>
<table>
  <caption>Ventas online (millones de euros)</caption>
  <tr><th scope="col">Año</th><th scope="col">Ventas</th></tr>
  <tr><th scope="row">2024</th><td>12</td></tr>
  <tr><th scope="row">2025</th><td>14</td></tr>
  <tr><th scope="row">2026</th><td>15,6</td></tr>
</table>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<!-- Todo en el alt: largo, sin estructura y nadie puede consultar un dato concreto -->
<img src="ventas.png" alt="Gráfica de barras con tres barras azules, la primera de 2024 con 12 millones, la segunda…">`,
      },
    ],
    fuente: W3C + "complex/",
  },
  {
    id: "c-redundante",
    tipo: "conclusion",
    titulo: "La imagen repite el texto cercano: alt vacío",
    veredicto: "vacio",
    resumen: "Si quien no ve la imagen no pierde nada porque el texto de al lado ya lo dice, la imagen lleva alt=\"\".",
    porque: [
      "Repetir lo mismo en el alt alarga la lectura sin aportar nada.",
      "Si la imagen añade algo más (por ejemplo, el aspecto de la persona importa), entonces sí es informativa: vuelve atrás y elige «Sí, aporta información».",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<img src="ana.jpg" alt="">
<p>Ana Ruiz, directora de producto</p>`,
      },
      {
        lang: "html",
        tone: "mal",
        code: `
<img src="ana.jpg" alt="Ana Ruiz, directora de producto">
<p>Ana Ruiz, directora de producto</p>`,
      },
    ],
    fuente: W3C + "functional/#logo-image-within-link-text",
  },
  {
    id: "c-decorativa",
    tipo: "conclusion",
    titulo: "Imagen decorativa: alt vacío",
    veredicto: "vacio",
    resumen: "Lleva alt=\"\" (vacío, sin espacio entre las comillas). Así el lector de pantalla la ignora.",
    porque: [
      "alt=\"\" no es lo mismo que no poner alt: sin el atributo, muchos lectores leen el nombre del archivo.",
      "En un <svg> decorativo usa aria-hidden=\"true\" en lugar de alt.",
      "Si es decoración pura, también puede ir como fondo con CSS.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<img src="ola.svg" alt="">
<svg aria-hidden="true" focusable="false">…</svg>`,
      },
      SIN_ALT,
    ],
    nota: NOTA_FONDO,
    fuente: W3C + "decorative/",
  },
  {
    id: "c-duda",
    tipo: "conclusion",
    titulo: "No está claro: unas pistas para decidir",
    veredicto: "depende",
    resumen: "Ningún árbol cubre todos los casos. Si dudas, pregúntate qué contarías por teléfono a alguien que no ve la pantalla.",
    porque: [
      "Si al describir la página por teléfono mencionarías la imagen, necesita alt; si la saltarías, alt=\"\".",
      "Ante la duda entre decorativa e informativa, un alt breve hace menos daño que ocultar información.",
      "Nunca dejes la imagen sin el atributo alt.",
      "El tutorial de imágenes del W3C tiene más casos: mapas de imagen, grupos de imágenes, imágenes con texto largo.",
    ],
    codigo: [
      {
        lang: "html",
        tone: "bien",
        code: `
<!-- Breve y centrado en lo que aporta -->
<img src="oficina.jpg" alt="Equipo trabajando en una oficina luminosa.">`,
      },
      SIN_ALT,
    ],
    fuente: W3C,
  },
];

export const NODOS: Record<string, Nodo> = Object.fromEntries(NODOS_LISTA.map((n) => [n.id, n]));

/** Padre de cada nodo: el nodo y el índice de la respuesta que lleva a él */
export function padres(): Record<string, { id: string; respuesta: number }> {
  const out: Record<string, { id: string; respuesta: number }> = {};
  for (const n of NODOS_LISTA)
    if (n.tipo === "pregunta") n.respuestas.forEach((r, i) => (out[r.siguiente] = { id: n.id, respuesta: i }));
  return out;
}

/** Comprueba en la build que el árbol es válido; lanza un error con el motivo si no lo es */
export function validarArbol() {
  const errores: string[] = [];
  const vistos = new Map<string, string>();
  for (const n of NODOS_LISTA) {
    if (n.tipo !== "pregunta") continue;
    if (n.respuestas.length < 2) errores.push(`${n.id}: una pregunta necesita al menos dos respuestas`);
    for (const r of n.respuestas) {
      if (!NODOS[r.siguiente]) errores.push(`${n.id}: «${r.texto}» lleva a ${r.siguiente}, que no existe`);
      if (vistos.has(r.siguiente)) errores.push(`${r.siguiente} tiene dos padres (${vistos.get(r.siguiente)} y ${n.id})`);
      vistos.set(r.siguiente, n.id);
    }
  }
  // Alcanzables desde la raíz y sin ciclos (recorrido en profundidad)
  const alcanzados = new Set<string>();
  const visitar = (id: string, camino: string[]) => {
    if (camino.includes(id)) return errores.push(`ciclo: ${[...camino, id].join(" → ")}`);
    if (alcanzados.has(id) || !NODOS[id]) return;
    alcanzados.add(id);
    const n = NODOS[id];
    if (n.tipo === "pregunta") n.respuestas.forEach((r) => visitar(r.siguiente, [...camino, id]));
  };
  visitar(RAIZ, []);
  for (const id of Object.keys(NODOS)) if (!alcanzados.has(id)) errores.push(`${id} no se alcanza desde ${RAIZ}`);
  if (errores.length) throw new Error("Árbol de alt no válido:\n- " + errores.join("\n- "));
}
