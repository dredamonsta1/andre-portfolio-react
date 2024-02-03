import React, { useState } from "react";
// import styles from "../LandingPageModal/LandingPageModal.module.css"
import styles from "../ModalAbout/ModalAbout.module.css";
import Modal from "../Modal/Modal";


const ModalAbout = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return(
        <>
            <button className={styles.about} onClick={() => toggle()}>ABOUT</button>
            <Modal show={modal} close={toggle} title="About">
            About me, my name Andre Wilkinson, I am a bootcamp (Coding Dojo) fullstack trained Front End leaning developer. This site was built by me from scratch based on a template, I started with HTML, CSS, and Javascript, then sprinkled in a little React which then turned into wrapping the entire project in React, I then added webpack and played around with webpack untill i reached a point of deprication, then I jumped to npx create react app, I have also recently added Jest to test my components and I have added Typescript to mold my skillset.
            </Modal>
        </>

    )
}
export default ModalAbout;