import { Link, Navigate } from "react-router";
import type { Route } from "./+types/dashboard";
import { useAuth } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function Dashboard() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <main className="min-h-svh flex items-center justify-center p-6">
        <p className="text-gray-600 dark:text-gray-400">Loading…</p>
      </main>
    );
  }

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-svh flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You are signed in. This route is only available with a valid token.
        </p>
        {auth.user ? (
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Name</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{auth.user.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Email</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{auth.user.email}</dd>
            </div>
          </dl>
        ) : null}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600"
            to="/"
          >
            Home
          </Link>
          <button
            type="button"
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:text-red-400"
            onClick={() => {
              auth.logout();
              window.location.href = "/login";
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
