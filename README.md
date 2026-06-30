# Max Kemzi — Portfolio

My personal portfolio website, showcasing my projects, background, and a way to get in touch. Live at [maxkemzi.com](https://maxkemzi.com).

## Overview

A full-stack Next.js application that presents my work as a developer — a hero section, an about/bio section, a dynamically rendered project showcase with categories, technologies, and status badges (in progress, completed, dropped, on hold), individual project pages with case studies and screenshots, and a contact form.

Project and technology data is stored in MongoDB via Prisma rather than hardcoded, so adding or updating a project doesn't require touching the codebase — it's seeded/managed through the database layer.

## Features

- **Dynamic project showcase** — projects, categories, and technologies are modeled relationally (`Project` ↔ `ProjectCategory` ↔ `Technology` via a join table) and rendered from the database
- **Individual project pages** — each project has its own page with a case study, live demo screenshot/preview, links to the live app and source repository, and a technology list
- **Status badges** — projects are tagged as in progress, completed, dropped, or on hold
- **Contact form** — built with React Hook Form, Zod validation, and `next-safe-action` for type-safe server actions, with email delivery via Nodemailer
- **Rate limiting** — a `RateLimit` model tracks requests per IP to prevent contact form abuse
- **Markdown rendering** — project case studies and overviews are written in Markdown and rendered with `react-markdown` and `remark-gfm`
- **Image optimization** — `sharp` for image processing
- **Animations** — Framer Motion for page transitions and UI motion
- **Responsive, dark-themed design** — built with Tailwind CSS

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Phosphor Icons](https://phosphoricons.com/)

**Forms & Validation**
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) + [zod-form-data](https://www.npmjs.com/package/zod-form-data)
- [next-safe-action](https://next-safe-action.dev/) — type-safe Server Actions

**Backend & Data**
- [Prisma](https://www.prisma.io/) ORM
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/) — contact form email delivery

**Content**
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) — Markdown rendering for project case studies
- [sharp](https://sharp.pixelplumbing.com/) — image processing

**Testing**
- [Vitest](https://vitest.dev/) — unit tests
- [Playwright](https://playwright.dev/) — end-to-end tests
- [Testing Library](https://testing-library.com/)

**Tooling**
- ESLint (Airbnb config) + Prettier
- Docker

## Data Model

Projects are modeled relationally rather than as static content:

- **`Project`** — title, description, overview (Markdown), status, image, live/repo URLs, category, and an associated start date
- **`ProjectCategory`** — groups projects (e.g. Full Stack, Frontend, Backend)
- **`Technology`** — individual technologies with a `priority` field controlling display order
- **`ProjectTechnologies`** — join table linking projects to their technologies
- **`RateLimit`** — tracks request counts per IP for basic contact form abuse prevention

This structure means new projects can be added by seeding the database rather than writing new components or pages.

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or hosted, e.g. MongoDB Atlas)

### Installation

```bash
git clone https://github.com/maxkemzi/portfolio.git
cd portfolio
npm install
```

### Environment Variables

Create a `.env.local` file (see `.env.local.example` for the full list):

```bash
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.ye9h8er.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0"
SMTP_HOST=smtp_host
SMTP_PORT=smtp_port
SMTP_USER=smtp_user
SMTP_PASSWORD=smtp_password
EMAIL_TO=email_to
```

### Database setup

```bash
npm run db:push
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Testing

```bash
npm run test:unit    # Vitest unit tests
npm run test:e2e      # Playwright end-to-end tests
npm test                  # Run both
npm run coverage      # Unit test coverage report
```

### Linting & Formatting

```bash
npm run lint
npm run fmt
```

## Deployment

Deployed via Docker on AWS Lightsail, alongside other projects on the same instance, behind Nginx.

```bash
docker build -t portfolio .
docker compose up -d
```

## Author

**Maksym Kyrychenko**
Full Stack Developer based in Riga, Latvia
[kyoutenails.com](https://kyoutenails.com) · [GitHub](https://github.com/maxkemzi)
