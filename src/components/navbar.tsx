'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "../i18n/navigation";
import { LanguageSwitcher } from "./languageSwitcher";
import { GlitchLogo } from "./glitchLogo";
import Styles from "../css/css_components/navbar.module.css";

const HIDE_THRESHOLD = 80;

export function NavBar() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            setIsScrolled(currentY > HIDE_THRESHOLD);

            if (currentY > HIDE_THRESHOLD && currentY > lastScrollY.current) {
                setIsHidden(true);
            } else if (currentY < lastScrollY.current) {
                setIsHidden(false);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const navClasses = [
        Styles.navbar,
        isScrolled ? Styles.scrolled : '',
        isHidden ? Styles.hidden : '',
    ].filter(Boolean).join(' ');

    return (
        <>
            <nav className={navClasses}>
                <div className={Styles.navbar_inner}>
                    <div className={Styles.logo}>
                        <GlitchLogo>
                            <Image src="/CalciferLogo.svg" alt={t("logoAlt")} width="204" height="63"/>
                        </GlitchLogo>
                    </div>
                    <div className={Styles.navbar_anchors}>
                        <a href="#games" className={Styles.anchor}>{t("games")}</a>
                        <a href="#about" className={Styles.anchor}>{t("about")}</a>
                        <a href="#contact" className={Styles.anchor}>{t("contact")}</a>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>

            <button
                type="button"
                className={`${Styles.hamburger} ${isMobileMenuOpen ? Styles.hamburgerOpen : ''}`}
                aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
                <span className={Styles.hamburgerBar} />
                <span className={Styles.hamburgerBar} />
                <span className={Styles.hamburgerBar} />
            </button>

            {isMobileMenuOpen && (
                <div className={Styles.mobile_panel} role="dialog" aria-modal="true">
                    <ul className={Styles.mobile_links}>
                        <li>
                            <a href="#games" className={Styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>{t("games")}</a>
                        </li>
                        <li>
                            <a href="#about" className={Styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>{t("about")}</a>
                        </li>
                        <li>
                            <a href="#contact" className={Styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>{t("contact")}</a>
                        </li>
                    </ul>
                    <div className={Styles.mobile_switcher}>
                        <LanguageSwitcher variant="mobile" />
                    </div>
                </div>
            )}
        </>
    );
}
