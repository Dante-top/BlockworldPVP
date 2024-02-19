import React, { useEffect, useState } from 'react';
import styles from './navbar.module.scss';
import { ethers } from 'ethers';
import { ToastErrMsg, ToastSuccessMsg } from '../Toast';
// import { deep_blue_color } from '../../scss/custom.scss';
declare var window: any

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState('')
  const [metamaskConnected, setMetamaskConnnected] = useState(false);
  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState();
  const [isMetamask, setIsMetamask] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      await loadBlockchainData();
    }
    checkNetwork();
  }, []);

  const loadBlockchainData = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        ToastErrMsg('You should install Metamask on your browser!');
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      setNetworkId(chainId);

      if (accounts.length == 0) {
        setMetamaskConnnected(false);
      } else {
        setMetamaskConnnected(true);
        setAccount(accounts[0]);
      }

      window.ethereum.on("accountsChanged", (accounts: string | any[]) => {
        if (accounts.length > 0) setAccount(accounts[0]);
        else setAccount('');
      });
      window.ethereum.on("networkChanged", (networkId: any) => {
        setNetworkId(networkId);
      });
    } catch (err) {
      console.log(err);
    }
  };


  const changeStyle = () => {
    if (style == '') {
      setStyle(styles.bg_color);
    } else {
      setStyle('')
    }
  };

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        ToastErrMsg('You should install Metamask on your browser!');
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setAccount(accounts[0])
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  return <header className={styles.header} id="mainHeader">
    <nav className={`${styles.navbar} ${style} navbar navbar-expand-lg navbar-light bg-lignt`}>
      <div className="container-lg">
        <a href="/" className="navbar-brand "><img className={styles.nav_logo} src="../../img/Official BlockWorld Pvp Logo.png"></img></a>
        <button type="button" className={`navbar-toggler ml-auto ${styles.responsive_button}`} data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={() => { setOpen(!open); changeStyle(); }}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center ${open ? 'show' : ''}`} id="navbarCollapse">
          <div className={`${styles.navbar_nav} justify-content-center align-items-center navbar-nav ms-auto ${open ? styles.open : ''}`}>
            <a href="#" className={`nav-item nav-link ${styles.menu}`} onClick={() => { setOpen(false) }}>HOME</a>
            <a href="#Mint" className={`nav-item nav-link ${styles.menu}`} onClick={() => { setOpen(false) }}>BUY&nbsp;NFTS</a>
            <a href="https://drive.google.com/file/d/15TXLXYaoPfqJP-cim_ogP9JRk9RId00X/view?usp=sharing" target="_blank" className={`nav-item nav-link ${styles.menu}`} onClick={() => { setOpen(false) }}>WHITEPAPER</a>
            <a href="/marketplace" className={`nav-item nav-link ${styles.menu}`} onClick={() => { setOpen(false) }}>MARKETPLACE</a>
            <div className="dropdown">
              <a className={`nav-item nav-link dropdown-toggle ${styles.dropdown_icon} ${styles.menu}`} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                MORE
              </a>
              <ul className={`dropdown-menu ${styles.dropdown_content}`} aria-labelledby="dropdownMenuLink">
                <li><a className={`dropdown-item ${styles.dropdown_menu}`} href="#Team">OUR TEAM</a></li>
                <li><a className={`dropdown-item ${styles.dropdown_menu}`} href="#Roadmap">ROADMAP</a></li>
                <li><a className={`dropdown-item ${styles.dropdown_menu}`} href="#Battle">BATTLE ARENA</a></li>
                <li><a className={`dropdown-item ${styles.dropdown_menu}`} href="/traitrarity" target='_blank'>TRAIT RARITY</a></li>
              </ul>
            </div>
            {account ? (
              <div className={`${styles.walletConnect}`} >
                {account &&
                  `${account.substring(0, 6)}...${account.substring(
                    account.length - 4
                  )}`}
              </div>
            ) : (
              // <ConnectWalletButton></ConnectWalletButton>
              <button className={`${styles.walletConnect}`} onClick={() => handleConnectWallet()}>
                CONNECT&nbsp;WALLET
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
    <div className={`${styles.about} contanier`} id="About">
      <span className={`${styles.subtitle} bg-secondary-color`}>
        <span className="d-inline">TRAIN • BATTLE • EARN</span>
      </span>
    </div>
    <video className={styles.video} autoPlay muted loop>
      <source src="../../img/Banner for 2.0.mp4" type="video/mp4" />
    </video>
  </header>;
}

export default Navbar;