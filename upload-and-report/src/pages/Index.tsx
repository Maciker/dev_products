
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { Upload, FileText, DownloadCloud, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="container max-w-screen-lg py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            File Upload & Report Generation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your files securely and get detailed reports instantly.
            The simplest way to analyze and extract insights from your data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/register">
              <Button size="lg" className="glass-button">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="section-transition p-6 rounded-lg glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Easy File Upload</h2>
            <p className="text-muted-foreground">
              Drag & drop or browse to upload files. We support PDF, CSV, and images.
            </p>
          </div>
          
          <div className="section-transition p-6 rounded-lg glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Instant Reports</h2>
            <p className="text-muted-foreground">
              Our system processes your files and generates comprehensive reports.
            </p>
          </div>
          
          <div className="section-transition p-6 rounded-lg glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <DownloadCloud className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Easy Download</h2>
            <p className="text-muted-foreground">
              Download your reports anytime. All reports are saved securely in your account.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 border-t">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create a free account in seconds",
                icon: <CheckCircle className="h-5 w-5" />
              },
              {
                step: "2",
                title: "Upload Files",
                description: "Drag & drop or browse to upload",
                icon: <Upload className="h-5 w-5" />
              },
              {
                step: "3",
                title: "Process",
                description: "We analyze and process your files",
                icon: <FileText className="h-5 w-5" />
              },
              {
                step: "4",
                title: "Download",
                description: "Get your reports instantly",
                icon: <DownloadCloud className="h-5 w-5" />
              }
            ].map((item, index) => (
              <div key={index} className="section-transition flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center border-t">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join thousands of users who trust our platform for their file processing needs.
          </p>
          <Link to="/register">
            <Button size="lg" className="glass-button">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
