# ◆ FeedbackHub

> Collect feedback. Understand visitors. Build better products.

FeedbackHub is an open-source SaaS feedback collection and visitor analytics platform. Drop one script tag into any website and instantly get structured user feedback correlated with real visitor behaviour — page journeys, session duration, geolocation, and device data — all in one dashboard you own.

---

## Why FeedbackHub?

Most teams use 3–5 separate tools to understand their users:

| Tool | What it tells you | What it misses |
|---|---|---|
| Typeform / Google Forms | What users think | Who they are, where they were |
| Google Analytics | Where users go | What they think |
| Hotjar | What users do | What they think |
| Canny / UserVoice | Structured feedback | Visitor context |

**FeedbackHub answers all of it in one place** — who the visitor is, what they were doing on your site, and what they're telling you — without stitching multiple tools together.

---

## Features

### Widget
- **One script tag** — no npm, no build step, no config files
- Structured feedback form — title, description, category, priority, name, email
- Fully customisable — button text, color, position, light/dark/auto theme
- Config loaded from your dashboard — update styles without touching your site
- Persistent visitor identity — same device = same visitor ID across all sessions
- Full page journey tracking with time-spent per page
- IP-based geolocation — country, city, region
- Device detection — browser, OS, language, screen size
- SPA-friendly — intercepts `pushState`, `replaceState`, and `popstate`
- Per-IP rate limiting (5 submissions/hour) and XSS sanitization built in

### Dashboard
- **Feedback inbox** — search, filter by category, priority, and site
- **Feedback detail** — submitter info, device, page where feedback was sent, full visitor session history
- **Visitor list** — every unique visitor, grouped by device, with session count and feedback count
- **Visitor profile** — complete session history, page journey timeline, time spent per page, entry/exit pages
- **Analytics** — visitor traffic (24h, 7d, 30d, 4w, 12m), device breakdown, top pages, top countries, new vs returning, average session duration, feedback trends
- **Settings** — manage sites, customise widget per site with live preview, profile management
- **Setup wizard** — 3-step guided setup: name site → customise → install
- **Dark / Light / System** theme with real-time OS change detection

### Security
- JWT access tokens (15 min) + refresh tokens (7 days) with rotation
- Refresh token version counter — invalidates stolen tokens
- Email verification + password reset with time-limited tokens
- bcrypt password hashing
- httpOnly, Secure, SameSite cookies
- Per-route rate limiting (auth, feedback submission, email endpoints)
- Input sanitization on all user-submitted text
- CORS whitelist, helmet security headers

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

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An SMTP provider for email (Gmail, [Resend](https://resend.com), etc.)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/feedbackhub.git
cd feedbackhub
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://your-user:your-password@your-cluster.mongodb.net/feedbackhub

# JWT — generate strong random strings
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here

# Email (development — use Ethereal: https://ethereal.email)
ETHEREAL_USER=your_ethereal_user
ETHEREAL_PASS=your_ethereal_pass

# Email (production — replace with your SMTP provider)
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=587
# SMTP_USER=resend
# SMTP_PASS=your_resend_api_key
# EMAIL_FROM=FeedbackHub <noreply@yourdomain.com>

# App URL (used in email links)
APP_URL=http://localhost:5173
```

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Set up the dashboard

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
```

The dashboard will be running at `http://localhost:5173`.

### 4. Build the widget

```bash
cd apps/widget
npm install
npm run build
```

The built widget will be at `apps/widget/dist/widget.js`.

### 5. Install the widget on your site

Add this to the `<head>` of your website:

```html
<script
  src="https://your-widget-host.com/widget.js"
  data-site-id="site_your_id_here">
</script>
```

Your site ID is generated during the dashboard setup wizard.

**Using Next.js?**

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://your-widget-host.com/widget.js"
          data-site-id="site_your_id_here"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
```

**Using Nuxt?**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [{
        src: 'https://your-widget-host.com/widget.js',
        'data-site-id': 'site_your_id_here',
        defer: true,
      }],
    },
  },
});
```

---

## Deployment

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `node dist/server.js`
5. Add all environment variables from your `.env` file
6. Deploy

### Dashboard → Vercel

1. Import your repository on [Vercel](https://vercel.com)
2. Set the root directory to `apps/dashboard`
3. Add environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`
4. Deploy

### Widget → Netlify

1. Build the widget: `cd apps/widget && npm run build`
2. Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Or connect your repository and set:
   - Base directory: `apps/widget`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. The widget URL will be `https://your-site.netlify.app/widget.js`

---

## Environment Variables Reference

### Backend

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | Yes | Server port (default: 5000) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for access tokens — use a long random string |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens — different from JWT_SECRET |
| `APP_URL` | Yes | Frontend URL — used in email verification links |
| `SMTP_HOST` | Production | SMTP server host |
| `SMTP_PORT` | Production | SMTP port (587 recommended) |
| `SMTP_USER` | Production | SMTP username |
| `SMTP_PASS` | Production | SMTP password or API key |
| `EMAIL_FROM` | Production | From address e.g. `FeedbackHub <noreply@yourdomain.com>` |
| `ETHEREAL_USER` | Development | Ethereal test inbox user |
| `ETHEREAL_PASS` | Development | Ethereal test inbox password |

### Dashboard

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Yes | Backend API URL |

---

## API Overview

### Authentication
```
POST   /api/auth/register              Register new admin
POST   /api/auth/login                 Login
POST   /api/auth/logout                Logout (invalidates refresh token)
POST   /api/auth/refresh-token         Refresh access token
GET    /api/auth/me                    Get current admin
GET    /api/auth/verify-email          Verify email with token
POST   /api/auth/resend-verification   Resend verification email
POST   /api/auth/forgot-password       Request password reset
POST   /api/auth/reset-password        Reset password with token
PATCH  /api/auth/profile               Update profile (protected)
DELETE /api/auth/account               Delete account (protected)
```

### Feedback
```
POST   /api/feedback                           Submit feedback (public, rate limited)
GET    /api/feedback/allFeedbacks              Get all feedback for admin (protected)
GET    /api/feedback/analytics                 Feedback analytics (protected)
GET    /api/feedback/analytics/:siteId         Feedback analytics for site (protected)
GET    /api/feedback/by-visitor/:visitorId     Feedback + sessions by visitor (protected)
GET    /api/feedback/:siteId                   Feedback for a site (protected)
```

### Sites
```
GET    /api/site/all                   List all sites (protected)
POST   /api/site/add                   Create site (protected)
PATCH  /api/site/:siteId/rename        Rename site (protected)
PATCH  /api/site/:siteId/config        Update widget config (protected)
DELETE /api/site/:siteId               Delete site (protected)
GET    /api/site/:siteId               Validate site ID + get config (public)
```

### Visitors
```
POST   /api/visitor/track              Track visitor session (public)
POST   /api/visitor/track-page-visit  Append page visit (public)
GET    /api/visitor/analytics          Visitor traffic analytics (protected)
GET    /api/visitor/analytics/:siteId  Visitor traffic for site (protected)
GET    /api/visitor/insights           Deep visitor insights (protected)
GET    /api/visitor/insights/:siteId   Deep insights for site (protected)
GET    /api/visitor/all                List all unique visitors (protected)
GET    /api/visitor/all/:siteId        Visitors for site (protected)
GET    /api/visitor/detail/:visitorId  Full visitor profile (protected)
```

---

## Visitor Tracking — How It Works

FeedbackHub uses a three-layer storage system to track visitors reliably:

```
localStorage  → fh_vid_{siteId}   Persistent visitor UUID (never changes per device)
               fh_geo              Cached IP geolocation (24h TTL)
               fh_la_{siteId}     Last activity timestamp (session timeout detection)

sessionStorage → fh_sid_{siteId}  Session UUID (clears when browser closes)
                 fh_ss_{siteId}   Session start time
                 fh_st_{sessionId} Session tracked flag (prevents duplicate tracking)
```

A **new session** is created when:
- The browser tab is opened fresh (sessionStorage cleared)
- More than 30 minutes have passed since the last activity

The same visitor returning after 2 days gets a new session document but **keeps the same visitor ID** — enabling accurate new vs returning visitor tracking.

**Migration note**: If you previously used an older version of the widget, existing visitor IDs are automatically migrated from the old key names (`feedbackhub-visitor-id`) to the new namespaced keys (`fh_vid_{siteId}`) on first load. No data is lost.

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines

- All backend endpoints must have Zod validation
- Rate limit any public-facing endpoints
- Sanitize all user-submitted text before storing
- Use CSS custom properties (`var(--bg)`, `var(--text)`, etc.) for all colours — never hardcode hex in components
- Components should work in both light and dark mode

---

## Known Limitations

- **IP geolocation accuracy** — city-level accuracy is limited by ISP routing. Visitors in smaller cities may show the nearest major city. This is a fundamental limitation of IP-based geolocation, not specific to FeedbackHub.
- **GDPR compliance** — if you serve EU users, you are responsible for adding a consent mechanism before the widget tracks visitors. A consent integration is on the roadmap.
- **Single admin per account** — team accounts with multiple members and roles are on the roadmap but not yet implemented.

---

## Roadmap

- [ ] Feedback status workflow (open → in-progress → resolved → closed)
- [ ] Email notifications on new feedback
- [ ] Feedback voting and duplicate detection
- [ ] Webhook support (Slack, Discord, Zapier, Linear)
- [ ] Team accounts with roles (Owner, Member, Viewer)
- [ ] Public roadmap / changelog page
- [ ] Screenshot / file attachment support
- [ ] Sentiment analysis (AI-powered)
- [ ] Session replay
- [ ] GDPR consent mechanism
- [ ] Data export (CSV / JSON)
- [ ] Mobile SDK (iOS, Android)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

Built with:
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [React](https://react.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [TanStack Query](https://tanstack.com/query)
- [Chart.js](https://www.chartjs.org)
- [Vite](https://vitejs.dev)

---

<div align="center">
  <p>
    <strong>◆ FeedbackHub</strong><br/>
    <em>Collect feedback. Understand visitors. Build better products.</em>
  </p>
</div>
