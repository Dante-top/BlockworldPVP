import styles from './marketplace_item_dlg.module.scss'
import { Dlg_RarityData } from '../../constants';
import * as React from 'react';

const Marketplace_items_dlg = (props: any) => {
    const { open, setOpen } = props;
    // const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div className={`${styles.Item_dlg} d-flex flex-column`}>
            <div className='d-flex justify-content-end align-items-end'>
                <div className={`${styles.btn_back} text-start`}>
                    <span className={`${styles.back_button} d-flex flex-row`} onClick={handleClose}>
                        <img src="../../img/back-1.png" />
                        <p>EXIT</p>
                    </span>
                </div>
            </div>
            <div className={`${styles.title_content} d-flex flex-row`}>
                <div className={`d-flex justify-content-center align-items-center`}>
                    <span className={`${styles.dlg_title} text-center`}>
                        Blockhead #2987
                    </span>
                    <img src='../../img/chainlink.png' />
                </div>
            </div>
            <div className={`${styles.dlg_body} d-flex flex-row align-items-center py-20`}>
                <img src='../../img/Itemdlg.png' className={`${styles.dlg_img}`} />
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className={`${styles.token_content} d-flex justify-content-center align-items-center`}>
                        <span className={`${styles.dlg_Token1} d-flex justify-content-center align-items-center`}>
                            <img src='../../img/User.png' />
                            <p className='mg-r-20'>Owned By</p>
                            <p>0x76...YTRS</p>
                        </span>
                        <span className={`${styles.dlg_Token2} d-flex justify-content-center align-items-center`}>
                            <p className=''>VIEW TOKEN</p>
                            <img src='../../img/View.png' />
                        </span>
                    </div>
                    <div className='row py-20 justify-content-center'>
                        {
                            Dlg_RarityData.Item.map((items) => (
                                <div className={`${styles.dlg_rarity} col-md-3 col-sm-4 col-4`}>
                                    <span className={`${styles.rarity_title}`}>
                                        {items.title}
                                    </span>
                                    <p className={`${styles.rarity_name}`}>
                                        {items.name}
                                    </p>
                                    <p className={`${styles.rarity_percent}`}>
                                        {items.price}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marketplace_items_dlg