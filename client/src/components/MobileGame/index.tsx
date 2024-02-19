import styles from './Mobile.module.scss';
import GradientStart from '../GradientStart';
import GradientEnd from '../GradientEnd';

function MobileGame() {
    return (
        <div className={`${styles.intro} containter`} id="Intro">
            <div className={`${styles.gradientStart}`}>
            </div>
            <img src="../../img/c2.png" className={`${styles.cloud_1}`} />
            <img src="../../img/c1.png" className={`${styles.cloud_2}`} />
            <div className={`${styles.intro_content} d-flex`}>
                <div className={`${styles.available} d-flex justify-content-center flex-column`}>
                    <div className='text-center container'>
                        <span className={`${styles.subtitle} d-inline`}>
                            <span className="d-inline">AVAILABLE IN LATE 2022</span>
                        </span>
                    </div>
                    <img src="../../img/handsss.png" className={``} />
                </div>
                <div className={`d-flex justify-content-start align-items-center flex-column ${styles.mobile_content}`}>
                    <div className={`d-flex align-items-center justify-content-center flex-column ${styles.mobile_title}`}>
                        <span className={`${styles.earn} `}>
                            PLAY TO EARN
                        </span>
                        <span className={`${styles.mobile} `}>
                            MOBILE GAME
                        </span>
                    </div>
                    <div className="d-flex align-items-start justify-content-start flex-column">
                        <div className={`d-flex align-items-start flex-row mt-60 ${styles.element}`}>
                            <img src="../../img/sym1.png" className={``} />
                            <p>
                                UPGRADE&nbsp;YOUR&nbsp;CHARACTER
                            </p>
                        </div>
                        <div className={`d-flex align-items-start flex-row ${styles.element}`}>
                            <img src="../../img/sym2.png" className={``} />
                            <p>
                                EARN&nbsp;CRYPTOCURRENCY
                            </p>
                        </div>
                        <div className={`d-flex align-items-start flex-row ${styles.element}`}>
                            <img src="../../img/sym3.png" className={``} />
                            <p>
                                COMPETE&nbsp;WITH&nbsp;FRIENDS
                            </p>
                        </div>
                    </div>
                    <div className="text-center container">
                        <a href="#Mint"><button type="button" className={`btn btn-round-lg btn-lg ${styles.btn_social} text-white box-shadow`}>CLAIM YOUR CHARACTER</button></a>
                    </div>
                </div>
            </div>
            <img src="../../img/c3.png" className={`${styles.cloud_3}`} />
            <GradientEnd />
        </div>
    );
}

export default MobileGame