'use client';

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { routing } from "../i18n/routing";
import Styles from "../css/css_components/languageSwitcher.module.css";

const LOCALE_META: Record<string, { flag: string; label: string }> = {
    pt: { flag: '🇧🇷', label: 'PT' },
    en: { flag: '🇺🇸', label: 'EN' },
    es: { flag: '🇪🇸', label: 'ES' },
};

type Props = {
    variant?: 'desktop' | 'mobile';
};

export function LanguageSwitcher({ variant = 'desktop' }: Props) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const tNav = useTranslations("nav");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [isOpen]);

    useEffect(() => {
        document.body.classList.remove('locale-leaving');
    }, [locale]);

    const handleSelect = (nextLocale: string) => {
        setIsOpen(false);
        if (nextLocale === locale) return;
        document.body.classList.add('locale-leaving');
        window.setTimeout(() => {
            router.replace(pathname, { locale: nextLocale as 'pt' | 'en' | 'es' });
        }, 150);
    };

    const current = LOCALE_META[locale] ?? LOCALE_META.pt;

    return (
        <div
            ref={containerRef}
            className={`${Styles.switcher} ${variant === 'mobile' ? Styles.mobile : ''}`}
        >
            <button
                type="button"
                className={Styles.trigger}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label={tNav("selectLanguage")}
                onClick={() => setIsOpen((v) => !v)}
            >
                <span className={Styles.flag}>{current.flag}</span>
                <span className={Styles.label}>{current.label}</span>
                <span className={Styles.chevron} aria-hidden="true">▾</span>
            </button>

            {isOpen && (
                <ul className={Styles.menu} role="menu">
                    {routing.locales.map((loc) => {
                        const meta = LOCALE_META[loc];
                        const isActive = loc === locale;
                        return (
                            <li key={loc} role="none">
                                <button
                                    type="button"
                                    role="menuitem"
                                    className={`${Styles.item} ${isActive ? Styles.itemActive : ''}`}
                                    onClick={() => handleSelect(loc)}
                                >
                                    <span className={Styles.flag}>{meta.flag}</span>
                                    <span className={Styles.label}>{meta.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
