# 🎧 AURA TWS

AURA TWS is a modern landing page concept for a premium True Wireless Stereo (TWS) product.

This project focuses on creating a clean user interface, cinematic product presentation, and scroll-driven storytelling while maintaining a responsive and accessible experience.

> **Status:** 🚧 In Development

---

## ✨ Features

- **Scroll-driven storytelling** — nine product chapters on a sticky stage, with discrete crossfades plus a continuous scroll-scrub layer (scale and drift follow your scrolling)
- **Physics-based motion system** built on [Motion](https://motion.dev), with shared timing tokens and variants in `src/motion/tokens.js`
- **Chapter progress rail** — a dot navigation that fades in with the story and jumps to any chapter on click
- **Metric count-ups** — numeric specs animate up as their chapter activates (skipped under reduced motion)
- **Staggered section reveals** and an orchestrated hero entrance
- **Hide-on-scroll navbar** with scrollspy, plus a mobile navigation drawer
- **Generative canvas hero** — simplex-noise ribbons that pause when off-screen and render a static frame under reduced motion
- **Centralized copy** — all text lives in `src/content/`, so editing words never touches components
- **Accessible by default** — `prefers-reduced-motion` respected at every layer, keyboard-friendly navigation, AA-readable active content

---

## 🛠 Built With

- [React 19](https://react.dev)
- [Vite 6](https://vite.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Motion 13](https://motion.dev) (`motion/react`)

---

## 📁 Project Structure

```
src/
├── content/              # All page copy (story chapters, features, specs)
├── motion/tokens.js      # Animation timing, easing, and shared variants
├── hooks/                # Scroll progress, frame sync, preloader, reduced motion
├── utils/                # Pure logic (scroll → frame resolution)
├── components/
│   ├── layout/           # Navbar, footer, progress bar
│   ├── storytelling/     # Product stage, story blocks, chapter rail
│   ├── ui/               # Generative canvas hero
│   └── common/           # Button, badge, container
├── sections/             # Hero, Storytelling, Features, Specs, CTA
└── styles/               # Tailwind layers and typography
```

---

## 🚀 Getting Started

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## 📌 Project Status

This project is under active development. Recent work added the Motion-based animation system, the content layer, and the storytelling redesign.

Still on the roadmap:

- Colorway section (Paper White / Ink Black)
- Unit tests for the scroll-to-frame resolver
- Lint setup

---

## 📄 License

This project is created for learning and portfolio purposes.
