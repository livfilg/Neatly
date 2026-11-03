# Neatly

Neatly is an on-demand house-cleaning marketplace for Greater Hartford, Connecticut — customers book vetted, independent cleaning professionals online.

This repository is the **customer website** (Phase 1). The full product spec lives in [`NEATLY_SPEC.md`](./NEATLY_SPEC.md), and the clickable design prototype it matches is in [`reference/neatly-prototype.html`](./reference/neatly-prototype.html) (open that file directly in a browser).

## Current status

This is the **initial project setup (M0)**: a Next.js app with TypeScript and Tailwind CSS, ready for development. No database, authentication, or payments are wired up yet — those come in the milestones described in `NEATLY_SPEC.md` (section 15), and each one will need its own accounts and API keys before it can be built.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- ESLint for linting

## Prerequisites

You'll need **Node.js** installed. This project was set up with Node 26 (current LTS). If you don't have it, the easiest way is:

1. Install [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager).
2. Run `nvm install --lts && nvm use --lts`.

Check it worked:

```bash
node -v
npm -v
```

## Install

From the project folder:

```bash
npm install
```

## Run it locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates as you edit files in `src/app`.

## Environment variables

There are no environment variables yet — this setup step doesn't touch the database, auth, or payment providers. As those are added in later milestones, this project will keep a `.env.example` file listing every variable needed and where to get it. **Never commit real secrets** — actual values always go in a local `.env.local` file, which is excluded from git by `.gitignore`.

## Useful commands

```bash
npm run dev      # start the local dev server
npm run build    # build for production
npm run start    # run the production build locally
npm run lint     # check code style issues
```

## Deploying

The plan is to deploy on [Vercel](https://vercel.com), with a preview deployment for every branch and production deploying from `main`. This isn't connected yet — that's part of a later milestone.

## Project structure

```
src/app/        # pages and layouts (Next.js App Router)
public/         # static assets
reference/      # the clickable HTML design prototype to match
NEATLY_SPEC.md  # the full product and build specification
```
