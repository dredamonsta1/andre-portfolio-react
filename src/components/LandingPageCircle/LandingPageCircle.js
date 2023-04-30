import React from "react";
import styles from "./LandingPageCircle.module.css";
import batmanDre from "../../image/batmanDre.jpeg";



function LandingPageCircle(props) {
    // const Andre = "aw";
    return (
        <div className={styles.circle}>
            {/* <div className={styles.awSpan}><h1>aw</h1> </div>  */}
            <img className={styles.circleImage} src={batmanDre} alt="a pic of me in a batman mask" />
        </div>
    );

}

export default LandingPageCircle;