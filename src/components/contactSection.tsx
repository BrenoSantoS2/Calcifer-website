import { getTranslations } from "next-intl/server";
import "../css/style.css";
import Styles from "../css/css_components/contactSection.module.css";
import Image from 'next/image';

export async function ContactSection() {
    const t = await getTranslations("contact");

    return (
        <section id="contact" className={Styles.outer}>
            <Image src="/Phanthom.png" alt="" width="557" height="372" className={Styles.image}/>
            <div className={Styles.contactSection}>
                <div className={Styles.title}>
                    <h1>{t("title")}</h1>
                    <p>{t("body")}</p>
                </div>

                <div className={Styles.contact}>
                    <div className={Styles.semiTitle}>
                        <Image src="/Email.svg" alt={t("email")} width="30" height="23"/>
                        <h2>{t("email")}</h2>
                    </div>
                    <p>calcifer.studios.ofc@gmail.com</p>
                </div>

                <div className={Styles.contact}>
                    <div className={Styles.semiTitle}>
                        <Image src="/Telephone.svg" alt={t("phone")} width="30" height="23"/>
                        <h2>{t("phone")}</h2>
                    </div>
                    <p>+55 (11) 97106-1168</p>
                </div>

                <div className={Styles.socials}>
                    <a href="https://www.linkedin.com/company/calcifire-studios/" target="_blank" rel="noopener noreferrer" className={Styles.social_link}>
                        <Image src="/Linkedin.svg" alt="Linkedin" width="30" height="30"/>
                    </a>
                    <a href="https://www.instagram.com/calcifire_studios/" target="_blank" rel="noopener noreferrer" className={Styles.social_link}>
                        <Image src="/Instagram.svg" alt="Instagram" width="30" height="30"/>
                    </a>
                </div>

            </div>
        </section>
    )
}
