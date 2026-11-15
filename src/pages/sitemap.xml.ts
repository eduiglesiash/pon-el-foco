import type { APIRoute } from "astro";
import { execFileSync } from "node:child_process";
import { CRITERIOS, slug } from "../data/criterios";

// Sitemap generado en el build, sin dependencias: las páginas fijas y una por criterio.
// Cada ruta lleva los archivos de los que sale su contenido; <lastmod> es la fecha del último commit que tocó alguno.
const FICHA = ["src/pages/criterios/[id].astro", "src/data/criterios.ts", "src/data/ejemplos.ts"];
const RUTAS: [string, string[]][] = [
  ["/", ["src/pages/index.astro", "src/components/Hero.astro"]],
  ["/criterios/", ["src/pages/criterios/index.astro", "src/data/criterios.ts"]],
  ["/componentes/", ["src/pages/componentes.astro", "src/components/ComponentEntry.astro", "src/data/componentes.ts"]],
  ["/aria/", ["src/pages/aria.astro", "src/components/AriaEntry.astro", "src/data/aria.ts"]],
  ["/alt/", ["src/pages/alt.astro", "src/data/arbol-alt.ts"]],
  ["/me-afecta/", ["src/pages/me-afecta.astro", "src/components/Comprobador.astro", "src/data/comprobador.ts"]],
  ["/normativa/", ["src/pages/normativa.astro", "src/components/Normativa.astro"]],
  ...CRITERIOS.map((c): [string, string[]] => [`/criterios/${slug(c.id)}/`, FICHA]),
];

/** Fecha (AAAA-MM-DD) del último commit que tocó estos archivos. Sin git (o sin historial) no se pone lastmod. */
function fecha(archivos: string[]): string | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...archivos], { encoding: "utf8" }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : undefined;
  } catch {
    return undefined;
  }
}

export const GET: APIRoute = ({ site }) => {
  const cache = new Map<string, string | undefined>();
  const urls = RUTAS.map(([ruta, archivos]) => {
    const clave = archivos.join("|");
    if (!cache.has(clave)) cache.set(clave, fecha(archivos));
    const lastmod = cache.get(clave);
    return `  <url><loc>${new URL(ruta, site).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
  }).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
