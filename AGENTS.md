# AGENTS.md

## Project Overview

`react-native-calendar-ui` is a high-performance, headless calendar UI library for React Native. It provides powerful React hooks and pre-built components for building calendar interfaces across iOS, Android, and Web.

## Architecture

This is a **pure JavaScript/TypeScript library** with zero native dependencies. All calendar logic is implemented in TypeScript for maximum portability and ease of maintenance.

### Key Components

1.  **Hooks (`src/hooks/`)**:

    - `use-calendar.ts`: Main calendar state management hook
    - Provides month navigation, date selection, and calendar grid generation

2.  **Utilities (`src/utils/`)**:

    - `calendar-grid.ts`: Calendar grid generation (42-day grids with padding)
    - `date-math.ts`: Date arithmetic functions (addDays, addMonths, etc.)
    - `date-range.ts`: Date range utilities
    - `formatters.ts`: Date formatting using Intl API

3.  **Components (`src/components/`)**:

    - Pre-built calendar components (Calendar, CalendarHeader, CalendarGrid, CalendarDay)
    - Fully customizable and themeable

4.  **Constants (`src/constants/`)**:
    - Day and month name constants
    - Shared across the library

## Tech Stack

- **React Native**: Core framework
- **TypeScript**: Full type safety
- **React Hooks**: State management
- **Pure JavaScript**: No native code, works everywhere

## Important Files

- `packages/react-native-calendar-ui/src/hooks/use-calendar.ts`: Main calendar hook
- `packages/react-native-calendar-ui/src/utils/calendar-grid.ts`: Grid generation logic
- `packages/react-native-calendar-ui/src/index.ts`: Public API exports

## Design Philosophy

- **Headless First**: Powerful hooks for building custom UIs
- **Zero Dependencies**: No native code, no complex setup
- **Cross-Platform**: Works on iOS, Android, and Web out of the box
- **Performance**: Optimized with React memoization
- **Type-Safe**: Full TypeScript support
- **Well-Tested**: 100% test coverage

## Agent Commands

### Remove AI code slop

Search the codebase, remove all AI generated slop.

This includes:

- Extra comments that a human wouldn't add or is inconsistent with the rest of the file
- Extra defensive checks or try/catch blocks that are abnormal for that area of the codebase (especially if called by trusted / validated codepaths)
- Casts to any to get around type issues
- Any other style that is inconsistent with the file

Report at the end with only a 1-3 sentence summary of what you changed.

## Coding Standards

- **No Code Comments**: Do not add comments to the code. Code should be self-explanatory. Only add comments if absolutely necessary for complex, non-obvious logic.
- **No Defensive Programming**: Do not add extra defensive checks or try/catch blocks that are abnormal for the area of the codebase, especially if called by trusted codepaths.
- **Strict Typing**: Do not use `any` casts to get around type issues. Fix the types properly.
- **Consistent Style**: Match the existing coding style of the file perfectly. Do not introduce new formatting or conventions.
- **No Barrel Files**: Do not use `index.ts` files to export files in a folder. Always import directly from the specific file.
- **No Elevation / Old Shadows**: Never use `elevation` or older shadow props (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`). Always use the standardized `boxShadow` style prop for all platforms.

## Documentation Policy

- **Minimal Markdown Files**: Only create `.md` files when explicitly requested by the user. The root `README.md` is sufficient for most documentation needs.
- **No Extra Docs**: Do not create `IMPLEMENTATION_SUMMARY.md`, `VERIFICATION_CHECKLIST.md`, or similar files unless specifically asked.
