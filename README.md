# Products

Monorepo base administrado con Turborepo y npm.

## Estructura

- `apps/`: aplicaciones del monorepo.
- `packages/`: paquetes y configuraciones compartidas.

Ambas carpetas están vacías inicialmente y listas para recibir nuevos workspaces.

## Requisitos

- Node.js 18 o superior.
- npm 10 u 11.

## Comandos

```sh
npm run dev
npm run build
npm run lint
npm run check-types
npm run format
```

Las tareas de Turborepo se ejecutan únicamente en los workspaces que definan el script correspondiente.
