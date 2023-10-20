import React from "react";
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';



  // Create Document Component modal
const PdfDocument = ({onClose}) => (
  <div className="modal">
    <h1>Hello</h1>
    <button onClick={onClose}>Close</button>
  </div>
  );

  export default PdfDocument;