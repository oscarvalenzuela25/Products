## Local skills

Project-specific skills live in `skills/<skill-name>/SKILL.md`. Read the selected `SKILL.md` completely before making related changes. Use the smallest set that covers the task, and combine skills when their concerns overlap.

### Skill routing

- `create-component`: use before creating or modifying any component, section, layout, or React island. It defines the Astro-first structure, TypeScript conventions, styled-components import, hydration rules, and theme selection.
- `astro`: use for `.astro` files, pages, layouts, routing, SSG/SSR, content collections, Astro configuration, server/client boundaries, slots, and island directives.
- `frontend-design`: use when creating a new interface or materially changing visual design, layout, responsive behavior, typography, spacing, colors, or interaction polish.
- `accessibility`: use for visible UI and interaction changes involving semantics, forms, controls, keyboard behavior, focus, images, contrast, ARIA, or explicit WCAG/a11y audits.
- `seo`: use for pages, layouts, public content, metadata, canonical URLs, structured data, indexability, sitemap, or explicit search optimization work.
- `typescript-advanced-types`: use only when the task requires non-trivial generics, conditional or mapped types, reusable type utilities, discriminated APIs, or complex compile-time guarantees. Do not load it for routine prop interfaces.
- `react-best-practices`: use when creating, reviewing, or optimizing React `.tsx` islands, client data flows, hydration, bundle size, rerenders, or React performance. Apply only React-relevant guidance and ignore Next.js-specific patterns.
- `composition-patterns`: use when a React island or reusable React API is becoming difficult to compose, especially with boolean-prop proliferation, compound components, render props, or context. Prefer Astro slots for static cross-component composition.

### Common combinations

- New static component: `create-component` + `astro`; add `frontend-design` for new visual work and `accessibility` for rendered UI.
- New page or public landing section: `create-component` + `astro` + `frontend-design` + `accessibility` + `seo`.
- Interactive React island: `create-component` + `astro` + `react-best-practices` + `accessibility`; add `composition-patterns` only for a non-trivial reusable API.
- Complex typed component API: add `typescript-advanced-types` to the relevant combination.
- Styling-only refinement: `frontend-design` + `accessibility`; also use `create-component` when changing component structure or styled-components.

### Project precedence

- Keep the project Astro-first. Use React only for the smallest interactive island that needs it.
- Project conventions in `create-component` override generic React or Next.js assumptions from imported skills.
- Do not introduce MUI. Use `styled-components` only in React `.tsx` files with `import { styled } from "styled-components";`.
- Use `src/styles/theme.ts` for main/shared UI and `src/demos/<demo>/styles/theme.ts` for UI owned by a demo.
- Use `.ts` without JSX, `.tsx` with React JSX, and `.astro` for Astro components. Do not create `.js` or `.jsx` source files.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
