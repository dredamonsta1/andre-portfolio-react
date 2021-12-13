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
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                
                </label>
                <label>
                    Email:
                    <input type="email" email="email"/>
                </label>

                <label>
                    Message:
                    <input type="text" message="message" />
                </label>
                <input type="submit" value="submit" />
                <input type="reset" value="reset" />
            
            </form>
            </Modal>
        </>
    )

}

export default ModalContact;