import styles from './marketplace_header.module.scss'
import * as React from 'react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Dlg_history from "../Marketplace_dlg_history";
import Dlg_priceHistory from "../Marketplace_priceHistory_dlg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 35,
        maxWidth: 987
    },
    // '& .MuiDialogActions-root': {
    //     padding: theme.spacing(1),
    // },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const Marketplace_header = () => {
    const [SaleOpen, setSaleOpen] = React.useState(false);
    const [PriceOpen, setPriceOpen] = React.useState(false);

    const handleClickSaleOpen = () => {
        setSaleOpen(true);
    };
    const handleSaleClose = () => {
        setPriceOpen(false);
    };
    const handleClickPriceOpen = () => {
        setPriceOpen(true);
    };
    const handlePriceClose = () => {
        setPriceOpen(false);
    };
    return (
        <header className={`${styles.m_header} container`}>
            <div className={`${styles.background_transform}`}>
                <div className={`d-flex align-items-start ${styles.nav}`}>
                    <div className={`${styles.btn_back} text-start`}>
                        <a href='/'>
                            <span className={`${styles.back_button} d-flex flex-row`}>
                                <img src="../../img/back-1.png" />
                                <p>BACK</p>
                            </span>
                        </a>
                    </div>
                    <div className={`${styles.notice}`}>
                        <p>MARKETPLACE WILL BE RELEASED AT THE END OF FEBRUARY</p>
                    </div>
                    <div className={`${styles.wallet} d-flex justify-content-end`}>
                        <button className={`${styles.walletConnect} box-shadow-M`}>
                            CONNECT WALLET
                        </button>
                    </div>
                </div>
                <div className={`${styles.title} d-flex align-items-center`}>
                    <div className={`${styles.social_content} d-flex`}>
                        <a href="" target={'_blank'} className={`${styles.social_menu} box-shadow-M`}>
                            <img src="../../img/twitter-2.png" />
                        </a>
                        <a href="https://discord.gg/J8ZaCHdTjN" target={'_blank'} className={`${styles.social_menu} box-shadow-M`}>
                            <img src="../../img/discord-1.png" />
                        </a>
                        <a href="https://instagram.com/blockworldpvp?utm_medium=copy_link" target={'_blank'} className={`${styles.social_menu} box-shadow-M`}>
                            <img src="../../img/instagram-1.png" />
                        </a>
                    </div>
                    <div className={`${styles.title_content} d-flex align-items-center justify-content-center`}>
                        <img src='../../img/Official BlockWorld Pvp Logo.png' />
                        <div className={`d-flex flex-column justify-content-center align-items-center ${styles.title_text}`}>
                            <h1 className='text-shadow-M'>MARKETPLACE</h1>
                            <p className='box-shadow-M'>
                                The BlockHeads are a collection of 10,000 uniquely generated NFTs,
                                with over 110 different traits and a genuine purpose in the gaming
                                space. Each individual NFT unlocks a 1-of-1 limited edition character
                                within the upcoming battle arena game, BlockWorld PVP. Scheduled to
                                release in late 2022.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.properties} row justify-content-center align-items-center`}>
                    <div className={`col-xl-2 ${styles.show}`}>
                    </div>
                    <div className='col-xl-8 col-lg-9 col-md-8 col-sm-9 justify-content-center align-items-center py-20'>
                        <div className={`${styles.detail_content} d-flex justify-content-center align-items-center flex-wrap`}>
                            <button className={`${styles.btn_detail}`}>
                                <span>796 / 10,000</span>
                                <p>Items</p>
                            </button>
                            <button className={`${styles.btn_detail}`}>
                                <span>678</span>
                                <p>Owners</p>
                            </button>
                            <button className={`${styles.btn_detail_image} d-flex flex-row align-items-center`}>
                                <div className='px-12'>
                                    <span>5.2 SOL</span>
                                    <p>Floor&nbsp;Price</p>
                                </div>
                                <img src='../../img/sol_mark.png' />
                            </button>
                            <button className={`${styles.btn_detail_image} d-flex flex-row align-items-center`}>
                                <div className='px-12'>
                                    <span>145.2 SOL</span>
                                    <p>Volume&nbsp;Traded</p>
                                </div>
                                <img src='../../img/sol_mark.png' />
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.history_content} col-xl-2 col-lg-3 col-md-4 col-sm-3 row`}>
                        <BootstrapDialog
                            onClose={handleSaleClose}
                            aria-labelledby="customized-dialog-title"
                            open={SaleOpen}
                        >
                            <Dlg_history SaleOpen={SaleOpen} setSaleOpen={setSaleOpen} />
                        </BootstrapDialog>
                        <BootstrapDialog
                            onClose={handlePriceClose}
                            aria-labelledby="customized-dialog-title"
                            open={PriceOpen}
                        >
                            <Dlg_priceHistory PriceOpen={PriceOpen} setPriceOpen={setPriceOpen} />
                        </BootstrapDialog>
                        <button className={`${styles.btn_history}`} onClick={handleClickSaleOpen}>
                            <img src='../../img/latest.png' />
                            <p>LATEST&nbsp;SALES</p>
                        </button>
                        <button className={`${styles.btn_history}`} onClick={handleClickPriceOpen}>
                            <img src='../../img/price.png' />
                            <p>PRICE&nbsp;HISTORY</p>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Marketplace_header