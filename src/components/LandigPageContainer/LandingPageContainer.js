import React from "react";
import styles from "./LandingPageContainer.module.css";

function LandingPageContainer() {
  return (
    <div>
      <div className={styles.lineUnderCircle} />
      <div className={styles.innerParagraph}>
        <h1 className={styles.innerH1}>
          |Andre Wilkinson⟩
        </h1>
        <p className={styles.paragraph}>
          Fullstack trained frontend dev just enjoying learning everyday,
          embracing the chaos.
        </p>
        <p className={styles.equation}>iħ ∂|ψ⟩/∂t = Ĥ|ψ⟩</p>
      </div>
      <div className={styles.downlineBottom} />
    </div>
  );
}

export default LandingPageContainer;
