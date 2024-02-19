import styles from './Battle.module.scss';
import GradientStart from '../GradientStart';
import GradientEnd from '../GradientEnd';

function BattleArena() {
    return (
        <div className={`containter ${styles.battle}`} id="Battle">
            <GradientStart />
            <div className={`${styles.video_content}`}>
                <div className={`${styles.video}`}>
                    <div className={`d-flex align-items-center justify-content-center ${styles.video_title}`}>
                        <span className={`${styles.theBattle} `}>
                            THE BATTLE
                        </span>
                        <span className={`${styles.arena} `}>
                            ARENA
                        </span>
                    </div>
                    <div className={`${styles.hold_video}`}>
                        <img src="../../img/topper.png" className={`${styles.topper}`} />
                        <video className={styles.img_content} autoPlay muted loop>
                            <source src="../../img/fighting animation.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <span className={`${styles.coming}`}>
                        COMING SOON...
                    </span>
                </div>
            </div>
            <div className={`d-flex justify-content-center align-items-center ${styles.card_content}`}>
                <div className={`d-flex justify-content-center align-items-center flex-column mg-30 ${styles.card_1}`}>
                    <span className='text-shadow'>TRAIN</span>
                    <img src="../../img/Sin título-3.png" />
                </div>
                <div className={`d-flex justify-content-center align-items-center flex-column mg-30 ${styles.card_2}`}>
                    <span className='text-shadow'>UPGRADE</span>
                    <img src="../../img/Sin título-2.png" />
                </div>
                <div className={`d-flex justify-content-center align-items-center flex-column mg-30 ${styles.card_3}`}>
                    <span className='text-shadow'>BATTLE</span>
                    <img src="../../img/Sin título-1.png" />
                </div>
            </div>
        </div>
    );
}

export default BattleArena