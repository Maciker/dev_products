
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { checkAuth, AuthState } from "@/lib/auth";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function MainLayout({ children, requireAuth = false }: MainLayoutProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = checkAuth();
    setAuthState(auth);

    if (requireAuth && !auth.isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, requireAuth]);

  if (requireAuth && authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        user={authState.user}
        isAuthenticated={authState.isAuthenticated}
      />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FileRepo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
