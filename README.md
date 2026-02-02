# Sakeenah: Modern Islamic Wedding Invitation Platform

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

## Overview

Sakeenah is a production-ready, database-driven wedding invitation platform designed for modern couples who value both aesthetics and functionality. Built on a scalable client-server architecture with PostgreSQL multi-tenancy, it enables hosting unlimited wedding invitations from a single deployment with personalized guest experiences.

## Business Problem

Traditional wedding invitations face significant challenges:

- **Manual guest tracking**: Paper-based RSVPs result in incomplete attendance data and last-minute uncertainties
- **Static content delivery**: Generic invitations lack personalization, reducing guest engagement
- **Limited scalability**: Single-event websites require separate deployments for each wedding
- **Poor mobile experience**: Desktop-only designs fail to reach 70%+ of guests accessing from mobile devices
- **Missing analytics**: No visibility into invitation opens, wish submissions, or attendance trends

## Solution

Sakeenah delivers a comprehensive digital invitation platform:

**Personalized Guest Experience**: URL-based guest identification pre-fills names and tracks individual invitation engagement without requiring login.

**Multi-Tenant Architecture**: Host unlimited weddings from a single deployment with complete data isolation and per-wedding customization.

**Mobile-First Design**: Responsive layouts optimized for smartphones ensure seamless experiences across all devices and screen sizes.

**Real-Time Interaction**: PostgreSQL-backed wish system with attendance tracking provides instant feedback and engagement metrics.

**Edge Deployment Ready**: Cloudflare Workers support enables global distribution with sub-50ms response times and 99.99% uptime.

## Core Features

### Guest Management

- Personalized invitation links with base64-encoded guest names
- Automated name pre-filling in hero sections and wish forms
- Attendance tracking (attending, not attending, undecided)
- Real-time wish submission with PostgreSQL persistence

### Multi-Tenant System

- Unique wedding identifiers (UIDs) for URL routing
- Database-driven wedding data (no code changes needed)
- Isolated wishes and analytics per wedding
- Centralized deployment for unlimited events

### User Experience

- Smooth animations powered by Framer Motion
- Background music controls with autoplay support
- Countdown timer to wedding date
- Interactive confetti effects
- Google Maps integration for venue directions
- Digital envelope with bank account details

### Technical Capabilities

- REST API backend with Hono framework
- PostgreSQL connection pooling for high concurrency
- Asia/Jakarta timezone standardization
- Zod schema validation for API requests
- React Router v7 for client-side navigation

## Technical Stack

| Layer      | Technology         | Purpose                                   |
| ---------- | ------------------ | ----------------------------------------- |
| Runtime    | Bun 1.3.5          | Package management and server execution   |
| Frontend   | React 18 + Vite    | Fast build tooling and reactive UI        |
| Backend    | Hono               | Lightweight edge-compatible API framework |
| Database   | PostgreSQL         | Multi-tenant data storage                 |
| Styling    | Tailwind CSS       | Utility-first responsive design           |
| Animation  | Framer Motion      | Declarative animations and transitions    |
| Query      | TanStack Query     | Server state management and caching       |
| Deployment | Cloudflare Workers | Global edge network distribution          |

### System Architecture

```
┌──────────────────┐
│   Client (SPA)   │  React + Vite (Port 5173)
│  Mobile-First    │  React Router v7 + Framer Motion
└────────┬─────────┘
         │ HTTPS/REST
┌────────▼─────────┐
│  API Server      │  Hono (Port 3000)
│  (Bun Runtime)   │  CORS + Zod Validation
└────────┬─────────┘
         │ PostgreSQL Protocol
┌────────▼─────────┐
│   PostgreSQL     │  Multi-Tenant Database
│  (Connection     │  Per-Wedding Data Isolation
│   Pooling)       │
└──────────────────┘
```

## Quick Start

### Prerequisites

- Bun v1.3.5 or later
- PostgreSQL v14+ (local or cloud-hosted)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mrofisr/islamic-wedding-invitation.git
   cd islamic-wedding-invitation
   bun install
   ```

2. Initialize database:

   ```bash
   # Create database
   createdb sakeenah

   # Apply schema
   psql -d sakeenah -f src/server/db/schema.sql.example
   ```

3. Configure environment:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   # Frontend
   VITE_API_URL=http://localhost:3000
   VITE_INVITATION_UID=your-wedding-uid

   # Backend
   DATABASE_URL=postgresql://user:password@localhost:5432/sakeenah
   PORT=3000
   ```

4. Add wedding data:

   ```bash
   cp src/server/db/add-wedding.sql.example src/server/db/my-wedding.sql
   # Edit my-wedding.sql with your details
   psql -d sakeenah -f src/server/db/my-wedding.sql
   ```

5. Start development servers:

   ```bash
   bun run dev  # Runs both client and server concurrently
   ```

6. Access application:
   - Frontend: `http://localhost:5173/your-wedding-uid`
   - API: `http://localhost:3000/api/invitation/your-wedding-uid`

## Personalized Invitations

Generate unique invitation links for each guest:

```bash
bun run generate-links
```

Output format:

```
https://yourdomain.com/wedding-2025?guest=QWhtYWQgQWJkdWxsYWg=
```

When guests open their personalized link:

- Name automatically appears in hero section
- Wish form pre-filled with guest name
- Guest can update name if needed
- Attendance tracked per individual link

See [PERSONALIZED-INVITATIONS.md](./PERSONALIZED-INVITATIONS.md) for complete documentation.

## API Reference

### Invitations

**GET** `/api/invitation/:uid`

Retrieves wedding details including agenda and bank accounts.

Response:

```json
{
  "uid": "wedding-2025",
  "title": "Wedding of Ahmad & Fatimah",
  "groom_name": "Ahmad",
  "bride_name": "Fatimah",
  "date": "2025-06-15",
  "agenda": [...],
  "banks": [...]
}
```

### Wishes

**GET** `/api/:uid/wishes?page=1&limit=10`

Retrieves paginated wishes for a wedding.

**POST** `/api/:uid/wishes`

Creates new wish with attendance status.

Request body:

```json
{
  "name": "Guest Name",
  "message": "Congratulations!",
  "attendance": "attending"
}
```

**GET** `/api/:uid/stats`

Returns attendance statistics:

```json
{
  "attending": 45,
  "not_attending": 12,
  "undecided": 8,
  "total": 65
}
```

## Deployment

### Option 1: Cloudflare Workers (Recommended)

Deploy full-stack application to Cloudflare's edge network.

1. Authenticate:

   ```bash
   wrangler login
   ```

2. Create Hyperdrive connection:

   ```bash
   wrangler hyperdrive create sakeenah-db \
     --connection-string="postgresql://user:pass@host:5432/sakeenah"
   ```

3. Update `wrangler.jsonc` with Hyperdrive ID and domain

4. Deploy:
   ```bash
   bun run deploy
   ```

**Benefits**:

- Global edge distribution (100+ locations)
- Sub-50ms response times
- Automatic SSL certificates
- 100,000 requests/day (free tier)

### Option 2: Separate Hosting

- **Frontend**: Vercel, Netlify, Cloudflare Pages (deploy `dist/` folder)
- **Backend**: VPS with Bun, Railway, Fly.io, Render
- **Database**: Supabase, Neon, Railway PostgreSQL

Production environment variables:

```env
VITE_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://user:pass@production-host:5432/sakeenah
```

Build commands:

```bash
bun run build    # Frontend production build
bun run server   # Backend production server
```

## Configuration

### Database Method (Recommended)

Add wedding data via SQL templates:

```sql
INSERT INTO invitations (uid, title, groom_name, bride_name, date, ...)
VALUES ('wedding-2025', 'Ahmad & Fatimah', 'Ahmad', 'Fatimah', '2025-06-15', ...);

INSERT INTO agenda (invitation_id, title, date, start_time, ...)
VALUES (1, 'Akad Nikah', '2025-06-15', '10:00', ...);
```

See `src/server/db/add-wedding.sql.example` for complete template.

### Static Config (Development Only)

For testing, edit `src/config/config.js`:

```javascript
const config = {
  data: {
    title: "Wedding of Ahmad & Fatimah",
    groomName: "Ahmad",
    brideName: "Fatimah",
    date: "2025-06-15",
    location: "Grand Ballroom, Hotel Majesty",
    // ... additional fields
  },
};
```

## Scripts

```bash
# Development
bun run dev              # Run client + server concurrently
bun run dev:client       # Frontend only (Vite)
bun run dev:server       # Backend only (Hono API)

# Production
bun run build            # Build frontend to dist/
bun run preview          # Preview production build
bun run server           # Run backend server

# Cloudflare Workers
bun run deploy           # Build + deploy to Workers
bun run cf:dev           # Test with Workers runtime
bun run cf:tail          # View live deployment logs

# Utilities
bun run generate-links   # Generate personalized guest links
bun run lint             # ESLint code validation
```

## Security & Compliance

### Data Protection

- Multi-tenant data isolation at database level
- CORS configuration restricts API access to approved domains
- Input validation via Zod schemas prevents injection attacks
- HTTPS/TLS encryption for all production deployments

### Authentication

- Guest identification via URL-encoded parameters (no login required)
- PostgreSQL row-level security for data isolation
- API rate limiting recommended for production

### Privacy

- Guest names stored as reversible base64 (not PII encryption)
- Wish submissions voluntary and publicly displayed
- No third-party tracking or analytics by default

## Project Structure

```
sakeenah/
├── src/
│   ├── components/          # React UI components
│   ├── pages/              # Route pages (LandingPage, MainContent)
│   ├── context/            # React Context providers
│   ├── config/             # Static configuration (deprecated)
│   ├── server/             # Backend API
│   │   ├── server.js       # Hono app initialization
│   │   ├── db/             # Database schemas and migrations
│   │   └── routes/         # API endpoint handlers
│   └── main.jsx            # React application entry
├── public/                 # Static assets (images, audio)
├── dist/                   # Production build output
├── vite.config.js          # Vite bundler configuration
├── wrangler.jsonc          # Cloudflare Workers config
└── package.json            # Dependencies and scripts
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

Update browserslist database:

```bash
npx update-browserslist-db@latest
```

## Support & Contributing

### Issue Reporting

Report bugs via [GitHub Issues](https://github.com/mrofisr/islamic-wedding-invitation/issues) with:

- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

### Contributing

Contributions welcome. Please:

1. Fork repository
2. Create feature branch
3. Write tests if applicable
4. Submit pull request with clear description

### Commercial Support

For custom wedding invitations based on this platform:

- Must align with design philosophy and Islamic values
- Portion of service fee donated to charitable institutions
- Contact: [@mrofisr](https://github.com/mrofisr)

## License

Licensed under the Apache License 2.0. See [LICENSE](./LICENSE) for full terms.

Copyright (c) 2024-present mrofisr

You may use, modify, and distribute this software under the Apache 2.0 terms, which require:

- Preservation of copyright notices
- Inclusion of license text in distributions
- Documentation of modifications

## Acknowledgments

- Built with [Vite](https://vite.dev/), [React](https://react.dev/), and [Hono](https://hono.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Cloudflare Workers](https://workers.cloudflare.com/)

## Contact

- GitHub: [@mrofisr](https://github.com/mrofisr)
- Instagram: [@mrofisr](https://instagram.com/mrofisr)

---

**"And among His signs is that He created for you spouses from among yourselves so that you may find comfort in them."** - Quran 30:21
