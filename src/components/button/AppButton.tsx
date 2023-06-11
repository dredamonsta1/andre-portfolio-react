import React from "react";
import styles from "./styles.module.css";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {}




function AppButton(props:Props) {
    
    return (
        <button {...props}> </button>
      )
}


export default AppButton;


// const Button = styled.button`
// font-size: 16px;
// padding: 8px 5px;
// border: none;
// background-color: green
// `