import React from "react";
import styles from "./LandingPageCircle.module.css";
import batmanDre from "../../image/batmanDre.jpeg";



function LandingPageCircle(props) {
    return (
        <div className={styles.circle}>
            <img className={styles.circleImage} src={batmanDre} alt="a pic of me in a batman mask" />
        </div>
    );

}

export default LandingPageCircle;