# Flexi MVP

Flexi MVP is a frontend application for managing flexible memberships, venue operations, and marketplace flows.

The current build includes:

- marketing and landing pages
- a client area for memberships, marketplace activity, transactions, and wallet views
- a venue area for dashboards, membership management, sales, resales, and access validation
- public venue pages

The project is currently frontend-only and relies on mock data from `src/data`.

## Tech stack

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts
- Leaflet

## Requirements

- Node.js 18+
- npm

## Getting started

```sh
npm install
npm run dev
```

The development server runs on [http://localhost:5173](http://localhost:5173).

## Available scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build in `dist/`
- `npm run build:dev` creates a development-mode build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint
- `npm run test` runs Vitest once
- `npm run test:watch` runs Vitest in watch mode

## Project structure

- `src/App.tsx` contains the route map
- `src/pages` contains page-level screens
- `src/components` contains shared UI, layout, and feature components
- `src/data` contains mock datasets used by the interface
- `public` contains static files served directly

## Main routes

- `/` and `/landing-*` for public landing pages
- `/client/*` for user-facing membership flows
- `/venue/*` for venue management flows
- `/venues/:slug` for public venue pages

## Testing

Vitest is available for unit and component tests. Playwright configuration is included for browser automation.
