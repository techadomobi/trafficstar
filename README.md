# Trackstart

Merged `Trackstart` frontend with the `Adomobi` dashboard under `/admin/*`.

## Local run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Deploy on Vercel

If your Git repository root is `fulltraffic`, set:

- Root Directory: `trackstart`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty

If you deploy from inside the `trackstart` folder itself, keep the root directory as the project root and use the same commands above.

## Required environment variables

- `API_UPSTREAM=https://apiv2.offersmeta.in/`

Optional:

- `NEXT_PUBLIC_API_BASE=/api/`
- `NEXT_PUBLIC_API_UPSTREAM=https://apiv2.offersmeta.in/`

Recommended:

- Keep frontend requests on `/api/*` so the browser talks to the Next.js proxy instead of calling the upstream API directly.
- Set `API_UPSTREAM` in Vercel Project Settings so server-side route handlers proxy to the correct backend.

## Notes

- Login page: `/`
- Signup page: `/signup`
- Dashboard after login: `/admin`
- API proxy route: `/api/[...path]`

## Verified locally

- `npm run build` passes
- `npm start` serves the app successfully
- Main routes under `/` and `/admin/*` return `200`

## About API checks

The local terminal check for upstream API calls can return `502` in restricted environments because the Next.js proxy cannot reach the external backend from the current machine/session. That does not necessarily mean Vercel will fail, but `API_UPSTREAM` must be set correctly.
