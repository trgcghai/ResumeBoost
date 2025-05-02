import { useEffect } from "react";

export const useInfiniteScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  currentPage: number,
  totalPages: number,
  setCurrentPage: (page: number) => void,
  isEnabled: boolean
) => {
  useEffect(() => {
    if (!isEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [currentPage, totalPages, isEnabled, ref, setCurrentPage]);
};
