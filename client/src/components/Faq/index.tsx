import { FaqData } from "../../constants";
import styles from "./faq.module.scss";

function Faq() {
  return (
    <div id="Faq">
      <div className={`${styles.gradientStart}`}></div>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <div className={`${styles.faq}`}>
          <div className={`container ${styles.imgarea}`}>
            <img src="../../img/pop 1.png" />
          </div>
          <div className={`text-white mb-5 ${styles.textarea}`}>
            <div className={`py-1 px-5 ${styles.xtext}`}>FREQUENTLY ASKED</div>
            <div className={`py-1 px-5 ${styles.xxtext}`}>QUESTIONS</div>
          </div>
          <div className={`${styles.contentarea}`}>
            <div
              className={`${styles.accordion} accordion`}
              id="accordionExample"
            >
              {FaqData.items.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.accordion_content_item} my-1 accordion-item`}
                >
                  <h1
                    className={`${styles.question_header}`}
                    id={"Question" + index.toString()}
                  >
                    <button
                      className={`${styles.accordion_content_button} accordion-button collapsed`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#Quetions" + index.toString()}
                      aria-expanded="true"
                      aria-controls={"Quetions" + index.toString()}
                    >
                      <span className={`box-shadow ${styles.itemTitle}`}>
                        {item.title}
                      </span>
                    </button>
                  </h1>
                  <div
                    id={"Quetions" + index.toString()}
                    className={`accordion-collapse collapse ${styles.questiontitle}`}
                    aria-labelledby={"Question" + index.toString()}
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      className={`${styles.accordion_content_body} accordion-body`}
                    >
                      <p className="opacity-80">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.gradientEnd}`}></div>
    </div>
  );
}

export default Faq;
