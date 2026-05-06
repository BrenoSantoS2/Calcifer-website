'use client';

import { type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import Styles from '../css/css_components/revealOnScroll.module.css';

type Props = {
  children: ReactNode;
  inViewClassName?: string;
};

export function RevealOnScroll({ children, inViewClassName }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();

  const className = [
    Styles.wrapper,
    inView ? Styles.in_view : '',
    inView && inViewClassName ? inViewClassName : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
