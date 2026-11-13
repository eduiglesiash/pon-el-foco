# Pon el foco

Accesibilidad web y WCAG en español.

Web informativa sobre la normativa de accesibilidad digital en España y la UE. Cada sección es una página:

- **Inicio** (`/`): qué es la web y qué se puede hacer en cada sección.
- **Criterios** (`/criterios/`): los criterios WCAG 2.2 en formato documentación, con buscador y filtros. Cada criterio tiene su página (`/criterios/1-4-3/`) con caso de uso, ejemplos de código correcto e incorrecto (A y AA) y cómo comprobarlo.
- **Componentes** (`/componentes/`): elementos HTML nativos y lo que dan de serie, y componentes a medida (pestañas, interruptor, autocompletar, carrusel…) con roles ARIA, teclado, código y demos en vivo.
- **ARIA** (`/aria/`): los atributos y roles de WAI-ARIA más usados (nombre, estados, relaciones, formularios, mensajes dinámicos, `aria-hidden` y diálogos): qué hacen, cuándo usarlos y cuándo no, código correcto e incorrecto, ejemplos de uso y demos en vivo.
- **¿Qué alt le pongo?** (`/alt/`): herramienta paso a paso, basada en el árbol de decisión del W3C, que lleva al texto alternativo adecuado para una imagen, icono o gráfica. Muestra el recorrido, permite volver atrás y cambiar cualquier respuesta, y cada conclusión tiene su URL, explicación y código. Funciona sin JavaScript.
- **¿Me afecta?** (`/me-afecta/`): comprobador de tres preguntas, por qué hacerlo aunque no obligue la ley, asistente con IA y preguntas frecuentes.
- **Normativa** (`/normativa/`): RD 1112/2018, Ley 11/2023, EN 301 549 y LSSI / Ley 56/2007, cronología, sanciones, declaración de accesibilidad y enlaces oficiales.

## Stack

Astro + Tailwind CSS v4, gestionado con pnpm. Las decisiones del proyecto (prioridad de la accesibilidad, política de dependencias…) están en [CLAUDE.md](CLAUDE.md).

## Estructura

```
src/pages/                   Una página por sección; criterios/[id].astro genera una página por criterio
src/layouts/Layout.astro     <head>, cabecera, <main>, pie y enlace «Saltar al contenido»
src/components/              Secciones y piezas reutilizables (CodeExample, ComponentEntry, PageHead…)
src/data/criterios.ts        Criterios WCAG 2.2 (tipados); los AAA solo llegan hasta el caso de uso
src/data/ejemplos.ts         Ejemplos de código de cada criterio A y AA
src/data/componentes.ts      Componentes nativos y a medida
src/data/w3c.ts              Enlace a «Understanding WCAG 2.2» de cada criterio
src/data/comprobador.ts      Lógica del comprobador «¿Me afecta?» (servidor y cliente)
src/data/asistente.ts        RULES: contexto normativo e instrucciones del asistente
src/scripts/                 JS de las demos; la página de componentes también muestra su código (?raw)
src/styles/global.css        Tokens de color (modo claro/oscuro), resaltado de código y estilos base
```

Los bloques de código usan el componente `<Code>` que trae Astro (sin dependencias nuevas) con el tema `css-variables`, mapeado a los tokens de color.

## Arrancar en local

```bash
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # genera dist/
pnpm preview   # sirve dist/
```

## El asistente de consultas

En la versión publicada en Claude el asistente usa `window.claude.use("sample")`, que solo existe dentro de un artefacto de claude.ai. **Abierto en local o en otro hosting, el chat aparece desactivado** y solo se ven las preguntas frecuentes.

Para que funcione fuera de Claude hay que sustituir la función `sample` de `src/components/Consultas.astro` por una llamada a un backend propio (por ejemplo, un endpoint que llame a la API de Anthropic con `RULES` como prompt de sistema). Nunca pongas la clave de la API en el JavaScript del navegador.

## Pendiente de revisar

- Cuando la EN 301 549 v4.1.1 se cite en el Diario Oficial de la UE (previsto a finales de 2026), actualizar la sección de normativa y las FAQ.
- El contenido es orientativo y no sustituye al asesoramiento jurídico.
