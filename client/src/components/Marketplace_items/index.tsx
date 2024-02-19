import styles from './marketplace_items.module.scss'
import { ItemData } from '../../constants';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Item_Dlg from "../Marketplace_Item_Dlg";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 35,
        maxWidth: '80%'
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


// const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//         {
//             label: "First dataset",
//             data: [33, 53, 85, 41, 44, 65],
//             fill: true,
//             backgroundColor: "rgba(75,192,192,0.2)",
//             borderColor: "rgba(75,192,192,1)"
//         },
//         {
//             label: "Second dataset",
//             data: [33, 25, 35, 51, 54, 76],
//             fill: false,
//             borderColor: "#742774"
//         }
//     ]
// };

const Marketpace_items = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={`${styles.m_items} d-flex flex-column`}>
            <div className='d-flex flex-row row'>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <Item_Dlg open={open} setOpen={setOpen} />
                </BootstrapDialog>
                {
                    ItemData.Item.map((items) => (
                        <div className={`${styles.items_content} d-flex flex-column col-xl-3 col-md-4 col-sm-4 col-xs-6`} onClick={handleClickOpen}>
                            <img src={items.image} />
                            <div className={`${styles.property} d-flex flex-column justify-content-start align-items-start`}>
                                <p>
                                    {items.title}
                                </p>
                                <span className={`${styles.price} d-flex align-items-center`}>
                                    <img src='../../img/Sol_price.png' />
                                    <p>{items.price}</p>
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='d-flex justify-content-between py-50'>
                <button className={`${styles.btn_pagenation} box-shadow`}>
                    &lsaquo; Previous Page
                </button>
                <button className={`${styles.btn_pagenation} box-shadow`}>
                    Next Page &rsaquo;
                </button>
            </div>
        </div>
    );
}

export default Marketpace_items