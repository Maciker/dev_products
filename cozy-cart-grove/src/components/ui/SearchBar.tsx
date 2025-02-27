
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: () => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();
  
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch();
    }
  };
  
  const clearSearch = () => {
    setQuery('');
  };
  
  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-20 py-6 text-base"
        />
        
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
