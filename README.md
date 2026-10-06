# Mongolian Food Composition Database - SPA (2.1-2.5)

Hash router, page layout, navbar, i18n (MN/EN) бүхий Single Page Application.

## Ажиллуулах
1. VS Code дээр хавтсыг нээнэ.
2. `src/index.html` дээр баруун товч -> **Open with Live Server**.
   (CSS нь `src/css/main.css` дотор бэлэн байгаа тул npm заавал шаардлагагүй.)
3. SCSS засах бол: `npm install` -> `npm run sass`

## Хуудсууд
`#/overview`, `#/search`, `#/calculation`, `#/books`, `#/contact`, буруу хаяг -> 404

## GitHub Pages
`docs/` хавтас нь `src/`-ийн хуулбар. Settings -> Pages -> Branch: master, Folder: /docs
Өөрчлөлт хийсний дараа: `rm -rf docs/*` ; `cp -r src/* docs/`
