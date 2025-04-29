# Todo App Frontend

A frontend for the Todo App built with [Next.js](https://nextjs.org), featuring API integration, modern UI architecture, and environment-based configuration.

## Getting Started

### Prerequisites

- Node.js 22.14
- pnpm (or npm, yarn, bun)

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Notes

- The app entry point is located in `app/page.tsx`.
- Hot reloading is enabled; changes to files will auto-update in the browser.
- Font optimization is handled via [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).

## Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run lint checks
```

## Deployment

You can deploy the frontend using any Node.js-compatible hosting provider. For best compatibility, refer to the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
