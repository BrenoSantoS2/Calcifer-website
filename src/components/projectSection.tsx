import { getTranslations } from "next-intl/server";
import "../css/style.css";
import Styles from '../css/css_components/projectSection.module.css';

export async function ProjectSection() {
    const t = await getTranslations("project");

    return (
        <section id="games">
            <div className={Styles.project_section}>
                <div>
                    <div className={Styles.video_filter}></div>
                        <video autoPlay muted loop className={Styles.video_background}>
                            <source src="/videos/bg2_video.mp4" type="video/mp4" />
                        </video>
                </div>


                <div className={Styles.game}>
                    <div className={Styles.game_info}>
                        <h1 className={Styles.title_white}>{t("title")}</h1>
                        <div className={Styles.topics}>
                            <p className={Styles.topic}>{t("tagAction")}</p>
                            <p className={Styles.topic}>{t("tagMetroidvania")}</p>
                        </div>
                    </div>

                    <p className={Styles.text_white}>{t("body")}</p>
                </div>
            </div>
        </section>
    )
}
