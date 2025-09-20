import { useState, useEffect, useRef } from "react";

export default function useScrollChange(delta = 0) {
  const [scrollingDown, setScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if the scroll difference is greater than the delta threshold
      if (Math.abs(currentScrollY - lastScrollY.current) > delta) {
        setScrollingDown(currentScrollY > lastScrollY.current);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [delta]);

  return scrollingDown;
}