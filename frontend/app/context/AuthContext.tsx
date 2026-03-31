import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getAuthApiBase } from "~/lib/api";
import { http } from "~/lib/http";
import { clearToken, getToken, setToken } from "~/lib/token";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
};

type AuthState = {
  loading: boolean;
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  async function refreshProfile() {
    const currentToken = getToken();
    if (!currentToken) {
      setUser(null);
      return;
    }
    const { data } = await http.get("/api/profile");
    const profile = data?.profile as User | undefined;
    if (!profile) throw new Error("Invalid profile response");
    setUser(profile);
  }

  async function login(email: string, password: string) {
    const { data } = await axios.post(`${getAuthApiBase()}/login`, { email, password });
    const newToken = data?.token as string | undefined;
    if (!newToken) throw new Error("No token returned");
    setToken(newToken);
    setTokenState(newToken);
    await refreshProfile();
  }

  async function signup(name: string, email: string, password: string) {
    await axios.post(`${getAuthApiBase()}/signup`, { name, email, password });
    await login(email, password);
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setUser(null);
  }

  useEffect(() => {
    const existing = getToken();
    setTokenState(existing);
    (async () => {
      try {
        if (existing) {
          await refreshProfile();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      loading,
      token,
      user,
      login,
      signup,
      logout,
      refreshProfile,
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

