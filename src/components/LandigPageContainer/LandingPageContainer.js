import React from "react";
import styles from "./LandingPageContainer.module.css";




function LandingPageContainer() {
    return (
        <div>
            <div className={styles.lineUnderCircle} />
            <div className={styles.downlineTop} />
            <div className={styles.innerParagraph}>
                <h1>Andre Wilkinson</h1>
                <p>Fullstack trained frontend dev just enjoing learning everyday, embracing the chaos.</p>
            </div>
            <div className={styles.downlineBottom} />
        </div>
    );
}

export default LandingPageContainer;