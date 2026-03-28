import { getSession } from "@/lib/auth/session";

export default async function AdminHomePage() {
  const session = await getSession();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Admin</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Signed in as {session?.user?.email} ({session?.user?.role}).
      </p>
      <p className="mt-6 text-sm text-zinc-500">
        Dashboard modules (products, orders, bookings) can be added here next.
      </p>
    </div>
  );
}
