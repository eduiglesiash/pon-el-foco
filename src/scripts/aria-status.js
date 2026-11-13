// Mensaje de estado: la región role="status" ya está en la página al cargar, vacía.
// Al cambiar su texto, el lector lo anuncia sin mover el foco.
for (const b of document.querySelectorAll("[data-demo-status]")) {
  const region = document.getElementById(b.dataset.demoStatus);
  let n = 0;
  b.addEventListener("click", () => {
    n++;
    region.textContent = n === 1 ? "1 producto en el carrito." : `${n} productos en el carrito.`;
  });
}
