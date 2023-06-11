import React, {useState} from "react";
import styles from "../LandingPageModal/LandingPageModal.module.css"
import Modal from "../Modal/Modal";
import './ModalWork.module.css';


const ModalWork = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <>
            <button className={styles.work} onClick={() => toggle()}>WORK</button>
            <Modal className={styles.modalWork} show={modal} close={toggle} title="WORK">
                This is the Work modal
            </Modal>
        </>
    )   
}


export default ModalWork