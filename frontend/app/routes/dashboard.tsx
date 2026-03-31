import { useMemo } from "react";
import { Link, Navigate } from "react-router";
import type { Route } from "./+types/dashboard";
import { useAuth } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function Dashboard() {
  const auth = useAuth();
  const blocks = useMemo(() => {
    const palette = [
      "#0b1f4d",
      "#12307a",
      "#1a44a8",
      "#2459cf",
      "#356fe7",
      "#5b90f0",
      "#86b0f7",
      "#b1cefb",
      "#d7e6fe",
      "#ecf4ff",
    ];

    return Array.from({ length: 250 }, (_, i) => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      return (
        <div
          key={i}
          className="aspect-square w-full"
          style={{
            backgroundColor: color,
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.05) 100%)",
          }}
        />
      );
    });
  }, []);

  if (auth.loading) {
    return (
      <main className="min-h-svh flex items-center justify-center bg-white p-6">
        <p className="text-gray-600">Loading…</p>
      </main>
    );
  }

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden lg:w-[45%]"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 0% 30%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 75%)",
          maskImage:
            "radial-gradient(circle at 0% 30%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 75%)",
        }}
      >
        <div className="grid w-full grid-cols-6 sm:grid-cols-8 lg:grid-cols-10">{blocks}</div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="w-full">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-2 text-sm font-medium text-gray-700">
                Protected route — available only with a valid token.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                to="/"
              >
                Home
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                onClick={() => {
                  auth.logout();
                  window.location.href = "/login";
                }}
              >
                Log out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-gray-200 bg-white/70 p-6 backdrop-blur-sm lg:col-span-2">
              <p className="text-sm font-semibold text-gray-700">Profile</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                {auth.user?.name ?? "Signed in"}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {auth.user?.email ?? "Fetching profile…"}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-700">Auth method</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">JWT (Bearer)</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-700">Persistence</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">localStorage</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-700">API</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Protected endpoint
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-mono">GET</span> /api/profile
              </p>
              <p className="mt-4 text-sm text-gray-600">
                If the token is missing/expired, you’re redirected to login.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-700">Security</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Basics enabled
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>bcrypt hashed passwords</li>
                <li>JWT expires in 1 day</li>
                <li>Secrets from .env</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
