'use client';

import { useParallax } from '../hooks/useParallax';
import Styles from '../css/css_components/heroSection.module.css';

export function HeroVideoParallax({ wrapperClassName }: { wrapperClassName: string }) {
  const offsetY = useParallax(0.3);

  return (
    <div className={wrapperClassName} style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}>
      <video autoPlay muted loop playsInline className={Styles.video_background}>
        <source src="/videos/bg_video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
