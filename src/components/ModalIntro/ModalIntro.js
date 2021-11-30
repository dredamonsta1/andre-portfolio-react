import React, { useState } from "react";
import styles from "../LandingPageModal/LandingPageModal.module.css";
import Modal from "../Modal/Modal";


const ModalIntro = ()  => {
    const[modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <>
            <button className={styles.intro} onClick={() => toggle()}>INTRO</button>
            <Modal show={modal} close={toggle} title="INTRO">
                This is the intro modal more to come
            </Modal>
        </>
    )
}

export default ModalIntro;