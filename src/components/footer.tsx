import { getTranslations } from "next-intl/server";
import Styles from '../css/css_components/footer.module.css';

export async function Footer() {
    const t = await getTranslations("footer");

    return (
        <footer>
            <div className={Styles.footer}>
                <p className={Styles.text}>{t("rights")}</p>
            </div>
        </footer>
    );
}
