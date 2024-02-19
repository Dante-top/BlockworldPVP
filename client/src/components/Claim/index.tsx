import styles from './claim.module.scss'
import { useState, useEffect } from 'react';
import { MintData } from '../../constants/index';
import GradientStart from '../GradientStart';
import GradientEnd from '../GradientEnd';
import { isAirdropActive, claimNft } from '../../web3/web3'
import { ToastErrMsg, ToastSuccessMsg, ToastWarnMsg } from '../Toast';
import axios from "axios";
declare var window: any

const Claim = () => {
    const [isAirdrop, setIsAirdrop] = useState(false);
    const Server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    const [count, setCount] = useState(1);
    const [maxmint, setMaxmint] = useState(0);
    const [isClaimAble, setIsClaimAble] = useState(false);
    const [mintLoading, setMintLoading] = useState(false);
    const [claimStatus, setClaimStatus] = useState(true);
    const [solAddress, setSolAddress] = useState('');

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

    const handleVerify = async () => {
        const { ethereum } = window
        if (!ethereum) {
            ToastErrMsg('You should install Metamask on your browser!');
            setMintLoading(false);
            return
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (!accounts[0]) {
            ToastErrMsg('You should connect your metamask to verify!');
            setMintLoading(false);
            return
        }

        const data = await isAirdropActive()
        if (data) {
            setIsAirdrop(true);
        } else {
            ToastWarnMsg('Airdrop is not active yet!');
            return;
        }

        setMintLoading(true);
        var phantom: any
        // Check for Solana & Phantom
        if (window.solana) {
            var provider = window.solana;
            if (!provider.isPhantom) {
                return;
            } else {
                phantom = provider;
            }
        }
        if (!phantom) {
            ToastErrMsg('You should install Phantom Wallet!');
            phantom = false;
            setMintLoading(false);
            return;
        } else {
            // Connect to Solana
            await phantom.connect();
            const phantomAddress = phantom.publicKey.toString();
            setSolAddress(phantomAddress)
            const Phantom_address = {
                address: phantomAddress
            }
            console.log(phantomAddress);
            try {
                const res = await axios.post(Server_url + 'checkIfClaimable', Phantom_address)
                if (!res.data.success) {
                    ToastErrMsg(res.data.message);
                    setIsClaimAble(false);
                } else {
                    setIsClaimAble(true);
                    setMaxmint(res.data.data.max_mint)
                }
                setMintLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
    }

    const handleClaim = async () => {
        try {
            const { ethereum } = window
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            requestClaim(accounts[0]);
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }

    const requestClaim = async (wallet: string) => {
        setMintLoading(true);

        // if (maxmint < 1) {
        //     ToastErrMsg('Sorry, You have already claimed all.');
        //     setMintLoading(false);
        //     return
        // }

        const reqClaim = {
            address: wallet,
            count: count
        }
        try {
            const res = await axios.post(Server_url + 'getClaimData', reqClaim)
            const { tokenAmount, timestamp, signature, price } = res.data

            const data = await claimNft(tokenAmount, timestamp, signature, wallet)
            if (data?.success == false) {
                if (data.type == "estimategas") {
                    ToastErrMsg('Insufficient funds to mint. Please consider the price 0.15 Eth, and some gas fee!');
                    setMintLoading(false);
                    return
                } else if (data.type == "claim") {
                    ToastErrMsg('Error happened while processing, please try again later');
                    setMintLoading(false);
                    return
                }
            } else {
                ToastSuccessMsg('Claim Success!');
                const ClaimData = {
                    sol_address: solAddress,
                    count: tokenAmount
                }
                const res = await axios.post(Server_url + 'updateClaimData', ClaimData)
                if (res.data.success) {
                    const max_mint = res.data.max_mint;
                    console.log('max_mint: ', max_mint);
                    setMaxmint(max_mint);
                    if (max_mint == 0) {
                        setClaimStatus(false);
                    } else {
                        setClaimStatus(true);
                    }
                }
                setMintLoading(false);
            }
        } catch (err) {
            console.log(err)
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
                            <div >

                                {/* disabled={isSoldOut || isMinting}
                                    onClick={() => onMintNFT(count)} */}
                                {
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        {!mintLoading ?
                                            (
                                                <>
                                                    {
                                                        isClaimAble ?
                                                            <>
                                                                {
                                                                    claimStatus ?
                                                                        <>
                                                                            <div className={`${styles.MintCardSet} d-grid`}>
                                                                                <div className={`${styles.MintCardSetPart} d-grid`}>
                                                                                    <span className={`${styles.sBtn} d-flex align-items-cneter justify-content-center text-center`} onClick={() => { Decrease(count) }}>-</span>
                                                                                    <span className={`${styles.MintValue} text-center d-flex align-items-cneter justify-content-center pt-1`}>{count}</span>
                                                                                    <span className={`${styles.sBtn} d-flex align-items-cneter justify-content-center text-center`} onClick={() => { Increase(count) }}>+</span>
                                                                                </div>
                                                                                <div className={`${styles.MintMaxValue} d-flex align-items-center justify-content-center text-center rounded`}>
                                                                                    {maxmint} MAX
                                                                                </div>
                                                                            </div>
                                                                            <button className={`${styles.MintBtn} my-4`} onClick={() => handleClaim()}>
                                                                                CLAIM BLOCKHEAD
                                                                            </button>
                                                                        </>
                                                                        :
                                                                        <button className={`${styles.MintBtn} my-4`} disabled={!claimStatus} onClick={() => handleClaim()}>
                                                                            CLAIMED ALL
                                                                        </button>
                                                                }
                                                            </>
                                                            :
                                                            <button className={`${styles.MintBtn} my-4`} onClick={() => handleVerify()}>
                                                                VERIFY
                                                            </button>
                                                    }
                                                </>)
                                            : (
                                                <>
                                                    <div className={`${styles.MintCardSet} d-grid`}>
                                                        <div className={`${styles.MintCardSetPart} d-grid`}>
                                                            <span className={`${styles.sBtn} d-flex align-items-cneter justify-content-center text-center`} onClick={() => { Decrease(count) }}>-</span>
                                                            <span className={`${styles.MintValue} text-center d-flex align-items-cneter justify-content-center pt-1`}>{count}</span>
                                                            <span className={`${styles.sBtn} d-flex align-items-cneter justify-content-center text-center`} onClick={() => { Increase(count) }}>+</span>
                                                        </div>
                                                        <div className={`${styles.MintMaxValue} d-flex align-items-center justify-content-center text-center rounded`}>
                                                            {maxmint} MAX
                                                        </div>
                                                    </div>
                                                    <button className={`${styles.MintBtn} my-4`}>
                                                        <div className="spinner-border text-white" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                                </>

                                            )
                                        }
                                    </div>
                                }
                                {/* {isSoldOut ?
                                    //     ("SOLD OUT")
                                    //     : isMinting ?
                                    //         <div className="spinner-border text-white" role="status">
                                    //             <span className="visually-hidden">Loading...</span>
                                    //         </div>
                                    //         :
                                    //         <span>CLAIM</span>
                                    // } */}
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

export default Claim