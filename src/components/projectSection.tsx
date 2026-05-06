'use client';

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import "../css/style.css";
import Styles from '../css/css_components/projectSection.module.css';

const GAMES = [
    {
        id: "fome",
        videoWebm: "/videos/fomeBg.webm",
        image: "/Phanthom.png", // Usando Phanthom como placeholder já que existe na raiz
        titleKey: "title1",
        tagsKeys: ["tagSideScroller"],
        bodyKey: "body1"
    },
    {
        id: "project-samaruk",
        videoWebm: "", // Removido o vídeo conforme solicitado
        image: "/samaruk.png", 
        titleKey: "title2", 
        tagsKeys: ["tagInDevelopment","tagAction"],
        bodyKey: "body2"
    },
    {
        id: "falling-in-abyss",
        videoWebm: "/videos/Bg2Video.webm", // Ajustado para o nome real com CamelCase
        image: "/Phanthom.png",
        titleKey: "title3",
        tagsKeys: ["tagBacklog","tagMetroidvania"],
        bodyKey: "body3"
    }
];

export function ProjectSection() {
    const t = useTranslations("project");
    const tCommon = useTranslations("team"); // Para reusar labels de navegação
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? GAMES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === GAMES.length - 1 ? 0 : prev + 1));
    };

    const currentGame = GAMES[currentIndex];

    return (
        <section id="games" className={Styles.section_wrapper}>
            <div className={Styles.project_section}>
                <div className={Styles.video_container}>
                    <div className={Styles.video_filter}></div>
                    {GAMES.map((game, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div 
                                key={game.id} 
                                className={`${Styles.asset_layer} ${isActive ? Styles.asset_active : ''}`}
                            >
                                {game.videoWebm ? (
                                    <video 
                                        autoPlay 
                                        muted 
                                        loop 
                                        playsInline
                                        preload="metadata"
                                        className={Styles.video_background}
                                    >
                                        <source src={game.videoWebm} type="video/webm" />
                                    </video>
                                ) : (
                                    <div 
                                        className={Styles.image_fallback} 
                                        style={{ backgroundImage: `url(${game.image})` }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={Styles.game_container}>
                    <div className={Styles.game} key={currentIndex}>
                        <div className={Styles.game_info}>
                            <h1 className={Styles.title_white}>{t(currentGame.titleKey)}</h1>
                            <div className={Styles.topics}>
                                {currentGame.tagsKeys.map(tag => (
                                    <p key={tag} className={Styles.topic}>{t(tag)}</p>
                                ))}
                            </div>
                        </div>

                        <p className={Styles.text_white}>{t(currentGame.bodyKey)}</p>
                    </div>
                </div>

                <div className={Styles.controls}>
                    <div className={Styles.chevrons}>
                        <button onClick={handlePrev} aria-label={tCommon("prevSlide")}>
                            <Image src="/chevron.svg" alt="" width="36" height="36" />
                        </button>
                        <button onClick={handleNext} aria-label={tCommon("nextSlide")}>
                            <Image src="/chevron.svg" alt="" width="36" height="36" />
                        </button>
                    </div>
                    <div className={Styles.dots}>
                        {GAMES.map((_, index) => (
                            <button
                                key={index}
                                className={`${Styles.dot} ${index === currentIndex ? Styles.dotActive : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={tCommon("dotLabel", { n: index + 1 })}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
