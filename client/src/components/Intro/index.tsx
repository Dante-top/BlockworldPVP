import styles from './Intro.module.scss';

function Intro() {
    return (
        <div className={`bg-white container`}>
            <div className={`d-flex justify-content-center align-items-center ${styles.intro}`}>
                <div className={`d-flex justify-content-center align-items-start flex-column ${styles.intro_width}`}>
                    <span className={`${styles.intro_subtitle}`}>
                        INTRODUCING
                    </span>
                    <div className={`d-flex justify-content-center align-items-center flex-column ${styles.intro_content}`}>
                        <span className={`${styles.intro_title} box-shadow`}>
                            THE BLOCKHEADS
                        </span>
                        <p>
                            BlockWorld PVP is a competitive battle-arena game taking place
                            in the depths of the metaverse with millions of players, known
                            as the BlockHeads. Separated by faction, players compete to
                            become the most powerful group in the BlockWorld.
                        </p>
                        <p>
                            BlockWorld PVP is offering 10,000 uniquely generated BlockHead
                            NFTs to the most courageous players wishing to lead their faction
                            to glory.
                        </p>
                        <p>
                            Each NFT owner will have the ability to create their own faction,
                            and unlock a unique in-game character. BlockWorld PVP will be
                            officially released for mobile users in late 2022.
                        </p>
                    </div>
                </div>
                <div className={`d-flex justify-content-center align-items-center flex-column ${styles.nfts}`}>
                    <div className={`text-center`}>
                        <video className={styles.img_content} autoPlay muted loop>
                            <source src="../../img/Spinning Blockhead.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className={`text-center ${styles.amount_content}`}>
                        <p className='d-inline'>10,000</p>
                        <div className='text-end d-inline'>
                            <span>
                                NFTS
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center container pb-50">
                <a href="#Mint"><button type="button" className={`btn btn-round-lg btn-lg ${styles.btn_social} text-white box-shadow`}>BUY YOUR BLOCKHEAD</button></a>
            </div>
        </div>
    );
}

export default Intro