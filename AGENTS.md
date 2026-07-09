# AGENTS.md

Single source of truth for AI agent guidance in this repo (Claude Code, Amp, Cursor, etc.). Tool-specific entry points import this file — e.g. `CLAUDE.md` uses `@AGENTS.md`.

## Project Overview

A Next.js 16 blog built with TypeScript, Tailwind CSS v4, and MDX for content. The blog focuses on programming content around TypeScript, Go, and Rust. Uses strict TypeScript configuration with comprehensive type safety and modern ESLint v9 flat config.

## Development Commands

```bash
# Development
pnpm dev                 # Start development server with Turbo
pnpm build              # Build for production
pnpm start              # Start production server

# Quality Assurance  
pnpm type-check         # Run TypeScript compiler without emitting files
pnpm type-check:watch   # Watch mode for type checking
pnpm lint               # Run ESLint on all files
pnpm lint:fix           # Auto-fix ESLint issues
pnpm check-all          # Run both type checking and linting
pnpm pre-commit         # Comprehensive check with auto-fix for commits
```

## Architecture & Key Patterns

### Code Organization (vertical / feature-based)

Code is grouped by feature/domain, not by technical type ("code that changes together lives together"). Single `@/*` alias → `src/*`; no barrel files, no boundary-lint rules.

```
src/
  app/                    # routes only (thin); api/likes route lives here (App Router requirement)
  features/
    posts/                # blog-content domain
      posts.ts            # data layer: getAllPosts, loadBlogPost, getSubjectsOnly
      types.ts            # MyFrontmatter, Post
      PostList*.tsx  EmailAuthor.tsx  Thanks.tsx
      mdx/                # MDX render layer: mdx-components, CodeSnippet, Writing* components
      likes/              # LikeButton + likes-storage
      subjects/           # SubjectsList, FilteredTitle
    theme/                # ThemeContext, ThemeToggle, FixedThemeToggle
    home/                 # LandingTitle, TypewriterText
    layout/               # NavBar, Footer, TransitionProvider (site shell)
  design-system/          # reusable non-domain UI: Modal, CoolLetters
  lib/                    # generic utils: debounce, constants
  styles/                 # main.css
```

Tests are colocated in a `__tests__/` folder beside the code they cover.

### Content Management System
- **MDX Posts**: Content lives in `/posts/*.mdx` with frontmatter validation
- **Type Guards**: Runtime validation of frontmatter using `isValidFrontmatter()` instead of type assertions
- **Caching**: Blog post loading uses `React.cache()` for performance

### Post Processing Pipeline
1. Posts are read from `/posts` directory via `getAllPosts()`
2. Frontmatter is validated with type guards (not type assertions)  
3. Draft posts filtered out (`isDraft: false`)
4. Posts sorted by manual `id` field in descending order
5. Reading time calculated and cached

### TypeScript Safety Patterns
- **Strict Mode**: Full TypeScript strict mode enabled with additional checks
- **Type Guards Over Assertions**: Use `isValidFrontmatter(obj): obj is MyFrontmatter` pattern
- **Explicit Return Types**: All functions have explicit return types for better documentation
- **React 19 Compatibility**: Uses `React.JSX.Element` return types
- **JSX Transform**: Uses `"jsx": "react-jsx"` (React automatic runtime, set by Next.js 16)

### MDX Component Architecture
- **Component Mapping**: `COMPONENT_MAP` in `/src/features/posts/mdx/mdx-components.ts` maps HTML elements to custom components
- **Writing Components**: Custom styled components in `/src/features/posts/mdx/` that extend standard HTML props
- **MDX Integration**: Uses `next-mdx-remote/rsc` with custom component overrides

### Routing Structure
- **Home**: Lists all published posts with optional subject filtering
- **Post Pages**: `/writing/[slug]` - Dynamic routes for individual posts
- **Subject Pages**: `/subject/[topic]` - Filter posts by topic from frontmatter
- **Static Generation**: Posts are statically generated at build time

### Key Types
```typescript
export type MyFrontmatter = {
  title: string
  id: number        // Manual ordering system
  date: string
  description: string
  topics: string[]  // Used for subject filtering
  isDraft: boolean  // Filters posts from public view
}
```

### Styling Approach / Design Tokens
- **Single source of truth**: ALL design tokens live in the `@theme` block of `src/styles/main.css` (Tailwind CSS v4). Change a token there → whole site updates. Do NOT hardcode colors/sizes in components.
- **Semantic color roles** (OKLCH; light values in `@theme`, dark overrides in `.dark`):
  - `bg` (page, warm paper) / `surface` (cards, nav, modal, footer) / `border`
  - `fg` (body text) / `fg-muted` (meta, descriptions) / `heading`
  - `accent` (rust/sienna — links, topic hashtags, pills, focus ring, all interactive) / `accent-2` (raspberry — gradient end only, pairs w/ accent in `from-accent to-accent-2`) / `accent-bg` (tinted pill/button backgrounds)
- **One accent family only** — no second hue. Whimsy budget: title gradient + "( and trail running )" tagline words.
- **Dark mode values are deliberate**: bg oklch ~26% blue-tinted (NOT near-black), text 88% (NOT white) — calibrated against joshwcomeau/mitchellh/tkdodo. Elevation via surface lightness + borders, not shadows. All fg/bg token pairs pass WCAG AA (verified both modes).
- **Type scale** — custom `--text-*` tokens carry size + line-height + tracking + weight, generating utilities:
  - `text-body` 18px/1.7 (post prose, single size — no responsive bump) · `text-meta` 13px (mono meta: dates, read time, hashtags) · `text-h2` 24px (article headings) · `text-card-title` 20px (list titles) · `text-title`/`text-title-sm` 32/28px (post h1) · `text-display`/`text-display-sm` 52/36px (landing h1)
  - Responsive steps by composing: `text-title-sm sm:text-title`, `text-display-sm lg:text-display`
- **Fonts**: Geist Sans → `--font-sans`, Geist Mono → `--font-mono`, mapped in `@theme`; font vars set on `<html>` in layout.tsx. (Mapping is required — without it Tailwind falls back to system stack.)
- **Post prose column**: `max-w-[44rem]` (~65ch at 18px)
- **Code blocks**: `bright` with paired themes `github-light`/`github-dark-dimmed`, follows the `.dark` class via `lightSelector: 'html:not(.dark)'` (CodeSnippet.tsx)
- **OG images** (`opengraph-image.tsx`, satori): can't read CSS vars — palette hardcoded as hex, keep in sync with tokens when accent changes
- **Post list**: flat rows (no cards) — title / muted description / mono meta line `date · N min read · #topic #topic`, hairline dividers
- **Responsive Design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints

### Dark Mode / Theming System
- **Color Variables**: semantic role tokens (see Styling Approach above) in `/src/styles/main.css` `@theme` block, OKLCH
- **Dark Mode**: `.dark` class on `<html>` overrides CSS variables for dark theme
- **Theme Context**: `/src/features/theme/ThemeContext.tsx` manages theme state
- **Persistence**: User preference saved to localStorage (`theme-preference` key)
- **System Preference**: Respects `prefers-color-scheme` on first visit
- **FOIT Prevention**: Inline script in layout.tsx applies theme before React hydrates
- **Hydration Safety**: Uses `useSyncExternalStore` to prevent SSR/client mismatch
- **Toggle Placement**: Footer (all screens) + fixed upper-right (tablet/desktop via `hidden sm:block`)
- **Transitions**: 150ms smooth transitions on background-color and border-color

**Key Files:**
- `src/styles/main.css` - Color definitions for light/dark modes
- `src/features/theme/ThemeContext.tsx` - Theme state, localStorage, system preference
- `src/features/theme/ThemeToggle.tsx` - Toggle button with FiSun/FiMoon icons
- `src/features/theme/FixedThemeToggle.tsx` - Fixed position wrapper for desktop
- `src/app/layout.tsx` - ThemeProvider wrapper + inline FOIT prevention script

### Next.js Configuration Notes
- **Version**: Next.js 16.2.10
- **MDX Integration**: Requires `transpilePackages: ['next-mdx-remote']` for proper compilation
- **File Tracing**: Includes `/posts/**/*` for deployment optimization
- **App Router**: Uses Next.js App Router architecture with React Server Components

### Error Handling Philosophy
- **Graceful Degradation**: Invalid frontmatter logs errors but continues processing other posts
- **404 Handling**: Posts not found trigger Next.js `notFound()` function
- **Type Safety**: Runtime validation prevents crashes from malformed content

### Development Notes
- **Package Manager**: Uses `pnpm` (not npm/yarn)
- **Versions**: Next.js 16.2.10, React 19.2.7, TypeScript 6.0.3
- **Directory Structure**: vertical/feature-based — see Code Organization below
- **ESLint**: v9.39.4 with native Next.js 16 flat config support (no FlatCompat needed)
- **ESLint Config**: Uses `eslint-config-next/core-web-vitals` directly in flat config format
- **TypeScript-ESLint**: Works alongside ESLint - parser understands TypeScript, plugin provides TypeScript-specific rules
- **Node Types**: Uses @types/node v26.1.0 and @types/react v19.2.17
- **Import Strategy**: Prefers `import type` for type-only imports (enforced by ESLint rule)

## Skills

Reusable agent skills (agent-skills `SKILL.md` spec) live in this repo but are **not tracked in git** (local-only).

- **Canonical location**: `.agents/skills/` (Amp's discovery path). This is the source of truth — real files live here.
- **Claude Code discovery**: `.claude/skills` is a symlink to `../.agents/skills`, so Claude Code auto-discovers the same physical files.
- Both dirs are gitignored; add skills locally per machine.

Current skills: `web-design-guidelines`.
