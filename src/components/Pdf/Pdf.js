import { React, useState} from 'react';
import { createPortal } from "react-dom";
// import PDF from "react-pdf-js";
import PdfDocument from './PdfDocument.js';
// import { Document, Page } from 'react-pdf';
// import andrefullstackR from '../../image'

// const PDFModal = ({ }) => {

// }
const Pdf = () => {
    const [showModal, setShowModal] = useState(false);
    const onClick = () => {
        setShowModal(true)
        console.log('clicked me')
    }

   

    return (
        <>
            <button aria-label="pdf button" onClick={onClick}>
                My PDF
            </button>

            {/* <div style={{ width: '100%', height: '500px' }}>
          <Document file={andrefullstackR}>
            <Page pageNumber={1} />
          </Document>
        </div> */}

            {showModal && createPortal(
        <PdfDocument onClose={() => setShowModal(false)} />,
        document.body
      )}
        </>
        
        

    )
}

export default Pdf;

