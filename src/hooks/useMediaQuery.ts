import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set the initial value
    setMatches(mediaQuery.matches);

    // Define a callback function to handle changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the callback as a listener
    mediaQuery.addEventListener("change", handler);

    // Remove the listener when component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
