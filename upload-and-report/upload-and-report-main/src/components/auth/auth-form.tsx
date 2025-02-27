
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, register } from "@/lib/auth";
import { ArrowRight, Loader2 } from "lucide-react";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === "login") {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const title = type === "login" ? "Sign In" : "Create Account";
  const buttonText = type === "login" ? "Sign In" : "Sign Up";
  const alternateText = type === "login"
    ? "Don't have an account?"
    : "Already have an account?";
  const alternateLink = type === "login" ? "/register" : "/login";
  const alternateLinkText = type === "login" ? "Sign Up" : "Sign In";

  return (
    <div className="w-full max-w-md mx-auto glass-card rounded-lg p-8 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="transition-all duration-200"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {type === "login" && (
              <a
                href="#"
                className="text-xs text-primary hover:underline transition-colors"
              >
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="transition-all duration-200"
          />
        </div>
        <Button
          type="submit"
          className="w-full glass-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <ArrowRight className="h-4 w-4 mr-2" />
          )}
          {buttonText}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {alternateText}{" "}
          <a
            href={alternateLink}
            className="text-primary hover:underline transition-colors"
          >
            {alternateLinkText}
          </a>
        </p>
      </div>
      {type === "login" && (
        <div className="mt-4 border-t pt-4">
          <p className="text-xs text-center text-muted-foreground mb-4">
            For demo purposes, you can use:
          </p>
          <div className="text-xs text-center bg-secondary/50 p-2 rounded">
            <p>Email: user@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      )}
    </div>
  );
}
