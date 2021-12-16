import React, { useState } from "react";
import styles from "../ModalContact/ModalContact.module.css";
import Modal from "../Modal/Modal";



const ModalContact = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return(
        <>
            <button className={styles.contact} onClick={() => toggle()}>CONTACT</button>
            <Modal show={modal} close={toggle} title="Contact">
        
            <form className={styles.contactForm}>
                <label className={styles.nameLabel}>
                    Name
                    <input type="text" name="name" className={styles.inputName}/>
                
                </label>
                <label className={styles.emailLabel}>
                    Email
                    <input type="email" email="email" className={styles.inputEmail}/>
                </label>


                <label className={styles.messageLabel}>
                    Message
                </label>
                <textarea className={styles.textAreaLabel}>
                
                </textarea>
                <input className={styles.submitBtn} type="submit" value="submit" />
                <input className={styles.resetBtn} type="reset" value="reset" />
            
            </form>
            </Modal>
        </>
    )

}

export default ModalContact;