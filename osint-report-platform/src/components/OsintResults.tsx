
import React from 'react';
import { cn } from '@/lib/utils';
import ResultCard from './ResultCard';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface OsintResultsProps {
  results: Array<{
    id: string;
    title: string;
    category: string;
    data: Record<string, any>;
  }>;
  query: {
    type: 'domain' | 'email' | 'person';
    value: string;
  } | null;
  className?: string;
}

const OsintResults: React.FC<OsintResultsProps> = ({
  results,
  query,
  className
}) => {
  if (!query || results.length === 0) {
    return null;
  }

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(
        {
          query,
          results,
          exportedAt: new Date().toISOString(),
        },
        null,
        2
      );
      
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `osint-${query.type}-${query.value}-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Export successful",
        description: "Your results have been exported as JSON",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your results",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `OSINT Results for ${query.value}`,
          text: `OSINT intelligence gathered for ${query.type}: ${query.value}`,
        });
        
        toast({
          title: "Shared successfully",
          description: "Your results have been shared",
        });
      } else {
        // Fallback if Web Share API is not available
        navigator.clipboard.writeText(window.location.href);
        
        toast({
          title: "URL copied to clipboard",
          description: "Share this URL to show these results",
        });
      }
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: "Share failed",
        description: "There was an error sharing your results",
        variant: "destructive",
      });
    }
  };

  const categoryGroups = results.reduce((groups, result) => {
    const category = result.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(result);
    return groups;
  }, {} as Record<string, typeof results>);

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-8", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium animate-in" style={{ animationDelay: '0.05s', opacity: 0 }}>
            Results for {query.type}:
          </h2>
          <p className="text-lg font-semibold mt-1 animate-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            {query.value}
          </p>
        </div>
        
        <div className="flex gap-2 animate-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShare}
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {Object.entries(categoryGroups).map(([category, categoryResults], groupIndex) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-muted-foreground animate-in" 
              style={{ animationDelay: `${0.2 + (groupIndex * 0.05)}s`, opacity: 0 }}>
            {category}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryResults.map((result, index) => (
              <ResultCard
                key={result.id}
                title={result.title}
                category={result.category}
                data={result.data}
                index={index + (groupIndex * 10)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OsintResults;
