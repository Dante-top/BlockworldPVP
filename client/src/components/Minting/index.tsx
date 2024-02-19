import styles from './minting.module.scss';
// import { useState, useEffect } from 'react';
// import { useWallet } from "@solana/wallet-adapter-react";
// import useCandyMachine from '../../hooks/use-candy-machine';
// import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';

// interface renderProps {
//     days: number
//     hours: number
//     minutes: number
//     seconds: number
//     completed: boolean
// }

// const Intro = (props:any): JSX.Element => {
//     const {preSale} = props;
//     const { isSoldOut, mintStartDate, isMinting, onMintNFT, nftsData } = useCandyMachine(preSale)
//     const wallet = useWallet();
//     const [count, setCount] = useState(1);
//     const Increase = (count: number) => {
//         if(count > 19){
//             return
//         }
//         setCount(count + 1);
//     }
//     const Decrease = (count: number) => {
//         if(count < 2){
//             return
//         }
//         setCount(count - 1);
//     }
    
//     const Completionist = () => 
//         <div className = "d-flex justify-content-start align-items-center flex-column text-center">
//             {wallet.connected &&
//             <>
//             <div className = {`container ${styles.mint_amount} bg-white border-dark text-center text-dark`}>
//                 <div className = {`${styles.count_content} d-flex justify-content-start align-items-center flex-row`}>
//                     <span className = "p-3 btn" onClick = {() => { Decrease(count)}}><b>-</b></span>
//                     <span className = "p-3"><b>{count}</b></span>
//                     <span className = "p-3 btn mg-r-30" onClick = {() => { Increase(count)}}><b>+</b></span>
//                     <span className = "text-end opacity-70"><b>20 MAX</b></span>
//                 </div>
//             </div>
//             <button className={`btn btn-lg ${styles.btn_mint} text-white`} disabled={isSoldOut || isMinting} onClick={() => onMintNFT(count)} type="button">
//                 {isSoldOut ? 
//                 ("SOLD OUT") 
//                 : isMinting ? 
//                     <div className="spinner-border text-white" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                     : 
//                     <b>MINT</b>
//                 }       
//             </button>
//             </>
//           }
//         </div>;
//     // Renderer callback with condition
    
//     const renderer = ({ days, hours, minutes, seconds, completed } : renderProps) => {
//     if (completed) {
//         // Render a completed state
//         return <Completionist />;
//     } else {
//         // Render a countdown
//         return <div className = "d-flex justify-content-center align-items-center flex-column">
//                     <span className = {styles.countdown_timer}>{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>
//                     <h2 className = {`text-center ${styles.countdown_text}`}>COMING SOON...</h2>
//                 </div>;
//     }
//     };
    
//     return(
//         <div className = "bg-dark" id = "Mint">
//             <div className = {`container d-flex justify-content-center align-items-center pt-50 ${styles.mint}`}>
//                 <div className = "container text-center">
//                     <img className = {styles.img_content} src = "../../img/mint.gif"></img>
//                 </div>
//                 <div className = "d-flex justify-content-start align-items-center flex-column text-center">
//                     <div className = "container text-white text-center">
//                         <i><b><h1 className = "d-inline weight-text colored-text">CLAIM </h1><h1 className = "d-inline weight-text">YOUR BLOCKHEADS.</h1></b></i>
//                     </div>
//                     <div className = "container">
//                         <p className = "text-white mg-y-40">
//                             The BlockHeads are a collection of 10,000 uniquely generated NFTs, with over 
//                             110 different traits and a genuine purpose in the gaming space. Each Blockhead 
//                             NFT is non-sequentially minted containing unique attributes which vary in rarity.
//                         </p>
//                         <div className = {`${styles.btn_social_content} text-dark d-flex justify-content-start align-items-center`}>
//                             <Countdown
//                                 date={mintStartDate}
//                                 renderer={renderer}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Intro