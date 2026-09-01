# SETUP

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Checks

```bash
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.

## Structure

- `src/App.jsx`: page components, content, navigation, and inquiry form
- `src/styles.css`: responsive design system and light/dark theme tokens
- `src/main.jsx`: React application entry point
- `index.html`: document metadata and Vite mount point

## Routes

- `/`: home
- `/kitchens`: kitchen renovation service
- `/bathrooms`: bathroom renovation service
- `/portfolio`: project portfolio
- `/about`: company approach
- `/contact`: project inquiry form

The app uses browser history routing. Production hosting must rewrite unknown
paths to `index.html` so direct visits and page refreshes work correctly.
