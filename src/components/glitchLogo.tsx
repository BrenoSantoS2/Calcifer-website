'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Styles from '../css/css_components/glitch.module.css';

type Props = {
  children: ReactNode;
};

const MIN_INTERVAL = 8000;
const MAX_INTERVAL = 15000;
const GLITCH_DURATION = 200;

export function GlitchLogo({ children }: Props) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let scheduleId: number;
    let stopId: number;

    const trigger = () => {
      setIsGlitching(true);
      stopId = window.setTimeout(() => {
        setIsGlitching(false);
        scheduleNext();
      }, GLITCH_DURATION);
    };

    const scheduleNext = () => {
      const wait = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
      scheduleId = window.setTimeout(trigger, wait);
    };

    scheduleNext();

    return () => {
      window.clearTimeout(scheduleId);
      window.clearTimeout(stopId);
    };
  }, []);

  const className = `${Styles.container} ${isGlitching ? Styles.glitching : ''}`;
  return <span className={className}>{children}</span>;
}
