import { useState, forwardRef, useImperativeHandle } from "react";
import Modal from "../Modal/Modal";
import ResumeViewer from "./ResumeViewer";
import styles from "./Pdf.module.css";

const Pdf = forwardRef((_, ref) => {
  const [showModal, setShowModal] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setShowModal(true),
  }));

  return (
    <>
      <button
        aria-label="view resume"
        onClick={() => setShowModal(true)}
        className={styles.resumeButton}
      >
        View Resume
      </button>
      <Modal show={showModal} close={() => setShowModal(false)} title="My Resume">
        <ResumeViewer />
      </Modal>
    </>
  );
});

Pdf.displayName = 'Pdf';
export default Pdf;
