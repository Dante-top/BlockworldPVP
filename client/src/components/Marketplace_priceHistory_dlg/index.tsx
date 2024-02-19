import styles from './marketplace_priceHistory_dlg.module.scss'
import * as React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { height } from '@mui/system';

const options = {
    title: {
        text: "My stock chart"
    },
    chart: {
        style: {
            width: 800,
        }
    },
    series: [
        {
            data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
        }
    ]
};

const Marketplace_priceHistory_dlg = (props: any) => {
    // const [open, setOpen] = React.useState(false);
    const { PriceOpen, setPriceOpen } = props;

    const handleClose = () => {
        setPriceOpen(false);
    };

    return (
        <div className={`${styles.Item_dlg} d-flex flex-column`}>
            <div className='d-flex justify-content-end align-items-end'>
                <div className={`${styles.btn_back} text-start`}>
                    <a href='#'>
                        <span className={`${styles.back_button} d-flex flex-row`} onClick={handleClose}>
                            <img src="../../img/back-1.png" />
                            <p>EXIT</p>
                        </span>
                    </a>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center flex-row'>
                <div className={`${styles.title_content} d-flex justify-content-center align-items-center`}>
                    <span className={`${styles.dlg_title} text-center`}>
                        <img src='../../img/star.png' />
                        <p>BlockHeads PRICE history</p>
                    </span>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-xl-8 col-lg-9 col-md-8 col-sm-9 justify-content-center align-items-center py-30'>
                    <div className={`${styles.detail_content} d-flex justify-content-center align-items-center flex-wrap`}>
                        <button className={`${styles.btn_detail} bd-r-none`}>
                            <span className={`${styles.dlg_price}`}>
                                <img src='../../img/Sol_price.png' />
                                <p>14.30</p>
                            </span>
                            <p>Daily&nbsp;Volume</p>
                        </button>
                        <button className={`${styles.btn_detail} bd-l-1 bd-r-none`}>
                            <span className={`${styles.dlg_price}`}>45</span>
                            <p>Daily&nbsp;Sales</p>
                        </button>
                        <button className={`${styles.btn_detail} d-flex flex-row align-items-center bd-l-1 bd-r-none`}>
                            <div className='px-12'>
                                <span className={`${styles.dlg_price}`}>
                                    <img src='../../img/Sol_price.png' />
                                    <p>14.30</p>
                                </span>
                                <p>Total&nbsp;Volume</p>
                            </div>
                        </button>
                        <button className={`${styles.btn_detail} bd-l-1`}>
                            <span className={`${styles.dlg_price}`}>1,345</span>
                            <p>Total&nbsp;Sales</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-row justify-content-start align-items-start'>
                <span className={`${styles.chart_days}`}>
                    7 Days
                </span>
                <span className={`${styles.chart_days}`}>
                    14 Days
                </span>
                <span className={`${styles.chart_days}`}>
                    30 Days
                </span>
                <span className={`${styles.chart_days}`}>
                    60 Days
                </span>
                <span className={`${styles.chart_days}`}>
                    All Time
                </span>
            </div>
            <div className={`${styles.dlg_body} d-flex flex-row align-items-center py-20 justify-content-center`}>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options}
                    sx={{ width: 1000 }}
                />
            </div>
        </div>
    );
}

export default Marketplace_priceHistory_dlg