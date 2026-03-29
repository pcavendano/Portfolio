---
title: "Building a Terminal-Themed Portfolio"
date: "2026-03-28"
tags: ["react", "portfolio", "design"]
excerpt: "Why I rebuilt my portfolio to look like a terminal — and what I learned along the way."
published: true
---

## Why a terminal theme?

When I first built my portfolio as a student at College Maisonneuve, I went with a food/recipe theme — projects were "recipes", tech stacks were "ingredients". It was fun, creative, and reflected where I was at the time.

But I've changed since then. I'm now a SuiteScript developer building production applications on NetSuite. My daily tools are the terminal, code editors, and CLI interfaces. A terminal-themed portfolio felt like the natural evolution.

## What I'm building now

At my current role, I build internal tools that solve real business problems:

- **Training platforms** — learning apps with quizzes, progress tracking, and bilingual support
- **Real-time dashboards** — KPI metrics for warehouse and company operations
- **Integration monitors** — keeping WMS and e-commerce platforms in sync with the ERP
- **Data tools** — query builders, CSV import engines, image downloaders

These aren't flashy portfolio pieces with fancy animations. They're tools that people use every day to do their jobs better. I wanted my portfolio to reflect that — minimal, functional, focused on content.

## The tech

This site is built with React + Vite, styled with plain CSS, and deployed via Docker + Nginx. The terminal aesthetic comes from:

- **Geist Mono** font (the same one terminal.shop uses)
- A dark color palette inspired by modern terminal emulators
- Line-height and spacing that mimics terminal output
- Navigation styled as tabs in a terminal window

Blog posts are written in Markdown and processed at build time — no CMS, no database, just files in a git repo.

## Keeping the old one around

I kept my original portfolio accessible at `/v1/`. Not because it's polished — it's not — but because it shows where I started. Growth is part of the story.
