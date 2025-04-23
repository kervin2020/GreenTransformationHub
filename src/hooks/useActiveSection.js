import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently visible in the viewport
 * @param {Array} sectionIds - Array of section IDs to observe
 * @param {Object} options - IntersectionObserver options 
 * @returns {string} - ID of the currently active section
 */
function useActiveSection(sectionIds = [], options = { threshold: 0.3 }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = [];
    
    // Create an observer for each section
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      
      if (element) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            // When section enters viewport
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        }, options);
        
        observer.observe(element);
        observers.push({ id, observer });
      }
    });
    
    // Clean up observers
    return () => {
      observers.forEach(({ id, observer }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, options]);
  
  return activeSection;
}

export default useActiveSection;