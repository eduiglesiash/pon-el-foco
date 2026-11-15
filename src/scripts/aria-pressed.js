// Botón de alternar: el botón ya responde a Enter y Espacio; solo hay que cambiar aria-pressed.
// El estilo de «pulsado» sale del atributo, así lo que se ve y lo que se anuncia van juntos.
for (const b of document.querySelectorAll("[data-demo-pressed]")) {
  b.addEventListener("click", () => {
    const pulsado = b.getAttribute("aria-pressed") === "true";
    b.setAttribute("aria-pressed", String(!pulsado));
  });
}
