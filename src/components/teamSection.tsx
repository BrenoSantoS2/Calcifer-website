'use client';

import "../css/style.css";
import Styles from '../css/css_components/teamSection.module.css'
import { useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { useTranslations } from "next-intl";

const AUTOPLAY_INTERVAL = 5000;
const CARD_GAP = 64;

export function TeamSection() {
    const t = useTranslations("team");
    const carrousel = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers = [
        {
            name: 'Breno Santos',
            role: 'Producer / Game Developer',
            imageSrc: '/time/BrenoSantos.png',
            linkedinUrl: 'https://www.linkedin.com/in/breno-santos-0843131b8/',
            instagramUrl: 'https://www.instagram.com/brenosantos_g/'
        },
        {
            name: 'Lucas Ramenzoni',
            role: 'Game Developer',
            imageSrc: '/time/LucasJorge.png',
            linkedinUrl: 'https://www.linkedin.com/in/lucas-ramenzoni-jorge-083770302/',
            instagramUrl: 'https://www.instagram.com/lucas.rjorge/'
        },
        {
            name: 'Yuri Mendes',
            role: '2D Artist & Animator',
            imageSrc: '/time/YuriMendes.png',
            linkedinUrl: 'https://www.linkedin.com/in/yuri-mendes-899883235/',
            instagramUrl: 'https://www.instagram.com/yuri.7th/'
        },
        {
            name: 'Bruno Queiroz',
            role: 'Narrative Designer',
            imageSrc: '/time/BrunoQueiroz.png',
            linkedinUrl: 'https://www.linkedin.com/in/bruno-martins-queiroz/',
            instagramUrl: 'https://www.instagram.com/bonnie_queiroz/'
        },
        {
            name: 'Lauro Rosa',
            role: '2D Artist & Animator',
            imageSrc: '/time/LauroRosa.png',
            linkedinUrl: 'https://www.linkedin.com/in/lauro-rosa-marques/',
            instagramUrl: ''
        },
        {
            name: 'Felipe Correa',
            role: '2D Artist & Animator',
            imageSrc: '/time/FelipeCorrea.png',
            linkedinUrl: 'https://www.linkedin.com/in/lipe-correa/',
            instagramUrl: ''
        },
    ];

    const getStep = () => {
        const cardWidth = carrousel.current?.querySelector('div')?.offsetWidth || 0;
        return cardWidth + CARD_GAP;
    };

    const goToIndex = (index: number) => {
        if (!carrousel.current) return;
        const step = getStep();
        carrousel.current.scrollTo({ left: index * step, behavior: 'smooth' });
    };

    const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!carrousel.current) return;
        carrousel.current.scrollLeft -= getStep();
    };

    const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!carrousel.current) return;
        carrousel.current.scrollLeft += getStep();
    };

    useEffect(() => {
        const node = carrousel.current;
        if (!node) return;
        let frame = 0;

        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const step = getStep();
                if (step > 0) {
                    setCurrentIndex(Math.round(node.scrollLeft / step));
                }
            });
        };

        node.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();

        return () => {
            node.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (reduced) setIsPaused(true);
        }
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const node = carrousel.current;
        if (!node) return;
        const id = window.setInterval(() => {
            const step = getStep();
            if (!step) return;
            const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 4;
            if (atEnd) {
                node.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                node.scrollLeft += step;
            }
        }, AUTOPLAY_INTERVAL);
        return () => window.clearInterval(id);
    }, [isPaused]);

    return (
        <section>
            <div
                className={Styles.teamSection}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={Styles.text}>
                    <h1 className={Styles.text_center}>{t("title")}</h1>
                    <p className={Styles.text_center}>{t("body")}</p>
                </div>
                <div className={Styles.cards} ref={carrousel}>
                    {teamMembers.map((member, index) => (
                        <ProfileCard
                            key={index}
                            name={member.name}
                            role={member.role}
                            imageSrc={member.imageSrc}
                            linkedinUrl={member.linkedinUrl}
                            instagramUrl={member.instagramUrl}
                        />
                    ))}
                </div>
                <div className={Styles.dots} role="tablist">
                    {teamMembers.map((_, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`${Styles.dot} ${isActive ? Styles.dotActive : ''}`}
                                aria-label={t("dotLabel", { n: index + 1 })}
                                aria-current={isActive ? 'true' : undefined}
                                onClick={() => goToIndex(index)}
                            />
                        );
                    })}
                </div>
                <div className={Styles.chevrons}>
                    <button onClick={handleLeftClick} aria-label={t("prevSlide")}><Image src="/chevron.svg" alt="" width="36" height="36" /></button>
                    <button onClick={handleRightClick} aria-label={t("nextSlide")}><Image src="/chevron.svg" alt="" width="36" height="36" /></button>
                </div>
            </div>
        </section>
    );
}

type ProfileCardProps = {
    name: string;
    role: string;
    imageSrc: string;
    linkedinUrl: string;
    instagramUrl: string;
}

export function ProfileCard({ name, role, imageSrc, linkedinUrl, instagramUrl }: ProfileCardProps) {
    return (
        <div>
            <Image src={imageSrc} alt={name} width="200" height="200" className={Styles.image} />
            <h2 className={Styles.h2}>{name}</h2>
            <p className={Styles.p}>{role}</p>
            <div className={Styles.media}>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <button className={Styles.button}><Image src="/Linkedin.svg" alt="Linkedin" width="31" height="30" /></button>
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                    <button className={Styles.button}><Image src="/Instagram.svg" alt="Instagram" width="31" height="30" /></button>
                </a>
            </div>
        </div>
    );
}
