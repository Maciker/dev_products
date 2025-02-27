
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";
import { User as UserType } from "@/lib/auth";

interface HeaderProps {
  user: UserType | null;
  isAuthenticated: boolean;
}

export function Header({ user, isAuthenticated }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full py-4 px-6 border-b flex items-center justify-between animate-slide-down backdrop-blur-sm bg-background/70 sticky top-0 z-10">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <Upload className="h-6 w-6 mr-2 text-primary" />
          <span className="font-semibold text-lg">FileRepo</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          </>
        )}
      </nav>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="hidden md:flex items-center">
              <div className="mr-3 text-sm">
                <span className="text-muted-foreground">Welcome,</span>{" "}
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className={cn(
                "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center",
                "border border-border"
              )}>
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="default"
                size="sm"
                className="text-sm glass-button"
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
