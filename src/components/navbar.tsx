// Navbar.tsx

import React from "react";
import styles from "../css/css_components/navbar.module.css";

export function NavBar() {
  return (
    <nav>
        <div className={styles.navbar}>
            <div> 
                <img src="/CalciferLogo.svg" alt="Calcifer_Studios_logo" />
            </div>
            <div className={styles.navbar_anchors}>
                <p className={styles.anchor}>Games</p> 
                <p className={styles.anchor}>About</p> 
                <p className={styles.anchor}>Contact</p>
            </div>
        </div>
    </nav>
  );
}
