import type { APIRoute } from "astro";
import { RUTAS, fechaModificacion } from "../lib/fechas";

// Sitemap generado en el build, sin dependencias: las páginas fijas y una por criterio.
// <lastmod> es la fecha del último commit que tocó el contenido de cada ruta (se omite si no hay historial completo).
export const GET: APIRoute = ({ site }) => {
  const urls = RUTAS.map(([ruta]) => {
    const lastmod = fechaModificacion(ruta);
    return `  <url><loc>${new URL(ruta, site).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
  }).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
