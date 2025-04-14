
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If element is in viewport
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once we've shown the element, we don't need to watch it anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when at least 10% of the element is visible
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return { ref, isIntersecting };
}
