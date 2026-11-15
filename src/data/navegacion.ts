export type Enlace = { href: string; label: string };
/** Una sección con `hijos` se pinta en la cabecera como desplegable y en el pie como sus hijos sueltos. */
export type Seccion = Enlace & { hijos?: Enlace[] };

/** Herramientas interactivas: cuelgan de «Herramientas» en la cabecera. */
export const HERRAMIENTAS: Enlace[] = [{ href: "/alt/", label: "¿Qué alt le pongo?" }];

/** Secciones del sitio, en el orden en que aparecen en la cabecera y el pie. */
export const SECCIONES: Seccion[] = [
  { href: "/criterios/", label: "Criterios" },
  { href: "/componentes/", label: "Componentes" },
  { href: "/aria/", label: "ARIA" },
  // Sin JavaScript, «Herramientas» es un enlace a la primera herramienta
  { href: HERRAMIENTAS[0].href, label: "Herramientas", hijos: HERRAMIENTAS },
  { href: "/me-afecta/", label: "¿Me afecta?" },
  { href: "/normativa/", label: "Normativa" },
];
