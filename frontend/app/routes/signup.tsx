import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/signup";
import { useAuth } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Signup" }];
}

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.signup(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
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
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="hidden lg:flex lg:flex-col lg:justify-end lg:rounded-3xl lg:border lg:border-gray-200 lg:bg-white/60 lg:p-10 lg:backdrop-blur-sm">
            <p className="text-sm font-semibold text-gray-500">Get started</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">
              Create your account
            </h1>
            <p className="mt-3 max-w-prose text-sm text-gray-600">
              We store passwords securely with bcrypt and issue a JWT after login.
            </p>
          </section>

          <section className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">Signup</h2>
                <p className="mt-1 text-sm text-gray-500">Create an account to access the dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none ring-blue-600/20 placeholder:text-gray-400 focus:ring-4"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none ring-blue-600/20 placeholder:text-gray-400 focus:ring-4"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none ring-blue-600/20 placeholder:text-gray-400 focus:ring-4"
                    placeholder="At least 8 characters"
                  />
                  <p className="mt-2 text-xs font-medium text-gray-500">Minimum 8 characters.</p>
                </div>

                {error ? (
                  <div
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Creating account…" : "Create account"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link className="font-semibold text-blue-600 hover:underline" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
