import { useMemo } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home — Auth token flow" },
    { name: "description", content: "Login, signup, or open the dashboard" },
  ];
}

export default function Home() {
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

    return Array.from({ length: 750 }, (_, i) => {
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
        <div className="grid w-full grid-cols-6 sm:grid-cols-8 lg:grid-cols-20">{blocks}</div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Auth token flow
            </h1>
            <p className="mt-2 text-sm font-medium text-gray-500">
              Signup, login, and access a protected dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Top left */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-500">Auth</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Stores a bcrypt-hashed password and unique email.
              </p>
              <div className="mt-5">
                <Link
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>

            {/* Top middle */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-500">Auth</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                Login + get JWT
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Token is saved to localStorage for persistence.
              </p>
              <div className="mt-5">
                <Link
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Big center card */}
            <div className="rounded-3xl border border-gray-200 bg-white/70 p-6 backdrop-blur-sm sm:col-span-2 lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500">Protected</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                    Dashboard
                  </h2>
                  <p className="mt-2 max-w-prose text-sm text-gray-600">
                    Uses your token to call <span className="font-mono">/api/profile</span>. If
                    no token, it redirects to login.
                  </p>
                </div>
                <div className="hidden h-12 w-12 shrink-0 rounded-2xl bg-blue-600/10 sm:block" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Token expiry</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">1 day</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Password</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">bcrypt hash</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Auth state</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Context</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  to="/dashboard"
                >
                  Open dashboard
                </Link>
              </div>

              <div className="mt-6">
                <img src="/logo-light.svg" alt="Logo" className="w-full h-auto mt-auto" />
              </div>
            </div>

            {/* Bottom left */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-500">API</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Endpoints
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-mono">POST</span> /api/auth/signup
                </li>
                <li>
                  <span className="font-mono">POST</span> /api/auth/login
                </li>
                <li>
                  <span className="font-mono">GET</span> /api/profile
                </li>
              </ul>
            </div>

            {/* Bottom middle */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-500">Session</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Stay logged in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Token is loaded on refresh and profile is fetched automatically.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  to="/login"
                >
                  Try login
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  to="/signup"
                >
                  Create user
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
