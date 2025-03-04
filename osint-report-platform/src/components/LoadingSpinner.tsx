
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }} />
      <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin" style={{ animationDuration: '2s' }} />
    </div>
  );
};

export default LoadingSpinner;
