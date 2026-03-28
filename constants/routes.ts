/**
 * Central route paths — import from `@/constants/routes` to avoid typos across links and redirects.
 */
export const ROUTES = {
  home: "/",
  products: "/products",
  product: (slug: string) => `/products/${slug}` as const,
  cart: "/cart",
  checkout: "/checkout",
  booking: "/booking",
  admin: "/admin",
  login: "/login",
  register: "/register",
} as const;
