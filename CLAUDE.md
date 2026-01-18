# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Component Mapping**: `COMPONENT_MAP` in `/src/utils/mdx-components.ts` maps HTML elements to custom components
- **Writing Components**: Custom styled components in `/src/components/writing/` that extend standard HTML props
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

### Styling Approach
- **Tailwind CSS v4**: Version 4.1.17 with custom color variables in OKLCH color space
- **Responsive Design**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Custom Components**: Writing components have consistent styling for typography
- **Theme**: Uses custom CSS variables for colors defined in main.css
- **Dark Mode**: Full dark mode support with system preference detection

### Dark Mode / Theming System
- **Color Variables**: All colors defined in `/src/styles/main.css` using OKLCH in `@theme` block
- **Dark Mode**: `.dark` class on `<html>` overrides CSS variables for dark theme
- **Theme Context**: `/src/contexts/ThemeContext.tsx` manages theme state
- **Persistence**: User preference saved to localStorage (`theme-preference` key)
- **System Preference**: Respects `prefers-color-scheme` on first visit
- **FOIT Prevention**: Inline script in layout.tsx applies theme before React hydrates
- **Hydration Safety**: Uses `useSyncExternalStore` to prevent SSR/client mismatch
- **Toggle Placement**: Footer (all screens) + fixed upper-right (tablet/desktop via `hidden sm:block`)
- **Transitions**: 150ms smooth transitions on background-color and border-color

**Key Files:**
- `src/styles/main.css` - Color definitions for light/dark modes
- `src/contexts/ThemeContext.tsx` - Theme state, localStorage, system preference
- `src/components/ThemeToggle.tsx` - Toggle button with FiSun/FiMoon icons
- `src/components/FixedThemeToggle.tsx` - Fixed position wrapper for desktop
- `src/app/layout.tsx` - ThemeProvider wrapper + inline FOIT prevention script

### Next.js Configuration Notes
- **Version**: Next.js 16.1.2
- **MDX Integration**: Requires `transpilePackages: ['next-mdx-remote']` for proper compilation
- **File Tracing**: Includes `/posts/**/*` for deployment optimization
- **App Router**: Uses Next.js App Router architecture with React Server Components

### Error Handling Philosophy
- **Graceful Degradation**: Invalid frontmatter logs errors but continues processing other posts
- **404 Handling**: Posts not found trigger Next.js `notFound()` function
- **Type Safety**: Runtime validation prevents crashes from malformed content

### Development Notes
- **Package Manager**: Uses `pnpm` (not npm/yarn)
- **Versions**: Next.js 16.1.2, React 19.2.1, TypeScript 5.9.3
- **Directory Structure**: `src/app` (routes), `src/components`, `src/contexts`, `src/styles`, `src/utils`
- **ESLint**: v9.39.1 with native Next.js 16 flat config support (no FlatCompat needed)
- **ESLint Config**: Uses `eslint-config-next/core-web-vitals` directly in flat config format
- **TypeScript-ESLint**: Works alongside ESLint - parser understands TypeScript, plugin provides TypeScript-specific rules
- **Node Types**: Uses @types/node v24.10.2 and @types/react v19.2.7
- **Import Strategy**: Prefers `import type` for type-only imports (enforced by ESLint rule)