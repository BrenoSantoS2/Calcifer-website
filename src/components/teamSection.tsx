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

    // Aqui você pode definir os dados do time, tornando o processo de edição mais simples
    const teamMembers = [
        {
            name: 'Breno Santos',
            role: 'Founder / Game Director',
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
            name: 'Cibele Leal',
            role: 'Narrative Designer',
            imageSrc: '/time/CibeleLeal.png',
            linkedinUrl: 'https://www.linkedin.com/in/cibele-leal/',
            instagramUrl: 'https://www.instagram.com/clea.figueredo/'
        },
        {
            name: 'João Victor',
            role: 'Game Developer / Sound Designer',
            imageSrc: '/time/JoaoVictor.png',
            linkedinUrl: 'https://www.linkedin.com/in/joão-v-wandermurem/',
            instagramUrl: 'https://www.instagram.com/wandermuremjoao/'
        },
        {
            name: 'João Carbone',
            role: 'Game Developer/ Game Designer',
            imageSrc: '/time/JoaoCarbone.png',
            linkedinUrl: 'https://www.linkedin.com/in/joao-carbone/',
            instagramUrl: ''
        },
        {
            name: 'Leonardo Ogata',
            role: 'Narrative Designer / Game Designer',
            imageSrc: '/time/LeonardoOgata.png',
            linkedinUrl: 'https://www.linkedin.com/in/leonardo-ogata-983b032b5/',
            instagramUrl: 'https://www.instagram.com/leonardo_ogata/'
        },
        {
            name: 'Leandro Santos',
            role: 'Game Developer',
            imageSrc: '/time/LeandroSantos.png',
            linkedinUrl: 'https://www.linkedin.com/in/leandro-dos-santos-gomes/',
            instagramUrl: 'https://www.instagram.com/leandro_dsag/'
        },
        // Adicione mais membros do time aqui
    ];

    return (
        <section>
            <div className={Styles.teamSection}>
                <div className={Styles.text}>
                    <h1 className={Styles.text_center}>Meet Our Team</h1>
                    <p className={Styles.text_center}>Get to know the talented university students behind Calcifer Studios.</p>
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
                <div className={Styles.chevrons}>
                    <button onClick={handleLeftClick}><Image src="/chevron.svg" alt="chevron" width="36" height="36" /></button>
                    <button onClick={handleRightClick}><Image src="/chevron.svg" alt="chevron" width="36" height="36" /></button>
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
