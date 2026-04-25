# Allyvate

Minimal React/Vite development harness for the Allyvate OAuth signup callback.

## Requirements

- Node.js 22+
- npm 10+

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

Open one of the demo routes:

- `http://localhost:5173/oauth/google/callback?success=true`
- `http://localhost:5173/oauth/google/callback?error=access_denied`

## Validation

```sh
npm test
npm run build
```
