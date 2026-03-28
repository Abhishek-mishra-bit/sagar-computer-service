"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser, type RegisterState } from "@/actions/auth";
import { ROUTES } from "@/constants/routes";

const initialState: RegisterState = null;

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, initialState);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create account
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Register to shop, track orders, and book services.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
              {state.error}
            </p>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
            {state?.fieldErrors?.name?.[0] ? (
              <p className="text-xs text-red-600 dark:text-red-400">{state.fieldErrors.name[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
            {state?.fieldErrors?.email?.[0] ? (
              <p className="text-xs text-red-600 dark:text-red-400">{state.fieldErrors.email[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
            {state?.fieldErrors?.password?.[0] ? (
              <p className="text-xs text-red-600 dark:text-red-400">{state.fieldErrors.password[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Phone <span className="font-normal text-zinc-500">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
            {state?.fieldErrors?.phone?.[0] ? (
              <p className="text-xs text-red-600 dark:text-red-400">{state.fieldErrors.phone[0]}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {pending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href={ROUTES.login} className="font-medium text-zinc-900 underline dark:text-zinc-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
