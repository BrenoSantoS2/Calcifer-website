import { NavBar } from "./navbar";
import Styles from "../css/css_components/heroSection.module.css";
import "../css/style.css"

export function HeroSection() {
    return (
        <section className={Styles.section}>
                    <div>
                        <div className={Styles.video_filter}></div>
                        <video autoPlay muted loop className={Styles.video_background}>
                            <source src="/videos/bg_video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <NavBar />
                    <div>
                        <div className={Styles.text_layout}>
                            <h1 className={Styles.text_color}>Unleashing creativity and passion in every project</h1>
                            <p className={Styles.text_color}>Welcome to the immersive world of Calcifer Studios, where gaming dreams come true. Join us on an epic adventure filled with excitement, challenges, and endless possibilities.</p>
                        </div>
                    </div>
                </section>
    )
}