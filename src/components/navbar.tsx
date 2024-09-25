// Navbar.tsx
import Image from 'next/image';
import React from "react";
import styles from "../css/css_components/navbar.module.css";

export function NavBar() {
  return (
    <nav>
        <div className={styles.navbar}>
            <div> 
                <Image src="/CalciferLogo.svg" alt="Calcifer_Studios_logo" width="204" height="63"/>
            </div>
            <div className={styles.navbar_anchors}>
                <a href="#games" className={styles.anchor}>Games</a>
                <a href="#about" className={styles.anchor}>About</a>
                <a href="#contact" className={styles.anchor}>Contact</a>
            </div>
        </div>
    </nav>
  );
}
