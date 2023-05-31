import React, { useState } from "react";
import styles from "../ModalContact/ModalContact.module.css";
import Modal from "../Modal/Modal";



const ModalContact = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [inputs, setInputs] = useState({});
    // const [email, setEmail] = useState("");

    const handleSubmit =(e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log("handleSubmit", name)
    }

    const onChange = (e) => {
        e.preventDefault();
        alert(inputs);
    }

    console.log(toggle);
    return(
        <>
            <button className={styles.contact} onClick={() => toggle()}>CONTACT</button>
            <Modal show={modal} close={toggle} title="Contact">
        
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <label className={styles.nameLabel} aria-label="name">
                    Name
                    <input 
                        type="text" name="name" 
                        value={inputs.username || ""} 
        onChange={handleSubmit}
                        className={styles.inputName} 
                        aria-label="name"
                    />
                
                </label>
                <label className={styles.emailLabel} aria-label="email">
                    Email
                    <input 
                        type="email"
                        value={inputs.email || ""} 
        onChange={handleSubmit} 
                        email="email" 
                        className={styles.inputEmail}
                    />
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