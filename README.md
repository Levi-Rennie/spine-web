# Spine Web

Next.js frontend for Spine, a library loans manager. Lists loans, supports
live search, and provides a form to add new loans.

## Prerequisites

- Node.js 20+
- The Spine API running on port 3000 (see the `spine-api` repo)

## Setup

```bash
npm install
```

## Running

Make sure `spine-api` is running first, then:

```bash
npm run dev
```

The app runs on **port 3001** and expects the API at `http://127.0.0.1:3000`.

## Notes

- The `/items` page is a Server Component that fetches loans on the server.
- Loan search and the add-loan form are Client Components.
- Shared Zod schemas validate the add-loan form on both client and server.