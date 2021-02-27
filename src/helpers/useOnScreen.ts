import { useEffect, useState, useRef } from "react";

const useOnScreen = (rootMargin: string = "-200px") => {
  const ref = useRef<HTMLElement>(null);
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry) setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return { isIntersecting, ref };
};

export default useOnScreen;
