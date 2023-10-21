import { React, useEffect, useState, useRef } from 'react';
import { createPortal } from "react-dom";
// import PDF from "react-pdf-js";
import PdfDocument from './PdfDocument.js';



function Pdf() {
    const [showModal, setShowModal] = useState(false);
    // const onClick = () => {
    //     console.log('clicked me')
    // }

   

    return (
        <>
            <button aria-label="pdf button" onClick={() => setShowModal(true)}>
                My PDF
            </button>

            {showModal && createPortal(
        <PdfDocument onClose={() => setShowModal(false)} />,
        document.body
      )}
        </>
        
        

    )
}

export default Pdf;

