import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import OsintForm from '@/components/OsintForm';
import OsintResults from '@/components/OsintResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import AnimatedLogo from '@/components/AnimatedLogo';
import { performOsintSearch, OsintResult, OsintQuery } from '@/lib/osintService';

const Index = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<OsintResult[]>([]);
  const [query, setQuery] = useState<OsintQuery | null>(null);

  const { mutate: searchOsint, isPending } = useMutation({
    mutationFn: performOsintSearch,
    onSuccess: (searchResults) => {
      setResults(searchResults);
      toast({
        title: "Search completed",
        description: `Found ${searchResults.length} results for ${query?.type}: ${query?.value}`,
      });
    },
    onError: (error: Error) => {
      console.error('Search error:', error);
      setResults([]);
      toast({
        title: "Search failed",
        description: error.message || "There was an error processing your search",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (type: 'domain' | 'email' | 'person', value: string) => {
    const newQuery = { type, value };
    setQuery(newQuery);
    setResults([]);
    searchOsint(newQuery);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 py-12">
      <header className="w-full max-w-6xl mx-auto mb-16 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <AnimatedLogo className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-light text-center mb-3">
          Digital Intelligence Platform
        </h1>
        <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
          A minimalist open-source intelligence tool for domains, emails, and people.
        </p>
      </header>

      <main className="w-full max-w-6xl mx-auto flex flex-col flex-grow space-y-12 pb-12">
        <OsintForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          className="animate-fade-in"
        />
        
        {isPending && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <LoadingSpinner size="lg" className="mb-6" />
            <p className="text-muted-foreground animate-pulse-subtle">
              Gathering intelligence...
            </p>
          </div>
        )}
        
        {!isPending && results.length > 0 && (
          <OsintResults
            results={results}
            query={query}
          />
        )}
        
        {!isPending && results.length === 0 && query && (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try another search or adjust your query
            </p>
          </div>
        )}
      </main>

      <footer className="w-full max-w-6xl mx-auto mt-auto pt-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Digital Intelligence Platform</p>
          <p className="mt-2 md:mt-0">
            Built with precision and privacy in mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
