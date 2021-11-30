import React, { useState } from "react";
import styles from "../LandingPageModal/LandingPageModal.module.css"
import Modal from "../Modal/Modal";


const ModalAbout = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return(
        <>
            <button className={styles.about} onClick={() => toggle()}>ABOUT</button>
            <Modal show={modal} close={toggle} title="About">
                This is the About modal lets seeee what its about.
            </Modal>
        </>

    )
}
export default ModalAbout;