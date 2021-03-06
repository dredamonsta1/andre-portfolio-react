import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from "./Modal.module.css";



const Modal = ({show, close, title, children}) => {
    const closeBtn = <FontAwesomeIcon icon={faTimesCircle} size="lg" color="white"/>
    return ReactDOM.createPortal(
        <> {show ? 
            <div className={styles.listWork} onClick={() => close()}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.intro}>
                        <header className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{title}</h2>
                        </header>
                        <main className={styles.modalContent}>{children}</main>
                    </div>
                </div>
                <button aria-label="close modal" className={styles.topClose} onClick={() => close()}>{closeBtn}</button>
                        
            </div>
            
            : null}
        </>, 
        document.getElementById("modal")

    );
        
};
    
    
export default Modal;
