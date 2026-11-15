# Gulp + HTML Partials Boilerplate

A modern front-end starter kit powered by **Gulp 5**, supporting HTML partials with variables via `gulp-file-include`, CSS minification, JS uglification, asset copying, and live reloading with `browser-sync`.

---

## 📁 Project Structure

```text
wari2.0/
├── dist/                     # Compiled production-ready output
│   ├── css/
│   ├── js/
│   ├── images/
│   └── index.html
├── src/                      # Source files
│   ├── css/
│   │   └── style.css         # Stylesheets
│   ├── js/
│   │   └── script.js         # JavaScript files
│   ├── images/               # Raw images
│   ├── partials/             # Reusable HTML snippets
│   │   ├── header.html
│   │   ├── navbar.html
│   │   └── footer.html
│   └── index.html            # Main page importing partials
├── gulpfile.js               # Gulp workflow configuration
├── package.json              # Project dependencies & npm scripts
└── README.md
```

---

## 🚀 Quick Start

### 1. Start Development Server (Live Reload)
```bash
npm run dev
# or
npx gulp
```
- Starts a local server at `http://localhost:3000`.
- Watches `src/**/*.html`, `src/css/**/*.css`, and `src/js/**/*.js` for live changes.

### 2. Build for Production
```bash
npm run build
# or
npx gulp build
```
- Cleans `dist/`.
- Compiles HTML partials.
- Minifies CSS and JavaScript with sourcemaps.
- Copies all static assets to `dist/`.

---

## 🧩 How to Use HTML Partials

Use the `@@include` syntax provided by `gulp-file-include`:

### Simple Partial Inclusion
```html
@@include('./partials/navbar.html')
```

### Passing Variables to Partials
In `src/index.html`:
```html
@@include('./partials/header.html', {
  "title": "Wari | Houses Of Stories"
})
```

In `src/partials/header.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>@@title</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-gray-100">
```
