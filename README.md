# Terminal Portfolio

A terminal-themed personal portfolio built with React + Vite, styled after [terminal.shop](https://terminal.shop). Deployed via Docker + Nginx on Digital Ocean.

**Live:** [pcavendano.com](https://pcavendano.com)
**Old Portfolio (v1):** [pcavendano.com/v1/](https://pcavendano.com/v1/)
**GitHub:** [github.com/pcavendano/Portfolio](https://github.com/pcavendano/Portfolio)
**Digital Ocean Droplet:** Access via [DO Web Console](https://cloud.digitalocean.com/)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│                                                             │
│  React SPA (client-side routing via react-router-dom)       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /           → Readme.jsx    (about, skills, links)  │   │
│  │  /projects   → Projects.jsx  (featured + suitelets)  │   │
│  │  /blog       → Blog.jsx     (markdown post list)     │   │
│  │  /blog/:slug → BlogPost.jsx (rendered markdown)      │   │
│  │  /contact    → Contact.jsx  (CLI-style contact info) │   │
│  │  /v1/        → Old portfolio (static archive)        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Digital Ocean Droplet                          │
│                                                             │
│  Nginx (reverse proxy + static file server)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /var/www/pcavendano.com/       → New portfolio      │   │
│  │  /var/www/pcavendano.com/v1/    → Archived v1 site   │   │
│  │                                                      │   │
│  │  Config: /etc/nginx/conf.d/default.conf              │   │
│  │  - SPA fallback: try_files → /index.html             │   │
│  │  - Static assets: 1yr immutable cache                │   │
│  │  - /v1/ alias for old portfolio                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Flow

```
┌──────────┐     git push     ┌────────────────┐     SSH      ┌──────────────┐
│ Developer │ ───────────────► │ GitHub Actions  │ ──────────► │  DO Droplet  │
│ (local)   │    to main      │ deploy.yml      │             │              │
└──────────┘                  │                 │             │  1. git pull │
                              │ 1. checkout     │             │  2. npm ci   │
                              │ 2. npm ci       │             │  3. npm build│
                              │ 3. npm build    │             │  4. cp dist/ │
                              │ 4. SSH deploy   │             │  5. reload   │
                              └────────────────┘             │     nginx    │
                                                             └──────────────┘
```

## Blog Post Flow

```
┌─────────────────┐    Vite build     ┌──────────────────┐    Browser     ┌────────────┐
│ Markdown files  │ ──────────────►   │ import.meta.glob │ ────────────► │ React page │
│ src/content/    │   (eager, raw)    │ parseFrontmatter │               │ ReactMD    │
│  blog/*.md      │                   │ sort by date     │               │ rendering  │
└─────────────────┘                   └──────────────────┘               └────────────┘

Blog post format:
  ---
  title: "Post Title"
  date: "2026-03-28"
  tags: ["react", "portfolio"]
  excerpt: "Short description..."
  ---
  Markdown content here...
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Docker (optional local testing)

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 8080:80 portfolio

# Visit http://localhost:8080
```

## Production Deployment

### Automatic (recommended)

Push to `main` — GitHub Actions handles the rest:

```bash
git add -A
git commit -m "your changes"
git push origin main
```

Monitor at: `https://github.com/pcavendano/Portfolio/actions`

### Manual (via DO web console)

```bash
# SSH into droplet, then:
cd ~/portfolio
git fetch origin main
git reset --hard origin/main

npm ci
npm run build

# Deploy (preserves /v1/ archive)
sudo find /var/www/pcavendano.com -maxdepth 1 -not -name 'v1' -not -name '.' -exec rm -rf {} +
sudo cp -r dist/* /var/www/pcavendano.com/

# If nginx config changed:
sudo cp nginx/default.conf /etc/nginx/conf.d/default.conf
sudo nginx -t && sudo systemctl reload nginx
```

---

## Project Structure

```
portfolio/
├── src/
│   ├── main.jsx                     # Entry point (BrowserRouter)
│   ├── App.jsx                      # Route definitions
│   ├── components/
│   │   ├── TerminalLayout.jsx       # Shell: header + tabs + footer
│   │   ├── TabBar.jsx               # Navigation tabs
│   │   └── index.js                 # Barrel exports
│   ├── pages/
│   │   ├── Readme.jsx               # Home/about page
│   │   ├── Projects.jsx             # Projects showcase
│   │   ├── Blog.jsx                 # Blog post list
│   │   ├── BlogPost.jsx             # Individual post (markdown)
│   │   └── Contact.jsx              # Contact info
│   ├── data/
│   │   └── projects.json            # Project data
│   ├── content/
│   │   └── blog/                    # Markdown blog posts
│   │       └── *.md
│   ├── utils/
│   │   └── blog.js                  # Frontmatter parser + post loader
│   ├── styles/
│   │   ├── index.css                # Import hub
│   │   ├── reset.css                # CSS reset
│   │   ├── theme.css                # Colors, fonts, variables
│   │   ├── terminal.css             # Terminal UI patterns
│   │   └── pages.css                # Page-specific styles
│   └── assets/
│       └── fonts/                   # Geist Mono font files
├── public/
│   └── favicon.svg                  # Terminal >_ favicon
├── nginx/
│   └── default.conf                 # Nginx config (SPA + /v1/)
├── reference/                       # terminal.shop source (design ref)
├── Dockerfile                       # Multi-stage: Node build → Nginx
├── .github/workflows/deploy.yml     # CI/CD pipeline
├── index.html                       # HTML entry
├── vite.config.js                   # Vite config
└── package.json
```

## Tech Stack

| Layer      | Technology                          |
|-----------|--------------------------------------|
| Framework | React 18                             |
| Build     | Vite 4                               |
| Routing   | react-router-dom                     |
| Blog      | react-markdown + remark-gfm         |
| Styling   | Plain CSS + CSS custom properties    |
| Font      | Geist Mono (variable weight)         |
| Deploy    | GitHub Actions → SSH → Nginx         |
| Hosting   | Digital Ocean Droplet                |
| Container | Docker (Node 22 + Nginx Alpine)      |
| Analytics | Fathom (privacy-focused)             |

## Adding a Blog Post

1. Create a new file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2026-04-01"
tags: ["tag1", "tag2"]
excerpt: "A short description for the blog list."
---

Your markdown content here...
```

2. Commit and push — it's automatically included in the build.

## GitHub Secrets Required

| Secret              | Description                    |
|---------------------|--------------------------------|
| `DO_DROPLET_IP`     | Droplet public IP address      |
| `DO_SSH_USER`       | SSH username on the droplet    |
| `DO_SSH_PRIVATE_KEY` | SSH private key for auth      |

## LinkedIn CLI

The project includes a configured LinkedIn CLI for posting updates:

```bash
linkedin post "Just published a new blog post!" -v public
linkedin me    # View profile info
```

Config stored at `~/.linkedin/config.json`. Token expires every 2 months — re-auth with `linkedin login`.
