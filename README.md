# Sagar Computer Service

Production-oriented web app for **computer sales, repairs, and IT services**: e-commerce, service booking, admin tools, and payments (planned: Razorpay). Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (or pnpm/yarn)
- A **MongoDB** instance ([MongoDB Atlas](https://www.mongodb.com/atlas) or local)

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env.local
# Windows (PowerShell): Copy-Item .env.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string (database user with least privilege) |
| `NEXTAUTH_SECRET` | Random secret for signing sessions (e.g. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL: `http://localhost:3000` locally; `https://your-domain.vercel.app` in production |
| `NEXT_PUBLIC_APP_URL` | Optional; public site URL for links/metadata |

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Other commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (set `NEXTAUTH_SECRET` and `NEXTAUTH_URL` so NextAuth can run during build) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |

---

## How the project is organized (flow)

This is a **Next.js App Router** app: pages and layouts live under `app/`, server logic uses **Server Components**, **Server Actions**, and **Route Handlers** as needed.

### Request flow (high level)

1. **Browser** → Next.js handles routing (`app/…`).
2. **Middleware** (`middleware.ts`) runs on matched routes (e.g. `/admin/*`): checks NextAuth JWT session; only **admin** role can access the admin area.
3. **Auth**:
   - Session API: `app/api/auth/[...nextauth]/route.ts` (NextAuth).
   - Login UI: `app/(auth)/login` (credentials sign-in).
   - Registration: Server Action in `actions/auth.ts` → validates with Zod → hashes password → writes `User` in MongoDB.
4. **Data**:
   - `lib/db/connect.ts` opens a **cached** Mongoose connection (important for serverless/Vercel).
   - Models in `models/` (`User`, `Product`, `Order`, `Booking`) map to MongoDB collections.
5. **UI**:
   - Root layout wraps the app with `SessionProvider` (`components/providers/session-provider.tsx`) so client components can use `useSession` / `signIn` / `signOut`.
   - Shared config: `config/site.ts`, route constants: `constants/routes.ts`.

### Planned product flows (roadmap)

- **Shop**: browse products → cart → checkout → **Razorpay** → order confirmation.
- **Services**: book a slot → notifications / admin queue (as you implement).
- **Admin**: manage catalog, orders, bookings, payments reconciliation.

---

## Folder structure (short)

```
app/                 # Routes, layouts, API route handlers
actions/             # Server Actions (e.g. registration)
components/          # React components (e.g. providers)
config/              # Site metadata and static config
constants/           # Shared constants (e.g. route paths)
lib/                 # Utilities, DB connection, auth helpers, validations
models/              # Mongoose models
types/               # TypeScript augmentations (e.g. NextAuth)
middleware.ts        # Route protection (e.g. /admin)
```

---

## Authentication notes

- **NextAuth** with **credentials** + **JWT sessions**; passwords stored as **bcrypt** hashes on `User`.
- New users default to role **`customer`**. Promote an admin in MongoDB, for example:

  ```js
  db.users.updateOne(
    { email: "you@example.com" },
    { $set: { role: "admin" } }
  )
  ```

---

## Deploying (e.g. Vercel)

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Set the same environment variables as in `.env.example` (especially `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
4. Deploy; use your production URL as `NEXTAUTH_URL`.

---

## Making this “industry ready” (recommended upgrades)

Use this as a checklist—not everything must be done at once, but production teams usually add most of these over time.

### Security and compliance

- **Secrets**: Never commit `.env.local`; use Vercel/host env vars; rotate `NEXTAUTH_SECRET` if leaked.
- **Auth**: Add **email verification**, **password reset**, **rate limiting** on login/register, optional **2FA** for admins.
- **Headers**: Add security headers (CSP, HSTS, etc.) via `next.config` or platform settings.
- **Payments**: Verify Razorpay signatures **only on the server**; never trust client-only success callbacks; use idempotent order updates.
- **PII**: Minimize stored personal data; document retention; align with **GDPR**/local law if you serve EU/other regions.

### Reliability and data

- **Backups**: Enable MongoDB Atlas continuous backup / point-in-time recovery.
- **Indexes**: Review query patterns and add/optimize MongoDB indexes beyond defaults.
- **Migrations**: For schema changes, use a repeatable process (scripts or migration tool), not only manual edits.

### Observability

- **Logging**: Structured logs (e.g. Pino) with request IDs; avoid logging secrets or full card data.
- **Errors**: Central error tracking (e.g. Sentry) for client and server.
- **Uptime**: Synthetic checks for `/` and critical APIs.

### Quality and delivery

- **Tests**: Unit tests (utils, validations), integration tests (API + DB test instance), and a few E2E flows (login, checkout).
- **CI**: Lint + test + `next build` on every PR; block merges on failure.
- **Type safety**: Keep Zod (or similar) at all external boundaries (forms, webhooks, APIs).

### Product and operations

- **Admin audit log**: Who changed prices, orders, or roles.
- **Runbooks**: Short docs for deploy, rollback, and incident response.
- **Accessibility and SEO**: Semantic HTML, focus states, meta/OG tags for storefront pages.

---

## License

Private / unlicensed unless you add a `LICENSE` file.
