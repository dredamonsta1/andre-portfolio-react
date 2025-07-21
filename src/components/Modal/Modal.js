import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // A cleaner 'X' icon
import styles from "./Modal.module.css";

const Modal = ({ show, close, title, children }) => {
  if (!show) {
    return null;
  }

  const closeIcon = <FontAwesomeIcon icon={faTimes} size="lg" />;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="close modal"
          className={styles.closeButton}
          onClick={close}
        >
          {closeIcon}
        </button>
        <header className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </header>
        <main className={styles.modalContent}>{children}</main>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
