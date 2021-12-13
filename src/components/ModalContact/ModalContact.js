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
                <textarea className={styles.nameLabel}>
                
                </textarea>
                <input type="submit" value="submit" />
                <input type="reset" value="reset" />
            
            </form>
            </Modal>
        </>
    )

}

export default ModalContact;