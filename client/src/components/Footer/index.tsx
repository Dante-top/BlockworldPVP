import styles from "./footer.module.scss";

function Footer() {
  return (
    <div className={`${styles.footer}`} id="Footer">
      <div className={`${styles.footerRoot}`}>
        <div className={`${styles.btnArea}`}>
          <div className={`ms-4 py-1 ${styles.btn_join}`}>
            <span>JOIN</span>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className={`py-2 ${styles.btn_ourcommunity}`}>
              <span>OUR COMMUNITY</span>
            </div>
          </div>
          <div
            className={`justify-content-center align-items-center ${styles.socialbtn}`}
          >
            <a
              href="https://discord.gg/J8ZaCHdTjN"
              className={`${styles.socialbtndiscord}`}
              target="_blank"
            >
              <div>DISCORD</div>
            </a>
            <a
              href="https://instagram.com/blockworldpvp?utm_medium=copy_link"
              className={`${styles.socialbtninstagram}`}
              target="_blank"
            >
              <div>INSTAGRAM</div>
            </a>
            <a
              href="https://youtube.com/channel/UCrS6WsBYWFY0bU68myVPv8Q"
              className={`${styles.socialbtnyoutube}`}
              target="_blank"
            >
              <div>YOUTUBE</div>
            </a>
          </div>
        </div>
        <div className={`${styles.space}`}></div>
        <div className={`${styles.textArea}`}>
          <div className={`px-4 py-2 ${styles.btn_quick}`}>
            <span>QUICK LINKS</span>
          </div>
          <div className={`${styles.textPanel}`}>
            <div className={`${styles.textLine1}`}>
              <div>
                <a href="#">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    HOME
                  </div>
                </a>
                <a href="#Mint">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    BUY NFTS
                  </div>
                </a>
                <a href="https://drive.google.com/file/d/15TXLXYaoPfqJP-cim_ogP9JRk9RId00X/view?usp=sharing" target="_blank">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    WHITEPAPER
                  </div>
                </a>
                <a href="https://blockheadssocials.clickfunnels.com/vide1639097047057" target="_blank">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    MARKETPLACE
                  </div>
                </a>
                <a href="/traitrarity" target='_blank'>
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    TRAIT RARITY
                  </div>
                </a>
                <a href="#Battle">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    BATTLE ARENA
                  </div>
                </a>
              </div>
            </div>
            <div className={`${styles.textLine2}`}>
              <div>
                <a href="#Roadmap">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    ROADMAP
                  </div>
                </a>
                <a href="#Team">
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    OUR TEAM
                  </div>
                </a>
                <a href="/termsofuse" target='_blank'>
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    TERMS OF USE
                  </div>
                </a>
                <a href="/privacypolicy" target='_blank'>
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    PRIVACY POLICY
                  </div>
                </a>
                <a href="/codeofproduct" target='_blank'>
                  <div className={styles.ptarea}>
                    <img
                      src="../../img/footermenuIcon.png"
                      className={styles.asRight}
                    />
                    CODE OF CONDUCT
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.footerText}`}>© 2021 BlockWorld PVP</div>
    </div>
  );
}

export default Footer;
