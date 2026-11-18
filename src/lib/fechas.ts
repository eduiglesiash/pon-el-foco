import { execFileSync } from "node:child_process";
import { CRITERIOS, slug } from "../data/criterios";

// Fecha de última modificación de cada página, sacada del historial de git en el build.
// La usan el sitemap (<lastmod>), los datos estructurados (dateModified) y el aviso visible «Actualizado el…».

/** Archivos de los que sale el contenido de cada ficha de criterio */
const FICHA = ["src/pages/criterios/[id].astro", "src/data/criterios.ts", "src/data/ejemplos.ts"];

/** Cada ruta con los archivos de los que sale su contenido */
export const RUTAS: [string, string[]][] = [
  ["/", ["src/pages/index.astro", "src/components/Hero.astro"]],
  ["/criterios/", ["src/pages/criterios/index.astro", "src/data/criterios.ts"]],
  ["/componentes/", ["src/pages/componentes.astro", "src/components/ComponentEntry.astro", "src/data/componentes.ts"]],
  ["/aria/", ["src/pages/aria.astro", "src/components/AriaEntry.astro", "src/data/aria.ts"]],
  ["/alt/", ["src/pages/alt.astro", "src/data/arbol-alt.ts"]],
  ["/me-afecta/", ["src/pages/me-afecta.astro", "src/components/Comprobador.astro", "src/data/comprobador.ts"]],
  ["/normativa/", ["src/pages/normativa.astro", "src/components/Normativa.astro"]],
  ...CRITERIOS.map((c): [string, string[]] => [`/criterios/${slug(c.id)}/`, FICHA]),
];
const ARCHIVOS = new Map(RUTAS);

function git(args: string[]): string | undefined {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return undefined;
  }
}

// Con un clon superficial (lo habitual en un despliegue) solo existe el último commit y todas las páginas
// tendrían la misma fecha, que no dice nada. En ese caso no se pone fecha.
const historialCompleto = git(["rev-parse", "--is-shallow-repository"]) === "false";
const cache = new Map<string, string | undefined>();

/** Fecha (AAAA-MM-DD) del último commit que tocó el contenido de esta ruta, o undefined si no se puede saber */
export function fechaModificacion(ruta: string): string | undefined {
  const archivos = ARCHIVOS.get(ruta);
  if (!archivos || !historialCompleto) return undefined;
  const clave = archivos.join("|");
  if (!cache.has(clave)) {
    const iso = git(["log", "-1", "--format=%cs", "--", ...archivos]);
    cache.set(clave, iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : undefined);
  }
  return cache.get(clave);
}

/** «2026-11-15» → «15 de noviembre de 2026» */
export function fechaLarga(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
