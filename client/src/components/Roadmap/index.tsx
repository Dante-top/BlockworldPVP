import styles from './roadmap.module.scss';
import { RoadmapData } from '../../constants/index';

function Roadmap() {
    return (
        <div className={`${styles.roadmap} d-flex flex-column align-items-center`} id="Roadmap">
            <div className={`${styles.backRoadmap} d-flex flex-column justify-content-center align-items-center`}>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <div className={`d-flex ${styles.header} box-shadow`}>
                        <div className={`${styles.headerText1} w-50 text-center`}>
                            OFFICIAL
                        </div>
                        <div className={`${styles.headerText2} w-50 text-center`}>
                            ROADMAP
                        </div>
                    </div>
                    <a className={`${styles.headerBtn} text-center text-uppercase shadow-sm `} href='https://drive.google.com/file/d/15TXLXYaoPfqJP-cim_ogP9JRk9RId00X/view?usp=sharing' target={`_blank`}>
                        view whitepaper
                    </a>
                </div>
            </div>
            <div className={`d-flex flex-column justify-content-center align-items-center w-100 `}>
                {RoadmapData.Pharse.map((item, x) => {
                    return (
                        <div className={`d-flex ${styles.Card}`} key={x}>
                            <div className='d-flex align-items-start' tabIndex={x}>
                                <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
                                    <div className={`${styles.PCardTitle} box-shadow text-center`} style={{ backgroundColor: `${item[0].bColor}` }}>
                                        {item[0].title}
                                    </div>
                                    <div className={`d-flex align-items-center ${styles.CardSub}`}>
                                        <img src={`${item[0].image}`} className={`${styles.CardImg}`} />
                                        <div className={`d-flex flex-column ${styles.CardPart} box-shadow`}>
                                            <div className={`${styles.CardSubTitle}`} style={{ color: `${item[0].bColor}` }}>
                                                {item[0].hTitle}
                                            </div>
                                            <div className={`${styles.CardSubDes} px-2 pt-2`} style={{ backgroundColor: `${item[0].bColor}` }}>
                                                {item[0].description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className={`${styles.flex1}`}></span>
                            <div className={`d-flex align-items-end ${styles.SCard}`} tabIndex={x}>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <div className={`${styles.PCardTitle} text-center box-shadow`} style={{ backgroundColor: `${item[1].bColor}` }}>
                                        {item[1].title}
                                    </div>
                                    <div className={`d-flex align-items-center ${styles.CardSub}`}>
                                        <img src={`${item[1].image}`} className={`${styles.CardImg}`} />
                                        <div className={`d-flex flex-column ${styles.CardPart} box-shadow`}>
                                            <div className={`${styles.CardSubTitle}`} style={{ color: `${item[1].bColor}` }}>
                                                {item[1].hTitle}
                                            </div>
                                            <div className={`${styles.CardSubDes} px-2 pt-2`} style={{ backgroundColor: `${item[1].bColor}` }}>
                                                {item[1].description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <img src={`../../img/c1.png`} className={`${styles.c1}`} />
            <img src={`../../img/c3.png`} className={`${styles.c3}`} />
            <img src={`../../img/c2.png`} className={`${styles.c2}`} />
        </div>
    );
}

export default Roadmap;