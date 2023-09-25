import { React, useEffect, useState, useRef } from 'react';
import { createPortal } from "react-dom";



function Pdf() {
    const onClick = () => {
        console.log('clicked me')
    }

   

    return (

    //     <div style={{ border: '2px solid black' }}>
    //   <p>This child is placed in the parent div.</p>
    //   {createPortal(
    //     <p>This child is placed in the document body.</p>,
    //     document.body
    //   )}
    // </div>
       
        <div>
            <document file="src/image/andrefullstackR-2023.pdf"></document>
            {createPortal(
                <button className='pdfButton' onClick={onClick}>PDF</button>,
                document.body

            )}
        
        </div>

    )


}

export default Pdf;

// function MyComponent() {
//   return (
//     <div style={{ border: '2px solid black' }}>
//       <p>This child is placed in the parent div.</p>
//       {createPortal(
//         <p>This child is placed in the document body.</p>,
//         document.body
//       )}
//     </div>
//   );
// }