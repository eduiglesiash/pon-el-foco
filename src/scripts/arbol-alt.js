// Árbol «¿Qué alt le pongo?». Sin JavaScript, cada respuesta es un enlace a la siguiente sección y todo se ve.
// Con JavaScript, la URL (#id) dice dónde estás: se muestra solo ese punto y, encima, el recorrido que lleva a él.
// Responder, «Cambiar», «Pregunta anterior» y «Empezar de nuevo» son enlaces, así que el botón Atrás del navegador también retrocede.

const datosEl = document.getElementById("arbol-alt-datos");
const recorrido = document.querySelector("[data-recorrido]");

if (datosEl && recorrido) {
  const { raiz, padres, titulos, respuestas } = JSON.parse(datosEl.textContent);
  const actual = recorrido.querySelector("[data-actual]");
  const marcador = actual.querySelector("[data-marcador]");
  const nodos = Array.from(actual.querySelectorAll("[data-nodo]"));

  /** Lista de [pregunta, índice de respuesta] desde la raíz hasta el nodo */
  function camino(id) {
    const pasos = [];
    for (let p = padres[id]; p; p = padres[p.id]) pasos.unshift([p.id, p.respuesta]);
    return pasos;
  }

  /** Nodo a mostrar: el de la URL si existe; si no, la primera pregunta */
  const nodoDeLaUrl = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    return titulos[id] ? id : raiz;
  };

  /** Respuesta elegida antes en cada pregunta, para marcarla al volver a ella */
  const elegidas = {};

  function pintar({ foco }) {
    const id = nodoDeLaUrl();
    const pasos = camino(id);
    for (const [p, r] of pasos) elegidas[p] = r;
    // Al cambiar una respuesta se descartan las decisiones de las ramas que ya no se recorren
    for (const p of Object.keys(elegidas)) if (p !== id && !pasos.some(([q]) => q === p)) delete elegidas[p];

    // Pasos hechos: pregunta, respuesta y «Cambiar»
    recorrido.querySelectorAll("[data-paso]").forEach((li) => li.remove());
    pasos.forEach(([p, r], i) => {
      const li = document.createElement("li");
      li.className = "route-stop";
      li.dataset.state = "done";
      li.dataset.paso = "";
      li.innerHTML = `
        <span class="route-marker" aria-hidden="true">${i + 1}</span>
        <p class="route-q"></p>
        <p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span><span class="text-muted">Tu respuesta: </span><b></b></span>
          <a class="route-change no-underline">Cambiar<span class="sr-only"></span></a>
        </p>`;
      li.querySelector(".route-q").textContent = titulos[p];
      li.querySelector("b").textContent = respuestas[p][r];
      const cambiar = li.querySelector("a");
      cambiar.href = `#${p}`;
      cambiar.querySelector(".sr-only").textContent = ` la respuesta a «${titulos[p]}»`;
      recorrido.insertBefore(li, actual);
    });

    // Punto actual: su número en el recorrido, o un marcador cuadrado si es la conclusión
    const conclusion = id.startsWith("c-");
    marcador.textContent = conclusion ? "" : String(pasos.length + 1);
    marcador.classList.toggle("route-marker-end", conclusion);
    for (const n of nodos) n.hidden = n.id !== id;
    const visible = nodos.find((n) => n.id === id);
    visible.querySelectorAll("[data-respuesta]").forEach((a) => {
      const anterior = elegidas[id] === Number(a.dataset.respuesta);
      a.querySelector("[data-anterior]").hidden = !anterior;
      a.classList.toggle("border-ink", anterior);
      a.classList.toggle("bg-sunk", anterior);
    });

    if (foco) visible.querySelector("h3").focus();
  }

  // Al abrir la página no se mueve el foco; después, cada cambio de punto lo lleva al título nuevo
  pintar({ foco: false });
  addEventListener("hashchange", () => pintar({ foco: true }));
}
