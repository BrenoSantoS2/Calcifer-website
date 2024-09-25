import "../css/style.css";
import Styles from "../css/css_components/contactSection.module.css";
import Image from 'next/image'

export function ContactSection() {
    return (
        <section id="contact">
            <Image src="/Phanthom.png" alt="" width="557" height="372" className={Styles.image}/>
            <div className={Styles.contactSection}>
                <div className={Styles.title}>
                    <h1>Contact Us</h1>
                    <p>We&#39d love to hear from you. Contact us for any inquiries.</p>
                </div>

                <div className={Styles.contact}>
                    <div className={Styles.semiTitle}>
                        <Image src="/Email.svg" alt="Email" width="30" height="23"/>
                        <h2>Email</h2>
                    </div>
                    <p>hello@calciferstudios.com</p>
                </div>

                <div className={Styles.contact}>
                    <div className={Styles.semiTitle}>
                        <Image src="/Telephone.svg" alt="Telephone " width="30" height="23"/>
                        <h2>Phone</h2>
                    </div>
                    <p>+1 (555) 123-4567</p>
                </div>

            </div>
        </section>
    )
}