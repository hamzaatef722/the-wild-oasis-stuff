# 🏨 The Wild Oasis: Staff Dashboard

An internal management app for a boutique cabin hotel. Hotel staff use it every day to manage cabins, handle bookings, check guests in and out, and keep an eye on revenue.

**Live demo:** [the-wild-oasis-stuff.vercel.app](https://the-wild-oasis-stuff.vercel.app)

> This is the **staff-only** app. Guests don't log in here. The public guest website lives in a separate repo: [the-wild-oasis-client](https://github.com/hamzaatef722/the-wild-oasis-client). Both apps share the same Supabase backend.

<!-- Add a screenshot or GIF here: ![Dashboard screenshot](./public/screenshot.png) -->

## Why staff only?

Staff add and edit cabins, create bookings, and check guests in and out. That is write access to real data, so the app sits behind real authentication instead of a public form. I built this operational core first because it is the hard part: data flows, server state, and permissions.

## Features

- Staff authentication with Supabase Auth
- Cabin management: add, edit, duplicate, and delete cabins
- Bookings table with filtering, sorting, and pagination
- Check-in and check-out flow
- Dashboard with revenue stats and charts
- Form validation and inline error handling
- Toast notifications for every action
- Error boundary for graceful failures

<!-- Edit this list so it matches exactly what your app does. -->

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 18 |
| Build tool | Vite |
| Routing | React Router 6 (nested routes) |
| Server state | TanStack React Query 4 (caching, mutations, background refetching) |
| Backend | Supabase (Auth and Postgres) |
| Forms | React Hook Form |
| Charts | Recharts |
| Styling | styled-components |
| Dates | date-fns |
| UX | react-hot-toast, react-error-boundary, react-icons |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repository
git clone https://github.com/hamzaatef722/the-wild-oasis-stuff.git
cd the-wild-oasis-stuff

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# then fill in your Supabase values

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
the-wild-oasis-stuff/
├── public/          Static assets
├── src/             Application source code
├── .env.example     Environment variable template
├── index.html       App entry HTML
├── vite.config.js   Vite configuration
├── vercel.json      Vercel deployment config
└── package.json
```

<!-- Expand the src/ folder here (features, pages, services, ui, etc.) once you're happy with the structure. -->

## Deployment

Deployed on [Vercel](https://vercel.com). `vercel.json` handles client-side routing so deep links work on refresh. Remember to add the Supabase environment variables in the Vercel project settings.

## What I Learned

- Managing all server state with React Query instead of scattering loading spinners across components
- Designing a real backend with Supabase: auth, Postgres, and row-level permissions
- Building complex forms with React Hook Form
- Structuring a multi-page dashboard with nested routes

## Author

**Hamza Atef**
GitHub: [@hamzaatef722](https://github.com/hamzaatef722)
