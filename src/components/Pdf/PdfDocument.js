import React from "react";
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styles from "../Modal/Modal.module.css";



  // Create Document Component modal
const PdfDocument = ({onClose}) => (
  <div className={styles.listWork}>
    <div >
      <div className={styles.modalContent} >
        <h1>Hello</h1>
        <button aria-label="close modal" className={styles.topClose} onClick={onClose}>X</button>
      </div>
    </div>
  </div>
  );

  export default PdfDocument;

  // className={styles.modal}