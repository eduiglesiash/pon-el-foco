export type Nivel = "A" | "AA" | "AAA";

export interface Criterio {
  id: string;
  nombre: string;
  nivel: Nivel;
  /** Nuevo en WCAG 2.2 */
  nuevo: boolean;
  descripcion: string;
  /** Versión breve de la descripción para la meta description, cuando la normal pasa de ~155 caracteres */
  descripcionCorta?: string;
  /** A quién ayuda */
  ayuda: string;
  caso: string;
  /** Los AAA solo llegan hasta el caso de uso */
  bien?: string;
  mal?: string;
  comprobar?: string;
}

export const PRINCIPIOS: Record<string, string> = { "1": "Perceptible", "2": "Operable", "3": "Comprensible", "4": "Robusto" };

/** Qué pide cada principio, en una frase */
export const PRINCIPIOS_TEXTO: Record<string, string> = {
  "1": "La información tiene que poder verse, oírse o leerse por otros medios.",
  "2": "Todo se tiene que poder usar con teclado, tiempo suficiente y sin riesgos.",
  "3": "El contenido y la interfaz deben entenderse y comportarse de forma predecible.",
  "4": "Debe funcionar con navegadores y tecnologías de apoyo actuales y futuras.",
};

/** Pautas WCAG, con los nombres de la traducción autorizada al español del W3C */
export const PAUTAS: Record<string, string> = {
  "1.1": "Alternativas textuales",
  "1.2": "Medios tempodependientes",
  "1.3": "Adaptable",
  "1.4": "Distinguible",
  "2.1": "Accesible por teclado",
  "2.2": "Tiempo suficiente",
  "2.3": "Convulsiones y reacciones físicas",
  "2.4": "Navegable",
  "2.5": "Modalidades de entrada",
  "3.1": "Legible",
  "3.2": "Predecible",
  "3.3": "Ayuda a la entrada",
  "4.1": "Compatible",
};

/** Criterios eliminados en WCAG 2.2: siguen en la lista para quien los busque, pero no cuentan entre los exigidos */
export const obsoleto = (id: string) => id === "4.1.1";

/** Pauta de un criterio: "1.4.3" → "1.4" */
export const pauta = (id: string) => id.split(".").slice(0, 2).join(".");

/** Segmento de URL de un criterio: "1.4.3" → "1-4-3" */
export const slug = (id: string) => id.replace(/\./g, "-");

/** Criterios WCAG 2.2, ordenados por número. Los AAA son orientativos, no los exige la ley. */
export const CRITERIOS: Criterio[] = [
  {
    "id": "1.1.1",
    "nombre": "Contenido no textual",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Toda imagen, icono o gráfico que transmite información tiene un texto alternativo equivalente. Las imágenes decorativas se marcan para que se ignoren.",
    "descripcionCorta": "Toda imagen o icono que informa tiene un texto alternativo equivalente; las decorativas se ocultan.",
    "ayuda": "Personas ciegas que usan lector de pantalla y quienes navegan con imágenes desactivadas.",
    "caso": "Una tienda online muestra la foto de unas zapatillas y un icono de carrito sin texto.",
    "bien": "La foto tiene alt «Zapatillas de running azules, vista lateral» y el botón del carrito se anuncia como «Añadir al carrito».",
    "mal": "El lector de pantalla dice «imagen IMG_2034.jpg» o «botón» sin nombre.",
    "comprobar": "Revisa cada imagen: ¿el alt dice lo mismo que la imagen aporta? Prueba con un lector de pantalla los botones de solo icono."
  },
  {
    "id": "1.2.1",
    "nombre": "Solo audio y solo vídeo (grabado)",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Un audio grabado tiene transcripción, y un vídeo sin sonido tiene una alternativa en texto o en audio.",
    "ayuda": "Personas sordas (audio) y personas ciegas (vídeo mudo).",
    "caso": "Un ayuntamiento publica el pódcast semanal del pleno.",
    "bien": "Debajo del reproductor hay un enlace a la transcripción completa.",
    "mal": "Solo está el archivo MP3 sin ninguna versión escrita.",
    "comprobar": "Localiza cada audio y vídeo sin sonido y verifica que hay una alternativa equivalente cerca."
  },
  {
    "id": "1.2.2",
    "nombre": "Subtítulos (grabados)",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los vídeos grabados con sonido tienen subtítulos sincronizados que incluyen diálogos y sonidos relevantes.",
    "ayuda": "Personas sordas o con hipoacusia, y quien ve el vídeo sin sonido.",
    "caso": "Un banco publica un vídeo explicando cómo activar la tarjeta.",
    "bien": "Subtítulos revisados que incluyen [suena una alerta] cuando la app emite un aviso.",
    "mal": "Subtítulos automáticos sin revisar con errores que cambian importes o pasos.",
    "comprobar": "Reproduce el vídeo sin sonido: ¿se entiende todo solo con los subtítulos?"
  },
  {
    "id": "1.2.3",
    "nombre": "Audiodescripción o alternativa (grabado)",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los vídeos grabados tienen audiodescripción o una alternativa textual completa de lo que se ve.",
    "ayuda": "Personas ciegas o con baja visión.",
    "caso": "Un tutorial muestra en pantalla dónde pulsar sin decirlo en voz alta.",
    "bien": "Se ofrece una transcripción que describe las acciones: «Pulsa el botón Configuración, arriba a la derecha».",
    "mal": "El narrador dice «haz clic aquí» mientras señala en la imagen.",
    "comprobar": "Escucha el vídeo sin mirar. Si se pierde información, hace falta audiodescripción o alternativa."
  },
  {
    "id": "1.2.4",
    "nombre": "Subtítulos (en directo)",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Las retransmisiones en directo con audio tienen subtítulos en tiempo real.",
    "ayuda": "Personas sordas o con hipoacusia.",
    "caso": "Una universidad pública retransmite en streaming su acto de graduación.",
    "bien": "Se usa subtitulado en directo realizado por estenotipia o un servicio profesional.",
    "mal": "El directo se emite sin subtítulos y se promete subirlos «más adelante».",
    "comprobar": "Comprueba que el reproductor del directo ofrece subtítulos activables y sincronizados."
  },
  {
    "id": "1.2.5",
    "nombre": "Audiodescripción (grabado)",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los vídeos grabados incluyen audiodescripción de la información visual importante que no se narra.",
    "ayuda": "Personas ciegas o con baja visión.",
    "caso": "Un vídeo promocional de una plataforma audiovisual muestra textos con precios en pantalla.",
    "bien": "Una pista de audio alternativa lee los precios y describe las escenas clave.",
    "mal": "Los precios solo aparecen escritos en la imagen, sin narración.",
    "comprobar": "Escucha el vídeo con los ojos cerrados: ¿falta algo para entenderlo?"
  },
  {
    "id": "1.2.6",
    "nombre": "Lengua de signos (grabado)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Los vídeos grabados incluyen interpretación en lengua de signos.",
    "ayuda": "Personas sordas signantes.",
    "caso": "Un vídeo institucional incluye intérprete de LSE en una esquina."
  },
  {
    "id": "1.2.7",
    "nombre": "Audiodescripción ampliada (grabado)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Se pausa el vídeo para insertar audiodescripción cuando las pausas naturales no bastan.",
    "ayuda": "Personas ciegas.",
    "caso": "Un tutorial denso se detiene para describir cada paso."
  },
  {
    "id": "1.2.8",
    "nombre": "Alternativa para medios (grabado)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Todo vídeo grabado tiene una alternativa textual completa.",
    "ayuda": "Personas sordociegas.",
    "caso": "Un curso online ofrece el guion completo de cada vídeo."
  },
  {
    "id": "1.2.9",
    "nombre": "Solo audio (en directo)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Los audios en directo tienen alternativa textual en tiempo real.",
    "ayuda": "Personas sordas.",
    "caso": "Una radio online publica transcripción en directo de su informativo."
  },
  {
    "id": "1.3.1",
    "nombre": "Información y relaciones",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "La estructura visual (títulos, listas, tablas, campos de formulario) está también en el código, para que la tecnología de apoyo la entienda.",
    "descripcionCorta": "Títulos, listas, tablas y campos se marcan en el código, no solo a la vista, para que la tecnología de apoyo los entienda.",
    "ayuda": "Usuarios de lector de pantalla y de otras tecnologías de apoyo.",
    "caso": "Una página de horarios de tren muestra una tabla y varios encabezados.",
    "bien": "Los títulos usan h1, h2…, la tabla usa th para las cabeceras y cada campo tiene su label asociado.",
    "mal": "Los títulos son párrafos en negrita y la tabla está hecha con divs.",
    "comprobar": "Desactiva los estilos CSS o revisa el árbol de accesibilidad: la estructura debe seguir ahí."
  },
  {
    "id": "1.3.2",
    "nombre": "Secuencia significativa",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Si el orden de lectura importa, el orden del código coincide con el orden lógico.",
    "ayuda": "Usuarios de lector de pantalla y quien usa estilos personalizados.",
    "caso": "Una ficha de producto coloca el precio a la derecha con CSS.",
    "bien": "En el código el precio va justo después del nombre del producto.",
    "mal": "El lector de pantalla lee el precio al final, tras el pie de página.",
    "comprobar": "Navega con lector de pantalla o desactiva el CSS y lee de arriba abajo."
  },
  {
    "id": "1.3.3",
    "nombre": "Características sensoriales",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Las instrucciones no dependen solo de forma, tamaño, posición, color o sonido.",
    "ayuda": "Personas ciegas y personas con dificultades cognitivas.",
    "caso": "Un formulario dice «Pulsa el botón redondo de la derecha para continuar».",
    "bien": "«Pulsa el botón Continuar, a la derecha del formulario».",
    "mal": "«Pulsa el botón verde» o «haz clic en el icono de abajo».",
    "comprobar": "Busca en los textos referencias a forma, color o posición y verifica que también nombran el elemento."
  },
  {
    "id": "1.3.4",
    "nombre": "Orientación",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "El contenido funciona en vertical y en horizontal, salvo que una orientación sea imprescindible.",
    "ayuda": "Personas con el móvil fijado a una silla de ruedas o soporte.",
    "caso": "La app de un banco solo funciona en vertical.",
    "bien": "La app se adapta a ambas orientaciones.",
    "mal": "Al girar el móvil aparece «Gira tu dispositivo para continuar».",
    "comprobar": "Gira el dispositivo en cada pantalla y comprueba que todo sigue disponible."
  },
  {
    "id": "1.3.5",
    "nombre": "Identificar el propósito de la entrada",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los campos con datos personales indican su propósito en el código (autocomplete) para que el navegador los rellene.",
    "ayuda": "Personas con dificultades motoras, de memoria o cognitivas.",
    "caso": "El formulario de envío de una tienda pide nombre, email y dirección.",
    "bien": "Los campos tienen autocomplete=\"name\", \"email\", \"street-address\".",
    "mal": "El navegador no puede autocompletar porque los campos no lo indican.",
    "comprobar": "Revisa el código de los campos personales o prueba el autocompletado del navegador."
  },
  {
    "id": "1.3.6",
    "nombre": "Identificar el propósito",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "El propósito de componentes, iconos y regiones se puede determinar por programa.",
    "ayuda": "Personas con discapacidad cognitiva que usan símbolos personalizados.",
    "caso": "Los iconos de la app se pueden sustituir por pictogramas familiares."
  },
  {
    "id": "1.4.1",
    "nombre": "Uso del color",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "El color no es el único medio para transmitir información o indicar una acción.",
    "ayuda": "Personas daltónicas o con baja visión.",
    "caso": "Un formulario marca en rojo los campos con error.",
    "bien": "Además del borde rojo, hay un icono y el texto «Introduce un email válido».",
    "mal": "Solo cambia el color del borde del campo.",
    "comprobar": "Mira la página en escala de grises: ¿se sigue entendiendo todo?"
  },
  {
    "id": "1.4.2",
    "nombre": "Control del audio",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Si un audio suena automáticamente más de 3 segundos, se puede pausar, detener o bajar su volumen.",
    "ayuda": "Usuarios de lector de pantalla, cuya voz queda tapada.",
    "caso": "La portada de una web turística reproduce música al cargar.",
    "bien": "La música no arranca sola, o hay un botón visible al principio para pararla.",
    "mal": "La música suena en bucle y no hay forma de silenciarla salvo cerrar la pestaña.",
    "comprobar": "Carga cada página con sonido activado."
  },
  {
    "id": "1.4.3",
    "nombre": "Contraste (mínimo)",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "El texto tiene un contraste de al menos 4,5:1 con su fondo (3:1 para texto grande).",
    "ayuda": "Personas con baja visión y cualquiera que mire el móvil al sol.",
    "caso": "Una web usa texto gris claro sobre fondo blanco.",
    "bien": "Texto #595959 sobre blanco (7:1).",
    "mal": "Texto #AAAAAA sobre blanco (2,3:1).",
    "comprobar": "Usa un analizador de contraste en textos, placeholders y textos sobre imágenes."
  },
  {
    "id": "1.4.4",
    "nombre": "Cambio de tamaño del texto",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "El texto se puede ampliar al 200 % sin perder contenido ni funciones.",
    "ayuda": "Personas con baja visión.",
    "caso": "Una persona amplía el texto de una web de seguros.",
    "bien": "Los bloques crecen y el texto se reorganiza sin cortarse. Prueba los botones A+ de esta misma página.",
    "mal": "Al ampliar, los textos se solapan o quedan cortados dentro de cajas de altura fija.",
    "comprobar": "Amplía al 200 % con el zoom del navegador y revisa cada página."
  },
  {
    "id": "1.4.5",
    "nombre": "Imágenes de texto",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Se usa texto real en lugar de imágenes que contienen texto, salvo logotipos o casos imprescindibles.",
    "ayuda": "Personas con baja visión que ajustan tamaño, color o tipografía.",
    "caso": "Un banner de rebajas es una imagen con «-30 % en todo».",
    "bien": "El banner es texto HTML con estilos sobre una imagen de fondo.",
    "mal": "Todo el mensaje está dentro de un JPG.",
    "comprobar": "Intenta seleccionar el texto: si no puedes, es una imagen."
  },
  {
    "id": "1.4.6",
    "nombre": "Contraste (mejorado)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Contraste de al menos 7:1 (4,5:1 para texto grande).",
    "ayuda": "Personas con baja visión moderada.",
    "caso": "Una web de servicios sociales usa texto casi negro sobre blanco."
  },
  {
    "id": "1.4.7",
    "nombre": "Sonido de fondo bajo o inexistente",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "En el habla grabada, el fondo es 20 dB más bajo o se puede quitar.",
    "ayuda": "Personas con hipoacusia.",
    "caso": "Un pódcast sin música de fondo bajo la voz."
  },
  {
    "id": "1.4.8",
    "nombre": "Presentación visual",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "El usuario puede elegir colores, el texto no está justificado, líneas de 80 caracteres o menos e interlineado amplio.",
    "ayuda": "Personas con dislexia o baja visión.",
    "caso": "Una web de lectura fácil permite elegir colores de fondo."
  },
  {
    "id": "1.4.9",
    "nombre": "Imágenes de texto (sin excepciones)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Solo se usa texto en imágenes si es decorativo o esencial.",
    "ayuda": "Personas con baja visión.",
    "caso": "Un cartel de evento se publica como texto HTML, no como imagen."
  },
  {
    "id": "1.4.10",
    "nombre": "Reajuste del contenido (reflow)",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "El contenido se ve sin desplazamiento horizontal a 320 px de ancho (equivale a un zoom del 400 %).",
    "ayuda": "Personas con baja visión que usan mucho zoom.",
    "caso": "Un usuario amplía al 400 % la página de una aerolínea.",
    "bien": "El diseño pasa a una columna y todo se lee desplazándose solo en vertical.",
    "mal": "Hay que desplazarse a izquierda y derecha para leer cada línea.",
    "comprobar": "Pon la ventana a 1280 px y amplía al 400 %, o usa 320 px de ancho."
  },
  {
    "id": "1.4.11",
    "nombre": "Contraste no textual",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los componentes de interfaz (bordes de campos, iconos, estados) y los gráficos tienen un contraste mínimo de 3:1.",
    "ayuda": "Personas con baja visión.",
    "caso": "Un formulario usa campos con un borde gris muy claro.",
    "bien": "El borde del campo tiene un contraste de 3:1 o más con el fondo.",
    "mal": "Los campos casi no se distinguen del fondo.",
    "comprobar": "Mide el contraste de bordes, iconos, casillas y líneas de gráficos."
  },
  {
    "id": "1.4.12",
    "nombre": "Espaciado del texto",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "No se pierde contenido si el usuario aumenta el interlineado, el espacio entre letras, palabras y párrafos.",
    "ayuda": "Personas con dislexia o baja visión que usan sus propios estilos.",
    "caso": "Un usuario aplica una extensión que aumenta el interlineado a 1,5.",
    "bien": "El texto se reacomoda y los botones crecen.",
    "mal": "Los textos de los botones se cortan porque tienen alto fijo.",
    "comprobar": "Aplica un bookmarklet de espaciado de texto y revisa si algo se corta."
  },
  {
    "id": "1.4.13",
    "nombre": "Contenido con hover o foco",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los tooltips o menús que aparecen al pasar el ratón o recibir foco se pueden cerrar, se puede mover el puntero sobre ellos y no desaparecen solos.",
    "descripcionCorta": "Los tooltips y menús que aparecen con el ratón o el foco se pueden cerrar, recorrer con el puntero y no desaparecen solos.",
    "ayuda": "Personas con baja visión que usan zoom y personas con dificultades motoras.",
    "caso": "Un icono de ayuda muestra un tooltip con las condiciones de un préstamo.",
    "bien": "El tooltip se cierra con Escape y se puede pasar el ratón por encima para leerlo.",
    "mal": "El tooltip tapa el campo que estás rellenando y desaparece si mueves el ratón.",
    "comprobar": "Prueba cada tooltip con ratón y teclado: Escape, mover el puntero y esperar."
  },
  {
    "id": "2.1.1",
    "nombre": "Teclado",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Todas las funciones se pueden usar solo con el teclado.",
    "ayuda": "Personas ciegas y personas con movilidad reducida que no usan ratón.",
    "caso": "El selector de fecha de una web de reservas.",
    "bien": "Se puede elegir la fecha con flechas, Intro y Tab.",
    "mal": "El calendario solo responde al clic del ratón.",
    "comprobar": "Desconecta el ratón y completa todos los procesos con Tab, Intro, espacio y flechas."
  },
  {
    "id": "2.1.2",
    "nombre": "Sin trampas para el foco del teclado",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Si el foco entra en un componente, también puede salir con el teclado.",
    "ayuda": "Usuarios de teclado.",
    "caso": "Un reproductor de vídeo incrustado en una noticia.",
    "bien": "Tab sale del reproductor y continúa por la página.",
    "mal": "El foco queda atrapado en el reproductor y no hay forma de salir.",
    "comprobar": "Recorre la página con Tab y comprueba que puedes avanzar y retroceder siempre."
  },
  {
    "id": "2.1.3",
    "nombre": "Teclado (sin excepciones)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Toda la funcionalidad funciona con teclado, sin ninguna excepción.",
    "ayuda": "Usuarios de teclado.",
    "caso": "Una herramienta de dibujo online permite trazar con el teclado."
  },
  {
    "id": "2.1.4",
    "nombre": "Atajos de teclado con caracteres",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los atajos de una sola tecla (letras, números) se pueden desactivar o reasignar, o solo funcionan con foco.",
    "ayuda": "Usuarios de control por voz, que pueden activarlos sin querer.",
    "caso": "Un webmail borra el correo al pulsar la tecla «D».",
    "bien": "Hay una opción para desactivar los atajos o se requiere Ctrl+D.",
    "mal": "Al dictar una frase, la letra D borra correos.",
    "comprobar": "Busca atajos de una sola tecla y verifica que se pueden apagar o cambiar."
  },
  {
    "id": "2.2.1",
    "nombre": "Tiempo ajustable",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Si hay límite de tiempo, se puede desactivar, ajustar o ampliar con un aviso previo.",
    "ayuda": "Personas con dificultades motoras, cognitivas o que usan tecnologías de apoyo lentas.",
    "caso": "La sesión de la banca online caduca a los 5 minutos.",
    "bien": "Antes de caducar aparece un aviso «Tu sesión va a caducar. ¿Quieres más tiempo?» con al menos 20 segundos para responder.",
    "mal": "Se cierra la sesión sin avisar y se pierden los datos introducidos.",
    "comprobar": "Identifica los procesos con tiempo límite y comprueba que hay aviso y ampliación."
  },
  {
    "id": "2.2.2",
    "nombre": "Pausar, detener, ocultar",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los contenidos que se mueven, parpadean o se actualizan solos durante más de 5 segundos se pueden pausar.",
    "ayuda": "Personas con déficit de atención o dificultades de lectura.",
    "caso": "Un carrusel automático en la portada de una tienda.",
    "bien": "El carrusel tiene botón de pausa y se detiene al recibir foco.",
    "mal": "Las diapositivas pasan solas sin control y no da tiempo a leerlas.",
    "comprobar": "Localiza carruseles, animaciones y tickers y busca el control de pausa."
  },
  {
    "id": "2.2.3",
    "nombre": "Sin tiempo",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "El tiempo no forma parte esencial de ninguna actividad.",
    "ayuda": "Personas con discapacidad cognitiva o motora.",
    "caso": "Un examen online sin límite de tiempo."
  },
  {
    "id": "2.2.4",
    "nombre": "Interrupciones",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Las interrupciones se pueden aplazar o suprimir, salvo emergencias.",
    "ayuda": "Personas con déficit de atención.",
    "caso": "Las notificaciones push de una app se pueden posponer."
  },
  {
    "id": "2.2.5",
    "nombre": "Reautenticación",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Si la sesión caduca, al volver a entrar no se pierden los datos.",
    "ayuda": "Personas que necesitan más tiempo.",
    "caso": "Un formulario largo se guarda y se recupera tras iniciar sesión de nuevo."
  },
  {
    "id": "2.2.6",
    "nombre": "Tiempos de espera",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Se avisa de cuánto tiempo de inactividad puede causar pérdida de datos.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "«Guardamos tu carrito durante 20 horas sin actividad»."
  },
  {
    "id": "2.3.1",
    "nombre": "Umbral de tres destellos o menos",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Nada destella más de tres veces por segundo.",
    "ayuda": "Personas con epilepsia fotosensible.",
    "caso": "Un anuncio en vídeo con efectos estroboscópicos.",
    "bien": "Los efectos se suavizan por debajo del umbral.",
    "mal": "El vídeo parpadea rápidamente en rojo y blanco.",
    "comprobar": "Analiza vídeos y animaciones con una herramienta de análisis de destellos como PEAT."
  },
  {
    "id": "2.3.2",
    "nombre": "Tres destellos",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Nada destella más de tres veces por segundo, sin excepciones de tamaño.",
    "ayuda": "Personas con epilepsia fotosensible.",
    "caso": "Las animaciones de una web de videojuegos evitan destellos."
  },
  {
    "id": "2.3.3",
    "nombre": "Animación desde las interacciones",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Las animaciones activadas por la interacción se pueden desactivar.",
    "ayuda": "Personas con trastornos vestibulares.",
    "caso": "La web respeta «reducir movimiento» del sistema, como esta página."
  },
  {
    "id": "2.4.1",
    "nombre": "Evitar bloques",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Hay una forma de saltar los bloques repetidos, como el menú, para ir directo al contenido.",
    "ayuda": "Usuarios de teclado y de lector de pantalla.",
    "caso": "Una web con un menú de 40 enlaces en cada página.",
    "bien": "El primer Tab muestra «Saltar al contenido», como en esta página.",
    "mal": "Hay que pulsar Tab 40 veces en cada página para llegar al contenido.",
    "comprobar": "Pulsa Tab nada más cargar la página."
  },
  {
    "id": "2.4.2",
    "nombre": "Titulado de páginas",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Cada página tiene un título que describe su tema o propósito.",
    "ayuda": "Usuarios de lector de pantalla y quien tiene muchas pestañas abiertas.",
    "caso": "El proceso de compra de una tienda tiene varias pantallas.",
    "bien": "«Paso 2 de 4: Dirección de envío · TiendaX».",
    "mal": "Todas las pantallas se titulan «TiendaX».",
    "comprobar": "Revisa el título de la pestaña en cada página y cada paso."
  },
  {
    "id": "2.4.3",
    "nombre": "Orden del foco",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "El foco del teclado recorre los elementos en un orden lógico.",
    "ayuda": "Usuarios de teclado y de lector de pantalla.",
    "caso": "Una ventana modal de inicio de sesión.",
    "bien": "Al abrirse, el foco va al primer campo de la modal y se queda dentro hasta cerrarla.",
    "mal": "El foco sigue en la página de fondo, detrás de la modal.",
    "comprobar": "Recorre con Tab cada pantalla, sobre todo modales y menús desplegables."
  },
  {
    "id": "2.4.4",
    "nombre": "Propósito de los enlaces (en contexto)",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "El propósito de cada enlace se entiende por su texto o por su contexto inmediato.",
    "ayuda": "Usuarios de lector de pantalla que navegan por la lista de enlaces.",
    "caso": "Un listado de noticias con enlaces «Leer más».",
    "bien": "«Leer más sobre la nueva ordenanza de terrazas».",
    "mal": "Diez enlaces iguales que dicen «Pincha aquí».",
    "comprobar": "Revisa la lista de enlaces con el lector de pantalla y comprueba si se entienden."
  },
  {
    "id": "2.4.5",
    "nombre": "Múltiples vías",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Hay más de una forma de llegar a cada página: menú, buscador, mapa web…",
    "ayuda": "Personas con dificultades cognitivas o visuales.",
    "caso": "El portal de una diputación con cientos de trámites.",
    "bien": "Hay menú, buscador y mapa web.",
    "mal": "Solo se puede llegar a un trámite navegando por cinco niveles de menú.",
    "comprobar": "Comprueba que existen al menos dos mecanismos de navegación."
  },
  {
    "id": "2.4.6",
    "nombre": "Encabezados y etiquetas",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los encabezados y las etiquetas describen el tema o propósito.",
    "ayuda": "Todas las personas, especialmente con discapacidad cognitiva.",
    "caso": "Un formulario de alta de suministro.",
    "bien": "Campo con etiqueta «CUPS (código de 20 caracteres de tu factura)».",
    "mal": "Campo con la etiqueta «Código».",
    "comprobar": "Lee solo los encabezados y etiquetas: ¿se entiende la página?"
  },
  {
    "id": "2.4.7",
    "nombre": "Foco visible",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Siempre se ve qué elemento tiene el foco del teclado.",
    "ayuda": "Usuarios de teclado.",
    "caso": "Una web elimina el contorno de foco por estética.",
    "bien": "Un indicador claro, como el contorno amarillo y negro de esta página.",
    "mal": "outline: none sin alternativa; no se sabe dónde estás.",
    "comprobar": "Navega con Tab y comprueba que siempre ves dónde está el foco."
  },
  {
    "id": "2.4.8",
    "nombre": "Ubicación",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Se indica dónde está el usuario dentro del sitio.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "Migas de pan: Inicio › Trámites › Empadronamiento."
  },
  {
    "id": "2.4.9",
    "nombre": "Propósito de los enlaces (solo enlace)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Cada enlace se entiende por sí solo, sin contexto.",
    "ayuda": "Usuarios de lector de pantalla.",
    "caso": "«Descargar el formulario de empadronamiento (PDF, 120 KB)»."
  },
  {
    "id": "2.4.10",
    "nombre": "Encabezados de sección",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Las secciones del contenido se organizan con encabezados.",
    "ayuda": "Usuarios de lector de pantalla y personas con discapacidad cognitiva.",
    "caso": "Unas bases de convocatoria divididas con encabezados por apartado."
  },
  {
    "id": "2.4.11",
    "nombre": "Foco no oculto (mínimo)",
    "nivel": "AA",
    "nuevo": true,
    "descripcion": "El elemento con foco no queda totalmente tapado por contenido del autor, como cabeceras fijas o banners de cookies.",
    "ayuda": "Usuarios de teclado y personas con baja visión.",
    "caso": "Una web tiene una cabecera fija y un banner de cookies abajo.",
    "bien": "Al tabular, la página se desplaza para que el elemento con foco quede visible.",
    "mal": "El foco queda detrás del banner de cookies y no se ve.",
    "comprobar": "Tabula por la página con cabeceras fijas, chats y banners visibles."
  },
  {
    "id": "2.4.12",
    "nombre": "Foco no oculto (mejorado)",
    "nivel": "AAA",
    "nuevo": true,
    "descripcion": "El elemento con foco no queda tapado, ni siquiera parcialmente.",
    "ayuda": "Usuarios de teclado.",
    "caso": "Ningún elemento fijo cubre parte del elemento enfocado."
  },
  {
    "id": "2.4.13",
    "nombre": "Apariencia del foco",
    "nivel": "AAA",
    "nuevo": true,
    "descripcion": "El indicador de foco tiene un tamaño y contraste mínimos definidos.",
    "ayuda": "Usuarios de teclado con baja visión.",
    "caso": "Contorno de foco de 2 px con contraste 3:1 entre estados."
  },
  {
    "id": "2.5.1",
    "nombre": "Gestos del puntero",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Lo que se hace con gestos multipunto o de trayectoria (pellizcar, deslizar) también se puede hacer con un solo toque.",
    "ayuda": "Personas con movilidad reducida o que usan un puntero bucal.",
    "caso": "Un mapa de oficinas se amplía pellizcando.",
    "bien": "Hay botones + y − para ampliar.",
    "mal": "Solo se puede ampliar con dos dedos.",
    "comprobar": "Busca funciones que requieran gestos y comprueba que tienen alternativa."
  },
  {
    "id": "2.5.2",
    "nombre": "Cancelación del puntero",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Las acciones se ejecutan al soltar el clic, no al pulsar, para poder arrepentirse.",
    "ayuda": "Personas con temblores o dificultades motoras.",
    "caso": "El botón «Confirmar transferencia».",
    "bien": "La acción ocurre al soltar; si arrastras fuera del botón, se cancela.",
    "mal": "La transferencia se lanza en cuanto tocas el botón.",
    "comprobar": "Pulsa, mantén y arrastra fuera del botón antes de soltar."
  },
  {
    "id": "2.5.3",
    "nombre": "Etiqueta en el nombre",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "El nombre accesible de un control contiene el texto que se ve en él.",
    "ayuda": "Usuarios de control por voz.",
    "caso": "Un botón muestra «Buscar».",
    "bien": "El nombre accesible es «Buscar» o «Buscar productos».",
    "mal": "El aria-label dice «Lupa» y el usuario dice «Pulsa Buscar» sin resultado.",
    "comprobar": "Compara el texto visible con el nombre accesible en las herramientas del navegador."
  },
  {
    "id": "2.5.4",
    "nombre": "Activación mediante movimiento",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Lo que se activa agitando o inclinando el móvil tiene alternativa en pantalla y se puede desactivar.",
    "ayuda": "Personas con el dispositivo fijo o con temblores.",
    "caso": "Una app de pagos permite «agitar para deshacer».",
    "bien": "También hay un botón «Deshacer», y la función de agitar se puede apagar.",
    "mal": "Solo se puede deshacer agitando el móvil.",
    "comprobar": "Revisa funciones por movimiento y busca su alternativa."
  },
  {
    "id": "2.5.5",
    "nombre": "Tamaño del objetivo (mejorado)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Los objetivos miden al menos 44×44 px.",
    "ayuda": "Personas con dificultades motoras.",
    "caso": "Los botones de esta página miden 44 px de alto como mínimo."
  },
  {
    "id": "2.5.6",
    "nombre": "Mecanismos de entrada concurrentes",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "No se limita el uso de un tipo de entrada: se puede alternar teclado, ratón y táctil.",
    "ayuda": "Personas que combinan dispositivos de entrada.",
    "caso": "Una tablet con teclado externo funciona igual que solo con táctil."
  },
  {
    "id": "2.5.7",
    "nombre": "Movimientos de arrastre",
    "nivel": "AA",
    "nuevo": true,
    "descripcion": "Lo que se hace arrastrando también se puede hacer con clics o toques simples.",
    "ayuda": "Personas con dificultades motoras.",
    "caso": "Un tablero de tareas permite mover tarjetas arrastrando.",
    "bien": "Cada tarjeta tiene un menú «Mover a…» con las columnas.",
    "mal": "Solo se puede cambiar el estado arrastrando la tarjeta.",
    "comprobar": "Identifica cada arrastre y busca la alternativa sin arrastrar."
  },
  {
    "id": "2.5.8",
    "nombre": "Tamaño del objetivo (mínimo)",
    "nivel": "AA",
    "nuevo": true,
    "descripcion": "Los objetivos táctiles miden al menos 24×24 px o tienen suficiente separación.",
    "ayuda": "Personas con temblores, dedos grandes o en movimiento.",
    "caso": "Los iconos de redes sociales en el pie de una web, muy juntos.",
    "bien": "Cada icono mide 24 px o más, o están separados lo suficiente.",
    "mal": "Iconos de 16 px pegados entre sí: es fácil pulsar el equivocado.",
    "comprobar": "Mide los objetivos pequeños con las herramientas del navegador."
  },
  {
    "id": "3.1.1",
    "nombre": "Idioma de la página",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "El idioma principal de la página está indicado en el código.",
    "ayuda": "Usuarios de lector de pantalla, que necesitan la pronunciación correcta.",
    "caso": "Una web en castellano.",
    "bien": "<html lang=\"es\">",
    "mal": "Sin atributo lang: el lector lo lee con pronunciación inglesa.",
    "comprobar": "Revisa el atributo lang del elemento html."
  },
  {
    "id": "3.1.2",
    "nombre": "Idioma de las partes",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los fragmentos en otro idioma se marcan con su idioma.",
    "ayuda": "Usuarios de lector de pantalla.",
    "caso": "Una web oficial con un bloque en catalán o euskera.",
    "bien": "<p lang=\"ca\"> para el bloque en catalán.",
    "mal": "El texto en catalán se lee con fonética castellana.",
    "comprobar": "Localiza fragmentos en otros idiomas y revisa su atributo lang."
  },
  {
    "id": "3.1.3",
    "nombre": "Palabras inusuales",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Hay definiciones para jerga o palabras usadas de forma inusual.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "Un glosario explica «CUPS» o «IBAN»."
  },
  {
    "id": "3.1.4",
    "nombre": "Abreviaturas",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Se explica el significado de las abreviaturas.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "«LSSI (Ley de Servicios de la Sociedad de la Información)»."
  },
  {
    "id": "3.1.5",
    "nombre": "Nivel de lectura",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Si el texto exige un nivel de lectura avanzado, hay una versión más sencilla.",
    "ayuda": "Personas con discapacidad intelectual.",
    "caso": "Una versión en lectura fácil de las bases de una ayuda."
  },
  {
    "id": "3.1.6",
    "nombre": "Pronunciación",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Se indica la pronunciación cuando el significado depende de ella.",
    "ayuda": "Usuarios de lector de pantalla.",
    "caso": "Nombres propios o palabras homógrafas con su pronunciación."
  },
  {
    "id": "3.2.1",
    "nombre": "Al recibir el foco",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Recibir el foco no provoca cambios de contexto inesperados.",
    "ayuda": "Usuarios de teclado y de lector de pantalla.",
    "caso": "Un menú desplegable de provincias.",
    "bien": "Al tabular a él no pasa nada hasta que el usuario actúa.",
    "mal": "Al recibir el foco abre una ventana nueva.",
    "comprobar": "Tabula por todos los elementos y observa si algo cambia solo."
  },
  {
    "id": "3.2.2",
    "nombre": "Al recibir entradas",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Cambiar el valor de un campo no provoca un cambio de contexto sin avisar.",
    "ayuda": "Usuarios de teclado, lector de pantalla y personas con dificultades cognitivas.",
    "caso": "Un selector de idioma.",
    "bien": "Hay un botón «Cambiar idioma» tras elegir la opción.",
    "mal": "La página se recarga en otro idioma al moverte con flechas por la lista.",
    "comprobar": "Cambia valores en selects, radios y casillas y comprueba si algo inesperado ocurre."
  },
  {
    "id": "3.2.3",
    "nombre": "Navegación coherente",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los menús repetidos aparecen en el mismo orden en todas las páginas.",
    "ayuda": "Personas con baja visión o dificultades cognitivas.",
    "caso": "El menú principal de un ayuntamiento.",
    "bien": "El menú es igual en todas las secciones.",
    "mal": "El orden de las opciones cambia de una sección a otra.",
    "comprobar": "Compara el orden de la navegación en varias páginas."
  },
  {
    "id": "3.2.4",
    "nombre": "Identificación coherente",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los elementos con la misma función se identifican igual en todo el sitio.",
    "ayuda": "Usuarios de lector de pantalla y personas con dificultades cognitivas.",
    "caso": "El icono de búsqueda en distintas páginas.",
    "bien": "Siempre se llama «Buscar».",
    "mal": "En una página «Buscar», en otra «Encontrar» y en otra «Lupa».",
    "comprobar": "Revisa nombres de iconos y botones repetidos."
  },
  {
    "id": "3.2.5",
    "nombre": "Cambio a petición",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Los cambios de contexto solo ocurren cuando el usuario los pide.",
    "ayuda": "Personas ciegas o con discapacidad cognitiva.",
    "caso": "Los enlaces no abren ventanas nuevas sin avisar."
  },
  {
    "id": "3.2.6",
    "nombre": "Ayuda coherente",
    "nivel": "A",
    "nuevo": true,
    "descripcion": "Si hay mecanismos de ayuda (teléfono, chat, contacto), aparecen en el mismo sitio relativo en todas las páginas.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "Un formulario de varios pasos de una aseguradora.",
    "bien": "El enlace «¿Necesitas ayuda?» está siempre en el pie, en la misma posición.",
    "mal": "El teléfono de ayuda aparece solo en algunos pasos y en lugares distintos.",
    "comprobar": "Recorre las páginas y anota dónde está la ayuda."
  },
  {
    "id": "3.3.1",
    "nombre": "Identificación de errores",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los errores de entrada se detectan y se describen en texto.",
    "ayuda": "Personas ciegas y con dificultades cognitivas.",
    "caso": "Un formulario de registro.",
    "bien": "«El DNI debe tener 8 números y una letra», junto al campo y anunciado.",
    "mal": "Solo aparece un borde rojo, o «Error en el formulario» sin decir dónde.",
    "comprobar": "Envía el formulario con errores y escucha qué anuncia el lector de pantalla."
  },
  {
    "id": "3.3.2",
    "nombre": "Etiquetas o instrucciones",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los campos tienen etiquetas o instrucciones claras.",
    "ayuda": "Todas las personas, especialmente con discapacidad cognitiva o visual.",
    "caso": "Un campo de fecha de nacimiento.",
    "bien": "Etiqueta visible «Fecha de nacimiento (dd/mm/aaaa)».",
    "mal": "Solo un placeholder que desaparece al escribir.",
    "comprobar": "Revisa que cada campo tiene etiqueta visible y formato indicado."
  },
  {
    "id": "3.3.3",
    "nombre": "Sugerencias ante errores",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Si se detecta un error y se sabe cómo corregirlo, se sugiere la corrección.",
    "ayuda": "Personas con discapacidad cognitiva o de aprendizaje.",
    "caso": "Un campo de email con un error de dominio.",
    "bien": "«¿Quisiste decir nombre@gmail.com?»",
    "mal": "«Email no válido» sin más.",
    "comprobar": "Provoca errores comunes y valora si los mensajes ayudan a corregirlos."
  },
  {
    "id": "3.3.4",
    "nombre": "Prevención de errores (legales, financieros, datos)",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "En compras, contratos, transferencias o envío de datos, se puede revisar, corregir o deshacer.",
    "ayuda": "Todas las personas, en especial con discapacidad cognitiva o motora.",
    "caso": "Una transferencia bancaria online.",
    "bien": "Pantalla de resumen «Vas a enviar 250 € a…» con opción de modificar antes de confirmar.",
    "mal": "La transferencia se ejecuta al primer clic sin resumen.",
    "comprobar": "Revisa los procesos con efectos legales o económicos."
  },
  {
    "id": "3.3.5",
    "nombre": "Ayuda",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Hay ayuda contextual disponible.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "Cada campo de un formulario fiscal tiene un enlace «¿Qué es esto?»."
  },
  {
    "id": "3.3.6",
    "nombre": "Prevención de errores (todos)",
    "nivel": "AAA",
    "nuevo": false,
    "descripcion": "Cualquier envío de datos se puede revisar, corregir o deshacer.",
    "ayuda": "Todas las personas.",
    "caso": "Cualquier formulario muestra un resumen antes de enviar."
  },
  {
    "id": "3.3.7",
    "nombre": "Entrada redundante",
    "nivel": "A",
    "nuevo": true,
    "descripcion": "No se vuelve a pedir información que el usuario ya dio en el mismo proceso; se rellena sola o se puede seleccionar.",
    "ayuda": "Personas con problemas de memoria o dificultades motoras.",
    "caso": "Un checkout pide dirección de envío y de facturación.",
    "bien": "Casilla «La dirección de facturación es la misma que la de envío».",
    "mal": "Hay que escribir la dirección completa dos veces.",
    "comprobar": "Recorre los procesos de varios pasos buscando datos repetidos."
  },
  {
    "id": "3.3.8",
    "nombre": "Autenticación accesible (mínimo)",
    "nivel": "AA",
    "nuevo": true,
    "descripcion": "El inicio de sesión no exige pruebas cognitivas como recordar o transcribir, salvo que haya alternativa.",
    "ayuda": "Personas con dislexia, problemas de memoria o discapacidad cognitiva.",
    "caso": "El acceso a la banca online.",
    "bien": "Se permite pegar la contraseña, usar el gestor de contraseñas o un enlace mágico.",
    "mal": "Se bloquea el pegado en el campo de contraseña o se exige un CAPTCHA de texto distorsionado.",
    "comprobar": "Prueba a pegar contraseñas y usar el gestor; revisa los CAPTCHA."
  },
  {
    "id": "3.3.9",
    "nombre": "Autenticación accesible (mejorada)",
    "nivel": "AAA",
    "nuevo": true,
    "descripcion": "El inicio de sesión no exige pruebas cognitivas, ni siquiera reconocer objetos.",
    "ayuda": "Personas con discapacidad cognitiva.",
    "caso": "Acceso con passkey o enlace por correo, sin CAPTCHA de imágenes."
  },
  {
    "id": "4.1.1",
    "nombre": "Procesamiento (obsoleto)",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Exigía un HTML sin errores de anidación ni identificadores duplicados. En WCAG 2.2 se ha eliminado porque los navegadores ya corrigen esos errores. En la EN 301 549 v3.2.1 todavía figura.",
    "descripcionCorta": "Pedía HTML sin errores de anidación ni ids duplicados. WCAG 2.2 lo elimina, pero sigue en la EN 301 549 v3.2.1.",
    "ayuda": "Usuarios de tecnologías de apoyo.",
    "caso": "Una web con dos elementos que comparten el mismo id.",
    "bien": "Identificadores únicos y HTML válido, como buena práctica.",
    "mal": "IDs duplicados que rompen la relación entre etiquetas y campos.",
    "comprobar": "Valida el HTML; los problemas reales se cubren hoy en 1.3.1 y 4.1.2."
  },
  {
    "id": "4.1.2",
    "nombre": "Nombre, función, valor",
    "nivel": "A",
    "nuevo": false,
    "descripcion": "Los componentes de interfaz exponen a la tecnología de apoyo su nombre, su rol y su estado.",
    "ayuda": "Usuarios de lector de pantalla y control por voz.",
    "caso": "Un acordeón hecho a medida en una página de preguntas frecuentes.",
    "bien": "Usa un botón con aria-expanded=\"true/false\" o el elemento details nativo.",
    "mal": "Un div clicable que el lector anuncia como texto plano, sin estado.",
    "comprobar": "Inspecciona cada componente personalizado en el árbol de accesibilidad."
  },
  {
    "id": "4.1.3",
    "nombre": "Mensajes de estado",
    "nivel": "AA",
    "nuevo": false,
    "descripcion": "Los mensajes de estado se anuncian sin mover el foco.",
    "ayuda": "Usuarios de lector de pantalla.",
    "caso": "Al añadir un producto al carrito aparece «Producto añadido».",
    "bien": "El mensaje está en una región aria-live o role=\"status\", y se anuncia.",
    "mal": "El mensaje aparece en pantalla pero el lector de pantalla no lo dice.",
    "comprobar": "Activa un lector de pantalla y lanza acciones que muestren avisos."
  }
];
