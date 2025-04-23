import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook that scrolls to the element specified in the URL hash
 * Also provides a function to scroll to a specific element
 */
function useScrollToHash() {
  const [location] = useLocation();

  // Handle scrolling to hash on initial load or navigation
  useEffect(() => {
    if (location.includes('#')) {
      const id = location.split('#')[1];
      const element = document.getElementById(id);
      
      if (element) {
        // Add slight delay to ensure DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Function to scroll to a specific element by ID
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollToElement };
}

export default useScrollToHash;