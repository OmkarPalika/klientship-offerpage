
import { useEffect, useState, RefObject } from 'react';

type ExpandDirection = 'left' | 'right' | 'even';

export function useExpandDirection(ref: RefObject<HTMLElement>) {
  const [expandDirection, setExpandDirection] = useState<ExpandDirection>('right');

  useEffect(() => {
    if (!ref.current) return;
    
    const determineExpandDirection = () => {
      const element = ref.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const elementCenterX = rect.left + rect.width / 2;
      const thirdOfScreen = windowWidth / 3;
      
      // If card is in the left third of the screen, expand right
      if (elementCenterX < thirdOfScreen) {
        setExpandDirection('right');
      } 
      // If card is in the right third of the screen, expand left
      else if (elementCenterX > thirdOfScreen * 2) {
        setExpandDirection('left');
      } 
      // If card is in the middle third, expand evenly
      else {
        setExpandDirection('even');
      }
    };
    
    determineExpandDirection();
    
    // Update on window resize
    window.addEventListener('resize', determineExpandDirection);
    
    return () => window.removeEventListener('resize', determineExpandDirection);
  }, [ref]);

  return expandDirection;
}
