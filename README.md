# Ambrace

The ambrace.in website: the landing page, an investors page (linked from the
footer only) and the privacy policy. It is a static Next.js site: `npm run build`
writes plain files to `out/`, which Vercel or any static host can serve.

## Run it

```sh
npm install
npm run dev        # http://localhost:3000
```

## Settings

| Variable              | What it does                                                | Default                      |
| --------------------- | ----------------------------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_APP_URL` | Where "Try now" sends people (the app). Read at build time. | `https://app-dev.ambrace.in` |

Set `NEXT_PUBLIC_APP_URL=https://app.ambrace.in` for the production build.

## Checks

```sh
npm run lint && npm run typecheck && npm test && npm run build
```

## Where things are

- `lib/site.ts`: the facts the site states (contacts, founders, backers, headlines).
- `components/landing/`: the hero, its scene and the landing sections.
- `app/investors`, `app/privacy`: the reading pages.
- `public/partners/`: backer logos, used as supplied.
