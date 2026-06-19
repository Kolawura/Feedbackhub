# ◆ FeedbackHub

> Collect feedback. Understand visitors. Build better products.

FeedbackHub is a SaaS feedback collection and visitor analytics platform. Drop one script tag into any website and instantly get structured user feedback correlated with real visitor behaviour — page journeys, session duration, geolocation, and device data — all in one dashboard you own.

---

## What It Does

Most teams use 3–5 separate tools to understand their users:

| Tool                    | What it tells you   | What it misses                |
| ----------------------- | ------------------- | ----------------------------- |
| Typeform / Google Forms | What users think    | Who they are, where they were |
| Google Analytics        | Where users go      | What they think               |
| Hotjar                  | What users do       | What they think               |
| Canny / UserVoice       | Structured feedback | Visitor context               |

**FeedbackHub answers all of it in one place** — who the visitor is, what they were doing on your site, and what they're telling you — without stitching multiple tools together.

---

## Features

### Widget

- One script tag — no npm, no build step, no config files
- Structured feedback form — title, description, category, priority, name, email
- Fully customisable — button text, color, position, light/dark/auto theme
- Config loaded from your dashboard — update styles without touching your site
- Persistent visitor identity — same device = same visitor ID across all sessions
- Full page journey tracking with time-spent per page
- IP-based geolocation — country, city, region
- Device detection — browser, OS, language, screen size
- SPA-friendly — intercepts `pushState`, `replaceState`, and `popstate`
- Per-IP rate limiting (5 submissions/hour) and XSS sanitisation built in

### Dashboard

- **Feedback inbox** — search and filter by category, priority, and site
- **Feedback detail** — submitter info, device, page where feedback was sent, full visitor session history
- **Visitor list** — every unique visitor grouped by device, with session count and feedback count
- **Visitor profile** — complete session history, page journey timeline, time spent per page, entry/exit pages
- **Analytics** — visitor traffic (24h, 7d, 30d, 4w, 12m), device breakdown, top pages, top countries, new vs returning, average session duration, feedback trends
- **Settings** — manage sites, customise widget per site with live preview
- **Setup wizard** — 3-step guided setup: name site → customise → install
- **Dark / Light / System** theme with real-time OS change detection

### Security

- JWT access tokens (15 min) + refresh tokens (7 days) with rotation
- Refresh token version counter — invalidates stolen tokens
- Email verification + password reset with time-limited tokens
- bcrypt password hashing (10 rounds)
- httpOnly, Secure, SameSite cookies
- Per-route rate limiting (auth, feedback submission, email endpoints)
- Input sanitisation on all user-submitted text
- CORS whitelist, Helmet security headers

---

## Tech Stack

**Backend**

- Node.js + TypeScript (ESM)
- Express.js
- MongoDB + Mongoose
- Zod validation
- Nodemailer (SMTP-agnostic email)
- sanitize-html, bcryptjs, helmet, express-rate-limit

**Frontend**

- React 18 + TypeScript
- TailwindCSS v4
- TanStack Query v5
- Zustand + React Context
- Framer Motion
- Chart.js + react-chartjs-2
- React Hook Form + Zod
- Axios

**Widget**

- Vanilla JavaScript (zero dependencies)
- Vite IIFE bundle (~20KB unminified)

---

## Project Structure

```
feedbackhub/
├── backend/                    # Express API
│   ├── src/
│   │   ├── controllers/        # Auth, Feedback, Site, Visitor
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # Route definitions
│   │   ├── middleware/         # Auth, rate limiter, error handler
│   │   ├── schema/             # Zod validation schemas
│   │   └── utils/              # Email sender, input sanitizer
│   └── package.json
├── apps/
│   ├── dashboard/              # React dashboard
│   │   ├── src/
│   │   │   ├── Pages/          # Dashboard, Feedback, Analytics, Visitors, Settings
│   │   │   ├── Components/     # UI components, layout
│   │   │   ├── Hooks/          # Data fetching hooks
│   │   │   ├── Context/        # ThemeContext
│   │   │   └── Store/          # Zustand stores
│   │   └── package.json
│   └── widget/                 # Embeddable widget
│       ├── src/main.js
│       └── package.json
└── README.md
```

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An SMTP provider for email (Gmail, [Resend](https://resend.com), [Ethereal](https://ethereal.email) for development)

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env` (see [Environment Variables](#environment-variables) below):

```bash
npm run dev
# API running at http://localhost:5000
```

### 2. Dashboard

```bash
cd apps/dashboard
npm install
```

Create `apps/dashboard/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

```bash
npm run dev
# Dashboard running at http://localhost:5173
```

### 3. Widget

```bash
cd apps/widget
npm install
npm run build
# Built widget at apps/widget/dist/widget.js
```

---

## Environment Variables

### Backend — `backend/.env`

| Variable             | Required    | Description                                           |
| -------------------- | ----------- | ----------------------------------------------------- |
| `NODE_ENV`           | Yes         | `development` or `production`                         |
| `PORT`               | Yes         | Server port (default: 5000)                           |
| `MONGODB_URI`        | Yes         | MongoDB connection string                             |
| `JWT_SECRET`         | Yes         | Secret for access tokens — long random string         |
| `JWT_REFRESH_SECRET` | Yes         | Secret for refresh tokens — different from JWT_SECRET |
| `APP_URL`            | Yes         | Frontend URL — used in email verification links       |
| `SMTP_HOST`          | Production  | SMTP server host                                      |
| `SMTP_PORT`          | Production  | SMTP port (587 recommended)                           |
| `SMTP_USER`          | Production  | SMTP username                                         |
| `SMTP_PASS`          | Production  | SMTP password or API key                              |
| `EMAIL_FROM`         | Production  | e.g. `FeedbackHub <noreply@yourdomain.com>`           |
| `ETHEREAL_USER`      | Development | Ethereal test inbox user                              |
| `ETHEREAL_PASS`      | Development | Ethereal test inbox password                          |

### Dashboard — `apps/dashboard/.env`

| Variable            | Required | Description     |
| ------------------- | -------- | --------------- |
| `VITE_API_BASE_URL` | Yes      | Backend API URL |

> ⚠️ Never commit `.env` files. Add them to `.gitignore`.

---

## Deployment

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Build command: `npm install && npm run build`
3. Start command: `node dist/server.js`
4. Add all environment variables from `backend/.env`

### Dashboard → Vercel

1. Import the repository on [Vercel](https://vercel.com)
2. Root directory: `apps/dashboard`
3. Add: `VITE_API_BASE_URL=https://feedbackhub-myce.onrender.com`

### Widget → Netlify

1. Base directory: `apps/widget`
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## Widget Installation

After setup, add this to the `<head>` of your website:

```html
<script
  src="https://your-widget-host.netlify.app/widget.js"
  data-site-id="site_your_id_here"
></script>
```

**Next.js:**

```tsx
import Script from "next/script";

<Script
  src="https://your-widget-host.netlify.app/widget.js"
  data-site-id="site_your_id_here"
  strategy="lazyOnload"
/>;
```

**Nuxt:**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://your-widget-host.netlify.app/widget.js",
          "data-site-id": "site_your_id_here",
          defer: true,
        },
      ],
    },
  },
});
```

Your site ID is generated during the dashboard setup wizard and can be found in **Settings → Sites**.

---

## API Reference

### Authentication

```
POST   /api/auth/register              Register
POST   /api/auth/login                 Login
POST   /api/auth/logout                Logout
POST   /api/auth/refresh-token         Refresh access token
GET    /api/auth/me                    Get current admin
GET    /api/auth/verify-email          Verify email with token
POST   /api/auth/resend-verification   Resend verification email
POST   /api/auth/forgot-password       Request password reset
POST   /api/auth/reset-password        Reset password
PATCH  /api/auth/profile               Update profile           🔒
DELETE /api/auth/account               Delete account           🔒
```

### Feedback

```
POST   /api/feedback                           Submit feedback (public, rate limited)
GET    /api/feedback/allFeedbacks              All feedback for admin              🔒
GET    /api/feedback/analytics                 Feedback analytics                  🔒
GET    /api/feedback/analytics/:siteId         Feedback analytics for site         🔒
GET    /api/feedback/by-visitor/:visitorId     Feedback + sessions by visitor      🔒
GET    /api/feedback/:siteId                   Feedback for a specific site        🔒
```

### Sites

```
GET    /api/site/all                   List all sites             🔒
POST   /api/site/add                   Create site                🔒
PATCH  /api/site/:siteId/rename        Rename site                🔒
PATCH  /api/site/:siteId/config        Update widget config       🔒
DELETE /api/site/:siteId               Delete site                🔒
GET    /api/site/:siteId               Validate site + get config (public)
```

### Visitors

```
POST   /api/visitor/track              Track visitor session (public)
POST   /api/visitor/track-page-visit   Append page visit (public)
GET    /api/visitor/analytics          Visitor traffic analytics       🔒
GET    /api/visitor/analytics/:siteId  Visitor traffic for site        🔒
GET    /api/visitor/insights           Deep visitor insights           🔒
GET    /api/visitor/insights/:siteId   Deep insights for site          🔒
GET    /api/visitor/all                All unique visitors             🔒
GET    /api/visitor/all/:siteId        Visitors for site               🔒
GET    /api/visitor/detail/:visitorId  Full visitor profile            🔒
```

🔒 = Requires authentication

---

## Visitor Tracking

FeedbackHub uses a three-layer storage system to track visitors reliably across sessions:

```
localStorage   fh_vid_{siteId}    Persistent visitor UUID — never changes per device
               fh_geo             Cached IP geolocation (24h TTL)
               fh_la_{siteId}     Last activity timestamp — detects 30-minute idle timeout

sessionStorage fh_sid_{siteId}    Session UUID — clears when browser tab closes
               fh_ss_{siteId}     Session start timestamp
               fh_st_{sessionId}  Session tracked flag — prevents duplicate on refresh
```

A **new session** is created when the browser tab is opened fresh or when more than 30 minutes have passed since the last activity. The visitor ID remains the same — enabling accurate new vs returning visitor tracking.

---

## Known Limitations

- **IP geolocation accuracy** — city-level accuracy depends on ISP routing. Visitors in smaller cities may show the nearest major city. This is a fundamental limitation of IP-based geolocation, not specific to FeedbackHub.
- **GDPR compliance** — if you serve EU users, you are responsible for adding a consent mechanism before the widget tracks visitors. A built-in consent integration is on the roadmap.
- **Single admin per account** — team accounts with multiple members and roles are on the roadmap.

---

## Roadmap

- [ ] Feedback status workflow (open → in-progress → resolved → closed)
- [ ] Email notifications on new feedback submissions
- [ ] Feedback voting and duplicate detection
- [ ] Webhook support (Slack, Discord, Zapier, Linear)
- [ ] Team accounts with roles
- [ ] Public roadmap / changelog page
- [ ] Screenshot and file attachment support
- [ ] AI-powered sentiment analysis and auto-tagging
- [ ] Session replay
- [ ] GDPR consent mechanism
- [ ] Data export (CSV / JSON)
- [ ] NGN pricing and Paystack payment integration
- [ ] Mobile SDK (iOS, Android)

---

<div align="center">
  <br/>
  <strong>◆ FeedbackHub</strong><br/>
  <em>Collect feedback. Understand visitors. Build better products.</em>
  <br/><br/>
</div>
