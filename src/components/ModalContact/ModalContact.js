import React, { useState } from "react";
import styles from "../LandingPageModal/LandingPageModal.module.css";
import Modal from "../Modal/Modal";



const ModalContact = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return(
        <>
            <button className={styles.contact} onClick={() => toggle()}>CONTACT</button>
            <Modal show={modal} close={toggle} title="Contact">
        
            This is the Contact modal more soon 
            </Modal>
        </>
    )

}

export default ModalContact;