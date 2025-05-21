# Sports Leagues SPA

This is a responsive single-page app built with **Next.js App Router** and **TypeScript** to display and filter sports leagues using the [TheSportsDB API](https://www.thesportsdb.com/api.php). Check out the deployed version
[here](https://sport-leagues.vercel.app). 

## AI Tools Used

- **ChatGPT 4o**: For scaffolding and folder structure decisions.
- **GitHub Copilot**: Coding in VS Code. 

## Decisions & Considerations

- Used a minimal, functional UI with priority on usability over visual polish (as per assignment scope)
- Avoided server-side rendering or server-side caching since the dataset is small and API latency is low
- Kept badge cache in memory with TTL for simplicity over localStorage/IndexedDB
- Could be extended with pagination, sorting, or more detailed league views

## Possible Further Improvements

- Use SWR or React Query for better caching and revalidation
- Persist search/sport filters in URL query params
- Add testing with Jest + React Testing Library
- Add unit types and stronger domain modeling for API responses

## Features

- List of leagues with name, sport, and alternate name
- Search filter by league name
- Dropdown filter by sport
- Click to view season badge (with cache)

## Run Locally

```bash
npm install
npm run dev
```

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint with `@typescript-eslint`
- **Formatting**: Prettier
- **Data Source**: [TheSportsDB API](https://www.thesportsdb.com/api.php)

## Implementation Details

- **Component-based structure** using reusable components: `SearchBar`, `SportFilterDropdown`, and `LeagueCard`
- **Responsive UI** built with Tailwind's utility-first classes
- **Client-side filtering** using `useState` and `useEffect`
- **Image caching** using a simple in-memory `Map` with TTL (1-hour expiry)
- **Badge display logic** with loading and error states for robust UX
- **Dark/light theme support** with Tailwind’s `dark:` variants
- **No usage of `any`** — enforced through `noImplicitAny` in `tsconfig` and `@typescript-eslint/no-explicit-any`

## Folder Structure

/app
- layout.tsx
- page.tsx
- globals.css
- favicon.ico

/components
- LeagueCard.tsx
- SearchBar.tsx
- SportFilterDropdown.tsx

/lib
- api.ts


## Linting & Formatting

Run linting:

```bash
npm run lint
```

Run Prettier fix:

```bash
npm run prettier
```