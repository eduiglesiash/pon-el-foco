import type { APIRoute } from "astro";
import { CRITERIOS, PRINCIPIOS, slug } from "../data/criterios";
import { NATIVOS, A_MEDIDA } from "../data/componentes";
import { ENTRADAS } from "../data/aria";

/**
 * Índice para agentes de IA (https://llmstxt.org): qué hay en la web y dónde, en Markdown.
 * Se genera en la build con los mismos datos que las páginas, así que no se desactualiza.
 */
export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const lineas = [
    "# Pon el foco",
    "",
    "> Accesibilidad web y WCAG en español: la normativa de España y la UE (RD 1112/2018, Ley 11/2023, EN 301 549) y los criterios WCAG 2.2 explicados con ejemplos de código, componentes accesibles, atributos ARIA y una herramienta para decidir el texto alternativo de las imágenes. Contenido orientativo; no sustituye al asesoramiento jurídico.",
    "",
    "## Secciones",
    `- [Criterios WCAG 2.2](${url("/criterios/")}): los criterios de nivel A, AA y AAA con buscador y filtros.`,
    `- [Componentes accesibles](${url("/componentes/")}): elementos HTML nativos y componentes a medida (pestañas, interruptor, menú, autocompletar, carrusel) con código y teclado.`,
    `- [WAI-ARIA, bien usado](${url("/aria/")}): los atributos y roles ARIA más usados, cuándo usarlos y cuándo no, con código correcto e incorrecto.`,
    `- [¿Qué alt le pongo?](${url("/alt/")}): árbol de decisión, basado en el del W3C, para elegir el texto alternativo de una imagen, icono o gráfica.`,
    `- [¿Me afecta?](${url("/me-afecta/")}): comprobador de qué normas de accesibilidad aplican a una organización.`,
    `- [Normativa](${url("/normativa/")}): leyes, plazos, sanciones, declaración de accesibilidad y enlaces oficiales.`,
    "",
    ...Object.entries(PRINCIPIOS).flatMap(([n, nombre]) => [
      `## Criterios: ${n}. ${nombre}`,
      ...CRITERIOS.filter((c) => c.id.startsWith(`${n}.`)).map(
        (c) => `- [${c.id} ${c.nombre} (${c.nivel})](${url(`/criterios/${slug(c.id)}/`)})`,
      ),
      "",
    ]),
    "## Componentes",
    ...[...NATIVOS, ...A_MEDIDA].map((c) => `- [${c.nombre}](${url(`/componentes/#${c.id}`)}): ${c.intro}`),
    "",
    "## Atributos y roles ARIA",
    ...ENTRADAS.map((e) => `- [${e.nombre}](${url(`/aria/#${e.id}`)})`),
    "",
    "## Optional",
    `- [Sitemap](${url("/sitemap.xml")})`,
    `- [Capacidades de la web para agentes](${url("/skill.md")})`,
    "",
  ];
  return new Response(lineas.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
