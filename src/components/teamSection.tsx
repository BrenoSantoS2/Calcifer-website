'use client';

import "../css/style.css";
import Styles from '../css/css_components/teamSection.module.css'
import { useRef } from "react";
import Image from 'next/image'

export function TeamSection() {

    const carrousel = useRef<HTMLDivElement>(null);

    const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (carrousel.current) {
            const cardWidth = carrousel.current.querySelector('div')?.offsetWidth || 0;
            carrousel.current.scrollLeft -= cardWidth + 64; // Desloca a largura do card + espaçamento (64px)
        }
    }

    const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (carrousel.current) {
            const cardWidth = carrousel.current.querySelector('div')?.offsetWidth || 0;
            carrousel.current.scrollLeft += cardWidth + 64; // Desloca a largura do card + espaçamento (64px)
        }
    }

    return (
        <section>
            <div className={Styles.teamSection}>
                <div className={Styles.text}>
                    <h1 className={Styles.text_center}>Meet Our Team</h1>
                    <p className={Styles.text_center}>Get to know the talented university students behind Calcifer Studios.</p>
                </div>
                <div className={Styles.cards} ref={carrousel}>
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                </div>
                <div className={Styles.chevrons}>
                    <button onClick={handleLeftClick}><Image src="/chevron.svg" alt="chevron" width="36" height="36"/></button>
                    <button onClick={handleRightClick}><Image src="/chevron.svg" alt="chevron" width="36" height="36"/></button>
                </div>
            </div>
        </section>
    )
}

export function ProfileCard() {
    return (
        <div>
            <Image src="/time/BrenoSantos.png" alt="" width="200" height="200" className={Styles.image} />
            <h2 className={Styles.h2}>Breno Santos</h2>
            <p className={Styles.p}>Game Developer / Designer</p>
            <div className={Styles.media}>
                <button className={Styles.button}><Image src="/Linkedin.svg" alt="Linkedin" width="31" height="30"/></button>
                <button className={Styles.button}><Image src="/Instagram.svg" alt="Instagram" width="31" height="30"/></button>
            </div>
        </div>
    )
}
