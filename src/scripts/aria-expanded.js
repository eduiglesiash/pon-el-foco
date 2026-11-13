// Mostrar y ocultar: el botón dice si el bloque que controla está abierto (aria-expanded)
// y el bloque se oculta con hidden, que también lo saca del lector de pantalla.
for (const b of document.querySelectorAll("[data-demo-expanded]")) {
  const panel = document.getElementById(b.getAttribute("aria-controls"));
  b.addEventListener("click", () => {
    const abierto = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", String(!abierto));
    panel.hidden = abierto;
  });
}
