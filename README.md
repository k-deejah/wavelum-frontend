# Lumina Frontend

Next.js 16 web application for the Lumina Network — a blockchain-based vesting vault and token streaming platform on Stellar Soroban.

## Overview

Lumina Frontend provides a comprehensive dashboard for interacting with Lumina's on-chain vesting infrastructure. Users can create and manage vesting schedules, participate in governance proposals, track token streams, and view real-time analytics.

## Features

- **Vesting Dashboard** — Create, view, and manage vesting schedules and token streams
- **Governance Portal** — Participate in on-chain governance proposals with veto voting powered by defensive governance
- **Vault Management** — View vault status, claim vested tokens, and monitor auto-stake positions
- **Cross-Chain Claims** — Claim vested tokens across supported blockchain networks
- **Analytics** — Real-time vesting analytics and historical tracking
- **Compliance** — KYC/AML verification integration for regulated asset support

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Linting | [ESLint 9](https://eslint.org/) with `eslint-config-next` |
| Blockchain | [Stellar Soroban](https://stellar.org/) smart contracts |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
lumina-frontend/
├── app/               # Next.js App Router pages and layouts
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   ├── globals.css    # Global styles
│   └── favicon.ico    # Favicon
├── public/            # Static assets
├── next.config.ts     # Next.js configuration
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── eslint.config.mjs  # ESLint flat config
└── postcss.config.mjs # PostCSS configuration
```

## Related Repositories

- [lumina-core](https://github.com/stellar-network-builders/lumina-core) — Soroban smart contracts
- [lumina-backend](https://github.com/stellar-network-builders/lumina-backend) — Node.js API and services
