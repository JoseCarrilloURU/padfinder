import { useState, useEffect } from "react";
import { transition } from "../components/globals";

export function useTransition() {
  const [isTransitioning, setIsTransitioning] = useState(transition);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(transition);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return isTransitioning;
}
