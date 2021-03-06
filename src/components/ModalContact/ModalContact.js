import React, { useState } from "react";
import styles from "../ModalContact/ModalContact.module.css";
import Modal from "../Modal/Modal";



const ModalContact = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    console.log(toggle);
    return(
        <>
            <button className={styles.contact} onClick={() => toggle()}>CONTACT</button>
            <Modal show={modal} close={toggle} title="Contact">
        
            <form className={styles.contactForm}>
                <label className={styles.nameLabel} aria-label="name">
                    Name
                    <input type="text" name="name" className={styles.inputName} aria-label="name"/>
                
                </label>
                <label className={styles.emailLabel} aria-label="email">
                    Email
                    <input type="email" email="email" className={styles.inputEmail}/>
                </label>


                <label className={styles.messageLabel}>
                    Message
                    <textarea className={styles.textAreaLabel}>
                    
                    </textarea>
                </label>
                <input className={styles.submitBtn} type="submit" value="submit" />
                <input className={styles.resetBtn} type="reset" value="reset" />
            
            </form>
            </Modal>
        </>
    )

}

export default ModalContact;