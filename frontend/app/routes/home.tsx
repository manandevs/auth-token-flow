import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home — Auth token flow" },
    { name: "description", content: "Login, signup, or open the dashboard" },
  ];
}

export default function Home() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Auth token flow
      </h1>
      <nav className="flex flex-wrap items-center justify-center gap-3">
        <Link
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          to="/signup"
        >
          Signup
        </Link>
        <Link
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          to="/dashboard"
        >
          Dashboard
        </Link>
      </nav>
    </main>
  );
}
