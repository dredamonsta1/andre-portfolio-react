import { React, useState } from "react";
import Modal from "../Modal/Modal";
import ResumeViewer from "./ResumeViewer";
import styles from "./Pdf.module.css";

const Pdf = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button
        aria-label="view resume"
        onClick={openModal}
        className={styles.resumeButton}
      >
        View Resume
      </button>

      <Modal show={showModal} close={closeModal} title="My Resume">
        <ResumeViewer />
      </Modal>
    </>
  );
};

export default Pdf;
