# 🚀 GDG PRMITR — Coding Club Website

The official website for the **Coding Club at Prof. Ram Meghe Institute of Technology and Research Badnera - Amravati**.  
Built with Next.js 16, it serves as the central hub for club events, member profiles, certificate verification, and admin management.

---

## ✨ Features

### Public Pages
| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, featured clubs, stats, spotlight, faculty, newsletter |
| **Events** | `/events` | Browse all events with filters |
| **Event Detail** | `/events/[id]` | Individual event information |
| **About** | `/about` | Club history, team cards, member profiles |
| **Gallery** | `/gallery` | Photo grid of past activities |
| **GDG** | `/gdg` | Google Developer Group chapter details |
| **GSA** | `/gsa` | Google Student Ambassador information |
| **Certificate Verify** | `/certificate-verify` | Verify a certificate by ID |
| **Smart Campus 2026 Help** | `/sc2026-help` | Dedicated help page for SC2026 |
| **Short Links** | `/out/[key]` | Tracked outbound link redirects |

### Admin Panel (`/admin`)
- Secure login via OAuth (GitHub / Google through NextAuth v5)
- Access request management (approve / reject)
- Event creation, editing, and visibility toggling
- User governance panel

### API Routes
- `POST/GET /api/admin/events` — manage events
- `PATCH /api/admin/events/visibility` — toggle event visibility
- `GET/PATCH/DELETE /api/admin/events/[id]` — single event CRUD
- `GET/POST /api/admin/access-requests` — list & submit access requests
- `PATCH /api/admin/access-requests/[id]` — approve / reject a request
- `GET /api/admin/users` — list admin users
- `GET /api/admin/me` — current admin info
- `GET /api/verify` — verify a certificate
- `GET /api/auth/[...nextauth]` — NextAuth handler

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Auth | [NextAuth v5](https://authjs.dev) (GitHub & Google OAuth) |
| Database | MongoDB (via official `mongodb` driver) |
| Icons | [Lucide React](https://lucide.dev) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended)
- A MongoDB instance (local or Atlas)
- GitHub and/or Google OAuth app credentials

### 1. Clone the repository

```bash
git clone https://github.com/GDG-PRMITR/Coding-club-website.git
cd Coding-club-website
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# NextAuth
AUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
AUTH_GITHUB_ID=<your-github-client-id>
AUTH_GITHUB_SECRET=<your-github-client-secret>

# Google OAuth
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
Coding-club-website/
├── app/                     # Next.js App Router pages & API routes
│   ├── admin/               # Admin dashboard & login
│   ├── api/                 # API route handlers
│   ├── certificate-verify/  # Certificate verification page
│   ├── events/              # Events listing & detail pages
│   ├── gallery/             # Photo gallery
│   ├── gdg/                 # GDG chapter page
│   ├── gsa/                 # GSA page
│   ├── out/[key]/           # Outbound link tracker
│   ├── sc2026-help/         # Smart Campus 2026 help page
│   ├── about/               # About the club
│   ├── verify/              # Certificate verify (alias)
│   └── page.tsx             # Home page
├── components/              # Reusable React components
│   ├── admin/               # Admin-specific components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── EventCard.tsx
│   ├── FeaturedClubs.tsx
│   └── ...
├── data/                    # Static data files (clubs, events, faculty, etc.)
├── lib/                     # Utility modules (MongoDB, auth, SEO, etc.)
├── public/                  # Static assets
├── auth.ts                  # NextAuth configuration
└── next.config.ts           # Next.js configuration
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style and ensure TypeScript types are properly defined.

---

## 📄 License

This project is maintained by the **GDG PRMITR** team. All rights reserved.
