# Gen AI Quiz — Static Web Demo

Simple, professional static demo of the Gen AI Quiz web app (HTML/CSS/JS).

## Features
- Responsive, modern UI with professional colors & fonts.
- Toggle to use AI (expects a backend endpoint `/api/generate?n=5&topic=...`).
- Local mock question generator fallback for demo.
- Easy to deploy to GitHub Pages / Netlify / Vercel.

## How to use
1. Unzip and open `index.html` in browser for a local demo.
2. To enable AI generation:
   - Host a backend endpoint `/api/generate` that returns JSON array:
     ```json
     [{ "question":"...","options":["...","...","...","..."], "correct":"..."}]
     ```
   - Or modify `fetchQuestions()` in `app.js` to point to your backend.
3. Deploy: upload the files (root containing `index.html`) to GitHub Pages, Netlify, or Vercel.

## Files
- index.html
- styles.css
- app.js
- README.md

