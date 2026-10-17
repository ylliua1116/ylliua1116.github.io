# Academic Website

A minimalist academic website built with Next.js, TypeScript, and Tailwind CSS. Designed for clear presentation of research interests, publications, experience, and an academic CV.

## Features

- Responsive layout with light and dark themes
- English and Chinese content
- Interactive research visualizations and diagrams
- Publication listings with search, filtering, and citation utilities
- Research illustrations and animated SVG previews
- Structured CV page with PDF viewing and downloading
- Markdown-based content updates
- Static-site export for GitHub Pages

## Development

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:3000`).

## Production build

```bash
npm run build
```

The site is configured for static export. The generated files are written to `out/`.

## Project structure

```text
src/            Application routes, components, styles, and data
content/        English content
content_zh/     Chinese content
public/         Static assets, diagrams, and PDFs
.github/        GitHub Actions workflows
```

## Deployment

The repository includes a GitHub Actions workflow for publishing the static build to GitHub Pages. Configure GitHub Pages to use **GitHub Actions** as the deployment source, then review the workflow run after pushing changes.

## Content maintenance

Website content and downloadable PDF documents are maintained separately. Update the appropriate content files and assets, verify the local build, and deploy the new version.
