# Swift Line Shipping & Stevedoring — Website

A complete, professional, bilingual (Arabic/English) corporate website for **Swift Line Shipping & Stevedoring** (سويفت لاين للشحن والتفريغ والخدمات الملاحية), a Yemeni stevedoring company based in Al Hudaydah.

---

## 📁 Project Structure

```
swiftline/
├── index.html              Main HTML (single-page bilingual site)
├── css/
│   ├── style.css           Main stylesheet (design tokens, all sections, responsive)
│   └── logo-fallback.css   Logo text fallback when image not available
├── js/
│   └── script.js           Language switching, theme, mobile nav, form, animations
├── images/
│   ├── logo.png            ← REQUIRED: Place company logo here
│   └── og-image.jpg        ← OPTIONAL: Social media preview image (1200×630px)
├── favicon/
│   ├── favicon.ico         ← REQUIRED: Generate from logo
│   ├── favicon-32x32.png   ← REQUIRED: Generate from logo
│   ├── favicon-16x16.png   ← REQUIRED: Generate from logo
│   └── apple-touch-icon.png← REQUIRED: Generate from logo
└── README.md
```

---

## 🚀 Getting Started

### 1. Add the Logo

Place the company logo file at:
```
images/logo.png
```

The logo should be:
- PNG format with transparent background
- Recommended: at least 320×112px (or any aspect ratio matching the original)
- The website will display it at up to 160px wide in the header

If the logo is not placed, the site shows a clean text fallback ("SL Swift Line").

### 2. Generate Favicons

Use the logo to generate favicons. Recommended tool: [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net)

Place the generated files in the `favicon/` folder.

### 3. Open Locally

Simply open `index.html` in any modern browser — **no server required**.

```
swiftline/index.html
```

---

## 🌐 Features

| Feature | Status |
|---|---|
| Arabic (RTL) language | ✅ Default |
| English (LTR) language | ✅ Switchable |
| Language persists in localStorage | ✅ |
| Light Mode | ✅ Default |
| Dark Mode | ✅ Full maritime dark theme |
| System preference detection | ✅ |
| Theme persists in localStorage | ✅ |
| Responsive (mobile/tablet/desktop) | ✅ |
| Mobile hamburger menu | ✅ |
| Smooth scrolling | ✅ |
| Scroll-based nav highlighting | ✅ |
| Scroll reveal animations | ✅ |
| Reduced motion support | ✅ |
| Contact form (mailto fallback) | ✅ |
| Form validation | ✅ |
| WhatsApp quick link | ✅ |
| SEO metadata (AR + EN) | ✅ |
| Open Graph tags | ✅ |
| JSON-LD structured data | ✅ |
| Accessibility (ARIA, focus) | ✅ |
| No backend required | ✅ |
| Static hosting ready | ✅ |

---

## 📞 Contact Info Configured

| | Value |
|---|---|
| Email | contact@swiftline-ye.com |
| Phone | +967 10 10 10 933 |
| WhatsApp | +967 770 000 028 |
| Location | Al Hudaydah, Yemen |

---

## 🎨 Design System

### Color Palette
- **Primary Navy:** `#0a1628`
- **Ocean Blue:** `#1e4d8c`
- **Maritime Orange (Accent):** `#e8710a`
- **Background Light:** `#f8f9fb`
- **Background Dark:** `#07101f`

### Fonts
- **Arabic:** Cairo (Google Fonts)
- **English:** Manrope (Google Fonts)

---

## 🌍 Deployment

This is a fully static website. Deploy to:

- **Cloudflare Pages** — drag & drop the folder
- **GitHub Pages** — push to a `gh-pages` branch
- **Netlify** — drag & drop or connect a Git repo
- **Vercel** — connect a Git repo and deploy
- **Any web host** — upload all files via FTP/SFTP

No server configuration, no `.htaccess` required for basic operation.

---

## 📬 Contact Form

The contact form uses a **mailto: fallback**, which opens the user's email client with a pre-filled message. This works without any backend.

### To connect to a real form backend later:

**Option A — Formspree:**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. In `js/script.js`, replace the `mailto:` logic with a `fetch()` POST to your Formspree endpoint

**Option B — Netlify Forms:**
1. Add `netlify` attribute to the `<form>` tag
2. Netlify automatically handles form submissions
3. No backend code needed

---

## 🔍 SEO

- Dual-language meta tags (Arabic/English)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data for LocalBusiness
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Proper H1/H2/H3 hierarchy (one H1 per page)
- Image `alt` attributes
- `fetchpriority="high"` on LCP hero image
- `loading="lazy"` on below-the-fold images

---

## ⚙️ Technical Notes

- **No JavaScript frameworks** — pure Vanilla JS
- **No CSS frameworks** — pure CSS3 with custom properties
- **No build tools required** — works by opening index.html
- **Images** — royalty-free from Unsplash (loaded via CDN URLs)
- **Fonts** — Google Fonts CDN with `display=swap`

---

© 2026 Swift Line Shipping & Stevedoring. All rights reserved.
