# Sakeenah: Modern Islamic Wedding Invitation Platform

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/badge/version-1.1.0-orange)

## Overview

Sakeenah is a production-ready, database-driven wedding invitation platform designed for modern couples who value both aesthetics and functionality. Built on a scalable client-server architecture with PostgreSQL multi-tenancy, it enables hosting unlimited wedding invitations from a single deployment with personalized guest experiences.

![Sakeenah Preview](public/preview.png)

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

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/mrofisr/sakeenah.git
   cd sakeenah
   bun install
   ```

2. **Set up PostgreSQL database:**

   ```bash
   # Create database
   createdb sakeenah

   # Apply schema
   psql -d sakeenah -f src/server/db/schema.sql.example
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   The `.env` file contains:

   ```env
   # Frontend
   VITE_API_URL=http://localhost:3000

   # Backend
   DATABASE_URL=postgresql://username:password@localhost:5432/sakeenah
   PORT=3000
   ```

   Update `DATABASE_URL` with your PostgreSQL credentials.

4. **Add your wedding data:**

   ```bash
   # Copy the SQL template
   cp src/server/db/add-wedding.sql.example my-wedding.sql

   # Edit my-wedding.sql with your wedding details
   # Then insert into database
   psql -d sakeenah -f my-wedding.sql
   ```

   This will create your wedding invitation with a unique UID (e.g., `ahmad-fatimah-2025`).

5. **Start development servers:**

   ```bash
   bun run dev
   ```

   This runs both frontend (Vite) and backend (Hono API) concurrently.

6. **Access your invitation:**
   - Frontend: `http://localhost:5173/your-wedding-uid`
   - API endpoint: `http://localhost:3000/api/invitation/your-wedding-uid`

Replace `your-wedding-uid` with the UID you defined in your SQL file.

## Personalized Invitations

### Enhanced Security & Privacy

Sakeenah implements a secure invitation system that protects guest privacy and prevents web scraping:

**Security Features:**

- Wedding UID and guest names stored in localStorage (not visible in URL after initial load)
- URL automatically cleaned to `https://yourdomain.com` after data extraction
- 30-day expiration for stored invitation data
- Meta tags prevent Wayback Machine and search engine archiving
- No URL injection vulnerabilities

### Initial URL Pattern

Each guest receives a unique invitation link that contains their wedding UID and encoded name:

```
https://yourdomain.com/<wedding-uid>?guest=<base64-encoded-name>
```

**Components:**

- `<wedding-uid>`: Your unique wedding identifier (e.g., `rifqi-dina-2025`, `ahmad-fatimah-2025`)
- `?guest=`: Query parameter for guest identification
- `<base64-encoded-name>`: Guest name encoded in URL-safe base64 format

**What Happens After First Click:**

1. Guest clicks: `https://yourdomain.com/ahmad-fatimah-2025?guest=QWhtYWQ`
2. System extracts and stores UID and guest name in localStorage
3. URL automatically changes to: `https://yourdomain.com`
4. All data persists in localStorage for 30 days
5. Guest sees clean URL, data remains private

**Real Examples:**

Initial link sent to guest:

```
https://yourdomain.com/ahmad-fatimah-2025?guest=QWhtYWQlMjBBYmR1bGxhaA
```

URL after guest opens (automatically cleaned):

```
https://yourdomain.com
```

https://yourdomain.com/<wedding-uid>?guest=<base64-encoded-name>

```

**Components:**

- `<wedding-uid>`: Your unique wedding identifier (e.g., `rifqi-dina-2025`, `ahmad-fatimah-2025`)
- `?guest=`: Query parameter for guest identification
- `<base64-encoded-name>`: Guest name encoded in URL-safe base64 format

**Real Examples:**

```

https://yourdomain.com/ahmad-fatimah-2025?guest=QWhtYWQlMjBBYmR1bGxhaA
https://yourdomain.com/rifqi-dina-2025?guest=U2FyYWglMjBKb2huc29u
https://yourdomain.com/wedding-2025?guest=QmFwYWslMjBSdWRpJTIwJTI2JTIwS2VsdWFyZ2E

````

### Generating Guest Links

Use the built-in script to generate personalized links for all your guests:

```bash
bun run generate-links
````

**Steps:**

1. Edit `generate-links-example.js` and configure:

   ```javascript
   const INVITATION_UID = "your-wedding-uid"; // Your wedding UID
   const BASE_URL = "https://yourdomain.com"; // Your production URL

   const guestList = [
     "Ahmad Abdullah",
     "Sarah Johnson",
     "Bapak Rudi & Keluarga",
     // ... add all your guests
   ];
   ```

2. Run the script:

   ```bash
   bun run generate-links
   ```

3. Output includes personalized links for each guest:

   ```
   1. Ahmad Abdullah
      https://yourdomain.com/ahmad-fatimah-2025?guest=QWhtYWQlMjBBYmR1bGxhaA

   2. Sarah Johnson
      https://yourdomain.com/ahmad-fatimah-2025?guest=U2FyYWglMjBKb2huc29u
   ```

### Guest Experience

When guests open their personalized link:

1. **First Visit:**

   - Click link: `https://yourdomain.com/wedding-2025?guest=encoded-name`
   - System stores wedding UID and guest name in browser localStorage
   - URL automatically cleans to: `https://yourdomain.com`
   - Invitation loads with personalized greeting

2. **Subsequent Visits:**
   - Guest navigates to: `https://yourdomain.com`
   - Data loads from localStorage automatically
   - No need to click the original link again
   - Works for 30 days from first visit

**Features:**

- **Name pre-filled**: Guest name automatically appears in hero section
- **Wish form ready**: Name pre-populated in wedding wish submission
- **Editable**: Guests can update their name if needed
- **Attendance tracking**: Individual RSVP tracked per guest
- **No login required**: Seamless experience without authentication
- **Privacy protected**: Guest data stored locally, not in URL history
- **Clean URLs**: No sensitive information visible in browser address bar

**Data Persistence:**

- Invitation data persists for 30 days in browser localStorage
- Clearing browser data will require clicking the original link again
- Each browser/device maintains separate invitation data
- No server-side session management required

### Distribution Methods

**WhatsApp Template:**

```
Assalamualaikum Warahmatullahi Wabarakatuh,

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:

[Bride] & [Groom]
[Date] | [Location]

Buka undangan digital: [personalized-link]

Jazakumullahu khairan
```

**SMS Template:**

```
[Bride] & [Groom] wedding invitation
Date: [date]
View your invitation: [short-link]
```

**Email Template:**

```
Subject: Wedding Invitation - [Bride] & [Groom]

Dear [Guest Name],

We joyfully invite you to celebrate our wedding...
View your personalized invitation: [link]
```

### Link Management Tips

- **Test links first**: Always test generated links before mass distribution
- **URL shorteners**: Use bit.ly or similar for cleaner WhatsApp sharing
- **Track opens**: Monitor invitation views through attendance statistics
- **Backup list**: Keep a spreadsheet of guest names and their unique links
- **Resend capability**: Guests can request link resend via contact information

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

- **Multi-tenant isolation**: Database-level separation ensures wedding data never crosses boundaries
- **CORS protection**: API access restricted to approved domains only
- **Input validation**: Zod schemas prevent SQL injection and XSS attacks
- **TLS encryption**: HTTPS enforced for all production deployments
- **localStorage security**: Client-side data expires after 30 days automatically
- **URL sanitization**: Sensitive parameters removed from URL after extraction
- **Anti-scraping**: Meta tags and robots.txt prevent web archiving (Wayback Machine, etc.)

### Authentication & Guest Privacy

- **No login required**: Seamless guest experience via localStorage persistence
- **Clean URLs**: Wedding UID and guest names hidden from URL after first load
- **Session management**: Client-side storage with automatic expiration
- **Database security**: PostgreSQL row-level security for data isolation
- **Rate limiting**: Recommended for production to prevent abuse

### Privacy Guarantees

- **Minimal data collection**: Only wedding UID and guest name stored client-side
- **No tracking**: Zero third-party analytics or tracking by default
- **Public wishes**: Guest messages intentionally public for wedding celebration
- **Data retention**: localStorage cleared after 30 days or manual browser cleanup
- **No URL history**: Sensitive data not persisted in browser history or bookmarks
- **Archive prevention**: Robots.txt and meta tags block Wayback Machine and web crawlers

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

We welcome contributions from developers, designers, and the Muslim community! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Code of conduct
- Development setup
- Coding standards
- Pull request process
- Cultural guidelines

Quick start for contributors:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repository
3. Create a feature branch
4. Make your changes following our guidelines
5. Submit a pull request

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
