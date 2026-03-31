/** Base URL for auth routes (e.g. http://localhost:3000/api/auth). */
export function getAuthApiBase() {
  return import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/auth";
}

export function getApiOrigin() {
  return new URL(getAuthApiBase()).origin;
}
