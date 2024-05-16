import "../css/style.css";
import Styles from "../css/css_components/contactSection.module.css";

export function ContactSection() {
    return (
        <section>
            <img src="/Phanthom.png" alt="" className={Styles.image}/>
            <div className={Styles.contactSection}>
                <div className={Styles.title}>
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Contact us for any inquiries.</p>
                </div>

                <div className={Styles.contact}>
                    <div className={Styles.semiTitle}>
                        <img src="/Email.svg" alt="Email" />
                        <h2>Email</h2>
                    </div>
                    <p>hello@calciferstudios.com</p>
                </div>

                <div className={Styles.contact}>
                    <div className={Styles.semiTitle}>
                        <img src="/Telephone.svg" alt="Telephone" />
                        <h2>Phone</h2>
                    </div>
                    <p>+1 (555) 123-4567</p>
                </div>

            </div>
        </section>
    )
}