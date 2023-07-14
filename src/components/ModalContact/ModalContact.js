import React, { useState,useRef } from "react";
import styles from "../ModalContact/ModalContact.module.css";
import emailjs from '@emailjs/browser';
import Modal from "../Modal/Modal";


const ModalContact = () => {

    const form = useRef();
      
    const sendEmail = (e) => {
        e.preventDefault();
      
        emailjs.sendForm('service_qxtvcgf', 'template_rfe7cl7', form.current, '41LTlnHP217tLcKcN')
        .then((result) => {
            e.target.reset()
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };



    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <>
            <button className={styles.contact} onClick={() => toggle()}>CONTACT</button>
            <Modal show={modal} close={toggle} title="Contact">

                <form ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input className={styles.inputName} type="text" name="user_name" />
                    <label>Email</label>
                    <input className={styles.inputEmail} type="email" name="user_email" />
                    <label>Message</label>
                    <textarea className={styles.textAreaLabel} name="message" />
                    <input className={styles.submitBtn} type="submit" value="Send" />
                    <input className={styles.resetBtn} type="reset" value="reset" />
                </form>

            </Modal>
       </> 
    )
}

export default ModalContact;