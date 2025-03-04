
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path');
    
    if (paths) {
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        
        // Set up the starting position
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        
        // Trigger the animation
        setTimeout(() => {
          path.style.transition = `stroke-dashoffset 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`;
          path.style.strokeDashoffset = '0';
        }, 300);
      });
    }
  }, []);

  return (
    <div className={cn("relative", className)}>
      <svg 
        ref={svgRef}
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path 
          d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M24 16V32" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M16 24H32" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M17 17L31 31" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M31 17L17 31" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </svg>
      <div className="absolute inset-0 animate-spin-slow pointer-events-none opacity-0">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="19" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedLogo;
