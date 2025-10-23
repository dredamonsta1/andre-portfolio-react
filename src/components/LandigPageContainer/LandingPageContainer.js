import React from "react";
import styles from "./LandingPageContainer.module.css";
// import Typewriter from "./Typewriter";
import Typewriter from "../Typewriter/Typewriter";

function LandingPageContainer() {
  return (
    <div>
      <div className={styles.lineUnderCircle} />
      <div className={styles.downlineTop} />
      <div className={styles.innerParagraph}>
        <h1 className={styles.innerH1}>
          <Typewriter
            text="Andre Wilkinson"
            speed={100}
            delay={500}
            showCursor={true}
          />
        </h1>
        <p className={styles.paragraph}>
          Fullstack trained frontend dev just enjoing learning everyday,
          embracing the chaos.
        </p>
      </div>
      <div className={styles.downlineBottom} />
    </div>
  );
}

export default LandingPageContainer;
