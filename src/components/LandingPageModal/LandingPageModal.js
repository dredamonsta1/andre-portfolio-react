import React from "react";
import styles from "./LandingPageModal.module.css";
import ModalIntro from "../ModalIntro/ModalIntro";
import ModalWork from "../ModalWork/ModalWork";
import ModalAbout from "../ModalAbout/ModalAbout";
import ModalContact from "../ModalContact/ModalContact";


function LandingPageModal(props) {
    return (
        <div className={styles.modalBtnContainer}>
            <ModalIntro />
            <ModalWork />
            <ModalAbout />
            <ModalContact />
        </div>  
    );      
}
    
    
    
    export default LandingPageModal;