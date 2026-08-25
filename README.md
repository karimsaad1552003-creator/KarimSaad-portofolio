# Karim Mohamed Saad — Portfolio

Premium personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and subtle motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update your content

All site content lives in one place:

- `src/data/portfolio.ts` — name, about, skills, projects, experience, education, certifications, SEO, social links
- `public/assets/cv/` — CV PDF
- `public/assets/images/` — profile photo
- `public/assets/projects/` — project screenshots
- `public/assets/certificates/` — certificate files

After adding LinkedIn / GitHub URLs, uncomment or add them in `portfolioData.socials`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Notes

- GPA is stored but hidden by default (`showGpa: false`)
- Contact form opens the visitor’s email client (mailto) with a pre-filled message
- Theme switcher supports light / dark / system
