import "../css/style.css"
import Styles from '../css/css_components/projectSection.module.css';

export function ProjectSection() {
    return (
        <section>
            <div className={Styles.project_section}>
                <div>
                    <div className={Styles.video_filter}></div>
                        <video autoPlay muted loop className={Styles.video_background}>
                            <source src="/videos/bg2_video.mp4" type="video/mp4" />
                        </video>
                </div>
                

                <div className={Styles.game}>
                    <div className={Styles.game_info}>
                        <h1 className={Styles.title_white}>Falling in Abyss</h1>
                        <div className={Styles.topics}>
                            <p className={Styles.topic}>Action</p>
                            <p className={Styles.topic}>MetroidVania</p>
                        </div>
                    </div>

                    <p className={Styles.text_white}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                </div>
            </div>
        </section>
    )
}