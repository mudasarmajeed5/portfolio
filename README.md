# Mudassar’s Portfolio

A GNOME-inspired portfolio desktop with a system bar, application dock, movable windows, wallpaper themes, project folders, and Snake.

## Development

Use npm and the committed `package-lock.json`:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint` and `npm run build` before submitting changes. `npm start` serves a production build. The build downloads the configured Geist fonts from Google Fonts.

## Adding projects

Create a `.md` file in `content/projects/`. Files are discovered automatically at build time, sorted by filename, and displayed as folders in the Projects app.

```md
---
title: My Project
category: Web application
technologies: Next.js · TypeScript
image: /projects/my-project/cover.jpg
---
A short description of the project.

More details about the work and its results.

![A screen from the project](/projects/my-project/screen.jpg)
```

Metadata uses one scalar value per line. `title`, `category`, `technologies`, `image`, and `description` are supported. The first paragraph supplies the description when it is omitted. Body paragraphs and standalone Markdown images appear inside the opened folder.

Place local images in `public/projects/my-project/`. A missing cover or body image shows a styled placeholder. Adding the referenced file makes it appear on the next page load after deployment; no component changes are needed. Rebuild and deploy after changing Markdown content or adding assets.

## Themes and game

Launch apps from the desktop, dock, or searchable Activities view. Windows support dragging, minimizing, maximizing, and closing; on phones they fill the workspace above the dock. Three themes apply across the portfolio. The selected theme and Snake best score are saved locally on the visitor’s device. Snake uses a canvas animation loop with interpolated movement and queued input. It accepts arrows/WASD while focused, swipe or directional buttons on phones, Space to pause, and has pause/resume and restart controls. It pauses when its window is inactive or the page is hidden.
