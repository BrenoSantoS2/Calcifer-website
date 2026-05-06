import { getTranslations } from "next-intl/server";
import Styles from "../css/css_components/aboutSection.module.css";
import "../css/style.css";

export async function AboutSection() {
    const t = await getTranslations("about");

    return (
        <section id="about">
            <div>
                <div className={Styles.about_section}>
                    <div className= {Styles.content}>
                        <div className={Styles.title_layout}>
                            <h3>{t("kicker")}</h3>
                            <h1>{t("title")}</h1>
                        </div>

                        <p className={Styles.text_position}>{t("body")}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
