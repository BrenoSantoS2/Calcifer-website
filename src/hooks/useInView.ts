'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

type Options = {
  threshold?: number;
  once?: boolean;
};

export function useInView<T extends HTMLElement>(
  options: Options = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
