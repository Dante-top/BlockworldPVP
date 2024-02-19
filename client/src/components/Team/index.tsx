import styles from "./team.module.scss";
function Team() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column ${styles.team}`}
      id="Team"
    >
      <div className={`${styles.btnArea}`}>
        <div className={`ms-4 py-1 ${styles.btn_meet}`}>
          <span>MEET</span>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className={`py-2 ${styles.btn_ourteam}`}>
            <span>OUR TEAM</span>
          </div>
        </div>
      </div>
      <div
        className={`d-flex justify-content-center align-items-center text-center ${styles.memberArea}`}
      >
        <div className={`${styles.membersOneLine}`}>
          <div className={`${styles.memberPanelOne}`}>
            <div className={`h-100 ${styles.memberOne}`}>
              <div className={`pt-4 ${styles.textArea}`}>
                <div className={`text-white ${styles.xText}`}>
                  MATTHEW LORION
                </div>
                <div className={`text-white ${styles.xxText}`}>
                  CEO & CO-FOUNDER
                </div>
              </div>
              <div className={`${styles.photoArea}`}>
                <img src="../../img/matt.png" className={`${styles.member}`} />
              </div>
            </div>
            <div className={`${styles.social}`}>
              <a href="https://vm.tiktok.com/TTPd2fatdy/" target="_blank">
                <img
                  className={`${styles.socialSideLeft}`}
                  src="../../img/tiktok.png"
                />
              </a>
              <a
                href="https://m.youtube.com/channel/UCLAEBQMxxwE6gNy13q_rdcg"
                target="_blank"
              >
                <img src="../../img/youtube.png" />
              </a>
              <a
                href="https://www.instagram.com/mattlorion/?hl=en"
                target="_blank"
              >
                <img
                  className={`${styles.socialSideRight}`}
                  src="../../img/instagram.png"
                />
              </a>
            </div>
          </div>
          <div className={`${styles.memberPanelTwo}`}>
            <div className={`h-100 ${styles.memberTwo}`}>
              <div className={`pt-4 ${styles.textArea}`}>
                <div className={`text-white ${styles.xText}`}>
                  SPENCER TWITCHELL
                </div>
                <div className={`text-white ${styles.xxText}`}>
                  CMO & CO-FOUNDER
                </div>
              </div>
              <div className={`${styles.photoArea}`}>
                <img
                  src="../../img/spencer.png"
                  className={`${styles.member}`}
                />
              </div>
            </div>
            <div className={`${styles.social}`}>
              <a
                href="https://instagram.com/spencertwitchell?utm_medium=copy_link"
                target="_blank"
              >
                <img src="../../img/instagram.png" />
              </a>
            </div>
          </div>
        </div>
        <div className={`${styles.membersTwoLine}`}>
          <div className={`${styles.memberPanelOne}`}>
            <div className={`h-100 ${styles.memberOne}`}>
              <div className={`pt-4 ${styles.textArea}`}>
                <div className={`text-white fs-2 ${styles.xText}`}>
                  ARAYA MASAMI
                </div>
                <div className={`text-white fs-5 ${styles.xxText}`}>
                  LEAD DEVELOPER
                </div>
              </div>
              <div className={`${styles.photoArea}`}>
                <img src="../../img/araya.png" className={`${styles.member}`} />
              </div>
            </div>
            <div className={`${styles.social}`}>
              <a
                href="https://www.linkedin.com/in/araya-masami-02a604225/"
                target="_blank"
              >
                <img src="../../img/linked in.png" />
              </a>
            </div>
          </div>
          <div className={`${styles.memberPanelTwo}`}>
            <div className={`h-100 ${styles.memberTwo}`}>
              <div className={`pt-4 ${styles.textArea}`}>
                <div className={`text-white fs-2 ${styles.xText}`}>
                  MORIO SEIKI
                </div>
                <div className={`text-white fs-5 ${styles.xxText}`}>
                  FRONTEND DEVELOPER
                </div>
              </div>
              <div className={`${styles.photoArea}`}>
                <img src="../../img/morio.png" className={`${styles.member}`} />
              </div>
            </div>
            <div className={`${styles.social}`}>
              <a
                href="https://www.linkedin.com/in/morio-seiki-b513b521a/"
                target="_blank"
              >
                <img src="../../img/linked in.png" />
              </a>
            </div>
          </div>
          <div className={`${styles.memberPanelThree}`}>
            <div className={`h-100 ${styles.memberThree}`}>
              <div className={`pt-4 ${styles.textArea}`}>
                <div className={`text-white fs-2 ${styles.xText}`}>
                  DONEY MEJIA
                </div>
                <div className={`text-white fs-5 ${styles.xxText}`}>
                  LEAD ARTIST
                </div>
              </div>
              <div className={`${styles.photoArea}`}>
                <img src="../../img/doney.png" className={`${styles.member}`} />
              </div>
            </div>
            {/* <div className={`${styles.social} ${styles.socialnone}`}></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
