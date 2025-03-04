
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Search, Globe, Mail, User } from 'lucide-react';

interface OsintFormProps {
  onSubmit: (type: 'domain' | 'email' | 'person', value: string) => void;
  isLoading: boolean;
  className?: string;
}

const OsintForm: React.FC<OsintFormProps> = ({ 
  onSubmit, 
  isLoading,
  className 
}) => {
  const [activeTab, setActiveTab] = useState<'domain' | 'email' | 'person'>('domain');
  const [value, setValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(activeTab, value.trim());
    }
  };

  const placeholders = {
    domain: 'Enter a domain (e.g., example.com)',
    email: 'Enter an email address',
    person: 'Enter a person\'s name'
  };

  const icons = {
    domain: <Globe className="h-4 w-4" />,
    email: <Mail className="h-4 w-4" />,
    person: <User className="h-4 w-4" />
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <Tabs 
        defaultValue="domain" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'domain' | 'email' | 'person')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="domain" className="py-3 transition-all data-[state=active]:scale-[1.02] data-[state=active]:shadow-sm">
            {icons.domain}
            <span className="ml-2">Domain</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="py-3 transition-all data-[state=active]:scale-[1.02] data-[state=active]:shadow-sm">
            {icons.email}
            <span className="ml-2">Email</span>
          </TabsTrigger>
          <TabsTrigger value="person" className="py-3 transition-all data-[state=active]:scale-[1.02] data-[state=active]:shadow-sm">
            {icons.person}
            <span className="ml-2">Person</span>
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder={placeholders[activeTab]}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pl-10 py-6 text-lg transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
              disabled={isLoading}
              required
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-6 text-lg relative overflow-hidden group transition-all"
            disabled={isLoading}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? 'Searching...' : 'Search'}
              {!isLoading && (
                <Search className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </span>
            <span className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Button>
        </form>
      </Tabs>
    </div>
  );
};

export default OsintForm;
