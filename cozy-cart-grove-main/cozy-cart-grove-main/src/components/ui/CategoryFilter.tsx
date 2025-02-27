
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryFilterProps {
  selectedCategory?: string;
  displayAsDropdown?: boolean;
  onClick?: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  displayAsDropdown = false,
  onClick
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleCategoryClick = (category: string) => {
    const queryParam = category === 'all' ? '' : `?category=${category}`;
    navigate(`/products${queryParam}`);
    if (onClick) onClick();
  };
  
  if (isLoading) {
    return displayAsDropdown ? (
      <div className="py-1 space-y-1">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    ) : (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-8 w-20 flex-shrink-0" />
        ))}
      </div>
    );
  }
  
  if (displayAsDropdown) {
    return (
      <div className="py-1">
        {categories.map((category) => (
          <button
            key={category}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    );
  }
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-pill whitespace-nowrap ${
            selectedCategory === category || (category === 'all' && !selectedCategory)
              ? 'active'
              : ''
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
