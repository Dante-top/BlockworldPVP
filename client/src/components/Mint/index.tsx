import styles from './mint.module.scss';
import { useState, useEffect } from 'react';
import { MintData } from '../../constants/index';
import GradientStart from '../GradientStart';
import GradientEnd from '../GradientEnd';
import { ToastErrMsg, ToastSuccessMsg, ToastWarnMsg } from '../Toast';
import axios from "axios";
import { mintNft, isPresaleActive, isPublicsaleActive } from '../../web3/web3';
declare var window: any

const Mint = (): JSX.Element => {
    const [count, setCount] = useState(1);
    const [mintLoading, setMintLoading] = useState(false);
    const [mintStatus, setMintStatus] = useState(false);
    const [isSaleStarted, setIsSaleStarted] = useState(false);
    const Server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    const [maxmint, setMaxmint] = useState(20);

    useEffect(() => {
        const checkSaleStarted = async () => {
            const isPresaleStarted = await isPresaleActive();
            const isPublicsaleStarted = await isPublicsaleActive();
            if (isPresaleStarted || isPublicsaleStarted) {
                setIsSaleStarted(true);
            } else if (!isPresaleStarted && !isPublicsaleStarted) {
                setIsSaleStarted(false);
                ToastWarnMsg('Sorry, Sale has not started yet.');
            }
        }
        checkSaleStarted();
    }, [])

    const Increase = (count: number) => {
        if (count > maxmint - 1) {
            return
        }
        setCount(count + 1);
    }
    const Decrease = (count: number) => {
        if (count < 2) {
            return
        }
        setCount(count - 1);
    }

    const handleMint = async () => {
        try {
            const { ethereum } = window

            if (!ethereum) {
                ToastErrMsg('You should install metamask on your browser!');
                return
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            requestMint(accounts[0])
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }
    const requestMint = async (wallet: string) => {
        setMintLoading(true);
        const reqMint = {
            address: wallet,
            count: count
        }

        console.log('reqData :', Server_url, reqMint);

        const res = await axios
            .post(Server_url + 'getMintData', reqMint)
        if (res.data.success == false) {
            ToastErrMsg(res.data.message);
            setMintLoading(false);
            return
        }
        let { tokenAmount, timestamp, signature, price } = res.data;
        const data = await mintNft(price, tokenAmount, timestamp, signature, wallet)
        console.log(data?.success)
        if (data?.success == false) {
            if (data.type == "estimategas") {
                ToastErrMsg('Insufficient funds to mint. Please consider the price 0.15 Eth, and some gas fee!');
            } else if (data.type == "mint") {
                ToastErrMsg('Error happened while processing, please try again later');
            } else if (data.type == "maxLimit") {
                ToastErrMsg('All Blockheads were sold out.');
            } else if (data.type == "SaleLimit") {
                ToastErrMsg('Exceeded sale allowed buy limit');
            }
            setMintLoading(false);
            return
        } else if (data?.success == true) {
            ToastSuccessMsg('Mint Success!');
            setMintLoading(false);
            return
        } else {
            ToastErrMsg('Sorry, please try again.');
            setMintLoading(false);
            return;
        }
    }

    return (
        <div className={`${styles.mint} d-flex flex-column justify-content-center`} id="Mint">
            <GradientEnd />
            <div className={`${styles.PageMint} d-flex flex-column align-items-center`}>
                {/* <div className={`${styles.header} d-flex justify-content-center box-shadow`}>
                    <div className={`${styles.headerText1}`}>{nftsData.itemsRemaining}</div>
                    <div className={`${styles.headerText2}`}>REMAINING</div>
                </div> */}
                <div className={`${styles.MintMain} d-flex`}>
                    <div className={`${styles.MintImgPart} d-flex flex-column align-items-center`}>
                        <img className={`${styles.MintImg} box-shadow`} src={`../../img/mint.gif`} />
                        <a href="/traitrarity" target='_blank'><button className={`${styles.MintMainBtn} ${styles.responsive_show} px-5`}> VIEW TRAIT RARITY </button></a>
                    </div>
                    <div className={`d-flex flex-column align-items-start position-relative`}>
                        <div className={`${styles.MintText1} px-4 py-1 my-2`}>
                            CLAIM YOUR OWN
                        </div>
                        <div className={`${styles.MintCard} d-flex flex-column align-items-center box-shadow`}>
                            <div className={`${styles.MintCardTitle} text-center mb-3`}>
                                <span className={`${styles.show}`}>CLAIM YOUR </span><span>BLOCKHEAD</span>
                            </div>
                            <div className={`${styles.MintCardDes} text-center px-2 `}>
                                {MintData.description}
                            </div>
                            <div className={`${styles.MintCardSet} d-grid`}>
                                <div className={`${styles.MintCardSetPart} d-grid`}>
                                    <span className={`${styles.sBtn} d-flex align-items-cneter justify-content-center text-center`} onClick={() => { Decrease(count) }}>-</span>
                                    <span className={`${styles.MintValue} text-center d-flex align-items-cneter justify-content-center pt-1`}>{count}</span>
                                    <span className={`${styles.sBtn} d-flex align-items-cneter justify-content-center text-center`} onClick={() => { Increase(count) }}>+</span>
                                </div>
                                <div className={`${styles.MintMaxValue} d-flex align-items-center justify-content-center text-center rounded`}>
                                    20 MAX
                                </div>
                            </div>
                            <div >

                                {
                                    isSaleStarted ?
                                        <>
                                            {
                                                !mintLoading ?
                                                    <button className={`${styles.MintBtn} my-4`} onClick={() => handleMint()}>
                                                        <span>MINT</span>
                                                    </button>
                                                    :
                                                    <button className={`${styles.MintBtn} my-4`}>
                                                        <div className="spinner-border text-white" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                            }
                                        </>
                                        :
                                        <>
                                            <button className={`${styles.MintBtn} my-4`}>
                                                <span>Coming&nbsp;Soon</span>
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                        <div className={`${styles.BtButton} d-flex justify-content-center`}>
                            <a className={`${styles.MintMainBtn} px-5 mt-2`} href='https://blockheadssocials.clickfunnels.com/vide1639097199241' target={'_blank'}> BUYING TUTORIAL </a>
                            <a href="/traitrarity" target='_blank'><button className={`${styles.MintMainBtn} ${styles.responsive_hidden} px-5`}> VIEW TRAIT RARITY </button></a>
                        </div>
                        <img src="../../img/pop 4.png" className={`${styles.popImg}`} />
                    </div>
                </div>
            </div>
            <GradientStart />
        </div>
    );
}

export default Mint;