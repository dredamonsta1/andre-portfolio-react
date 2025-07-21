import { React, useState } from "react";
import Modal from "../Modal/Modal";
import ResumeViewer from "./ResumeViewer";

const Pdf = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button aria-label="view resume" onClick={openModal}>
        View Resume
      </button>

      <Modal show={showModal} close={closeModal} title="My Resume">
        <ResumeViewer />
      </Modal>
    </>
  );
};

export default Pdf;
