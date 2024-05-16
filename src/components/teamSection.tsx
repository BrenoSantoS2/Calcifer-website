import "../css/style.css";
import Styles from '../css/css_components/teamSection.module.css'

export function TeamSection() {
    return (
        <section>
            <div className={Styles.teamSection}>
                <div className={Styles.text}>
                    <h1 className={Styles.text_center}>Meet Our Team</h1>
                    <p className={Styles.text_center}>Get to know the talented university students behind Calcifer Studios.</p>
                </div>
                <div className={Styles.cards}>
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                </div>
            </div>
        </section>
    )
}

export function ProfileCard(){
    return(
        <div>
            <img src="/time/BrenoSantos.png" alt="" className={Styles.image}/>
            <h2 className={Styles.h2}>Breno Santos</h2>
            <p className={Styles.p}>Game Developer / Designer</p>
            <div className={Styles.media}>
                <button className={Styles.button}><img src="/Linkedin.svg" alt="Linkedin" /></button>
                <button className={Styles.button}><img src="/Instagram.svg" alt="Instagram" /></button>
            </div>

        </div>
    )
}