import { Suspense } from "react";
import { LoginForm } from "./login-form";

function LoginFallback() {
  return (
    <div className="w-full max-w-sm space-y-8 animate-pulse">
      <div className="h-8 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-24 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
