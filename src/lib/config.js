// Browser-facing API base. Requests go through the Next.js proxy by default.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api/";
