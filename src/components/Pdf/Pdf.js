import { React, useEffect, useState, useRef } from 'react';
import { createPortal } from "react-dom";



const Pdf = () => {
    const onClick = () => {
        console.log('clicked me')
    }

   

    return (
       
        <div>
    <document file="src/image/andrefullstackR-2023.pdf"></document>
            <button className='pdfButton' onClick={onClick}>PDF</button>
        
        </div>

    )


}


export default Pdf;