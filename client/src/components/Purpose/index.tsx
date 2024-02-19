import styles from "./purpose.module.scss";
import { PurposeData } from "../../constants/index";

function Purpose() {
    return (
        <div className={`${styles.benefit} d-flex flex-column justify-content-center`} id="Benefit">
            <div className={`${styles.PageBenefit} d-flex flex-column align-items-center position-relative`}>
                <div className={`d-flex ${styles.c2Row}`}>
                    <img src="../../img/c2.png" className={`${styles.c2}`} />
                </div>
                <div className={`position-relative`}>
                    <div className={`${styles.HeaderTitle} d-flex justify-content-center box-shadow`}>
                        <span className={`${styles.HeaderTitleText}`}>blockhead</span>
                    </div>
                    <img src={`../../img/pop 2.png`} className={`${styles.HeaderPopImg} position-absolute`} />
                </div>
                <div className={`${styles.HeaderSubTitle} text-center box-shadow`}>
                    benefits
                </div>
                <img src={`../../img/c1.png`} className={`position-absolute ${styles.c1}`} />
            </div>
            <div className={`${styles.CardData} `}>
                {PurposeData.map((item, index) => {
                    return (
                        <div className={`d-flex align-items-center ${styles.Card}`} key={index} style={{ "width": "40%" }}>
                            <img src={item.img} className={`${styles.cardImg}`} />
                            <div className={`d-flex flex-column  ${styles.cardMain}`}>
                                <div className={`d-flex ${styles.cardSubTitle} box-shadow`}>
                                    <p>
                                        {item.title}
                                    </p>
                                </div>
                                <div className={`${styles.cardSubDes}`}>
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <img src="../../img/c3.png" className={`${styles.c3}`} />
        </div>
    );
}

export default Purpose;