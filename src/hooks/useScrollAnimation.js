import { useEffect } from 'react';

/**
 * Custom hook that adds animation classes to elements when they come into view
 * @param {React.RefObject} ref - Reference to the element to observe
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visibility needed to trigger (0-1)
 * @param {boolean} options.once - Whether the animation should only happen once
 * @param {string} options.animateInClass - Class to add when element is visible (default: 'animate-in')
 * @returns {void}
 */
function useScrollAnimation(ref, options = { threshold: 0.1, once: true, animateInClass: 'animate-in' }) {
  useEffect(() => {
    if (!ref.current) return;
    
    const { threshold, once, animateInClass } = options;
    const observerOptions = { threshold };
    const element = ref.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class to the main element
          entry.target.classList.add(animateInClass);
          
          // Find and animate all children with animate-on-scroll class
          const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
          
          animatedElements.forEach((el, index) => {
            // Stagger the animations
            setTimeout(() => {
              el.classList.add(animateInClass);
            }, index * 100); // 100ms delay between each element
          });
          
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // If not once, remove the class when element is out of view
          entry.target.classList.remove(animateInClass);
          
          // Remove class from all animated children
          const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
          animatedElements.forEach(el => {
            el.classList.remove(animateInClass);
          });
        }
      });
    }, observerOptions);
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, options]);
}

export default useScrollAnimation;