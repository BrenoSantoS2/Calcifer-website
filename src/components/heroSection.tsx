import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Styles from "../css/css_components/heroSection.module.css";
import { HeroVideoParallax } from "./heroVideoParallax";
import "../css/style.css";

export async function HeroSection() {
    const t = await getTranslations("hero");
    const tNav = await getTranslations("nav");

    return (
        <section className={Styles.section}>
                    <div>
                        <div className={Styles.video_filter}></div>
                        <HeroVideoParallax wrapperClassName={Styles.video_parallax} />
                    </div>
                    <div className={Styles.hero_logo_mobile}>
                        <Image src="/CalcifireLogo.svg" alt={tNav("logoAlt")} width="204" height="63"/>
                    </div>
                    <div className={Styles.text_layout}>
                        <h1 className={Styles.text_color}>{t("title")}</h1>
                        <p className={Styles.text_color}>{t("body")}</p>
                    </div>
                    <a href="#about" className={Styles.scroll_indicator} aria-label="Scroll down">
                        <span className={Styles.scroll_chevron} />
                    </a>
                </section>
    )
}
