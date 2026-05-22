# 🏟️ SportNest — Sports Facility Booking Platform

A full-stack sports facility booking management system built with the MERN stack and Better Auth authentication. Users can explore, book, and manage sports facilities like football turfs, badminton courts, swimming pools, and tennis courts.

---

## 🌐 Live URL

> **[https://sport-nest-seven.vercel.app/](https://sport-nest-seven.vercel.app/)**

---

## 🎯 Purpose

SportNest is a real-world inspired sports reservation portal where users can:
- Browse available sports facilities
- Book facilities for specific dates and time slots
- Manage their own facility listings
- Track and cancel their bookings

---

## ✨ Features

### 🔐 Authentication
- Email & password registration with validation (min 6 chars, uppercase, lowercase)
- Google OAuth login via Better Auth
- Persistent session management (no redirect on private route reload)
- Profile dropdown with quick navigation

### 🏠 Home Page
- Hero banner with call-to-action
- Featured facilities section (minimum 6 cards from database)
- How It Works section
- Testimonials / Stats section

### 🏟️ Facilities
- Browse all facilities (public)
- Filter by sport type
- Search by facility name (MongoDB `$regex`)
- Facility detail page with full info
- Booking form with date, time slot, duration & auto-calculated price

### 📅 Bookings
- Create bookings saved to MongoDB with `status: "pending"`
- View all personal bookings (private route)
- Cancel any booking

### ➕ Add & Manage Facilities
- Add new facility with image upload (imgbb)
- Auto-fill owner email from session
- Edit or delete own facilities (private route)
- Confirmation dialog before delete

### 🔒 Private Routes
- My Bookings, Add Facility, Manage Facilities — protected
- Logged-in users stay on private routes after reload
- Unauthenticated users redirected to login

### 🎨 UI & UX
- Fully responsive — mobile, tablet, desktop
- Dark themed modern design with lime green accent
- Framer Motion animations throughout
- Toast notifications (no default alerts)
- Custom 404 Not Found page
- Loading spinners during data fetch

### 🔑 Security
- JWT tokens stored in HTTP-only cookies
- Middleware to protect private API routes
- MongoDB credentials secured via environment variables

---

## 📦 NPM Packages Used

### Client Side

| Package | Purpose |
|---|---|
| `next` | React framework (App Router) |
| `react` / `react-dom` | UI library |
| `better-auth` | Authentication (email + Google OAuth) |
| `framer-motion` | Animations and transitions |
| `@heroui/react` | UI component library (Avatar, Button etc.) |
| `lucide-react` | Icon library |
| `react-icons` | Additional icons (Fi, Bs sets) |
| `react-toastify` | Toast notifications |
| `axios` | HTTP requests |
| `tailwindcss` | Utility-first CSS framework |

### Server Side

| Package | Purpose |
|---|---|
| `express` | Node.js web framework |
| `mongodb` | MongoDB native driver |
| `better-auth` | Auth session & JWT management |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |
| `jsonwebtoken` | JWT generation & verification |
| `cookie-parser` | Parse HTTP-only cookies |

---

## 🗃️ Database Schema

### `facilities` Collection
```json
{
  "name": "string",
  "sportType": "string",
  "imageUrl": "string",
  "location": "string",
  "pricePerHour": "number",
  "capacity": "number",
  "slots": ["string"],
  "description": "string",
  "ownerEmail": "string"
}
```

### `bookings` Collection
```json
{
  "facilityId": "string",
  "facilityName": "string",
  "facilityImage": "string",
  "facilityLocation": "string",
  "userId": "string",
  "userName": "string",
  "userEmail": "string",
  "date": "string",
  "timeSlot": "string",
  "duration": "number",
  "total": "number",
  "status": "pending | confirmed | cancelled",
  "createdAt": "ISO string"
}
```

---

## 🚀 Run Locally

### Client
```bash
git clone https://github.com/your-username/sportnest-client
cd sportnest-client
npm install
npm run dev
```

### Server
```bash
git clone https://github.com/your-username/sportnest-server
cd sportnest-server
npm install
npm run dev
```

### Environment Variables

**Client `.env.local`**
```env
BETTER_AUTH_SECRET=secret
BETTER_AUTH_URL= ********
NEXT_PUBLIC_BETTER_AUTH_URL= ********
MONGODB_URI=mongodb_connection_string
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
```

**Server `.env`**
```env
PORT=*****
MONGODB_URI=mongodb_connection_string
JWT_SECRET=jwt_secret
```

---

## 📁 Project Structure

**Client**
```
client/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   ├── facility/
│   │   ├── my-bookings/
│   │   ├── add-facility/
│   │   ├── manage-facilities/
│   │   ├── login/
│   │   └── signup/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   └── lib/
│       └── auth-client.js
```

**Server**
```
server/
├── index.js
└── .env
```

## 🛠️ Tech Stack

**Frontend:** Next.js 15, React 19, Tailwind CSS, Framer Motion, HeroUI  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Auth:** Better Auth (Email + Google OAuth)  
**Deployment:** Vercel (client), Render (server)

---

## 👤 Author

**Md. Fazle Rabbi**  
📧 rabbitkgbd@gmail.com  
🔗 [GitHub](https://github.com/rabbitkg) · [LinkedIn](https://www.linkedin.com/in/md-fazle-rabbi-b335223b0/)

---

*© 2026 SportNest. All rights reserved.*