
import React from "react";
import { useLocation } from "react-router-dom";
import { AuthForm } from "@/components/auth/auth-form";
import { MainLayout } from "@/components/layout/main-layout";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <MainLayout>
      <div className="container max-w-screen-lg py-12">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            {isLogin
              ? "Sign in to your account to access your files and reports."
              : "Join us to start uploading files and generating insightful reports."}
          </p>
          <AuthForm type={isLogin ? "login" : "register"} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
