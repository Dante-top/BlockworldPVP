import styles from './rarity.module.scss';
import { RarityData } from '../../constants'
import Navbar from '../Navbar'
import { useState } from 'react';

function Rarity() {
    // const [_primary_color, set_primary_color] = useState("_primary_color");
    // const [_secondary_color, set_secondary_color] = useState("_secondary_color");
    return (
        <div className={styles.rarity} id="Rarity">
            <div className={styles.background_transform}>
                <div className="container d-flex justify-content-center align-items-center flex-column py-100">
                    <div className="d-flex justify-content-start align-items-center flex-column">
                        <div className="container text-white text-center">
                            <i><b><h1 className="weight-text">BLOCKHEAD TRAIT RARITY</h1></b></i>
                        </div>
                        <div className="container text-start">
                            <p className="text-white py-20">
                                Not all Blockheads are created equal. There are 114 total traits in the BlockWorld that have been categorized into a tier based system based on trait rarity. Each trait is labeled as one of
                                the following ranks depending on the % chance of being minted: Common, Uncommon, Rare, Super Rare, and Legendary.
                            </p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className={`d-flex justify-content-center ${styles.responsive_rarity}`}>
                            {RarityData.Rarity.map((item, index) => (
                                <div key={index} className={`d-flex flex-column me-3 ${styles.rarity_content}`}>
                                    <div className={`${styles.btn_social_content} text-white`}>
                                        <span className={`btn btn-round-lg btn-lg ${styles.btn_common} ${styles[item.key + '_primary_color']}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <div className={`container d-flex justify-content-start align-items-center flex-row text-white ${styles[item.key + '_primary_color']} ${styles[item.key + '_secondary_color']}`}>
                                        <div className={`container accordion ${styles.accordion_content}`} id="accordionExample">
                                            {item.children.map((item, index) => (
                                                <div key={index} className={`${styles.accordion_content_item} accordion-item`}>
                                                    <h2 className={`${styles.accordion_content_header} accordion-header text-white`} id={item.subtitle + (index + 1).toString()}>
                                                        <button className={`${styles.accordion_content_button} accordion-button collapsed ${styles[item.title + '_primary_color']}`} type="button" data-bs-toggle="collapse" data-bs-target={"#" + item.title + (index + 1).toString()} aria-expanded="false" aria-controls={item.title + (index + 1).toString()}>
                                                            {item.subtitle}
                                                        </button>
                                                    </h2>
                                                    <div id={item.title + (index + 1).toString()} className="accordion-collapse collapse" aria-labelledby={item.title + (index + 1).toString()} data-bs-parent="#accordionExample">
                                                        <div className={`${styles.accordion_content_body} accordion-body d-flex justify-content-start align-items-start flex-column container ${styles[item.title + '_primary_color']}`}>
                                                            {item.content.map((item, index) => (
                                                                <p key={index}>{item.name}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rarity