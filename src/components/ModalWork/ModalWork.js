import React, { useState } from "react";
import styles from "../LandingPageModal/LandingPageModal.module.css";
import localStyles from "./ModalWork.module.css"; // Using a local alias for clarity
import Modal from "../Modal/Modal";
import arsparThumb from "../../assets/work/arspar-preview.png";

const ModalWork = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      {/* Kept your original button and style reference */}
      <button className={styles.work} onClick={toggle}>
        WORK
      </button>

      <Modal
        className={styles.modalWork}
        show={modal}
        close={toggle}
        title="WORK"
      >
        <div className={localStyles.container}>
          <a
            href="https://vedioz.me/"
            target="_blank"
            rel="noopener noreferrer"
            className={localStyles.linkCard}
          >
            <div className={localStyles.imageWrapper}>
              <img src={arsparThumb} alt="Vedioz.me" />
              <div className={localStyles.overlay}>
                <span>VISIT SITE</span>
              </div>
            </div>
            <div className={localStyles.textSection}>
              <h3>vedioz.me</h3>
              <p>A social media platform for for creators of the future.</p>
            </div>
          </a>
        </div>
      </Modal>
    </>
  );
};

export default ModalWork;
