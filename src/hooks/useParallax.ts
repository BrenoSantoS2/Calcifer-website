'use client';

import { useEffect, useState } from 'react';

export function useParallax(factor: number = 0.3): number {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      setOffsetY(window.scrollY * factor);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [factor]);

  return offsetY;
}
