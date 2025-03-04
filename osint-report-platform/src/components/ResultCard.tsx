
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ResultCardProps {
  title: string;
  category: string;
  data: Record<string, any>;
  index: number;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  category,
  data,
  index,
  className
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Determine what fields to show in preview vs expanded state
  const previewKeys = Object.keys(data).slice(0, 3);
  const expandedKeys = Object.keys(data).slice(3);
  
  // Animation delay for staggered entrance
  const delay = 0.1 + (index * 0.05);
  
  return (
    <Card 
      className={cn(
        "card-hover overflow-hidden animate-in",
        className
      )}
      style={{ 
        animationDelay: `${delay}s`,
        opacity: 0
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {category}
            </Badge>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {previewKeys.map(key => (
            <div key={key} className="grid grid-cols-3 gap-2">
              <span className="text-sm text-muted-foreground col-span-1">{key}</span>
              <span className="col-span-2 text-sm break-words">
                {renderValue(data[key])}
              </span>
            </div>
          ))}
          
          {expanded && expandedKeys.length > 0 && (
            <div className="pt-2 space-y-3 animate-slide-down">
              {expandedKeys.map(key => (
                <div key={key} className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground col-span-1">{key}</span>
                  <span className="col-span-2 text-sm break-words">
                    {renderValue(data[key])}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {expandedKeys.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-xs"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <span className="flex items-center">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </span>
              ) : (
                <span className="flex items-center">
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show More
                </span>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to render different types of values
function renderValue(value: any): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground italic">Not available</span>;
  }
  
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-4 space-y-1">
        {value.map((item, i) => (
          <li key={i}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
        ))}
      </ul>
    );
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  
  // If it looks like a URL, make it clickable
  if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
    return (
      <a 
        href={value} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary underline flex items-center gap-1 hover:opacity-80"
      >
        {value}
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  
  return String(value);
}

export default ResultCard;
