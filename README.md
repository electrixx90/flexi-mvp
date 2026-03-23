# Flexi MVP

Flexi MVP is a frontend-first application for managing flexible memberships, venue operations, and marketplace flows.

This repo now also contains a minimal Node.js sponsorship backend that uses the official IOTA TypeScript SDK and implements one real sponsored transaction flow on the application side.

## What is in this repo

- marketing and landing pages
- a client area for memberships, marketplace activity, transactions, and wallet views
- a venue area for dashboards, membership management, sales, resales, and access validation
- public venue pages
- a minimal Express backend endpoint for sponsored IOTA transactions

## Tech stack

- React 18
- TypeScript
- Vite
- Node.js / Express
- IOTA TypeScript SDK (`@iota/iota-sdk`)
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts
- Leaflet

## Requirements

- Node.js 24+
- npm

## Getting started

Frontend development:

```sh
npm install
npm run dev
```

The Vite development server runs on [http://localhost:5173](http://localhost:5173).

## Sponsored transaction backend

### What it implements

The backend follows the IOTA sponsored transaction pattern documented for the TypeScript SDK:

1. Build the user action with `onlyTransactionKind`.
2. Reconstruct it with `Transaction.fromKind`.
3. Set `sender`, `gasOwner`, and `gasPayment`.
4. Sign the full sponsored transaction bytes with the sponsor key.
5. Return the sponsored transaction bytes and sponsor signature so the user wallet can add the second signature and submit.

This is a Gas Station-aligned custom backend flow. It is not a full production Gas Station deployment with operator tooling, quotas, persistence, or packaged infra.

### Endpoint

`POST /api/iota/sponsor-transaction`

Supported action type:

- `configured_move_call`

The backend supports one configured Move-call action. The deployed target is supplied through environment variables, so the MVP can call the existing on-chain package without copying that package into this repo.

### Environment variables

Use `.env.example` as the starting point.

Required:

- `IOTA_RPC_URL`
- one sponsor secret source:
  - `IOTA_SPONSOR_SECRET_KEY`
  - `IOTA_SPONSOR_PRIVATE_KEY`
  - `IOTA_SPONSOR_MNEMONIC`
- one sponsored target source:
  - `IOTA_SPONSORED_ACTION_TARGET`
  - or `IOTA_PACKAGE_ID` + `IOTA_MODULE_NAME` + `IOTA_FUNCTION_NAME`

Optional:

- `PORT`
- `IOTA_NETWORK`
- `IOTA_SPONSOR_DERIVATION_PATH`
- `IOTA_SPONSOR_ADDRESS`
- `IOTA_SPONSORED_ACTION_TYPE_ARGUMENTS`
- `IOTA_SPONSOR_MAX_GAS_COINS`
- `IOTA_SPONSOR_MIN_TOTAL_GAS_BALANCE`

### Run locally

If you want `.env` loading without exporting variables manually:

```sh
cp .env.example .env
npm run start:env
```

`npm start` also works if the environment variables are already exported in your shell.

### Example request

```sh
curl -X POST http://localhost:3033/api/iota/sponsor-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "userAddress": "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
    "actionType": "configured_move_call",
    "payload": {
      "arguments": [
        { "kind": "object", "value": "0xobject_id_used_by_your_move_call" },
        { "kind": "pure", "valueType": "u64", "value": "1" },
        { "kind": "pure", "valueType": "string", "value": "basic-plan" }
      ]
    }
  }'
```

### Example response

```json
{
  "ok": true,
  "actionType": "configured_move_call",
  "sender": "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
  "gasOwner": "0x99f4fbc4f17a1425dd8b50d7c403039bec2d1bdccf3d4f42d5cd0484391d4ed1",
  "rpcUrl": "https://api.testnet.iota.cafe",
  "network": "testnet",
  "target": "0xabc::memberships::mint",
  "typeArguments": [],
  "transactionKindBytes": "base64-kind-bytes",
  "sponsoredTransactionBytes": "base64-full-transaction-bytes",
  "sponsorSignature": "base64-sponsor-signature",
  "digest": "transaction-digest",
  "gasBudget": "1000",
  "gasPrice": "100",
  "gasPayment": [
    {
      "objectId": "0x8e88e1c23d9c34b15b175b47c80f0a853717fd0975027ce890d90c6bde2b0a5b",
      "version": "7",
      "digest": "coin-digest",
      "balance": "2000000"
    }
  ]
}
```

### Client flow that still needs to be connected

The backend intentionally stops after sponsorship. The frontend wallet flow still needs to:

1. Call `POST /api/iota/sponsor-transaction`.
2. Receive `sponsoredTransactionBytes` and `sponsorSignature`.
3. Ask the connected user wallet to sign the exact same sponsored transaction bytes.
4. Submit the transaction with both signatures using the wallet SDK or `IotaClient.executeTransactionBlock({ transactionBlock, signature: [sponsorSignature, userSignature] })`.

## Available scripts

- `npm run dev` starts the local frontend development server
- `npm run build` creates a production build in `dist/`
- `npm run build:dev` creates a development-mode build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint
- `npm run test` runs Vitest once
- `npm run test:watch` runs Vitest in watch mode
- `npm run start` starts the Express server
- `npm run start:env` starts the Express server and loads `.env`

## Project structure

- `src/App.tsx` contains the route map
- `src/pages` contains page-level screens
- `src/components` contains shared UI, layout, and feature components
- `src/data` contains mock datasets used by the interface
- `server/` contains the backend sponsorship modules
- `public` contains static files served directly

## Testing

Vitest is available for unit and component tests. Playwright configuration is included for browser automation.

For the sponsorship backend:

- `npm test` covers request validation and response shape for `POST /api/iota/sponsor-transaction`
- a live end-to-end sponsorship test still requires a real sponsor wallet, RPC URL, and deployed Move target
