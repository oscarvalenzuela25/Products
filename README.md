# Products

Repositorio que agrupa aplicaciones npm independientes.

## Estructura

- `apps/blog-client`: frontend Astro del blog.
- `apps/blog-cms`: CMS Strapi del blog.

Cada aplicación administra su propio `package.json`, `package-lock.json` y
`node_modules`. La raíz no comparte dependencias ni utiliza npm workspaces o
Turborepo; su `package.json` solamente ofrece accesos directos a los comandos
de cada aplicación.

## Requisitos

- Node.js 22.12 o superior.
- npm 10 u 11.

## Instalación

Para instalar ambas aplicaciones desde la raíz:

```sh
npm run install:all
```

También pueden instalarse individualmente:

```sh
npm run install:blog-client
npm run install:blog-cms
```

## Desarrollo

Ejecuta cada aplicación en una terminal independiente:

```sh
npm run dev:blog-client
npm run dev:blog-cms
```

## Builds

```sh
npm run build
npm run build:blog-client
npm run build:blog-cms
```
