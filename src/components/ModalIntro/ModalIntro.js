import React, { useState } from "react";
import styles from "../LandingPageModal/LandingPageModal.module.css";
// import styles from "../ModalIntro/ModalInto.module.css"
import Modal from "../Modal/Modal";


const ModalIntro = ()  => {
    const[modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <>
            <button className={styles.intro} onClick={() => toggle()}>INTRO</button>
            <Modal className={styles.introModal} show={modal} close={toggle} title="INTRO">
                <p>
                    Welcome to my Coding journey, where i test my progress.
                (modal paragraph styles to be updated)
                </p>
            </Modal>
        </>
    )
}

export default ModalIntro;