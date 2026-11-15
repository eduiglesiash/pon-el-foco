# Pon el foco: instrucciones para agentes

Web informativa en castellano sobre accesibilidad web: normativa de España y la UE, criterios WCAG 2.2, componentes accesibles, ARIA y una herramienta para el texto alternativo. Es Astro estático con Tailwind CSS v4.

**Las reglas del proyecto están en [CLAUDE.md](CLAUDE.md)** y se aplican a cualquier agente: la accesibilidad va antes que el diseño (WCAG 2.2 AA en cada cambio), el contenido legal se cita con fuente oficial, y se prefiere poco código y pocas dependencias.

## Estructura

```
src/
├── pages/        Una página por sección: index, criterios/, componentes, aria, alt, me-afecta, normativa
│                 y endpoints generados en la build: sitemap.xml.ts, llms.txt.ts
├── components/   Secciones y piezas reutilizables (CodeExample, AriaEntry, ComponentEntry…)
├── data/         Contenido como datos: criterios, ejemplos, componentes, aria, arbol-alt, comprobador
├── scripts/      JavaScript de las demos (el mismo que se muestra en la web con ?raw)
├── layouts/      Layout.astro (cabecera, pie, metadatos)
└── styles/       global.css: tokens de color (claro y oscuro) y estilos base
public/           robots.txt, skill.md, agent-permissions.json, favicon
openspec/         Especificaciones (specs/) y cambios planificados o archivados (changes/)
```

## Desarrollo

Scripts de `package.json`: `dev` (servidor local), `build` (genera `dist/`) y `preview` (sirve `dist/`).

No hay tests automáticos. Cada cambio se verifica con la build y en el navegador: con teclado, a 320 px de ancho, con el texto al 200 % y en modo claro y oscuro.

## Documentación

- [README.md](README.md): qué contiene cada sección.
- [CLAUDE.md](CLAUDE.md): decisiones del proyecto y reglas de accesibilidad.
- [DESIGN.md](DESIGN.md) y [PRODUCT.md](PRODUCT.md): sistema de diseño y producto.
- [openspec/specs/](openspec/specs/): requisitos de la sección ARIA y de la herramienta de alt.
- Fuentes de referencia: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/), [ARIA APG](https://www.w3.org/WAI/ARIA/apg/), [BOE](https://www.boe.es/).
