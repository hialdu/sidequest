# SideQuest on Vercel

A Next.js app with Turso persistence and Solana devnet rewards. Includes the current SideQuest design, official white Solana logo, and founder story.

## What you need
- GitHub and Vercel accounts.
- A Turso Cloud database and database authentication token.
- Node.js 22.13+ for local commands (use Node 22 or 24).

This is a fresh deployment copy. It does not migrate records from the existing Cloudflare D1 database. Use a new empty Turso database.

## 1. Create the database
Sign in at https://turso.tech and create a **libSQL** database called `sidequest` (or another available name). This copy uses the @libsql/client driver and a `libsql://` connection URL. Copy its URL and generate a database authentication token. Keep the token private.

Create `.env.local` in the project root from `.env.example` and fill in:

```
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-token
```

These are server-only variables. Do not add a NEXT_PUBLIC_ prefix. Do not upload `.env.local` to GitHub or share your token in chat.

Run in the extracted project folder:

```
npm ci
npm run db:setup
npm run dev
```

`db:setup` creates all three tables and indexes in one write transaction. Run it once on a new empty database. If tables already exist, do not delete them; skip setup if the schema is already installed. New schema changes require a deliberate migration. You can alternatively run the SQL from `drizzle/0000_puzzling_franklin_richards.sql` through Turso’s SQL console, once.

## 2. Put the code on GitHub
Create a GitHub repository called `sidequest`. Upload the contents of this folder, including `app`, `db`, `lib`, `public`, `scripts`, `drizzle`, and the root configuration files. `package.json` must be in the repository root, not inside an extra `sidequest-vercel` folder. A private repository is fine for hosting; hackathon source visibility requirements must be checked separately.

Do not upload node_modules, .next, .env.local, test runtime folders, or any token. The supplied .gitignore excludes these when using Git. GitHub’s manual Upload Files flow still requires selecting the correct files yourself.

## 3. Deploy on Vercel
Go to https://vercel.com/new, connect GitHub, and import the `sidequest` repository.

- Framework preset: Next.js
- Root directory: repository root
- Build command: npm run build
- Install command: npm ci
- Output directory: leave the Next.js default
- Node.js: 22.x or 24.x

Before clicking Deploy, add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN under Environment Variables. Enable Production; add Preview too if you want preview deployments to use this same test database. A separate preview database is preferable later.

Click Deploy. Vercel assigns an available .vercel.app address; the exact name is not guaranteed. If variables are added later, redeploy to apply them. Check Settings / Deployment Protection so intended testers can open the production address. Open it in an incognito window to verify access.

## 4. Check the deployed app
- Open the homepage and finish the no-wallet example. Its reward is explicitly simulated.
- Connect a devnet sponsor wallet and publish a quest.
- Open a second wallet session, complete the quest, and submit feedback.
- Sponsor: review, give a reason, approve, then send test SOL.
- Verify the confirmed receipt in Solana Explorer, with cluster=devnet.

Get test SOL from https://faucet.solana.com. Devnet SOL has no monetary value. A low rating can still qualify for review. Payments are sponsor-signed direct transfers, not escrow or guaranteed payouts. There is no custom deployed Solana program.

## Checks
```
npm run typecheck
npm test
npm run build
```
Integration tests use an in-memory libSQL database and simulated RPC receipts. They do not prove a live devnet payment or production credentials. Browser and live two-wallet tests must still be completed after deployment.

## Why the database changed
Vercel runs this app as standard Next.js. The original cloudflare:workers D1 binding is replaced with the server-side libSQL client. The schema and public API behavior stay consistent; successful inserts use libSQL rowsAffected. No Cloudflare credentials or ChatGPT login are needed in this copy.

## Validation of this export
Verified locally: TypeScript, standard Next.js production build, and integration suite against an in-memory libSQL database. Remote Turso credentials, Vercel deployment, browser interactions, and a live devnet two-wallet payment are not yet verified.
