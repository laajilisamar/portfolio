# Samar Laajili — Portfolio

React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
```

```bash
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Edit your content

Everything you may want to change is in `src/data/portfolio.ts`
(profile, email, phone, projects, experience, education, skills, languages, links).

## CV files

Replace the PDFs in `public/cv/` (keep the same names):
- `samar-laajili-fr.pdf`
- `samar-laajili-en.pdf`

## Contact form

By default the form opens a pre-filled email in the visitor's mail app.
To receive messages directly in your inbox, create a free form at formspree.io,
copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT`.

## Theme

Pink/white colors and dark mode tokens are in `src/index.css`.
Dark mode toggle is in the navbar (remembers the visitor's choice).

## Deploy

Upload the `dist/` folder (after `npm run build`) to Netlify, Vercel or GitHub Pages.
