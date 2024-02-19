import styles from './marketplace_dlg_history.module.scss'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dlg_HistoryData } from '../../constants';


const Marketplace_dlg_history = (props: any) => {
    // const [open, setOpen] = React.useState(false);
    const { SaleOpen, setSaleOpen } = props
    const handleClose = () => {
        setSaleOpen(false);
    }
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
                        <img src='../../img/history.png' />
                        <p>Blockhead #2987</p>
                    </span>
                </div>
            </div>
            <div className={`${styles.dlg_body} d-flex flex-row align-items-center py-20`}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, backgroundColor: 'black' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontSize: 35, fontFamily: 'Calibri' }} align="center" >ITEM</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: 35, fontFamily: 'Calibri' }} align="center" >PRICE</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: 35, fontFamily: 'Calibri' }} align="center" >FROM</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: 35, fontFamily: 'Calibri' }} align="center" >TO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Dlg_HistoryData.Item.map((row, index) => (
                                <TableRow
                                    className={`${styles.dlg_row}`}
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" scope="row" className={`${styles.td_item}`}>
                                        <img src={row.itemImage} />
                                    </TableCell>
                                    <TableCell align="center" className={`${styles.td_price}`}>
                                        <span className={`${styles.dlg_price}`}>
                                            <img src='../../img/sol_mark.png' />
                                            <p>14.30</p>
                                        </span>
                                    </TableCell>
                                    <TableCell align="center" className={`${styles.td_from}`}>
                                        <span className={`${styles.address}`}>0x76...YTRS</span>
                                    </TableCell>
                                    <TableCell align="center" className={`${styles.td_to}`}>
                                        <div className={`${styles.date} text-end`}>
                                            <p>10 minutes ago</p>
                                        </div>
                                        <div className='text-start mg-y-50'>
                                            <span className={`${styles.address}`}>
                                                0tys...2e3g
                                            </span>
                                        </div>
                                        <div className='text-center d-flex justify-content-center'>
                                            <span className={`${styles.dlg_Token2} d-flex justify-content-center align-items-center`}>
                                                <p className=''>VIEW TOKEN transactions</p>
                                                <img src='../../img/View.png' />
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Marketplace_dlg_history;