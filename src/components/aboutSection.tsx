import Styles from "../css/css_components/aboutSection.module.css";
import "../css/style.css"

export function AboutSection() {
    return (
        <section id="about">
            <div>
                <div className={Styles.about_section}>
                    <div className= {Styles.content}>
                        <div className={Styles.title_layout}>
                            <h3>About Us</h3>
                            <h1>Creating Games That Inspire and Entertain</h1>
                        </div>

                        <p className={Styles.text_position}>Calcifer Studios is a game studio founded by university students with a mission to create captivating and innovative games that bring joy to players around the world. We believe in the power of games to inspire and entertain, and we are dedicated to delivering unique and immersive experiences.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}