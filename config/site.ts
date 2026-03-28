export const siteConfig = {
  name: "Sagar Computer Service",
  description:
    "Computer sales, repairs, and professional IT services — shop products and book service appointments.",
  /** Set NEXT_PUBLIC_APP_URL in production (e.g. https://your-domain.vercel.app) */
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
} as const;
