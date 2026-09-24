# AARAMBH — MCA Freshers'26

Full-stack event invitation, RSVP, and attendance management website for **AARAMBH — MCA Freshers'26 with Our Alumni**, organized by MCA students of the University of Hyderabad, School of Computer and Information Sciences (SCIS).

---

## Tech Stack

- **Next.js 16** (App Router, Server Actions, TypeScript)
- **MongoDB Atlas** + **Mongoose**
- **Auth.js v5 (NextAuth)** — admin authentication
- **Tailwind CSS v4** — design system
- **Recharts** — analytics charts
- **Zod** — server-side validation

---

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier works)

---

## 1. Clone & Install

```bash
cd aarambh
npm install
```

---

## 2. MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Create a database user (Database Access → Add New Database User).
3. Whitelist your IP (Network Access → Add IP Address → Allow access from anywhere for Vercel deployments).
4. Click **Connect → Drivers** and copy the connection string.

---

## 3. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# MongoDB Atlas URI (replace with your actual connection string)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/aarambh?retryWrites=true&w=majority

# Auth.js secret — generate with: openssl rand -base64 32
AUTH_SECRET=your-random-secret-here

# Your deployment URL (use http://localhost:3000 for local dev)
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_SITE_URL=http://localhost:3000

# SCIS Connect URL — update when available
NEXT_PUBLIC_SCIS_CONNECT_URL=YOUR_SCIS_CONNECT_URL
```

---

## 4. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 5. Seed 2025 Students

This inserts all 36 MCA 2025 students, default event settings, and placeholder schedule:

```bash
npx ts-node --project tsconfig.json scripts/seed.ts
```

Or add to your npm scripts and run `npm run seed`.

**The seed script is safe to run multiple times** — it skips existing roll numbers.

---

## 6. Create First Admin

```bash
npx ts-node --project tsconfig.json scripts/create-admin.ts "Your Name" "admin@example.com" "your-password" SUPER_ADMIN
```

Arguments: `<name> <email> <password> [ADMIN|SUPER_ADMIN]`

Then go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in.

---

## 7. Import 2026 Students

Prepare a CSV file:

```
name,rollNumber,batch,background,email,mobile
Rahul Sharma,26MCMC01,2026,BCA,rahul@example.com,9876543210
Priya Singh,26MCMC02,2026,B.Sc. Mathematics,,
```

Then:

1. Go to **Admin → Students → Import CSV**
2. Upload the CSV
3. Preview the records
4. Click **Confirm Import**

---

## 8. Replace the QR Code

Place the actual PhonePe/UPI QR code image at:

```
public/contribution-qr.png
```

The contribute page will display it automatically. A placeholder SVG is currently in `public/contribution-qr-placeholder.svg` for reference.

---

## 9. Set SCIS Connect URL

Once your SCIS Connect platform is ready:

1. Go to **Admin → Event Settings**
2. Enter the URL in the **SCIS Connect URL** field and save.

Or update `NEXT_PUBLIC_SCIS_CONNECT_URL` in your `.env.local` / Vercel environment variables.

---

## 10. Deploy to Vercel

1. Push the project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Under **Environment Variables**, add all variables from your `.env.local`.
5. Click **Deploy**.

> **Important:** Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your Vercel deployment URL (e.g. `https://aarambh.vercel.app`).

---

## 11. Personalized RSVP Links

Share personalized invitation links with the 2025 batch students:

```
https://yoursite.vercel.app/rsvp?roll=25MCMC34
```

The RSVP page will automatically:
- Look up the student by roll number
- Display their name with a welcome message
- Pre-fill their name, roll number, and batch
- Show their current RSVP status if they've responded before

---

## 12. Managing Event Settings

Go to **Admin → Event Settings** to configure:
- Event name, date, time, venue
- Contact persons
- Schedule (add/edit/reorder items)
- Contribution receiver details
- SCIS Connect URL

Changes reflect immediately on the public website.

---

## 13. Exporting Attendance

From **Admin → Attendees**, click **Export CSV** to download all RSVP data including:
- Name, roll number, batch, mobile, email
- RSVP status (Attending / Not Attending / Pending)
- Check-in status
- Submission timestamp

---

## 14. Event Day Check-In

Go to **Admin → Event Day** on event day (03 October 2026).

- The page lists all confirmed attendees
- Use the search bar to find a student quickly
- Press **Check In** to mark their arrival
- Shows live count: Expected / Checked In / Remaining
- Works well on mobile — share the URL with volunteers

---

## Project Structure

```
aarambh/
├── app/
│   ├── page.tsx                    # Home page
│   ├── event/page.tsx              # Event details
│   ├── rsvp/page.tsx               # RSVP form (supports ?roll= param)
│   ├── batches/                    # Batch directory pages
│   ├── scis-connect/page.tsx       # SCIS Connect promo
│   ├── contribute/page.tsx         # Contribution page
│   ├── contact/page.tsx            # Contact page
│   ├── admin/                      # All admin pages (auth-protected)
│   │   ├── login/                  # Admin login
│   │   ├── page.tsx                # Dashboard
│   │   ├── attendees/              # RSVP management
│   │   ├── students/               # Student management + CSV import
│   │   ├── batches/                # Batch overview
│   │   ├── contributions/          # Contribution management
│   │   ├── check-in/               # Event day check-in
│   │   ├── settings/               # Event settings + schedule
│   │   └── audit-logs/             # Admin activity logs
│   └── api/                        # Route handlers
├── components/
│   ├── public/                     # Public-facing components
│   └── admin/                      # Admin panel components
├── models/                         # Mongoose models
├── actions/                        # Server actions
├── lib/                            # DB connection, auth, validations
├── scripts/                        # seed.ts, create-admin.ts
└── types/                          # Shared TypeScript types
```

---

## Remaining Placeholders

| Item | Location | Action Required |
|------|----------|----------------|
| QR Code | `public/contribution-qr.png` | Replace with actual PhonePe QR |
| SCIS Connect URL | Admin → Event Settings | Add URL when available |
| 2026 batch students | Admin → Students → Import CSV | Upload CSV after admissions |
| Event schedule times | Admin → Event Settings → Schedule | Confirm and update times |

---

## Privacy

- **Public pages** show only: Name, Roll Number, Background (no mobile, email, contribution amounts)
- **Admin pages** show full details including mobile numbers and transaction IDs
- MongoDB credentials are never exposed to the browser
- All mutations go through server-side actions with Zod validation
