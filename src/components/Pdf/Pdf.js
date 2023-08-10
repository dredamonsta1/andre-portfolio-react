import { React, useEffect, useState, useRef } from 'react';
import { createPortal } from "react-dom";
// import AndreResume from '../../image/';
// import { Document, Page } from 'react-pdf';


const Pdf = () => {
    const onClick = () => {
        console.log('clicked me')
    }

    // const Pdf = ({ children, onClose}) => {
    //     const [isOpen, setIsOpen] = useState(true);
    //     const modalRef = useRef();
    //     const closeModal = e => {
    //         if(e.target === modalRef.current) {
    //             setIsOpen(false);
    //             onClose();
    //         }
    //     };
    //     if (isOpen) {
    //         return null;
    //     }
    //     return createPortal(
    //         <div className="modal-overlay" ref={modalRef} onClick={closeModal}>
    //         <div className="modal-content">
    //         <button className="modal-close" onClick={closeModal}>
    //         × PDF
    //         </button>
    //         {children}
    //         </div>
    //         </div>,
    //         document.body
    //         );
// };
    // }

    return (
        // ReactDOM.createPortal(
        //     <div className="modal">
        //       <p>This is part of the modal</p>
        //     </div>,
        //     document.body
        //   )
        <div>
    <document file="src/image/andrefullstackR-2023.pdf"></document>
            <button className='pdfButton' onClick={onClick}>PDF</button>
        
        </div>

    )


}


export default Pdf;