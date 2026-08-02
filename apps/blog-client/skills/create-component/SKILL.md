---
name: create-component
description: Crear o modificar componentes, secciones, layouts e islas interactivas de blog-client con Astro, React 19, TypeScript estricto y styled-components. Usar antes de trabajar en cualquier componente o diseño del proyecto, especialmente al decidir entre un componente .astro y una isla React .tsx, aplicar el theme principal o el theme de una demo, estructurar props, estilos, composición, hidratación y datos.
---

# Crear componentes en blog-client

## Principios del proyecto

- Usar Astro como opción predeterminada para markup, layouts, páginas y UI estática.
- Usar React solamente cuando el componente necesite estado cliente, eventos complejos, APIs del navegador o una librería exclusiva de React.
- Escribir TypeScript: `.ts` para archivos sin JSX, `.tsx` para React con JSX y `.astro` para componentes Astro. No crear `.js` ni `.jsx`.
- Mantener la isla React tan pequeña como sea posible. No convertir una página completa a React por una interacción localizada.
- No usar MUI. Mantener su nomenclatura de color mediante los objetos `theme` locales.
- No introducir paquetes ausentes del `package.json`. Usar las APIs nativas de Astro, React y `fetch` antes de agregar dependencias.
- Mantener archivos nuevos con finales de línea LF.

## Flujo obligatorio

1. Inspeccionar el componente consumidor, la ubicación destino, las dependencias y el theme aplicable.
2. Elegir `.astro` o `.tsx` mediante las reglas de esta skill.
3. Reutilizar componentes y tokens existentes antes de crear variantes nuevas.
4. Implementar props tipadas, HTML semántico, estados accesibles y estilos responsivos.
5. Agregar una directiva `client:*` solamente cuando exista una razón de hidratación.
6. Validar el comportamiento y ejecutar el build proporcionalmente al cambio. Separar errores preexistentes de errores introducidos.

## Pattern 1: Estructura del componente

### Componente Astro predeterminado

```text
XComponent/
├── XComponent.astro
├── types.ts              # opcional: tipos compartidos
└── components/           # opcional: subcomponentes reales
```

- Preferir estilos `<style>` scoped dentro de `XComponent.astro`.
- Importar el archivo `.astro` directamente. Crear `index.ts` solo si el directorio ya sigue un patrón de barrels.
- Omitir carpetas y archivos vacíos.

### Isla React interactiva

```text
XComponent/
├── XComponent.tsx
├── styles.ts             # styled-components, si corresponde
├── types.ts              # opcional: tipos compartidos
├── hooks/                # opcional: lógica cliente reutilizable
│   └── useXComponent.ts
└── index.ts              # opcional: export público del folder
```

- Nombrar componentes y carpetas en PascalCase.
- Nombrar hooks en camelCase con prefijo `use`.
- Declarar styled-components a nivel de módulo, nunca dentro del render.
- Mantener la obtención de datos del servidor fuera de la isla cuando Astro pueda resolverla.

## Pattern 2: Elegir Astro o React

Usar `.astro` para:

- Contenido estático, SEO, secciones, cards, headers, footers y layouts.
- Composición mediante `<slot />`.
- Datos disponibles durante build o request en el frontmatter.
- Estilos que no necesitan runtime de JavaScript.

Usar `.tsx` para:

- Estado local con hooks.
- Eventos complejos o interacción persistente.
- Acceso a `window`, `document`, `localStorage` u otras APIs del navegador.
- Una dependencia que requiera React.

No usar un wrapper React global para resolver composición, layout o theming de una página Astro. Cada componente hidratado es una isla independiente y el contexto React no cruza sus límites. Usar layouts y slots de Astro para la estructura de la página.

## Pattern 3: Componente Astro tipado

```astro
---
import theme from "../../styles/theme";

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<section class="card">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</section>

<style define:vars={{ primaryColor: theme.primary.main }}>
  .card {
    color: var(--primaryColor);
  }
</style>
```

- Declarar `interface Props` en el frontmatter cuando los tipos solo pertenecen al componente.
- Mover tipos a `types.ts` solamente cuando los compartan varios archivos.
- Usar HTML semántico antes de agregar roles ARIA.
- Usar `<slot />` para contenido compuesto en Astro.

## Pattern 4: React y styled-components

Importar siempre `styled` como export nombrado:

```tsx
import type { ButtonHTMLAttributes } from "react";
import { styled } from "styled-components";
import theme from "../../styles/theme";

const StyledButton = styled.button({
  padding: "10px 20px",
  border: 0,
  borderRadius: "5px",
  backgroundColor: theme.primary.main,
  color: theme.primary.contrastText,
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children = "Button", ...props }: ButtonProps) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
```

- Usar `import { styled } from "styled-components";`. No usar el import default.
- Crear styled-components fuera del cuerpo del componente.
- Extender los atributos nativos cuando el componente represente un elemento HTML.
- Propagar `...props` al elemento correcto.
- Usar props transientes para estilos internos: `$active`, `$variant`, `$expanded`. No enviarlas al DOM sin el prefijo `$`.
- No usar PropTypes; TypeScript define el contrato.
- No usar `ThemeProvider` como wrapper global de Astro. Importar el theme adecuado directamente en `styles.ts`.
- Para UI puramente estática, preferir `.astro` con `<style>` scoped. Un componente basado en styled-components debe hidratarse para que su runtime de estilos esté disponible en el navegador.

### Hidratación desde Astro

```astro
---
import Button from "../components/Button";
---

<Button client:load type="button">Abrir menú</Button>
```

Elegir la directiva más tardía compatible con la experiencia:

- `client:load`: interacción necesaria inmediatamente.
- `client:idle`: interacción que puede esperar a que el navegador esté libre.
- `client:visible`: widgets que pueden hidratarse al entrar al viewport.
- `client:media`: interacción condicionada a un media query.
- `client:only="react"`: usar únicamente cuando el componente no pueda renderizarse en servidor.

No agregar una directiva `client:*` a componentes Astro.

## Pattern 5: Selección del theme

El proyecto conserva tokens con nomenclatura inspirada en MUI, pero no usa MUI.

- Componente principal o compartido: importar `src/styles/theme.ts`.
- Componente dentro de `src/demos/<demo>/`: importar `src/demos/<demo>/styles/theme.ts`.
- En la demo `nutritionist`: usar `src/demos/nutritionist/styles/theme.ts`.
- Resolver la ruta relativa desde el archivo actual; no copiar ciegamente la ruta de un ejemplo.
- No importar el theme principal dentro de una demo si esa demo tiene theme propio.
- No acoplar un componente compartido al theme de una demo. En ese caso usar el theme principal o recibir un valor semántico explícito.

Usar los tokens existentes antes de escribir valores de color:

```ts
theme.primary.main;
theme.primary.contrastText;
theme.text.primary;
theme.background.default;
theme.border.default;
theme.grey[500];
```

No asumir `theme.palette`: inspeccionar `theme.ts` y seguir su estructura exportada. No agregar colores nuevos dentro de un componente si pertenecen al sistema visual; agregarlos al theme correspondiente.

## Pattern 6: Datos y límites de ejecución

- Usar `fetch` en el frontmatter Astro para datos de build/servidor.
- Usar endpoints o actions de Astro cuando se necesite una frontera servidor-cliente.
- Usar `fetch` dentro de React solo para acciones iniciadas en el cliente o datos que deban refrescarse allí.
- No acceder a `window`, `document` o `localStorage` desde frontmatter Astro.
- No instalar Axios, React Query u otra capa de datos sin una necesidad explícita.
- Separar lógica reutilizable en `.ts`; usar `.tsx` solo cuando el archivo contenga JSX.

## Pattern 7: Guardrails

- Usar keys primitivas y estables en listas. Evitar índices salvo contenido estático sin reordenamiento.
- No recrear componentes, objetos de configuración pesados ni styled-components dentro del render.
- Evitar props booleanas que multipliquen variantes; usar composición o una prop discriminada cuando la API crezca.
- No pasar objetos no renderizables como children.
- Mantener elementos interactivos accesibles por teclado y con nombre accesible.
- Proporcionar dimensiones y texto alternativo apropiado a imágenes.
- Evitar hidratar contenido que Astro puede producir como HTML estático.
- Mantener estilos responsive desde mobile y comprobar estados hover, focus-visible, disabled y loading cuando correspondan.

## Árbol de decisión

```text
¿Es UI estática, layout o contenido SEO?
└─ Sí → XComponent.astro + estilos scoped + theme mediante define:vars.

¿Necesita estado, eventos complejos o APIs del navegador?
└─ Sí → XComponent.tsx como isla React + la directiva client:* mínima.

¿Usa styled-components?
└─ Sí → styles.ts + import { styled } + import directo del theme correcto.

¿Está dentro de una demo?
└─ Sí → usar el theme de esa demo, no el principal.

¿Los tipos se comparten?
└─ Sí → types.ts; si no, mantenerlos junto al componente.

¿La lógica no contiene JSX?
└─ Sí → archivo .ts, no .tsx.
```

## Validación

Desde `apps/blog-client`:

```bash
npm run build
```

Desde la raíz del monorepo:

```bash
npm run build --workspace=blog-client
```

Además:

- Revisar el HTML generado o la ruta en el servidor de desarrollo.
- Comprobar consola del navegador cuando exista hidratación.
- Confirmar que no se agregó JavaScript cliente innecesario.
- Confirmar que el componente usa el theme correcto y no introduce colores duplicados.
- Si el build falla por una ruta o error preexistente no relacionado, documentarlo y verificar localmente el componente modificado.
