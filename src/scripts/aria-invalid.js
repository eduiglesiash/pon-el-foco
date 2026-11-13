// Error de formulario: al enviar se marca el campo con aria-invalid y el mensaje,
// unido con aria-describedby, se lee al volver al campo.
for (const form of document.querySelectorAll("[data-demo-invalid]")) {
  const campo = form.querySelector("input");
  const error = document.getElementById(form.dataset.demoInvalid);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = /^\d{5}$/.test(campo.value.trim());
    campo.setAttribute("aria-invalid", String(!ok));
    error.textContent = ok ? "" : "El código postal tiene que tener 5 cifras, por ejemplo 08001.";
    if (!ok) campo.focus();
  });
}
