'use client';

import type { ReactNode } from 'react';
import Styles from '../css/css_components/glitch.module.css';

type Props = {
  children: ReactNode;
};

/**
 * GlitchLogo agora aplica um efeito de "Shine" (brilho) contínuo e frequente,
 * substituindo o efeito antigo de tremor (glitch).
 */
export function GlitchLogo({ children }: Props) {
  return (
    <span className={Styles.container}>
      {children}
      <span className={Styles.shine_effect} aria-hidden="true" />
    </span>
  );
}
