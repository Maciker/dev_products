
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="container max-w-screen-lg py-16 flex flex-col items-center justify-center animate-fade-in">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <FileQuestion className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-lg">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="glass-button">
            Return to Home
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
