# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **HookHub**, a Next.js 16 application using the App Router pattern. The project is in early development stages.

## Commands

All commands should be run from the `hookhub/` directory:

```bash
# Development
npm run dev        # Start dev server at http://localhost:3000

# Build & Production
npm run build      # Create production build
npm run start      # Run production server

# Linting
npm run lint       # Run ESLint
```

## Architecture

- **Framework**: Next.js 16 with App Router (not Pages Router)
- **React**: React 19
- **Styling**: Tailwind CSS 4 with PostCSS
- **TypeScript**: Strict mode enabled

### Directory Structure

```
hookhub/
├── app/           # App Router pages and layouts
│   ├── layout.tsx # Root layout with Geist fonts
│   ├── page.tsx   # Home page
│   └── globals.css
├── public/        # Static assets
└── next.config.ts # Next.js configuration
```

### Path Aliases

Use `@/*` to import from the project root (configured in tsconfig.json).
