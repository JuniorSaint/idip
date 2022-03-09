import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

interface SignInCrendentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCrendentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  userEmail: string;
  userType: string;
  id: string;
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCrendentials) {
    try {
      const response = await api.post("login", { email, password });
      const { token } = response.data;

      setCookie(undefined, "idipToken", token, {
        maxAge: 60 * 60 * 1,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/welcome");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
